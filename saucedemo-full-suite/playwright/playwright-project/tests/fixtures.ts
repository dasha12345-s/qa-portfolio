import { test as base, expect, Page} from '@playwright/test';

type MyFixtures = {
    loggedInPage: Page;
    problemUserPage: Page;
    performanceGlitchUserPage: Page;
}

export const test = base.extend<MyFixtures>({
    loggedInPage: async ({ browser }, use ) => {
        const context = await browser.newContext({ storageState: 'playwright-project/.auth/standard-user.json' });
        const page = await context.newPage();
        await page.goto('/inventory.html');
        await use(page);
        await context.close();
    },
    problemUserPage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'playwright-project/.auth/problem-user.json' });
        const page = await context.newPage();
        await page.goto('/inventory.html');
        await use(page);
        await context.close();
    },
    performanceGlitchUserPage: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'playwright-project/.auth/perf-glitch-user.json' });
        const page = await context.newPage();
        await page.goto('/inventory.html');
        await use(page);
        await context.close();
    },
});

export {expect} from '@playwright/test';