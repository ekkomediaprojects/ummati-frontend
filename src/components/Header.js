import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/icons/logo.png';
import '../assets/fonts/Quicksand-Regular.ttf';
import '../assets/fonts/Poppins-Regular.ttf';

const Header = () => {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const navItems = [
        { name: 'Events', path: '/events' },
        { name: 'Podcast', path: '/podcast' },
        { name: 'Membership', path: '/membership' },
        { name: 'Chapters', path: '/chapters' }, // Main Chapters path
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const chapters = [
        { name: 'Dallas, TX', path: '/chapters/dallas' },
        { name: 'Fort Worth, TX', path: '/chapters/fort-worth' },
        { name: 'Houston, TX', path: '/chapters/houston' },
        { name: 'Little Rock, AR', path: '/chapters/little-rock' },
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
        setHoveredItem(null);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header style={styles.header}>
            <Link to="/" style={styles.titleContainer}>
                <span style={styles.titleText}>UMMATI C</span>
                <img src={logo} alt="Logo" style={styles.logo} />
                <span style={styles.titleText}>MMUNITY</span>
            </Link>

            <div style={styles.rightSection}>
                <nav style={styles.navLinks}>
                    {navItems.map((item) => {
                        if (item.name === 'Chapters') {
                            return (
                                <div
                                    key={item.name}
                                    style={styles.dropdownContainer}
                                    onMouseEnter={toggleDropdown}
                                    onMouseLeave={closeDropdown}
                                >
                                    <Link
                                        to={item.path} // Navigate to the main Chapters page
                                        style={{
                                            ...styles.navItem,
                                            ...(isActive(item.path) ? styles.activeNavItem : {}),
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                    {dropdownOpen && (
                                        <div style={styles.dropdown}>
                                            {chapters.map((chapter) => (
                                                <Link
                                                    key={chapter.name}
                                                    to={chapter.path}
                                                    style={{
                                                        ...styles.dropdownItem,
                                                        ...(hoveredItem === chapter.name
                                                            ? styles.dropdownItemHover
                                                            : {}),
                                                    }}
                                                    onMouseEnter={() => setHoveredItem(chapter.name)}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                >
                                                    {chapter.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                style={{
                                    ...styles.navItem,
                                    ...(isActive(item.path) ? styles.activeNavItem : {}),
                                }}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div style={styles.loginButton}>
                    <span style={styles.loginButtonText}>Login</span>
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'white',
        padding: '35px 40px',
        width: '100%',
        flexWrap: 'wrap',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        flexShrink: 0,
    },
    titleText: {
        color: '#5A4283',
        fontSize: '1.75rem',
        fontFamily: 'Quicksand',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        margin: 0,
    },
    logo: {
        width: 'clamp(30px, 5vw, 50px)',
        height: 'clamp(30px, 5vw, 50px)',
        marginTop: '-1px',
        marginLeft: '-13px',
        marginRight: '-13px',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    navLinks: {
        display: 'flex',
        gap: '20px',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    navItem: {
        color: '#5A4283',
        fontSize: '1rem',
        fontFamily: 'Quicksand',
        cursor: 'pointer',
        textAlign: 'center',
        whiteSpace: 'nowrap',
    },
    activeNavItem: {
        fontWeight: '700',
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        background: 'white',
        border: '1px solid #ECE7DA',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        zIndex: 10,
        width: '200px',
    },
    dropdownItem: {
        width: '100%',
        padding: '12px',
        color: '#1E1E1E',
        fontSize: '12px',
        fontFamily: 'Poppins',
        fontWeight: '400',
        display: 'inline-flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '11px',
        background: 'white',
        borderLeft: '1px solid #ECE7DA',
        borderTop: '1px solid #ECE7DA',
        borderRight: '1px solid #ECE7DA',
        textDecoration: 'none',
        transition: 'background-color 0.2s ease-in-out',
    },
    dropdownItemHover: {
        background: '#D9F4DA',
    },
    loginButton: {
        padding: '8px 16px',
        backgroundColor: '#78B27B',
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        color: '#D9F4DA',
        fontSize: '1rem',
        fontFamily: 'Quicksand',
        fontWeight: 700,
        letterSpacing: 0.32,
        whiteSpace: 'nowrap',
    },
};

export default Header;
