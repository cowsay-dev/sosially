import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/HomeSidebar.css";

const HomeSidebar = () => {
  const navigate = useNavigate();
  return (
    <section className="home-sidebar-main">
      <div className="home-sidebar-logo-div">
        <img src={require("../assets/logo-2.png")} alt="logo" />
      </div>
      <div className="home-sidebar-btns">
        <button id="home-login" onClick={() => navigate("/login")}>
          Login
        </button>
        <button id="home-signup" onClick={() => navigate("/signup")}>
          Create new account
        </button>
      </div>
      <div className="home-sidebar-policy">
        <p>
          By Signing up you agree to the{" "}
          <span>Terms of use & privacy policy</span>
        </p>
      </div>
    </section>
  );
};

export default HomeSidebar;
