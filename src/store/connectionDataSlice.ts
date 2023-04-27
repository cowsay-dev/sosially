import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: { uid: "", connections: [""], id: "" },
};

export const connectionDataSlice = createSlice({
  name: "connectionData",
  initialState,
  reducers: {
    setConnectionData: (state, action) => {
      state.data = action.payload;
    },

    addConnectionData: (state, action) => {
      state.data.connections = [...state.data.connections, action.payload];
      if (state.data.connections[0] === "") {
        state.data.connections = state.data.connections.slice(1);
      }
    },

    removeConnectionData: (state, action) => {
      state.data.connections = state.data.connections.filter(
        (val: string) => val !== action.payload
      );
      if (state.data.connections.length === 0) {
        state.data.connections = [""];
      }
    },
  },
});

export const { setConnectionData, addConnectionData, removeConnectionData } =
  connectionDataSlice.actions;
