import React, { useState } from "react";
import "../stylesheets/Navbar.css";
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";

interface Props {
  logoutHandler: () => void;
  profileHandler: () => void;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const logoutHandler = () => {
    signOut(auth)
      .then(() => console.log("user logged out"))
      .catch((err) => console.log(err));
    navigate("/login");
    setShow(false);
    sessionStorage.removeItem("auth-key");
    sessionStorage.removeItem("logged-in");
  };
  const profileHandler = () => {
    navigate("/profile");
    setShow(false);
  };
  const currentLocation: string = window.location.pathname.slice(1);
  return (
    <nav className="navbar-main-div">
      <div className="navbar-first-div">
        <img src={require("../assets/logo-2.png")} alt="logo-img" />
      </div>
      <div className="navbar-second-div">
        <input type="text" placeholder="Search" />
        <div>
          <FiSearch className="navbar-search-icon" />
        </div>
      </div>
      <div className="navbar-third-div">
        <div title="Feeds" onClick={() => navigate("/feeds")}>
          <AiOutlineHome
            className="navbar-third-div-icon"
            style={{ color: currentLocation === "feeds" ? "#5e17eb" : "gray" }}
          />
        </div>
        <div title="Liked posts" onClick={() => navigate("/liked-posts")}>
          <AiOutlineHeart
            className="navbar-third-div-icon"
            style={{
              color: currentLocation === "liked-posts" ? "#5e17eb" : "gray",
            }}
          />
        </div>
        <div className="nav-avatar-div" onClick={() => setShow(!show)}>
          <RxAvatar
            className="navbar-third-div-icon"
            style={{
              color: currentLocation.includes("profile") ? "#5e17eb" : "gray",
            }}
          />
        </div>
      </div>
      <div className="navbar-last-div" title="Logout">
        <div onClick={logoutHandler}>
          <BiLogOutCircle className="navbar-last-div-icon" />
        </div>
      </div>
      {show && (
        <Options
          logoutHandler={logoutHandler}
          profileHandler={profileHandler}
        />
      )}
    </nav>
  );
};

const Options = (props: Props) => {
  return (
    <div className="option-main">
      <span onClick={props.profileHandler}>Profile</span>
      <span onClick={props.logoutHandler}>Logout</span>
    </div>
  );
};

export default Navbar;
