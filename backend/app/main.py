from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.db import init_db
from app.routers import contact, github_projects, github_stats

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Portfolio API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(contact.router)
app.include_router(github_projects.router)
app.include_router(github_stats.router)


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
