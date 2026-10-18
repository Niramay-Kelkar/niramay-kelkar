"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const MOTION_TAGS = {
  span: motion.span,
  a: motion.a,
} as const;

type HoverLiftTagName = keyof typeof MOTION_TAGS;

type HoverLiftOwnProps<T extends HoverLiftTagName> = {
  children: ReactNode;
  className?: string;
  as?: T;
};

type HoverLiftProps<T extends HoverLiftTagName> = HoverLiftOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof HoverLiftOwnProps<T>>;

// A restrained few-px lift on hover for primary interactive elements —
// an upgrade on top of existing color/underline hover states, not a
// replacement for them. A no-op for prefers-reduced-motion.
export default function HoverLift<T extends HoverLiftTagName = "span">({
  children,
  className,
  as,
  ...rest
}: HoverLiftProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const tagName = (as ?? "span") as HoverLiftTagName;

  if (shouldReduceMotion) {
    const Tag = tagName as ElementType;
    return (
      <Tag className={className} {...(rest as Record<string, unknown>)}>
        {children}
      </Tag>
    );
  }

  const MotionTag = MOTION_TAGS[tagName];

  return (
    <MotionTag
      className={className}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </MotionTag>
  );
}
