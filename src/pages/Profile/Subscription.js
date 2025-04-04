import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";

const Subscription = () => {
  const [membership , setMembership] = useState(false)
  return (
    <Box
    sx={{
      width: "100%",
      bgcolor: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: { xs: "15px", md: "30px" },
    }}
  > 
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
          width: { xs: "100%", sm: "355px", md: "360px" },
          backgroundColor: "white",
          height: { xs: "auto", sm: "426px" },
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
            fontSize: { xs: "36px", sm: "48px" },
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
            fontSize: { xs: "16px", sm: "18px" }, 
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
          sx={{
            backgroundColor: !membership ? "#D9F4DA" : "#78B27B",
            width: { xs: "100%", sm: "312px" },
            height: "51px",
            borderRadius: "8px",
            padding: { xs: 0, sm: "12px" },
            gap: { xs: 0, sm: "10px" },
            marginTop:  { xs: 0, lg: "10px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "none",
            alignSelf: { xs: "center", sm: "flex-start" },
          }}
          onClick={() => membership ? setMembership(false) : null}
        >
        <Typography  
            sx={{
              textAlign: "left",
              color: !membership ? "#78B27B" : "#FFFFFF",
              fontSize: "18px",
              fontFamily: "Poppins",
              fontWeight: "600",
            }}
          >
             {membership ? "Downgrade" : "Selected"}
          </Typography> 
        </Button>
      </Box>
  
      {/* Premium Membership Box */}
      <Box
        sx={{
          width: { xs: "100%", sm: "355px", md: "360px" },
          backgroundColor: "white",
          height: { xs: "auto", sm: "597px" },
          p: 2,
          borderRadius: "8px",
          border: "2px solid #78B27B",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 4 },
          minHeight: { xs: "500px", sm: "auto" },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            color: "#040416",
            fontSize: { xs: "36px", sm: "48px" },
            fontFamily: "Quicksand",
            fontWeight: "700",
          }}
        >
          <span>$20</span>
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
            fontSize: { xs: "16px", sm: "18px" }, 
            listStyleType: "disc",
            fontWeight: "400",
            fontFamily: "Poppins",
            flexGrow: 1,
          }}
        >
          <li style={{ marginBottom: "1rem" }}>You have access to all the events with no event fees.</li>
          <li style={{ marginBottom: "1rem" }}>
            Get exclusive discounts on your favorite restaurants, brands,
            cafes, and more!
          </li>
          <li style={{ marginBottom: "1rem" }}>You have early access to events.</li>
          <li style={{ marginBottom: "1rem" }}>You have early access to the travel groups.</li>
          <li>You will have access to member only events.</li>
        </ul>
        <Button
          variant="contained"
          sx={{
            backgroundColor: membership ? "#D9F4DA" : "#78B27B",
            width: { xs: "100%", sm: "312px" },
            height: "51px",
            borderRadius: "8px",
            padding: { xs: 0, lg: "12px" },
            gap: { xs: 0, lg: "10px" },
            marginTop:  { xs: 0, lg: "10px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "none",
            alignSelf: { xs: "center", sm: "flex-start" },
          }}
          onClick={() => !membership ? setMembership(true) : null}
        >
          <Typography  
            sx={{
              textAlign: "left",
              color: membership ? "#78B27B" : "#FFFFFF",
              fontSize: "18px",
              fontFamily: "Poppins",
              fontWeight: "600",
            }}
          >
            {membership ? "Selected" : "Upgrade"}
          </Typography> 
        </Button>
      </Box>
    </Box>
  </Box>
  );
};

export default Subscription;
