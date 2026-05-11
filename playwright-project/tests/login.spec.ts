import { test, expect } from './fixtures';
import { LoginPage } from './pages/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
})

test('the page heading should be visible', async () => {
    await expect(loginPage.heading).toBeVisible();
})

test('the username input should be visible', async () => {
    await expect(loginPage.usernameInput).toBeVisible();
});

test('the password input should be visible', async () => {
    await expect(loginPage.passwordInput).toBeVisible();
});

test('login button should be visible', async () => {
    await expect(loginPage.loginButton).toBeVisible();
});

test('should login successfully with valid credentials', async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL('/inventory.html');
})

test('should show error for invalid username', async () => {
    await loginPage.login('invalid_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
})

test('should show error for locked out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
})