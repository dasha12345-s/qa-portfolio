describe('Transactions API - error handling', () => {

    beforeEach(() => {
        cy.task('db:seed')
    })

    context('401 Unauthorized', () => {
        it('should return 401 when no session exists', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3001/transactions',
                body: {},
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(401)
                expect(response.statusText).to.eq('Unauthorized')
                expect(response.body.error).to.eq('Unauthorized')
            })
        })
    })

    context('422 Unprocessable Entity', () => {
        beforeEach(() => {
            cy.login('defaultUser')
        })

        //BUG
        it.skip('should return 422 for a negative amount', () => {
            cy.get('@userId').then((id) => {
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:3001/transactions',
                    body: {
                        transactionType: 'payment',
                        amount: '-100',
                        description: 'API test',
                        senderId: id,
                        receiverId: '_XblMqbuoP'
                    },
                    failOnStatusCode: false
                }).then(response => {

                    expect(response.status).to.eq(422)
                    expect(response.statusText).to.eq('Unprocessable Entity')
                    expect(response.body.error).to.eq('Unprocessable Entity')
                })
            })
        })

        //BUG
        it.skip('should return 422 for a zero amount', () => {
            cy.get('@userId').then((id) => {
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:3001/transactions',
                    body: {
                        transactionType: 'payment',
                        amount: 0,
                        description: 'zero amount test',
                        senderId: id,
                        receiverId: '_XblMqbuoP'
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.eq(422)
                    expect(response.statusText).to.eq('Unprocessable Entity')
                    expect(response.body.error).to.eq('Unprocessable Entity')
                })
            })
        })

        it('should return 422 when required fields are missing', () => {

            const expectedResponce = [
                { msg: 'Invalid value', param: 'transactionType', location: 'body' },
                { msg: 'Invalid value', param: 'description', location: 'body' },
                { msg: 'Invalid value', param: 'amount', location: 'body' }
            ]

            cy.get('@userId').then((id) => {
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:3001/transactions',
                    body: {
                        senderId: id,
                        receiverId: '_XblMqbuoP'
                    },
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.eq(422)
                    expect(response.body.errors).to.have.length(3)
                    expect(response.body.errors).to.deep.eq(expectedResponce)
                })
            })
        })
    })
})
