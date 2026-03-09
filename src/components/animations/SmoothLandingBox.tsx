"use client";

import { motion, Variant } from "framer-motion";
import React from "react";

type AnimationVariant =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "bounce";

interface SmoothLandingBoxProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  variant?: AnimationVariant;
  distance?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  once?: boolean;
  hover?: boolean;
  tap?: boolean;
}

const getVariantConfig = (variant: AnimationVariant, distance: number) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    "slide-up": {
      initial: { opacity: 0, y: distance },
      animate: { opacity: 1, y: 0 },
    },
    "slide-down": {
      initial: { opacity: 0, y: -distance },
      animate: { opacity: 1, y: 0 },
    },
    "slide-left": {
      initial: { opacity: 0, x: distance },
      animate: { opacity: 1, x: 0 },
    },
    "slide-right": {
      initial: { opacity: 0, x: -distance },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    bounce: {
      initial: { opacity: 0, y: distance, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
    },
  };

  return variants[variant];
};

export const SmoothLandingBox = ({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  variant = "slide-up",
  distance = 20,
  staggerChildren = false,
  staggerDelay = 0.1,
  once = true,
  hover = false,
  tap = false,
}: SmoothLandingBoxProps) => {
  const { initial, animate } = getVariantConfig(variant, distance);

  const transitionConfig = {
    duration,
    delay,
    ease:
      variant === "bounce"
        ? ([0.34, 1.56, 0.64, 1] as const)
        : ([0.25, 0.46, 0.45, 0.94] as const),
    ...(staggerChildren && {
      staggerChildren: staggerDelay,
    }),
  };

  const hoverConfig = hover
    ? {
        scale: 1.02,
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
      }
    : undefined;

  const tapConfig = tap
    ? {
        scale: 0.98,
        transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] as const },
      }
    : undefined;

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      transition={transitionConfig}
      whileHover={hoverConfig}
      whileTap={tapConfig}
      viewport={{ once, margin: "0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Wrapper for stagger children animations
export const SmoothLandingContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Individual item for stagger animations
export const SmoothLandingItem = ({
  children,
  className = "",
  variant = "slide-up",
  distance = 24,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  distance?: number;
}) => {
  const { initial, animate } = getVariantConfig(variant, distance);

  return (
    <motion.div
      variants={{
        hidden: initial,
        visible: animate,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
