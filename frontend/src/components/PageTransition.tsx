"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// A fast cross-fade between routes. `popLayout` lets the entering page
// take its place immediately instead of waiting for the outgoing page's
// exit animation, so navigation never feels slower than a hard swap.
// Only the pathname (not search params or hash) keys the transition, so
// anchor-link and variant-query navigation within the same route don't
// retrigger it.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // The outgoing <main className="flex-1"> (or equivalent) relies on this
  // wrapper being a flex item that itself stretches, so the footer still
  // pins to the bottom of short pages the way it did before this wrapper
  // existed.
  if (shouldReduceMotion) {
    return <div className="flex flex-1 flex-col">{children}</div>;
  }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        className="flex flex-1 flex-col"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
