# State Transition Tests (ST) — Login Flow

## Legend
- **States** are rounded boxes; **Events** trigger transitions; **Guards** are conditions; **Actions** are effects.
- Notation: `STATE ──(event [guard] / action)──> NEXT_STATE`

---

## 1) State Model

### States
- `LoggedOut` — No valid session/token
- `RateLimited` — Temporarily blocked after too many failures
- `MFA_Pending` — Primary auth passed; waiting for MFA
- `LoggedIn` — Valid session/token, user authenticated
- `Locked` — Account administratively locked (terminal until unlocked)
- `PasswordExpired` — Must reset password before continuing
- `Unverified` — Email not verified; must verify first

### Events
- `submitCreds(email, password)`
- `submitMfa(code)`
- `verifyEmail()`
- `resetPassword(newPwd)`
- `timeout()` (session expiry/inactivity)
- `logout()`
- `windowElapsed()` (rate-limit cooldown reached)
- `adminUnlock()` (account unlocked by ops/support)

### Guards (examples)
- `[validFormat]`, `[correctCreds]`, `[attemptsExceeded]`, `[mfaEnabled]`, `[emailVerified]`, `[pwdExpired]`, `[accountLocked]`

---

## 2) Transitions (Rules)

| ID  | From State      | Event                 | Guard(s)                                                             | Action / Message                                 | To State        |
|-----|------------------|-----------------------|----------------------------------------------------------------------|--------------------------------------------------|-----------------|
| T01 | LoggedOut        | submitCreds           | !validFormat                     | Show field error                                 | LoggedOut       |
| T02 | LoggedOut        | submitCreds           | validFormat && accountLocked     | Show "Account locked"                            | Locked          |
| T03 | LoggedOut        | submitCreds           | validFormat && attemptsExceeded  | Show CAPTCHA / "Too many attempts"               | RateLimited     |
| T04 | LoggedOut        | submitCreds           | validFormat && !emailVerified    | Show "Verify email" + resend link                | Unverified      |
| T05 | LoggedOut        | submitCreds           | validFormat && pwdExpired        | Force password reset                             | PasswordExpired |
| T06 | LoggedOut        | submitCreds           | validFormat && !correctCreds     | Show generic error                               | LoggedOut       |
| T07 | LoggedOut        | submitCreds           | validFormat && correctCreds && mfaEnabled | Prompt MFA                              | MFA_Pending     |
| T08 | LoggedOut        | submitCreds           | validFormat && correctCreds && !mfaEnabled | Issue session, redirect                  | LoggedIn        |
| T09 | MFA_Pending      | submitMfa             | codeValid                        | Issue session, redirect                          | LoggedIn        |
| T10 | MFA_Pending      | submitMfa             | !codeValid                       | Show MFA error (do not enumerate)                | MFA_Pending     |
| T11 | Unverified       | verifyEmail           | linkValid                        | Success message                                  | LoggedOut       |
| T12 | PasswordExpired  | resetPassword         | policyPass                       | Success message                                  | LoggedOut       |
| T13 | RateLimited      | windowElapsed         | cooldownReached                  | Inform user can try again                        | LoggedOut       |
| T14 | LoggedIn         | timeout               | –                                | Session expired → redirect to login              | LoggedOut       |
| T15 | LoggedIn         | logout                | –                                | Invalidate session                               | LoggedOut       |
| T16 | Locked           | adminUnlock           | –                                | Inform user                                      | LoggedOut       |

> Note: `Unverified` and `PasswordExpired` return to `LoggedOut` after the side-flow so the user re-authenticates with updated state.

---

## 3) Happy Paths (End-to-End)

- **HP1**: `LoggedOut ─(submitCreds[correctCreds && !mfaEnabled])→ LoggedIn`
- **HP2**: `LoggedOut ─(submitCreds[correctCreds && mfaEnabled])→ MFA_Pending ─(submitMfa[codeValid])→ LoggedIn`
- **HP3**: `LoggedOut ─(submitCreds[pwdExpired])→ PasswordExpired ─(resetPassword[policyPass])→ LoggedOut ─(submitCreds[correctCreds])→ ...`

---

## 4) Negative & Edge Paths

- **NE1**: Invalid email format → stays in `LoggedOut` (T01)
- **NE2**: Wrong password (1..N) → `LoggedOut` (T06); on threshold → `RateLimited` (T03)
- **NE3**: MFA wrong code → stay in `MFA_Pending` (T10)
- **NE4**: Try login while `Locked` → `Locked` (T02) regardless of credentials
- **NE5**: Session timeout from `LoggedIn` → `LoggedOut` (T14)

---

## 5) State Coverage Checklist

- [ ] Each state has at least one incoming and one outgoing transition (except terminal/holding states)
- [ ] All guards are mutually exclusive or prioritized
- [ ] Rate limit cooldown path verified (`RateLimited → LoggedOut`)
- [ ] Side flows (verify/reset) return to `LoggedOut` and re-entry tested
- [ ] No path leaks user info (generic errors for bad creds/MFA)

---

## 6) Test Cases (Transition-based)

| Case ID     | Path                                                                                 | Expected Result                          |
|-------------|--------------------------------------------------------------------------------------|------------------------------------------|
| ST-HP1      | T08                                                                                  | LoggedIn session issued                   |
| ST-HP2      | T07 → T09                                                                            | LoggedIn after valid MFA                  |
| ST-RATE     | T06 (N-1x) → T03                                                                     | RateLimited with CAPTCHA/cooldown         |
| ST-UNVER    | T04 → T11 → T08                                                                      | Verify flow then success                  |
| ST-PWEXP    | T05 → T12 → T08                                                                      | Reset flow then success                   |
| ST-MFA-FAIL | T07 → T10 (x2) → T09                                                                 | MFA fails twice, then succeeds            |
| ST-LOCK     | T02                                                                                  | Locked message shown                      |
| ST-TIMEOUT  | T08 → T14                                                                            | Session expires to LoggedOut              |
| ST-LOGOUT   | T08 → T15                                                                            | Manual logout to LoggedOut                |

---

## 7) Notes for Automation
- Drive states via **fixtures/mocks** (e.g., set `accountLocked`, `emailVerified=false`, `pwdExpired=true`, attempt counters).
- Assert **state** (URL/route, cookie/token presence) and **UI** (messages, focus, ARIA).
- For API: assert status codes (`401` unauthenticated on first hop; `200/302` on success) and error schemas.