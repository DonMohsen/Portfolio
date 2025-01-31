"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  alt: string;
  isModalOpen:boolean
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt,isModalOpen }) => {
    useEffect(() => {
     setIsOpen(isModalOpen)
    }, [isModalOpen])
    
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <>
      {/* Thumbnail Image */}
      <div
        className="cursor-pointer rounded-lg overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={400} // Thumbnail size
          height={250}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)} // Close on background click
          >
            {/* Modal Content */}
            <motion.div
              className="relative p-4 bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
              >
                ✕
              </button>

              {/* Full-Size Image */}
              <Image
                src={src}
                alt={alt}
                width={1920} // Full-size
                height={1080}
                quality={100}
                priority
                className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageModal;
