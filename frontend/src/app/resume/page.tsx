import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Resume — Niramay Kelkar",
  description: "Niramay Kelkar's resume.",
};

export default function ResumePage() {
  return (
    <Container as="section">
      <h1 className="font-display text-3xl tracking-tight">Resume</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        An embedded, downloadable resume is coming soon.
      </p>
    </Container>
  );
}
