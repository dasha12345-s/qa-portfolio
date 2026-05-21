import { Page } from "@playwright/test";

export class BankAccountsPage{
    private readonly page: Page;    

    constructor(page: Page){    
        this.page = page;
    }

    get heading() { return this.page.getByRole('heading', { name: 'Bank accounts' }) }
    get createAccountButton() { return this.page.getByRole('button', { name: 'Create' }) }
    get deleteAccountButton() { return this.page.getByTestId('bankaccount-delete') }

    goto() {
        return this.page.goto('/bankaccounts');
    }
}