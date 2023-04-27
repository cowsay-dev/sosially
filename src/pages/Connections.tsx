import React, { useEffect, useState } from "react";
import Friends from "../components/Friends";
import "../stylesheets/Connections.css";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    if (width >= 767) {
      navigate("/feeds");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [width]);
  return (
    <div className="connection-main-div">
      <Friends />
    </div>
  );
};

export default Connections;
