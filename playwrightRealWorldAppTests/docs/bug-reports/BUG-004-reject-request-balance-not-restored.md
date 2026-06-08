# BUG-004: Rejecting a payment request does not restore the sender's balance

**Severity:** High  
**Status:** Open  
**Affected area:** Transactions / Payment Request Flow  
**Environment:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari  
**Automated tests:** `tests/transactions/transactionFlow.spec.ts`, `tests/api/transactionAPI.spec.ts`  
**Test annotation:** `test.fail()`

## Summary

When a payment request is rejected, the sender's balance is not restored to its original value. The balance remains reduced as if the payment request had been accepted, even though the recipient rejected it.

## Steps to Reproduce

1. Log in as User1
2. Capture User1's current account balance
3. Create a payment request from User1 to User2 for a specific amount, for example `$50`
4. Log in as User2
5. Open the pending payment request
6. Click **Reject**
7. Log back in as User1
8. Check User1's account balance

## Expected Result

User1's balance should be restored to the original amount after User2 rejects the payment request.
Rejecting a request should not reduce the sender's balance or create any completed financial movement between users.

## Actual Result

User1's balance remains reduced by the requested amount after User2 rejects the request. The funds are not restored to the sender's account.

## Impact

This is a financial data integrity issue. A rejected payment request still affects the sender's balance, which can lead to incorrect account information, user confusion, and loss of trust in transaction accuracy.

## Notes

- Reproduced consistently across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari
- Reproduced at both UI level in `transactionFlow.spec.ts` and API level in `transactionAPI.spec.ts`
- Accept request flow works correctly — balances update as expected when the request is accepted
- Annotated with `test.fail()` in the automated suite so CI remains green while the defect is tracked
