# Boundary Value Analysis — Login Form

**Goal:** Validate behavior at edges (just below, at, and just above) of defined limits.

## Scope & Assumptions
- **Username** must be a **valid email** (syntactic check).
- **Password** must be **8–16 characters**.
- Both fields are **required** (empty → error).
- **Lockout** after **3** consecutive failed attempts.

---

## Legend
- **BVA-P-** → Password length boundaries  
- **BVA-M-** → Mandatory (empty vs non-empty) boundaries  
- **BVA-E-** → Email length boundaries  
- **BVA-L-** → Lockout threshold boundaries  
- **BVA-W-** → Whitespace/trim boundaries  
- **BVA-X-** → Field `maxlength` boundaries

Reusable data:
- Valid email: `user@test.com`
- Valid password (8 chars): `Passw0rd`
- Too short: `1234567` (7 chars)
- Too long: `thisisaverylongpass` (17+ chars)
- Spaces: `"   "` (3 spaces)

---

## 1) Password Length — **8–16 chars**
**Rule:** Reject <8 and >16; accept 8–16.

| TC ID     | Input (email / password)                           | Boundary Type        | Steps                     | Expected Result |
|-----------|-----------------------------------------------------|----------------------|---------------------------|-----------------|
| BVA-P-01  | `user@test.com` / `1234567` *(7)*                  | Just **below** min   | Submit                    | ❌ Error: “Password must be 8–16 characters.” |
| BVA-P-02  | `user@test.com` / `Passw0rd` *(8)*                 | **At** min           | Submit                    | ✅ Pass client validation (then server auth) |
| BVA-P-03  | `user@test.com` / `abcdefghi` *(9)*                | Just **above** min   | Submit                    | ✅ Pass client validation |
| BVA-P-04  | `user@test.com` / `abcdefgh12345678` *(16)*        | **At** max           | Submit                    | ✅ Pass client validation |
| BVA-P-05  | `user@test.com` / `thisisaverylongpass` *(17+)*    | Just **above** max   | Submit                    | ❌ Error: “Password must be 8–16 characters.” |

---

## 2) Mandatory Fields — **empty vs non-empty**
**Rule:** Empty inputs are invalid; non-empty proceed to next validation.

| TC ID     | Input (email / password)       | Boundary Type      | Steps      | Expected Result |
|-----------|--------------------------------|--------------------|------------|-----------------|
| BVA-M-01  | `""` / `""`                    | Empty→Empty        | Submit     | ❌ “Email is required”, “Password is required.” |
| BVA-M-02  | `user@test.com` / `""`         | Filled→Empty       | Submit     | ❌ “Password is required.” |
| BVA-M-03  | `""` / `Passw0rd`              | Empty→Filled       | Submit     | ❌ “Email is required.” |
| BVA-M-04  | `user@test.com` / `Passw0rd`   | Filled→Filled      | Submit     | ✅ Pass client validation (then server auth) |

---

## 3) Email Length — *(practice bounds)* **5–254 chars**
> Verify UI `maxlength` vs server validation.

| TC ID     | Email Length | Example (illustrative) | Boundary Type     | Expected Result |
|-----------|--------------|------------------------|-------------------|-----------------|
| BVA-E-01  | 4            | `a@b.c`                | Just **below** min| ❌ “Email is invalid.” |
| BVA-E-02  | 5            | `ab@c.d`               | **At** min        | ✅ Accepted (syntax OK) |
| BVA-E-03  | 6            | `ab@cd.e`              | Just **above** min| ✅ Accepted |
| BVA-E-04  | 254          | *(254-char email)*     | **At** max        | ✅ Accepted (if syntax OK) |
| BVA-E-05  | 255          | *(255-char email)*     | Just **above** max| ❌ “Email is too long.” or blocked by `maxlength` |

---

## 4) Lockout Threshold — **3 failures**
**Rule:** After 3 consecutive failed attempts, account is locked; 4th attempt blocked.

_Preconditions for this block:_ user exists, verified, not locked initially.

| TC ID     | Sequence                                  | Boundary Type      | Steps                             | Expected Result |
|-----------|-------------------------------------------|--------------------|-----------------------------------|-----------------|
| BVA-L-01  | 1st wrong password                        | Below threshold    | Submit wrong password once        | ❌ “Invalid credentials.” (attempts=1) |
| BVA-L-02  | 2nd wrong password                        | Just below lock    | Submit wrong password again       | ❌ “Invalid credentials.” (attempts=2) |
| BVA-L-03  | 3rd wrong password                        | **At** lock point  | Submit wrong password again       | ❌ **Account locked** message; lock set |
| BVA-L-04  | 4th attempt (any password)                | Just beyond lock   | Try to submit any password        | ❌ Denied: “Account is locked.” (no auth) |
