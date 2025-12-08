"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { EnterTrackingScreen } from "./EnterTrackingScreen";
import { LiveTrackingScreen } from "./LiveTrackingScreen";

export default function TrackPage() {
  const methods = useForm();
  const [step, setStep] = useState<"enter" | "track">("enter");

  return (
    <FormProvider {...methods}>
      <div className="w-full ">
        {step === "enter" ? <EnterTrackingScreen setStep={setStep} /> : <LiveTrackingScreen />}
      </div>
    </FormProvider>
  );
}
