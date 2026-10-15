import Image from "next/image";
import Container from "@/components/Container";

export default function Hero() {
  return (
    <Container
      as="section"
      id="top"
      className="flex flex-col-reverse items-center gap-10 pt-20 sm:flex-row sm:items-center"
    >
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">
          San Jose, CA
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          Niramay Kelkar
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
          Backend &amp; full-stack software engineer. I build reliable APIs,
          microservices, and data backends — and increasingly, the frontends
          and tooling around them.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
          <a
            href="#projects"
            className="rounded-full bg-accent px-5 py-3 text-accent-foreground transition-opacity hover:opacity-90"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-5 py-3 transition-colors hover:bg-foreground/[.04]"
          >
            Get in touch
          </a>
        </div>
      </div>
      <Image
        src="/headshot.png"
        alt="Niramay Kelkar"
        width={160}
        height={160}
        priority
        className="h-40 w-40 shrink-0 rounded-full object-cover"
      />
    </Container>
  );
}
