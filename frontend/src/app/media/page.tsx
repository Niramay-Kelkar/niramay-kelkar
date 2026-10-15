import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Media — Niramay Kelkar",
  description: "Media and talks featuring Niramay Kelkar.",
};

export default function MediaPage() {
  return (
    <Container as="section">
      <h1 className="font-display text-3xl tracking-tight">Media</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        Talks, interviews, and other media are coming soon.
      </p>
    </Container>
  );
}
