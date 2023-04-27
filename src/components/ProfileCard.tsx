import React, { useState } from "react";
import "../stylesheets/Profile.css";
import {
  ConnectionDataInterface,
  PostDataInterface,
  UserDataInterface,
} from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { BiCamera } from "react-icons/bi";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setAllUsers } from "../store/allUsersDataSlice";
import UserProflieSkeleton from "../skeletons/UserProflieSkeleton";

interface Props {
  userId: string;
}

const ProfileCard = (props: Props) => {
  const dispatch = useDispatch();
  const postData = useSelector((state: any) => state.postData.data);
  const connectionData: ConnectionDataInterface = useSelector(
    (state: any) => state.connectionData.data
  );
  const allUserData: UserDataInterface[] = useSelector(
    (state: any) => state.allUsersData.data
  );
  const userData = allUserData.filter(
    (val: UserDataInterface) => val.userId === props.userId
  )[0];
  const [dp, setDP] = useState<string>(userData?.avatar as string);
  let alias = "";

  const updateAllUserData = () => {
    const updatedData: UserDataInterface[] = allUserData.map(
      (data: UserDataInterface) => {
        if (data.id === userData.id) {
          const val = { ...data };
          val.avatar = dp;
          return val;
        } else {
          return data;
        }
      }
    );
    dispatch(setAllUsers(updatedData));
  };

  const uploadProfilePic = (e: any) => {
    const val = e.target.files[0];
    setDP(URL.createObjectURL(val));
    const imgRef = ref(
      storage,
      `avatars/${sessionStorage.getItem("auth-key") as string}`
    );
    updateAllUserData();
    uploadBytes(imgRef, val).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        updateDoc(doc(db, "users", userData.id), {
          avatar: url,
        });
      });
    });
  };
  if (userData?.username) {
    let val = userData.username.split(" ");
    alias = val.join(".");
  }
  return (
    <div className="profile-card-main-div">
      {userData?.avatar || userData?.avatar === "" ? (
        <>
          <div className="profile-card-detail">
            <div className="profile-card-fdetail" id="p-card-detail-1">
              <p>
                {connectionData.connections[0] === ""
                  ? 0
                  : connectionData.connections.length}
              </p>
              <span>Connections</span>
            </div>
            <div className="profile-card-profile" id="p-card-detail-2">
              {dp ? (
                <img src={dp} alt="asdfasdfeesf" />
              ) : (
                <img
                  src={
                    userData?.avatar === ""
                      ? require("../assets/dummy-avatar.png")
                      : userData?.avatar
                  }
                  alt="asdfasdfeesf"
                />
              )}

              <div className="update-dp-div">
                <label htmlFor="select-dp">
                  <BiCamera className="select-dp-icon" />
                </label>
                <input
                  type="file"
                  id="select-dp"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={uploadProfilePic}
                />
              </div>
            </div>
            <div className="profile-card-fdetail" id="p-card-detail-3">
              <p>
                {
                  postData.filter(
                    (val: PostDataInterface) => val.uid === userData?.userId
                  ).length
                }
              </p>
              <span>Posts</span>
            </div>
          </div>
          <div className="profile-card-uname">
            <p>
              {userData?.username} | <span>@{alias.toLowerCase()}</span>
            </p>
          </div>
        </>
      ) : (
        <UserProflieSkeleton />
      )}
    </div>
  );
};

export default ProfileCard;
