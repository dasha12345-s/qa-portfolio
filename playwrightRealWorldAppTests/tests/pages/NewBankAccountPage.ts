import { Page } from "@playwright/test";

export class NewBankAccountPage {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get heading() { return this.page.getByRole('heading', { name: 'Create Bank Account' }) }
    get bankNameInput() { return this.page.getByPlaceholder('Bank Name') }
    get routingNumberInput() { return this.page.getByPlaceholder('Routing Number') }
    get accountNumberInput() { return this.page.getByPlaceholder('Account Number') }
    get saveButton() { return this.page.getByRole('button', { name: 'Save' }) }
    get errorMessageBankNameRequired() { return this.page.getByText('Enter a bank name') }
    get errorMessageRoutingNumberRequired() { return this.page.getByText('Enter a valid bank routing number')}
    get errorMessageAccountNumberRequired() { return this.page.getByText('Enter a valid bank account number') }
    get errorMessageBankAccountLength() { return this.page.getByText('Must contain at least 5 characters') }
    get errorMessageInvalidRoutingNumber() { return this.page.getByText('Must contain a valid routing number') }
    get errorMessageAccountNumberLength() { return this.page.getByText('Must contain at least 9 digits') }
    get errorMessageRoutingNumberLength() { return this.page.locator('#bankaccount-routingNumber-input-helper-text') 
}

    async goto() {
        await this.page.goto('/bankaccounts/new');
    }
}