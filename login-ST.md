# 4) State Transition Tests (ST) — Login Flow

## 4.1 Legend
- **State** = user/system condition; **Event** = trigger; **Guard** = condition; **Action** = system response.
- Notation: `STATE --(event [guard] / action)--> NEXT_STATE`
- Error wording must be generic (no user enumeration). Policies (MFA, lockout, attempt limits) are product-specific.

---

## 4.2 States & Events

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

---

## 4.3 Transition Rules

| ID   | From State   | Event/Trigger         | Guard(s)                                   | Action / Message                                          | To State       |
|------|--------------|-----------------------|--------------------------------------------|-----------------------------------------------------------|----------------|
| ST-01| LoggedOut    | submitCreds           | validFormat ∧ correctCreds ∧ !mfaEnabled   | Issue session; redirect to dashboard                      | LoggedIn       |
| ST-02| LoggedOut    | submitCreds           | validFormat ∧ correctCreds ∧ mfaEnabled    | Prompt for MFA                                            | MFA_Pending    |
| ST-02a| MFA_Pending | submitMfa             | codeValid                                   | Issue session; redirect                                   | LoggedIn       |
| ST-02b| MFA_Pending | submitMfa             | !codeValid                                  | Show generic MFA error; allow retry                       | MFA_Pending    |
| ST-03| LoggedOut    | submitCreds           | validFormat ∧ !correctCreds ∧ attempts>=N  | Show CAPTCHA/cooldown (or policy lock)                    | RateLimited/*Locked* |
| ST-03a| LoggedOut   | submitCreds           | validFormat ∧ !correctCreds ∧ attempts<N   | Show generic error                                        | LoggedOut      |
| ST-04| LoggedOut    | submitCreds           | validFormat ∧ !emailVerified               | Show “Verify your email” + resend link                    | Unverified     |
| ST-04a| Unverified  | verifyEmail           | linkValid                                   | Mark verified; show success                               | LoggedOut      |
| ST-04b| LoggedOut   | submitCreds           | validFormat ∧ correctCreds ∧ emailVerified | Issue session; redirect                                   | LoggedIn       |
| ST-05| LoggedOut    | submitCreds           | validFormat ∧ pwdExpired                   | Force password reset flow                                 | PwdExpired     |
| ST-05a| PwdExpired  | resetPassword         | policyPass                                  | Show success; require re-login                            | LoggedOut      |
| ST-06| LoggedOut    | submitCreds           | !validFormat                                | Show field validation error(s)                            | LoggedOut      |
| ST-07| LoggedIn     | timeout               | —                                          | Invalidate session; redirect to login (preserve return URL)| LoggedOut     |
| ST-08| LoggedIn     | logout                | —                                          | Invalidate session; redirect to login                     | LoggedOut      |
| ST-09| RateLimited  | cooldownElapsed       | window over                                 | Inform user; allow retry                                  | LoggedOut      |
| ST-10| Locked       | adminUnlock           | —                                          | Inform user they can try again                            | LoggedOut      |

> *If your policy permanently locks instead of rate-limits, direct ST-03 to **Locked** and use ST-10 to clear it.*

---

## 4.4 Mermaid State Diagram

```mermaid
stateDiagram-v2
  [*] --> LoggedOut

  LoggedOut --> LoggedIn: submitCreds [valid && correct && !MFA]
  LoggedOut --> MFA_Pending: submitCreds [valid && correct && MFA]
  LoggedOut --> RateLimited: submitCreds [valid && !correct && attempts>=N]
  LoggedOut --> LoggedOut: submitCreds [!valid]
  LoggedOut --> Unverified: submitCreds [valid && !emailVerified]
  LoggedOut --> PwdExpired: submitCreds [valid && pwdExpired]

  MFA_Pending --> LoggedIn: submitMfa [codeValid]
  MFA_Pending --> MFA_Pending: submitMfa [!codeValid]

  Unverified --> LoggedOut: verifyEmail [linkValid]
  PwdExpired --> LoggedOut: resetPassword [policyPass]

  RateLimited --> LoggedOut: cooldownElapsed
  Locked --> LoggedOut: adminUnlock

  LoggedIn --> LoggedOut: timeout
  LoggedIn --> LoggedOut: logout