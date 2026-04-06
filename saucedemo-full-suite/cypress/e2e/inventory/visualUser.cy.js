import inventoryPage from '../../pages/InventoryPage'

describe('Inventory Page - visual user', () => {

  beforeEach(() => {
    cy.login('visual_user')
  })

  it('should log in and land on inventory page', () => {
    cy.url().should('include', '/inventory')
  })

  it('should display 6 products', () => {
    inventoryPage.inventoryItem.should('have.length', 6)
  })

  it('product images should not all be the same (visual user is different from problem user)', () => {
    cy.get('img.inventory_item_img').then(images => {
      const srcs = [...images].map(img => img.getAttribute('src'))
      const uniqueSrcs = [...new Set(srcs)]
      // visual_user has different wrong images — more than 1 unique src
      // but still NOT 6 correct unique images
      cy.log(`Unique image srcs found: ${uniqueSrcs.length}`)
      expect(uniqueSrcs.length).to.be.eq(6)
    })
  })

})