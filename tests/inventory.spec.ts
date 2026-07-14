import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';
import { SORT_OPTIONS, EXPECTED_SORT_RESULTS } from '../test-data/inventory';

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

  test('TC-I03: Sort by Price (low to high)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy(SORT_OPTIONS.priceLowHigh);

    const firstPrice = await inventoryPage.getFirstItemPrice();
    expect(firstPrice).toBe(EXPECTED_SORT_RESULTS.firstItemPriceLowHigh);
  });

});