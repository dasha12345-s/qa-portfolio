# Traceability Matrix — Login Feature

This matrix links **requirements / use cases** with **test design techniques**, **test cases**, and **bug reports**.  
It demonstrates coverage across **functional, UI/UX, DB validation, and security aspects** of the Login feature.  

---

| Requirement / Use Case | Test Design Technique | Test Case ID(s) | Bug Report ID(s) |
|-------------------------|-----------------------|-----------------|------------------|
| **UC-01** Happy path: valid creds → login | State Transition, EP, DB Validation | ST-01, ST-02, DB-01, DB-02 | — |
| **UC-02** Wrong password: error + lockout | Decision Table, ST, DB Validation | ST-03, DB-01, DB-03 | — |
| **UC-03** Locked account | Decision Table, ST, DB Validation | ST-10, DB-03, DB-04 | — |
| **UC-04** Unverified account | Decision Table, ST, DB Validation | ST-04, DB-07, DB-08 | — |
| **UC-05** Password expired | Decision Table, ST, DB Validation | ST-05, DB-05, DB-06 | — |
| **UC-06** Forgot password flow | Use Case, Integration, DB Validation | UC-06, DB-05, DB-06 | **BUG-002** Forgot password email not sent |
| **UC-07** SSO integration | Use Case, Integration | UC-07 | **BUG-004** SSO blank page after denied consent |
| **UI: Visual layout & responsiveness** | UI Checklist | UI-01 → UI-22 | **BUG-001** Login button misaligned |
| **UX: User experience flow** | UX Checklist | UX-01 → UX-04 | **BUG-003** Session not expiring after logout |
| **Session management (timeout/logout)** | State Transition, UX | ST-07, ST-08, UX-03 | **BUG-003** Session not expiring after logout |
| **Security: password input handling** | Security Checklist | SEC-01 | **BUG-005** Password field allows copy/paste |
| **Audit / Logging of login attempts** | DB Validation | DB-11, DB-12 | — |

---


- **UC IDs** → defined in [login-use-cases.md](./login-use-cases.md)  
- **ST IDs** → defined in [login-state-transition.md](./login-state-transition.md)  
- **UI / UX IDs** → defined in [login-ui-ux-checklist.md](./login-ui-ux-checklist.md)  
- **DB IDs** → defined in [login-sql-validation.md](./login-sql-validation.md)  
- **SEC IDs** → defined in [login-security.md](./login-security.md)  
- **BUG IDs** → defined in [login-bug-reports.md](./login-bug-reports.md)  
