import { Page } from "@playwright/test";

export class NewTransactionPage {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }


    get searchInput() {return this.page.getByPlaceholder('Search')}
    get userListItem() {return this.page.locator('[data-test^="user-list-item-"]')}
    get amountInput() {return this.page.getByPlaceholder('Amount')}
    get noteInput() {return this.page.getByPlaceholder('Add a note')}
    get requestButton() {return this.page.getByRole('button', { name: 'Request' })}
    get payButton() {return this.page.getByRole('button', { name: 'Pay' })}
    get errorMessageAmountRequired() { return this.page.getByText('Please enter a valid amount') }
    get errorMessageAmountPositive() { return this.page.getByText('amount must be') }
    get errorMessageNoteRequired() { return this.page.getByText('Please enter a note') }
    get returnToTransactionsButton() { return this.page.locator('[data-test="new-transaction-return-to-transactions"]') }
    get createAnotherTransactionButton() { return this.page.getByRole('button', { name: 'Create another transaction' }) }   

    async goto() {
        await this.page.goto('/transactions/new');
    }
}