import { test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test('the page heading should be visible', async ({ page }) => {
    const heading = page.getByText('Swag Labs');
    await expect(heading).toBeVisible();
})

test('the username input should be visible', async ({ page }) => {
    const usernameInput = page.getByPlaceholder('Username');
    await expect(usernameInput).toBeVisible();
});

test('the password input should be visible', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Password');
    await expect(passwordInput).toBeVisible();
});

test('login button should be visible', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();
});

test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveURL('/inventory.html');
})