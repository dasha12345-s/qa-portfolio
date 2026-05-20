import { Page } from "@playwright/test";

export class SignUpPage {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get heading() { return this.page.getByRole('heading', { name: 'Sign up' }) }
    get username() { return this.page.getByPlaceholder('Username') }
}