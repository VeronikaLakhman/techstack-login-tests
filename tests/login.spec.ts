import { test, expect } from  '../fixtures/fixtures'
import { PageManager } from '../pages/pageManager';

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/login`);
})

test('Login with valid username and password', async ({ page }) => {
    const pm = new PageManager(page)

    await pm.onLoginPage().enterUsername(process.env.USERNAME!)
    await pm.onLoginPage().enterPassword(process.env.PASSWORD!)

    const authSecurePromise = page.waitForResponse(
        (resp) => resp.url().includes("/secure") && resp.request().method() === "GET"
    );

    await pm.onLoginPage().clickLoginButton()

    const authSecureResponse = await authSecurePromise;
    await expect(authSecureResponse.status()).toBe(200);

    await expect(pm.onSecurePage().loginSuccessMessage).toBeVisible();
})


test('Should show browser error with empty username and password', async ({ page }) => {
    const pm = new PageManager(page)

    await test.step("Submit empty form", async () => {
        await pm.onLoginPage().clickLoginButton();
    });

    await test.step("Check for error message", async () => {
        await expect(pm.onLoginPage().invalidCredentialsError).toBeVisible();
        await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
    });
})

test('Should show browser error with valid username and empty password', async ({ page }) => {
    const pm = new PageManager(page)

    await test.step("Enter valid username and empty password", async () => {
        await pm.onLoginPage().enterUsername(process.env.USERNAME!);
        await pm.onLoginPage().enterPassword("");
        await pm.onLoginPage().clickLoginButton();
    });

    await test.step("Check for error message", async () => {
        await expect(pm.onLoginPage().invalidCredentialsError).toBeVisible();
        await expect(page.locator('.flash.error')).toContainText('Your password is invalid!');
    });
})


