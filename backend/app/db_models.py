from datetime import datetime, timezone

from sqlalchemy import Column, DateTime
from sqlmodel import Field, SQLModel


class ContactSubmission(SQLModel, table=True):
    """Backup log of contact-form messages, saved alongside the email send.

    Not read by any endpoint yet — query it directly via Supabase's table
    editor if you need to look up a message.
    """

    id: int | None = Field(default=None, primary_key=True)
    name: str
    email: str
    message: str
    # sa_column is required here: SQLModel's default mapping for `datetime`
    # is a timezone-naive TIMESTAMP column, but default_factory below produces
    # timezone-aware UTC values — asyncpg rejects writing those into a naive
    # column, so the column type must be forced to TIMESTAMPTZ explicitly.
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )
