import { Page } from "@playwright/test";

export class SideMenuPage {
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get fullUserName() {return this.page.getByTestId('sidenav-user-full-name')}
    get username() {return this.page.getByTestId('sidenav-username')}
    get avatar() {return this.page.getByRole('img')}
    get accountBalance() {return this.page.getByTestId('sidenav-user-balance')}
    get homeLink() {return this.page.getByTestId('sidenav-home')}
    get myAccountLink() {return this.page.getByTestId('sidenav-user-settings')}
    get bankAccountsLink() {return this.page.getByTestId('sidenav-bankaccounts')}
    get notificationsLink() {return this.page.getByTestId('sidenav-notifications')}
    get logoutButton() {return this.page.getByTestId('sidenav-signout')}
}