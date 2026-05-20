class SignUp{
    get logo() {return cy.get('.SignUpForm-logo')}
    get firstName() {return cy.get('#firstName')}
    get lastName() {return cy.get('#lastName')}
    get userName() {return cy.get('#username')}
    get password() {return cy.get('#password')}
    get confirmPassword() {return cy.get('#confirmPassword')}
    get button() {return cy.get('[data-test="signup-submit"]')}
    get signInLink() {return cy.contains('Have an account? Sign In')}
    get confirmPasswordError() {return cy.get('#confirmPassword-helper-text')}

      visit(){
        cy.visit('/signup')
    }

    signup(firstName, lastName, userName, password, confirmPassword){
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.userName.type(userName)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.button.click()
    }
}

export default new SignUp()
