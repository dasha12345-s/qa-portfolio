import inventoryPage from "../../pages/InventoryPage";

describe('Inventory Page - error user', () => {
    beforeEach(() => {
        cy.login('error_user')
    })

    it('should log in and land on inventory page', () => {
        cy.url().should('include', '/inventory')
    })

     it('first item can be added to cart', () => {
    inventoryPage.addToCart.first().click()
    inventoryPage.cartBadge.should('contain.text', '1')
  })

    it('should display 6 products', () => {
        inventoryPage.inventoryItem.should('have.length', 6)
    })

    it('adding all 6 items should NOT reach badge count of 6 (bug)', () => {
     
        cy.on('uncaught:exception', (err) => {
            expect(err.message).to.include('Failed to add item to the cart')
            return false //// returning false tells Cypress: "I saw this, don't fail the test"
        })
    
        inventoryPage.addToCart.each(button => {
      cy.wrap(button).click()
    })
    // error_user has broken buttons — some clicks fail silently
    // badge count will be less than 6
    inventoryPage.cartBadge
        .should('be.visible')
        .and('have.text', '3')

  })
})