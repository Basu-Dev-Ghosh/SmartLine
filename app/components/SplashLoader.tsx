// app/components/SplashLoader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

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

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x16a34a,
      transparent: true,
      opacity: 0.4,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Connecting lines between particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x16a34a,
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
      particlesMesh.material.opacity = progress * 0.4;

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
        const newProgress = prev + 10;

        if (newProgress >= 50) {
          setLoadingStage("expanding");
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setLoadingStage("complete");
          setTimeout(onComplete, 500);
        }

        return newProgress;
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

  return (
    <AnimatePresence>
      {loadingStage !== "complete" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 2,
            transition: { duration: 0.5 },
          }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-green-50 to-white overflow-hidden flex items-center justify-center"
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
            className="text-center relative z-10"
          >
            {/* Logo Text with Framer Motion Animation */}
            <motion.div
              initial={{
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                scale: [0.5, 1.1, 1],
                opacity: 1,
                transition: {
                  duration: 0.8,
                  times: [0, 0.7, 1],
                  ease: "easeInOut",
                },
              }}
              className="mb-4"
            >
              <span className="text-5xl font-bold">
                <span className="text-black">SMART</span>
                <span className="text-green-600">LiNE</span>
              </span>
            </motion.div>

            {/* Loading Progress */}
            <div className="w-72 bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <div
                style={{ width: `${loadingProgress}%` }}
                className="bg-gradient-to-r from-green-500 to-green-700 h-full rounded-full transition-all duration-200"
              />
            </div>

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
              className="text-lg text-gray-600 mb-2"
            >
              {loadingStage === "initial"
                ? "Initializing Smart Solutions"
                : loadingStage === "expanding"
                ? "Powering Up"
                : "Launching SMARTLiNE"}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
