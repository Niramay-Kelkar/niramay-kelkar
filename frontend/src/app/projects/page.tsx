import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Niramay Kelkar",
  description: "A full look at Niramay Kelkar's projects.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        The full project grid is coming soon — for now, see the featured work
        on the home page.
      </p>
    </section>
  );
}
