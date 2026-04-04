class CheckoutPage {
    get checkoutButton() { return cy.get('[data-test="checkout"]')}
    get firstNameInput() { return cy.get('[data-test="firstName"]')}
    get latsNameInput() { return cy.get('[data-test="lastName"]')}
    get zipInput() {return cy.get('[data-test="postalCode"]')}
    get ontinueButton() {return cy.get('[data-test="continue"]')}
    get finishButton() {return cy.get('[data-test="finish"]')}
    get confirmationHeader() {return cy.get('.complete-header')}
    get cartItem() {return cy.get('.cart_item')}
    get errorMessage() {return cy.get('[data-test="error"]')}

    fillForm(firstName, lastName, zip){
        this.firstNameInput.type(firstName)
        this.latsNameInput.type(lastName)
        this.zipInput.type(zip)
    }
}

export default new CheckoutPage()