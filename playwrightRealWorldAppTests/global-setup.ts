import { chromium } from '@playwright/test';
import path from 'path';

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/signin');
    await page.waitForLoadState('networkidle');
    await page.getByRole('textbox', { name: 'Username' }).fill('Heath93');
    await page.getByRole('textbox', { name: 'Password' }).fill('s3cret');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('http://localhost:3000/');

    await context.storageState({ path:
        path.resolve('.auth/user.json')});

    await browser.close();
}

export default globalSetup;