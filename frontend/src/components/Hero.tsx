import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

export default function Hero() {
  return (
    <Container
      as="section"
      id="top"
      className="flex flex-col-reverse items-center gap-10 pt-20 sm:flex-row sm:items-center"
    >
      <div className="flex-1">
        <Reveal trigger="mount">
          <p className="text-sm font-medium text-muted-foreground">
            San Jose, CA
          </p>
        </Reveal>
        <TextReveal
          as="h1"
          trigger="mount"
          delay={0.08}
          className="mt-2 font-display text-4xl tracking-tight sm:text-5xl"
        >
          Niramay Kelkar
        </TextReveal>
        <Reveal trigger="mount" delay={0.16}>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            Backend &amp; full-stack software engineer. I build reliable
            APIs, microservices, and data backends — and increasingly, the
            frontends and tooling around them.
          </p>
        </Reveal>
        <Reveal trigger="mount" delay={0.24}>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
            <a
              href="#projects"
              className="rounded-full bg-accent px-5 py-3 text-accent-foreground transition-all hover:scale-[1.03] hover:opacity-90 active:scale-[0.97]"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-5 py-3 transition-all hover:scale-[1.03] hover:bg-foreground/[.04] active:scale-[0.97]"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal trigger="mount" delay={0.1} y={0}>
        <Image
          src="/headshot.png"
          alt="Niramay Kelkar"
          width={160}
          height={160}
          priority
          className="h-40 w-40 shrink-0 rounded-full object-cover"
        />
      </Reveal>
    </Container>
  );
}
