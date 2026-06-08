
# QA Automation Portfolio — Darya Shostak

![Playwright Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/playwright.yml/badge.svg)
![Cypress Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/cypress.yml/badge.svg)

**QA Engineer** · Playwright · TypeScript · Cypress · API Testing · CI/CD · E2E Automation

## Portfolio Focus

This portfolio covers UI, API, CI/CD, and defect documentation across two real-world applications. The focus is on automation strategy, maintainable test design, and visible defect tracking.

---

## Projects

### [Playwright Real World App — QA Automation Test Suite](./playwrightRealWorldAppTests)

> End-to-end Playwright + TypeScript automation suite for the Cypress Real World App, a production-like banking/payment demo application. Covers UI, API, mocked network, multi-user payment flows, cross-browser validation, and GitHub Actions CI.

| Area                 | Coverage                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| UI E2E               | Authentication, sign-up, transactions, bank accounts, user settings, notifications                    |
| API Testing          | Payment/request lifecycle, accept/reject flows, balance verification, validation and security checks  |
| Multi-user Flows     | Separate authenticated browser contexts for User1 and User2 with balance verification                 |
| Network Mocking      | Empty states, server errors, loading states, mocked 401/403 authorization scenarios                   |
| CI/CD                | 67 Chromium tests run in GitHub Actions on every push; full 335-test cross-browser suite runs locally |
| Defect Documentation | 6 detailed bug reports with severity, steps, expected/actual results, and impact                      |

**Key techniques:** `Playwright` · `TypeScript` · `storageState` · `globalSetup` · custom fixtures · Page Object Model · `page.route()` · `route.fulfill()` · API helpers · `test.fail()` · `test.step()` · `@smoke` / `@regression` tags

---

### [Cypress Real World App — Full Test Suite](./cypressRealWorldAppTests)

> End-to-end and API automation suite against a production-grade full-stack payment application (React + Express + SQLite). Tests run in GitHub Actions CI with the app spun up from source on every push.

| Area | Coverage |
|------|----------|
| Authentication | Login, sign-up, session management |
| Transaction Flows | Send payment, request money, accept/reject — multi-user E2E |
| API Testing | POST, PATCH, GET against Express REST backend |
| Error Handling | 401 Unauthorized, 422 Validation, 404 Not Found |
| Bug Detection | 4 backend bugs found, confirmed, and documented |

**Key techniques:** `cy.session()` · `cy.intercept()` · `cy.request()` · `db:seed` task · Page Object Model · `deep.eq` array assertions · `it.skip()` bug documentation

---

### [Saucedemo — E2E Test Suite](./saucedemo-full-suite-cypress)

> 34-test Cypress suite covering the full user journey on a demo e-commerce platform. 

Included to demonstrate data-driven testing patterns and CI artifact configuration.

**Key techniques:** Page Object Model · `cy.intercept()` stubbing · JSON fixtures · GitHub Actions · Screenshot and video artifacts

---

### [Login Form — Manual QA Documentation](./loginForm)

> Comprehensive manual testing artifacts demonstrating QA fundamentals: test planning, structured test design, bug reporting, and API validation.

Included to demonstrate QA fundamentals — test planning, structured design techniques, and manual defect documentation.

Includes: Test plan · bug reports · equivalence partitioning · boundary value analysis · decision table · state transition · security checklist · traceability matrix · Postman collection

---

## Tech Stack

`Playwright` `TypeScript` `Cypress` `JavaScript ES6+` `Node.js` `GitHub Actions` `REST API` `Postman` `Page Object Model` `CI/CD`

---

## Contact

[LinkedIn](https://www.linkedin.com/in/darya-shostak/) · [GitHub](https://github.com/dasha12345-s)
