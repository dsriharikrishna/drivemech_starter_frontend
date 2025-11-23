"use client";

import { Provider } from "react-redux";
import store, { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useApiInterceptor } from "@/hooks/useApiInterceptor";
import ToastManager from "@/hooks/ToastManager";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  function ApiInterceptorSetup() {
    useApiInterceptor();
    return null;
  }
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApiInterceptorSetup />
        {children}
        <ToastManager />
      </PersistGate>
    </Provider>
  );
}
