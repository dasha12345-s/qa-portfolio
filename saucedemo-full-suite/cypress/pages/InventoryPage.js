class InventoryPage {
    get cart() {return cy.get('[data-test="shopping-cart-link"]')}
    get filter() {return cy.get('[data-test="product-sort-container"]')}
    get menu() {return cy.get('#react-burger-menu-btn')}
    get inventoryItem() {return cy.get('[data-test="inventory-item"]')}
    get addToCart() {return cy.get('[data-test^="add-to-cart"]')}
    get cartBadge() {return cy.get('[data-test="shopping-cart-badge"]')}
    get imgs() {return cy.get('.inventory_item_img')}

}

export default new InventoryPage()

