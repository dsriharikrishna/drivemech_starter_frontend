"use client";

import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Percent } from "lucide-react";

export default function SharePercentageInput({
  name,
  label = "Share Percentage",
  min = 0,
  max = 100,
}: {
  name: string;
  label?: string;
  min?: number;
  max?: number;
}) {
  const { control, watch, setValue } = useFormContext();
  const value = watch(name) ?? 0;

  // ensure number
  useEffect(() => {
    if (value === "" || value === null || Number.isNaN(Number(value))) {
      setValue(name, min);
    }
  }, [name, min, setValue, value]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const v = Number(field.value ?? 0);

          return (
            <>
              {/* Rounded input with left percent chip */}
              <div className="flex items-center border rounded-xl h-11 px-3 bg-white border-gray-200">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-xs">
                  <Percent size={14} />
                </div>

                <input
                  type="number"
                  min={min}
                  max={max}
                  value={v}
                  onChange={(e) => {
                    const nv = e.target.value === "" ? "" : Number(e.target.value);
                    field.onChange(nv);
                  }}
                  className="w-full outline-none text-sm text-gray-700"
                />
              </div>

              {/* Orange styled slider */}
              <div className="mt-3">
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={v}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full h-1 appearance-none rounded-lg"
                  style={{
                    // visual track using background gradient to match Figma: filled orange + remaining light track
                    background: `linear-gradient(90deg, #FF7A1A ${((v - min) / (max - min)) * 100}%, #E8EDF2 ${((v - min) / (max - min)) * 100}%)`,
                  }}
                />

                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    border-radius: 999px;
                    background: #FF7A1A;
                    border: 2px solid white;
                    box-shadow: 0 0 0 3px rgba(255,122,26,0.12);
                    margin-top: -6px; /* center the thumb relative to the track */
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 14px;
                    height: 14px;
                    border-radius: 999px;
                    background: #FF7A1A;
                    border: 2px solid white;
                    box-shadow: 0 0 0 3px rgba(255,122,26,0.12);
                  }
                  input[type="range"]::-webkit-slider-runnable-track {
                    height: 6px;
                    border-radius: 999px;
                    background: transparent;
                  }
                `}</style>
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
