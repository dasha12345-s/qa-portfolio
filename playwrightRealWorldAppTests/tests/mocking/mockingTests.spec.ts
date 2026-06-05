import { test, expect } from "../../fixtures";
import { HomePage } from "../pages/HomePage";

test.describe("Mocking Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ loggedInPage }) => {
    homePage = new HomePage(loggedInPage);
  });

  test.describe("UI state mocking", () => {
    test("should show empty state when no transactions exist", {tag: '@regression'}, async ({ loggedInPage, browserName }) => {
      test.fail(
        browserName === "firefox",
        "bug: route intercept not applied on cached response in Firefox",
      );

      await loggedInPage.route("**/transactions*", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            results: [],
          }),
        });
      });
      await homePage.goto();
      await expect(homePage.transactionListItems).toHaveCount(0);
    });

    test("should show empty state on server error", {tag: '@regression'}, async ({ loggedInPage }) => {
      await loggedInPage.route("http://localhost:3001/transactions/public", async (route) => {
        await route.fulfill({
          status: 500,
        });
      });
      await homePage.goto();
      await expect(loggedInPage.getByText('No Transactions')).toBeVisible()
    });

    test('should show loading indicator while fetching transactions', {tag: '@regression'}, async({loggedInPage}) => {
        await loggedInPage.route("http://localhost:3001/transactions/public", async(route) => {
             await new Promise(resolve => setTimeout(resolve, 3000));
            await route.fulfill({
                status: 200,
                body: JSON.stringify({
                    result:[]
                })
            })
        })
    homePage.goto().catch(() => {});
await expect(loggedInPage.locator('[data-test="list-skeleton"]')).toBeVisible();
    })
  });

  test.describe("Security scenario mocking", () => {
    test('should redirect to sign in page when session expires', {tag: '@regression'}, async({loggedInPage}) => {
        test.fail(true, 'bug: app does not redirect to sign in on 401 — RWA does not enforce session expiry on frontend')
        await loggedInPage.route("http://localhost:3001/transactions/public", async(route) => {
            await route.fulfill({
                status: 401
            })
        })
            await homePage.goto()
            await expect(loggedInPage).toHaveURL('/signin')
    })
    test('should handle forbidden access gracefully', {tag: '@regression'}, async({loggedInPage}) => {
        await loggedInPage.route("http://localhost:3001/transactions/public", async(route) => {
            await route.fulfill({
                status: 403,
                contentType: "application/json",
                body: JSON.stringify({
            message: 'Forbidden'
          }),
            })
        })
         await homePage.goto()
            await expect(homePage.transactionListItems).toHaveCount(0)
    })
  });
});
