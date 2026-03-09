"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { makes, models, states } from "../../data/vehicle";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setSelectedMake,
  setSelectedModel,
  setSelectedState,
  setSelectedRego,
  setSelectedPostcode,
  selectSelectedMake,
  selectSelectedModel,
  selectSelectedState,
  selectSelectedRego,
  selectSelectedPostcode,
} from "@/store/slices/helpers/helperSlice";
import StateRegoInput from "./StateRegoInput";
import SearchableDropdown from "./SearchableDropdown";
import PostcodeInput from "./PostcodeInput";

export default function VehicleSearch() {
  const dispatch = useAppDispatch();

  // Get all values from Redux
  const selectedMake = useAppSelector(selectSelectedMake);
  const selectedModel = useAppSelector(selectSelectedModel);
  const selectedState = useAppSelector(selectSelectedState);
  const selectedRego = useAppSelector(selectSelectedRego);
  const selectedPostcode = useAppSelector(selectSelectedPostcode);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  // Watch form values
  const watchedState = watch("state");
  const watchedRego = watch("rego");
  const watchedMake = watch("make");
  const watchedModel = watch("model");
  const watchedPostcode = watch("postcode");

  // Sync Redux state with form values on mount
  useEffect(() => {
    setValue("state", selectedState);
    setValue("rego", selectedRego);
    setValue("make", selectedMake);
    setValue("model", selectedModel);
    setValue("postcode", selectedPostcode);
  }, []);

  // Sync form values back to Redux when they change
  useEffect(() => {
    if (watchedState !== undefined && watchedState !== selectedState) {
      dispatch(setSelectedState(watchedState));
    }
  }, [watchedState, dispatch]);

  useEffect(() => {
    if (watchedRego !== undefined && watchedRego !== selectedRego) {
      dispatch(setSelectedRego(watchedRego));
    }
  }, [watchedRego, dispatch]);

  useEffect(() => {
    if (watchedMake !== undefined && watchedMake !== selectedMake) {
      dispatch(setSelectedMake(watchedMake));
    }
  }, [watchedMake, dispatch]);

  useEffect(() => {
    if (watchedModel !== undefined && watchedModel !== selectedModel) {
      dispatch(setSelectedModel(watchedModel));
    }
  }, [watchedModel, dispatch]);

  useEffect(() => {
    if (watchedPostcode !== undefined && watchedPostcode !== selectedPostcode) {
      dispatch(setSelectedPostcode(watchedPostcode));
    }
  }, [watchedPostcode, dispatch]);

  return (
    <div className="relative w-full mx-auto max-w-7xl bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      {/* FLEX CONTAINER FOR INPUT FIELDS */}
      <div className="flex flex-col gap-3 w-full">
        {/* First Row: State+Rego and Make on mobile, all inputs on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* STATE + REGO COMBINED */}
          <div className="w-full lg:col-span-1">
            <StateRegoInput
              stateValue={watchedState || ""}
              regoValue={watchedRego || ""}
              onStateChange={(value) => setValue("state", value)}
              onRegoChange={(value) => setValue("rego", value)}
              states={states}
              register={register}
            />
          </div>

          {/* MAKE */}
          <div className="w-full lg:col-span-1">
            <SearchableDropdown
              label="Make"
              placeholder="e.g., Toyota, BMW"
              value={watchedMake || ""}
              onChange={(value) => setValue("make", value)}
              options={makes}
              register={register}
              fieldName="make"
              required={true}
            />
          </div>

          {/* MODEL */}
          <div className="w-full lg:col-span-1">
            <SearchableDropdown
              label="Model"
              placeholder="Select Model"
              value={watchedModel || ""}
              onChange={(value) => setValue("model", value)}
              options={models}
              register={register}
              fieldName="model"
              required={true}
            />
          </div>

          {/* POSTCODE */}
          <div className="w-full lg:col-span-1">
            <PostcodeInput
              value={watchedPostcode || ""}
              onChange={(value) => setValue("postcode", value)}
              register={register}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="w-full lg:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full bg-primary-500 cursor-pointer hover:bg-primary-600 text-white text-sm font-semibold rounded-lg px-6 h-10 flex items-center justify-center transition-colors whitespace-nowrap shadow-sm"
            >
              Find My Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="flex items-center gap-2 mt-3">
        <img
          src="/images/license-plate-icon.png"
          alt="License Plate"
          className="w-12 h-auto"
        />
        <p className="text-xs text-gray-600 leading-relaxed">
          Enter your registration number to quickly identify your car
        </p>
      </div>

      {/* Validation Errors */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-semibold text-red-800 mb-2">
            Please fix the following errors:
          </p>
          <ul className="list-disc list-inside space-y-1">
            {errors.state && (
              <li className="text-sm text-red-600">
                {errors.state.message as string}
              </li>
            )}
            {errors.rego && (
              <li className="text-sm text-red-600">
                {errors.rego.message as string}
              </li>
            )}
            {errors.make && (
              <li className="text-sm text-red-600">
                {errors.make.message as string}
              </li>
            )}
            {errors.model && (
              <li className="text-sm text-red-600">
                {errors.model.message as string}
              </li>
            )}
            {errors.postcode && (
              <li className="text-sm text-red-600">
                {errors.postcode.message as string}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
