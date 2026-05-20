# Cypress Real World App — Test Suite

![Cypress Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/cypress.yml/badge.svg)

A professional Cypress automation suite built against [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app) — a full-stack payment application used by Cypress as an official reference project. Tests cover authentication, multi-user transaction flows, pure API testing, and error handling.

---

## Project Structure

```
my-cypress-project/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── transactions-api.cy.js          # Happy path API tests
│   │   │   └── transactions-api-error-handling.cy.js  # Error handling tests
│   │   ├── logIn/
│   │   │   └── loginPage.cy.js                 # Login UI tests
│   │   ├── signUp/
│   │   │   └── signUp.cy.js                    # Sign up UI tests
│   │   └── transactions/
│   │       ├── transactions-happyPath.cy.js     # Send payment E2E flow
│   │       └── transactions-requestFlow.cy.js  # Request money E2E flow
│   ├── fixtures/
│   │   └── users.json                          # Test user data
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── NewTransactionPage.js
│   │   ├── SideBarMenu.js
│   │   ├── SignUpPage.js
│   │   └── TransactionDetailPage.js
│   └── support/
│       ├── commands.js                         # cy.login(), cy.signUp()
│       └── e2e.js
└── cypress.config.js
```

---

## What Is Tested

### Authentication
- Login visibility and UI elements
- Valid login redirects to home
- Invalid username and password error messages
- Password length validation

### Sign Up
- All fields visible with required attributes
- New user registration and redirect
- Login as newly registered user
- Password mismatch validation
- Required field error message

### Transaction Flows (E2E — multi-user)
- Send payment: verify sender balance decreases and receiver balance increases
- Capture transaction ID from API response and verify it appears in receiver's account
- Request money: requester and payer balances verified after acceptance
- Reject flow: skipped due to backend bug (see below)

### API Tests — Happy Path
- `POST /transactions` payment: status `complete`, amount converted to cents
- `POST /transactions` request: status `pending`, requestStatus `pending`
- `PATCH /transactions/:id` accept: status changes to `complete`, requestStatus to `accepted`
- `PATCH /transactions/:id` reject: skipped due to backend bug (see below)

### API Tests — Error Handling
- `401 Unauthorized`: unauthenticated request returns correct status and error body
- `422 Unprocessable Entity`: missing required fields returns validation error array
- `422` for negative amount: skipped due to backend bug
- `422` for zero amount: skipped due to backend bug
- `404` for non-existent transaction: skipped due to backend bug

---

## Bugs Found

| # | Description | Type | Status |
|---|-------------|------|--------|
| 1 | Reject button transfers money instead of rejecting | Backend | Skipped — `it.skip()` |
| 2 | Negative transaction amounts accepted (should return 422) | Backend | Skipped — `it.skip()` |
| 3 | Zero amount accepted (should return 422) | Backend | Skipped — `it.skip()` |
| 4 | Non-existent transaction ID returns 500 instead of 404 | Backend | Skipped — `it.skip()` |

Bug confirmation method: `cy.intercept()` was used to inspect request and response bodies, confirming the frontend sends correct payloads and the bug lives in the backend.

---

## Key Techniques

- **Page Object Model (POM)** — all selectors isolated in page classes
- **cy.intercept()** — spy on POST and PATCH requests to capture IDs and inspect payloads
- **cy.session()** — cache login state across tests with validate option for db:seed compatibility
- **cy.request()** — direct API calls for balance verification and pure API tests
- **db:seed** — database reset before each test via custom Cypress task using axios
- **Multi-user flows** — login/logout sequences with separate aliases for each user's ID and balance
- **failOnStatusCode: false** — intentional error response testing
- **deep.eq** — full object and array comparison for validation error bodies
- **it.skip()** — documented bug tests with correct assertions preserved

---

## How to Run Locally

**Prerequisites:** Node.js, npm, yarn

**1. Start the app**
```bash
cd cypress-realworld-app
yarn install
yarn start
```

**2. Run tests**
```bash
cd my-cypress-project
npm install
npx cypress open
```

Or headless:
```bash
npx cypress run
```

---

## CI/CD

Tests run automatically on every push to `main` via GitHub Actions. The workflow installs dependencies, starts both the frontend (port 3000) and backend (port 3001), waits for both servers to be ready, then runs the full test suite.

[View workflow runs](https://github.com/dasha12345-s/qa-portfolio/actions)
