// src/pages/FAQ.js
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bannerImage from "../assets/images/purpleBanner.png";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0); // Index of the currently open question

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle open/close
    };

    const questions = [
        {
            question: "What is Ummati Community?",
            answer: "Ummati Community is a ladies-only social group for ladies of all ages. Ummati Community plans engaging events for anyone wanting to meet new people and socialize about their common interests.",
        },
        {
            question: "How do I join Ummati Community?",
            answer: "Joining the Ummati Community is easy! You can browse our calendar and purchase tickets for the events you want to attend. You can also join our membership and enjoy perks for that.",
        },
        {
            question: "Is there an age range?",
            answer: "Our minimum age requirement is 18 years. Mothers can bring their children to events as long as they take responsibility for supervising them.",
        },
        {
            question: "What city is Ummati Community based in?",
            answer: "Ummati Community is growing! We currently have chapters in Dallas, TX, Houston, TX, Fort Worth, TX, and Little Rock, AR.",
        },
        {
            question: "How can I open a chapter in my city?",
            answer: "If you want to start your own chapter, visit our ‘Contact Us’ page and submit the form. Our team will set up a meeting to help establish a new chapter in your city.",
        },
        {
            question: "How do I contact the event planners?",
            answer: "Please message us through our Contact Us page on our website, or DM us on Instagram.",
        },
        {
            question: "How can I share event ideas?",
            answer: "Visit our Contact Us page on our website to send us your ideas, or DM us on Instagram. We love hearing from you!",
        },
        {
            question: "Is there a membership fee?",
            answer: "Yes, we have two membership tiers: a free version where you pay for each event, or a monthly fee that covers all event fees. Check our Membership page for more details.",
        },
        {
            question: "What is the refund policy?",
            answer: "We refund tickets a week before the event. Refunds requested during the event week are non-refundable.",
        },
    ];

    return (
        <div style={styles.pageContainer}>
            <Header />

            {/* Banner Section */}
            <div style={styles.banner}>
                <h1 style={styles.bannerText}>FAQ</h1>
            </div>

            {/* FAQ Content */}
            <div style={styles.faqContainer}>
                {questions.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.questionBox,
                            height: openIndex === index ? "auto" : "80px", // Adjust height based on open/closed
                        }}
                    >
                        <div
                            style={styles.questionHeader}
                            onClick={() => toggleQuestion(index)}
                        >
                            <div style={styles.questionTitle}>{item.question}</div>
                            <div
                                style={{
                                    ...styles.toggleIcon,
                                    transform: openIndex === index ? "rotate(0deg)" : "rotate(180deg)",
                                }}
                            >
                                <div style={styles.circle}>
                                    <div style={styles.arrow} />
                                    <div style={styles.arrowHead} />
                                </div>
                            </div>
                        </div>
                        {openIndex === index && (
                            <div style={styles.answerText}>{item.answer}</div>
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    pageContainer: {
        width: "100%",
        height: "100%",
        position: "relative",
        background: "#F7F5EF",
    },
    banner: {
        width: "100%",
        height: "220px",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    bannerText: {
        color: "black",
        fontFamily: "Caprasimo",
        fontSize: "56px",
        textAlign: "center",
    },
    faqContainer: {
        padding: "60px 160px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    questionBox: {
        padding: "20px",
        background: "white",
        borderRadius: "8px",
        border: "1px solid #C4BAA2",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "height 0.3s ease-in-out",
    },
    questionHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
    },
    questionTitle: {
        width: "100%",
        color: "black",
        fontSize: "30px",
        fontFamily: "Quicksand",
        fontWeight: "700",
        wordWrap: "break-word",
    },
    toggleIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s ease-in-out",
    },
    circle: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "2px solid #78B27B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    arrow: {
        width: "10px",
        height: "10px",
        borderTop: "2px solid #78B27B",
        borderLeft: "2px solid #78B27B",
        transform: "rotate(45deg)", // Arrow initially points down
        position: "absolute",
    },
    answerText: {
        width: "100%",
        color: "#646363",
        fontSize: "20px",
        fontFamily: "Poppins",
        fontWeight: "400",
        wordWrap: "break-word",
        marginTop: "10px",
    },
};

export default FAQ;
