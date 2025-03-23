// app/components/Logo.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 150, height = 40 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
      style={{ width, height }}
    >
      <div className="flex items-center">
        <motion.div 
          className="relative"
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
        >
          <motion.div 
            className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center opacity-70"
            whileHover={{
              scale: 1.1,
              rotate: 5,
              opacity: 0.9,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="bg-white rounded-full w-4 h-4 opacity-40"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        <div className="ml-3">
          <div className="flex flex-col">
            <motion.span 
              className="text-red-600 font-bold text-xl tracking-wide"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              SMART<motion.span 
                className="text-green-600"
                animate={{ 
                  color: ["#16a34a", "#15803d", "#16a34a"],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                }}
              >LiNE</motion.span>
            </motion.span>
            <motion.span 
              className="text-green-600 text-xs font-medium"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{
                letterSpacing: "0.03em",
                transition: { duration: 0.3 }
              }}
            >
              Always OnLine
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Logo;