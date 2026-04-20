import newTransactionPage from "../../pages/NewTransactionPage";
import sideBarMenu from "../../pages/SideBarMenu";

describe('Transactions Page flow', () => {

    beforeEach(() => {

        cy.task('db:seed')
    })


    it('should spy on a real API call without stubbing it', () => {

        cy.login('alternativeUser')

         cy.get('@userId').then((id) => {
          cy.request('GET', `http://localhost:3001/users/${id}`).then((response) => {
            expect(response.status).to.eq(200);
            cy.wrap(response.body.user.balance).as('receiverBalance');
            cy.wrap(response.body.user.id).as('receiverId');
    })

      sideBarMenu.logout()

        cy.login('defaultUser')

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

            newTransactionPage.searchInputField.click().type('Dina20')
            newTransactionPage.userList.within(() => {
        cy.get('[data-test^="user-list-item-"]')
        .should('have.length', 1).first().click()});
    
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

    sideBarMenu.logout()

    cy.url().should('include', '/signin')

    cy.login('alternativeUser')

    cy.get('@receiverId').then((id) => {
        cy.request('GET', `http://localhost:3001/users/${id}`).then((response) => {
        expect(response.status).to.eq(200);
        cy.wrap(response.body.user.balance).as('apiBalanceReceived');
    })
})
        cy.get('@receiverBalance').then((balanceBefore) => {
        cy.get('@apiBalanceReceived').then((balanceAfter) => {
            expect(balanceAfter).to.eq(balanceBefore + 300)
        })
    })


    cy.get('@TransactionId').then((transactionId) => {
           cy.request('GET', 'http://localhost:3001/transactions').then((response) => {
      const found = response.body.results.find(t => t.id === transactionId)
            expect(found.id).to.eq(transactionId)  
    })

})
})
})
    })})