import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bannerImage from '../assets/images/purpleBanner.png';
import '../assets/fonts/Poppins-Regular.ttf';
import '../assets/fonts/Quicksand-Regular.ttf';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        topic: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hoveredOption, setHoveredOption] = useState(null);

    const dropdownOptions = [
        'Collaborations',
        'Business Partnerships',
        'Sponsorship',
        'Join the Team',
        'Start a Chapter',
        'Other',
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleDropdownSelect = (option) => {
        setFormData((prevData) => ({ ...prevData, topic: option }));
        setIsDropdownOpen(false);
        setErrors((prevErrors) => ({
            ...prevErrors,
            topic: '',
        }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required.';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!formData.topic.trim()) {
            newErrors.topic = 'Please select a topic.';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Form Data Submitted:', formData);
            alert('Form submitted successfully!');
        }
    };

    return (
        <div>
            <Header />

            {/* Banner Section */}
            <div style={styles.banner}>
                <h1 style={styles.bannerText}>Contact</h1>
            </div>

            {/* Main Content Section */}
            <div style={styles.contentSection}>
                <h2 style={styles.title}>Get in Touch with Us!</h2>
                <p style={styles.text}>
                    Have any questions or need assistance? We’re here to help. Fill out the form below, and we’ll get back to you as soon as possible.
                </p>

                {/* Contact Form */}
                <div style={styles.formContainer}>
                    {/* First Name */}
                    <div style={styles.inputGroup}>
                        <div style={styles.labelContainer}>
                            <label style={styles.label}>First Name</label>
                            {errors.firstName && <span style={styles.errorText}>{errors.firstName}</span>}
                        </div>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter First Name"
                            style={styles.inputBox}
                        />
                    </div>

                    {/* Last Name */}
                    <div style={styles.inputGroup}>
                        <div style={styles.labelContainer}>
                            <label style={styles.label}>Last Name</label>
                            {errors.lastName && <span style={styles.errorText}>{errors.lastName}</span>}
                        </div>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter Last Name"
                            style={styles.inputBox}
                        />
                    </div>

                    {/* Email */}
                    <div style={styles.inputGroup}>
                        <div style={styles.labelContainer}>
                            <label style={styles.label}>Email</label>
                            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter Email"
                            style={styles.inputBox}
                        />
                    </div>

                    {/* Topic (Dropdown) */}
                    <div style={styles.inputGroup}>
                        <div style={styles.labelContainer}>
                            <label style={styles.label}>Topic</label>
                            {errors.topic && <span style={styles.errorText}>{errors.topic}</span>}
                        </div>
                        <div
                            style={styles.dropdownContainer}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div style={styles.dropdownSelected}>
                                {formData.topic || 'Select Topic'}
                            </div>
                            {isDropdownOpen && (
                                <div style={styles.dropdownMenu}>
                                    {dropdownOptions.map((option) => (
                                        <div
                                            key={option}
                                            style={{
                                                ...styles.dropdownOption,
                                                ...(hoveredOption === option
                                                    ? styles.dropdownOptionHover
                                                    : {}),
                                            }}
                                            onMouseEnter={() => setHoveredOption(option)}
                                            onMouseLeave={() => setHoveredOption(null)}
                                            onClick={() => handleDropdownSelect(option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Message */}
                    <div style={styles.inputGroup}>
                        <div style={styles.labelContainer}>
                            <label style={styles.label}>Message</label>
                            {errors.message && <span style={styles.errorText}>{errors.message}</span>}
                        </div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Enter Message"
                            style={styles.textareaBox}
                        />
                    </div>

                    {/* Submit Button */}
                    <div style={styles.submitButton} onClick={handleSubmit}>
                        <span style={styles.submitText}>Submit</span>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    banner: {
        width: '100%',
        height: '220px',
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerText: {
        color: 'black',
        fontFamily: 'Caprasimo',
        fontSize: '56px',
    },
    contentSection: {
        background: '#F7F5EF',
        padding: '20px', // Reduced padding for smaller screens
        textAlign: 'center',
    },
    title: {
        color: '#5A4283',
        fontSize: '32px',
        fontFamily: 'Quicksand',
        fontWeight: '500',
        marginBottom: '20px',
    },
    text: {
        color: 'black',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '500',
        marginBottom: '40px',
    },
    formContainer: {
        width: '90%', // Adjusted for smaller screens
        maxWidth: '600px',
        padding: '16px', // Reduced padding
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px', // Reduced gap for compact layout
        margin: '0 auto',
        alignItems: 'flex-start',
        textAlign: 'left',
    },
    inputGroup: {
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        alignSelf: 'stretch',
        color: '#1E1E1E',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    inputBox: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        fontSize: '16px',
        fontFamily: 'Poppins',
    },
    textareaBox: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        fontSize: '16px',
        fontFamily: 'Poppins',
        minHeight: '100px',
    },
    dropdownContainer: {
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '8px',
        border: '1px solid #C4BAA2',
        background: '#F7F5EF',
    },
    dropdownSelected: {
        padding: '12px',
        fontSize: '16px',
        fontFamily: 'Poppins',
        color: 'black',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        background: '#F7F5EF',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
    },
    dropdownOption: {
        padding: '12px',
        color: 'black',
        fontSize: '12px',
        fontFamily: 'Poppins',
        background: '#F7F5EF',
        borderLeft: '1px solid #C4BAA2',
        borderRight: '1px solid #C4BAA2',
        cursor: 'pointer',
    },
    dropdownOptionHover: {
        background: '#D9F4DA',
    },
    submitButton: {
        alignSelf: 'stretch',
        padding: '12px',
        background: '#78B27B',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    submitText: {
        color: 'white',
        fontSize: '16px',
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    labelContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    errorText: {
        color: 'red',
        fontSize: '12px',
        fontFamily: 'Poppins',
        fontWeight: '400',
        marginLeft: '10px',
    },
};

export default Contact;
