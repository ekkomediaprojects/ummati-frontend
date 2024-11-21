import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bannerImage from "../assets/images/purpleBanner.png";
import { Collapse, Typography, Box } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

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
        "Our minimum age requirement is 18 years. Mothers can bring their children to events as long as they take responsibility for supervising them.",
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
      answer:
        "If you have any questions about events please message us through our Contact Us page on our website or you can DM us directly on our Instagram. ",
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
        "We are able to refund tickets to events a week before the event. Refunds that are requested during the week of the events are nonrefundable.",
    },
  ];

  return (
    <section className="w-full h-full relative bg-[#F7F5EF]">
      <Header />

      {/* Banner Section */}
      <Box
        sx={{
          width: "100%",
          height: "220px",
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
            fontSize: { xs: "36px", sm: "48px", md: "56px" },
            position: "absolute",
            top: "80%",
            transform: "translateY(-50%)",
          }}
        >
          FAQs
        </Typography>
      </Box>
      {/* FAQ Content */}
      <section className="px-[160px] py-[60px] flex flex-col gap-5">
        {questions.map((item, index) => (
          <article
            key={index}
            className="p-[49px] bg-white rounded-[8px] border border-[#C4BAA2] flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
            style={{ height: openIndex === index ? "auto" : "150px" }}
          >
            <header
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <h2 className="w-full text-black text-[30px] font-quicksand font-bold break-words">
                {item.question}
              </h2>
              <div
                className={`flex items-center justify-center transition-transform duration-300 ${
                  openIndex === index ? "rotate-0" : "rotate-180"
                }`}
              >
                <div className="w-[40px] h-[40px] rounded-full border-2 border-[#78B27B] flex items-center justify-center">
                  {openIndex === index ? (
                    <KeyboardArrowUp style={{ color: "#78B27B" }} />
                  ) : (
                    <KeyboardArrowDown style={{ color: "#78B27B" }} />
                  )}
                </div>
              </div>
            </header>
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <section
                className="w-full text-[#646363] text-[20px] font-poppins font-normal mt-[10px] break-words"
                style={{ lineHeight: "30px" }}
              >
                {item.answer}
              </section>
            </Collapse>
          </article>
        ))}
      </section>

      <Footer />
    </section>
  );
};

export default FAQ;
