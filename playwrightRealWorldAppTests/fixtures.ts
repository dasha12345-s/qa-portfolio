import {test as base, Page} from '@playwright/test';
import {HomePage} from "./tests/pages/HomePage";

type MyFixtures = {
  loggedInPage: Page;
}

export const test = base.extend<MyFixtures>({

    loggedInPage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(page);
    }
})

export {expect} from '@playwright/test';