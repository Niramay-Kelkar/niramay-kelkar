"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  a: motion.a,
} as const;

type MotionTagName = keyof typeof MOTION_TAGS;

type RevealOwnProps<T extends MotionTagName> = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  trigger?: "view" | "mount";
  as?: T;
};

type RevealProps<T extends MotionTagName> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export default function Reveal<T extends MotionTagName = "div">({
  children,
  className,
  delay = 0,
  y = 16,
  trigger = "view",
  as,
  ...rest
}: RevealProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const tagName = (as ?? "div") as MotionTagName;

  if (shouldReduceMotion) {
    const Tag = tagName as ElementType;
    return (
      <Tag className={className} {...(rest as Record<string, unknown>)}>
        {children}
      </Tag>
    );
  }

  const MotionTag = MOTION_TAGS[tagName] as ElementType;

  const triggerProps =
    trigger === "mount"
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
        };

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      {...triggerProps}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </MotionTag>
  );
}
