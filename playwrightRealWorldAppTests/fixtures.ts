import {test as base, Page} from '@playwright/test';
import {HomePage} from "./tests/pages/HomePage";

type MyFixtures = {
  loggedInPage: Page;
  secondUserPage: Page;
}

export const test = base.extend<MyFixtures>({

    loggedInPage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(page);
    },
    secondUserPage: async({ browser }, use) => {
        const context = await browser.newContext({
            storageState: '.auth/user2.json'
        });

        const page = await context.newPage()
        const homePage = new HomePage(page)
        await homePage.goto()
        await use(page);
        await context.close();
    }
})

export {expect} from '@playwright/test';