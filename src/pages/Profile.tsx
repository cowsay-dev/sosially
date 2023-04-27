import React from "react";
import { useSelector } from "react-redux";
import LSFeeds from "../components/LSFeeds";
import PostCard from "../components/PostCard";
import ProfileCard from "../components/ProfileCard";
import RSFeeds from "../components/RSFeeds";
import useFetchPostdata from "../hooks/useFetchPostdata";
import { PostDataInterface } from "../interfaces";
import "../stylesheets/Profile.css";
import "../stylesheets/RightSidebar.css";
import "../stylesheets/LeftSidebar.css";
import Friends from "../components/Friends";
import useFetchAllUsersdata from "../hooks/useFetchUsersdata";

const Profile = () => {
  // const { id } = useParams();
  useFetchPostdata();
  useFetchAllUsersdata();
  const postData = useSelector((state: any) => state.postData.data);
  return (
    <main className="profile-main-div">
      <section className="profile-left-div">
        <div className="ls-feed-main">
          <LSFeeds />
        </div>
      </section>
      <section className="profile-center-div">
        <ProfileCard userId={sessionStorage.getItem("auth-key") as string} />
        {postData.length > 0 &&
          postData
            .filter(
              (data: PostDataInterface) =>
                data.uid === (sessionStorage.getItem("auth-key") as string)
            )
            .map((data: PostDataInterface, index: number) => {
              return <PostCard {...data} key={`post-card-${index}`} />;
            })}
      </section>
      <section className="profile-right-div">
        <div className="rs-feed-main">
          <RSFeeds />
        </div>
      </section>
      <section className="profile-right-div-2">
        <Friends />
      </section>
    </main>
  );
};

export default Profile;
