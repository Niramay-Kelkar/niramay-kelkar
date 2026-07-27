import { EDUCATION, SKILLS, SUMMARY } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-2xl font-semibold tracking-tight">About</h2>
      <p className="mt-4 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
        {SUMMARY}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-500">
              {category}
            </h3>
            <p className="mt-1 text-sm leading-6">{items.join(", ")}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 text-sm font-medium text-zinc-500 dark:text-zinc-500">
        Education
      </h3>
      <ul className="mt-2 space-y-2">
        {EDUCATION.map((entry) => (
          <li key={entry.degree} className="text-sm leading-6">
            <span className="font-medium">{entry.degree}</span> —{" "}
            {entry.school}, {entry.location}{" "}
            <span className="text-zinc-500 dark:text-zinc-500">
              ({entry.dates})
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
