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
import { addConnectionData } from "../store/connectionDataSlice";
import { setRecommendationData } from "../store/recommendationDataSlice";
import "../stylesheets/RightSidebar.css";
import { RiUserFollowLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";

interface Props {
  data: ConnectionDataInterface;
  updateRecommendationData: (uid: string) => void;
}

const RSFeeds = () => {
  const dispatch = useDispatch();
  const data: ConnectionDataInterface[] = useSelector(
    (state: any) => state.recommendationData.data
  );

  const updateData = async () => {
    const dataRef = collection(db, "connections");
    const q = query(
      dataRef,
      where("uid", "!=", sessionStorage.getItem("auth-key") as string)
    );
    const data = await getDocs(q);
    const val = data.docs.map((doc) => ({ ...doc.data() }));
    dispatch(setRecommendationData(val as ConnectionDataInterface[]));
  };

  const updateRecommendationData = (uid: string) => {
    updateData();
    dispatch(addConnectionData(uid));
  };
  useFetchConnectionData();
  useFetchRecommendation();

  return (
    <>
      <div className="rs-feed-heading">
        <h3>Add to connect</h3>
      </div>
      {data.length > 0 &&
        (data.filter(
          (val) =>
            !val.connections.includes(
              sessionStorage.getItem("auth-key") as string
            )
        ).length > 0 ? (
          data
            .filter(
              (val) =>
                !val.connections.includes(
                  sessionStorage.getItem("auth-key") as string
                )
            )
            .map((val: ConnectionDataInterface, index: number) => {
              return (
                <Recommendation
                  data={val}
                  updateRecommendationData={updateRecommendationData}
                  key={`recommend-${index}`}
                />
              );
            })
        ) : (
          <p className="rs-feed-no-data">No user to recommend</p>
        ))}
    </>
  );
};

export const Recommendation = ({ data, updateRecommendationData }: Props) => {
  const allUserData: UserDataInterface[] = useSelector(
    (state: any) => state.allUsersData.data
  );
  const userData = allUserData.filter(
    (val: UserDataInterface) => val.userId === data.uid
  )[0];
  let alias = "";
  if (userData?.username) {
    let val = userData.username.split(" ");
    alias = val.join(".").toLocaleLowerCase();
  }

  const connectionData: ConnectionDataInterface = useSelector(
    (state: any) => state.connectionData.data
  );
  const addToConnectHandler = async () => {
    await updateDoc(doc(db, "connections", connectionData.id), {
      connections: [...connectionData.connections, data.uid],
    });
    await updateDoc(doc(db, "connections", data.id), {
      connections: [
        ...data.connections,
        sessionStorage.getItem("auth-key") as string,
      ],
    });

    updateRecommendationData(data.uid);
  };
  return (
    <section className="rs-feed-user-div">
      <div className="rs-feed-user-img">
        {userData?.avatar ? (
          <img
            src={
              userData?.avatar === ""
                ? require("../assets/dummy-avatar.png")
                : userData?.avatar
            }
            alt="osjdflwoj"
          />
        ) : (
          <Skeleton circle width={36} height={36} />
        )}
      </div>
      <div className="rs-feed-user-detail">
        <p>{userData?.username || <Skeleton />}</p>
        <span>@{alias || <Skeleton />}</span>
      </div>
      <div className="rs-feed-follow" onClick={addToConnectHandler}>
        <RiUserFollowLine className="rs-feed-follow-icon" />
      </div>
    </section>
  );
};

export default RSFeeds;
