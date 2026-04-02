class InventoryPage {
    get cart() {return cy.get('[data-test="shopping-cart-link"]')}
    get filter() {return cy.get('[data-test="product-sort-container"]')}
    get menu() {return cy.get('#react-burger-menu-btn')}
    get item() {return cy.get('[data-test="inventory-item-name"]')}
    get addToCart() {return cy.get('[data-test^="add-to-cart"]')}
}

export default new InventoryPage()