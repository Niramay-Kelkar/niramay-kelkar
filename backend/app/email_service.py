import html

import httpx
from fastapi import HTTPException

from app.config import Settings

RESEND_API_URL = "https://api.resend.com/emails"


async def send_contact_email(settings: Settings, name: str, email: str, message: str) -> None:
    if not settings.resend_api_key or not settings.contact_to_email:
        raise HTTPException(
            status_code=503,
            detail=(
                "Email is not configured on the server. Set RESEND_API_KEY and "
                "CONTACT_TO_EMAIL in the backend environment."
            ),
        )

    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_message = html.escape(message).replace("\n", "<br>")

    payload = {
        "from": f"Portfolio Contact Form <{settings.contact_from_email}>",
        "to": [settings.contact_to_email],
        "reply_to": email,
        "subject": f"New portfolio message from {name}",
        "html": (
            f"<p><strong>Name:</strong> {safe_name}</p>"
            f"<p><strong>Email:</strong> {safe_email}</p>"
            f"<p><strong>Message:</strong></p><p>{safe_message}</p>"
        ),
    }

    async with httpx.AsyncClient(timeout=10) as client:
        try:
            response = await client.post(
                RESEND_API_URL,
                json=payload,
                headers={"Authorization": f"Bearer {settings.resend_api_key}"},
            )
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail="Could not reach the email provider.") from exc

    if response.status_code >= 400:
        raise HTTPException(
            status_code=502,
            detail=f"Email provider rejected the request: {response.text}",
        )
