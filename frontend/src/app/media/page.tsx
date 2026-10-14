import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media — Niramay Kelkar",
  description: "Media and talks featuring Niramay Kelkar.",
};

export default function MediaPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Media</h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Talks, interviews, and other media are coming soon.
      </p>
    </section>
  );
}
