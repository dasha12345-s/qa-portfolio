class LoginPage {
    get logo()        { return cy.get('.login_logo') }
    get username()    { return cy.get('[data-test="username"]') }
    get password()    { return cy.get('[data-test="password"]') }
    get loginButton() { return cy.get('[data-test="login-button"]') }
    get errorMessage(){ return cy.get('[data-test="error"]') }

  visit(){
    cy.visit('/')
  }

  login(username, password){
    this.username.type(username)
    this.password.type(password)
    this.loginButton.click()
  }
}

export default new LoginPage()