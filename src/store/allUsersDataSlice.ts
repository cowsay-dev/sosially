import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

export const allUsersDataSlice = createSlice({
  name: "allUsersData",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setAllUsers } = allUsersDataSlice.actions;
