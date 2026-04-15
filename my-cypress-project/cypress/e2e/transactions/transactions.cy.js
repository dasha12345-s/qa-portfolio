import newTransactionPage from "../../pages/NewTransactionPage";

describe('Transactions Page flow', () => {

    beforeEach(() => {
        cy.login('defaultUser')
    })

    it('should spy on a real API call without stubbing it', () => {

        cy.intercept('POST', '**/transactions').as('NewTransaction')

        cy.visit('/transaction/new')

    cy.get('@userId').then((id) => {
        cy.request('GET', `http://localhost:3001/users/${id}`).then((response) => {
            expect(response.status).to.eq(200);
            cy.wrap(response.body.user.balance).as('apiBalance');
    })

        cy.get('@apiBalance').then((balance) => {
        cy.log('The balance is: ' + balance); 
     console.log(balance);                 
        });

        newTransactionPage.userList.within(() => {
        cy.get('[data-test^="user-list-item-"]').first().click({ force: true });
            }).as('userListItem')
            newTransactionPage.amount.click().type(3)
            newTransactionPage.noteField.type('here you go-auto')
            newTransactionPage.payButton.click()

            cy.wait('@NewTransaction').then(interception => {
                const transactionId = interception.response.body.transaction.id
                cy.wrap(transactionId).as('TransactionId')
            })

        cy.get('@userId').then((id) => {
        cy.request('GET', `http://localhost:3001/users/${id}`).then((response) => {
        expect(response.status).to.eq(200);
        cy.wrap(response.body.user.balance).as('apiBalanceAfter');
    })

            cy.get('@apiBalanceAfter').then((balance) => {
        cy.log('The balance is: ' + balance); 
     console.log(balance); 
    });

    cy.get('@apiBalance').then((balanceBefore) => {
        cy.get('@apiBalanceAfter').then((balanceAfter) => {
            expect(balanceAfter).to.eq(balanceBefore - 300)
        })
    })
        });
    })
})
})