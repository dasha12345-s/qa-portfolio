# Login SQL / DB Validation

This document contains **SQL queries** to validate login functionality at the database level.  
They are used to confirm correct state changes after login attempts, lockouts, password resets, and MFA.  

---

## 1. Login Attempts Tracking

| ID       | Validation | SQL Query | Expected Result |
|----------|------------|-----------|-----------------|
| DB-01 | Check login attempts count after failed logins | ```sql SELECT username, login_attempts, last_attempt_time FROM users WHERE username = 'testuser@example.com'; ``` | `login_attempts` increases by 1 on each failed attempt |
| DB-02 | Reset attempts after successful login | ```sql SELECT username, login_attempts FROM users WHERE username = 'testuser@example.com'; ``` | `login_attempts` resets to `0` after successful login |

---

## 2. Account Lockout

| ID       | Validation | SQL Query | Expected Result |
|----------|------------|-----------|-----------------|
| DB-03 | Verify account locked after N failed attempts | ```sql SELECT username, account_status, locked_at FROM users WHERE username = 'testuser@example.com'; ``` | `account_status = 'LOCKED'` and `locked_at` timestamp set |
| DB-04 | Unlock account by admin action | ```sql SELECT username, account_status FROM users WHERE username = 'testuser@example.com'; ``` | After unlock, `account_status = 'ACTIVE'` |

---

## 3. Password Expiry / Reset

| ID       | Validation | SQL Query | Expected Result |
|----------|------------|-----------|-----------------|
| DB-05 | Check password expired flag | ```sql SELECT username, pwd_expired, pwd_last_updated FROM users WHERE username = 'testuser@example.com'; ``` | `pwd_expired = 1` for expired accounts |
| DB-06 | Verify reset clears expiry flag | ```sql SELECT pwd_expired FROM users WHERE username = 'testuser@example.com'; ``` | After reset, `pwd_expired = 0` and `pwd_last_updated` updated |

---

## 4. Email Verification

| ID       | Validation | SQL Query | Expected Result |
|----------|------------|-----------|-----------------|
| DB-07 | Check unverified account | ```sql SELECT username, email_verified, verification_token FROM users WHERE username = 'testuser@example.com'; ``` | `email_verified = 0` until token clicked |
| DB-08 | Verify email after link clicked | ```sql SELECT email_verified FROM users WHERE username = 'testuser@example.com'; ``` | `email_verified = 1` after verification |

---

## 5. MFA (Multi-Factor Authentication)

| ID       | Validation | SQL Query | Expected Result |
|----------|------------|-----------|-----------------|
| DB-09 | Check MFA enabled flag | ```sql SELECT username, mfa_enabled, last_mfa_challenge FROM users WHERE username = 'testuser@example.com'; ``` | `mfa_enabled = 1` if user enrolled |
| DB-10 | Verify MFA challenge timestamp updates | ```sql SELECT last_mfa_challenge FROM users WHERE username = 'testuser@example.com'; ``` | Timestamp updates each time MFA code is sent |

---

## 6. Login Audit Trail

| ID       | Validation | SQL Query | Expected Result |
|----------|------------|-----------|-----------------|
| DB-11 | Retrieve login audit logs | ```sql SELECT user_id, attempt_time, ip_address, success FROM login_audit WHERE user_id = 12345 ORDER BY attempt_time DESC; ``` | Each attempt logged with timestamp, IP, and result |
| DB-12 | Confirm failed attempts logged | ```sql SELECT * FROM login_audit WHERE user_id = 12345 AND success = 0; ``` | All failed attempts are logged correctly |
