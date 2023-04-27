import { configureStore } from "@reduxjs/toolkit";
import { commentDataSlice } from "./commentDataSlice";
import { connectionDataSlice } from "./connectionDataSlice";
import { postDataSlice } from "./postDataSlice";
import { recommendationDataSlice } from "./recommendationDataSlice";
import { allUsersDataSlice } from "./allUsersDataSlice";

export const store = configureStore({
  reducer: {
    postData: postDataSlice.reducer,
    commentData: commentDataSlice.reducer,
    connectionData: connectionDataSlice.reducer,
    recommendationData: recommendationDataSlice.reducer,
    allUsersData: allUsersDataSlice.reducer,
  },
});
