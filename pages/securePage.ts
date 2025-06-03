import { Locator, Page } from "@playwright/test"

export default class SecurePage {
    readonly loginSuccessMessage: Locator;
    readonly logoutButton: Locator;

    constructor(public page: Page) {
        this.page = page
        this.loginSuccessMessage = page.getByText('You logged into a secure area!');
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }
}
