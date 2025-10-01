# Equivalence Partitioning — Login Form

**Goal:** Minimize test count while maximizing coverage by picking one representative from each input class (valid/invalid).

## Scope & Assumptions
- Username must be a **valid email**.
- Password must be **8–16 characters**.
- Both fields are **mandatory**.
- App shows **specific, human-readable** validation messages.
- After credentials pass client validation, server checks **“correct vs incorrect.”**

---

## Test Cases 

| TC ID | Username Partition | Password Partition | Precondition (Auth Partition) | Steps | Expected Result |
|:-----:|--------------------|--------------------|-------------------------------|-------|-----------------|
| EP-01 | U1 Valid | P1 Valid | A1 Correct | Enter `user@test.com` / `Passw0rd` → Click **Login** | ✅ Redirect to Dashboard |
| EP-02 | U1 Valid | P1 Valid | A2 Incorrect | Enter `user@test.com` / `WrongPass1` → **Login** | ❌ Error: “Invalid credentials.” |
| EP-03 | U2 Invalid | P1 Valid | — | Enter `user` / `Passw0rd` → **Login** | ❌ Inline error under Email: “Enter a valid email.” No auth call |
| EP-04 | U3 Invalid | P1 Valid | — | Enter `.u@a.com` / `Passw0rd` → **Login** | ❌ Email format error |
| EP-05 | U4 Empty | P1 Valid | — | Leave email empty / valid password → **Login** | ❌ “Email is required.” |
| EP-06 | U5 Spaces | P1 Valid | — | Enter `"   "` / `Passw0rd` → **Login** | ❌ “Email is required.” (after trim) |
| EP-07 | U1 Valid | P2 Too short | — | Enter `user@test.com` / `1234567` → **Login** | ❌ “Password must be 8–16 characters.” |
| EP-08 | U1 Valid | P3 Too long | — | Enter `user@test.com` / `thisisaverylongpass` → **Login** | ❌ “Password must be 8–16 characters.” |
| EP-09 | U1 Valid | P4 Empty | — | Enter `user@test.com` / *(empty)* → **Login** | ❌ “Password is required.” |
| EP-10 | U1 Valid | P5 Spaces | — | Enter `user@test.com` / `"   "` → **Login** | ❌ “Password is required.” (after trim) |
| EP-11 | U1 Valid | P1 Valid | A3 Locked *(optional)* | Use locked account creds → **Login** | ❌ “Account locked.” |
| EP-12 | U1 Valid | P1 Valid | A4 Unverified *(optional)* | Use unverified account creds → **Login** | ❌ “Please verify your email.” |

---

### Partitions
- **U1** Valid email (e.g., `user@test.com`)
- **U2** Invalid format (missing `@`/domain)
- **U3** Invalid pattern (leading dot, bad domain start, etc.)
- **U4** Empty
- **U5** Whitespaces only (trim → empty)

- **P1** Valid length (8–16)
- **P2** Too short (<8)
- **P3** Too long (>16)
- **P4** Empty
- **P5** Whitespaces only (trim → empty)

- **A1** Correct credentials → success
- **A2** Incorrect credentials → generic error
- **A3** Locked user → locked message
- **A4** Unverified user → verify message