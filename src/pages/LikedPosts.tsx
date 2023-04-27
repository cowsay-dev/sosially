import React from "react";
import LSFeeds from "../components/LSFeeds";
import RSFeeds from "../components/RSFeeds";
import Friends from "../components/Friends";
import useFetchPostdata from "../hooks/useFetchPostdata";
import useFetchAllUsersdata from "../hooks/useFetchUsersdata";
import { useSelector } from "react-redux";
import { PostDataInterface } from "../interfaces";
import PostCard from "../components/PostCard";
import "../stylesheets/LikedPosts.css";
import "../stylesheets/RightSidebar.css";
import "../stylesheets/LeftSidebar.css";

const LikedPosts = () => {
  useFetchPostdata();
  useFetchAllUsersdata();
  const postData = useSelector((state: any) => state.postData.data);
  return (
    <main className="lp-main-div">
      <section className="lp-left-div">
        <div className="ls-feed-main">
          <LSFeeds />
        </div>
      </section>
      <section className="lp-center-div">
        <h3>Liked posts</h3>
        {postData.length > 0 &&
          postData
            .filter((data: PostDataInterface) =>
              data.likedBy.includes(
                sessionStorage.getItem("auth-key") as string
              )
            )
            .map((data: PostDataInterface, index: number) => {
              return <PostCard {...data} key={`post-card-${index}`} />;
            })}
      </section>
      <section className="lp-right-div">
        <div className="rs-feed-main">
          <RSFeeds />
        </div>
      </section>
      <section className="lp-right-div-2">
        <Friends />
      </section>
    </main>
  );
};

export default LikedPosts;
