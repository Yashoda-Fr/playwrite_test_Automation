const { test,expect } = require('@playwright/test');

test.only('Browser Context Test', async ({ browser }) => {

  const context = await browser.newContext(); // Fresh browser instance
  const page = await context.newPage();       // New tab
  
  const userName =page.locator("#username"); // Locator for username field
  const signIn = page.locator("#signInBtn"); // Locator for sign in button

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // Go to URL

  await userName.fill('rahulshetty'); // Type username
  await page.locator("#password").fill('learning'); // Type password
  await signIn.click(); // Click sign in button

  console.log(await page.locator("[style*='block']").textContent()); // Print error message
  await expect (page.locator("[style*='block']")).toContainText('Incorrect'); // Assert error message
  

  await userName.fill("")// Clear username field
  await userName.fill("rahulshettyacademy"); // Type username
  await signIn.click(); // Click sign in button

  console.log(await page.locator(".card-body a").first().textContent()); 

});

test('Page Fixture Test', async ({ page }) => {
    await page.goto('https://www.google.com/'); // Browser + page auto-created
    console.log(await page.title()); // Print the title of the page
    await expect(page).toHaveTitle('Google'); // Assert the URL
  });