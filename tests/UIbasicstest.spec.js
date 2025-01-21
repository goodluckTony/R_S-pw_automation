const {test, expect} = require('@playwright/test')

test/* ".only" to run only this test */("Browser context Playwright test", async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractice/");

});

test("First Playwright test", async ({page}) => 
{
  await page.goto("https://google.com");
  console.log(await page.title());

  await expect(page).toHaveTitle("Google")
});


