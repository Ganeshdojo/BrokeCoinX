import { Outlet } from "react-router-dom";

import SideBar from "../../pages/home/SideBar";
import NavBar from "../../pages/home/NavBar";
import Footer from "../../pages/home/Footer";

import "./Layout.css";

const Layout = () => {
  return (
    <div className="app-layout">
      <SideBar />
      <div className="main-content-area">
        <NavBar />

        <div className="page-content">
          <Outlet />
        </div>

        <div className="footer-content">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
