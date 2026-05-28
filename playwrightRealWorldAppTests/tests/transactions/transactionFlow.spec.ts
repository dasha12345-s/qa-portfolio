import { test, expect } from "../../fixtures";
import { NewTransactionPage } from "../pages/NewTransactionPage";
import { TransactionDetailPage } from "../pages/TransactionDetailPage";
import { HomePage } from "../pages/HomePage";
import { getBalance } from "../helpers";

test.describe("Transaction Page flow - send payment", () => {
  test.describe.configure({ mode: "serial" });

  let newTransactionPage: NewTransactionPage;
  let homePage: HomePage;

  test.beforeEach(async ({ loggedInPage, secondUserPage, request }) => {
    await request.post("http://localhost:3001/testData/seed");

    await loggedInPage.reload();
    await secondUserPage.reload();

    newTransactionPage = new NewTransactionPage(loggedInPage);
    homePage = new HomePage(loggedInPage);
  });

  test("Should complete full payment flow and verify both accounts", async ({
    loggedInPage,
    secondUserPage,
    isMobile,
  }) => {
    test.skip(isMobile, "Sidebar balance not accessible on mobile");

    let user1Balance: number;
    let user2Balance: number;
    let transactionId: string;

    await test.step("should capture user2's balance", async () => {
      user2Balance = await getBalance(secondUserPage);
    });
    await test.step("should capture user1's balance", async () => {
      user1Balance = await getBalance(loggedInPage);
    });
    await test.step("should make payment and capture transaction data", async () => {
      const responsePromise = loggedInPage.waitForResponse(
        (res) =>
          res.url().includes("/transactions") &&
          res.request().method() === "POST",
      );

      await homePage.newTransactionButton.click();
      await newTransactionPage.searchInput.fill("Dina20");
      await newTransactionPage.userListItem
        .filter({ hasText: "Dina20" })
        .click();
      await newTransactionPage.amountInput.fill("5");
      await newTransactionPage.noteInput.fill("$5 payment");
      await newTransactionPage.payButton.click();

      const response = await responsePromise;
      const body = await response.json();
      transactionId = body.transaction.id;

      await expect(newTransactionPage.returnToTransactionsButton).toBeVisible();
    });

    await test.step("should verify that user1's balance decreased", async () => {
      expect(await getBalance(loggedInPage)).toBe(user1Balance - 500);
    });

    await test.step("should verify that user2's balance increased", async () => {
      expect(await getBalance(secondUserPage)).toBe(user2Balance + 500);
    });
    await test.step("should verify that user2 received the transaction created by user1", async () => {
      const response = await secondUserPage.request.get(
        `http://localhost:3001/transactions/${transactionId}`,
      );
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.transaction.id).toBe(transactionId);
    });
  });
});

test.describe("Transaction Page flow - request payment", () => {
  test.describe.configure({ mode: "serial" });

  let newTransactionPage: NewTransactionPage;
  let user2TransactionDetail: TransactionDetailPage;
  let homePage: HomePage;
  let homePageUser2: HomePage;

  test.beforeEach(async ({ loggedInPage, secondUserPage, request }) => {
    await request.post("http://localhost:3001/testData/seed");

    await loggedInPage.reload();
    await secondUserPage.reload();

    homePage = new HomePage(loggedInPage);
    homePageUser2 = new HomePage(secondUserPage);
    newTransactionPage = new NewTransactionPage(loggedInPage);
    user2TransactionDetail = new TransactionDetailPage(secondUserPage);
  });

  test("should accept a payment request and verify both balances", async ({
    loggedInPage,
    secondUserPage,
    isMobile,
  }) => {
    test.skip(isMobile, "Sidebar balance not accessible on mobile");

    let user1Balance: number;
    let user2Balance: number;
    let transactionId: string;

    await test.step("should capture user1's balance", async () => {
      user1Balance = await getBalance(loggedInPage);
    });
    await test.step("should capture user2's balance", async () => {
      user2Balance = await getBalance(secondUserPage);
    });
    await test.step("user1 should make a request and capture transaction data", async () => {
      const responsePromise = loggedInPage.waitForResponse(
        (res) =>
          res.url().includes("/transactions") &&
          res.request().method() === "POST",
      );

      await homePage.newTransactionButton.click();
      await newTransactionPage.searchInput.fill("Dina20");
      await newTransactionPage.userListItem
        .filter({ hasText: "Dina20" })
        .click();
      await newTransactionPage.amountInput.fill("5");
      await newTransactionPage.noteInput.fill("$5 request");
      await newTransactionPage.requestButton.click();

      const response = await responsePromise;
      const body = await response.json();
      transactionId = body.transaction.id;

      await expect(newTransactionPage.returnToTransactionsButton).toBeVisible();
    });
    await test.step("user2 should accept the transaction ", async () => {
      await homePageUser2.goto();
      await homePageUser2.personalTransactions.click();
      await secondUserPage
        .locator(`[data-test^="transaction-item-${transactionId}"]`)
        .click();
      await user2TransactionDetail.acceptRequestButton.click();
      await expect(user2TransactionDetail.acceptRequestButton).toBeHidden();
      await expect(user2TransactionDetail.rejectRequestButton).toBeHidden();
    });
    await test.step("should verify that user2's balance decreased by N", async () => {
       expect(await getBalance(secondUserPage)).toBe(user2Balance - 500);
    });
    await test.step("should verify that user1's balance increased by N", async () => {
      expect(await getBalance(loggedInPage)).toBe(user1Balance + 500);
    });
  });
  test("should reject a payment request and verify both balances are the same", async ({
    loggedInPage,
    secondUserPage,
    isMobile,
  }) => {
    test.fail(
      true,
      "Known bug: rejecting a request still deducts from user2's balance",
    );
    test.skip(isMobile, "Sidebar balance not accessible on mobile");

    let user1Balance: number;
    let user2Balance: number;
    let transactionId: string;

    await test.step("should capture user2's balance", async () => {
      user2Balance = await getBalance(secondUserPage);
    });
    await test.step("should capture user1's balance", async () => {
      user1Balance = await getBalance(loggedInPage);
    });
    await test.step("user1 should make a request and capture transaction data", async () => {
      const responsePromise = loggedInPage.waitForResponse(
        (res) =>
          res.url().includes("/transactions") &&
          res.request().method() === "POST",
      );

      await homePage.newTransactionButton.click();
      await newTransactionPage.searchInput.fill("Dina20");
      await newTransactionPage.userListItem
        .filter({ hasText: "Dina20" })
        .click();
      await newTransactionPage.amountInput.fill("5");
      await newTransactionPage.noteInput.fill("$5 request");
      await newTransactionPage.requestButton.click();

      const response = await responsePromise;
      const body = await response.json();
      transactionId = body.transaction.id;

      await expect(newTransactionPage.returnToTransactionsButton).toBeVisible();
    });
    await test.step("user2 should reject the transaction ", async () => {
      await homePageUser2.goto();
      await homePageUser2.personalTransactions.click();
      await secondUserPage
        .locator(`[data-test^="transaction-item-${transactionId}"]`)
        .click();
      await user2TransactionDetail.rejectRequestButton.click();
      await expect(user2TransactionDetail.acceptRequestButton).toBeHidden();
      await expect(user2TransactionDetail.rejectRequestButton).toBeHidden();
    });
    await test.step("should verify that user2's balance wasn't changed", async () => {
     expect(await getBalance(secondUserPage)).toBe(user2Balance);
    });
    await test.step("should verify that user1's balance wasn't changed", async () => {
      expect(await getBalance(loggedInPage)).toBe(user1Balance);
    });
  });
});
