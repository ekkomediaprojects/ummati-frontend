import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { Menu, MenuItem, Avatar, Typography, Button, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userLogined, setUserLogined] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("userLogin");
    console.log("user", user);
    setUserLogined(user ? JSON.parse(user) : null);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu when the user clicks the avatar
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleProfile = () => {
    navigate("/profile"); // Navigate to the profile page
    handleCloseMenu(); // Close the menu after navigating
  };

  const handleLogout = () => {
    localStorage.removeItem("userLogin"); // Clear the user data (or perform logout logic)
    navigate("/login"); // Navigate to the login page
    handleCloseMenu(); // Close the menu after logging out
    setUserLogined(null);
  };
  const navItems = [
    { name: "Events", path: "/events" },
    { name: "Podcast", path: "/podcast" },
    { name: "Membership", path: "/membership" },
    { name: "Chapters", path: "/chapters" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const chapters = [
    { name: "Dallas, TX Chapter", path: "/chapters/dallas" },
    { name: "Fort Worth, TX Chapter", path: "/chapters/fort-worth" },
    { name: "Houston, TX Chapter", path: "/chapters/houston" },
    { name: "Little Rock, AR Chapter", path: "/chapters/little-rock" },
  ];

  // Check if the current path matches a specific nav item or is in the chapters path
  const isActive = (path) => location.pathname === path;

  const isChaptersActive = () => location.pathname.startsWith("/chapters");

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleNavigate = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown when navigating
  };

  return (
    <header className="relative flex items-center justify-between bg-white py-8 px-6 w-full">
      {/* Logo */}
      <Link
        to="/"
        style={{ textDecoration: "none" }} 
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, 
            alignItems: "center",
            gap: { xs: 0, md: 1 },
          }}
        >
          {/* First Child Box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5, 
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#5A4283",
                fontWeight: "700",
                fontFamily: "Quicksand",
                fontSize: { xs: "26px", lg: "32px" },
                fontHeight: { xs: "32.5", lg: "40px" },
              }}
            >
              UMMATI
            </Typography>
          </Box>

          {/* Second Child Box */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", 
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#5A4283",
                fontWeight: "700",
                fontFamily: "Quicksand",
                fontSize: { xs: "16px",md: "26px", lg: "32px" },
                fontHeight: { xs: "20px", md: "32.5", lg: "40px" },
              }}
            >
              C
            </Typography>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: { xs: "25px", md: "50px" }, 
                height: { xs: "25px", md: "50px" }, 
                marginTop: { xs: "-2px",  md: "-4px" }, 
                marginLeft: { xs: "-4px", md: "-6px" }, 
                marginRight: { xs: "-4px", md: "-6px" },
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#5A4283",
                fontWeight: "700",
                fontFamily: "Quicksand",
                fontSize: { xs: "16px",md: "26px", lg: "32px" },
                fontHeight: { xs: "20px", md: "32.5", lg: "40px" },
              }}
            >
              MMUNITY
            </Typography>
          </Box>
        </Box>
      </Link>

      {/* Hamburger Icon */}
      <div
        className="text-2xl text-[#78B27B] cursor-pointer lg:hidden"
        onClick={toggleMenu}
      >
        {menuOpen ? "✕" : "☰"}
      </div>

      {/* Navigation */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row lg:items-center gap-2 absolute lg:static top-[100%] left-0 w-full lg:w-auto bg-white lg:bg-transparent z-10 lg:z-auto py-2 lg:py-0 px-4 lg:px-0 shadow-lg lg:shadow-none`}
      >
        <nav className="flex flex-col lg:flex-row items-center lg:justify-center gap-2 px-2">
          {navItems.map((item) => {
            if (item.name === "Chapters") {
              return (
                <div
                  key={item.name}
                  className="relative w-full lg:w-auto h-[40px] flex items-center px-2"
                >
                  {/* Chapters Button */}
                  <button
                    className={`text-[#5A4283] text-base w-full text-left ${
                      location.pathname.startsWith("/chapters")
                        ? "font-bold"
                        : "font-normal"
                    }`}
                    onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
                  >
                    {item.name}
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute  left-0 bg-white top-[40px] shadow-lg w-[300px]    z-20">
                     <div
                          key={item.name}
                          className={`w-full hover:bg-[#D9F4DA] h-[50px] flex items-center px-2 ${
                            location.pathname === item.path
                              ? "bg-[#D9F4DA]"
                              : ""
                          }`}
                        >
                        <Link
                          to={item.path}
                          className={`text-[#5A4283] text-sm w-full font-normal`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      {chapters.map((chapter) => (
                        <div
                          key={chapter.name}
                          className={`w-full hover:bg-[#D9F4DA] h-[50px] flex items-center px-2 ${
                            location.pathname === chapter.path
                              ? "bg-[#D9F4DA]"
                              : ""
                          }`}
                        >
                          <Link
                            to={chapter.path}
                            className="text-[#5A4283] text-sm w-full"
                            onClick={() => handleNavigate(chapter.path)} // Navigate to chapter page on click
                          >
                            {chapter.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={item.name}
                className="w-full lg:w-auto h-[40px] flex items-center px-2"
              >
                <Link
                  to={item.path}
                  className={`text-[#5A4283] text-base w-full ${
                    isActive(item.path) ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            );
          })}
        </nav>
        {userLogined ? (
          <div className="mt-4 lg:mt-0 text-center flex items-center justify-center">
            <div>
              <div
                className="flex items-center justify-center cursor-pointer bg-[#D9F4DA] text-white px-2 py-2 rounded-full font-bold text-sm"
                onClick={handleMenuClick} // Open the dropdown menu
              >
                <Avatar
                  src={
                    userLogined?.imageUrl ||
                    "https://www.gravatar.com/avatar/placeholder-avatar"
                  }
                  alt="User"
                  sx={{ width: 32, height: 32, marginRight: 1 }}
                />

                {/* User name */}
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  className="text-[#4D744F]"
                >
                  {userLogined?.username}
                </Typography>

                {/* Dropdown icon */}
                <KeyboardArrowDownIcon
                  sx={{ marginLeft: 1, color: "#4D744F" }}
                />
              </div>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl} // Menu is anchored to this element
                open={Boolean(anchorEl)} // If anchorEl is set, the menu will open
                onClose={handleCloseMenu} // Close the menu
                PaperProps={{
                  sx: {
                    minWidth: 160,
                    borderRadius: 2,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    transform: "translateY(8px)",
                  },
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        ) : (
          <div className="mt-4 lg:mt-0 text-center">
            <button
              className="bg-[#78B27B] text-white px-6 py-2 rounded-full font-bold text-sm"
              onClick={() => handleNavigate("/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
