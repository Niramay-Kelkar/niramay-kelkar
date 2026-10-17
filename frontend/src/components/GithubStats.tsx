import {
  API_BASE_URL,
  type ContributionWeek,
  type GithubStats as GithubStatsData,
  type GithubStatsResponse,
} from "@/lib/api";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const GITHUB_USERNAME = "Niramay-Kelkar";
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

async function getGithubStats(): Promise<{
  stats: GithubStatsData | null;
  error: string | null;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/github-stats`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) {
      return { stats: null, error: `GitHub stats unavailable (${res.status}).` };
    }
    const data: GithubStatsResponse = await res.json();
    return { stats: data.stats, error: null };
  } catch {
    return { stats: null, error: "Could not reach the stats API." };
  }
}

function levelBackground(level: number): string {
  if (level <= 0) return "var(--border)";
  const opacity = [0, 0.3, 0.55, 0.8, 1][level] ?? 1;
  return `color-mix(in srgb, var(--accent) ${opacity * 100}%, transparent)`;
}

function ContributionHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const total = weeks.reduce(
    (sum, week) => sum + week.days.reduce((s, day) => s + day.count, 0),
    0
  );

  return (
    <div
      role="img"
      aria-label={`${total.toLocaleString()} GitHub contributions in the last year`}
      className="flex gap-[3px] overflow-x-auto pb-1"
    >
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-rows-7 gap-[3px]" aria-hidden="true">
          {week.days.map((day) => (
            <div
              key={day.date}
              title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
              className="h-[10px] w-[10px] rounded-[2px]"
              style={{ background: levelBackground(day.level) }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default async function GithubStats() {
  const { stats, error } = await getGithubStats();

  const numberStats = stats
    ? [
        { label: "Public repos", value: stats.public_repos },
        { label: "Total stars", value: stats.total_stars },
        { label: "Followers", value: stats.followers },
      ].filter((stat): stat is { label: string; value: number } => stat.value !== null)
    : [];

  const hasNothing = !error && numberStats.length === 0 && !stats?.contribution_weeks;

  return (
    <Container as="section" id="github-stats" className="border-t border-border">
      <Reveal>
        <h2 className="font-display text-2xl tracking-tight">GitHub Activity</h2>
      </Reveal>

      {numberStats.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-4">
          {numberStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={Math.min(i * 0.06, 0.18)}
              className="min-w-[140px] flex-1 rounded-2xl border border-border p-6 text-center"
            >
              <p className="font-display text-3xl tracking-tight text-accent">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      )}

      {stats?.contribution_weeks && (
        <Reveal
          delay={0.1}
          className="mt-6 rounded-2xl border border-border p-6"
        >
          <p className="mb-4 text-sm text-muted-foreground">
            Contributions in the last year
          </p>
          <ContributionHeatmap weeks={stats.contribution_weeks} />
        </Reveal>
      )}

      {(error || hasNothing) && (
        <Reveal className="mt-8 text-sm text-muted-foreground">
          Couldn&apos;t load live GitHub stats right now —{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-medium text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            view on GitHub ↗
          </a>
        </Reveal>
      )}
    </Container>
  );
}
