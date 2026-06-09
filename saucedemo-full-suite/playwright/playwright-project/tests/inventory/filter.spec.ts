import { test, expect } from '../fixtures';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Inventory Page - filter', () => {

    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ loggedInPage }) => {
        inventoryPage = new InventoryPage(loggedInPage);
    })

    const testCases = [
        { sortValue: 'az', testId: 'inventory-item-name', order: 'asc' },
        { sortValue: 'za', testId: 'inventory-item-name', order: 'desc' },
        { sortValue: 'lohi', testId: 'inventory-item-price', order: 'asc' },
        { sortValue: 'hilo', testId: 'inventory-item-price', order: 'desc' },
    ]
    
    for (const { sortValue, testId, order } of testCases){

    test(`should sort products by ${sortValue}`, async () => {

        await inventoryPage.filter.selectOption(sortValue);

        const items = await inventoryPage.inventoryItem.all();
        const values: string[] = [];

        for (const item of items) {
            const value = await item.getByTestId(testId).innerText();
            values.push(value);
        }

        const sortedValues = [...values].sort((a, b) => {
            if (testId === 'inventory-item-price') {
                return order === 'asc' ? parseFloat(a) - parseFloat(b) : parseFloat(b) - parseFloat(a);
            }
            return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
        });

        expect(values).toEqual(sortedValues);
    })
}
})