// /store/store.js
import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "./appointmentsSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    user: userReducer,
  },
});

export default store;
