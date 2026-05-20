import { Page } from "@playwright/test";

export class SignUpPage {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get heading() { return this.page.getByRole('heading', { name: 'Sign up' }) }
    get firstName() { return this.page.getByPlaceholder('Firstname') }
    get lastName() { return this.page.getByPlaceholder('Lastname') }
    get username() { return this.page.getByPlaceholder('Username') }
    get password() { return this.page.getByPlaceholder('Password') }
    get confirmPassword() { return this.page.getByPlaceholder('Confirm Password') }
    get signUpButton() { return this.page.getByRole('button', { name: 'Sign up' }) }
    get signInLink() { return this.page.getByText('Have an account? Sign In') }
    get errorMessagePasswordLength() { return this.page.getByText('Password must contain at least 4 characters')}
    get errorMessageUsernameRequired() { return this.page.getByText('Username is required') }
    get errorMessageFirstNameRequired() { return this.page.getByText('First Name is required') }
    get errorMessageLastNameRequired() { return this.page.getByText('Last Name is required') }
    get errorMessagePasswordRequired() { return this.page.getByText('Password is required') }
    get errorMessageConfirmPasswordRequired() { return this.page.getByText('Confirm your password') }

    async goto() {
    await this.page.goto('/signup');
}}