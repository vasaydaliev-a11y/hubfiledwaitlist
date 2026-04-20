"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import Image from "next/image";
import { useRef, useCallback, useState } from "react";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";

/* ── Floating Particles ── */

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  top: `${8 + Math.random() * 84}%`,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 3,
  color:
    i % 3 === 0
      ? "rgba(139,92,246,0.5)"
      : i % 3 === 1
        ? "rgba(196,132,252,0.45)"
        : "rgba(6,182,212,0.4)",
}));

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -14, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── 3D Tilt Product Card ── */

function ProductCard({
  product,
  index,
  featured,
}: {
  product: ShopifyProduct;
  index: number;
  featured: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    damping: 20,
    stiffness: 200,
  });

  const spotlightX = useTransform(mouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => {
    setHovering(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const hasDiscount =
    parseFloat(product.compareAtPriceRange.minVariantPrice.amount) >
    parseFloat(product.priceRange.minVariantPrice.amount);

  const discountPct = hasDiscount
    ? Math.round(
        (1 -
          parseFloat(product.priceRange.minVariantPrice.amount) /
            parseFloat(product.compareAtPriceRange.minVariantPrice.amount)) *
          100
      )
    : 0;

  const tiltStyle: MotionStyle = {
    rotateX,
    rotateY,
    transformPerspective: 800,
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`product-card group relative overflow-hidden rounded-2xl transition-shadow duration-500 ${
        featured ? "sm:col-span-2 sm:row-span-2" : ""
      } ${product.onlineStoreUrl ? "cursor-pointer" : "cursor-default"}`}
      onClick={() => {
        if (product.onlineStoreUrl) {
          window.open(product.onlineStoreUrl, "_blank", "noopener");
        }
      }}
    >
      {/* Card inner bg */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(10,1,24,0.92), rgba(3,0,20,0.7))",
          border: "1px solid rgba(139,92,246,0.08)",
        }}
      />

      {/* Spotlight following cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(circle 280px at ${x}% ${y}%, rgba(139,92,246,0.12), rgba(6,182,212,0.06) 40%, transparent 70%)`
          ),
        }}
      />

      {/* Shimmer sweep */}
      <div className="product-shimmer z-[2] rounded-2xl" />

      {/* Image */}
      {product.featuredImage && (
        <div
          className={`relative w-full overflow-hidden ${
            featured ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            className="relative z-[1] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes={
              featured
                ? "(max-width: 640px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
          {/* Bottom fade */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#030014] via-[#030014]/30 to-transparent" />

          {/* Discount badge */}
          {hasDiscount && (
            <div className="discount-badge absolute left-3 top-3 z-[3] flex items-center gap-1 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              -{discountPct}%
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-[3] p-5">
        <h3
          className={`font-semibold text-white line-clamp-1 ${
            featured ? "text-xl" : "text-lg"
          }`}
        >
          {product.title}
        </h3>
        <p
          className={`mt-1.5 leading-relaxed text-white/45 ${
            featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
          }`}
        >
          {product.description}
        </p>

        {/* Price row */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className={`price-shine font-bold ${
                featured ? "text-lg" : "text-base"
              }`}
            >
              {formatPrice(product.priceRange.minVariantPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-white/25 line-through">
                {formatPrice(product.compareAtPriceRange.minVariantPrice)}
              </span>
            )}
          </div>

          <motion.span
            initial={false}
            animate={{
              opacity: hovering ? 1 : 0,
              x: hovering ? 0 : 8,
              scale: hovering ? 1 : 0.9,
            }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3 py-1.5 text-[13px] font-medium text-white/70 backdrop-blur-md transition-colors hover:bg-white/[0.12] hover:text-white"
          >
            {product.onlineStoreUrl ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View in store
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                Notify me
              </>
            )}
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ── */

interface FeaturedProductsProps {
  products: ShopifyProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="products-heading" className="relative mx-auto w-full max-w-6xl px-4 pb-28 sm:px-6">
      <FloatingParticles />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-glow mb-14 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[13px] uppercase text-white/30"
        >
          Marketplace
        </motion.p>
        <h2 id="products-heading" className="mt-3 text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl">
          Featured on the{" "}
          <span className="text-brand-gradient">platform</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-white/40">
          A preview of what&apos;s available when you get access.
        </p>
      </motion.div>

      {/* Product grid — first card is hero-sized */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            featured={i === 0}
          />
        ))}
      </div>

      {/* Bottom glow line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mx-auto mt-16 h-px w-full max-w-md"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 30%, rgba(6,182,212,0.25) 70%, transparent 100%)",
        }}
      />
    </section>
  );
}
