import { expect, test } from "../../fixtures";
import { NotificationsPage } from "../pages/NotificationsPage";

test.describe("Notifications Page", () => {
  let notificationsPage: NotificationsPage;

  test.beforeEach(async ({ loggedInPage }) => {
    notificationsPage = new NotificationsPage(loggedInPage);
    await notificationsPage.goto();
  });

  test("should display incoming payment notification", async ({
    secondUserPage,
    userIds,
  }) => {
    const { user1Id, user2Id } = userIds;

    await test.step("should create new transaction", async () => {
      const response = await secondUserPage.request.post(
        "http://localhost:3001/transactions",
        {
          data: {
            transactionType: "payment",
            senderId: user2Id,
            receiverId: user1Id,
            amount: 10,
            description: "notification test",
          },
        },
      );
      expect(response.status()).toBe(200);
    });
    await test.step("should display notification at receivers page", async () => {
      await notificationsPage.goto();
      await expect(notificationsPage.notificationsItem.first()).toBeVisible();
    });
  });
  test("should mark notification as read when dismissed", async ({
    secondUserPage,
    userIds,
  }) => {
    const { user1Id, user2Id } = userIds;

    await test.step("should create new transaction", async () => {
      const response = await secondUserPage.request.post(
        "http://localhost:3001/transactions",
        {
          data: {
            transactionType: "payment",
            senderId: user2Id,
            receiverId: user1Id,
            amount: 10,
            description: "notification test",
          },
        },
      );
      expect(response.status()).toBe(200);
    });

    await test.step("should dismiss notification and update notification button count", async () => {
      await notificationsPage.goto();
      await notificationsPage.notificationsItem.first().waitFor();
      const countBefore = await notificationsPage.notificationsItem.count();
      await notificationsPage.dismissButton.first().click();
      await expect(notificationsPage.notificationsItem).toHaveCount(
        countBefore - 1,
      );
    });
  });
});
