import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';
import { SORT_OPTIONS, EXPECTED_SORT_RESULTS, PRODUCT_DETAIL } from '../test-data/inventory';

test.describe('Inventory Tests', () => {

  test('TC-I01: Products page loads with 6 items', async ({ inventoryPage }) => {
    const count = await inventoryPage.getInventoryItemCount();

    expect(count).toBe(6);
  });

  test('TC-I02: Sort by Name (Z-A)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.nameZA);

    const firstName = await inventoryPage.getFirstItemName();
    expect(firstName).toBe(EXPECTED_SORT_RESULTS.firstItemNameZA);
  });

  test('TC-I03: Sort by Name (A-Z)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.nameAZ);

    const firstName = await inventoryPage.getFirstItemName();
    expect(firstName).toBe(EXPECTED_SORT_RESULTS.firstItemNameAZ);
  });

  test('TC-I04: Sort by Price (low to high)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceLowHigh);

    const firstPrice = await inventoryPage.getFirstItemPrice();
    expect(firstPrice).toBe(EXPECTED_SORT_RESULTS.firstItemPriceLowHigh);
  });

  test('TC-I05: Sort by Price (high to low)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceHighLow);

    const firstPrice = await inventoryPage.getFirstItemPrice();
    expect(firstPrice).toBe(EXPECTED_SORT_RESULTS.firstItemPriceHighLow);
  });

  test('TC-I06: Navigate to product detail page', async ({ inventoryPage, productDetailPage }) => {
    await inventoryPage.goToProductDetail();

    const isVisible = await productDetailPage.isBackToProductsButtonVisible();
    expect(isVisible).toBe(true);
  });

  test('TC-I07: Product detail page shows correct info', async ({ inventoryPage, productDetailPage }) => {
    await inventoryPage.goToProductDetail();

    const name  = await productDetailPage.getItemName();
    const price = await productDetailPage.getItemPrice();
    expect(name).toBe(PRODUCT_DETAIL.firstName);
    expect(price).toBe(PRODUCT_DETAIL.firstPrice);
  });

});