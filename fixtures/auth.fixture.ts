import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../test-data/users';

// A fixture által biztosított objektumok típusa
type AuthFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<AuthFixtures>({

  // Bejelentkezett állapotot biztosít + visszaadja a POM példányokat
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await use(loginPage);
  },

  inventoryPage: async ({ page, loginPage }, use) => {
    // loginPage fixture lefut először – garantált bejelentkezés
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page, loginPage }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

});

export { expect } from '@playwright/test';