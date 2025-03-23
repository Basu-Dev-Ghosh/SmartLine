// app/components/HeroSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import HeroCarousel from "./HeroCarousal";
import * as THREE from "three";

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

    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color("#16a34a"),
      transparent: true,
      opacity: 0.8,
    });

    // Create mesh
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Add lines connecting some particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x16a34a,
      transparent: true,
      opacity: 0.2,
    });

    for (let i = 0; i < 20; i++) {
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

    // Position and background
    camera.position.z = 3;

    // Animation loop
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;

      // Respond to mouse movement
      particlesMesh.rotation.x += mouseY * 0.001;
      particlesMesh.rotation.y += mouseX * 0.001;

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
      },
    },
    hover: {
      y: -5,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 },
    },
  };

  const gradientCircleVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background animation container */}
      <div ref={threeContainerRef} className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-green-400/10 to-green-600/5 blur-2xl hidden md:block"
        variants={gradientCircleVariants}
        animate="animate"
      />

      <motion.div
        className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-blue-400/10 to-green-500/10 blur-3xl hidden md:block"
        variants={gradientCircleVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container mx-auto px-4 md:px-6 z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text content */}
          <div className="order-2 lg:order-1 z-20">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-2 border border-green-200">
                ISO 9001:2015 Certified
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4"
            >
              Powering <span className="text-green-600">Industry</span> with{" "}
              <span className="text-red-600">Smart</span> Solutions
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg mb-8 max-w-2xl"
            >
              SMARTLiNE is a brainchild of qualified, experienced engineers &
              management professionals with a vision to help Industry meet their
              business goals through our expertise, service & solution.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProducts}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow-lg hover:bg-green-700 transition-all duration-300 cta-button"
              >
                Explore Solutions
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToContact}
                className="px-6 py-3 bg-white text-green-600 font-medium rounded-md shadow-lg border border-green-600 hover:bg-green-50 transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Carousel & cards */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 relative mb-16 md:mb-0"
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <div className="relative aspect-w-16 aspect-h-9">
                <HeroCarousel />
              </div>
            </div>

            {/* Floating feature cards - Desktop */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="absolute -bottom-10 -left-10 bg-white rounded-lg shadow-lg p-4 max-w-xs z-20 hidden md:block"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path d="M12 22v-5" />
                    <path d="M9 7V2" />
                    <path d="M15 7V2" />
                    <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z" />
                  </motion.svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">24x7 Support</h4>
                  <p className="text-xs text-gray-500">
                    Always Online, Always Ready
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="absolute -top-5 -right-5 bg-white rounded-lg shadow-lg p-4 max-w-xs z-20 hidden md:block"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </motion.svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">
                    Trusted by 100+ Companies
                  </h4>
                  <p className="text-xs text-gray-500">
                    20+ Years of Excellence
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 lg:mt-32 text-center"
        >
          {[
            { number: "20+", label: "Years of Experience" },
            { number: "500+", label: "Satisfied Customers" },
            { number: "12+", label: "Industry Sectors" },
            { number: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
                boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.2 }}
              className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-md"
            >
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-green-600"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="text-white"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
