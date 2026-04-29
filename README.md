# QA Automation Portfolio — Darya Shostak

![Cypress Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/cypress.yml/badge.svg)

**QA Engineer** · Cypress · JavaScript · API Testing · CI/CD · Page Object Model

---

## Projects

### [Cypress Real World App — Full Test Suite](./my-cypress-project)

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

### [Saucedemo — E2E Test Suite](./saucedemo-full-suite)

> 34-test Cypress suite covering the full user journey on a demo e-commerce platform. Includes data-driven testing, API stubbing, and artifact reporting in CI.

**Key techniques:** Page Object Model · `cy.intercept()` stubbing · JSON fixtures · GitHub Actions · Screenshot and video artifacts

---

### [Login Form — Manual QA Documentation](./loginForm)

> Comprehensive manual testing artefacts demonstrating QA fundamentals: test planning, structured test design, bug reporting, and API validation.

**Includes:** Test plan · Bug reports · Equivalence partitioning · Boundary value analysis · Decision table · State transition · Security checklist · Traceability matrix · Postman collection

---

## Tech Stack

`Cypress` `JavaScript ES6+` `Node.js` `GitHub Actions` `REST API` `Postman` `Page Object Model` `CI/CD`

---

## Contact

[LinkedIn](https://linkedin.com/in/dasha12345-s) · [GitHub](https://github.com/dasha12345-s)
