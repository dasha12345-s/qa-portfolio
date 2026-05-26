import { Page } from '@playwright/test'

export class SignInPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    get heading() { return this.page.getByRole('heading', { name: 'Sign in' }) }
    get username() {return this.page.getByRole('textbox', { name: 'Username' })}
    get password() {return this.page.getByRole('textbox', { name: 'Password' })}
    get signInButton() {return this.page.getByRole('button', { name: 'Sign in' })}
    get signUpLink() {return this.page.locator('[data-test="signup"]')}
    get rememberMeCheckbox() {return this.page.getByTestId('signin-remember-me')}
    get errorMessagePasswordLength() {return this.page.getByText('Password must contain at least 4 characters')}
    get errorMessageInvalidCredentials() {return this.page.getByText('Username or password is invalid')}
    get errorMessageUsernameRequired() {return this.page.getByText('Username is required')}
    get errorMessagePasswordRequired() {return this.page.getByText('Password is required')}

    async goto() {
        await this.page.goto('/signin');
    }

    async login(username: string, password: string){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.signInButton.click()
    }
}