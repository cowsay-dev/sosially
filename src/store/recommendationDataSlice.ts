import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

export const recommendationDataSlice = createSlice({
  name: "recommendationData",
  initialState,
  reducers: {
    setRecommendationData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRecommendationData } = recommendationDataSlice.actions;
