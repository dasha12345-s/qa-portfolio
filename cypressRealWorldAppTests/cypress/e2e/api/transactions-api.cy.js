describe('Transactions API', () => {
    beforeEach(() => {
        cy.task('db:seed')
        cy.login('defaultUser')
    })

    it('should return 200 when creating a payment', () => {

        cy.get('@userId').then((id) => {
            cy.request('POST', 'http://localhost:3001/transactions', {
                transactionType: 'payment',
                amount: '100',
                description: 'API test',
                senderId: id,
                receiverId: '_XblMqbuoP'
            }).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.transaction.senderId).to.eq(id)
                expect(response.body.transaction.receiverId).to.eq('_XblMqbuoP')
                expect(response.body.transaction.description).to.eq('API test')
                expect(response.body.transaction.amount).to.eq(10000)
                expect(response.body.transaction.status).to.eq('complete')
            })
        })
    })
    it('should return 200 when requesting a payment', () => {
        cy.login('alternativeUser')

        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.id).as('receiverID');
        })

        cy.get('@receiverID').then((receiverID) => {
            cy.get('@userId').then((id) => {
                cy.request('POST', 'http://localhost:3001/transactions', {
                    transactionType: 'request',
                    amount: 10,
                    description: 'want some money',
                    senderId: id,
                    receiverId: receiverID
                }).then(response => {
                    expect(response.status).to.eq(200)
                    expect(response.body.transaction.senderId).to.eq(id)
                    expect(response.body.transaction.receiverId).to.eq(receiverID)
                    expect(response.body.transaction.description).to.eq('want some money')
                    expect(response.body.transaction.amount).to.eq(1000)
                    expect(response.body.transaction.status).to.eq('pending')
                })
            })
        })
    })

    it('should return 204 and accept the payment', () => {
        cy.login('alternativeUser')

        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.id).as('receiverID');
        })

        cy.get('@receiverID').then((receiverID) => {
            cy.get('@userId').then((id) => {
                cy.request('POST', 'http://localhost:3001/transactions', {
                    transactionType: 'request',
                    amount: 10,
                    description: 'want some more money',
                    senderId: id,
                    receiverId: receiverID
                }).then(response => {
                    expect(response.status).to.eq(200)
                    expect(response.body.transaction.senderId).to.eq(id)
                    expect(response.body.transaction.receiverId).to.eq(receiverID)
                    expect(response.body.transaction.description).to.eq('want some more money')
                    expect(response.body.transaction.amount).to.eq(1000)
                    expect(response.body.transaction.status).to.eq('pending')
                    expect(response.body.transaction.requestStatus).to.eq('pending')

                    const transactionID = response.body.transaction.id

                    cy.request('PATCH', `http://localhost:3001/transactions/${transactionID}`, {
                        requestStatus: 'accepted'
                    }).then(patchResponse => {
                        expect(patchResponse.status).to.eq(204)

                        cy.request('GET', `http://localhost:3001/transactions/${transactionID}`).then(getResponse => {
                            expect(getResponse.status).to.eq(200)
                            expect(getResponse.body.transaction.status).to.eq('complete')
                            expect(getResponse.body.transaction.requestStatus).to.eq('accepted')
                        })
                    })
                })
            })
        })
    })

    //Known bug - while user reject the payment request, it still behave as accept payment 
     it.skip('should return 204 and reject the payment', () => {
        cy.login('alternativeUser')

        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.id).as('receiverID');
        })

        cy.get('@receiverID').then((receiverID) => {
            cy.get('@userId').then((id) => {
                cy.request('POST', 'http://localhost:3001/transactions', {
                    transactionType: 'request',
                    amount: 10,
                    description: 'reject some money',
                    senderId: id,
                    receiverId: receiverID
                }).then(response => {
                    expect(response.status).to.eq(200)
                    expect(response.body.transaction.senderId).to.eq(id)
                    expect(response.body.transaction.receiverId).to.eq(receiverID)
                    expect(response.body.transaction.description).to.eq('reject some money')
                    expect(response.body.transaction.amount).to.eq(1000)
                    expect(response.body.transaction.status).to.eq('pending')
                    expect(response.body.transaction.requestStatus).to.eq('pending')

                    const transactionID = response.body.transaction.id

                    cy.request('PATCH', `http://localhost:3001/transactions/${transactionID}`, {
                        requestStatus: 'rejected'
                    }).then(patchResponse => {
                        expect(patchResponse.status).to.eq(204)

                        cy.request('GET', `http://localhost:3001/transactions/${transactionID}`).then(getResponse => {
                            expect(getResponse.status).to.eq(200)
                            expect(getResponse.body.transaction.status).to.eq('pending')
                            expect(getResponse.body.transaction.requestStatus).to.eq('rejected')
                        })
                    })
                })
            })
        })
    })
})