import { configureStore } from "@reduxjs/toolkit";

// Reducer
import pagesReducer from "./pagesSlice";

export const store = configureStore({
  reducer: {
    data: pagesReducer,
  },
});
