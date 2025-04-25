const { test,expect } = require('@playwright/test');

test.only('Browser Context Test', async ({ browser }) => {
  const context = await browser.newContext(); // Fresh browser instance
  const page = await context.newPage();       // New tab
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // Go to URL
  await page.locator("#username").fill('rahulshetty'); // Type username
  await page.locator("#password").fill('learning'); // Type password
  await page.locator("#signInBtn").click(); // Click sign in button
  console.log(await page.locator("[style*='block']").textContent()); // Print error message
  await expect (page.locator("[style*='block']")).toContainText('Incorrect'); // Assert error message
});

test('Page Fixture Test', async ({ page }) => {
    await page.goto('https://www.google.com/'); // Browser + page auto-created
    console.log(await page.title()); // Print the title of the page
    await expect(page).toHaveTitle('Google'); // Assert the URL
  });