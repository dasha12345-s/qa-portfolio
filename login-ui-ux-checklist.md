# Login UI / UX Checklist 

This table ensures the **Login form** meets usability, accessibility, and UI/UX requirements.

---

### UI Cases

| ID    | Check Item | Expected Result | Actual Result |
|-------|------------|-----------------|---------------|
| UI-01 | Logo and branding visible and aligned | Logo is visible and properly aligned on all devices | |
| UI-02 | Username/email and password fields labeled | Both fields have clear labels above or inside inputs | |
| UI-03 | Login button alignment | Button is visible, aligned under inputs, and enabled only with valid inputs | |
| UI-04 | Links visible and working (“Forgot password?”, “Sign up”, “Log in”) | All links visible, clickable, and redirect correctly | |
| UI-05 | Consistent font/colors/spacing | Layout follows design system across browsers and devices | |
| UI-06 | Email field validation | Invalid format shows inline error; valid format accepted | |
| UI-07 | Password masking | Input characters are hidden by default | |
| UI-08 | Show/Hide password toggle | Toggle displays plain text securely; hides again on click | |
| UI-09 | Tab order | Tab key cycles logically: email → password → login → links | |
| UI-10 | Autofill/Remember Me | Browser autofill works; “Remember Me” persists session | |
| UI-11 | Copy/paste in password field | Copy/paste blocked if specified by requirements | |
| UI-12 | Inline validation empty fields | Empty inputs trigger inline error before submission | |
| UI-13 | Error message clarity | Errors are clear, user-friendly, no technical codes shown | |
| UI-14 | Generic error invalid credentials | “Invalid username or password” shown; no user/email enumeration | |
| UI-15 | Lockout/CAPTCHA | After N failed attempts, user is prompted with CAPTCHA or lockout message | |
| UI-16 | Responsive layout | Page scales properly on desktop, tablet, and mobile | |
| UI-17 | No element overlap <400px | Elements remain aligned; no text cut off | |
| UI-18 | Mobile touch targets | Buttons/links large enough for finger tapping | |
| UI-19 | Orientation change | Portrait ↔ landscape does not break layout | |
| UI-20 | Cross-browser | Works correctly on Chrome, Firefox, Safari, Edge | |
| UI-21 | Cross-device | Works correctly on iOS Safari & Android Chrome | |
| UI-22 | Browser-specific quirks | Autofill styles, focus outlines consistent across browsers | |

---

### UX Cases

| ID    | Check Item | Expected Result | Actual Result |
|-------|------------|-----------------|---------------|
| UX-01 | Loading indicator | Spinner/progress bar shown during API request | |
| UX-02 | Prevent duplicate submissions | Login button disabled after click to prevent multiple requests | |
| UX-03 | Session timeout warning | User sees warning before forced logout (if supported) | |
| UX-04 | Redirect after login (deep links) | User redirected to intended target page (e.g., `/settings`) after login, not just dashboard | |