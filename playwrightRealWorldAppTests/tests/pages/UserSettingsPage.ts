import { Page } from "@playwright/test";

export class UserSettingsPage{
    private readonly page: Page;
    
    constructor(page: Page){
        this.page = page;
    }   

    get heading() { return this.page.getByRole('heading', { name: 'User Settings' }) }
    get firstNameInput() { return this.page.getByTestId('user-settings-firstName-input') }
    get lastNameInput() { return this.page.getByTestId('user-settings-lastName-input')}
    get emailInput() { return this.page.getByTestId('user-settings-email-input') }
    get phoneInput() { return this.page.getByTestId('user-settings-phoneNumber-input') }
    get saveButton() { return this.page.getByRole('button', { name: 'Save' }) }
    get errorMessageFirstNameRequired() { return this.page.getByText('Enter a first name') }
    get errorMessageLastNameRequired() { return this.page.getByText('Enter a last name') }
    get errorMessageEmailRequired() { return this.page.getByText('Enter an email') }
    get errorMessagePhoneRequired() { return this.page.getByText('Enter a phone number') }
    get errorMessageEmailInvalid() { return this.page.getByText('Must contain a valid email address') }
    get errorMessagePhoneInvalid() { return this.page.getByText('Phone number is not valid') }

    async goto() {
    await this.page.goto('/user/settings');
}
}