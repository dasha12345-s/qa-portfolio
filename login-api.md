# API/Contract — Login

## Endpoints
- POST /api/auth/login { email, password, rememberMe? }
- POST /api/auth/logout
- GET  /api/auth/me

## Expectations
- Success: 200/302, secure session cookie (HttpOnly, Secure, SameSite=Lax) or approved token model.
- Invalid creds: 401/403, generic message (no email enumeration).
- Locked/rate-limited: 423/429 (or business error payload).
- CSRF required for cookie flows; correct CORS/cache headers.

## Test Cases
- API-01 Success → 200/302, session set, no PII in body.
- API-02 Invalid creds → 401/403, stable schema/message.
- API-03 Locked user → 423/blocked; no auth issued.
- API-04 No server call for client-invalid input (assert from UI tests or component level).
