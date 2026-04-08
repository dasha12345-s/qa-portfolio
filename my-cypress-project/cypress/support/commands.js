import loginPage from "../pages/LoginPage"
import signUpPage from "../pages/SignUp"

Cypress.Commands.add('login', (userType = 'defaultUser', shouldClick = true) =>{
    cy.fixture('users').then(users => {
        const user = users[userType]

        loginPage.username.type(user.username)
        loginPage.password.type(user.password).blur()

        if (shouldClick) {
        loginPage.button.click();
    }
    })
})

Cypress.Commands.add('signUp', (shouldClick = true) => {
    const uniqueUsername = `testuser_${Date.now()}`
    const staticPassword = 'password123'

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
