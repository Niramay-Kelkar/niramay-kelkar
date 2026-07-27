import { API_BASE_URL, type GithubProject, type GithubProjectsResponse } from "@/lib/api";
import { FEATURED_PROJECT } from "@/lib/content";

async function getGithubProjects(): Promise<{
  projects: GithubProject[];
  error: string | null;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/github-projects`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) {
      return { projects: [], error: `GitHub projects unavailable (${res.status}).` };
    }
    const data: GithubProjectsResponse = await res.json();
    return {
      projects: data.projects.filter(
        (p) => p.name.toLowerCase() !== FEATURED_PROJECT.name.toLowerCase()
      ),
      error: null,
    };
  } catch {
    return { projects: [], error: "Could not reach the projects API." };
  }
}

export default async function Projects() {
  const { projects, error } = await getGithubProjects();

  return (
    <section
      id="projects"
      className="mx-auto max-w-3xl border-t border-black/10 px-6 py-16 dark:border-white/10"
    >
      <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>

      <a
        href={FEATURED_PROJECT.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block rounded-2xl border border-black/10 p-6 transition-colors hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-medium">
            {FEATURED_PROJECT.name} · {FEATURED_PROJECT.tagline}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            {FEATURED_PROJECT.dates}
          </p>
        </div>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {FEATURED_PROJECT.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </a>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-black/10 p-5 transition-colors hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-medium">{project.name}</h3>
              {project.stargazers_count > 0 && (
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  ★ {project.stargazers_count}
                </span>
              )}
            </div>
            {project.description && (
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            )}
            {project.language && (
              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                {project.language}
              </p>
            )}
          </a>
        ))}
      </div>

      {error && (
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
          {error}
        </p>
      )}
      {!error && projects.length === 0 && (
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
          No other public repos to show yet.
        </p>
      )}
    </section>
  );
}
