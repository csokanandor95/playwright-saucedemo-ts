import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';
import { InventoryPage } from '@pages/InventoryPage';

test.describe('Shopping Cart Tests', () => {

  test('TC-C01: Add single item to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');

    const badge = await inventoryPage.getCartBadgeCount();
    expect(badge).toBe('1');
  });

  test('TC-C02: Add multiple items to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');

    const badge = await inventoryPage.getCartBadgeCount();
    expect(badge).toBe('2');
  });

  test('TC-C03: Cart badge updates dynamically', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');

    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartBadgeCount()).toBe('2');

    await inventoryPage.addItemToCartByName('Sauce Labs Bolt T-Shirt');
    expect(await inventoryPage.getCartBadgeCount()).toBe('3');
  });

  test('TC-C04: Remove item from cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe('1');

    await inventoryPage.removeItemFromCartByName('Sauce Labs Backpack');
    const badgeVisible = await inventoryPage.isCartBadgeVisible();
    expect(badgeVisible).toBe(false);
  });

  test('TC-C05: Cart contains added item', async ({ inventoryPage, cartPage }) => { // itt már kell cartpage példány is
    const itemName = 'Sauce Labs Backpack';
    await inventoryPage.addItemToCartByName(itemName);
    await inventoryPage.goToCart();

    const isInCart = await cartPage.isItemInCart(itemName);
    expect(isInCart).toBe(true);
  });

});