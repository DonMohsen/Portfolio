'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const [isBroken, setIsBroken] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBroken(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const generateTriangles = () => {
    return [...Array(20)].map((_, i) => {
      const size = Math.random() * 100 + 50;
      const clipPath = `polygon(${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%)`;
      return (
        <motion.div
          key={i}
          className="absolute bg-gray-700/50 border border-gray-600"
          style={{
            width: size,
            height: size,
            clipPath: clipPath,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: 800, rotate: Math.random() * 360 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      );
    });
  };

  return (
    <div className=" relative flex min-h-[101vh] flex-col items-center justify-center bg-gray-900 text-white px-6 text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 backdrop-blur-lg bg-white/10 rounded-xl"
        initial={{ opacity: 1 }}
        animate={isBroken ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.h1
        className="text-7xl font-bold tracking-tight relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-gray-400 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Oops! The page you are looking for does not exist.
      </motion.p>
      <motion.div
        className="mt-6 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/">
          <Button variant="default" className="px-6 py-2 text-lg font-medium rounded-lg">
            Go Home
          </Button>
        </Link>
      </motion.div>
      {isBroken && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {generateTriangles()}
        </motion.div>
      )}
    </div>
  );
}
