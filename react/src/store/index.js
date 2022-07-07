import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import itemReducer from "./itemSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
  },
});
