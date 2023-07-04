import { configureStore } from "@reduxjs/toolkit";
import articleSlice from "./slices/articleSlice";

const store = configureStore({
  reducer: {
    article: articleSlice,
  },
});

export default store;
