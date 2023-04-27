import React, { Dispatch, useState } from "react";
import "../stylesheets/CreatePost.css";
import { RiImageLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { setPostData } from "../store/postDataSlice";
import { UserDataInterface } from "../interfaces";

interface CreatePostInterface {
  postText: string;
  postImage: any;
}

const CreatePost = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const postData = useSelector((state: any) => state.postData.data);
  const allUserData: UserDataInterface[] = useSelector(
    (state: any) => state.allUsersData.data
  );
  const userData: UserDataInterface = allUserData.filter(
    (val: UserDataInterface) =>
      val.userId === (sessionStorage.getItem("auth-key") as string)
  )[0];
  const postSchema = yup.object().shape({
    postText: yup.string().min(4).required(),
    postImage: yup.mixed().required(),
  });
  const { register, handleSubmit } = useForm<CreatePostInterface>({
    resolver: yupResolver(postSchema),
  });
  const [postImg, setPostImg] = useState<string>("");
  const [uploadImg, setUploadImg] = useState<any>(null);
  const [postStr, setPostStr] = useState<string>("");
  const chosenFileHandler = (e: any) => {
    const val = e.target.files[0];
    setUploadImg(val);
    setPostImg(URL.createObjectURL(val));
  };

  const createPostHandler = async (data: CreatePostInterface) => {
    console.log(data);
    setPostImg("");
    const newPostDoc = doc(collection(db, "posts"));
    const imgRef = ref(storage, `posts/${newPostDoc.id}`);
    const d = new Date();
    const payload = {
      createdAt: d.getTime(),
      id: newPostDoc.id,
      likedBy: [],
      imgUrl: "",
      text: data.postText,
      uid: auth.currentUser?.uid,
    };
    setPostStr("");
    uploadBytes(imgRef, uploadImg).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        payload.imgUrl = url;
        setDoc(newPostDoc, payload).then((result) => {
          console.log("done...", result);
          dispatch(setPostData([...postData, payload]));
        });
      });
    });
    setUploadImg(null);
    data.postImage = "";
    data.postText = "";
  };
  return (
    <section className="cp-main">
      <form
        onSubmit={handleSubmit(createPostHandler)}
        className="cp-content-div"
      >
        <div className="cp-textarea-div">
          <div className="cp-img-div">
            <img
              src={
                userData?.avatar === ""
                  ? require("../assets/dummy-avatar.png")
                  : userData?.avatar
              }
              alt="create-post-avatar"
            />
          </div>
          <textarea
            placeholder={"Write something..."}
            {...register("postText")}
            value={postStr}
            onChange={(e) => setPostStr(e.target.value)}
          />
        </div>
        {postImg && (
          <div className="cp-chosen-img-div">
            <img src={postImg} alt="post-img" />
          </div>
        )}
        <div className="cp-actions-div">
          <label htmlFor="select-image" title="Select an image">
            <RiImageLine className="select-image-icon" />
          </label>
          <input
            type="file"
            id="select-image"
            accept="image/png, image/jpg, image/jpeg"
            {...register("postImage")}
            onChange={chosenFileHandler}
            required
          />
          <input type="submit" value="Post" />
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
