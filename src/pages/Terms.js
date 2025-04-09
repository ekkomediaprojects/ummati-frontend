import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bannerImage from "../assets/images/purpleBanner.png";
import "../assets/fonts/Poppins-Regular.ttf";
import { Box, Typography, Container } from "@mui/material";

const Terms = () => (
  <Box
    sx={{
      backgroundColor: "#F7F5EF",
      minHeight: "100vh",
    }}
  >
    

    {/* Banner Section */}
    <Box
      sx={{
        width: "100%",
        height:"219px",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "#3D3D3C",
          fontFamily: "Caprasimo",
          fontSize: { xs: "32px", md: "40px" },
          position: "absolute",
          bottom: "10%",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Terms
      </Typography>
    </Box>

    {/* Main Content Section */}
    <Container
      maxWidth={false} 
      sx={{
        padding: { xs: "40px 16px", sm: "50px 40px", md: "60px 200px" },
        maxWidth: "1600px", 
        margin: "0 auto", 
      }}
    >
      <Typography sx={styles.text}>Effective Date: November 1, 2024</Typography>
      <Typography sx={styles.text}>
        Welcome to Ummati Community! These Terms and Conditions govern your use
        of ummaticommunity.com, its mobile applications, and associated
        services.
      </Typography>

      <Section title="1. Acceptance of Terms">
        By accessing and using the Ummati Community website and services, you
        agree to be bound by these Terms and Conditions. If you do not agree,
        please discontinue use immediately.
      </Section>

      <Section title="2. Account Registration">
        To use certain features of our platform, you must create an account. You
        agree to provide accurate information during registration and maintain
        the security of your account credentials.
      </Section>

      <Section title="3. User Conduct">
        You agree to:
        <ul className="list-disc list-inside">
          <li>Use Ummati Community for lawful purposes only.</li>
          <li>Not post or share any harmful, offensive, or illegal content.</li>
          <li>Respect the privacy and rights of other users.</li>
          <li>Not attempt to gain unauthorized access to our systems.</li>
        </ul>
      </Section>

      <Section title="4. Content Ownership and License">
        <strong>User-Generated Content:</strong> You retain ownership of the
        content you post on Ummati Community. However, by submitting content,
        you grant us a non-exclusive, royalty-free license to use, modify, and
        distribute it on our platform.
        <br />
        <br />
        <strong>Our Content:</strong> Ummati Community and its licensors retain
        ownership of all materials on the site, including text, graphics, and
        code. You may not reproduce, distribute, or create derivative works
        without prior written consent.
      </Section>

      <Section title="5. Termination">
        We reserve the right to suspend or terminate your account at our
        discretion if you violate these Terms and Conditions, applicable laws,
        or engage in misconduct.
      </Section>

      <Section title="6. Third-Party Links">
        Our website may contain links to third-party websites that are not
        operated or controlled by us. We are not responsible for the content,
        privacy policies, or practices of such websites.
      </Section>

      <Section title="7. Limitation of Liability">
        To the fullest extent permitted by law, Ummati Community is not liable
        for any direct, indirect, incidental, or consequential damages resulting
        from your use or inability to use the service.
      </Section>

      <Section title="8. Indemnification">
        You agree to indemnify and hold Ummati Community harmless from any
        claims, losses, liabilities, or expenses arising out of your violation
        of these Terms and Conditions or misuse of the platform.
      </Section>

      <Section title="9. Changes to Terms">
        We reserve the right to modify these Terms and Conditions at any time.
        Your continued use of our services following any changes signifies your
        acceptance of the new terms.
      </Section>

      <Section title="10. Governing Law">
        These Terms and Conditions are governed by and construed in accordance
        with the laws of [Insert Jurisdiction]. Any disputes arising out of or
        related to these terms will be resolved in the courts of [Insert
        Jurisdiction].
      </Section>

      <Section title="11. Contact Us">
        If you have any questions about these Terms and Conditions, please
        contact us at:
        <Box
          sx={{
            marginTop: "24px",
          }}
        >
          <Typography>Email: team@ummaticommunity.com</Typography>
        </Box>
      </Section>
    </Container>

    
  </Box>
);

const Section = ({ title, children }) => (
  <Box sx={{ marginBottom: "24px" }}>
    <Typography sx={styles.sectionTitle}>{title}</Typography>
    <Typography sx={styles.text}>{children}</Typography>
  </Box>
);

const styles = {
  text: {
    color: "black",
    fontSize: "16px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "400",
    wordWrap: "break-word",
    marginBottom: "16px",
  },
  sectionTitle: {
    color: "black",
    fontSize: "16px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "700",
    wordWrap: "break-word",
    marginBottom: "4px",
  },
};

export default Terms;
