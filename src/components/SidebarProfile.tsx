import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/LeftSidebar.css";
import { UserDataInterface } from "../interfaces";
import { useSelector } from "react-redux";
import SideProfileSkeleton from "../skeletons/SideProfileSkeleton";

const SidebarProfile = () => {
  const navigate = useNavigate();
  const allUserData: UserDataInterface[] = useSelector(
    (state: any) => state.allUsersData.data
  );
  const userData: UserDataInterface = allUserData.filter(
    (val: UserDataInterface) =>
      val.userId === (sessionStorage.getItem("auth-key") as string)
  )[0];
  return (
    <section className="ls-profile-main">
      {userData?.username ? (
        <>
          <div className="ls-profile-div">
            <div className="ls-profile-avatar-div">
              <img
                src={
                  userData?.avatar === ""
                    ? require("../assets/dummy-avatar.png")
                    : userData?.avatar
                }
                alt="ls-profile"
              />
            </div>
            <div className="ls-profile-detail">
              <p>Welcome back, {userData?.username}!</p>
            </div>
          </div>
          <div className="ls-profile-link-div">
            <span onClick={() => navigate("/profile")}>
              View Profile &rarr;
            </span>
          </div>
        </>
      ) : (
        <SideProfileSkeleton />
      )}
    </section>
  );
};

export default SidebarProfile;
