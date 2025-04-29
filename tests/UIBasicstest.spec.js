const { test,expect } = require('@playwright/test');

test('Browser Context Test', async ({ browser }) => {

  const context = await browser.newContext(); // Fresh browser instance
  const page = await context.newPage();       // New tab
  
  const userName =page.locator("#username"); // Locator for username field
  const signIn = page.locator("#signInBtn"); // Locator for sign in button
  const cardTitle = page.locator(".card-body a")// Locator for card title

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // Go to URL

  await userName.fill('rahulshetty'); // Type username
  await page.locator("#password").fill('learning'); // Type password
  await signIn.click(); // Click sign in button

  console.log(await page.locator("[style*='block']").textContent()); // Print error message
  await expect (page.locator("[style*='block']")).toContainText('Incorrect'); // Assert error message
  

  await userName.fill("")// Clear username field
  await userName.fill("rahulshettyacademy"); // Type username
  await signIn.click(); // Click sign in button

  console.log(await cardTitle.first().textContent()); 
  console.log(await cardTitle.nth(1).textContent()); 

  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles); // Print all card titles


});

test('UI Controls', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // Go to URL
    
  const userName =page.locator("#username"); // Locator for username field
  const signIn = page.locator("#signInBtn"); // Locator for sign in button
  const documentLink = page.locator("a[href*='documents-request']"); // Locator for document link
  const dropdown = page.locator("select.form-control"); // Locator for dropdown
  await dropdown.selectOption("consult"); // Select option from dropdown
  await page.locator(".radiotextsty").last().click(); // Click last radio button
  await page.locator("#okayBtn").click(); // Click OK button
  console.log(await page.locator(".radiotextsty").last().isChecked()); // Check if last radio button is checked
  await expect(page.locator(".radiotextsty").last()).toBeChecked(); // Assert last radio button is attached
  await page.locator("#terms").click(); // Click terms checkbox
  await expect(page.locator("#terms")).toBeChecked();// Check if terms checkbox is checked
  await page.locator("#terms").uncheck(); // Uncheck terms checkbox
  page.pause(); // Pause the test for manual inspection
  expect(await page.locator("#terms").isChecked()).toBeFalsy(); // Assert terms checkbox is unchecked
  expect(documentLink).toHaveAttribute("class","blinkingText"); // Assert document link has class blinkingText
  
  }); 

  test.only('@Child window handle',async({browser})=>
  {
    const context =await browser.newContext(); // Fresh browser instance
    const page = await context.newPage(); // New tab
    const userName =page.locator("#username"); // Locator for username field
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // Go to URL
    const documentLink = page.locator("[href*='documents-request']"); // Locator for document link

    const [newPage] = await Promise.all(
      [context.waitForEvent('page'), // Wait for new page to open
      documentLink.click(),// Click document link
    ])

    const text = await newPage.locator(".red").textContent(); // Get text from new page
    const arrayText = text.split("@"); // Split text by '@'
    const domain = arrayText[1].split(" ")[0]; // Get email from text
    console.log(domain); // Print email
    

    

  }
  );