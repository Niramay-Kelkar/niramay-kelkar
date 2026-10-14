import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trophy Wall — Niramay Kelkar",
  description: "Niramay Kelkar's Trophy Wall of wins and milestones.",
};

export default function TrophyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Trophy Wall</h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Building this out as new work ships — check back soon.
      </p>
    </section>
  );
}
