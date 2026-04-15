import loginPage from "../pages/LoginPage"
import signUpPage from "../pages/SignUpPage"

Cypress.Commands.add('login', (userType = 'defaultUser', shouldClick = true) =>{
    cy.fixture('users').then(users => {
        const user = users[userType]

        cy.intercept('POST', '**/login').as('loginResponse')

        cy.visit('/')

        loginPage.username.type(user.username)
        loginPage.password.type(user.password).blur()

        if (shouldClick) {
        loginPage.button.click();
    
        cy.wait('@loginResponse').then(interception => {
            const id =  interception.response.body.user.id
            cy.wrap(id).as('userId')
        })

        cy.url().should('not.include', '/signin')
    }
    })
})

Cypress.Commands.add('signUp', (shouldClick = true) => {
    const uniqueUsername = `testuser_${Date.now()}`
    const staticPassword = 'password123'

    cy.visit('/transaction/new')

    signUpPage.lastName.type('TestUser').blur()
    signUpPage.firstName.type('Best').blur()
    signUpPage.userName.type(uniqueUsername).blur()
    signUpPage.password.type(staticPassword, { log: false }).blur()
    signUpPage.confirmPassword.type(staticPassword, { log: false }).blur()

    if (shouldClick) {
        signUpPage.button.click();
    }

    return cy.wrap(uniqueUsername).as('registeredUser')
})
