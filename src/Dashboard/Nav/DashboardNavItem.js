import { NavLink } from "react-router-dom";

const DashboardNavItem = ({ text, href }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `py-4 px-4 text-[#a5a5a5] transition-colors hover:text-white ${
          isActive ? "bg-themeblack bg-opacity-90 !text-white" : ""
        }`
      }
    >
      {text}
    </NavLink>
  );
};

export default DashboardNavItem;
