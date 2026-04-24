import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS, ERROR_MESSAGES } from '../test-data/users';

test.describe('Login Tests', () => { // Login teszt suite

  // Minden teszt előtt új LoginPage példány + navigálás
  // Így minden teszt izolált, egymástól független állapotból indul
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC-L01: Successful login with valid credentials', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC-L02: Failed login with invalid password', async ({ page }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain(ERROR_MESSAGES.invalidCredentials);
  });

  test('TC-L03: Locked user login attempt', async ({ page }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain(ERROR_MESSAGES.lockedUser);
  });

  test('TC-L04: Empty fields login attempt', async () => {
    await loginPage.loginWithEmptyFields();

    const error = await loginPage.getErrorMessage();
    expect(error).toContain(ERROR_MESSAGES.emptyUsername);
  });

});