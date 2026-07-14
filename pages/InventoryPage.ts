import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;

  // Cart lokátorok
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;

  // Inventory lokátorok
  private readonly inventoryItems: Locator;
  private readonly sortDropdown: Locator;
  private readonly firstItemName: Locator;
  private readonly firstItemPrice: Locator;

  constructor(page: Page) {
    this.page      = page;
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartIcon  = page.locator('[data-test="shopping-cart-link"]');

    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown   = page.locator('[data-test="product-sort-container"]');
    this.firstItemName  = page.locator('[data-test="inventory-item-name"]').first();
    this.firstItemPrice = page.locator('[data-test="inventory-item-price"]').first();
  }

  // Termék neve alapján adja hozzá – nem indexel, nem törik el sorrend-változáskor
  async addItemToCartByName(itemName: string) {
    const addButton = this.page.locator(
      `[data-test="add-to-cart-${itemName.toLowerCase().replace(/ /g, '-')}"]`
    );
    await addButton.click();
  }

  async removeItemFromCartByName(itemName: string) {
    const removeButton = this.page.locator(
      `[data-test="remove-${itemName.toLowerCase().replace(/ /g, '-')}"]`
    );
    await removeButton.click();
  }

  async getCartBadgeCount(): Promise<string> {
    return await this.cartBadge.innerText();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
  async getInventoryItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstItemName(): Promise<string> {
    return await this.firstItemName.innerText();
  }

  async getFirstItemPrice(): Promise<string> {
    return await this.firstItemPrice.innerText();
  }
}