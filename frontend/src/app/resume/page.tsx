import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import ResumeViewer from "@/components/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume — Niramay Kelkar",
  description: "Niramay Kelkar's resume.",
};

export default function ResumePage() {
  return (
    <Container as="section">
      <h1 className="font-display text-3xl tracking-tight">Resume</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        Available in two versions — tailored for different roles.
      </p>
      <Suspense fallback={null}>
        <ResumeViewer />
      </Suspense>
    </Container>
  );
}
