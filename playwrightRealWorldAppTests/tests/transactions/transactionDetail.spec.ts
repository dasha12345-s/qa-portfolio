import { test, expect } from "../../fixtures";
import { HomePage } from "../pages/HomePage";
import { TransactionDetailPage } from "../pages/TransactionDetailPage";

test.describe("Transaction Detail Page", () => {
  let homePage: HomePage;
  let transactionDetailPage: TransactionDetailPage;

  test.beforeEach(async ({ loggedInPage }) => {
  homePage = new HomePage(loggedInPage);
  transactionDetailPage = new TransactionDetailPage(loggedInPage);

  await homePage.personalTransactions.click();
  await homePage.transactionListItems.first().click();
});

test('sender name should be visible ', {tag: '@regression'}, async () => {
  await expect(transactionDetailPage.transactionSender).toBeVisible();
})
test('receiver name should be visible ', {tag: '@regression'}, async () => {
  await expect(transactionDetailPage.transactionReceiver).toBeVisible()
})
test('transaction description should be visible ', {tag: '@regression'}, async () => {
  await expect(transactionDetailPage.transactionDescription).toBeVisible()
})
test('transaction amount should be visible ', { tag: '@smoke' }, async () => {
  await expect(transactionDetailPage.transactionAmount).toBeVisible()})
test('should allow user to add a comment', {tag: '@regression'}, async () => {
    const commentText = "This is a test comment";
    await transactionDetailPage.commentInput.fill(commentText);
    await transactionDetailPage.commentInput.press('Enter');
    const newComment = transactionDetailPage.commentList.last();
    await expect(newComment).toHaveText(commentText);
})
});
