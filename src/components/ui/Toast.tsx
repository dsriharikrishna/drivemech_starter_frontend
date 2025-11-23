"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  WarningCircle,
  Info,
  Warning,
  X,
} from "phosphor-react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export default function ToastManager() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Toast[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const toastIdRef = useRef(0);

  /** Add a toast */
  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++toastIdRef.current;
    const newToast = { id, message, type };

    setToasts((active) => {
      if (active.length === 0) {
        startTimer(id);
        return [newToast];
      }
      setQueue((q) => [...q, newToast]);
      return active;
    });
  }, []);

  /** Auto-remove timer */
  const startTimer = (id: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => removeToast(id), 2500);
  };

  /** Remove toast and process queue */
  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));

    setQueue((q) => {
      if (q.length > 0) {
        const [next, ...rest] = q;
        setToasts([next]);
        startTimer(next.id);
        return rest;
      }
      return q;
    });
  }, []);

  /** Register global function once */
  useEffect(() => {
    (window as any).addToast = addToast;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [addToast]);

  const toastStyles = {
    success: {
      icon: <CheckCircle size={24} className="text-green-600" />,
      bg: "bg-green-100",
      title: "Success",
      titleClass: "text-green-800",
      msgClass: "text-green-700",
    },
    error: {
      icon: <WarningCircle size={24} className="text-red-600" />,
      bg: "bg-red-100",
      title: "Error",
      titleClass: "text-red-800",
      msgClass: "text-red-700",
    },
    warning: {
      icon: <Warning size={24} className="text-yellow-600" />,
      bg: "bg-yellow-100",
      title: "Warning",
      titleClass: "text-yellow-800",
      msgClass: "text-yellow-700",
    },
    info: {
      icon: <Info size={24} className="text-blue-600" />,
      bg: "bg-blue-100",
      title: "Info",
      titleClass: "text-blue-800",
      msgClass: "text-blue-700",
    },
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-4 max-w-xs w-full">
      <AnimatePresence>
        {toasts.map(({ id, message, type }) => {
          const style = toastStyles[type];

          return (
            <motion.div
              key={id}
              role="alert"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.25 }}
              className={`${style.bg} rounded-lg shadow-lg p-4 flex items-center space-x-3`}
            >
              <div className="shrink-0">{style.icon}</div>

              <div className="flex flex-col flex-grow">
                <div className={`font-semibold mb-1 select-none ${style.titleClass}`}>
                  {style.title}
                </div>
                <div className={`text-sm select-text ${style.msgClass}`}>
                  {message}
                </div>
              </div>

              <button
                aria-label="Dismiss toast"
                onClick={() => removeToast(id)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700"
              >
                <X size={18} weight="bold" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}



// addToast("Login successful!", "success");
// addToast("Invalid credentials", "error");
// addToast("Warning: Low balance", "warning");
// addToast("Information message", "info");
