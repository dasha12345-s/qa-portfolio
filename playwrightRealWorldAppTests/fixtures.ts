import {test as base, Page} from '@playwright/test';
import {HomePage} from "./tests/pages/HomePage";
import { getUserId } from './tests/helpers';

type MyFixtures = {
  loggedInPage: Page;
  secondUserPage: Page;
  userIds: {user1Id: string, user2Id: string};
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
    },
    userIds: async ({playwright}, use) => {
        const context1 = await playwright.request.newContext({
           storageState: '.auth/user1.json'
        });
        const context2 = await playwright.request.newContext({
            storageState: '.auth/user2.json'
        });

        const user1Id = await getUserId(context1);
        const user2Id = await getUserId(context2);

        await use({user1Id: user1Id, user2Id: user2Id});

        await context1.dispose();
        await context2.dispose();
        
    }
})

export {expect} from '@playwright/test';