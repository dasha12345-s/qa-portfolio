class HomePage{
    get transactionList() {return cy.get('[data-test="transaction-list"]')}
    get dataFilter() {return cy.get('[data-test="transaction-list-filter-date-range-button"]')}
    get amountFilter() {return cy.get('[data-test="transaction-list-filter-amount-range-button"]')}
}

export default new HomePage()