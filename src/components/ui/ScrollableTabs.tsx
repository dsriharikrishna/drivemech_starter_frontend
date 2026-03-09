"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- TYPES ---------------- */

export interface TabItem {
  id: string;
  label: string;
  icon: string | React.ReactNode;
  disabled?: boolean;
}

export interface ScrollableTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: "default" | "compact";
  showArrows?: boolean;
  arrowPosition?: "inside" | "outside";
  className?: string;
}

/* ---------------- COMPONENT ---------------- */

export default function ScrollableTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = "default",
  showArrows = true,
  arrowPosition = "outside",
  className = "",
}: ScrollableTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /* ---------------- SCROLL DETECTION ---------------- */

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [tabs]);

  /* ---------------- SCROLL HANDLERS ---------------- */

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  /* ---------------- KEYBOARD NAVIGATION ---------------- */

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      e.preventDefault();
      const prevTab = tabs[currentIndex - 1];
      if (!prevTab.disabled) {
        onTabChange(prevTab.id);
        // Focus the previous tab
        const prevButton = e.currentTarget
          .previousElementSibling as HTMLButtonElement;
        prevButton?.focus();
      }
    } else if (e.key === "ArrowRight" && currentIndex < tabs.length - 1) {
      e.preventDefault();
      const nextTab = tabs[currentIndex + 1];
      if (!nextTab.disabled) {
        onTabChange(nextTab.id);
        // Focus the next tab
        const nextButton = e.currentTarget
          .nextElementSibling as HTMLButtonElement;
        nextButton?.focus();
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!tabs[currentIndex].disabled) {
        onTabChange(tabId);
      }
    }
  };

  /* ---------------- RENDER ---------------- */

  const isCompact = variant === "compact";
  const isOutside = arrowPosition === "outside";

  return (
    <div
      className={`relative bg-white flex items-center gap-2 w-full rounded-2xl ${className}`}
      role="tablist"
      aria-label="Service tabs"
    >
      {/* LEFT ARROW */}
      {showArrows && (
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className={`
                        flex-shrink-0 flex items-center justify-center
                        w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full
                        ${canScrollLeft
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-white border border-gray-200 text-gray-400"
            }
                        disabled:opacity-40 disabled:cursor-not-allowed
                        transition-all duration-200 
                        ${isOutside ? "" : "absolute left-2 z-10 shadow-md"}
                    `}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* TABS CONTAINER */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        className={`
                    flex-1 flex items-center
                    ${isCompact ? "gap-0" : "gap-2 sm:gap-3 md:gap-4"}
                    overflow-x-auto scrollbar-hide
                    scroll-smooth
                `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              disabled={isDisabled}
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              tabIndex={isActive ? 0 : -1}
              className={`
                                flex flex-col items-center justify-center
                                ${isCompact
                  ? "flex-1 min-w-[52px] flex-shrink gap-0.5 px-1 py-1 sm:py-1.5"
                  : "flex-shrink-0 gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 w-[80px] md:w-[110px]"
                }
                                rounded-lg
                                transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                                ${isActive
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }
                                ${isDisabled
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
                }
                            `}
            >
              {/* ICON */}
              <div
                className={`
                                flex items-center justify-center
                                ${isCompact
                    ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                    : "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
                  }
                            `}
              >
                {typeof tab.icon === "string" ? (
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    width={24}
                    height={24}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  tab.icon
                )}
              </div>

              {/* LABEL */}
              <span
                className={`
                                text-center font-medium leading-tight
                                ${isCompact
                    ? "text-[10px] sm:text-xs"
                    : "text-xs sm:text-xs"
                  }
                                ${isActive ? "text-orange-500" : "text-gray-700"}
                            `}
              >
                {tab.label}
              </span>

              {/* ACTIVE INDICATOR */}
              {isActive && (
                <div className="w-full h-0.5 bg-orange-500 rounded-full mt-0.5 sm:mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* RIGHT ARROW */}
      {showArrows && (
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className={`
                        flex-shrink-0 flex items-center justify-center
                        w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full
                        ${canScrollRight
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-white border border-gray-200 text-gray-400"
            }
                        disabled:opacity-40 disabled:cursor-not-allowed
                        transition-all duration-200
                        ${isOutside ? "" : "absolute right-2 z-10 shadow-md"}
                    `}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* HIDE SCROLLBAR */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
