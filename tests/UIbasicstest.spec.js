const {test, expect} = require('@playwright/test')

test.only("Browser context Playwright test", async ({browser}) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  const userName = await page.locator("#username");
  const signIn = await page.locator("#signInBtn");

  await userName.fill("rahulshetty");
  await page.fill("[type='password']", "learning");
  await signIn.click();
  
  console.log(await page.locator("[style*='block']").textContent("Incorrect"));
  await page.locator("[style*='block']").textContent("Incorrect");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await page.locator(".card-body a").nth(0).textContent(""));



});

test("First Playwright test", async ({page}) => 
{
  await page.goto("https://google.com");
  console.log(await page.title());

  await expect(page).toHaveTitle("Google")
});


