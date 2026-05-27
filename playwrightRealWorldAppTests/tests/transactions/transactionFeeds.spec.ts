import { test, expect } from "../../fixtures";
import { HomePage } from "../pages/HomePage";
import { NewTransactionPage } from "../pages/NewTransactionPage";

test.describe("Transaction Feeds", () => {
  let homePage: HomePage;
  let newTransactionPage: NewTransactionPage;

  test.beforeEach(async ({ loggedInPage }) => {
    homePage = new HomePage(loggedInPage);
    newTransactionPage = new NewTransactionPage(loggedInPage);
  });

  test.describe("Navigation", () => {
    test("should display public transactions feed by default", async () => {
      await expect(homePage.publicTransactions).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await expect(homePage.transactionList).toBeVisible();
    });

    const tabs = ["Public", "Contacts", "Personal"];

    for (const tab of tabs) {
      test(`should display ${tab} transactions feed`, async () => {
        const tabLocator = {
          Public: homePage.publicTransactions,
          Contacts: homePage.contactsTransactions,
          Personal: homePage.personalTransactions,
        }[tab]!;

        await tabLocator.click();
        await expect(homePage.transactionList).toBeVisible();
      });
    }
  });

  test("should open new transaction form when clicking on new transaction button", async () => {
    await homePage.newTransactionButton.click();
    await expect(newTransactionPage.searchInput).toBeVisible();
  });

  test("should open notifications panel when clicking on notification button", async ({
    loggedInPage,
  }) => {
    await homePage.notificationButton.click();
    await expect(loggedInPage).toHaveURL("/notifications");
  });

  test.describe("Navigation menu", () => {
    test("navigation menu should be open by default", async ({ isMobile }) => {
      test.skip(isMobile, "Sidebar hidden by default on mobile");
      await expect(homePage.sideBar).toBeVisible();
    });

    test("should close navigation menu when clicking on nav toggle", async ({
      isMobile,
    }) => {
      test.skip(isMobile, "Sidebar hidden by default on mobile");
      await homePage.navToggle.click();
      await expect(homePage.sideBarPaper).toHaveCSS("visibility", "hidden");
    });
  });

  test("should filter transactions by date range when using date filter", async () => {
    await homePage.dateFilter.click();
    await expect(homePage.dateRange).toBeVisible();
  });

  test("should filter transactions by amount range when using amount filter", async () => {
    await homePage.amountFilter.click();
    await expect(homePage.amountSlider).toBeVisible();
  });
});
