import { configureStore, Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer, { logout } from "./slicers/authSlicer";

// ---------------- Error handling middleware ----------------
const rtkErrorLogger: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload && typeof action.payload === 'object' && 'status' in action.payload) {
      const payload = action.payload as { status?: number };
      if (payload.status === 401) {
        store.dispatch(logout());
      }
    }
    if (action.payload && typeof action.payload === 'string' && action.payload.includes('401')) {
      store.dispatch(logout());
    }
  }
  return next(action);
};

// ---------------- Store configuration ----------------
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkErrorLogger),
  devTools: process.env.NODE_ENV !== "production",
});

// ---------------- Types & Typed hooks ----------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;