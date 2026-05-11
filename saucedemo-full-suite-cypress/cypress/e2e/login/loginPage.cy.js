import loginPage from '../../pages/LoginPage'

describe('Login Page', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should show the page heading', () => {
    loginPage.logo.should('be.visible').and('contain.text', 'Swag Labs')
  })

  it('username input should be visible', () => {
    loginPage.username.should('be.visible')
  })

  it('password input should be visible', () => {
    loginPage.password.should('be.visible')
  })

  it('login-button input should be visible', () => {
    loginPage.loginButton.should('be.visible')
  })
})

describe('Login Page - error scenarios', () => {

   it('should throw an error if log in with invalid password', () => {
   cy.login('invalid_password')

    loginPage.errorMessage.should('contain.text', 'Username and password do not match')
  })

  it('should trow an error if log in with invalid username', () => {
    cy.login('invalid_username')
    loginPage.errorMessage.should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
  })

  it('should throw an error if log in with locked out user', () => {
    cy.login('locked')
    loginPage.errorMessage.should('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
  })

})