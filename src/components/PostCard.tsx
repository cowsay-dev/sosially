import { doc, updateDoc } from "firebase/firestore";
import React, { Dispatch, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { auth, db } from "../config/firebase";
import {
  CommentDataInterface,
  PostDataInterface,
  UserDataInterface,
} from "../interfaces";
import { setPostData } from "../store/postDataSlice";
import "../stylesheets/PostCard.css";
import CommentSection from "./CommentSection";
import Skeleton from "react-loading-skeleton";

const PostCard = (props: PostDataInterface) => {
  const userId = auth.currentUser?.uid;
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const postData = useSelector((state: any) => state.postData.data);
  const commentData = useSelector((state: any) => state.commentData.data);
  const allUserData: UserDataInterface[] = useSelector(
    (state: any) => state.allUsersData.data
  );
  const [liked, setLiked] = useState<boolean>(
    props.likedBy.includes(auth.currentUser?.uid as string)
  );
  const [showComments, setShowComments] = useState<boolean>(false);
  const imageErrorHandler = (e: any) => {
    e.target.src = require("../assets/image-not-found.jpg");
  };

  const timeDifference = (): string => {
    let currentTimestamp = new Date().getTime();
    let difference = currentTimestamp - props.createdAt;

    let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    let minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    // let secondsDifference = Math.floor(difference / 1000);

    let result: string = "";
    if (daysDifference >= 365) {
      const year = Math.floor(daysDifference / 365);
      const yearStr = year > 1 ? "years" : "year";
      result = `${year} ${yearStr} ago`;
    } else if (daysDifference > 30 && daysDifference < 365) {
      const month = Math.floor(daysDifference / 31);
      const monthStr = month > 1 ? "months" : "month";
      result = `${month} ${monthStr} ago`;
    } else if (daysDifference > 0 && daysDifference <= 30) {
      const dayStr = daysDifference > 1 ? "days" : "day";
      result = `${daysDifference} ${dayStr} ago`;
    } else if (hoursDifference > 0 && hoursDifference < 12) {
      const hourStr = hoursDifference > 1 ? "hours" : "hour";
      result = `${hoursDifference} ${hourStr} ago`;
    } else if (minutesDifference > 0 && minutesDifference < 60) {
      const minuteStr = minutesDifference > 1 ? "minutes" : "minute";
      result = `${minutesDifference} ${minuteStr} ago`;
    } else {
      result = "a few seconds ago";
    }
    return result;
  };

  const likeHandler = async () => {
    if (postData.length > 0) {
      const dummy = { ...props };
      if (!liked) {
        await updateDoc(doc(db, "posts", dummy.id), {
          likedBy: [...dummy.likedBy, userId],
        });
        const updatedData: PostDataInterface[] = postData.map(
          (data: PostDataInterface) => {
            if (data.id === dummy.id) {
              const val = { ...data };
              val.likedBy = [...val.likedBy, userId as string];
              return val;
            } else {
              return data;
            }
          }
        );
        dispatch(setPostData(updatedData));
      } else {
        let updatedArr: string[] = [];
        const updatedData: PostDataInterface[] = postData.map(
          (data: PostDataInterface) => {
            if (data.id === dummy.id) {
              const val = { ...data };
              val.likedBy = [
                ...val.likedBy.filter((currUId: string) => currUId !== userId),
              ];
              updatedArr = [...val.likedBy];
              return val;
            } else {
              return data;
            }
          }
        );
        dispatch(setPostData(updatedData));
        await updateDoc(doc(db, "posts", dummy.id), {
          likedBy: updatedArr,
        });
      }
      setLiked(!liked);
    }
  };

  const userData = allUserData.filter(
    (val: UserDataInterface) => val.userId === props.uid
  )[0];
  return (
    <section className="pcard-main">
      <div className="pcard-info-div">
        <div className="pcard-avatar-div">
          {userData?.avatar ? (
            <img
              src={
                userData?.avatar === ""
                  ? require("../assets/dummy-avatar.png")
                  : userData?.avatar
              }
              alt="user-pic"
            />
          ) : (
            <Skeleton circle width={36} height={36} />
          )}
        </div>
        <div className="pcard-udetail-div">
          <p className="pcard-uname">{userData?.username}</p>
          <p className="pcard-posted-time">{timeDifference()}</p>
        </div>
      </div>
      <div className="pcard-post-text-div">
        <p>{props.text}</p>
      </div>
      <div className="pcard-post-img-div">
        <img
          src={props.imgUrl}
          alt="post-card-img"
          onError={imageErrorHandler}
        />
      </div>
      <div className="pcard-options-div">
        <div className="pcard-options-icon-div">
          {liked ? (
            <AiFillHeart
              className="pcard-options-icon"
              onClick={likeHandler}
              style={{ color: "red" }}
            />
          ) : (
            <AiOutlineHeart
              className="pcard-options-icon"
              onClick={likeHandler}
            />
          )}
          <p>
            {props.likedBy.length} {props.likedBy.length > 1 ? "Likes" : "Like"}
          </p>
        </div>
        <div className="pcard-options-icon-div">
          <TbMessageCircle2
            className="pcard-options-icon"
            onClick={() => setShowComments(!showComments)}
          />
          <p>
            {
              commentData.filter(
                (data: CommentDataInterface) => data.pid === props.id
              ).length
            }{" "}
            {commentData.filter(
              (data: CommentDataInterface) => data.pid === props.id
            ).length > 1
              ? "Comments"
              : "Comment"}
          </p>
        </div>
      </div>
      {showComments && <CommentSection pId={props.id} />}
    </section>
  );
};

export default PostCard;
