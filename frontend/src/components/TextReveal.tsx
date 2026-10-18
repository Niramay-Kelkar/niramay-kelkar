"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType } from "react";

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type TextRevealTagName = keyof typeof MOTION_TAGS;

type TextRevealOwnProps<T extends TextRevealTagName> = {
  children: string;
  className?: string;
  delay?: number;
  trigger?: "view" | "mount";
  as?: T;
};

type TextRevealProps<T extends TextRevealTagName> = TextRevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextRevealOwnProps<T>>;

const wordVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
};

// Animates plain-text headings in word-by-word, each word clipped by an
// overflow-hidden wrapper so it slides up into place rather than fading
// as a block — used for section/hero headings only, not body copy.
export default function TextReveal<T extends TextRevealTagName = "h2">({
  children,
  className,
  delay = 0,
  trigger = "view",
  as,
  ...rest
}: TextRevealProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const tagName = (as ?? "h2") as TextRevealTagName;

  if (shouldReduceMotion) {
    const Tag = tagName as ElementType;
    return (
      <Tag className={className} {...(rest as Record<string, unknown>)}>
        {children}
      </Tag>
    );
  }

  const words = children.split(" ");
  const MotionTag = MOTION_TAGS[tagName];

  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" }
      : {
          whileInView: "visible",
          viewport: { once: true, margin: "-80px" },
        };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      transition={{ staggerChildren: 0.04, delayChildren: delay }}
      {...triggerProps}
      {...(rest as Record<string, unknown>)}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
