import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

export const commentDataSlice = createSlice({
  name: "commentData",
  initialState,
  reducers: {
    setCommentData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCommentData } = commentDataSlice.actions;
