import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bannerImage from "../assets/images/purpleBanner.png";

const Privacy = () => (
  <Box
    sx={{
      backgroundColor: "#F7F5EF",
      minHeight: "100vh",
    }}
  >
    <Header />

    {/* Banner Section */}
    <Box
      sx={{
        width: "100%",
        height: { xs: "200px", sm: "250px", md: "300px" },
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
          fontSize: { xs: "20px", sm: "32px", md: "40px" },
          position: "absolute",
          bottom: "10%",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Privacy
      </Typography>
    </Box>
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
        At Ummati Community, we value and respect the privacy of our users. This
        Privacy Policy explains how we collect, use, disclose, and protect your
        personal information when you use our website (ummaticommunity.com),
        mobile applications, and other online services.
      </Typography>

      <Section title="1. Information We Collect">
        <Typography sx={styles.text}>
          We may collect the following types of information:
        </Typography>
        <Typography sx={styles.text}>
          <strong>Personal Information:</strong> Your name, email address, phone
          number, and contact details.
          <br />
          <strong>Account Information:</strong> Username, password, profile
          picture, and preferences.
          <br />
          <strong>Usage Data:</strong> Information like IP addresses, browser
          type, device information, and pages visited.
          <br />
          <strong>Cookies:</strong> Cookies and similar technologies for
          enhancing user experience and website performance.
        </Typography>
      </Section>

      <Section title="2. How We Use Your Information">
        <Typography sx={styles.text}>
          The information we collect is used for:
        </Typography>
        <ul style={styles.list}>
          <li>Providing and improving our services.</li>
          <li>Personalizing your experience.</li>
          <li>Communicating updates and offers.</li>
          <li>Ensuring legal compliance.</li>
          <li>Conducting data analysis.</li>
        </ul>
      </Section>

      <Section title="3. Sharing of Your Information">
        <Typography sx={styles.text}>
          We may share your personal data with:
        </Typography>
        <ul style={styles.list}>
          <li>
            <strong>Service Providers:</strong> Hosting and analytics services.
          </li>
          <li>
            <strong>Legal Compliance:</strong> For valid legal processes.
          </li>
          <li>
            <strong>Business Transfers:</strong> During mergers or acquisitions.
          </li>
        </ul>
      </Section>

      <Section title="4. Data Security">
        We implement appropriate technical and organizational security measures
        to protect your information from unauthorized access, loss, or
        alteration.
      </Section>

      <Section title="5. Your Rights">
        You have the right to:
        <ul style={styles.list}>
          <li>Access, correct, or delete your personal information.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Request restrictions on data processing.</li>
        </ul>
      </Section>

      <Section title="6. Children's Privacy">
        Our services are not intended for individuals under 13, and we do not
        knowingly collect data from children.
      </Section>

      <Section title="7. Changes to the Privacy Policy">
        We reserve the right to modify this Privacy Policy. Updates will be
        reflected in the “Effective Date” at the top of this policy.
      </Section>

      <Section title="8. Contact Us">
        If you have questions or concerns, please contact us at:
        <Box
          sx={{
            marginTop: "24px",
          }}
        >
          <Typography>Email: team@ummaticommunity.com</Typography>
        </Box>
      </Section>
    </Container>

    <Footer />
  </Box>
);

const Section = ({ title, children }) => (
  <Box sx={{ marginBottom: "24px" }}>
    <Typography sx={styles.sectionTitle}>{title}</Typography>
    {children}
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
    fontFamily: "Poppins",
    fontWeight: "700",
    wordWrap: "break-word",
    marginBottom: "8px",
  },
  list: {
    color: "black",
    fontSize: "16px",
    fontFamily: "Poppins",
    marginLeft: "20px",
    marginBottom: "16px",
    listStyleType: "disc",
  },
};

export default Privacy;
