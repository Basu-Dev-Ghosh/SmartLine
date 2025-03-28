// app/components/SplashLoader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import Image from "next/image";

// Define brand colors
const BRAND_COLORS = {
  smartlineBlue: "#58c8e3",
  smartlineRed: "#dc2626",
};

const SplashLoader = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState<
    "initial" | "expanding" | "complete"
  >("initial");

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Convert hex color to THREE.js color
    const blueColor = new THREE.Color(BRAND_COLORS.smartlineBlue);
    const redColor = new THREE.Color(BRAND_COLORS.smartlineRed);

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Position
      posArray[i * 3] = (Math.random() - 0.5) * 50;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 50;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Color - mix between red and blue
      const mixFactor = Math.random();
      const mixedColor = new THREE.Color().lerpColors(
        redColor,
        blueColor,
        mixFactor
      );

      colorsArray[i * 3] = mixedColor.r;
      colorsArray[i * 3 + 1] = mixedColor.g;
      colorsArray[i * 3 + 2] = mixedColor.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Connecting lines between particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: blueColor,
      transparent: true,
      opacity: 0.1,
    });

    for (let i = 0; i < 100; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const vertices = new Float32Array(6);

      for (let j = 0; j < 6; j++) {
        vertices[j] = (Math.random() - 0.5) * 50;
      }

      lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3)
      );
      const line = new THREE.LineSegments(lineGeometry, linesMaterial);
      scene.add(line);
    }

    // Camera positioning
    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;

      // Update particles based on loading progress
      const progress = loadingProgress / 100;
      particlesMesh.scale.set(progress, progress, progress);
      particlesMesh.material.opacity = progress * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 5; // More random progress

        if (newProgress >= 50) {
          setLoadingStage("expanding");
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setLoadingStage("complete");
          setTimeout(onComplete, 800); // Slightly longer transition
        }

        return Math.min(newProgress, 100); // Cap at 100
      });
    }, 200);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(progressInterval);

      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [onComplete]);

  // Loading messages
  const loadingMessages = [
    "Initializing Smart Solutions",
    "Powering Up Your Experience",
    "Almost Ready...",
  ];

  const currentMessage =
    loadingStage === "initial"
      ? loadingMessages[0]
      : loadingStage === "expanding"
      ? loadingMessages[1]
      : loadingMessages[2];

  return (
    <AnimatePresence>
      {loadingStage !== "complete" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.5,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-50 to-white overflow-hidden flex items-center justify-center"
        >
          {/* Three.js Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Overlay Content */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 150,
                damping: 10,
              },
            }}
            className="text-center relative z-10 flex flex-col items-center justify-center"
          >
            {/* Logo with Image */}
            <motion.div
              initial={{
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                scale: [0.5, 1.1, 1],
                opacity: 1,
                transition: {
                  duration: 1,
                  times: [0, 0.7, 1],
                  ease: "easeInOut",
                },
              }}
              className="mb-8 relative"
            >
              <div className="relative w-60 h-60 flex items-center justify-center">
                {/* Add glow effect behind logo */}
                <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-[#58c8e3]/20 to-[#dc2626]/20 blur-xl"></div>

                {/* Logo image */}
                <div className="relative z-10">
                  <Image
                    src="/logo.png"
                    alt="SMARTLiNE Logo"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: 1,
                width: "18rem",
                transition: { delay: 0.3, duration: 0.5 },
              }}
              className="relative mb-6 h-2 w-72 rounded-full overflow-hidden bg-gray-200 shadow-inner"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: `${loadingProgress}%`,
                  transition: { duration: 0.3 },
                }}
                className="h-full rounded-full bg-gradient-to-r from-[#dc2626] to-[#58c8e3]"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.5,
                  duration: 0.5,
                },
              }}
              className="text-lg font-medium text-gray-700"
            >
              {currentMessage}
            </motion.p>

            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.7,
                transition: {
                  delay: 0.7,
                  duration: 0.5,
                },
              }}
              className="text-sm text-gray-500 mt-2"
            >
              {loadingProgress}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
