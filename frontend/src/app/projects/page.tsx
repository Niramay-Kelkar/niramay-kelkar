import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Projects — Niramay Kelkar",
  description: "A full look at Niramay Kelkar's projects.",
};

export default function ProjectsPage() {
  return (
    <Container as="section">
      <h1 className="font-display text-3xl tracking-tight">Projects</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">
        The full project grid is coming soon — for now, see the featured work
        on the home page.
      </p>
    </Container>
  );
}
