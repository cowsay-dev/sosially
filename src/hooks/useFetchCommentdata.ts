import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../config/firebase";
import { setCommentData } from "../store/commentDataSlice";

const useFetchCommentdata = () => {
  const commentDataRef = collection(db, "comments");
  const dispatch = useDispatch();
  const getCommentData = async () => {
    const data = await getDocs(commentDataRef);
    dispatch(setCommentData(data.docs.map((doc) => ({ ...doc.data() }))));
  };

  useEffect(() => {
    getCommentData();
  }, []);
};

export default useFetchCommentdata;
