import { test, expect } from '@playwright/test';

test('customer can complete a purchase and download the order receipt', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle('Swag Labs');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('[data-test="item-4-title-link"]')).toHaveText('Sauce Labs Backpack');
  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page).toHaveURL(/inventory-item\.html\?id=4$/);
  await expect(page.locator('.inventory_details_name'))
  .toHaveText('Sauce Labs Backpack');
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html$/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await page.locator('[data-test="checkout"]').click();

  await expect(page).toHaveURL(/checkout-step-one\.html$/);
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Smith');
  await page.locator('[data-test="postalCode"]').fill('3211');
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');
  await page.locator('[data-test="finish"]').click();

  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
  await expect(page.getByText('Thank you for your order!')).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.locator('[data-test="generate-pdf-order"]').click();
  const download = await downloadPromise;
  await expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
});
