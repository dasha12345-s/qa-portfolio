class LoginPage{
    get logo() {return cy.get('.SignInForm-logo')}
    get username() {return cy.get('#username')}
    get password() {return cy.get('#password')}
    get button() { return cy.get('[data-test="signin-submit"]')}
    get rememberMeCheckbox(){return cy.get('[data-test="signin-remember-me"]')}
    get signUp() {return cy.get('[data-test="signup"]')}
    get errorMessage() {return cy.contains('Username or password is invalid')}
    get requiredName() {return cy.contains('Username is required')}
    get requiredPassword() {return cy.contains('Password is required')}
    get passwordLengthError() {return cy.get('#password-helper-text')}

    visit(){
        cy.visit('/')
    }

    login(username, password){
        this.username.type(username)
        this.password.type(password)
        this.button.click()
    }
}   

export default new LoginPage()