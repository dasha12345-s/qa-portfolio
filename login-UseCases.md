Use Cases (UC) — Login Flow

| ID     | Use Case Description                                                                 | Expected System Behavior                                                                 |
|--------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| UC-01  | **Happy path**: User enters valid credentials (with or without MFA). “Remember me” checked. | Redirect to dashboard; session cookie/token created; “Remember me” persists session. |
| UC-02  | **Wrong password**: User enters incorrect password.                                   | Show generic error: *“Invalid email or password”*. After N failed attempts → show CAPTCHA / apply rate-limit. |
| UC-03  | **Locked account**: User tries to log in but account is locked.                       | Show “Your account is locked. Contact support” with link to support page.                 |
| UC-04  | **Unverified account**: User hasn’t verified their email.                             | Show “Please verify your email” message; provide option to resend verification email.     |
| UC-05  | **Password expired**: User attempts login with expired password.                      | Force redirect to password reset flow; after reset → must re-login with new credentials.  |
| UC-06  | **Forgot password**: User clicks “Forgot password”.                                   | System sends reset email with secure token → user sets new password → can log in again.  |
| UC-07  | **SSO present (if in scope)**: Application supports SSO (Google, Okta, etc.).         | Redirect to Identity Provider (IdP) for login; handle success or error return gracefully. |