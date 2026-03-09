import { useEffect, RefObject } from "react";

/**
 * Custom hook that detects clicks outside of a referenced element
 * @param ref - React ref object pointing to the element
 * @param callback - Function to execute when click outside is detected
 * @param enabled - Optional flag to enable/disable the hook (default: true)
 */
export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the ref exists and if the click was outside the element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback, enabled]);
}

export default useOutsideClick;
