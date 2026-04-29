# QA Portfolio — Darya Shostak

Manual QA Engineer transitioning to Automation QA. This portfolio demonstrates Cypress test automation across two projects, covering UI testing, multi-user E2E flows, pure API testing, error handling, and CI/CD with GitHub Actions.

![Cypress Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/cypress.yml/badge.svg)

---

## Projects

### [Cypress Real World App Test Suite](./my-cypress-project)
A full automation suite built against [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app) — a full-stack payment application. Tests run against a real Express backend on localhost with GitHub Actions spinning up the app in CI.

**Highlights:**
- Multi-user E2E transaction flows (send payment, request money, accept/reject)
- Pure API tests against the Express backend using `cy.request()`
- API error handling tests (401, 422, 404)
- 4 real backend bugs found and documented with `it.skip()`
- `cy.session()` for cached login state with db:seed compatibility
- Page Object Model across 6 page classes

### [Saucedemo Full Suite](./saucedemo-full-suite)
A comprehensive Cypress test suite for [saucedemo.com](https://www.saucedemo.com) — a demo e-commerce site. 34 tests covering login, product pages, cart, checkout, and sorting.

**Highlights:**
- Page Object Model pattern
- API intercepting and stubbing with `cy.intercept()`
- Data-driven testing using JSON fixtures
- CI/CD with GitHub Actions

---

## Tech Stack

- **Cypress** — E2E and API testing
- **JavaScript (ES6+)** — test logic and custom commands
- **GitHub Actions** — CI/CD pipeline
- **Node.js / Express** — backend under test
- **Page Object Model** — selector management

---

## Contact

[LinkedIn](https://linkedin.com/in/dasha12345-s) · [GitHub](https://github.com/dasha12345-s)
