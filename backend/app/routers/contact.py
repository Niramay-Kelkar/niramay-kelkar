import logging

from fastapi import APIRouter, Depends, HTTPException

from app.config import Settings, get_settings
from app.db import session_factory
from app.db_models import ContactSubmission
from app.email_service import send_contact_email
from app.models import ContactRequest, ContactResponse

logger = logging.getLogger(__name__)

router = APIRouter()


async def _save_submission(name: str, email: str, message: str) -> None:
    """Best-effort backup log. A DB hiccup should never block the contact form."""
    factory = session_factory()
    if factory is None:
        return
    try:
        async with factory() as session:
            session.add(ContactSubmission(name=name, email=email, message=message))
            await session.commit()
    except Exception:
        logger.exception("Failed to save contact submission to the database.")


@router.post("/api/contact", response_model=ContactResponse)
async def contact(payload: ContactRequest, settings: Settings = Depends(get_settings)) -> ContactResponse:
    # Honeypot: if this hidden field got filled in, silently pretend success
    # so bots don't learn to look for a different signal, but don't send mail
    # or save it — no point backing up spam.
    if payload.company:
        return ContactResponse(success=True, detail="Message sent.")

    if not payload.message.strip():
        raise HTTPException(status_code=422, detail="Message cannot be empty.")

    name, email, message = payload.name.strip(), payload.email, payload.message.strip()
    await _save_submission(name, email, message)
    await send_contact_email(settings, name, email, message)
    return ContactResponse(success=True, detail="Message sent.")
