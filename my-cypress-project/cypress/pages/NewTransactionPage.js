class NewTransaction{
    get newTransactionButton() {return cy.get('[data-test="nav-top-new-transaction"]')}
    get searchInputField() {return cy.get('[data-test="user-list-search-input"]')}
    get amount() {return cy.get('#amount')}
    get noteField() {return cy.get('#transaction-create-description-input')}
    get payButton() {return cy.get('[data-test="transaction-create-submit-payment"]')}
    get request() {return cy.get('[data-test="transaction-create-submit-request"]')}
    get userList() {return cy.get('[data-test="users-list"]')}
}

export default new NewTransaction()