import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";
import StripeDialog from "./StripeDialog";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const getTimeLeftText = (endDate) => {
  if (!endDate) return "";
  const now = new Date();
  const end = new Date(endDate);
  const diff = end - now;

  if (diff <= 0) return "Ends today";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${days}d ${hours}h ${minutes}m remaining`;
};

const Subscription = () => {
  const [memTier, setMemTier] = useState([]);
  const [currMemberShip, setCurrMemberShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [downgradeTierId, setDowngradeTierId] = useState(null);

  const token = localStorage.getItem("userToken");

  const getMemberTierShips = async () => {
    if (!token) {
      toast.error("Please log in to access categories");
      return;
    }
    const res = await RequestHandler(
      `${process.env.REACT_APP_API_URL}stripe/membership-tiers`,
      "GET",
      {},
      { Authorization: `Bearer ${token}` }
    );
    if (res.success) {
      setMemTier(res.data);
    }
  };

  const currentMemberShip = async () => {
    if (!token) {
      toast.error("Please log in to access categories");
      return;
    }
    setLoading(true);
    const res = await RequestHandler(
      `${process.env.REACT_APP_API_URL}stripe/membership-status`,
      "GET",
      {},
      { Authorization: `Bearer ${token}` }
    );
    if (res.success) {
      setCurrMemberShip(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    currentMemberShip();
    getMemberTierShips();
  }, []);

  const handleUpgrade = (tierId) => {
    setSelectedTier(tierId);
    setDialogOpen(true);
  };
  const handleConfirmDowngrade = async () => {
    setConfirmDialog(false);
    if (!token || !downgradeTierId) return;

    const res = await RequestHandler(
      `${process.env.REACT_APP_API_URL}stripe/cancel-subscription`,
      "POST",
      {},
      { Authorization: `Bearer ${token}` }
    );
    if (res.success) {
      toast.success("Subscription downgraded successfully.");
      await currentMemberShip(); // refresh data after downgrade
    } else {
      toast.error("Failed to downgrade subscription.");
    }
  };

  // derive directly so always fresh
  const memEndFlag = currMemberShip?.membership?.cancelAtPeriodEnd || false;
  const membership = currMemberShip?.isPaidMember || false;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "10px", md: "30px" },
      }}
    >
      {loading ? (
        <CircularProgress sx={{ mt: 10 }} />
      ) : (
        <>
          {currMemberShip && (
            <Box
              sx={{
                width: "100%",
                maxWidth: "800px",
                bgcolor: "#F4FFF4",
                border: "2px solid #78B27B",
                borderRadius: "10px",
                p: 3,
                mb: 5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontFamily: "Quicksand",
                  color: "#040416",
                }}
              >
                Current Membership Status
              </Typography>

              <Typography>
                <strong>Type:</strong> {membership ? "Premium" : "Free"}
              </Typography>

              <Typography>
                <strong>Status:</strong>{" "}
                {currMemberShip?.membership?.status || "No Status"}
              </Typography>

              <Typography>
                <strong>Last Payment Status:</strong>{" "}
                {currMemberShip?.membership?.lastPaymentStatus || "No Status"}
              </Typography>

              {currMemberShip?.currentPeriodEnd && (
                <Typography>
                  <strong>Valid Until:</strong>{" "}
                  {new Date(
                    currMemberShip?.currentPeriodEnd
                  ).toLocaleDateString()}
                </Typography>
              )}

              {memEndFlag && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    color: "#ef4444",
                    fontWeight: 600,
                  }}
                >
                  Your subscription will remain active until{" "}
                  {new Date(
                    currMemberShip?.currentPeriodEnd
                  ).toLocaleDateString()}
                  .<br />
                  {getTimeLeftText(currMemberShip?.currentPeriodEnd)}
                </Typography>
              )}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 4, sm: 8 },
              justifyContent: "center",
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            {/* Free Membership Box */}
            <Box
              sx={{
                width: { xs: "100%", sm: "355px" },
                backgroundColor: "white",
                height: { xs: "auto", sm: "350px" },
                p: 2,
                borderRadius: "8px",
                border: "2px solid #78B27B",
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 4 },
                minHeight: { xs: "400px", sm: "auto" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "left",
                  color: "#040416",
                  fontSize: { xs: "36px" },
                  fontFamily: "Quicksand",
                  fontWeight: "700",
                }}
              >
                Free
              </Typography>
              <ul
                style={{
                  paddingLeft: "24px",
                  color: "#686868",
                  fontSize: "16px" ,
                  listStyleType: "disc",
                  fontWeight: "400",
                  fontFamily: "Poppins",
                  flexGrow: 1,
                }}
              >
                <li style={{ marginBottom: "1rem" }}>
                  You pay for the events you want to attend.
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  The ticket price includes all supplies and planning for each
                  event.
                </li>
              </ul>

              <Button
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor:
                    membership === memEndFlag  ? "#D9F4DA" : "#78B27B",
                  width: { xs: "100%", sm: "300px" },
                  height: "51px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "none",
                  alignSelf: "center"
                }}
                onClick={() => {
                  if (membership && !memEndFlag && memTier.length > 0) {
                    setDowngradeTierId(memTier[0]._id);
                    setConfirmDialog(true);
                  }
                }}
              >
                <Typography
                  sx={{
                    color:
                       membership === memEndFlag  ? "#78B27B" : "#FFFFFF",
                    fontSize: "18px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                  }}
                >
                  {membership && !memEndFlag
                    ? "Downgrade"
                    : !memEndFlag 
                    ? "Selected"
                    : "Downgraded"}
                </Typography>
              </Button>
            </Box>

            {/* Premium Membership Box */}
            <Box
              sx={{
                width: { xs: "100%", sm: "355px"},
                backgroundColor: "white",
                height: { xs: "auto", sm: "480px" },
                p: 2,
                borderRadius: "8px",
                border: "2px solid #78B27B",
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 4 },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "left",
                  color: "#040416",
                  fontSize: "36px",
                  fontFamily: "Quicksand",
                  fontWeight: "700",
                }}
              >
                <span>$25</span>
                <span
                  style={{
                    color: "#040416",
                    fontSize: "20px",
                    fontFamily: "Quicksand",
                    fontWeight: "700",
                  }}
                >
                  /Month
                </span>
              </Typography>
              <ul
                style={{
                  paddingLeft: "24px",
                  color: "#686868",
                  fontSize: "16px",
                  fontFamily: "Poppins",
                }}
              >
                <li style={{ marginBottom: "1rem" }}>
                  You have access to all the events with no event fees.
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  Get exclusive discounts on your favorite restaurants, brands,
                  cafes, and more!
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  You have early access to events.
                </li>
                <li style={{ marginBottom: "1rem" }}>
                  You have early access to the travel groups.
                </li>
                <li>You will have access to member only events.</li>
              </ul>

              <Button
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor:
                    membership && !memEndFlag ? "#D9F4DA" : "#78B27B",
                  width: { xs: "100%", sm: "312px" },
                  height: "51px",
                  borderRadius: "8px",
                  textTransform: "none",
                  alignSelf: { xs: "center", sm: "flex-start" },
                }}
                onClick={() => {
                  if (!membership || memEndFlag) {
                    handleUpgrade(memTier[1]._id);
                  }
                }}
              >
                <Typography
                  sx={{
                    color:
                      membership && !memEndFlag ? "#78B27B" : "#FFFFFF",
                    fontSize: "18px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                  }}
                >
                  {membership && !memEndFlag
                    ? "Selected"
                    : memEndFlag
                    ? "Upgrade Again"
                    : "Upgrade"}
                </Typography>
              </Button>
            </Box>

            <StripeDialog
              open={dialogOpen}
              onClose={() => {
                setDialogOpen(false);
                currentMemberShip();
              }}
              tierId={selectedTier}
            />

            <Dialog
              open={confirmDialog}
              onClose={() => setConfirmDialog(false)}
            >
              <DialogTitle
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#1f2937",
                  pb: 0,
                }}
              >
                <WarningAmberRoundedIcon sx={{ color: "#f59e0b" }} /> Confirm
                Downgrade
              </DialogTitle>

              <DialogContent sx={{ pt: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    color: "#374151",
                    mt: 1,
                  }}
                >
                  Are you sure you want to downgrade your subscription? This
                  action may limit access to certain features.
                </Typography>
                {memEndFlag && (
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: "#ef4444",
                      fontWeight: 600,
                    }}
                  >
                    Your subscription will remain active until{" "}
                    {new Date(
                      currMemberShip?.membership?.currentPeriodEnd
                    ).toLocaleDateString()}
                    .<br />
                    {getTimeLeftText(
                      currMemberShip?.membership?.currentPeriodEnd
                    )}
                  </Typography>
                )}
              </DialogContent>
              <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                  onClick={() => setConfirmDialog(false)}
                  variant="text"
                  size="medium"
                  startIcon={<CloseIcon />}
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    color: "#000",
                    "&:hover": {
                      backgroundColor: "#27329a",
                      color: "#fff",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDowngrade}
                  variant="outlined"
                  size="medium"
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    borderRadius: 2,
                    color: "#8e0f16",
                    borderColor: "#8e0f16",
                    "&:hover": {
                      backgroundColor: "#8e0f16",
                      borderColor: "#8e0f16",
                      color: "#f9f9fb",
                    },
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Subscription;
