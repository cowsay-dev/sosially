import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../config/firebase";
import { ConnectionDataInterface } from "../interfaces";
import { setRecommendationData } from "../store/recommendationDataSlice";

const useFetchRecommendation = () => {
  const dataRef = collection(db, "connections");
  const dispatch = useDispatch();

  const getData = async () => {
    const q = query(
      dataRef,
      where("uid", "!=", sessionStorage.getItem("auth-key") as string)
    );
    const data = await getDocs(q);
    const val = data.docs.map((doc) => ({ ...doc.data() }));
    dispatch(setRecommendationData(val as ConnectionDataInterface[]));
  };

  useEffect(() => {
    getData();
  }, []);
};

export default useFetchRecommendation;
