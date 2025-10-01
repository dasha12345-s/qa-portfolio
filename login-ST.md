**States**
- `LoggedOut` — No valid session/token.
- `MFA_Pending` — Primary auth passed; waiting for MFA.
- `RateLimited` — Temporarily blocked after too many failures.
- `Locked` — Account locked by policy/admin.
- `Unverified` — Email not verified.
- `PwdExpired` — Password expired; must reset.
- `LoggedIn` — Valid session / authenticated.

**Events**
- `submitCreds(email, password)`
- `submitMfa(code)`
- `verifyEmail()`
- `resetPassword(newPwd)`
- `cooldownElapsed()` (rate limit window over)
- `adminUnlock()` (ops clears lock)
- `timeout()` (session expiry/inactivity)
- `logout()`

**Common Guards**
- `[validFormat]`, `[correctCreds]`, `[mfaEnabled]`, `[attempts>=N]`, `[emailVerified]`, `[pwdExpired]`, `[codeValid]`

# State Transition Tests (ST) — Login Flow

| ID     | Path / Steps                                                   | Expected Results                                                                 |
|--------|----------------------------------------------------------------|---------------------------------------------------------------------------------|
| ST-01  | Login with valid creds, MFA off                                | Redirect to dashboard; session cookie/token set; user menu visible              |
| ST-02  | Login with valid creds, MFA on → enter valid MFA               | MFA prompt displayed → after valid code, redirect; session set                  |
| ST-02-NG | Same as ST-02 but enter invalid MFA twice                    | Generic MFA error; remains on MFA step; rate/lock not triggered                 |
| ST-03  | Submit wrong password N times                                  | On Nth attempt: rate-limit banner or CAPTCHA; further attempts blocked per policy|
| ST-04  | Try login with unverified account → click verification link → login again | “Verify” prompt shown → success confirmation → subsequent login works   |
| ST-05  | Login with expired password → reset → login                    | Forced reset page; after successful reset, must re-login; then success          |
| ST-06  | Submit invalid email format                                    | Inline validation error; focus moves to email; no auth request sent             |
| ST-07  | Stay idle until session timeout                                | Session invalidated; redirected to login; intended URL preserved for redirect   |
| ST-08  | Click logout from app header                                   | Session cleared; redirected to login; no access to authenticated pages via Back |
| ST-09  | Rate-limited → wait until cooldown → try again                 | Rate-limit lifted; can attempt login again                                      |
| ST-10  | Locked account → admin unlock → try again                      | Lock message first; after unlock, login is processed per credentials/MFA        |