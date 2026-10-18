import type { Metadata } from "next";
import { Suspense } from "react";
import ResumeViewer from "@/components/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume — Niramay Kelkar",
  description: "Niramay Kelkar's resume.",
};

// Wider than the site's usual Container (max-w-3xl) — the PDF preview below
// needs room to read comfortably, closer to a real PDF viewer's width.
export default function ResumePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl tracking-tight">Resume</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Available in two versions — tailored for different roles.
        </p>
      </div>
      <Suspense fallback={null}>
        <ResumeViewer />
      </Suspense>
    </section>
  );
}
