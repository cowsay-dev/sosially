import React from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import SidebarProfile from "../components/SidebarProfile";
import PostCard from "../components/PostCard";
import { PostDataInterface } from "../interfaces";
import "../stylesheets/Feeds.css";
import "../stylesheets/RightSidebar.css";
import "../stylesheets/LeftSidebar.css";
import LSFeeds from "../components/LSFeeds";
import RSFeeds from "../components/RSFeeds";
import useFetchCommentdata from "../hooks/useFetchCommentdata";
import useFetchPostdata from "../hooks/useFetchPostdata";
import Friends from "../components/Friends";
import useFetchAllUsersdata from "../hooks/useFetchUsersdata";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";

const Feeds = () => {
  const postData = useSelector((state: any) => state.postData.data);
  useFetchAllUsersdata();
  useFetchCommentdata();
  useFetchPostdata();
  return (
    <main className="feed-main-div">
      <section className="feed-left-div">
        <SidebarProfile />
        <div className="ls-feed-main">
          <LSFeeds />
        </div>
      </section>
      <section className="feed-center-div">
        <CreatePost />
        {postData.length > 0 ? (
          postData.map((data: PostDataInterface, index: number) => {
            return <PostCard {...data} key={`post-card-${index}`} />;
          })
        ) : (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
      </section>
      <section className="feed-right-div">
        <div className="rs-feed-main">
          <RSFeeds />
        </div>
      </section>
      <section className="feed-right-div-2">
        <Friends />
      </section>
    </main>
  );
};

export default Feeds;
