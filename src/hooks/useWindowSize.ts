"use client";

import { useState, useEffect } from "react";

export interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}

/**
 * useWindowSize
 *
 * Returns the current browser window width and height.
 * Values are `undefined` during SSR / before the component mounts.
 *
 * Usage:
 *   const { width, height } = useWindowSize();
 */
export function useWindowSize(): WindowSize {
    const [size, setSize] = useState<WindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Set initial size
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}

export default useWindowSize;
