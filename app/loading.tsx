"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  return (
    <div className="flex min-h-[101dvh] items-center justify-center bg-background">
      <motion.div
        className="relative flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`${i}homepage`}
            className="h-4 w-4 rounded-full bg-black dark:bg-white"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}