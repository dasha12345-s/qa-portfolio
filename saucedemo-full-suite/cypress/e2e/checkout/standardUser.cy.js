import inventoryPage from "../../pages/InventoryPage";
import checkoutPage from "../../pages/CheckoutPage";

describe('Checkout - standard user', () => {

    beforeEach(() => {
        cy.login('standard')
        inventoryPage.addToCart.first().click()
        inventoryPage.cart.click()
    })

    it('cart should contain 1 item', () => {
        checkoutPage.cartItem.should('have.length', 1)
    })

    it('cart item should show name and price', () => {
        checkoutPage.cartItem.first().within(() => {
            cy.get('.inventory_item_name').should('be.visible')
            cy.get('.inventory_item_price').should('be.visible')
        })
    })

    it('should show error if checkout form is submitted empty', () => {
        checkoutPage.checkoutButton.click()
        checkoutPage.continueButton.click()
        checkoutPage.errorMessage.should('be.visible').and('contain.text', 'First Name is required')
    })

    it('should complete full checkout flow',() => {
        checkoutPage.checkoutButton.click()
        checkoutPage.fillForm('Darya', 'Shostak', '10001')
        checkoutPage.continueButton.click()
        checkoutPage.finishButton.click()
        checkoutPage.confirmationHeader.should('be.visible').and('contain.text', 'Thank you for your order!')
    })
})