import time

import httpx
from fastapi import APIRouter, Depends

from app.config import Settings, get_settings
from app.models import ContributionDay, ContributionWeek, GithubStats, GithubStatsResponse

router = APIRouter()

_CACHE_TTL_SECONDS = 600  # matches github_projects' cache window
_cache: dict[str, tuple[float, GithubStats]] = {}

_GRAPHQL_QUERY = """
query($login: String!) {
  user(login: $login) {
    followers {
      totalCount
    }
    repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
      totalCount
      nodes {
        stargazerCount
      }
    }
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
"""


def _bucket_level(count: int, max_count: int) -> int:
    if count == 0 or max_count == 0:
        return 0
    ratio = count / max_count
    if ratio <= 0.25:
        return 1
    if ratio <= 0.5:
        return 2
    if ratio <= 0.75:
        return 3
    return 4


def _build_contribution_weeks(raw_weeks: list[dict]) -> list[ContributionWeek]:
    all_days = [day for week in raw_weeks for day in week["contributionDays"]]
    max_count = max((day["contributionCount"] for day in all_days), default=0)

    return [
        ContributionWeek(
            days=[
                ContributionDay(
                    date=day["date"],
                    count=day["contributionCount"],
                    level=_bucket_level(day["contributionCount"], max_count),
                )
                for day in week["contributionDays"]
            ]
        )
        for week in raw_weeks
    ]


async def _fetch_via_graphql(settings: Settings) -> GithubStats:
    headers = {"Authorization": f"Bearer {settings.github_token}"}
    body = {"query": _GRAPHQL_QUERY, "variables": {"login": settings.github_username}}

    async with httpx.AsyncClient(timeout=10) as client:
        try:
            response = await client.post(
                "https://api.github.com/graphql", json=body, headers=headers
            )
        except httpx.RequestError:
            return await _fetch_via_rest(settings)

    if response.status_code >= 400:
        return await _fetch_via_rest(settings)

    data = response.json().get("data") or {}
    user = data.get("user")
    if user is None:
        return await _fetch_via_rest(settings)

    repositories = user.get("repositories") or {}
    repo_nodes = repositories.get("nodes") or []
    calendar = (
        (user.get("contributionsCollection") or {}).get("contributionCalendar") or {}
    )
    raw_weeks = calendar.get("weeks")

    return GithubStats(
        public_repos=repositories.get("totalCount"),
        total_stars=sum(repo.get("stargazerCount", 0) for repo in repo_nodes),
        followers=(user.get("followers") or {}).get("totalCount"),
        contribution_weeks=_build_contribution_weeks(raw_weeks) if raw_weeks else None,
    )


async def _fetch_via_rest(settings: Settings) -> GithubStats:
    headers = {"Accept": "application/vnd.github+json"}
    if settings.github_token:
        headers["Authorization"] = f"Bearer {settings.github_token}"

    async with httpx.AsyncClient(timeout=10) as client:
        try:
            response = await client.get(
                f"https://api.github.com/users/{settings.github_username}", headers=headers
            )
        except httpx.RequestError:
            return GithubStats()

    if response.status_code >= 400:
        return GithubStats()

    user = response.json()
    return GithubStats(
        public_repos=user.get("public_repos"),
        followers=user.get("followers"),
    )


@router.get("/api/github-stats", response_model=GithubStatsResponse)
async def github_stats(settings: Settings = Depends(get_settings)) -> GithubStatsResponse:
    if not settings.github_username:
        return GithubStatsResponse(stats=GithubStats())

    cache_key = settings.github_username
    cached = _cache.get(cache_key)
    now = time.monotonic()
    if cached and now - cached[0] < _CACHE_TTL_SECONDS:
        return GithubStatsResponse(stats=cached[1])

    # The contribution calendar is GraphQL-only, and GraphQL requires auth
    # even for public data — so only attempt it when a token is configured.
    # Otherwise fall back to the unauthenticated REST endpoint for the
    # numbers that are available without a token.
    stats = (
        await _fetch_via_graphql(settings)
        if settings.github_token
        else await _fetch_via_rest(settings)
    )
    _cache[cache_key] = (now, stats)
    return GithubStatsResponse(stats=stats)
