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
