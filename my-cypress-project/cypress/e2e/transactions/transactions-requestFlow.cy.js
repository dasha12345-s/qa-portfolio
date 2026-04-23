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
                cy.wrap(response.body.user.balance).as('apiBalanceFirstUser');//150953
            })
        })

        //REQUEST from user1: make request and capture transaction data
        cy.intercept('POST', '**/transactions').as('NewRequest')

        newTransactionPage.newTransactionButton.click()
        newTransactionPage.searchInputField.click().type('Dina20')

        newTransactionPage.userList.within(() => {
            cy.get('[data-test^="user-list-item-"]')
                .should('have.length', 1).first().click()
        });

        newTransactionPage.amount.click().type(5)
        newTransactionPage.noteField.type('money request!')
        newTransactionPage.request.click()

        cy.wait('@NewRequest').then(interception => {
            const transactionId = interception.response.body.transaction.id
            cy.wrap(transactionId).as('TransactionId')
        })

        sideBarMenu.logout()

        cy.url().should('include', '/signin')

        //SETUP: capture sender data BEFORE transaction accepted 
        cy.login('alternativeUser')

        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.balance).as('balanceBeforeAccept');
        })//158880

        cy.get('@TransactionId').then((id) => {
            homePage.transactionList.within(() => {
                cy.get(`[data-test^="transaction-item-${id}"]`).click({ force: true })
            })
        })

        //ACTION: Transaction accepted 

        transactionDetailPage.acceptButton.click()

        //SETUP: capture sender data AFTER transaction accepted
        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.balance).as('balanceAfterAccept');
        }) //158380

        //ACTION: comparing BEFORE AND AFTER balance
        cy.get('@balanceBeforeAccept').then((balanceBefore) => {
            cy.get('@balanceAfterAccept').then((balanceAfter) => {
                expect(balanceAfter).to.eq(balanceBefore - 500)
            })
        })

        sideBarMenu.logout()

        cy.url().should('include', '/signin')

        cy.login('defaultUser')

        //SETUP: capture receiver data AFTER transaction accepted
        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.balance).as('firstUserBalanceAfterAccept');
        })

        //ACTION: comparing BEFORE AND AFTER balance
        cy.get('@apiBalanceFirstUser').then((balanceBeforeFirstUser) => {
            cy.get('@firstUserBalanceAfterAccept').then((balanceAfterFirstUser) => {
                expect(balanceAfterFirstUser).to.eq(balanceBeforeFirstUser + 500)
            })
        })
    })

    it('should reject a payment request and verify both balances are the same', () => {

        //SETUP: capture receiver data
        cy.login('defaultUser')

        cy.get('@userId').then((id) => {
            cy.request('GET', `http://localhost:3001/users/${id}`).then((response) => {
                expect(response.status).to.eq(200);
                cy.wrap(response.body.user.balance).as('apiBalanceFirstUser');//150953
            })
        })

        //REQUEST from user1: make request and capture transaction data
        cy.intercept('POST', '**/transactions').as('NewRequest')

        newTransactionPage.newTransactionButton.click()
        newTransactionPage.searchInputField.click().type('Dina20')

        newTransactionPage.userList.within(() => {
            cy.get('[data-test^="user-list-item-"]')
                .should('have.length', 1).first().click()
        });

        newTransactionPage.amount.click().type(50)
        newTransactionPage.noteField.type('reject request!')
        newTransactionPage.request.click()

        cy.wait('@NewRequest').then(interception => {
            const transactionId = interception.response.body.transaction.id
            cy.wrap(transactionId).as('TransactionId')
        })

        sideBarMenu.logout()

        cy.url().should('include', '/signin')

        //SETUP: capture sender data BEFORE transaction rejected
        cy.login('alternativeUser')

        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.balance).as('balanceBeforeReject');//158880
        })

        cy.get('@TransactionId').then((id) => {
            homePage.transactionList.within(() => {
                cy.get(`[data-test^="transaction-item-${id}"]`).click({ force: true })
            })
        })

        //ACTION: Transaction rejected 
        transactionDetailPage.rejectButton.click()

        //SETUP: capture sender data AFTER transaction rejected
        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.balance).as('balanceAfterReject');//153880????? BUG
        })

         //ACTION: comparing BEFORE AND AFTER balance
        cy.get('@balanceBeforeReject').then((balanceBefore) => {
            cy.get('@balanceAfterReject').then((balanceAfter) => {
                expect(balanceAfter).to.eq(balanceBefore)
            })
        })

        sideBarMenu.logout()

        cy.url().should('include', '/signin')

        cy.login('defaultUser')

        //SETUP: capture receiver data AFTER transaction rejected
        cy.request('GET', 'http://localhost:3001/checkAuth').then((response) => {
            cy.wrap(response.body.user.balance).as('firstUserBalanceAfterReject');
        })

        //ACTION: comparing BEFORE AND AFTER balance 
        cy.get('@apiBalanceFirstUser').then((balanceBeforeFirstUser) => {
            cy.get('@firstUserBalanceAfterReject').then((balanceAfterFirstUser) => {
                expect(balanceAfterFirstUser).to.eq(balanceBeforeFirstUser)
            })
        })
    })
})