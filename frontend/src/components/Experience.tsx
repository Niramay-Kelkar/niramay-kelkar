import { EXPERIENCE } from "@/lib/content";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Experience() {
  return (
    <Container as="section" id="experience" className="border-t border-border">
      <Reveal>
        <h2 className="font-display text-2xl tracking-tight">Experience</h2>
      </Reveal>
      <div className="mt-8 space-y-10">
        {EXPERIENCE.map((entry) => (
          <Reveal key={`${entry.company}-${entry.dates}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-medium">
                {entry.role} · {entry.company}
              </h3>
              <p className="text-sm text-muted-foreground">{entry.dates}</p>
            </div>
            <p className="text-sm text-muted-foreground">{entry.location}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {entry.bullets.map((bullet, i) => (
                <Reveal
                  key={i}
                  as="li"
                  delay={Math.min(i * 0.05, 0.2)}
                  y={8}
                >
                  {bullet}
                </Reveal>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
