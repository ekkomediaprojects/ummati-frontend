import React, { useState ,useEffect} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Stack,
  Alert,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import RequestHandler from "../../utils/RequestHandler"

const StripeDialog = ({ open, onClose, tierId  }) => {
  const stripe = useStripe();
  const elements = useElements();
  const token = localStorage.getItem("userToken");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (methodError) {
        setError(methodError.message);
        setLoading(false);
        return;
      }

      const res = await RequestHandler(
        `${process.env.REACT_APP_API_URL}stripe/create-subscription`,
        "POST",
        {
          paymentMethodId: paymentMethod.id,
          tierId,
        },
        { Authorization: `Bearer ${token}` }
      );

      const { clientSecret } = res.data;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

        if (error) {
            setError(error.message);
        } else if (paymentIntent.status === "succeeded") {
            setSuccess(true);
            
        }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  useEffect (()=>{
    setSuccess(false);
  }, [onClose])

  const handleClose = () => {
    setSuccess(false);
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          {success ? "Payment Successful" : "Upgrade Your Membership"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {!success ? (
            <>
              <Typography variant="body1" color="text.secondary">
                Enter your card details to proceed with the upgrade. Payments are securely processed by Stripe.
              </Typography>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                  "& .StripeElement": {
                    padding: "12px 14px",
                    fontSize: "16px",
                  },
                }}
              >
                <CardElement options={{ hidePostalCode: true }} />
              </Box>

              {error && <Alert severity="error">{error}</Alert>}

              <Divider />

              <Button
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                size="large"
                disabled={!stripe || !elements || loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{
                  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  paddingY: 1.5,
                  borderRadius: 2,
                  boxShadow: "0 3px 10px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                  },
                }}
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </Button>
            </>
          ) : (
            <>
              <Alert severity="success">🎉 Subscription bought successfully!</Alert>
              <Typography variant="body2" color="text.secondary">
                You now have access to the upgraded membership benefits.
              </Typography>
              <Button
                onClick={handleClose}
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: 2,
                  color: "#4f46e5",
                  borderColor: "#4f46e5",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    borderColor: "#4f46e5",
                  },
                }}
              >
                Close
              </Button>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StripeDialog;
