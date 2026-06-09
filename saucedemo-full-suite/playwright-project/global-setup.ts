import { chromium } from '@playwright/test';
import * as fs from 'fs';
import { LoginPage } from './tests/pages/loginPage';

const AUTH_DIR = 'playwright-project/.auth';
const BASE_URL = 'https://www.saucedemo.com';
const PASSWORD = 'secret_sauce';

async function loginAndSave(username: string, filename: string) {
    const browser = await chromium.launch();

    try {
        const context = await browser.newContext({ baseURL: BASE_URL });
        const page = await context.newPage();
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(username, PASSWORD);
        await page.waitForURL('**/inventory.html');

        await context.storageState({ path: `${AUTH_DIR}/${filename}` });
    } finally {
        await browser.close();
    }
}

async function globalSetup() {
    fs.mkdirSync(AUTH_DIR, { recursive: true });

    await loginAndSave('standard_user', 'standard-user.json');
    await loginAndSave('problem_user', 'problem-user.json');
    await loginAndSave('performance_glitch_user', 'perf-glitch-user.json');
}

export default globalSetup;
