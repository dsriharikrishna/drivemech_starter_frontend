import {
  configureStore,
  Middleware,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
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
import serviceReducer from "./slices/customer/services/serviceSlice";
import carReducer from "./slices/cart/cartSlice";
import locationReducer from "./slices/location/locationSlice";
import workshopReducer from "./slices/customer/workshop/workshopSlice";
import bookingReducer from "./slices/booking/bookingSlice";
import orderReducer from "./slices/order/orderSlice";
import paymentReducer from "./slices/payment/paymentSlice";
import userProfileReducer from "./slices/user/userProfileSlice";
import notificationReducer from "./slices/notification/notificationSlice";
import uiReducer from "./slices/ui/uiSlice";
import towingServiceReducer from "./slices/customer/towing-services/towingServiceSlice";
import helperReducer from "./slices/helpers/helperSlice";
import sparePartsCheckoutReducer from "./slices/customer/spare-parts/sparePartsCheckoutSlice";
import sparePartsCartReducer from "./slices/customer/spare-parts/sparePartsCartSlice";
import pricingReducer from "./slices/pricing/pricingSlice";
import bookingDiaryReducer from "./slices/vendor/operations/bookindDiarySlice";
import configurationReducer from "./slices/vendor/configurations/configurationSlice";
import transactionCenterReducer from "./slices/vendor/operations/transactionCenterSlice";
import dashboardReducer from "./slices/vendor/dashboard/dashboardSlice";
import workshopSetupReducer from "./slices/vendor-onboarding/workshopSetupSlice";
import basicInfoReducer from "./slices/vendor-onboarding/basicInfoSlice";
import sparePartsReducer from "./slices/vendor-onboarding/sparePartsSlice";
import towingServicesReducer from "./slices/vendor-onboarding/towingServicesSlice";
import onboardingReducer from "./slices/vendor-onboarding/onboardingSlice";

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
  whitelist: [
    "savedCards",
    "savedUPI",
    "defaultPaymentMethod",
    "walletBalance",
  ],
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

const sparePartsCheckoutPersistConfig = {
  key: "sparePartsCheckout",
  storage,
  whitelist: ["cartItems", "addressData"],
};

const sparePartsPersistConfig = {
  key: "spareParts",
  storage,
  whitelist: ["cart", "vehicle", "wishlist", "compare", "filters", "pricing"],
};

const vendorSparePartsPersistConfig = {
  key: "vendorSpareParts",
  storage,
  whitelist: [
    "selectedCategories",
    "selectedBrands",
    "inventory",
    "currentSubStep",
    "isCompleted",
  ],
};

const workshopSetupPersistConfig = {
  key: "workshopSetup",
  storage,
  whitelist: [
    "basicInfo",
    "servicesAndBrands",
    "currentSubStep",
    "isCompleted",
  ],
};

const basicInfoPersistConfig = {
  key: "basicInfo",
  storage,
  whitelist: [
    "companyName",
    "representativeName",
    "taxIdentificationNumber",
    "businessLicenseNumber",
    "businessAddress",
    "postCode",
    "city",
    "state",
    "country",
    "branches",
    "contacts",
    "isCompleted",
  ],
};

const towingServicesPersistConfig = {
  key: "vendorTowingServices",
  storage,
  whitelist: [
    "enabled",
    "chargesPerHour",
    "serviceRadius",
    "numberOfTrucks",
    "vehicleTypes",
    "servicePincodes",
    "serviceCities",
    "currentSubStep",
    "isCompleted",
  ],
};

const onboardingPersistConfig = {
  key: "vendorOnboarding",
  storage,
  whitelist: ["currentStep", "selectedServices", "completedSteps"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCarReducer = persistReducer(carPersistConfig, carReducer);
const persistedPaymentReducer = persistReducer(
  paymentPersistConfig,
  paymentReducer
);
const persistedUserProfileReducer = persistReducer(
  userProfilePersistConfig,
  userProfileReducer
);
const persistedUIReducer = persistReducer(uiPersistConfig, uiReducer);
const persistedSparePartsCheckoutReducer = persistReducer(
  sparePartsCheckoutPersistConfig,
  sparePartsCheckoutReducer
);
const persistedSparePartsReducer = persistReducer(
  sparePartsPersistConfig,
  sparePartsCartReducer
);
const persistedWorkshopSetupReducer = persistReducer(
  workshopSetupPersistConfig,
  workshopSetupReducer
);
const persistedBasicInfoReducer = persistReducer(
  basicInfoPersistConfig,
  basicInfoReducer
);
const persistedVendorSparePartsReducer = persistReducer(
  vendorSparePartsPersistConfig,
  sparePartsReducer
);
const persistedVendorTowingServicesReducer = persistReducer(
  towingServicesPersistConfig,
  towingServicesReducer
);
const persistedOnboardingReducer = persistReducer(
  onboardingPersistConfig,
  onboardingReducer
);

// ---------------- Error handling middleware ----------------
const rtkErrorLogger: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (
      action.payload &&
      typeof action.payload === "object" &&
      "status" in action.payload
    ) {
      const payload = action.payload as { status?: number };
      if (payload.status === 401) {
        store.dispatch(logout());
      }
    }
    if (
      action.payload &&
      typeof action.payload === "string" &&
      action.payload.includes("401")
    ) {
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
    helper: helperReducer,
    sparePartsCheckout: persistedSparePartsCheckoutReducer,
    spareParts: persistedSparePartsReducer,
    pricing: pricingReducer,
    bookingDiary: bookingDiaryReducer,
    configuration: configurationReducer,
    transactionCenter: transactionCenterReducer,
    vendorDashboard: dashboardReducer,
    workshopSetup: persistedWorkshopSetupReducer,
    vendorBasicInfo: persistedBasicInfoReducer,
    vendorSpareParts: persistedVendorSparePartsReducer,
    vendorTowingServices: persistedVendorTowingServicesReducer,
    vendorOnboarding: persistedOnboardingReducer,
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
