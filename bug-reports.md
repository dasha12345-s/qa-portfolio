# 🐞 Bug Reports (Jira-Style)

---

## Bug 1 — UI Bug (Login Page)

**Project**: Login Module  
**Issue Type**: Bug  
**Summary**: Login button misaligned on small screen widths  
**Priority**: Medium  
**Severity**: Minor  
**Status**: Open  
**Assignee**: Unassigned  
**Environment**:  
- OS: macOS Ventura, Windows 11  
- Browser: Chrome 118, Firefox 118  
- Build: v1.0.2-qa  
- Test Environment: Staging  

---

### 📝 Description
On smaller screen widths (<400px), the “Login” button shifts left and overlaps the password field, making the form hard to use on mobile devices.  

---

### ✅ Preconditions
- Browser window resized to mobile width (375px).  

---

### 🔄 Steps to Reproduce
1. Navigate to `/login`.  
2. Resize browser width to 375px (mobile view).  
3. Observe the alignment of the Login button.  

---

### 🎯 Expected Result
Login button remains centered and properly aligned under input fields at all screen sizes.  

---

### ⚠️ Actual Result
Login button shifts left and overlaps the password input field on screen widths <400px.  

---

### 📎 Attachments
- Screenshot of misaligned button.  

---

## Bug 2 — Functional / Integration Bug

**Project**: Login Module  
**Issue Type**: Bug  
**Summary**: “Forgot Password” link does not send reset email in staging  
**Priority**: High  
**Severity**: Major  
**Status**: Open  
**Assignee**: Unassigned  
**Environment**:  
- OS: Windows 11  
- Browser: Chrome 118  
- Build: v1.0.2-qa  
- Test Environment: Staging  

---

### 📝 Description
Password reset emails are not being sent when users click “Forgot Password”. Logs show 500 error from the email microservice.  

---

### ✅ Preconditions
- User account exists with a valid email.  

---

### 🔄 Steps to Reproduce
1. Go to `/login`.  
2. Click “Forgot Password?”.  
3. Enter a valid email and click “Submit”.  
4. Check mailbox.  

---

### 🎯 Expected Result
User receives a password reset email within 1–2 minutes, containing a secure reset link.  

---

### ⚠️ Actual Result
No reset email received after 10 minutes. Logs indicate `500 Internal Server Error` from email service.  

---

### 📎 Attachments
- Screenshot of logs (500 error).  

---

## Bug 3 — Authentication / Logout Bug

**Project**: Login Module  
**Issue Type**: Bug  
**Summary**: Session does not expire after logout (user can re-enter via browser back button)  
**Priority**: High  
**Severity**: Major  
**Status**: Open  
**Assignee**: Unassigned  
**Environment**:  
- OS: Windows 11, macOS Ventura  
- Browser: Chrome 118, Firefox 118  
- Build: v2.3.1-staging  
- Test Environment: Staging  

---

### 📝 Description
After clicking **Logout**, the session token is not invalidated. Users can press the **Back** button in the browser and regain access to authenticated pages without logging in again.  

---

### ✅ Preconditions
- User logged in successfully with valid credentials.  

---

### 🔄 Steps to Reproduce
1. Log in with valid credentials.  
2. Navigate to a secure page (e.g., `/dashboard`).  
3. Click **Logout**.  
4. Press the **Back** button in the browser.  

---

### 🎯 Expected Result
- Session should be terminated.  
- Pressing Back should redirect user to the login page.  
- No authenticated content should be displayed.  

---

### ⚠️ Actual Result
- User is able to see cached authenticated content after logout.  
- Session is still considered valid until browser refresh or timeout.  

---

### 📎 Attachments
- Screenshot/video showing dashboard accessible after logout.  

---

## Bug 4 — SSO / Integration Bug

**Project**: Login Module (SSO Integration)  
**Issue Type**: Bug  
**Summary**: SSO login fails with Google IdP when user denies permissions  
**Priority**: Medium  
**Severity**: Major  
**Status**: Open  
**Assignee**: Unassigned  
**Environment**:  
- OS: Windows 11  
- Browser: Chrome 118  
- Build: v2.4.0-qa  
- Test Environment: Staging  

---

### 📝 Description
When attempting to log in via Google SSO and the user **denies permissions** on the consent screen, the app crashes and shows a blank page instead of handling the error gracefully.  

---

### ✅ Preconditions
- Application configured with Google SSO integration.  
- Test user available with Google account.  

---

### 🔄 Steps to Reproduce
1. On the login page, click **“Sign in with Google”**.  
2. At the Google consent screen, click **“Cancel”** or **“Deny access”**.  
3. Observe the application behavior.  

---

### 🎯 Expected Result
- Application should display an error message: *“SSO login failed. Please try again or use standard login.”*  
- User should be redirected back to the login page.  

---

### ⚠️ Actual Result
- App shows a blank white page.  
- No message or redirection occurs.  

---

### 📎 Attachments
- Screenshot/video of blank page after denying SSO consent.  

---
