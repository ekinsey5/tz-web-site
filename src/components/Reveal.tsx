"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation delay in seconds. */
  delay?: number;
  as?: "div" | "li";
}

/**
 * The static export is rendered before the visitor's motion preference is
 * known, so the server HTML always carries the motion initial inline style
 * (opacity 0, translateY 16px). React keeps that inline style when the reduced
 * branch hydrates onto the same node, so a CSS override is what guarantees the
 * content is visible under prefers-reduced-motion.
 */
const REDUCED_MOTION_VISIBLE = "motion-reduce:!transform-none motion-reduce:!opacity-100";

/**
 * Scroll-into-view fade/rise. Honors prefers-reduced-motion by rendering
 * static content with no animation.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={cn(className, REDUCED_MOTION_VISIBLE)}>{children}</Tag>;
  }

  const MotionTag = (as === "li" ? motion.li : motion.div) as React.ComponentType<
    HTMLMotionProps<"div">
  >;

  return (
    <MotionTag
      className={cn(className, REDUCED_MOTION_VISIBLE)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
}
