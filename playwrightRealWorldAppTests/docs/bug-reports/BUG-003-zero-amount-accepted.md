# BUG-003: Zero amount is accepted without validation error

**Severity:** High  
**Status:** Open  
**Affected area:** Transactions / New Transaction  
**Environment:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari  
**Automated test:** `tests/transactions/newTransaction.spec.ts`  
**Test annotation:** `test.fail()`  

## Summary

The New Transaction form accepts zero as a valid amount and does not display a validation error. A transaction with a zero amount has no financial meaning and should be rejected at the form level.

## Steps to Reproduce

1. Log in and navigate to the New Transaction page
2. Search for and select a recipient user
3. Enter `0` in the amount field
4. Click **Pay** or **Request**

## Expected Result

The amount field should display a validation error rejecting zero values and prevent submission.. Expected message: `Amount must be greater than 0`

## Actual Result

No validation error is displayed. The form accepts zero and proceeds as if it were valid input.

## Impact

A user could submit a meaningless zero-amount transaction, polluting transaction history and potentially causing confusion around account balances.

## Notes

- Reproduced consistently across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari
- Annotated with `test.fail()` in the automated suite — CI remains green while the defect is tracked
- Negative amount has the same root cause and is tracked separately in BUG-002