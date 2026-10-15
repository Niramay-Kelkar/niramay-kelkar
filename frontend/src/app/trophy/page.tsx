import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Trophy Wall — Niramay Kelkar",
  description: "Niramay Kelkar's Trophy Wall of wins and milestones.",
};

export default function TrophyPage() {
  return (
    <Container as="section">
      <h1 className="font-display text-3xl tracking-tight">Trophy Wall</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        Building this out as new work ships — check back soon.
      </p>
    </Container>
  );
}
