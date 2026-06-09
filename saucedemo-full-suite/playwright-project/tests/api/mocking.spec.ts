import {test, expect} from '@playwright/test';

test('should mock API response', async ({ page }) => {
    await page.route('https://reqres.in/api/users', async route => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify({
                data: [{
                    id: 1,
                    name: 'Darya'
                }] })
})
    }) 

    const response = await page.goto('https://reqres.in/api/users');
    const body = await response!.json();
    expect(body).toEqual({
        data: [{
            id: 1,
            name: 'Darya'
        }]
    })
})

test('should return 500 for server error', async ({ page }) => {
    await page.route('https://reqres.in/api/users', async route => {
        await route.fulfill({
            status: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        });
    });

    const response = await page.goto('https://reqres.in/api/users');
    expect(response!.status()).toBe(500);
})