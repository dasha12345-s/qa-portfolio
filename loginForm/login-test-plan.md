# Test Plan – Login Feature

This document defines the test strategy, scope, objectives, and deliverables for validating the Login functionality of a web application, covering UI, API, database, and security aspects.

## 1. Scope
This plan covers testing of the Login feature for a web application.  
The feature allows existing users to authenticate using email/username and password, as well as Single Sign-On (SSO) for enterprise accounts.

In scope:
- UI login form
- API `/auth/login`
- Validation (client + server)
- Security-related checks for login
- DB/SQL verification for login attempts

Out of scope:
- Registration
- Forgot password / reset password
- MFA configuration flow
- User management
- Full performance testing of the whole system
- SSO configuration

## 2. Objectives
- Verify that only valid users can log in.
- Verify that invalid/blocked users cannot log in.
- Verify that UI, API, database, and security layers enforce the same rules and return consistent results for valid and invalid login attempts.
- Provide full traceability from requirements → test design → test cases → defects.

## 3. Test Items
- UI: Login page
- API: POST `/auth/login`
- DB: `users`, `login_attempts` tables

## 4. Test Approach
- **Functional**: positive + negative + boundary values.
- **API**: Postman collection execution with different data sets.
- **UI/UX**: as per `login-ui-ux-checklist.md`.
- **Security**: as per `login-security.md`.
- **DB**: as per `login-sql-validation.md`.
- **Automation**: Cypress tests for UI and functional use cases (`login-ui-ux-tests.cy.js`, `login-use-cases.cy.js`).

## 5. Test Types
- Smoke / Build verification - Basic checks to ensure the login page, API endpoint, and dependencies are available and functional before deeper testing begins.
- Functional - Verifying that the login process works according to requirements, including positive and negative scenarios for valid/invalid credentials.
- Validation/negative -  Ensuring proper input validation on both client and server sides, and verifying that the system handles incorrect, missing, or malicious data gracefully.
- Security-oriented checks - Checking password handling, data exposure, rate limits, and protection against unauthorized access or user enumeration.
- Cross-browser - Validating core login functionality and layout across major browsers (e.g., Chrome, Firefox, Safari).
- Regression (on changes in auth) - Re-running previously passed tests after authentication-related changes or deployments to confirm no new defects were introduced.
- Integration (UI ↔ API ↔ DB) - Verifying that all layers of the login flow (frontend form, API calls, and database records) interact correctly and maintain consistent data and responses.

## 6. Entry Criteria
- Login endpoint available in test env
- Test user accounts created (valid, invalid, locked, expired)
- Test data for SSO available (outOfScope)
- Postman collection imported

## 7. Exit Criteria
- 100% of planned test cases executed
- All critical/high defects fixed or have agreed workarounds
- Traceability matrix shows full coverage of requirements
- Test summary report prepared

## 8. Test Data

Test data is stored in `login-users.json` and represents various user states required to validate the login feature.

| User Type | Email | Purpose |
|------------|--------|----------|
| **Valid User** | `user@test.com` | Standard successful login scenario. |
| **5 Attempts User** | `user5@test.com` | Validate account lockout after multiple failed attempts. |
| **MFA User** | `mfa@test.com` | Verify multi-factor authentication flow (requires `mfaCode`). |
| **Locked User** | `locked@test.com` | Ensure system rejects logins for locked accounts. |
| **Unverified User** | `unverified@test.com` | Validate behavior for accounts pending email verification. |
| **Expired Password User** | `expired@test.com` | Confirm redirect or message for password expiration. |
| **Invalid User** | `invalid@test.com` | Negative test: wrong credentials should not authenticate. |

> Password for all users (unless otherwise noted): `Password123!`


## 9. Risks & Assumptions
- SSO flow depends on a 3rd-party IdP availability; if the IdP is down, SSO scenarios will be blocked.
- Rate-limiting / CAPTCHA / anti-brute-force rules may block automated or repeated runs and cause false failures.
- Different tenants/customers may have different password policies, which can lead to test failures that are not product defects.

## 10. Deliverables
- Executed Postman collection (functional + negative cases)
- Cypress execution report
- Defect reports (see `login-bug-reports.md`)
- Test summary report (see `login-test-summary-report.md`)
- Updated traceability matrix (see `login-traceability-matrix.md`)