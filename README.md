# QA Automation Portfolio — Darya Shostak

![Playwright Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/playwright.yml/badge.svg)
![Cypress Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/cypress.yml/badge.svg)

**QA Engineer** · Playwright · TypeScript · Cypress · API Testing · CI/CD · E2E Automation

## Portfolio Focus

This portfolio demonstrates UI automation, API testing, CI/CD integration, and defect documentation across multiple demo applications. The focus is on automation strategy, maintainable test design, reusable test architecture, and visible defect tracking.

---

## Application Under Test

The main application under test is the Cypress Real World App, a production-like banking/payment demo application provided by Cypress as an open-source project:

`https://github.com/cypress-io/cypress-realworld-app`

For this portfolio, I intentionally kept the automation suites separate from the application source code. My focus was on designing and documenting QA automation around an existing application, not on modifying the application itself.

The Playwright and Cypress suites are organized in separate folders so the test architecture, framework-specific setup, CI workflows, and automation strategy can be reviewed independently.

---

## Projects

### [Playwright Real World App — QA Automation Test Suite](./playwrightRealWorldAppTests)

> The main showcase automation suite.

This end-to-end Playwright + TypeScript suite expands coverage for the Cypress Real World App, a production-like banking/payment demo application.

It covers UI flows, API validation, network mocking, security scenarios, multi-user browser contexts, reusable fixtures, authentication state reuse, CI strategy, and cross-browser execution.

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

### [Cypress Real World App — Test Suite](./cypressRealWorldAppTests)

> Focused Cypress coverage for the most business-critical money movement scenarios.

This suite demonstrates earlier Cypress-based end-to-end automation for the core transaction lifecycle, including send payment flow, request/accept/reject behavior, and balance verification.

The Cypress suite is intentionally narrower than the Playwright suite. It focuses on high-risk payment scenarios, while the Playwright suite expands coverage across UI, API, mocking, security, fixtures, CI strategy, and cross-browser execution.

| Area              | Coverage                                                    |
| ----------------- | ----------------------------------------------------------- |
| Authentication    | Login, sign-up, session management                          |
| Transaction Flows | Send payment, request money, accept/reject — multi-user E2E |
| API Testing       | POST, PATCH, GET against Express REST backend               |
| Error Handling    | 401 Unauthorized, 422 Validation, 404 Not Found             |
| Bug Detection     | 4 backend bugs found, confirmed, and documented             |

**Key techniques:** `cy.session()` · `cy.intercept()` · `cy.request()` · `db:seed` task · Page Object Model · `deep.eq` array assertions · documented known defects

---

### [Saucedemo — E2E Test Suite](./saucedemo-full-suite)

> 34-test Cypress suite covering the full user journey on a demo e-commerce platform.

Included to demonstrate data-driven testing patterns and CI artifact configuration.

**Key techniques:** Page Object Model · `cy.intercept()` stubbing · JSON fixtures · GitHub Actions · screenshot and video artifacts

---

### [Login Form — Manual QA Documentation](https://github.com/dasha12345-s/qa-portfolio/tree/main/login-feature-manual-qa-docs)

> Comprehensive manual testing artifacts demonstrating QA fundamentals: test planning, structured test design, bug reporting, and API validation.

Included to demonstrate QA fundamentals, structured test design techniques, and manual defect documentation.

Includes: test plan · bug reports · equivalence partitioning · boundary value analysis · decision table · state transition · security checklist · traceability matrix · Postman collection

---

## Tech Stack

`Playwright` · `TypeScript` · `Cypress` · `JavaScript ES6+` · `Node.js` · `GitHub Actions` · `REST API` · `Postman` · `Page Object Model` · `CI/CD`

---

## Contact

[LinkedIn](https://www.linkedin.com/in/darya-shostak/) · [GitHub](https://github.com/dasha12345-s)
