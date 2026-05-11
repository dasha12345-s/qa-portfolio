import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';

type MyFixtures = {
    loggedInPage: Page;
}

export const test = base.extend<MyFixtures>({
    loggedInPage: async ({ page }, use ) => {
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await use(page);
    }
});

export {expect} from '@playwright/test';