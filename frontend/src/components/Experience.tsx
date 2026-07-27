import { EXPERIENCE } from "@/lib/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-3xl border-t border-black/10 px-6 py-16 dark:border-white/10"
    >
      <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
      <div className="mt-8 space-y-10">
        {EXPERIENCE.map((entry) => (
          <div key={`${entry.company}-${entry.dates}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-medium">
                {entry.role} · {entry.company}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                {entry.dates}
              </p>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              {entry.location}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {entry.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
