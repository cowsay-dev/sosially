import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "../config/firebase";
import { ConnectionDataInterface } from "../interfaces";
import { setConnectionData } from "../store/connectionDataSlice";

const useFetchConnectionData = () => {
  // const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  // const [cnctData, setCnctData] = useState<ConnectionDataInterface>(
  //   {} as ConnectionDataInterface
  // );
  const connectionRef = collection(db, "connections");
  const q = query(
    connectionRef,
    where("uid", "==", sessionStorage.getItem("auth-key") as string)
  );
  const getConnectionData = async () => {
    const data = await getDocs(q);
    const val = data.docs.map((doc) => ({ ...doc.data() }));
    // setCnctData(val[0] as ConnectionDataInterface);
    dispatch(setConnectionData(val[0] as ConnectionDataInterface));
  };

  useEffect(() => {
    getConnectionData();
  }, []);

  // return [cnctData];
};

export default useFetchConnectionData;
