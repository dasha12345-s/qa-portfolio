# Playwright Real World App — QA Automation Test Suite

![Playwright Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/playwright.yml/badge.svg)

## Project Summary

End-to-end Playwright + TypeScript automation suite for the Cypress Real World App (RWA), a production-like banking/payment demo application.
The suite includes 335 local test executions across UI, API, mocked network, and cross-browser layers. It covers payment flows, multi-user balance verification, validation behavior, and security edge cases. GitHub Actions runs 67 Chromium tests on every push to keep feedback fast.
Application defects are documented in automated tests with `test.fail()` and supported by detailed bug reports in `docs/bug-reports/`.

## Application Under Test

The application under test is the Cypress Real World App, a production-like banking/payment demo application originally provided as an open-source project:

`https://github.com/cypress-io/cypress-realworld-app`

For this portfolio, I intentionally kept the automation suite in a separate folder instead of restructuring the application source code. My focus was on designing and documenting the QA automation strategy around an existing application, not on modifying the application itself.

The Playwright suite is organized separately to make the test architecture, fixtures, page objects, API coverage, network mocking, and CI strategy easier to review as standalone QA automation work.


## What This Project Demonstrates

- Design automation coverage around business-critical flows
- Validate payment behavior through both UI and API layers
- Work with multiple authenticated users using isolated browser contexts
- Reuse authentication state with Playwright `storageState`
- Reduce duplication using custom fixtures and Page Object Models
- Simulate server errors and authorization failures with `page.route()`
- Keep CI fast while preserving full local cross-browser coverage
- Document product defects directly in automated tests

## Tech Stack

`Playwright` · `TypeScript` · `Node.js` · `GitHub Actions` · `Page Object Model` · `REST API`

## Test Coverage

| Area | Coverage |
|------|----------|
| Authentication | Sign-in, sign-up, validation, session handling |
| Transaction Flows | Send payment, request money, accept/reject — multi-user balance verification |
| Transaction Detail | Display fields, comment interaction |
| Bank Accounts | Create, delete, validation — empty, invalid, length |
| User Settings | Update profile, required errors, format errors |
| Notifications | Incoming payment notification, dismiss |
| API Testing | Payment and request-money lifecycle, including accept/reject and balance verification; security — 401, 422 validation |
| Network Mocking | Empty state, server error, loading state, mock 401/403 security scenarios |

## Architecture

```text
playwrightRealWorldAppTests/
├── docs/
│   └── bug-reports/
│       ├── BUG-001-empty-password-no-error.md
│       ├── BUG-002-negative-amount-accepted.md
│       ├── BUG-003-zero-amount-accepted.md
│       ├── BUG-004-reject-request-balance-not-restored.md
│       ├── BUG-005-short-routing-number-returns-200.md
│       └── BUG-006-settings-save-broken-firefox-webkit.md
├── .auth/
│   ├── user1.json
│   └── user2.json
├── tests/
│   ├── api/
│   │   ├── securityAPI.spec.ts
│   │   └── transactionAPI.spec.ts
│   ├── auth/
│   │   ├── auth.spec.ts
│   │   └── signUp.spec.ts
│   ├── bankAccounts/
│   │   └── bankAccounts.spec.ts
│   ├── mocking/
│   │   └── mockingTests.spec.ts
│   ├── notifications/
│   │   └── notifications.spec.ts
│   ├── pages/
│   │   ├── BankAccountsPage.ts
│   │   ├── HomePage.ts
│   │   ├── NewBankAccountPage.ts
│   │   ├── NewTransactionPage.ts
│   │   ├── NotificationsPage.ts
│   │   ├── SideMenuPage.ts
│   │   ├── SignInPage.ts
│   │   ├── SignUpPage.ts
│   │   ├── TransactionDetailPage.ts
│   │   └── UserSettingsPage.ts
│   ├── transactions/
│   │   ├── newTransaction.spec.ts
│   │   ├── transactionDetail.spec.ts
│   │   ├── transactionFeeds.spec.ts
│   │   └── transactionFlow.spec.ts
│   ├── userSettings/
│   │   └── userSettings.spec.ts
│   ├── fixtures.ts
│   └── helpers.ts
├── global-setup.ts
├── playwright.config.ts
├── package.json
└── package-lock.json
```

The suite is organized around application areas and reusable test infrastructure:

* **Page Object Model** — page objects are stored in `tests/pages/`; locators are exposed as getters, keeping raw selectors out of test files
* **Custom fixtures** — `tests/fixtures.ts` provides `loggedInPage`, `secondUserPage`, and `userIds`, enabling multi-user testing without duplicating authentication logic
* **Global setup** — `global-setup.ts` pre-authenticates two users before the suite runs and saves authentication state to `.auth/user1.json` and `.auth/user2.json`
* **Reusable helpers** — `tests/helpers.ts` contains `getBalance()`, `getBalanceViaAPI()`, and `getUserId()`, reused across UI and API specs
* **Smoke and regression tags** — tests can be filtered with `--grep @smoke` or `--grep @regression`
* **Cross-browser projects** — the full local suite runs across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari
* **Known defect annotations** — `test.fail()` is used to document known app bugs while keeping the suite green

Key techniques used: `page.route()` · `route.fulfill()` · `storageState` · multi-context fixtures · `test.fail()` · `test.step()` · `@smoke` / `@regression` tags · `globalSetup`

This structure keeps tests readable, reduces duplication, and allows critical business flows to be validated through both UI and API layers.

## Automation Design Decisions

### Why `global-setup` is used for authentication

The suite uses `global-setup.ts` to authenticate users once before test execution and save their sessions with Playwright `storageState`.

This avoids repeating the login flow in every test, reduces execution time, and keeps tests focused on the behavior they are actually validating. It also makes multi-user scenarios easier to maintain because User1 and User2 can run in separate authenticated browser contexts.

### Why `test.fail()` is used instead of `test.skip()`

Known application bugs are marked with `test.fail()` instead of being skipped.

This keeps the defect visible in the automated suite while still allowing CI to stay green. If the application bug is fixed and the test starts passing, Playwright reports that the expected failure no longer fails, which signals that the annotation should be removed.

This approach tracks real product defects without hiding test coverage.

## CI Strategy

### CI pipeline

The CI pipeline runs the Chromium project only to keep feedback fast and stable on every push.

- CI: Chromium only, 67 tests, approximately 4 minutes per push
- Local full suite: 335 test executions across 5 browser/device projects, approximately 15 minutes
- Cross-browser coverage is kept local because the application has known browser-specific bugs

### Scope

The suite covers the following application areas:
 
Authentication · Sign-up · Transactions · Bank accounts · User settings · Notifications · API lifecycle · Security and authorization · Network failure states

### Test levels

- UI end-to-end tests
- API integration tests
- Mocked network tests
- Cross-browser checks

### Risk-based prioritization

Highest-priority coverage focuses on:

1. Payment creation
2. Request/accept/reject lifecycle
3. Balance updates
4. Unauthorized access
5. Validation errors
6. Session expiry behavior

### Known limitations

**Test suite limitations:**

- Test data depends on the application seed state
- Some application bugs are documented with `test.fail()` so the suite can stay green while defects remain visible
- Full cross-browser execution is kept local; CI runs Chromium only to keep feedback fast on every push

**Known RWA demo app limitations found during testing:**

- Authentication is not enforced consistently across API endpoints; unauthenticated and cross-user requests are not always rejected with `401` or `403`
- The frontend does not redirect users to sign-in after a mocked `401` response, so session expiry is not handled consistently

## Known Bugs Found

| Test file | Defect | Expected Result | Actual Result |
|---|---|---|---|
| `auth/auth.spec.ts` | Empty password validation is missing | Required field error is displayed | No error message appears |
| `transactions/newTransaction.spec.ts` | Negative amount is accepted | Negative amount is rejected | Transaction is submitted |
| `transactions/newTransaction.spec.ts` | Zero amount is accepted | Zero amount is rejected | Transaction is submitted |
| `transactions/transactionFlow.spec.ts` | Reject request does not restore sender balance | Sender balance returns to previous amount | Balance remains changed |
| `api/transactionAPI.spec.ts` | Reject request does not restore sender balance at API level | API restores balance after rejection | Balance remains incorrect |
| `api/securityAPI.spec.ts` | Short routing number returns `200` | API returns `422` validation error | API returns `200` |
| `userSettings/userSettings.spec.ts` | Save button is non-functional in Firefox/WebKit | Profile changes are saved | Save action does not work |
| `mocking/mockingTests.spec.ts` | No redirect on mocked `401` response | User is redirected to sign-in | User remains on the page |

## How to Run

Prerequisite: the Cypress RealWorld App must be running locally on ports `3000` and `3001`.

```bash
# install dependencies
npm install

# install Playwright browsers
npx playwright install

# run the full local suite
npx playwright test

# run Chromium only, same strategy as CI
npx playwright test --project=chromium

# run smoke tests
npx playwright test --grep @smoke --project=chromium

# run regression tests
npx playwright test --grep @regression --project=chromium

# open the Playwright HTML report
npx playwright show-report
```

## Test Reports / Screenshots

The Playwright HTML report is generated locally after test execution and can be opened with:

```bash
npx playwright show-report
```

On failure, Playwright stores screenshots, videos, and traces in `test-results/`, depending on the configured reporter and trace/video settings.

