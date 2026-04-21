import loginPage from "../pages/LoginPage"
import signUpPage from "../pages/SignUpPage"



Cypress.Commands.add('login', (userType = 'defaultUser') => {
    cy.session(userType, () => {
        cy.fixture('users').then(users => {
            const user = users[userType]
            cy.visit('/')

            loginPage.username.type(user.username)
            loginPage.password.type(user.password).blur()
            loginPage.button.click();
            cy.url().should('not.include', '/signin')
        })
    },
        {
    validate() {
        cy.request('GET', 'http://localhost:3001/checkAuth')
    }
    })
    cy.request('GET','http://localhost:3001/checkAuth').then((response) => {
        cy.wrap(response.body.user.id).as('userId');
    })
    cy.visit('/')
    }
)


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
