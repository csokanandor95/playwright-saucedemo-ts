import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page      = page;
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartIcon  = page.locator('[data-test="shopping-cart-link"]');
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
}