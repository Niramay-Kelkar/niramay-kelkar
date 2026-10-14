import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing — Niramay Kelkar",
  description: "Writing by Niramay Kelkar.",
};

export default function WritingPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Articles and notes are coming soon.
      </p>
    </section>
  );
}
