import { Page } from "@playwright/test";

export class InventoryPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get cart() {return this.page.getByTestId('shopping-cart-link')}
    get filter() {return this.page.getByTestId('product-sort-container')}
    get menu() {return this.page.locator('#react-burger-menu-btn')}
    get inventoryItem() {return this.page.getByTestId('inventory-item')}
    get addToCart() {return this.page.locator('[data-test^="add-to-cart"]')}
    get cartBadge() {return this.page.getByTestId('shopping-cart-badge')}
    get imgs() {return this.page.locator('.inventory_item_img')}
}