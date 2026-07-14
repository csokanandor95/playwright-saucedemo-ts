import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  private readonly page: Page;
  private readonly backToProductsButton: Locator;
  private readonly itemName: Locator;
  private readonly itemPrice: Locator;

  constructor(page: Page) {
    this.page                 = page;
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.itemName             = page.locator('[data-test="inventory-item-name"]');
    this.itemPrice            = page.locator('[data-test="inventory-item-price"]');
  }

  async isBackToProductsButtonVisible(): Promise<boolean> {
    return await this.backToProductsButton.isVisible();
  }

  async getItemName(): Promise<string> {
    return await this.itemName.innerText();
  }

  async getItemPrice(): Promise<string> {
    return await this.itemPrice.innerText();
  }
}