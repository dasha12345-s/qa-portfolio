import { chromium } from '@playwright/test';
import * as fs from 'fs';
import { SignInPage } from './tests/pages/SignInPage';

const AUTH_DIR = '.auth'
const BASE_URL = 'http://localhost:3000'
const PASSWORD = 's3cret'

async function loginAndSave(username:string, filename:string){
      const browser = await chromium.launch();

    try{
        const context = await browser.newContext({ baseURL: BASE_URL});
        const page = await context.newPage();
        const signInPage = new SignInPage(page);

        await signInPage.goto();
        await signInPage.login(username, PASSWORD);
    
        await page.waitForURL('http://localhost:3000/');

        await context.storageState({ path: `${AUTH_DIR}/${filename}` });
    } finally {
        await browser.close();
    }
} 

async function globalSetup() {
  fs.mkdirSync(AUTH_DIR, {recursive: true})

    await loginAndSave('Heath93', 'user1.json')
    await loginAndSave('Dina20', 'user2.json')
}

export default globalSetup;