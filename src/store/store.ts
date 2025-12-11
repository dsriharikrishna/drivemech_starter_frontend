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

import authReducer, { logout } from "./slices/auth/authSlice";
import serviceReducer from './slices/services/serviceSlice';
import carReducer from './slices/cart/cartSlice';
import locationReducer from './slices/location/locationSlice';
import workshopReducer from './slices/workshop/workshopSlice';
import bookingReducer from './slices/booking/bookingSlice';
import orderReducer from './slices/order/orderSlice';
import paymentReducer from './slices/payment/paymentSlice';
import userProfileReducer from './slices/user/userProfileSlice';
import notificationReducer from './slices/notification/notificationSlice';
import uiReducer from './slices/ui/uiSlice';
import towingServiceReducer from './slices/towing-services/towingServiceSlice';

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken", "user"],
};

const carPersistConfig = {
  key: "car",
  storage,
  whitelist: ["currentVehicle", "savedVehicles"],
};

const paymentPersistConfig = {
  key: "payment",
  storage,
  whitelist: ["savedCards", "savedUPI", "defaultPaymentMethod", "walletBalance"],
};

const userProfilePersistConfig = {
  key: "userProfile",
  storage,
  whitelist: ["profile", "addresses", "defaultAddress", "preferences"],
};

const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: ["theme", "sidebarOpen"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCarReducer = persistReducer(carPersistConfig, carReducer);
const persistedPaymentReducer = persistReducer(paymentPersistConfig, paymentReducer);
const persistedUserProfileReducer = persistReducer(userProfilePersistConfig, userProfileReducer);
const persistedUIReducer = persistReducer(uiPersistConfig, uiReducer);

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
    service: serviceReducer,
    car: persistedCarReducer,
    location: locationReducer,
    workshop: workshopReducer,
    booking: bookingReducer,
    order: orderReducer,
    payment: persistedPaymentReducer,
    userProfile: persistedUserProfileReducer,
    notification: notificationReducer,
    ui: persistedUIReducer,
    towingService: towingServiceReducer,
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