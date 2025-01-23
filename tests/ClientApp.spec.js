const { test, expect } = require("@playwright/test");
// const exp = require("constants");

test("Web client app login", async ({ page }) => {
  const prodName = "Banarsi Saree";
  const products = page.locator(".card-body");
  const userEmail = "workablesideofthemoon@gmail.com";
  const userPass = "Max@1234";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.fill("#userEmail", userEmail);
  await page.fill("#userPassword", userPass);
  await page.locator("[value='Login']").click();

  await page.waitForLoadState("networkidle");
  // await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === prodName) {
      await products.nth(i).locator("text=' Add To Cart'").click();
      break;
    }
  }
  // await page.pause();
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const boolProd = await page
    .locator("h3:has-text('Banarsi Saree')")
    .isVisible();
  expect(boolProd).toBeTruthy();
  await page.locator("text='Checkout'").click();

  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await page.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  // await page.pause();

  expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  // await page.locator("li.totalRow button").click();
  await page.locator("button[routerlink*='myorders']").click();

  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
