from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Values are read from environment variables / a local .env file.

    See .env.example for the full list and what each one does.
    """

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # --- Resend (contact form email) ---
    resend_api_key: str = ""
    contact_to_email: str = ""
    contact_from_email: str = "onboarding@resend.dev"

    # --- GitHub (work samples) ---
    github_username: str = ""
    github_token: str = ""

    # --- Database (contact submission backup log) ---
    # Empty by default: the app runs fine without it, it just won't save a
    # copy of contact-form messages. See .env.example for the Supabase setup.
    database_url: str = ""

    # --- CORS ---
    # Comma-separated list of origins allowed to call this API,
    # e.g. "http://localhost:3000,https://your-app.vercel.app"
    allowed_origins: str = "http://localhost:3000"

    @property
    def allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
