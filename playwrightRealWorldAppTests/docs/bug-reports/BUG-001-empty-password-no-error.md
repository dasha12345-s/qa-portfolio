# BUG-001: Empty password field does not show required-field validation

**Severity:** Medium  
**Status:** Open  
**Affected area:** Authentication / Sign In
**Environment:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari   
**Automated test:** `tests/auth/auth.spec.ts`  
**Test annotation:** `test.fail()`  

## Summary

The Sign In form does not display a validation message when the password field is left empty. The user receives no visible feedback explaining why sign-in cannot continue.

## Steps to Reproduce

1. Navigate to the Sign In page (`/signin`)
2. Enter a valid username, for example `Heath93`
3. Leave the password field empty
4. Click the **Sign In** button

## Expected Result

The password field should display a required-field validation error. 
Expected message: `Password is required`

## Actual Result

No validation message is displayed. There is no visual feedback indicating that the password field is required or empty.

## Impact

Users have no indication of why sign-in is not proceeding. This is especially confusing on first use — the user may repeatedly click Sign In or assume the app is broken.

## Notes

- Reproduced consistently across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari
- Annotated with `test.fail()` in the automated suite — CI remains green while the defect is tracked
- Username required-field validation works correctly; this issue is isolated to the password field