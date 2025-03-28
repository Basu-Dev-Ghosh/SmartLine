"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import HeroCarousel from "./HeroCarousal";
import * as THREE from "three";

// Define brand colors to use throughout the component
const BRAND_COLORS = {
  smartlineBlue: "#58c8e3",
  smartlineRed: "#dc2626",
};

const HeroSection = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToContact = () => {
    router.push("/contact");
  };

  useEffect(() => {
    if (!canvasRef.current || !threeContainerRef.current) return;

    // Set up Three.js scene
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

    // Make renderer responsive
    const updateSize = () => {
      if (!threeContainerRef.current) return;
      const width = threeContainerRef.current.clientWidth;
      const height = threeContainerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Create animated particles - using SMARTLiNE blue
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Using the exact smartline color
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: new THREE.Color(BRAND_COLORS.smartlineBlue),
      transparent: true,
      opacity: 0.4,
    });

    // Create mesh
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Add minimal connecting lines - convert hex to integer for THREE.js
    const hexColor = BRAND_COLORS.smartlineBlue.replace("#", "0x");
    const linesMaterial = new THREE.LineBasicMaterial({
      color: parseInt(hexColor, 16),
      transparent: true,
      opacity: 0.15,
    });

    for (let i = 0; i < 10; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      const endPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );

      lineGeometry.setFromPoints([startPoint, endPoint]);
      const line = new THREE.Line(lineGeometry, linesMaterial);
      scene.add(line);
    }

    // Position camera
    camera.position.z = 3;

    // Animation loop - very subtle movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0003;

      // Extremely subtle mouse response
      particlesMesh.rotation.x += mouseY * 0.0003;
      particlesMesh.rotation.y += mouseX * 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);

      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

      // Remove all children from the scene
      while (scene.children.length > 0) {
        const object = scene.children[0];
        scene.remove(object);
      }
    };
  }, []);

  // Minimal, elegant animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 20,
      },
    },
  };

  // Simple fade in for stats
  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  return (
    <div
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        background: `linear-gradient(to bottom right, white, rgba(88, 200, 227, 0.05), white)`,
      }}
    >
      {/* Background animation container - very subtle */}
      <div ref={threeContainerRef} className="absolute inset-0 z-0 opacity-60">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text content (wider) */}
          <div className="lg:col-span-6 z-20">
            <motion.div variants={itemVariants} className="mb-4">
              <span
                className="inline-block px-3 py-1 rounded-sm text-xs font-medium mb-6 uppercase tracking-wide"
                style={{
                  backgroundColor: `rgba(88, 200, 227, 0.1)`,
                  color: BRAND_COLORS.smartlineBlue,
                }}
              >
                ISO 9001:2015 Certified
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight"
            >
              <span style={{ color: BRAND_COLORS.smartlineRed }}>
                SMARTLiNE
              </span>{" "}
              E COMMERCE
              <br />
              <span className="text-slate-800">UPS & Battery Solutions</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl"
            >
              SMARTLiNE is a leading provider of UPS Services, Chargers,
              Battery, Solar solutions and Power Audit services. With expertise
              developed over 20+ years, we help businesses achieve reliable
              power management and energy efficiency.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.button
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.99 }}
                onClick={scrollToProducts}
                className="px-6 py-3 text-white font-medium rounded-sm shadow-sm transition-all duration-200"
                style={{ backgroundColor: BRAND_COLORS.smartlineBlue }}
              >
                Explore Solutions
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.99 }}
                onClick={navigateToContact}
                className="px-6 py-3 bg-white font-medium rounded-sm shadow-sm border border-slate-200 hover:bg-slate-50 transition-all duration-200"
                style={{ color: BRAND_COLORS.smartlineBlue }}
              >
                Contact Us
              </motion.button>
            </motion.div>

            {/* Contact info from business card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col space-y-2 text-sm text-slate-600 mb-6"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: BRAND_COLORS.smartlineBlue }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>7439031293 / 9831596920 / 9007021200</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: BRAND_COLORS.smartlineBlue }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>smartline.ecom@gmail.com</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: BRAND_COLORS.smartlineBlue }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>221, Jodhpur Garden, Kolkata 700045</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Carousel & info */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 relative"
          >
            <div className="relative z-10 rounded-md overflow-hidden shadow-2xl border border-slate-100">
              <div className="relative aspect-w-16 aspect-h-9">
                <HeroCarousel />
              </div>
            </div>

            {/* Floating feature badge - Using inline styles for brand colors */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="absolute -top-5 -right-5 bg-white rounded-md shadow-lg p-3 z-20 hidden md:block"
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: `rgba(88, 200, 227, 0.3)`,
              }}
            >
              <div className="flex items-center">
                <div
                  className="p-2 rounded-full"
                  style={{ backgroundColor: `rgba(88, 200, 227, 0.1)` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: BRAND_COLORS.smartlineBlue }}
                  >
                    <path d="M12 15l-2 5l9-9l-9-9l2 5l-5 2l2 5l5 2z" />
                  </svg>
                </div>
                <div className="ml-2">
                  <h4 className="font-medium text-sm text-slate-900">
                    24x7 Support
                  </h4>
                  <p className="text-xs text-slate-500">
                    Always Online, Always Ready
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats section - Corporate style with brand colors */}
        <motion.div
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border-t border-slate-100 pt-10"
        >
          {[
            {
              number: "20+",
              label: "Years Experience",
              desc: "Industry expertise",
            },
            {
              number: "500+",
              label: "Clients Served",
              desc: "Across 12+ sectors",
            },
            {
              number: "99.9%",
              label: "Uptime Guarantee",
              desc: "Reliable solutions",
            },
            {
              number: "24/7",
              label: "Expert Support",
              desc: "Always available",
            },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col">
              <h3
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: BRAND_COLORS.smartlineBlue }}
              >
                {stat.number}
              </h3>
              <p className="text-slate-700 text-sm font-medium">{stat.label}</p>
              <p className="text-slate-500 text-xs">{stat.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer separator - using brand blue */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 70"
          style={{ color: `rgba(88, 200, 227, 0.1)` }}
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,100L1320,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
