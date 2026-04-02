import inventoryPage from '../pages/InventoryPage'

describe('Inventory Page', () => {

    beforeEach(() => {
     cy.login('standard')
    })
    it('should show shopping cart', () => {
        inventoryPage.cart.should('be.visible')
    })
    it('should show sort filter', () => {
        inventoryPage.filter.should('be.visible')
    })
    it('should show the burger menu', () => {
        inventoryPage.menu.should('be.visible')
    })

    it('"add to cart" button should add an item to card', () => {
        inventoryPage.addToCart.first().click()
        cy.get('[data-test="shopping-cart-badge"]').should('contain.text', '1')
    })
})
