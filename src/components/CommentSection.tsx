import { collection, doc, setDoc } from "firebase/firestore";
import React, { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { auth, db } from "../config/firebase";
import { CommentDataInterface, UserDataInterface } from "../interfaces";
import { setCommentData } from "../store/commentDataSlice";
import "../stylesheets/CommentSection.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CommentInterface {
  commentText: string;
}

const CommentSection = (props: { pId: string }) => {
  const userId = auth.currentUser?.uid;
  const [commentText, setCommentText] = useState<string>("");
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const commentData = useSelector((state: any) => state.commentData.data);
  const allUserData: UserDataInterface[] = useSelector(
    (state: any) => state.allUsersData.data
  );
  const userData = allUserData.filter(
    (val: UserDataInterface) => val.userId === (userId as string)
  )[0];
  const commentSchema = yup.object().shape({
    commentText: yup.string().min(2).required(),
  });
  const { register, handleSubmit } = useForm<CommentInterface>({
    resolver: yupResolver(commentSchema),
  });
  const commentHandler = (data: CommentInterface) => {
    console.log(commentText);
    const newCommentDoc = doc(collection(db, "comments"));
    const payload = {
      id: newCommentDoc.id,
      pid: props.pId,
      uid: userId,
      text: data.commentText,
    };
    setDoc(newCommentDoc, payload).then(() => {
      setCommentText("");
      dispatch(setCommentData([...commentData, payload]));
    });
  };
  return (
    <div className="comSec-main">
      <form
        className="comSec-currUser-div"
        onSubmit={handleSubmit(commentHandler)}
      >
        <div className="comSec-currUser-avatar-div">
          <img
            src={
              userData?.avatar === ""
                ? require("../assets/dummy-avatar.png")
                : userData?.avatar
            }
            alt="dummy-avatar-img"
          />
        </div>
        <div className="comSec-input-div">
          <input
            type="text"
            placeholder="write a comment"
            {...register("commentText")}
            value={commentText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCommentText(e.target.value)
            }
          />
        </div>
        <div className="comSec-btn-div">
          <button type="submit">Send</button>
        </div>
      </form>
      {commentData
        .filter((data: CommentDataInterface) => data.pid === props.pId)
        .map((data: CommentDataInterface, index: number) => {
          return <Comments {...data} key={`user-comment-${index}`} />;
        })}
    </div>
  );
};

const Comments = (props: CommentDataInterface) => {
  // const [username, setUsername] = useState<string>("Username");
  // const userRef = collection(db, "users");
  // const userQuery = query(userRef, where("userId", "==", props.uid));
  // const getUserData = async () => {
  //   const data = await getDocs(userQuery);
  //   const val = data.docs.map((doc) => ({ ...doc.data() }));
  //   setUsername(val[0]?.username);
  // };
  // getUserData();

  const allUserData: UserDataInterface[] = useSelector(
    (state: any) => state.allUsersData.data
  );
  const userData = allUserData.filter(
    (val: UserDataInterface) => val.userId === props.uid
  )[0];
  return (
    <div className="comment-main">
      <div className="comment-avatar">
        <img
          src={
            userData?.avatar === ""
              ? require("../assets/dummy-avatar.png")
              : userData?.avatar
          }
          alt="dummy-img"
        />
      </div>
      <div className="comment-text-div">
        <p className="comment-text-uname">{userData?.username}</p>
        <p className="comment-text-content">{props.text}</p>
      </div>
    </div>
  );
};

export default CommentSection;
