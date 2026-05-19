import {test, expect} from '../fixtures';
import { InventoryPage } from '../pages/inventoryPage';

let inventoryPage: InventoryPage;

test.describe('Inventory Page - Problem User', () => {

test.beforeEach(async ({problemUserPage}) => {
    inventoryPage = new InventoryPage(problemUserPage);
})

test.fail('all product images show the same broken image (bug)', async ({}) => {
    const images = await inventoryPage.imgs.all();
    const srcs = [];

    for (const img of images) {
        const src = await img.getAttribute('src');
        srcs.push(src);
    }
        const uniqueSrcs = new Set(srcs);
        expect(uniqueSrcs).toHaveLength(1);
})
})
