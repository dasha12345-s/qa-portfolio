import { test, expect } from '../fixtures';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Inventory Page - Standard User', () => {

    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ loggedInPage }) => {
        inventoryPage = new InventoryPage(loggedInPage);
    })

    test('should show shopping cart', async () => {
        await expect(inventoryPage.cart).toBeVisible();
    });

    test('should show sort filter', async () => {
        await expect(inventoryPage.filter).toBeVisible();
    });

    test('should show the burger menu', async () => {
        await expect(inventoryPage.menu).toBeVisible();
    });

    test('should display exactly 6 inventory items', async () => {
        await expect(inventoryPage.inventoryItem).toHaveCount(6);
    })

    test('every product should have a name, price and add-to-cart button', async () => {
        const items = await inventoryPage.inventoryItem.all()

        for (const item of items) {
            await expect.soft(item.getByTestId('inventory-item-name')).toBeVisible();
            await expect.soft(item.getByTestId('inventory-item-price')).toBeVisible();
            await expect.soft(item.locator('button')).toBeVisible(); 
        }
    })

    test('"add to cart" button should add an item to card', async () => {
        await inventoryPage.addToCart.first().click();
        await expect(inventoryPage.cartBadge).toHaveText('1');
    })

    test('adding all items should show badge count of "all items number"', async () => {

        let addToCartButtons = 0;

        await test.step('count available ass-to-cart buttons', async () => {
            addToCartButtons = await inventoryPage.addToCart.count();
        })
        
        await test.step('verify cart badge is hidden before adding items', async () => {
              await expect(inventoryPage.cartBadge).toBeHidden();
        })

        await test.step('Add all inventory items to cart', async () => {
            for (let i = 0; i < addToCartButtons; i++) {
            await inventoryPage.addToCart.nth(0).click();
            }
        });

        await test.step('Verify cart badge shows total number of added items', async () => {
             await expect(inventoryPage.cartBadge).toHaveText(String(addToCartButtons));
        })
    })
})

