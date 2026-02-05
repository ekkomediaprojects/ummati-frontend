import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bannerImage from "../assets/images/purpleBanner.png";
// import { Collapse, Typography, Box } from "@mui/material";
// import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      question: "What is Ummati Community?",
      answer:
        "Ummati Community is a ladies-only social group for ladies of all ages. Ummati Community plans engaging events for anyone wanting to meet new people and socialize about their common interests.",
    },
    {
      question: "How do I join Ummati Community?",
      answer:
        "Joining the Ummati Community is easy! You can browse our calendar and purchase tickets for the events you want to attend. You can also join our membership and enjoy perks for that.",
    },
    {
      question: "Is there an age range?",
      answer:
        "Our minimum age requirement is 15 years. Mothers can bring their children to events as long as they take responsibility for supervising them.",
    },
    {
      question: "What city is Ummati Community based in?",
      answer:
        "Ummati Community is growing! We currently have chapters in Dallas, TX, Houston, TX, Fort Worth, TX, and Little Rock, AR.",
    },
    {
      question: "How can I open a chapter in my city?",
      answer:
        "Ummati Community’s main headquarters is in Dallas, TX. If you are wanting to start your own chapter in your city, visit our ‘Contact Us’ page on our website and submit the form. Our team will setup a meeting with you and help with establishing a new chapter in your city. ",
    },
    {
      question: "How do I contact the event planners?",
      answer: (
        <>
          If you have any questions about events please message us through our Contact Us page on our website or you can DM us directly on our Instagram.
           {" "}(<a
            href="https://www.instagram.com/uc.dallas"
            target="_blank"
            rel="noreferrer"
          >
            uc.dallas
          </a>{" "}
          |{" "}
          <a
            href="https://www.instagram.com/uc.fortworth"
            target="_blank"
            rel="noreferrer"
          >
            uc.fortworth
          </a>{" "}
          |{" "}
          <a
            href="https://www.instagram.com/uc.houston"
            target="_blank"
            rel="noreferrer"
          >
            uc.houston
          </a>{" "}
          |{" "}
          <a
            href="https://www.instagram.com/uc.littlerock"
            target="_blank"
            rel="noreferrer"
          >
            uc.littlerock
          </a>)
        </>
      ),
    },
    {
      question: "How can I share event ideas?",
      answer:
        "Visit our Contact Us page on our website to send us all of your ideas or DM us on Instagram. We love hearing from you!",
    },
    {
      question: "Is there a membership fee?",
      answer:
        "Yes, we have two memberships tiers: we have a free version where you can pay for each event or you can pay the monthly fee which covers all the events fees for the month! You can check out our membership page for more details and perks.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "No, all tickets are non-refundable. Please make sure your schedule and plans are confirmed before purchasing, as we cannot offer refunds under any circumstances.",
    },
  ];

  return (
    <section className="w-full h-full relative bg-[#F7F5EF]">
      {/* Banner Section */}
      <Box
        sx={{
          width: "100%",
          height: "219px",
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
          FAQs
        </Typography>
      </Box>

      {/* FAQ Content */}
      <Box sx={{ px: { xs: "20px", sm: "40px", md: "160px" }, py: "60px" }}>
        {questions.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "white",
              border: "1px solid ##C4BAA2",
              borderRadius: "8px",
              "&:before": {
                display: "none", // Removes default accordion divider line
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ArrowDropDownCircleOutlined
                  sx={{ color: "#78B27B", fontSize: "30px" }}
                />
              }
              sx={{
                fontSize: { xs: "16px", sm: "18px", md: "30px" },
                fontWeight: "bold",
                fontFamily: "Quicksand",
                color: "#3D3D3C",
              }}
            >
              {item.question}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                fontSize: { xs: "14px", sm: "16px", md: "20px" },
                fontFamily: "Poppins",
                color: "#646363",
                lineHeight: "1.6",
              }}
            >
              {item.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </section>
  );
};

export default FAQ;
