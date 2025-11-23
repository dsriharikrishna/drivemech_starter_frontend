"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">

      {/* Car Animation */}
      <div className="relative w-full max-w-md h-32 overflow-hidden mb-4">

        {/* Road */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-300 rounded-full" />

        {/* Car driving animation */}
        <motion.div
          className="absolute text-5xl select-none"
          animate={{ x: ["120%", "-0%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🚗💨
        </motion.div>
      </div>

      {/* 404 Text */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl font-extrabold text-gray-900"
      >
        404
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-lg max-w-md mt-2"
      >
        Looks like this page is still in the garage for repairs.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-4 mt-6"
      >
        {/* Home */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/"
            className="px-5 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
          >
            Go Home
          </Link>
        </motion.div>

        {/* Login */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/login"
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
