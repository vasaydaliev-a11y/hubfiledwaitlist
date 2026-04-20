"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  speed?: number;
};

export default function Marquee({ items, speed = 30 }: MarqueeProps) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex w-max gap-6"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        {duplicated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="neo-inset whitespace-nowrap rounded-lg px-5 py-2 text-sm text-white/55 transition hover:text-white/80"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
