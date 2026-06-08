# BUG-002: Negative amount is accepted without validation error

**Severity:** High  
**Status:** Open  
**Affected area:** Transactions / New Transaction 
**Environment:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari  
**Automated test:** `tests/transactions/newTransaction.spec.ts`  
**Test annotation:** `test.fail()`  

## Summary

The New Transaction form accepts a negative amount value and does not display a validation error. A payment or request with a negative amount should be rejected at the form level before submission.

## Steps to Reproduce

1. Log in and navigate to the New Transaction page
2. Search for and select a recipient user
3. Enter a negative value in the amount field, for example `-10`
4. Click **Pay** or **Request**

## Expected Result

The amount field should display a validation error rejecting negative values and prevent submission. Expected message: `Amount must be greater than 0`

## Actual Result

No validation error is displayed. The form accepts the negative amount and proceeds as if it were valid input.

## Impact

A user could submit a transaction with a negative amount, potentially causing incorrect balance calculations or unexpected application behavior. This represents a data integrity risk.

## Notes

- Reproduced consistently across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari
- Annotated with `test.fail()` in the automated suite — CI remains green while the defect is tracked
- Zero amount has the same issue and is tracked separately in BUG-003
- This issue should be validated at both UI and API levels