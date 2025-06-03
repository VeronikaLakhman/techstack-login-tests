import { test as base, BrowserContext, Page } from '@playwright/test';

type Fixtures = {
  context: BrowserContext;
  page: Page;
};

export const test = base.extend<Fixtures>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    try {
      await use(context);
    } finally {
      await context.close();
    }
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    try {
      await use(page);
    } finally {
      await page.close();
    }
  },
});

export { expect } from '@playwright/test';