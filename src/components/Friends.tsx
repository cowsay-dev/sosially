import React, { useState } from "react";
import "../stylesheets/Friends.css";
import RSFeeds from "./RSFeeds";
import LSFeeds from "./LSFeeds";
import useFetchConnectionData from "../hooks/useFetchConnectionData";
import useFetchAllUsersdata from "../hooks/useFetchUsersdata";
import useFetchRecommendation from "../hooks/useFetchRecommendation";

const Friends = () => {
  const [toggle, setToggle] = useState<string>("connection");
  const toggleHandler = (arg: string) => {
    setToggle(arg);
  };
  useFetchConnectionData();
  useFetchAllUsersdata();
  useFetchRecommendation();
  return (
    <>
      <div className="toggle-div">
        <button
          onClick={() => toggleHandler("connection")}
          style={{
            backgroundColor:
              toggle === "connection" ? "#5e17eb" : "transparent",
            color: toggle === "connection" ? "white" : "black",
          }}
        >
          Connection
        </button>
        <button
          onClick={() => toggleHandler("recommendation")}
          style={{
            backgroundColor:
              toggle === "recommendation" ? "#5e17eb" : "transparent",
            color: toggle === "recommendation" ? "white" : "black",
          }}
        >
          Recommendation
        </button>
      </div>
      {toggle === "recommendation" ? (
        <div className="rs-feed-main">
          <RSFeeds />
        </div>
      ) : (
        <div className="ls-feed-main">
          <LSFeeds />
        </div>
      )}
    </>
  );
};

export default Friends;
