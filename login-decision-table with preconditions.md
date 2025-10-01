# Decision Table – Login with Preconditions

### Conditions  
- **PC** = Precondition OK (system available, account active, not blacklisted)  
- **EV** = Email valid format  
- **PV** = Password length valid (8–16)  
- **LK** = Account locked  
- **AE** = Attempts exceeded (rate-limited)  
- **VF** = Email verified  
- **PE** = Password expired  
- **CR** = Credentials correct  
- **MF** = MFA required  

### Actions  
- **A1** = Block (maintenance/disabled/blacklist)  
- **A2** = Field validation error  
- **A3** = Locked message  
- **A4** = CAPTCHA / “Too many attempts”  
- **A5** = Verify email prompt  
- **A6** = Force password reset  
- **A7** = Generic auth error (401)  
- **A8** = MFA challenge  
- **A9** = Success → dashboard  

---

### Decision Table

| Rule | PC | EV | PV | LK | AE | VF | PE | CR | MF | Action |
|------|----|----|----|----|----|----|----|----|----|--------|
| R1   | N  | –  | –  | –  | –  | –  | –  | –  | –  | A1 (Block precondition) |
| R2   | Y  | N  | –  | –  | –  | –  | –  | –  | –  | A2 (Invalid email) |
| R3   | Y  | Y  | N  | –  | –  | –  | –  | –  | –  | A2 (Invalid password length) |
| R4   | Y  | Y  | Y  | Y  | –  | –  | –  | –  | –  | A3 (Locked) |
| R5   | Y  | Y  | Y  | N  | Y  | –  | –  | –  | –  | A4 (Rate limit) |
| R6   | Y  | Y  | Y  | N  | N  | N  | –  | –  | –  | A5 (Verify email) |
| R7   | Y  | Y  | Y  | N  | N  | Y  | Y  | –  | –  | A6 (Password expired) |
| R8   | Y  | Y  | Y  | N  | N  | Y  | N  | N  | –  | A7 (Wrong credentials) |
| R9   | Y  | Y  | Y  | N  | N  | Y  | N  | Y  | Y  | A8 (MFA challenge) |
| R10  | Y  | Y  | Y  | N  | N  | Y  | N  | Y  | N  | A9 (Success) |