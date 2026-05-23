import { Page } from "@playwright/test";

export class SignUpPage {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get heading() { return this.page.getByRole('heading', { name: 'Sign up' }) }
    get firstName() { return this.page.getByRole('textbox', { name: 'First Name' }) }
    get lastName() { return this.page.getByRole('textbox', { name: 'Last Name' }) }
    get username() { return this.page.getByRole('textbox', { name: 'Username' }) }
    get password() { return this.page.locator('#password') }
    get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm Password' }) }
    get signUpButton() { return this.page.getByRole('button', { name: 'Sign up' }) }
    get signInLink() { return this.page.locator('a[href="/signin"]') }
    get errorMessagePasswordLength() { return this.page.getByText('Password must contain at least 4 characters')}
    get errorMessageUsernameRequired() { return this.page.getByText('Username is required') }
    get errorMessageFirstNameRequired() { return this.page.getByText('First Name is required') }
    get errorMessageLastNameRequired() { return this.page.getByText('Last Name is required') }
    get errorMessagePasswordRequired() { return this.page.getByText('Enter your password') }
    get errorMessageConfirmPasswordRequired() { return this.page.getByText('Confirm your password') }
    get errorMessagePasswordsDoNotMatch() { return this.page.getByText('Password does not match') }

    async goto() {
    await this.page.goto('/signup');
}}

