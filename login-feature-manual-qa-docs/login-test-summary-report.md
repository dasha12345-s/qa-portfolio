# Test Summary Report – Login Feature

**Project:** QA Portfolio – Login Feature  
**Feature:** Login / Authentication  
**Environment:** QA / local (mock / test API)  
**Author:** Darya Shostak  
**Date:** September 2025

## 1. Objective
Summarize the testing activities and results for the Login feature, including UI, API, security-related checks, and database validation, and provide a release recommendation based on found defects and coverage.

## 2. Scope of Testing
- UI login form
- API `/auth/login` basic and negative scenarios
- Validation (client + server)
- Security-related checks from `login-security.md`
- DB/SQL verification from `login-sql-validation.md`
- Automation smoke using Cypress

Out of scope in this cycle:
- Registration
- Forgot/reset password
- SSO configuration and full SSO flow
- Performance / load

## 3. Test Execution Summary

| Area                  | Planned | Executed | Passed | Failed | Blocked |
|-----------------------|---------|----------|--------|--------|---------|
| UI / Functional       | 12      | 12       | 12     | 0      | 0       |
| API (login)           | 10      | 9        | 8      | 1      | 0       |
| Security checks       | 6       | 5        | 5      | 0      | 1*      |
| DB / SQL validation   | 4       | 4        | 4      | 0      | 0       |
| Cypress smoke         | 2       | 2        | 2      | 0      | 0       |
| **Total**             | **34**  | **32**   | **31** | **1**  | **1**   |

## 4. Defects

| ID | Title | Severity | Priority | Status |
|----|--------|-----------|-----------|--------|
| BUG-001 | Login button misaligned on small screens | Minor | Medium | Open |
| BUG-002 | “Forgot Password” link does not send reset email | Major | High | Open |
| BUG-003 | Session not invalidated after logout (browser back reopens page) | Major | High | Open |
| BUG-004 | SSO login fails with Google IdP when user denies permissions | Major | Medium | Open |
| BUG-005 | Password field allows copy/paste (security risk) | Major | Medium | Open |

**Total Defects Found:** 5  
**High/Major Severity:** 3  
**UI / Minor Severity:** 1  
**Security-Related:** 1  

All defects are tracked in [login-bug-reports.md](login-bug-reports.md).

## 5. Coverage & Traceability
- All requirements defined for the Login feature in this iteration are covered by at least one test case or automated check.
- Traceability is maintained in `login-traceability-matrix.md` (requirements → test cases → defects).
- Negative and edge cases for login are partially covered in Postman collection; additional API hardening tests can be added in the next cycle.

## 6. Risks / Limitations
- Environment does not fully support captcha / rate-limit scenarios, so protection mechanisms were verified only partially.
- SSO and MFA flows were not included in this cycle.
- Different password policies per tenant may cause false negatives on shared environments.

## 7. Conclusion / Recommendation

The Login feature is **conditionally acceptable** for staging or internal testing use.

Before promoting to production, the following issues must be resolved:

1. **BUG-002** — “Forgot Password” link not sending reset emails (blocks account recovery).  
2. **BUG-003** — Session not properly invalidated after logout (security & privacy risk).  
3. **BUG-004** — SSO flow crashes when user denies Google consent (needs graceful error handling).  
4. **BUG-005** — Password field allows copy/paste (security improvement recommended).

**BUG-001** (UI alignment on small screens) can be addressed in a later UI refinement cycle.

Once these major issues are fixed, a **regression test cycle** should be executed, covering:
- Functional login flows (UI + API)  
- Authentication and session management  
- Password reset and SSO integrations  
- Security re-validation (clipboard, token invalidation)

✅ **Release Recommendation:** Proceed with **limited staging release only** until high-severity bugs are closed and verified.

## 8. Related Artifacts
- [Test Plan](login-test-plan.md)
- [API](login-api.md)
- [Postman Collection](login-app.postman_collection.json)
- [Cypress Test – UI/UX](login-ui-ux-tests.cy.js)  
- [Cypress Test – Use Cases](login-use-cases.cy.js)
- [Bug Reports](login-bug-reports.md)
- [Traceability Matrix](login-traceability-matrix.md)