import { test, expect } from "../../fixtures";
import { HomePage } from "../pages/HomePage";
import { NewTransactionPage } from "../pages/NewTransactionPage";

test.describe("New Transaction", () => {
  let homePage: HomePage;
  let newTransactionPage: NewTransactionPage;

  test.beforeEach(async ({ loggedInPage }) => {
    homePage = new HomePage(loggedInPage);
    newTransactionPage = new NewTransactionPage(loggedInPage);

    await homePage.newTransactionButton.click();
    await newTransactionPage.searchInput.fill("Dina20");
    await newTransactionPage.userListItem.filter({ hasText: "Dina20" }).click();
  });

  test("Send a payment",  { tag: "@smoke" },  async () => {
    await test.step("Enter amount and note, then submit the payment", async () => {
      await newTransactionPage.amountInput.fill("5");
      await newTransactionPage.noteInput.fill("$5 payment");
      await newTransactionPage.payButton.click();
      await expect(newTransactionPage.returnToTransactionsButton).toBeVisible();
    });
  });

  test("Request a payment",  { tag: "@smoke" },  async () => {
    await test.step("Enter amount and note, then submit the payment request", async () => {
      await newTransactionPage.amountInput.fill("10");
      await newTransactionPage.noteInput.fill("$10 payment request");
      await newTransactionPage.requestButton.click();
      await expect(newTransactionPage.returnToTransactionsButton).toBeVisible();
      await expect(
        newTransactionPage.createAnotherTransactionButton,
      ).toBeVisible();
    });
  });

  test.describe("Form validation", () => {
    test("should show error when the amount is empty", { tag: "@regression" }, async () => {
      await newTransactionPage.amountInput.click();
      await newTransactionPage.noteInput.fill("Payment without amount");
      await newTransactionPage.noteInput.blur();
      await expect(newTransactionPage.errorMessageAmountRequired).toBeVisible();
    });

    test("should show error when the amount is negative", { tag: "@regression" }, async () => {
      test.fail(true, "Known bug: negative amount does not trigger validation error in the UI")
      await newTransactionPage.amountInput.fill("-5");
      await newTransactionPage.amountInput.blur();
      await expect(newTransactionPage.errorMessageAmountPositive).toBeVisible();
    });

    test("should show error when the amount is 0", { tag: "@regression" }, async () => {
      test.fail(true, "Known bug: zero amount does not trigger validation error in the UI")
      await newTransactionPage.amountInput.fill("0");
      await newTransactionPage.amountInput.blur();
      await expect(newTransactionPage.errorMessageAmountPositive).toBeVisible();
    });

    test("should show error when the note is empty", { tag: "@regression" }, async () => {
      await newTransactionPage.amountInput.fill("5");
      await newTransactionPage.noteInput.click();
      await newTransactionPage.noteInput.blur();
      await expect(newTransactionPage.errorMessageNoteRequired).toBeVisible();
    });
  });
});
