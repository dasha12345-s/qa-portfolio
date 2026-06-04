import { Page } from "@playwright/test";

export class BankAccountsPage{
    private readonly page: Page;    

    constructor(page: Page){    
        this.page = page;
    }

    get heading() { return this.page.getByRole('heading', { name: 'Bank accounts' }) }
    get createAccountButton() { return this.page.locator('[data-test="bankaccount-new"]') }
    get deleteAccountButton() { return this.page.locator('[data-test="bankaccount-delete"]') }
    get bankItems() {return this.page.locator('[data-test^="bankaccount-list-item-"]')}

    goto() {
        return this.page.goto('/bankaccounts');
    }
}