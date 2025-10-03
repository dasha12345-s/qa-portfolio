# Login UI / UX Checklist

This checklist ensures that the **Login form** meets usability, accessibility, and UI requirements across different devices and environments.

---

## 1. General Layout
- [ ] Logo and branding visible and aligned
- [ ] Username/email and password fields clearly labeled
- [ ] Login button visible and aligned under inputs
- [ ] Links ("Forgot password?" , "Sign up", "Log in") visible and working
- [ ] Consistent font, colors, and spacing across all elements

---

## 2. Field Behavior
- [ ] Email field validates format instantly (e.g., `user@domain.com`)
- [ ] Password field masks input characters by default
- [ ] Password field provides option to “show/hide” value securely
- [ ] Tab order moves logically (email → password → login → links)
- [ ] Autofill/Remember Me works correctly
- [ ] Copy/paste disabled in password field (security requirement, if specified)

---

## 3. Error Handling
- [ ] Inline validation for empty fields
- [ ] Error messages clear and consistent (no “technical” codes shown to user)
- [ ] Generic error for invalid credentials (no user enumeration)
- [ ] Lockout / CAPTCHA error message shown after N failed attempts

---

## 4. Responsiveness
- [ ] Page adjusts correctly on mobile, tablet, and desktop
- [ ] Elements remain aligned (no overlap or cut-off text at <400px width)
- [ ] Touch targets (buttons, links) large enough for mobile use
- [ ] Orientation change (portrait ↔ landscape) does not break layout

---

## 5. Cross-Browser & Device
- [ ] Tested on Chrome, Firefox, Safari, Edge (latest versions)
- [ ] Tested on iOS Safari, Android Chrome
- [ ] No browser-specific issues (e.g., autofill styles, focus outlines)

---

## 6. Additional UX
- [ ] Loading indicator shown while request is processing
- [ ] Prevent duplicate submissions (disable button on click)
- [ ] Session timeout warning message visible (if applicable)
- [ ] Redirect after login preserves intended target (deep links work)
