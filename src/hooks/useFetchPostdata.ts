import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../config/firebase";
import { setPostData } from "../store/postDataSlice";

const useFetchPostdata = () => {
  const postDataRef = collection(db, "posts");
  const dispatch = useDispatch();
  const getPostData = async () => {
    const data = await getDocs(postDataRef);
    dispatch(setPostData(data.docs.map((doc) => ({ ...doc.data() }))));
  };

  useEffect(() => {
    getPostData();
  }, []);
};

export default useFetchPostdata;
