import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/login/userSlice"
import homeReducer from "../pages/home/homeSlice";
import detailsReducer from "../pages/details/detailsSlice";
import createSagaMiddleware from "redux-saga";
import watchSelectMyle from "../pages/home/saga";
import watchSendMessage from "../pages/details/saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
    details: detailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchSelectMyle);
sagaMiddleware.run(watchSendMessage);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
