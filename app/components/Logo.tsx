// app/components/Logo.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src="/logo.bmp"
              alt="Smartline Logo"
              width={width}
              height={height}
              priority
              className="object-contain"
              style={{
                filter: "brightness(1.1) contrast(1.1)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Logo;
