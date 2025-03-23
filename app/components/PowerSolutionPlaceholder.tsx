// app/components/PowerSolutionPlaceholder.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PowerSolutionPlaceholder = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Draw circuit-like pattern
    const circuitNodes: { x: number; y: number; size: number; connected: number[] }[] = [];
    const nodeCount = 30;
    
    // Create random nodes
    for (let i = 0; i < nodeCount; i++) {
      circuitNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 4,
        connected: []
      });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodeCount; i++) {
      const connectionsCount = Math.floor(1 + Math.random() * 3);
      for (let j = 0; j < connectionsCount; j++) {
        let target;
        do {
          target = Math.floor(Math.random() * nodeCount);
        } while (target === i || circuitNodes[i].connected.includes(target));
        
        circuitNodes[i].connected.push(target);
      }
    }
    
    // Animation variables
    let animationFrameId: number;
    let pulsePhase = 0;
    
    // Animation function
    const animate = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f0f9ff');
      gradient.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update pulse phase
      pulsePhase += 0.02;
      
      // Draw connections
      for (let i = 0; i < nodeCount; i++) {
        const node = circuitNodes[i];
        
        for (const targetIndex of node.connected) {
          const target = circuitNodes[targetIndex];
          
          // Calculate distance for pulse animation
          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = 'rgba(22, 163, 74, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Draw pulse moving along the line
          const pulseOffset = (pulsePhase + i * 0.1) % 1;
          const pulseX = node.x + dx * pulseOffset;
          const pulseY = node.y + dy * pulseOffset;
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(22, 163, 74, 0.8)';
          ctx.fill();
        }
      }
      
      // Draw nodes
      for (const node of circuitNodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(22, 163, 74, 0.5)';
        ctx.fill();
        
        // Add glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, node.size,
          node.x, node.y, node.size * 2
        );
        glowGradient.addColorStop(0, 'rgba(22, 163, 74, 0.2)');
        glowGradient.addColorStop(1, 'rgba(22, 163, 74, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }
      
      // Text overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Power Management Solutions', canvas.width / 2, canvas.height / 2 - 15);
      
      ctx.font = '14px Arial';
      ctx.fillText('UPS, Battery & Electrical Systems', canvas.width / 2, canvas.height / 2 + 15);
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      className="w-full h-full rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full" 
      />
    </motion.div>
  );
};

export default PowerSolutionPlaceholder;