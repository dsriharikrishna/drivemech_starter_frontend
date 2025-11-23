import { configureStore, Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer, { logout } from "./slicers/authSlicer";


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken", "user"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

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
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rtkErrorLogger),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// ---------------- Types & Typed hooks ----------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;