# Saucedemo — Full E2E Test Suite

![Cypress Tests](https://github.com/dasha12345-s/qa-portfolio/actions/workflows/cypress.yml/badge.svg)

**Cypress** · **JavaScript** · **Page Object Model** · **CI/CD**

---

## Overview

34-test Cypress suite covering the full user journey on [saucedemo.com](https://www.saucedemo.com) — a demo e-commerce platform. Tests span login, product catalog, cart, checkout, and sorting — including edge cases for the "Problem User" account using API stubbing.

---

## Coverage

| Area | Tests |
|------|-------|
| Login | Valid login, invalid credentials, locked-out user |
| Product Page | Sorting, product details, Problem User image bug |
| Cart | Add/remove items, cart badge count |
| Checkout | Full checkout flow, form validation |
| Navigation | Page redirects, back button behavior |

---

## Key Techniques

- **Page Object Model** — all selectors isolated in page classes
- `cy.intercept()` **stubbing** — simulate Problem User API responses
- **JSON fixtures** — data-driven test cases
- **GitHub Actions** — CI pipeline with screenshot and video artifacts on failure

---

## How to Run

```bash
cd saucedemo-full-suite
npm install
npx cypress open
```

Headless:

```bash
npx cypress run
```

---

## CI/CD

Tests run automatically on every push to `main` via GitHub Actions.

[View workflow runs](https://github.com/dasha12345-s/qa-portfolio/actions)
