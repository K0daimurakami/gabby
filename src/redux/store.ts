import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../pages/home/homeSlice";
import detailsReducer from "../pages/details/detailsSlice";

const store = configureStore({
  reducer: {
    home: homeReducer,
    details: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
