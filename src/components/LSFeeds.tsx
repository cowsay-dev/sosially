import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../config/firebase";
import useFetchConnectionData from "../hooks/useFetchConnectionData";
import useFetchRecommendation from "../hooks/useFetchRecommendation";
import { ConnectionDataInterface, UserDataInterface } from "../interfaces";
import "../stylesheets/LeftSidebar.css";
import { removeConnectionData } from "../store/connectionDataSlice";
import { setRecommendationData } from "../store/recommendationDataSlice";
import { RiUserUnfollowLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";

interface Props {
  uid: string;
  updateConnectionData: (uid: string) => void;
}

const LSFeeds = () => {
  const connectionData: ConnectionDataInterface = useSelector(
    (state: any) => state.connectionData.data
  );
  const dispatch = useDispatch();
  const dataRef = collection(db, "connections");

  const updateData = async () => {
    const q = query(
      dataRef,
      where("uid", "!=", sessionStorage.getItem("auth-key") as string)
    );
    const data = await getDocs(q);
    const val = data.docs.map((doc) => ({ ...doc.data() }));
    dispatch(setRecommendationData(val as ConnectionDataInterface[]));
  };

  const updateConnectionData = (uid: string) => {
    dispatch(removeConnectionData(uid));
    updateData();
  };
  useFetchConnectionData();
  useFetchRecommendation();

  return (
    <>
      <div className="ls-feed-heading">
        <h3>Your connection</h3>
      </div>
      {connectionData.connections[0] !== "" &&
        connectionData.connections.map((data: string, index: number) => {
          return (
            <Connection
              uid={data}
              updateConnectionData={updateConnectionData}
              key={`connection-${index}`}
            />
          );
        })}
      {(connectionData.connections.length === 0 ||
        connectionData.connections[0] === "") && (
        <p className="ls-feed-no-data">You don't have any connection</p>
      )}
    </>
  );
};

const Connection = ({ uid, updateConnectionData }: Props) => {
  const connectionData: ConnectionDataInterface = useSelector(
    (state: any) => state.connectionData.data
  );
  const allUserData: UserDataInterface[] = useSelector(
    (state: any) => state.allUsersData.data
  );
  const recommendationData: ConnectionDataInterface[] = useSelector(
    (state: any) => state.recommendationData.data
  );
  const userData = allUserData.filter(
    (val: UserDataInterface) => val.userId === uid
  )[0];

  let alias = "";
  if (userData?.username) {
    let val = userData.username.split(" ");
    alias = val.join(".").toLocaleLowerCase();
  }

  const removeHandler = async () => {
    const otherUser: ConnectionDataInterface = recommendationData.filter(
      (val: ConnectionDataInterface) => val.uid === uid
    )[0];
    await updateDoc(doc(db, "connections", connectionData.id), {
      connections: connectionData.connections.filter(
        (val: string) => val !== uid
      ),
    });
    await updateDoc(doc(db, "connections", otherUser.id), {
      connections: otherUser.connections.filter(
        (val: string) => val !== connectionData.uid
      ),
    });

    updateConnectionData(uid);
  };

  return (
    <section className="ls-feed-user-div">
      <div className="ls-feed-user-img">
        {userData?.avatar || userData?.avatar === "" ? (
          <img
            src={
              userData?.avatar === ""
                ? require("../assets/dummy-avatar.png")
                : userData?.avatar
            }
            alt=""
          />
        ) : (
          <Skeleton circle width={36} height={36} />
        )}
      </div>
      <div className="ls-feed-user-detail">
        <p>{userData?.username || <Skeleton />}</p>
        <span>@{alias || <Skeleton />}</span>
      </div>
      <div className="ls-feed-unfollow" onClick={removeHandler}>
        <RiUserUnfollowLine className="ls-feed-unfollow-icon" />
      </div>
    </section>
  );
};

export default LSFeeds;
