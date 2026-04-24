import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,       // saucedemo nem bírja jól a párhuzamot
  retries: 1,                 // CI-ban 1 retry, lokálisan is hasznos
  timeout: 30000,             // 30s per test
  expect: {
    timeout: 5000,
  },

  reporter: [
    ['list'],                 // terminál output
    ['html', { open: 'never' }], // HTML report, nem nyílik fel auto.
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});