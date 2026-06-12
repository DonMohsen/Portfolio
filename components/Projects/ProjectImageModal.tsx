"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type ProjectImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

export default function ProjectImageModal({
  isOpen,
  onClose,
  src,
  alt,
}: ProjectImageModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-max"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <motion.div
            className="relative p-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-white text-xl bg-red-700 bg-opacity-90 rounded-full px-2 z-10"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
            <Image
              width={1920}
              height={1080}
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              sizes="90vw"
              quality={80}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
