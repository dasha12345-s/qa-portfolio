import { chromium } from '@playwright/test';
import path from 'path';

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3004/signin');
    await page.getByTestId('signin-username').fill('Heath93');
    await page.getByTestId('signin-password').fill('s3cret');
    await page.getByTestId('signin-submit').click();
    await page.waitForURL('http://localhost:3004/');

    await context.storageState({ path:
        path.resolve('.auth/user.json')});

    await browser.close();
}

export default globalSetup;