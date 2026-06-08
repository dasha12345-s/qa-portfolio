# BUG-006: User settings Save button does not function in Firefox and WebKit

**Severity:** Medium  
**Status:** Open  
**Affected area:** User Settings  
**Environment:** Firefox, WebKit, Mobile Safari  
**Automated test:** `tests/userSettings/userSettings.spec.ts`  
**Test annotation:** `test.fail()`  

## Summary

The Save button on the User Settings page does not submit the form in Firefox and WebKit browsers. The button appears enabled after filling in the fields, but clicking it produces no response — the form is not submitted and no success or error feedback is shown.

## Steps to Reproduce

1. Open the application in Firefox or WebKit (Safari)
2. Log in and navigate to the User Settings page (`/user/settings`)
3. Update any field, for example change the first name
4. Click the **Save** button

## Expected Result

The form submits successfully, changes are persisted, and a confirmation is shown. Reloading the page should reflect the updated values.

## Actual Result

Clicking Save produces no visible response. The form is not submitted, no success message appears, and the changes are not persisted after page reload.

## Impact

Users on Firefox or Safari cannot update their profile information. This affects a significant portion of real-world users and makes the settings page non-functional on those browsers.

## Notes

- Confirmed working correctly on Chromium — issue is browser-specific
- Reproduced on both desktop Firefox/WebKit and mobile equivalents (Mobile Safari)
- Manual testing confirmed the issue is not limited to automated tests — the Save button genuinely does not work in these browsers
- Annotated with `test.fail()` in the automated suite — CI remains green while the defect is tracked