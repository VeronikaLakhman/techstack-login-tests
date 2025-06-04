import { test, expect } from '../fixtures/fixtures'


test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/login`);
})

test('Login with valid username and password', async ({ page, pm }) => {
    await pm.onLoginPage().enterUsername(process.env.USERNAME!)
    await pm.onLoginPage().enterPassword(process.env.PASSWORD!)

    const authSecurePromise = page.waitForResponse(
        (resp) => resp.url().includes("/secure") && resp.request().method() === "GET"
    );

    await pm.onLoginPage().clickLoginButton()

    const authSecureResponse = await authSecurePromise;
    await expect(authSecureResponse.status(), "Login response status should be 200").toBe(200);

    await expect(pm.onSecurePage().loginSuccessMessage, "Login success message should be visible").toBeVisible();
})


test('Should show browser error with empty username and password', async ({ page, pm }) => {
    await test.step("Submit empty form", async () => {
        await pm.onLoginPage().clickLoginButton();
    });

    await test.step("Check for username error message", async () => {
        await expect(pm.onLoginPage().invalidCredentialsError, "Invalid credentials error should be visible").toBeVisible();
        await expect(await pm.onLoginPage().getErrorText(), "Invalid credentials error message should contain 'Your username is invalid!'").toContain('Your username is invalid!');

    });
})

test('Should show browser error with valid username and empty password', async ({ page, pm }) => {
    await test.step("Enter valid username and empty password", async () => {
        await pm.onLoginPage().enterUsername(process.env.USERNAME!);
        await pm.onLoginPage().enterPassword("");
        await pm.onLoginPage().clickLoginButton();
    });

    await test.step("Check for password error message", async () => {
        await expect(pm.onLoginPage().invalidCredentialsError, "Invalid credentials error should be visible").toBeVisible();
        await expect(await pm.onLoginPage().getErrorText(), "Invalid credentials error message should contain 'Your password is invalid!'").toContain('Your password is invalid!');
    });
})


