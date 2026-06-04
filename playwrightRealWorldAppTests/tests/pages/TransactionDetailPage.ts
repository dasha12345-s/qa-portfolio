import { Page } from "@playwright/test";

export class TransactionDetailPage {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get transactionSender() {return this.page.locator('span[data-test^="transaction-sender-"]')}
    get transactionReceiver() {return this.page.locator('span[data-test^="transaction-receiver-"]')}
    get transactionDescription() {return this.page.getByTestId('transaction-description')}
    get transactionAmount() {return this.page.locator('[data-test^="transaction-amount-"]')}
    get acceptRequestButton() {return this.page.getByRole('button', { name: 'Accept request' })}
    get rejectRequestButton() {return this.page.getByRole('button', { name: 'Reject request' })}
    get commentInput() {return this.page.getByPlaceholder('Write a comment')}
    get likeButton() { return this.page.locator('[data-test^="transaction-like-button-"]') }
    get likeCount() { return this.page.locator('[data-test^="transaction-like-count-"]') }
    get commentList() {return this.page.locator('[data-test^="comment-list-item-"]')}
}