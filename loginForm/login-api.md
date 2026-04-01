# API/Contract — Login

## Endpoints
- POST /api/auth/login { email, password, rememberMe? }
- POST /api/auth/logout
- GET  /api/auth/me

## Expectations
- Success: 200/302, secure session cookie.
- Invalid creds: 401/403, generic message.
- Locked/rate-limited: 423/429 (error payload).
- CSRF required for cookie flows; correct CORS/cache headers.

## Test Cases
- API-01 Success → 200/302.
- API-02 Invalid creds → 401/403, stable schema/message.
- API-03 Locked user → 423/blocked.
