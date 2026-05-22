import { expect, test } from "@playwright/test";
import { SignInPage } from "../pages/SignInPage";
import { SideMenuPage } from "../pages/SideMenuPage";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Sign In Page", () => {
  let signInPage: SignInPage;
  let sideMenuPage: SideMenuPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    sideMenuPage = new SideMenuPage(page);
    await signInPage.goto();
  });

  test("should login successfully", { tag: "@smoke" }, async ({ page }) => {
    await test.step("Fill in credentials", async () => {
      await signInPage.username.fill("Heath93");
      await signInPage.password.fill("s3cret");
    });
    await test.step("Submit form", async () => {
      await signInPage.signInButton.click();
      await expect(page).toHaveURL("/");
      await expect(sideMenuPage.fullUserName).toBeVisible();
    });
  });

  test.describe("empty field validation", async () => {
    test("should show error message for empty username", async () => {
      await signInPage.username.click();
      await signInPage.password.click();
      await expect.soft(signInPage.signInButton).toBeDisabled();
      await expect(signInPage.errorMessageUsernameRequired).toBeVisible();
    });
    test.fixme("should show error message for empty password", async () => {
      await signInPage.password.click();
      await signInPage.username.click();
      await expect.soft(signInPage.signInButton).toBeDisabled();
      await expect(signInPage.errorMessagePasswordRequired).toBeVisible();
    });
  });

  test.describe("invalid credentials validation", async () => {
    test("should show error message for invalid username", async () => {
      await signInPage.username.fill("invalidUser");
      await signInPage.password.fill("s3cret");
      await signInPage.signInButton.click();
      await expect(signInPage.errorMessageInvalidCredentials).toBeVisible();
    });
    test("should show error message for invalid password", async () => {
      await signInPage.username.fill("Heath93");
      await signInPage.password.fill("wrongPassword");
      await signInPage.signInButton.click();
      await expect(signInPage.errorMessageInvalidCredentials).toBeVisible();
    });
  });

  test.describe("password length validation", async () => {
    test("should show error message for password less than 4 characters", async () => {
      await signInPage.username.fill("Heath93");
      await signInPage.password.fill("123");
      await signInPage.username.click();
      await expect.soft(signInPage.signInButton).toBeDisabled();
      await expect(signInPage.errorMessagePasswordLength).toBeVisible();
    });
  });

  test.describe("sign up link navigation", () => {
    test("should navigate to sign up page when clicking on sign up link", async ({
      page,
    }) => {
      await signInPage.signUpLink.evaluate((el) =>
        (el as HTMLAnchorElement).click(),
      );
      await expect(page).toHaveURL("/signup");
    });
  });
});
