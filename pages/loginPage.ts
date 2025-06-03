import { Locator, Page } from "@playwright/test"

export default class LoginPage {
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly invalidCredentialsError: Locator;

    constructor(public page: Page) {
        this.page = page
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialsError = page.locator('.flash.error');

    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
     }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}