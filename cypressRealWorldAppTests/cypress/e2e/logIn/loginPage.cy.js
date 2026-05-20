import loginPage from "../../pages/LoginPage"

describe('Login page',() => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('logo should be visible', () => {
        loginPage.logo.should('be.visible')
    })

    it('inputs, links and buttons should be visible', () => {
        loginPage.username.should('be.visible')
        loginPage.password.should('be.visible')
        loginPage.button.should('be.visible')
        loginPage.signUp.should('be.visible')
        loginPage.rememberMeCheckbox.should('be.visible')
    })

    it('should log in with valid credentials', () => {
        cy.login('defaultUser')
        cy.get('[data-test="main"]').should('be.visible')
    })

    it('sign up link should redirect to sign up page', () => {
        loginPage.signUp.click()
        cy.url().should('include', '/signup')
    })
})

describe('Login page - error messages', () => {
     beforeEach(() => {
        cy.visit('/')
    })

    it('should throw an error if the username is invalid', () => {
        cy.fixture('users').then(users => {
        loginPage.login(users.invalidUsername.username, users.invalidUsername.password)
        loginPage.errorMessage.should('be.visible')
    })
    })

    it('should throw an error if the password is invalid', () => {
        cy.fixture('users').then(users => {
        loginPage.login(users.invalidPassword.username, users.invalidPassword.password)
        loginPage.errorMessage.should('be.visible')
    })

    it('should throw an error if the password length is less than 4', () => {
       cy.fixture('users').then(users => {
        loginPage.password.type(users.shortPassword.password).blur()
        loginPage.passwordLengthError.should('contain', 'Password must contain at least 4 characters')
    })
    })
    })
})