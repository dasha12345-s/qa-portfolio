import { test, expect } from "../../fixtures";
import { NewTransactionPage } from "../pages/NewTransactionPage";
import { SideMenuPage } from "../pages/SideMenuPage";

test.describe("Transaction Page flow - send payment", () => {
  let newTransactionPage: NewTransactionPage;
  let sideMenuPage: SideMenuPage;

  test.beforeEach(async ({ loggedInPage }) => {
    newTransactionPage = new NewTransactionPage(loggedInPage);
    sideMenuPage = new SideMenuPage(loggedInPage);
  });

  test("Should complete full payment flow and verify both accounts", async ({
    loggedInPage,
    secondUserPage,
  }) => {
    await test.step("should capture the receiver balance", async () => {});
    await test.step("should capture the sender balance", async () => {});
    await test.step("should make payment and capture transaction data", async () => {});
    await test.step("should verify that the sender balance decreased", async () => {});
    await test.step("should verify that the receiver balance increased", async () => {});
    await test.step("should verify that the transaction id matches", async () => {});
  });
});

test.describe("Transaction Page flow - request payment", () => {
  let newTransactionPage: NewTransactionPage;
  let sideMenuPage: SideMenuPage;

  test.beforeEach(async ({ loggedInPage }) => {
    newTransactionPage = new NewTransactionPage(loggedInPage);
    sideMenuPage = new SideMenuPage(loggedInPage);
  });

  test("should accept a payment request and verify both balances", async () => {
    await test.step("should capture receiver balance", async () => {});
    await test.step("should capture the sender balance", async () => {});
    await test.step("sender should make a request and capture transaction data", async () => {});
    await test.step("receiver should accept the transaction ", async () => {});
    await test.step("should verify that the receiver balance increased by N", async () => {});
    await test.step("should verify that the sender balance decreased by N", async () => {});
    await test.step("should verify that the transaction id matches", async () => {});
  });
  test("should reject a payment request and verify both balances are the same", async () => {
    await test.step("should capture receiver balance", async () => {});
    await test.step("should capture the sender balance", async () => {});
    await test.step("sender should make a request and capture transaction data", async () => {});
    await test.step("receiver should reject the transaction ", async () => {});
    await test.step("should verify that the receiver balance wasn't changed", async () => {});
    await test.step("should verify that the sender balance wasn't changed", async () => {});
    await test.step("should verify that the transaction id matches", async () => {});
  });
});
