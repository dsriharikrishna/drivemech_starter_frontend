

"use client";

import { X } from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import React from "react";
import Button from "./Button";

type RightDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

const RightDrawer = ({
  isOpen,
  onClose,
  title,
  className = "w-96",
  children,
}: RightDrawerProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className={clsx(
            "fixed top-0 right-0 z-40 h-screen flex flex-col bg-white border-l border-gray-200 shadow-xl",
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <h5 className="font-semibold text-gray-800 truncate">{title}</h5>
            <Button onClick={onClose} size="sm" variant="gradient" aria-label="Close">
              <X size={20} weight="duotone" color="#fff" />
            </Button>
          </div>

          {/* Body */}
          <div className="flex-1 h-full w-full overflow-auto">{children}</div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

export default RightDrawer;

