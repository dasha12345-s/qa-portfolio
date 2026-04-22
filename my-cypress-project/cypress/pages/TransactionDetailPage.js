class TransactionDetailPage{
    get acceptButton() { return cy.get('[data-test^="transaction-accept-request-"]')}
    get rejectButton() { return cy.get('[data-test^="transaction-reject-request-"]')}
    get likeButton() { return cy.get('[data-test^="transaction-like-button-"]')}
    get commentField() { return cy.get('[data-test^="transaction-comment-input-"]')}
}

export default new TransactionDetailPage()