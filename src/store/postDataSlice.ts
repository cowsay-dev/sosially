import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

export const postDataSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    setPostData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPostData } = postDataSlice.actions;
