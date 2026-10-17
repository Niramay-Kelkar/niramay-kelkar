"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export default function CountUp({
  value,
  duration = 1.2,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (shouldReduceMotion || !inView) {
      node.textContent = value.toLocaleString();
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        node.textContent = Math.round(latest).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [value, duration, shouldReduceMotion, inView]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}
