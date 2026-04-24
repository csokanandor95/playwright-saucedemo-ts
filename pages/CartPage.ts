import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartItems: Locator;

  constructor(page: Page) {
    this.page      = page;
    this.cartItems = page.locator('[data-test="inventory-item-name"]');
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItems.allInnerTexts();
  }

  async isItemInCart(itemName: string): Promise<boolean> {
    const names = await this.getCartItemNames();
    return names.includes(itemName);
  }
}