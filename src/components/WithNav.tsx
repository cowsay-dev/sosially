import React from "react";
import { Outlet } from "react-router-dom";
import FooterNavbar from "./FooterNavbar";
import Navbar from "./Navbar";

const WithNav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <FooterNavbar />
    </>
  );
};

export default WithNav;
