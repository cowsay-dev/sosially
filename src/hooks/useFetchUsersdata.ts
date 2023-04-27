import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../config/firebase";
import { setAllUsers } from "../store/allUsersDataSlice";
import { useDispatch } from "react-redux";

const useFetchAllUsersdata = () => {
  const userRef = collection(db, "users");
  const dispatch = useDispatch();
  const getUsersData = async () => {
    const data = await getDocs(userRef);
    dispatch(setAllUsers(data.docs.map((doc) => ({ ...doc.data() }))));
  };

  useEffect(() => {
    getUsersData();
  }, []);
};

export default useFetchAllUsersdata;
