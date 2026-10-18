import { API_BASE_URL, type GithubProject, type GithubProjectsResponse } from "@/lib/api";
import { FEATURED_PROJECT } from "@/lib/content";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import HoverLift from "@/components/HoverLift";

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
    <Container as="section" id="projects" className="border-t border-border">
      <TextReveal className="font-display text-2xl tracking-tight">
        Projects
      </TextReveal>

      <Reveal className="mt-8 rounded-2xl border border-border p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-medium">
            {FEATURED_PROJECT.name} · {FEATURED_PROJECT.tagline}
          </h3>
          <p className="text-sm text-muted-foreground">
            {FEATURED_PROJECT.dates}
          </p>
        </div>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
          {FEATURED_PROJECT.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <HoverLift
            as="a"
            href={FEATURED_PROJECT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            GitHub ↗
          </HoverLift>
          <HoverLift
            as="a"
            href={FEATURED_PROJECT.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            Live Demo ↗
          </HoverLift>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            as="a"
            delay={Math.min(i * 0.05, 0.2)}
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border p-5 transition-all hover:-translate-y-0.5 hover:border-accent"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-medium">{project.name}</h3>
              {project.stargazers_count > 0 && (
                <span className="text-xs text-muted-foreground">
                  ★ {project.stargazers_count}
                </span>
              )}
            </div>
            {project.description && (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
            )}
            {project.language && (
              <p className="mt-3 text-xs text-muted-foreground">
                {project.language}
              </p>
            )}
          </Reveal>
        ))}
      </div>

      {error && (
        <p className="mt-6 text-sm text-muted-foreground">{error}</p>
      )}
      {!error && projects.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No other public repos to show yet.
        </p>
      )}
    </Container>
  );
}
