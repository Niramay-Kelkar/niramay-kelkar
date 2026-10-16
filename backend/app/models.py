from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)
    # Honeypot field: real users never fill this in (it's hidden via CSS on
    # the frontend). Bots that auto-fill every field will trip it.
    company: str = Field(default="", max_length=200)


class ContactResponse(BaseModel):
    success: bool
    detail: str


class GithubProject(BaseModel):
    name: str
    description: str | None
    html_url: str
    language: str | None
    stargazers_count: int
    forks_count: int
    updated_at: str
    topics: list[str] = []
    homepage: str | None = None
    is_fork: bool = False


class GithubProjectsResponse(BaseModel):
    projects: list[GithubProject]


class ContributionDay(BaseModel):
    date: str
    count: int
    # 0-4 relative intensity bucket (computed server-side from the day's
    # count vs. the max count in the window), mirroring GitHub's own heatmap.
    level: int


class ContributionWeek(BaseModel):
    days: list[ContributionDay]


class GithubStats(BaseModel):
    # Each field is independently optional so the frontend can render
    # whatever came back and skip the rest, rather than failing all-or-nothing.
    public_repos: int | None = None
    total_stars: int | None = None
    followers: int | None = None
    contribution_weeks: list[ContributionWeek] | None = None


class GithubStatsResponse(BaseModel):
    stats: GithubStats
