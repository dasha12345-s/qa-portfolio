import inventoryPage from '../../pages/InventoryPage'

describe('Inventory Page - performance glitch user', () => {

    it('should log in successfully despite slow performance',
        { defaultCommandTimeout: 1000 }, () => {
            cy.login('performance_user')
            cy.url().should('include', '/inventory')
        })

    it('should display 6 products after slow login',
        { defaultCommandTimeout: 1000 }, () => {
            cy.login('performance_user')
            inventoryPage.inventoryItem.should('have.length', 6)
    })
})