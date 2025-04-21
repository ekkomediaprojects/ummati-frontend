import { Link, useLocation } from "react-router-dom"

const DashboardNavItem = ({ text, href, onClick }) => {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`py-2 px-2 rounded-md text-sm font-medium transition-colors duration-150 block ${
        isActive ? "bg-white text-black" : "text-gray-300 hover:text-white"
      }`}
    >
      {text}
    </Link>
  )
}

export default DashboardNavItem
