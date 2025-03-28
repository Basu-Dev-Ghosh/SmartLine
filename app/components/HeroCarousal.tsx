// app/components/HeroCarousel.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const carouselImages: CarouselImage[] = [
    {
      src: "/ups-system.jpg",
      alt: "Online UPS Systems",
      title: "Online UPS Systems",
      description: "Reliable power backup solutions for critical applications",
    },
    {
      src: "/battery-bank.jpg",
      alt: "Battery Solutions",
      title: "Battery Solutions",
      description: "SMF, Solar & Industrial battery systems for all needs",
    },
    {
      src: "/solar-installation.jpg",
      alt: "Solar Power Solutions",
      title: "Solar Power Solutions",
      description: "Sustainable energy solutions for businesses & homes",
    },
    {
      src: "/ev-charger.jpg",
      alt: "EV Charging Stations",
      title: "EV Charging Stations",
      description: "Modern charging infrastructure for electric vehicles",
    },
    {
      src: "/control-panel.jpg",
      alt: "Control & Automation",
      title: "Control & Automation",
      description: "Smart electrical control systems for industry",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, carouselImages.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Reset auto-play timer when manually changing slides
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (isAutoPlaying) {
        autoPlayRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
          );
        }, 5000);
      }
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Placeholder component if image fails to load
  const ImagePlaceholder = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-gray-500">Power Solution</p>
      </div>
    </div>
  );

  return (
    <div
      className="relative w-full h-full rounded-lg overflow-hidden shadow-xl bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated circuit lines only at the bottom - SUBTLE */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-20 pointer-events-none overflow-hidden">
        {/* Only a few subtle lines at the bottom */}
        {Array.from({ length: 2 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-smartline-400"
            style={{
              bottom: `${5 + i * 5}px`,
              left: 0,
              opacity: 0.1,
              width: "30%",
            }}
            animate={{
              width: ["0%", "30%", "0%"],
              left: ["0%", "0%", "70%"],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Just a couple of subtle dots */}
        {Array.from({ length: 2 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 bg-smartline-500 rounded-full"
            style={{
              bottom: `${5 + Math.random() * 10}px`,
              left: `${10 + Math.random() * 20}%`,
              opacity: 0.1,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main carousel */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-full">
              {/* Direct background image approach instead of Next.js Image */}
              <div
                className="absolute inset-0 bg-center bg-cover rounded-lg"
                style={{
                  backgroundImage: `url(${carouselImages[currentIndex].src})`,
                }}
              ></div>

              {/* Simple bottom gradient for text readability - NO BLUR */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Caption */}
              <motion.div
                className="absolute bottom-6 left-0 p-6 z-10 w-full"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="text-white text-xl font-semibold mb-2">
                  {carouselImages[currentIndex].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {carouselImages[currentIndex].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - NO BACKDROP BLUR */}
        <motion.button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -mt-6 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-all duration-200"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>

        <motion.button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -mt-6 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-all duration-200"
          aria-label="Next slide"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {carouselImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              whileHover={{
                scale: 1.2,
                backgroundColor:
                  index === currentIndex
                    ? "rgb(255, 255, 255)"
                    : "rgba(255, 255, 255, 0.6)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
