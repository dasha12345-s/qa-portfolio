import {test, expect} from "../../fixtures";
import {BankAccountsPage} from "../pages/BankAccountsPage";
import {NewBankAccountPage} from "../pages/NewBankAccountPage";

test.describe("Bank Accounts", () => {
    let bankAccountsPage: BankAccountsPage;
    let newBankAccountPage: NewBankAccountPage;

    test.beforeEach(async ({loggedInPage}) => {
        bankAccountsPage = new BankAccountsPage(loggedInPage);
        newBankAccountPage = new NewBankAccountPage(loggedInPage);
        await bankAccountsPage.goto();
    });

    test("should add a new bank account and display it in the list", {tag: "@smoke"}, async () => {
        const accountName = "Test Account";
        const routingNumber = "123456789";
        const accountNumber = "987654321";

        await test.step("Add a new bank account", async () => {
            await bankAccountsPage.createAccountButton.click();
            await newBankAccountPage.bankNameInput.fill(accountName);
            await newBankAccountPage.routingNumberInput.fill(routingNumber);
            await newBankAccountPage.accountNumberInput.fill(accountNumber);
            await newBankAccountPage.saveButton.click();
        })

        await test.step("Verify the new bank account is displayed in the list", async () => {
            await expect(bankAccountsPage.bankItems.last()).toContainText(accountName);
        });
    });

    test("should delete a bank account", {tag: "@regression"}, async () => {
        const accountName = "Test Account to Delete";
        const routingNumber = "123456789";
        const accountNumber = "987654321";

        await test.step("Add a new bank account to be deleted", async () => {
            await bankAccountsPage.createAccountButton.click();
            await newBankAccountPage.bankNameInput.fill(accountName);
            await newBankAccountPage.routingNumberInput.fill(routingNumber);
            await newBankAccountPage.accountNumberInput.fill(accountNumber);
            await newBankAccountPage.saveButton.click();
        });
        
        await test.step("Delete the newly added bank account", async () => {
            await expect(bankAccountsPage.bankItems.last()).toContainText(accountName);
            await bankAccountsPage.deleteAccountButton.last().click();
            await expect(bankAccountsPage.bankItems.last()).toContainText("(Deleted)");
        });
    });

    test("should display validation errors when creating a bank account with invalid data", {tag: "@regression"}, async () => {
        await test.step('should display validation errors for empty fields', async () => {
            await bankAccountsPage.createAccountButton.click();
            await newBankAccountPage.bankNameInput.click()
            await newBankAccountPage.routingNumberInput.click();
            await newBankAccountPage.accountNumberInput.click();
            await newBankAccountPage.accountNumberInput.blur();
            await expect(newBankAccountPage.errorMessageBankNameRequired).toBeVisible();
            await expect(newBankAccountPage.errorMessageRoutingNumberRequired).toBeVisible();
            await expect(newBankAccountPage.errorMessageAccountNumberRequired).toBeVisible();
        });

        await test.step('should display validation errors for invalid routing and account numbers', async () => {
            await newBankAccountPage.routingNumberInput.fill("invalid");
            await newBankAccountPage.accountNumberInput.fill("invalid");
            await newBankAccountPage.accountNumberInput.blur();
            await expect(newBankAccountPage.errorMessageInvalidRoutingNumber).toBeVisible();
            await expect(newBankAccountPage.errorMessageAccountNumberLength).toBeVisible();
        });
});
test('should display validation errors for input length', {tag: "@regression"}, async () => {
        await test.step('should display validation error when the length is less then 5 characters', async () => {
            await bankAccountsPage.createAccountButton.click();
            await newBankAccountPage.bankNameInput.fill("ab");           
            await newBankAccountPage.routingNumberInput.fill("123");     
            await newBankAccountPage.accountNumberInput.fill("12345");   
            await newBankAccountPage.accountNumberInput.blur();
            await expect(newBankAccountPage.errorMessageBankAccountLength).toBeVisible();
            await expect(newBankAccountPage.errorMessageRoutingNumberLength).toBeVisible();
            await expect(newBankAccountPage.errorMessageAccountNumberLength).toBeVisible();
});
});
})