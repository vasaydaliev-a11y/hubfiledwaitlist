"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9997] hidden lg:block"
      style={{
        x: springX,
        y: springY,
        width: 500,
        height: 500,
        marginLeft: -250,
        marginTop: -250,
        background:
          "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 35%, transparent 65%)",
        filter: "blur(2px)"
      }}
    />
  );
}
