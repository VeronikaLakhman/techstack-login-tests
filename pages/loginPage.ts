import { expect, Locator, Page } from "@playwright/test"

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
        this.invalidCredentialsError = page.locator('div#flash.flash.error[data-alert]');
    }

    async enterUsername(username: string) {
        await this.usernameInput.waitFor({ state: 'visible' });
        await expect(this.usernameInput, "Username input should be enabled").toBeEnabled();
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
        await expect(this.usernameInput, "Username input should have value").toHaveValue(username);
     }

    async enterPassword(password: string) {
        await this.passwordInput.waitFor({ state: 'visible' });
        await expect(this.passwordInput, "Password input should be enabled").toBeEnabled();
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
        await expect(this.passwordInput, "Password input should have value").toHaveValue(password);
    }

    async clickLoginButton() {
        await this.loginButton.waitFor({ state: 'visible' });
        await expect(this.loginButton, "Login button should be enabled").toBeEnabled();
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async getErrorText() {
        return await this.invalidCredentialsError.textContent();
      }
}