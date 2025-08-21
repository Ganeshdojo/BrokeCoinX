import { Home, ChartArea, Star } from "lucide-react";
import "./SideBar.css";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const navItems = [
    {
      icon: <Home size={24} className="icon" />,
      label: "Home",
      path: "/",
    },
    {
      icon: <ChartArea size={24} className="icon" />,
      label: "Chart",
      path: "/details",
    },
    {
      icon: <Star size={24} className="icon" />,
      label: "Favorites",
      path: "/watchlist",
    },
  ];

  return (
    <div className="sidebar">
      <div className="outer-box">
        <div className="inner-box"></div>
      </div>
      <div className="nav-items">
        {navItems.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {item.icon}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
