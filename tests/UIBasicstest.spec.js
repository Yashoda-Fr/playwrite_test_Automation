const { test } = require('@playwright/test');

test('Browser Context Test', async ({ browser }) => {
  const context = await browser.newContext(); // Fresh browser instance
  const page = await context.newPage();       // New tab
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // Go to URL
});


test('Page Fixture Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // Browser + page auto-created
  });
