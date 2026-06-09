# [Saucedemo Automation](./saucedemo-full-suite)

![Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/cypress.yml/badge.svg)

**Cypress** · **Playwright** · **JavaScript** · **TypeScript** · **Page Object Model** · **API Mocking** · **Fixtures** · **CI/CD**

---

## Overview

This folder contains two automation test suites for [saucedemo.com](https://www.saucedemo.com), a public demo e-commerce application.

The goal is to show the same application tested with two different automation frameworks:

* **Cypress suite** — JavaScript-based E2E coverage for login, inventory, checkout, error states, and user-specific behavior
* **Playwright suite** — TypeScript-based E2E and API-focused coverage with reusable authentication state, fixtures, API mocking, and Page Object Model structure

This project is included as an additional portfolio project. The main showcase project in this portfolio is the Playwright Real World App QA Automation Test Suite.

---

## Project Structure

```text
saucedemo-automation/
├── cypress/
│   ├── e2e/
│   │   ├── checkout/
│   │   ├── error-states/
│   │   ├── inventory/
│   │   └── login/
│   ├── fixtures/
│   │   └── users.json
│   ├── pages/
│   │   ├── InventoryPage.js
│   │   └── LoginPage.js
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── cypress.config.js
│   ├── package.json
│   └── package-lock.json
│
├── playwright/
│   ├── .auth/
│   │   ├── standard-user.json
│   │   ├── problem-user.json
│   │   └── perf-glitch-user.json
│   ├── tests/
│   │   ├── api/
│   │   │   ├── mocking.spec.ts
│   │   │   └── reqres.spec.ts
│   │   ├── inventory/
│   │   │   ├── filter.spec.ts
│   │   │   ├── problemUser.spec.ts
│   │   │   └── standardUser.spec.ts
│   │   ├── login/
│   │   │   └── login.spec.ts
│   │   ├── pages/
│   │   │   ├── inventoryPage.ts
│   │   │   └── loginPage.ts
│   │   └── fixtures.ts
│   ├── global-setup.ts
│   ├── playwright.config.ts
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## Cypress Suite

The Cypress suite covers the Saucedemo user journey with JavaScript-based E2E tests.

It includes login behavior, inventory scenarios, checkout flow, error states, and user-specific edge cases.

### Cypress Coverage

| Area         | Coverage                                                                            |
| ------------ | ----------------------------------------------------------------------------------- |
| Login        | Valid login, invalid credentials, locked-out user                                   |
| Inventory    | Standard user, problem user, visual user, performance glitch user, sorting behavior |
| Checkout     | Full checkout flow and checkout form validation                                     |
| Error States | API stubbing and intercepted error behavior                                         |
| Fixtures     | User test data stored in `fixtures/users.json`                                      |
| Page Objects | Login and inventory page classes with reusable selectors/actions                    |

### Cypress Key Techniques

* Page Object Model
* `cy.intercept()` API stubbing
* JSON fixtures
* Custom Cypress commands
* User-specific test coverage
* Checkout flow validation
* Screenshot and video artifacts on failure

---

## Playwright Suite

The Playwright suite implements Saucedemo coverage using Playwright + TypeScript.

It focuses on reusable authentication state, fixtures, inventory behavior, API mocking, and structured test organization.

### Playwright Coverage

| Area                  | Coverage                                                                       |
| --------------------- | ------------------------------------------------------------------------------ |
| Authentication        | Login scenarios and validation                                                 |
| Auth State Reuse      | Saved auth states for standard user, problem user, and performance glitch user |
| Inventory             | Filtering, standard user behavior, problem user behavior                       |
| API Mocking           | Mocked API responses and network behavior                                      |
| External API Practice | `reqres` API test coverage                                                     |
| Fixtures              | Reusable Playwright fixtures in `fixtures.ts`                                  |
| Page Objects          | Login and inventory page classes                                               |
| Global Setup          | Prepares reusable authenticated states before test execution                   |

### Playwright Key Techniques

* Playwright test runner
* TypeScript
* `storageState`
* `globalSetup`
* Custom fixtures
* Page Object Model
* API mocking
* Network request handling
* Reusable authenticated sessions
* Structured test organization by feature area

---

## How to Run

### Cypress

```bash
cd saucedemo-automation/cypress
npm install
npx cypress open
```

Run headless:

```bash
npx cypress run
```

### Playwright

```bash
cd saucedemo-automation/playwright
npm install
npx playwright install
npx playwright test
```

Open Playwright report:

```bash
npx playwright show-report
```

---

## CI/CD

The Cypress suite is connected to GitHub Actions and runs automatically on push to `main`.

[View workflow runs](https://github.com/dasha12345-s/qa-portfolio/actions)

---

## Portfolio Note

This Saucedemo project demonstrates Cypress and Playwright automation approaches on the same public demo application.

The main portfolio showcase is the Playwright Real World App suite, which demonstrates broader QA automation strategy with UI, API, network mocking, security scenarios, multi-user flows, fixtures, CI strategy, and documented product defects.
