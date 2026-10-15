import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Writing — Niramay Kelkar",
  description: "Writing by Niramay Kelkar.",
};

export default function WritingPage() {
  return (
    <Container as="section">
      <h1 className="font-display text-3xl tracking-tight">Writing</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        Articles and notes are coming soon.
      </p>
    </Container>
  );
}
