import { Page } from "@playwright/test";

export class NotificationsPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get heading() { return this.page.getByRole('heading', { name: 'Notifications' }) }
    get notificationsItem() {return this.page.locator('[data-test^="notification-list-item-"]')}
    get dismissButton() {return this.page.locator('[data-test^="notification-mark-read-"]')}

    async goto() {
        await this.page.goto('/notifications');
    }
}