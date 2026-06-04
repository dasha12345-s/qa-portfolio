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
    get navToggle() {return this.page.locator('[data-test="sidenav-toggle"]')}
    get transactionList() { return this.page.getByTestId('transaction-list') }
    get transactionListItems() { return this.transactionList.locator('[data-test^="transaction-item-"]') }
    get dateFilter() { return this.page.getByTestId('transaction-list-filter-date-range-button')}
    get dateRange() {return this.page.locator('[data-test="transaction-list-filter-date-range"]')}
    get amountSlider() {return this.page.locator('[data-test="transaction-list-filter-amount-range-slider"]')}
    get amountFilter() { return this.page.getByTestId('transaction-list-filter-amount-range-button')}
    get sideBar() {return this.page.locator('[data-test="sidenav"]')}
    get sideBarPaper() { return this.page.locator('.MuiDrawer-paper') }

    async goto() {
        await this.page.goto('/');
    }
}