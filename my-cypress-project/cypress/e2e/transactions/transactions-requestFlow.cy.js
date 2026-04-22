import newTransactionPage from "../../pages/NewTransactionPage";
import sideBarMenu from "../../pages/SideBarMenu";
import homePage from "../../pages/HomePage";
import transactionDetailPage from "../../pages/TransactionDetailPage";

describe('TransactionPage - request payment ', () => {

    beforeEach(() => {
        cy.task('db:seed')
    })

    it('should accept a payment request and verify both balances', () => {

        //SETUP: capture receiver data
        cy.login('defaultUser')

        cy.get('@userId').then((id) => {
            cy.request('GET', `http://localhost:3001/users/${id}`).then((response) => {
                expect(response.status).to.eq(200);
                cy.wrap(response.body.user.balance).as('apiBalanceFirstUser');
            })
        })

        //REQUEST from user1: make payment and capture transaction data
        cy.intercept('POST', '**/transactions').as('NewRequest')

        newTransactionPage.newTransactionButton.click()
        newTransactionPage.searchInputField.click().type('Dina20')

        newTransactionPage.userList.within(() => {
            cy.get('[data-test^="user-list-item-"]')
                .should('have.length', 1).first().click()
        });

        newTransactionPage.amount.click().type(5)
        newTransactionPage.noteField.type('accept money!')
        newTransactionPage.request.click()

        cy.wait('@NewRequest').then(interception => {
            const transactionId = interception.response.body.transaction.id
            cy.wrap(transactionId).as('TransactionId')
        })

        sideBarMenu.logout()

        cy.url().should('include', '/signin')

        cy.login('alternativeUser')

         cy.request('GET','http://localhost:3001/checkAuth').then((response) => {
        cy.wrap(response.body.user.balance).as('balanceBeforeAccept');}) //-- I STOPPED HERE

        cy.get('@TransactionId').then((id) => {
            homePage.transactionList.within(() => {
                cy.get(`[data-test^="transaction-item-${id}"]`).click({ force: true })
            })
        })

        transactionDetailPage.acceptButton.click()
    })

    it('should reject a payment request and verify both balances are the same', () => {

        //SETUP: capture receiver data
        cy.login('defaultUser')

        cy.get('@userId').then((id) => {
            cy.request('GET', `http://localhost:3001/users/${id}`).then((response) => {
                expect(response.status).to.eq(200);
                cy.wrap(response.body.user.balance).as('apiBalanceFirstUser');
            })
        })

        //REQUEST from user1: make payment and capture transaction data
        cy.intercept('POST', '**/transactions').as('NewRequest')

        newTransactionPage.newTransactionButton.click()
        newTransactionPage.searchInputField.click().type('Dina20')

        newTransactionPage.userList.within(() => {
            cy.get('[data-test^="user-list-item-"]')
                .should('have.length', 1).first().click()
        });

        newTransactionPage.amount.click().type(50)
        newTransactionPage.noteField.type('reject money!')
        newTransactionPage.request.click()

        cy.wait('@NewRequest').then(interception => {
            const transactionId = interception.response.body.transaction.id
            cy.wrap(transactionId).as('TransactionId')
        })

        sideBarMenu.logout()

        cy.url().should('include', '/signin')

        cy.login('alternativeUser')

        cy.get('@TransactionId').then((id) => {
            homePage.transactionList.within(() => {
                cy.get(`[data-test^="transaction-item-${id}"]`).click({ force: true })
            })
        })


    })
})