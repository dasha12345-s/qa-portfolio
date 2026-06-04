import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Sign Up Page", () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.goto();
  });

  test("successful registration", { tag: "@smoke" }, async ({page}) => {
    await test.step("Fill in registration form", async () => {

      const username = `user_${Date.now()}`;

      await signUpPage.firstName.fill("John");
      await signUpPage.lastName.fill("Doe");
      await signUpPage.username.fill(username);
      await signUpPage.password.fill("s3cret");
      await signUpPage.confirmPassword.fill("s3cret");
      await signUpPage.confirmPassword.blur();
    });
    await test.step("Submit form and verify successful registration", async () => {
      await signUpPage.signUpButton.click();
      await expect(page).toHaveURL("/signin");
    });
  });

  test.describe("empty field validation", () => {
    test("should show error message for empty first name",  { tag: "@regression" },  async () => {
      await signUpPage.firstName.click();
      await signUpPage.lastName.click();
      await expect.soft(signUpPage.signUpButton).toBeDisabled();
      await expect(signUpPage.errorMessageFirstNameRequired).toBeVisible();
    });
    test("should show error message for empty last name",  { tag: "@regression" },  async () => {
      await signUpPage.lastName.click();
      await signUpPage.firstName.click();
      await expect.soft(signUpPage.signUpButton).toBeDisabled();
      await expect(signUpPage.errorMessageLastNameRequired).toBeVisible();
    });
    test("should show error message for empty username",  { tag: "@regression" },  async () => {
      await signUpPage.username.click();
      await signUpPage.firstName.click();
      await expect.soft(signUpPage.signUpButton).toBeDisabled();
      await expect(signUpPage.errorMessageUsernameRequired).toBeVisible();
    });
    test("should show error message for empty password",  { tag: "@regression" },  async () => {
      await signUpPage.password.click();
      await signUpPage.firstName.click();
      await expect.soft(signUpPage.signUpButton).toBeDisabled();
      await expect(signUpPage.errorMessagePasswordRequired).toBeVisible();
    });
    test("should show error message for empty confirm password", { tag: "@regression" }, async () => {
      await signUpPage.confirmPassword.click();
      await signUpPage.firstName.click();
      await expect.soft(signUpPage.signUpButton).toBeDisabled();
      await expect(signUpPage.errorMessageConfirmPasswordRequired).toBeVisible();
    });
  });

  test.describe("password validation", () => {
    test("should show error message for password less than 4 characters", { tag: "@regression" }, async () => {
      await signUpPage.password.fill("123");
      await signUpPage.confirmPassword.fill("123");
      await expect(signUpPage.errorMessagePasswordLength).toBeVisible();
    });
    test("should show error message when password and confirm password do not match", { tag: "@regression" }, async () => {
      await signUpPage.password.fill("s3cret");
      await signUpPage.confirmPassword.fill("different");
      await expect(signUpPage.errorMessagePasswordsDoNotMatch).toBeVisible();
    });
  });

  test.describe("sign in link navigation", () => {
    test("should navigate to sign in page when clicking on sign in link", { tag: "@regression" }, async ({ page }) => {
      await signUpPage.signInLink.evaluate((el) => 
        (el as HTMLAnchorElement).click());
      await expect(page).toHaveURL("/signin");
    });
  });
});
