# Decision Table — Login Form

**Goal:** Cover outcomes from **combinations of conditions** using compact “if/then” tables.
- Table 1 handles **client-side validation** (no server call).
- Table 2 handles **server-side outcomes** when client validation passes.

## Scope & Assumptions
- Username = **email** (required, syntactic check).
- Password = **8–16 chars** (required).
- Whitespace-only → treated as **empty** after trim.
- Server returns **generic** errors (no email enumeration).
- Optional features may exist: **lockout (3 fails), MFA, rate limit/CAPTCHA, unverified/disabled user**.

---

## Legend

**Client validation conditions**
- **C1** Email empty/whitespace?
- **C2** Email format valid?
- **C3** Password empty/whitespace?
- **C4** Password length valid? (8–16 chars)

**Server/auth conditions** *(evaluated only if C1–C4 all pass)*  
- **S1** Account locked?
- **S2** Rate limit/CAPTCHA required?
- **S3** Credentials correct?
- **S4** MFA required?
- **S5** Email verified?
- **S6** User enabled/active?

**Actions**
- **A1** Show “Email is required.”
- **A2** Show “Enter a valid email.”
- **A3** Show “Password is required.”
- **A4** Show “Password must be 8–16 characters.”
- **A5** Call server (submit credentials).
- **A6** Show “Account locked.”
- **A7** Show rate-limit/CAPTCHA message.
- **A8** Show “Invalid credentials.”
- **A9** Prompt for MFA challenge.
- **A10** Show “Please verify your email.”
- **A11** Show “Account disabled. Contact support.”
- **A12** Success → redirect to **Dashboard** (session set).

> Multiple actions may fire together (e.g., A1 + A3 when both fields are empty).

---

## Table 1 — Client-side Validation (no server call)

> Evaluate these first. If any client rule applies, **do not** perform A5.

| Rule | C1 Email empty? | C2 Email valid? | C3 Password empty? | C4 Password length valid? | Actions (then/else)                                  |
|:---:|:----------------:|:---------------:|:------------------:|:-------------------------:|------------------------------------------------------|
| R1  | **T**            | –               | **T**              | –                         | **A1 + A3** (both required). No A5.                  |
| R2  | **T**            | –               | **F**              | –                         | **A1**. No A5.                                       |
| R3  | **F**            | **F**           | **T**              | –                         | **A2 + A3**. No A5.                                  |
| R4  | **F**            | **F**           | **F**              | –                         | **A2**. No A5.                                       |
| R5  | **F**            | **T**           | **T**              | –                         | **A3**. No A5.                                       |
| R6  | **F**            | **T**           | **F**              | **F**                     | **A4**. No A5.                                       |
| R7  | **F**            | **T**           | **F**              | **T**                     | **A5** (submit to server).                           |

**Notes**
- Treat whitespace-only as **C1=T** or **C3=T**.
- If UI enforces `maxlength`, length overflow is blocked on the client; still keep R6 for server-side validation where applicable.

---

## Table 2 — Server-side Outcomes (only if R7 fired A5)

> Evaluate in **priority order**. First matching rule applies.

| Priority | S1 Locked? | S2 Rate-limited? | S6 Active? | S5 Verified? | S3 Creds correct? | S4 MFA? | Actions (result)                           |
|:-------:|:----------:|:----------------:|:----------:|:------------:|:-----------------:|:-------:|--------------------------------------------|
| P1      | **T**      | –                | –          | –            | –                 | –       | **A6** (locked).                            |
| P2      | **F**      | **T**            | –          | –            | –                 | –       | **A7** (rate limit/CAPTCHA).                |
| P3      | **F**      | **F**            | **F**      | –            | –                 | –       | **A11** (disabled).                         |
| P4      | **F**      | **F**            | **T**      | **F**        | –                 | –       | **A10** (verify email).                     |
| P5      | **F**      | **F**            | **T**      | **T**        | **F**             | –       | **A8** (invalid credentials).               |
| P6      | **F**      | **F**            | **T**      | **T**        | **T**             | **T**   | **A9** (MFA challenge).                     |
| P7      | **F**      | **F**            | **T**      | **T**        | **T**             | **F**   | **A12** (success → Dashboard).              |

**Notes**
- Keep responses **generic** to avoid user/email enumeration.
- On **A12**, assert secure session cookie (HttpOnly, Secure, SameSite) or token policy.

---

## Example Test Cases Mapped to Rules

- **DT-01 (R1)**: Email: `""`, Password: `""` → **A1 + A3**.  
- **DT-02 (R4)**: Email: `user` (invalid), Password: `Passw0rd` → **A2**.  
- **DT-03 (R6)**: Email: `user@test.com`, Password: `1234567` → **A4**.  
- **DT-04 (R7 ⇒ P5)**: Email: `user@test.com`, Password: `WrongPass1` → **A8**.  
- **DT-05 (R7 ⇒ P6)**: Valid creds but MFA enabled → **A9** (MFA).  
- **DT-06 (R7 ⇒ P1)**: Account locked → **A6**.  
- **DT-07 (R7 ⇒ P7)**: Valid creds, no MFA → **A12** (success).  
- **DT-08 (R7 ⇒ P2)**: Rate limit active → **A7**.  
- **DT-09 (R7 ⇒ P4)**: Unverified email → **A10**.  
- **DT-10 (R7 ⇒ P3)**: Disabled user → **A11**.

---

## Assertions (common)
- Client errors show **next to fields** and/or banner; **focus** moves to first invalid.
- When client validation fails (R1–R6), **no server call (A5)** is made.
- On server errors, email stays; password may clear per security policy.
- Success **redirects** and sets session; protected routes become accessible.

