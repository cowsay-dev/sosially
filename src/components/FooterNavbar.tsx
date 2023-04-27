import React from "react";
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import "../stylesheets/FooterNavbar.css";
import { useNavigate } from "react-router-dom";

const FooterNavbar = () => {
  const navigate = useNavigate();
  const currentLocation: string = window.location.pathname.slice(1);
  return (
    <nav className="footer-nav-main">
      <div className="footer-nav-icon-div" onClick={() => navigate("/feeds")}>
        <AiOutlineHome
          className="footer-icon"
          style={{ color: currentLocation === "feeds" ? "#5e17eb" : "gray" }}
        />
      </div>
      <div
        className="footer-nav-icon-div"
        onClick={() => navigate("/connections")}
      >
        <BsPersonAdd
          className="footer-icon"
          style={{
            color: currentLocation === "connections" ? "#5e17eb" : "gray",
          }}
        />
      </div>
      <div
        className="footer-nav-icon-div"
        onClick={() => navigate("/liked-posts")}
      >
        <AiOutlineHeart
          className="footer-icon"
          style={{
            color: currentLocation === "liked-posts" ? "#5e17eb" : "gray",
          }}
        />
      </div>
      <div className="footer-nav-icon-div" onClick={() => navigate("/profile")}>
        <RxAvatar
          className="footer-icon"
          style={{
            color: currentLocation.includes("profile") ? "#5e17eb" : "gray",
          }}
        />
      </div>
    </nav>
  );
};

export default FooterNavbar;
