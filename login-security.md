# Security — Login

- BRUTE-01 Rate limit/brute force: repeated wrong logins → throttle/CAPTCHA.
- ENUM-01 No user/email enumeration (same error for wrong email vs wrong password).
- SQLi payload in email/password → sanitized, no bypass.
- XSS-01 Reflected XSS blocked (escape output, CSP). (script injections)
- HTTPS-01 HTTPS/HSTS enforced; secure flags on cookies.
- LOG-01 Passwords/tokens never logged client/server (as observable). (Password is masked in browser console, network and storage)
