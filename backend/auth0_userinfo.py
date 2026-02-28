"""Fetch Auth0 user profile from the userinfo endpoint using the access token."""
import httpx
from config import AUTH0_DOMAIN


async def get_userinfo(access_token: str) -> dict | None:
    """Call Auth0 /userinfo and return the user payload (sub, email, etc.) or None if invalid."""
    if not AUTH0_DOMAIN:
        return None
    url = f"https://{AUTH0_DOMAIN}/userinfo"
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            url,
            headers={"Authorization": f"Bearer {access_token}"},
            timeout=10.0,
        )
    if resp.status_code != 200:
        return None
    return resp.json()
