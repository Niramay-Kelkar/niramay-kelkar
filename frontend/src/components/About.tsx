import { EDUCATION, SKILLS, SUMMARY } from "@/lib/content";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

export default function About() {
  return (
    <Container as="section" id="about" className="border-t border-border">
      <TextReveal className="font-display text-2xl tracking-tight">
        About
      </TextReveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          {SUMMARY}
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.entries(SKILLS).map(([category, items], i) => (
          <Reveal key={category} delay={Math.min(i * 0.06, 0.24)}>
            <h3 className="text-sm font-medium text-muted-foreground">
              {category}
            </h3>
            <p className="mt-1 text-sm leading-6">{items.join(", ")}</p>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-10 text-sm font-medium text-muted-foreground">
          Education
        </h3>
      </Reveal>
      <ul className="mt-2 space-y-2">
        {EDUCATION.map((entry, i) => (
          <Reveal
            key={entry.degree}
            as="li"
            delay={Math.min(i * 0.06, 0.24)}
            className="text-sm leading-6"
          >
            <span className="font-medium">{entry.degree}</span> —{" "}
            {entry.school}, {entry.location}{" "}
            <span className="text-muted-foreground">({entry.dates})</span>
          </Reveal>
        ))}
      </ul>
    </Container>
  );
}
