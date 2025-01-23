// 'Fira Code', Menlo, Monaco, 'Courier New', monospace
const { test, expect } = require('@playwright/test')
 

test("UI controls as radio and dropdown", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const signIn = page.locator("#username");
  const signBtn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  const docLink = page.locator("[href*='documents-request']");
  await dropdown.selectOption("consult");
  // await page.pause();

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked()); // just to know
  await expect(page.locator(".radiotextsty").last()).toBeChecked(); // for assertion

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  await expect(docLink).toHaveAttribute("class", "blinkingText");

});

test("Child windows handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const docLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([ // [... , newPage2]
    context.waitForEvent("page"), // listen for any new page pending, rejected, fulfilled
    docLink.click() // new page is open
  ]);
  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  // npx playwright test tests/UIbasicstest.spec.js --grep "Child"
  await userName.fill(domain);
  // await page.pause();
  console.log(await userName.textContent());

});

test("Browser context Playwright test", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitle = page.locator(".card-body a");

  await userName.fill("rahulshetty");
  await page.fill("[type='password']", "learning");
  await signIn.click();
  
  console.log(await page.locator("[style*='block']").textContent("Incorrect"));
  await page.locator("[style*='block']").textContent("Incorrect");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitle.nth(0).textContent(""));



});

test("First Playwright test", async ({page}) => 
{
  await page.goto("https://google.com");
  console.log(await page.title());

  await expect(page).toHaveTitle("Google")
});


