"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function HeroOrb() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 80 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax offsets — each layer moves differently
  const ring1X = useTransform(smoothX, [0, 1], [-30, 30]);
  const ring1Y = useTransform(smoothY, [0, 1], [-25, 25]);
  const nebula1X = useTransform(smoothX, [0, 1], [-50, 50]);
  const nebula1Y = useTransform(smoothY, [0, 1], [-40, 40]);
  const nebula2X = useTransform(smoothX, [0, 1], [30, -30]);
  const nebula2Y = useTransform(smoothY, [0, 1], [20, -20]);
  const coreX = useTransform(smoothX, [0, 1], [-15, 15]);
  const coreY = useTransform(smoothY, [0, 1], [-12, 12]);
  const ray1X = useTransform(smoothX, [0, 1], [-20, 20]);
  const ray2X = useTransform(smoothX, [0, 1], [15, -15]);

  // Tilt rotation
  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
    >
      {/* Outer galactic ring — follows cursor slowly */}
      <motion.div
        className="absolute"
        style={{
          width: "min(600px, 90vw)",
          height: "min(600px, 90vw)",
          x: ring1X,
          y: ring1Y,
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139,92,246,0.12) 40deg, transparent 80deg, rgba(6,182,212,0.1) 130deg, transparent 170deg, rgba(236,72,153,0.08) 220deg, transparent 260deg, rgba(139,92,246,0.1) 310deg, transparent 360deg)",
          filter: "blur(45px)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Second ring — counter-rotates, opposite parallax */}
      <motion.div
        className="absolute"
        style={{
          width: "min(520px, 78vw)",
          height: "min(520px, 78vw)",
          x: useTransform(smoothX, [0, 1], [20, -20]),
          y: useTransform(smoothY, [0, 1], [15, -15]),
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(6,182,212,0.08) 60deg, transparent 120deg, rgba(139,92,246,0.06) 200deg, transparent 280deg, rgba(236,72,153,0.05) 340deg, transparent 360deg)",
          filter: "blur(50px)",
          opacity: 0.7,
        }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />

      {/* Nebula cloud — primary, strong parallax */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(380px, 65vw)",
          height: "min(380px, 65vw)",
          x: nebula1X,
          y: nebula1Y,
          background:
            "radial-gradient(ellipse at 35% 30%, rgba(139,92,246,0.25), rgba(6,182,212,0.1) 45%, transparent 70%)",
          filter: "blur(35px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Nebula cloud — pink accent, opposite movement */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(300px, 52vw)",
          height: "min(200px, 35vw)",
          x: nebula2X,
          y: nebula2Y,
          background:
            "radial-gradient(ellipse at 65% 55%, rgba(236,72,153,0.18), transparent 65%)",
          filter: "blur(40px)",
          rotate: -20,
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Stellar core — subtle follow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(120px, 20vw)",
          height: "min(120px, 20vw)",
          x: coreX,
          y: coreY,
          background:
            "radial-gradient(circle, rgba(196,132,252,0.5) 0%, rgba(139,92,246,0.25) 35%, rgba(6,182,212,0.1) 60%, transparent 80%)",
          filter: "blur(15px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* White-hot center — stays mostly centered */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "min(32px, 6vw)",
          height: "min(32px, 6vw)",
          x: useTransform(smoothX, [0, 1], [-5, 5]),
          y: useTransform(smoothY, [0, 1], [-4, 4]),
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8), rgba(196,132,252,0.4) 50%, transparent 80%)",
          filter: "blur(5px)",
        }}
      />

      {/* Cyan accent ray — follows horizontally */}
      <motion.div
        className="absolute"
        style={{
          width: "min(200px, 35vw)",
          height: "2px",
          x: ray1X,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.35) 40%, rgba(6,182,212,0.08) 100%)",
          filter: "blur(3px)",
          transformOrigin: "left center",
          left: "calc(50% + min(35px, 6vw))",
          top: "calc(50% - 10px)",
        }}
        animate={{ opacity: [0.3, 0.75, 0.3], scaleX: [0.8, 1, 0.8] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Purple accent ray — follows opposite */}
      <motion.div
        className="absolute"
        style={{
          width: "min(180px, 30vw)",
          height: "2px",
          x: ray2X,
          background:
            "linear-gradient(270deg, transparent 0%, rgba(139,92,246,0.4) 40%, rgba(236,72,153,0.12) 100%)",
          filter: "blur(3px)",
          transformOrigin: "right center",
          right: "calc(50% + min(35px, 6vw))",
          top: "calc(50% + 8px)",
        }}
        animate={{ opacity: [0.4, 0.85, 0.4], scaleX: [0.85, 1, 0.85] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </motion.div>
  );
}
