import inventoryPage from '../../pages/InventoryPage'

describe('Inventory Page - standardUser', () => {

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

    it('should display exactly 6 products', () => {
        inventoryPage.inventoryItem.should('have.length', 6)
    })

    it('every product should have a name, price and add-to-cart button', () => {
        inventoryPage.inventoryItem.each(item => {
            cy.wrap(item).within(() => {
                cy.get('.inventory_item_name').should('be.visible')
                cy.get('.inventory_item_price').should('be.visible')
                cy.get('[data-test^="add-to-cart"]').should('be.visible')
            })
        })
    })

    it('"add to cart" button should add an item to card', () => {
        inventoryPage.addToCart.first().click()
        inventoryPage.cartBadge.should('contain.text', '1')
    })

    it('adding all 6 items should show badge count of 6', () => {
        inventoryPage.addToCart.each(button => {
            cy.wrap(button).click()
        })
        inventoryPage.cartBadge.should('be.visible').and('contain.text', '6')
    })
})
