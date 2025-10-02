# 🔗 Traceability Matrix — Login Feature

---

| Requirement / Use Case | Test Design Technique | Test Case ID(s)             | Bug Report ID(s)                         |
|-------------------------|-----------------------|------------------------------|------------------------------------------|
| **UC-01** Happy path: valid creds → login | State Transition, EP | ST-01, ST-02, ST-02a        | — |
| **UC-02** Wrong password: error + lockout | Decision Table, ST   | ST-03, ST-03a               | — |
| **UC-03** Locked account | Decision Table, ST   | ST-10                        | — |
| **UC-04** Unverified account | Decision Table, ST   | ST-04, ST-04a               | — |
| **UC-05** Password expired | Decision Table, ST   | ST-05, ST-05a               | — |
| **UC-06** Forgot password flow | Use Case, Integration | UC-06                   | **BUG-002** Forgot password email not sent |
| **UC-07** SSO integration | Use Case, Integration | UC-07                       | **BUG-004** SSO blank page after denied consent |
| Responsive UI (mobile view) | UI Test Design       | UI-RESP-01                  | **BUG-001** Login button misaligned |
| Session management (timeout/logout) | State Transition | ST-07, ST-08                | **BUG-003** Session not expiring after logout |
| Security: password input handling | Security Checklist | SEC-01                    | **BUG-005** Password field allows copy/paste |

---

## ✅ Notes
- **UC IDs** → defined in [login-use-cases.md](./login-use-cases.md)  
- **ST IDs** → defined in [login-state-transition.md](./login-state-transition.md)  
- **BUG IDs** → defined in [login-bug-reports.md](./login-bug-reports.md)  
