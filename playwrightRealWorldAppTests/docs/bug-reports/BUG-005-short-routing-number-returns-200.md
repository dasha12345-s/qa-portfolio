# BUG-005: Short routing number returns 200 instead of 422

**Severity:** Medium  
**Status:** Open  
**Affected area:** API / Bank Account Validation  
**Environment:** API  
**Automated test:** `tests/api/securityAPI.spec.ts`  
**Test annotation:** `test.fail()`  

## Summary

When a bank account is created via the API with a routing number shorter than the required 9 digits, the server returns a `200 OK` response instead of a `422 Unprocessable Entity`. The invalid data is accepted and persisted without any server-side validation error.

## Steps to Reproduce

1. Authenticate as a valid user
2. Send a `POST` request to `/bankaccounts` with a routing number shorter than 9 digits, for example `123`
3. Observe the response status code

## Expected Result

The server should reject the request with a `422 Unprocessable Entity` response and an error message indicating the routing number is invalid.

## Actual Result

The server returns `200 OK` and creates the bank account with the invalid routing number.

## Impact

Invalid bank account data can be persisted to the database, bypassing frontend validation entirely. Any integration relying on valid routing numbers (e.g. payment processing) could receive malformed data.

## Notes

- Reproduced via direct API call, bypassing the frontend form
- Frontend form correctly validates routing number length and blocks submission
- The gap between frontend and backend validation is the root cause
- Annotated with `test.fail()` in the automated suite — CI remains green while the defect is tracked