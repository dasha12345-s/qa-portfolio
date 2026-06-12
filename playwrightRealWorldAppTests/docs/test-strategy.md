# Test Strategy — Playwright Real World App

## 1. Introduction

This document describes the test strategy for the automated test suite built against the [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app) — a full-stack banking and payments application used as the application under test (AUT).

The RWA was chosen because it mirrors real-world complexity: multi-user flows, financial transactions, a REST API, and authentication — making it a strong foundation for demonstrating professional QA automation practices.

---

## 2. Scope

**In scope:**
- Authentication (sign in, sign out, session management)
- Sign-up flow
- Transactions (send money, request money, accept/reject requests)
- Bank account management
- User settings
- Notifications
- API layer (request/response validation, error handling)
- Network mocking (simulated error states)
- Cross-browser compatibility

**Out of scope:**
- Accessibility automation
- Internationalisation (i18n)

---

## 3. Testing Objectives

- Validate critical payment flows end-to-end, including balance correctness after each transaction
- Verify API contract correctness and error responses (401, 422, 404)
- Confirm cross-browser and responsive behavior across desktop and mobile Playwright projects
- Simulate real-world failure scenarios (server errors, empty states, unauthorized access) via network mocking
- Surface and document defects found during test design

---

## 4. Risk-Based Prioritization

| Feature | Risk Level | Rationale |
|---|---|---|
| Transactions (send/request/accept/reject) | High | Financial data; balance correctness is business-critical |
| Authentication | High | Security boundary; gates access to all other features |
| Bank Accounts | Medium | Required for initiating transactions |
| User Settings | Low | Lower business impact; primarily profile/UI behavior |
| Notifications | Low | Informational only; no business logic |

Higher-risk areas have deeper coverage: more edge cases, negative paths, API-level assertions, and balance verification steps.

---

## 5. Test Levels and Types

**E2E UI**
Happy paths and edge cases exercised through the browser using Page Object Models. Tests cover the full user journey from login through completion of each feature.

**API**
Validates request/response contracts for the payment and transaction endpoints. Checks status codes, response shapes, and error handling (401 Unauthorized, 422 Unprocessable Entity, 404 Not Found). Balance state is verified via API independently of the UI.

**Network Mocking**
Uses `page.route()` and `route.fulfill()` to simulate error conditions that are difficult to reproduce naturally: 401/403/500 responses, empty data states, and loading states. This validates that the UI handles failures gracefully without requiring a broken backend.

**Cross-Browser**
Tests run across five Playwright projects: Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), and Mobile Safari (iPhone 13). This surfaces browser-specific rendering and behaviour differences.

**Authorization / Access Control**
Lightweight authorization checks verify that User A cannot access or modify User B's transactions or protected data.

---

## 6. Architecture and Design Decisions

**Global Setup (`global-setup.ts`)**
Authenticates two users once before the suite runs and saves session state to `.auth/user1.json` and `.auth/user2.json`. Every test starts already logged in, eliminating repeated login steps and keeping the suite fast.

**Custom Fixtures (`fixtures.ts`)**
Three fixtures — `loggedInPage`, `secondUserPage`, and `userIds` — provide pre-authenticated browser contexts for multi-user scenarios. Tests that require two users (e.g. sending a payment from User 1 and verifying receipt as User 2) use these fixtures without any setup boilerplate.

**Page Object Model**
Ten page classes encapsulate selectors and interactions. If the UI changes, only the page object needs updating — not every test that touches that element.

**API Helpers (`helpers.ts`)**
`getBalance()`, `getBalanceViaAPI()`, and `getUserId()` retrieve financial state directly from the API. Used in transaction tests to assert correct balance changes independently of what the UI renders.

**`test.fail()`**
Known bugs are annotated in the test code rather than skipped. The test is marked as an expected failure, CI stays green, and the defect remains visible and tracked until fixed.

**`test.step()`**
Wraps logical phases of a test (e.g. "Create transaction", "Verify balance"). Makes HTML reports readable at a glance without needing inline comments.

---

## 7. Test Data Strategy

- Two pre-seeded users: `Heath93` (User 1) and `Dina20` (User 2)
- The database is seeded before the test run using the RWA seed script
- Tests are designed to avoid order-dependent state where possible
- Authentication state is isolated through separate browser contexts and storageState files

---

## 8. CI/CD Strategy

| Aspect | Detail |
|---|---|
| Trigger | Every push to the repository |
| CI browser | Chromium only (67 tests) — fast feedback in ~2–3 minutes |
| Full suite | All 5 browser projects (335 tests) — run locally before significant changes |
| Retries | 2 retries in CI to absorb transient flakiness; 0 locally |
| Artifacts | HTML report, Playwright traces, and screenshots captured on failure |
| Server readiness | Workflow waits for ports 3000 (frontend) and 3001 (API) before running tests |

---

## 9. Known Defects

Six defects were found and documented during test design. Each has a dedicated bug report in `docs/bug-reports/` with severity, reproduction steps, expected vs actual results, and impact.

| ID | Summary | Severity |
|---|---|---|
| BUG-001 | Empty password field missing required-field validation | Medium |
| BUG-002 | Negative transaction amount accepted (should return 422) | High |
| BUG-003 | Zero transaction amount accepted (should return 422) | High |
| BUG-004 | Rejecting a payment request does not restore sender's balance | High |
| BUG-005 | Short routing number returns 200 (should return 422) | Medium |
| BUG-006 | Save button non-functional in Firefox and WebKit | Medium |

---

## 10. Test Tagging and Filtering

- `@smoke` — core happy-path flows; run first to get a fast pass/fail signal
- `@regression` — full coverage including edge cases and negative paths

---

## 11. Entry and Exit Criteria

**Entry criteria**
- Application is running (frontend on port 3000, API on port 3001)
- Database has been seeded
- Auth files have been generated by global setup

**Exit criteria**
- All tests not marked `test.fail()` pass
- Known bugs are annotated with `test.fail()` and documented in `docs/bug-reports/`
- HTML report has been generated

---

## 12. Tools and Technologies

| Tool | Purpose |
|---|---|
| Playwright + TypeScript | Test framework and language |
| GitHub Actions | CI/CD pipeline |
| Playwright HTML Reporter | Local test reporting |
| `page.route()` | Network mocking and request interception |
| Postman | API exploration during test design |

---

## 13. Future Improvements

Potential improvements for this suite include:

- Add accessibility checks using axe-playwright
- Add lightweight performance coverage using k6 smoke tests for critical API endpoints
- Expand CI to run Firefox or WebKit on a scheduled nightly workflow
- Add database-level assertions for transaction and balance validation
- Add visual regression checks for key payment and transaction screens