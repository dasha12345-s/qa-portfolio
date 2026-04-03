import inventoryPage from '../../pages/InventoryPage'

describe('Inventory Page - problem user', () => {

    beforeEach(() => {
        cy.login('problem_user')
    })

    it('should log in and land on inventory page', () => {
        cy.url().should('include', '/inventory')
    })

    it('should display 6 products', () => {
        inventoryPage.inventoryItem.should('have.length', 6)
    })

    it('all product images show the same broken image (bug)', () => {
       cy.get('img.inventory_item_img').then(images => {
        const srcs = [...images].map( img => img.getAttribute('src'))
        const uniqueSrcs = [...new Set(srcs)]
        expect(uniqueSrcs).to.have.length(1)
        })
    })

    it('sort by Name Z to A does not work (bug)', () => {
        inventoryPage.filter.select('za')
        cy.get('.inventory_item_name').first()
      .should('not.contain.text', 'Test.allTheThings() T-Shirt (Red)')
    })
})