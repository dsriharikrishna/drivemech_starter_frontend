"use client";

import React from "react";

export interface TimelineItem {
  id?: string | number;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  completed: boolean;
  icon?: React.ReactNode;
  customContent?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: "default" | "compact" | "detailed";
  completedColor?: string;
  pendingColor?: string;
  lineColor?: string;
  showHeader?: boolean;
  headerTitle?: string;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({
  items,
  variant = "default",
  completedColor = "bg-green-500",
  pendingColor = "border-gray-300 bg-white",
  lineColor = "bg-gray-200",
  showHeader = false,
  headerTitle,
  className = "",
}) => {
  const getIconSize = () => {
    switch (variant) {
      case "compact":
        return "w-6 h-6";
      case "detailed":
        return "w-10 h-10";
      default:
        return "w-8 h-8";
    }
  };

  const getInnerIconSize = () => {
    switch (variant) {
      case "compact":
        return "w-2 h-2";
      case "detailed":
        return "w-4 h-4";
      default:
        return "w-3 h-3";
    }
  };

  const getLinePosition = () => {
    switch (variant) {
      case "compact":
        return "left-[11px]";
      case "detailed":
        return "left-[19px]";
      default:
        return "left-[15px]";
    }
  };

  const getGapSize = () => {
    switch (variant) {
      case "compact":
        return "gap-2";
      case "detailed":
        return "gap-6";
      default:
        return "gap-4";
    }
  };

  const getPaddingBottom = () => {
    switch (variant) {
      case "compact":
        return "pb-2";
      case "detailed":
        return "pb-6";
      default:
        return "pb-4";
    }
  };

  return (
    <div className={className}>
      {/* Optional Header */}
      {showHeader && headerTitle && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">{headerTitle}</h3>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div
          className={`absolute ${getLinePosition()} top-0 bottom-0 w-[2px] ${lineColor}`}
        />

        {/* Timeline Items */}
        <div className="flex flex-col gap-0">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`relative flex ${getGapSize()}`}
            >
              {/* Icon/Indicator */}
              <div className="relative z-10">
                {item.icon ? (
                  <div
                    className={`${getIconSize()} rounded-full ${
                      item.completed ? completedColor : pendingColor
                    } flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                ) : item.completed ? (
                  <div
                    className={`${getIconSize()} rounded-full ${completedColor} flex items-center justify-center`}
                  >
                    <div
                      className={`${getInnerIconSize()} rounded-full bg-white`}
                    />
                  </div>
                ) : (
                  <div
                    className={`${getIconSize()} rounded-full border-2 ${pendingColor} flex items-center justify-center`}
                  >
                    <div
                      className={`${getInnerIconSize()} rounded-full bg-gray-300`}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                className={`flex-1 ${
                  index !== items.length - 1 ? getPaddingBottom() : ""
                }`}
              >
                {item.customContent ? (
                  item.customContent
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4
                        className={`font-medium text-gray-900 ${
                          variant === "compact" ? "text-sm" : ""
                        }`}
                      >
                        {item.title}
                      </h4>
                      {item.description && (
                        <p
                          className={`text-gray-500 mt-1 ${
                            variant === "compact" ? "text-xs" : "text-sm"
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                    {(item.date || item.time) && (
                      <div className="text-right ml-4">
                        {item.date && (
                          <div
                            className={`${
                              variant === "compact" ? "text-xs" : "text-sm"
                            } ${
                              item.completed
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {item.date}
                          </div>
                        )}
                        {item.time && (
                          <div
                            className={`${
                              variant === "compact" ? "text-xs" : "text-sm"
                            } ${
                              item.completed ? "text-red-500" : "text-gray-400"
                            }`}
                          >
                            {item.time}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
