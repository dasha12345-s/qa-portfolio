import { test, expect } from "../../fixtures";
import { NewTransactionPage } from "../pages/NewTransactionPage";
import { SideMenuPage } from "../pages/SideMenuPage";
import { TransactionDetailPage } from "../pages/TransactionDetailPage";
import { HomePage } from "../pages/HomePage";

test.describe("Transaction Page flow - send payment", () => {

  test.describe.configure({ mode: "serial" });

  let newTransactionPage: NewTransactionPage;
  let sideMenuPage: SideMenuPage;
  let transactionDetailPage: TransactionDetailPage;
  let user2SideMenu: SideMenuPage;
  let user2TransactionDetail: TransactionDetailPage;
  let homePage: HomePage;

  test.beforeEach(async ({ loggedInPage, secondUserPage, request }) => {
    await request.post("http://localhost:3001/testData/seed");

    await loggedInPage.reload();
    await secondUserPage.reload();

    newTransactionPage = new NewTransactionPage(loggedInPage);
    sideMenuPage = new SideMenuPage(loggedInPage);
    homePage = new HomePage(loggedInPage);
    transactionDetailPage = new TransactionDetailPage(loggedInPage);
    user2SideMenu = new SideMenuPage(secondUserPage);
    user2TransactionDetail = new TransactionDetailPage(secondUserPage);
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

    await test.step("should capture the user2 balance", async () => {
      const response = await secondUserPage.request.get(
        "http://localhost:3001/checkAuth",
      );
      const { user } = await response.json();
      const userRes = await secondUserPage.request.get(
        `http://localhost:3001/users/${user.id}`,
      );
      const body = await userRes.json();
      user2Balance = body.user.balance;
    });
    await test.step("should capture the user1 balance", async () => {
      const response = await loggedInPage.request.get(
        "http://localhost:3001/checkAuth",
      );
      const { user } = await response.json();
      const userRes = await loggedInPage.request.get(
        `http://localhost:3001/users/${user.id}`,
      );
      const body = await userRes.json();
      user1Balance = body.user.balance;
    });
    await test.step("should make payment and capture transaction data", async () => {
      const responsePromise = loggedInPage.waitForResponse(
        (res) =>
          res.url().includes("/transactions") &&
          res.request().method() === "POST",
      );

      await homePage.newTransactionButton.click();
      await newTransactionPage.searchInput.fill("Dina20");
      await newTransactionPage.userListItem.filter({ hasText: "Dina20" }).first().click();
      await newTransactionPage.amountInput.fill("5");
      await newTransactionPage.noteInput.fill("$5 payment");
      await newTransactionPage.payButton.click();

      const response = await responsePromise;
      const body = await response.json();
      transactionId = body.transaction.id;

      await expect(newTransactionPage.returnToTransactionsButton).toBeVisible();
    });

    await test.step("should verify that the user1 balance decreased", async () => {
      const response = await loggedInPage.request.get(
        "http://localhost:3001/checkAuth",
      );
      const { user } = await response.json();
      await expect
        .poll(async () => {
          const res = await loggedInPage.request.get(
            `http://localhost:3001/users/${user.id}`,
          );
          const body = await res.json();
          return body.user.balance;
        })
        .toBe(user1Balance - 500);
    });

    await test.step("should verify that the user2 balance increased", async () => {
      const response = await secondUserPage.request.get(
        "http://localhost:3001/checkAuth",
      );
      const { user } = await response.json();
      await expect
        .poll(async () => {
          const res = await secondUserPage.request.get(
            `http://localhost:3001/users/${user.id}`,
          );
          const body = await res.json();
          return body.user.balance;
        })
        .toBe(user2Balance + 500);
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
  let newTransactionPage: NewTransactionPage;
  let sideMenuPage: SideMenuPage;
  let transactionDetailPage: TransactionDetailPage;
  let user2SideMenu: SideMenuPage;
  let user2TransactionDetail: TransactionDetailPage;

  test.beforeEach(async ({ loggedInPage, secondUserPage }) => {
    newTransactionPage = new NewTransactionPage(loggedInPage);
    sideMenuPage = new SideMenuPage(loggedInPage);
    transactionDetailPage = new TransactionDetailPage(loggedInPage);
    user2SideMenu = new SideMenuPage(secondUserPage);
    user2TransactionDetail = new TransactionDetailPage(secondUserPage);
  });

  test("should accept a payment request and verify both balances", async ({
    loggedInPage,
    secondUserPage,
  }) => {
    await test.step("should capture user1 balance", async () => {});
    await test.step("should capture the user2 balance", async () => {});
    await test.step("user1 should make a request and capture transaction data", async () => {});
    await test.step("user2 should accept the transaction ", async () => {});
    await test.step("should verify that the user2 balance decreased by N", async () => {});
    await test.step("should verify that the user1 balance increased by N", async () => {});
    await test.step("should verify that the transaction id matches", async () => {});
  });
  test("should reject a payment request and verify both balances are the same", async ({
    loggedInPage,
    secondUserPage,
  }) => {
    await test.step("should capture user2 balance", async () => {});
    await test.step("should capture the user1 balance", async () => {});
    await test.step("user1 should make a request and capture transaction data", async () => {});
    await test.step("user2 should reject the transaction ", async () => {});
    await test.step("should verify that the user2 balance wasn't changed", async () => {});
    await test.step("should verify that the user1 balance wasn't changed", async () => {});
    await test.step("should verify that the transaction id matches", async () => {});
  });
});
