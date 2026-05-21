import {Page} from "@playwright/test";

export class HomePage{
    private readonly page:Page;

    constructor(page:Page) {
        this.page = page;
    }

    get publicTransactions() {return this.page.getByTestId('nav-public-tab')}
    get contactsTransactions() {return this.page.getByTestId('nav-contacts-tab')}
    get personalTransactions() {return this.page.getByTestId('nav-personal-tab')}
    get newTransactionButton() {return this.page.getByTestId('nav-top-new-transaction')}
    get notificationButton() {return this.page.getByTestId('nav-top-notifications-link')}
    get navToggle() {return this.page.getByTestId('nav-toggle')}
    get dateFilter() { return this.page.getByTestId('transaction-list-filter-date-range-button')}
    get amountFilter() { return this.page.getByTestId('transaction-list-filter-amount-range-button')}

    async goto() {
        await this.page.goto('/');
    }
}