describe('cy.intercept - error state testing', () => {
    it('should handle a 500 server error response', () => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
            statusCode:500,
            body: { message: 'Internal Server Error'}
        }).as('getUser500')

        cy.window().then(win => {
            win.fetch('https://jsonplaceholder.typicode.com/users/1')
        })

        cy.wait('@getUser500').then(interception => {
            expect(interception.response.statusCode).to.eq(500)
            expect(interception.response.body.message).to.eq('Internal Server Error')
        }) 
    })

    it('should return stubbed user data instead of real API', () => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1', {
            statusCode:200,
            body: {id: 1, name: 'Darya QA', email: 'darya@test.com'}
        }).as('getStubbedUser')

        cy.window().then(win => {
            win.fetch('https://jsonplaceholder.typicode.com/users/1')
        })

        cy.wait('@getStubbedUser').then(interception => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body.name).to.eq('Darya QA')
            expect(interception.response.body.email).to.eq('darya@test.com')
        })
    })

    it('should spy on a real API call without stubbing it', () => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/users/1').as('spyUser')

        cy.window().then(win => {
            win.fetch('https://jsonplaceholder.typicode.com/users/1')
        })

        cy.wait('@spyUser').then(interception => {
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body.id).to.eq(1)
            expect(interception.response.body.name).to.eq('Leanne Graham')
        })
    })
})