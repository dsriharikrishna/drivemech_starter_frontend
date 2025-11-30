"use client";

import { TimelineStep } from "@/types/timeline";

export default function TrackingTimeline({ steps }: { steps: TimelineStep[] }) {
  const activeIndex = steps.findIndex((s) => s.isActive);
  const completedIndex = activeIndex;

  return (
    <div className="relative pl-3 py-4">

      {/* MAIN BACKBONE */}
      <div className="absolute left-[18px] top-0 w-[2px] bg-gray-300" />

      <ol>
        {steps.map((step, index) => {
          const isCompleted = step.isCompleted;
          const isActive = step.isActive;

          return (
            <li
              key={step.id}
              className="relative flex items-start py-0 min-h-[48px]"
            >

              {/* CONNECTOR (ABOVE DOT) */}
              {index > 0 && (
                <span
                  className={`
                    absolute left-[18px] top-0 w-[2px] h-[26px]
                    ${index <= completedIndex ? "bg-green-500" : "bg-gray-300"}
                  `}
                />
              )}

              {/* CONNECTOR (BELOW DOT) */}
              {index < steps.length - 1 && (
                <span
                  className={`
                    absolute left-[18px] top-[28px] w-[2px] h-[26px]
                    ${
                      index < completedIndex
                        ? "bg-green-500"
                        : index === completedIndex
                        ? "bg-gray-300"
                        : "bg-gray-300"
                    }
                  `}
                />
              )}

              {/* DOT */}
              <span
                className={`
                  absolute left-[10px] top-[10px]
                  w-5 h-5 rounded-full border flex items-center justify-center gap-0
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "bg-white border-green-500"
                      : "bg-white border-gray-400"
                  }
                `}
              >
                {isCompleted && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                )}
              </span>

              {/* TEXT + DATE */}
              <div className="flex justify-between gap-4 w-full ml-10 pr-4">
                {/* TEXT */}
                <div className="w-[65%]">
                  <p className="font-medium text-gray-900">{step.title}</p>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>

                {/* DATE */}
                <p
                  className={`text-sm text-right min-w-[150px]
                    ${
                      isCompleted || isActive
                        ? "text-green-500"
                        : "text-gray-400"
                    }
                  `}
                >
                  {step.date}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
