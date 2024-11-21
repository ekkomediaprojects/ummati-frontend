import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  // Function to check if the current path matches the exact nav item or is in the chapters path
  const isActive = (path) => location.pathname === path;
  
  // Check if the current path is for any chapter
  const isChaptersActive = () => location.pathname.startsWith("/chapters");
  
  // Check if a specific chapter is selected
  const isChapterSelected = (chapterPath) => location.pathname === chapterPath;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <header className="flex items-center justify-between bg-white py-8 px-6 w-full ">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-[#5A4283] text-xl font-bold">UMMATI C</span>
        <img src={logo} alt="Logo" className="w-[40px] h-[40px] -mt-1 -mx-3" />
        <span className="text-[#5A4283] text-xl font-bold">MMUNITY</span>
      </Link>

      {/* Hamburger Icon */}
      <div
        className="text-2xl text-[#5A4283] cursor-pointer lg:hidden"
        onClick={toggleMenu}
      >
        {menuOpen ? "✕" : "☰"}
      </div>

      {/* Navigation */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row lg:items-center gap-4 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-10 lg:z-auto py-4 lg:py-0 px-6 lg:px-0 shadow-lg lg:shadow-none`}
      >
        <nav className="flex flex-col lg:flex-row items-center lg:justify-center gap-4 px-4">
          {navItems.map((item) => {
            if (item.name === "Chapters") {
              return (
                <div
                  key={item.name}
                  className="relative w-full h-[40px] flex items-center px-4"
                  onClick={toggleDropdown}
                >
                  <button
                    className={`text-[#5A4283] text-lg w-full text-left ${
                      isChaptersActive() ? "font-bold" : "font-normal"
                    }`}
                  >
                    {item.name}
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute top-[40px] left-0 bg-white shadow-lg w-[300px] z-20">
                      {chapters.map((chapter) => (
                        <div
                          key={chapter.name}
                          className={`w-full hover:bg-[#D9F4DA] h-[50px] flex items-center px-2 ${
                            isChapterSelected(chapter.path) ? "bg-[#D9F4DA]" : ""
                          }`}
                        >
                          <Link
                            to={chapter.path}
                            className="text-[#5A4283] text-sm w-full"
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
                className="w-full h-[40px] flex items-center px-4"
              >
                <Link
                  to={item.path}
                  className={`text-[#5A4283] text-lg w-full ${
                    isActive(item.path) ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="mt-4 lg:mt-0 text-center">
          <button className="bg-[#78B27B] text-white px-6 py-2 rounded-full font-bold text-sm" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
