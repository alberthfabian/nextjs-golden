import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const pagesSlice = createSlice({
  name: "fullDate",
  initialState,
  reducers: {
    dataInitial: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { dataInitial } = pagesSlice.actions;

export default pagesSlice.reducer;
