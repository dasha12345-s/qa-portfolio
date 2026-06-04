import { test, expect } from "../../fixtures";
import { UserSettingsPage } from "../pages/UserSettingsPage";


test.describe("User Settings", () => {
  let userSettingsPage: UserSettingsPage;

  test.beforeEach(async ({ loggedInPage }) => {
    userSettingsPage = new UserSettingsPage(loggedInPage);
     await userSettingsPage.goto();
  });

  test("should update user profile information and persist after reload", { tag: "@smoke" }, async ({browserName}) => {
    test.fail(browserName === 'firefox' || browserName === 'webkit', 'bug: Save button does not submit in Firefox/WebKit');
    await test.step("Update user profile information", async () => {
      await userSettingsPage.firstNameInput.clear();
      await userSettingsPage.firstNameInput.fill("Jane");
      await userSettingsPage.lastNameInput.clear();
      await userSettingsPage.lastNameInput.fill("Smith")
      await userSettingsPage.emailInput.clear();
      await userSettingsPage.emailInput.fill("jane.smith@example.com");
      await userSettingsPage.phoneInput.clear();
      await userSettingsPage.phoneInput.fill("1234567890");
      await userSettingsPage.saveButton.click();
      await userSettingsPage.goto();
    });
    await test.step("Verify updated information persists after reload", async () => {
      await expect(userSettingsPage.firstNameInput).toHaveValue("Jane");
      await expect(userSettingsPage.lastNameInput).toHaveValue("Smith");
      await expect(userSettingsPage.emailInput).toHaveValue("jane.smith@example.com");
      await expect(userSettingsPage.phoneInput).toHaveValue("1234567890");
    });
  });

  test("should validate empty required fields and show error messages", { tag: "@regression" }, async () => {
    await test.step("Clear required fields and trigger validation", async () => {
      await userSettingsPage.firstNameInput.clear();
      await userSettingsPage.lastNameInput.clear();
      await userSettingsPage.emailInput.clear();
      await userSettingsPage.phoneInput.clear()
    });
    await test.step("Verify error messages are displayed for each required field", async () => {
      await expect(userSettingsPage.errorMessageFirstNameRequired).toBeVisible();
      await expect(userSettingsPage.errorMessageLastNameRequired).toBeVisible();
      await expect(userSettingsPage.errorMessageEmailRequired).toBeVisible();
      await expect(userSettingsPage.errorMessagePhoneRequired).toBeVisible();
    });
  });

    test("should validate invalid email and phone formats and show error messages", { tag: "@regression" }, async () => {
    await test.step("Enter invalid email and phone formats and trigger validation", async () => {
      await userSettingsPage.emailInput.fill("invalid-email");
      await userSettingsPage.phoneInput.fill("invalid-phone");
    });
    await test.step("Verify error messages are displayed for invalid email and phone formats", async () => {
      await expect(userSettingsPage.errorMessageEmailInvalid).toBeVisible();
      await expect(userSettingsPage.errorMessagePhoneInvalid).toBeVisible();
    });
  });
});