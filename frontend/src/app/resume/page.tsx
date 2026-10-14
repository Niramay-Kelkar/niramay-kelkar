import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Niramay Kelkar",
  description: "Niramay Kelkar's resume.",
};

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        An embedded, downloadable resume is coming soon.
      </p>
    </section>
  );
}
