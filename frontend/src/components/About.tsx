import { EDUCATION, SKILLS, SUMMARY } from "@/lib/content";
import Container from "@/components/Container";

export default function About() {
  return (
    <Container as="section" id="about">
      <h2 className="font-display text-2xl tracking-tight">About</h2>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        {SUMMARY}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-muted-foreground">
              {category}
            </h3>
            <p className="mt-1 text-sm leading-6">{items.join(", ")}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 text-sm font-medium text-muted-foreground">
        Education
      </h3>
      <ul className="mt-2 space-y-2">
        {EDUCATION.map((entry) => (
          <li key={entry.degree} className="text-sm leading-6">
            <span className="font-medium">{entry.degree}</span> —{" "}
            {entry.school}, {entry.location}{" "}
            <span className="text-muted-foreground">({entry.dates})</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
