import time

import httpx
from fastapi import APIRouter, Depends, HTTPException

from app.config import Settings, get_settings
from app.models import GithubProject, GithubProjectsResponse

router = APIRouter()

_CACHE_TTL_SECONDS = 600  # 10 minutes — keeps us well under GitHub's rate limit
_MAX_PROJECTS = 4
_cache: dict[str, tuple[float, list[GithubProject]]] = {}


async def _fetch_from_github(settings: Settings) -> list[GithubProject]:
    headers = {"Accept": "application/vnd.github+json"}
    if settings.github_token:
        headers["Authorization"] = f"Bearer {settings.github_token}"

    url = f"https://api.github.com/users/{settings.github_username}/repos"
    params = {"sort": "updated", "direction": "desc", "per_page": 100, "type": "owner"}

    async with httpx.AsyncClient(timeout=10) as client:
        try:
            response = await client.get(url, headers=headers, params=params)
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail="Could not reach the GitHub API.") from exc

    if response.status_code == 404:
        raise HTTPException(status_code=404, detail=f"GitHub user '{settings.github_username}' not found.")
    if response.status_code >= 400:
        raise HTTPException(status_code=502, detail=f"GitHub API error: {response.text}")

    repos = response.json()

    # Skip forks and the special "username/username" profile-README repo.
    projects = [
        GithubProject(
            name=repo["name"],
            description=repo.get("description"),
            html_url=repo["html_url"],
            language=repo.get("language"),
            stargazers_count=repo.get("stargazers_count", 0),
            forks_count=repo.get("forks_count", 0),
            updated_at=repo["updated_at"],
            topics=repo.get("topics", []) or [],
            homepage=repo.get("homepage") or None,
            is_fork=repo.get("fork", False),
        )
        for repo in repos
        if not repo.get("fork") and repo["name"].lower() != settings.github_username.lower()
    ]

    projects.sort(key=lambda p: p.updated_at, reverse=True)
    return projects[:_MAX_PROJECTS]


@router.get("/api/github-projects", response_model=GithubProjectsResponse)
async def github_projects(settings: Settings = Depends(get_settings)) -> GithubProjectsResponse:
    if not settings.github_username:
        raise HTTPException(
            status_code=503,
            detail="GITHUB_USERNAME is not configured on the server.",
        )

    cache_key = settings.github_username
    cached = _cache.get(cache_key)
    now = time.monotonic()
    if cached and now - cached[0] < _CACHE_TTL_SECONDS:
        return GithubProjectsResponse(projects=cached[1])

    projects = await _fetch_from_github(settings)
    _cache[cache_key] = (now, projects)
    return GithubProjectsResponse(projects=projects)
