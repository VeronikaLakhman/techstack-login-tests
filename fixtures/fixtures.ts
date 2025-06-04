import { test as base, BrowserContext, Page } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

type Fixtures = {
  context: BrowserContext;
  page: Page;
  pm: PageManager;
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

  pm: async ({ page }, use) => {
    const manager = new PageManager(page);
    await use(manager);
  }
});

export { expect } from '@playwright/test';
