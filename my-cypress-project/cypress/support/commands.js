import loginPage from "../pages/LoginPage"

Cypress.Commands.add('login', (userType = 'defaultUser', shouldClick = true) =>{
    cy.fixture('users').then(users => {
        const user = users[userType]

    cy.visit('/')
        loginPage.username.type(user.username)
        loginPage.password.type(user.password).blur()

        if (shouldClick) {
        loginPage.button.click();
    }
    })
})