Cypress.Commands.add('login', (userType = 'standard') => {
    cy.fixture('users').then(users => {
        const user = users[userType]
        cy.visit('/')
        cy.get('[data-test="username"]').type(user.username)
        cy.get('[data-test="password"]').type(user.password)
        cy.get('[data-test="login-button"]').click()
    })
})
