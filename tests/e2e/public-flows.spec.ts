import { expect, test, type Page } from "@playwright/test";

async function completeGiftConstructor(page: Page) {
  await page.goto("/gift");
  await expect(page.locator('#step-body .choice[data-key="occasion"][data-value="birthday"]')).toBeVisible();

  await page.locator('#step-body .choice[data-key="occasion"][data-value="birthday"]').click();
  await page.locator("#next-btn").click();
  await page.locator('#step-body .choice[data-key="recipientProfile"][data-value="partner"]').click();
  await page.locator("#next-btn").click();
  await page.locator('#step-body .choice[data-key="budgetBucket"][data-value="75_150"]').click();
  await page.locator("#next-btn").click();
  await page.locator('#step-body .choice[data-key="giftType"][data-value="experience"]').click();
  await page.locator("#next-btn").click();
  await page.fill("#personal-message", "Happy celebration from ROOT.");
  await page.locator("#next-btn").click();
}

async function completeBookingToConsent(page: Page) {
  await page.goto("/booking");
  await expect(page.getByRole("heading", { name: "ROOT Experience Booking Assistant" })).toBeVisible();

  await page.locator("#next-btn").click();
  await page.fill("#guests", "4");
  await page.locator("#next-btn").click();
  await page.selectOption("#preferred-language", "en");
  await page.locator("#next-btn").click();
  await page.fill("#preferred-date", "2026-08-20");
  await page.fill("#preferred-time", "14:00");
  await page.locator("#next-btn").click();
  await page.fill("#contact-name", "QA Tester");
  await page.fill("#contact-email", "qa@example.com");
  await page.fill("#contact-phone", "+39000111222");
  await page.fill("#contact-notes", "Need a private tasting room.");
  await page.locator("#next-btn").click();
}

test("Homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "A new generation of wine experiences" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Gift Constructor" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open Booking Assistant" })).toBeVisible();
});

test("Gift Constructor can be completed", async ({ page }) => {
  await completeGiftConstructor(page);
  await expect(page).toHaveURL(/\/gift\/result\?/);
});

test("Gift result is shown", async ({ page }) => {
  await completeGiftConstructor(page);
  await expect(page.getByRole("heading", { name: "Your Gift Recommendation" })).toBeVisible();
  await expect(page.locator("#recommendation")).toContainText("Best match");
  await expect(page.getByRole("link", { name: "Open Shopify offer" })).toBeVisible();
});

test("Gift lead form validates required fields", async ({ page }) => {
  await completeGiftConstructor(page);
  await page.locator('button[type="submit"]').click();

  await expect(page.locator('input[name="recipientName"]:invalid')).toBeVisible();
  await expect(page.locator('input[name="giverName"]:invalid')).toBeVisible();
  await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  await expect(page.locator('input[name="consent"]:invalid')).toBeVisible();
});

test("Gift page is created after lead submit", async ({ page }) => {
  await completeGiftConstructor(page);
  await page.fill('input[name="recipientName"]', "Elena Rossi");
  await page.fill('input[name="giverName"]', "QA Tester");
  await page.fill('textarea[name="personalMessage"]', "A vineyard gift for you.");
  await page.fill('input[name="email"]', "qa@example.com");
  await page.locator('input[name="consent"]').check();
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/\/gift\/g\/.+\/open/);
  await expect(page.getByRole("heading", { name: /Someone prepared a gift for you/i })).toBeVisible();
  await expect(page.getByText("Elena Rossi")).toBeVisible();
  await page.getByRole("link", { name: "Open your gift" }).click();

  await expect(page).toHaveURL(/\/gift\/g\/[^/]+\?lang=/);
  await expect(page.getByRole("heading", { name: /A gift for Elena Rossi/i })).toBeVisible();
  await expect(page.getByText("Your gift story")).toBeVisible();
  await expect(page.locator(".gift-voucher-gift", { hasText: "Vineyard Day Pass" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Buy this gift on ROOT Winery" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Print / save as PDF" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy reveal link" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("qa@example.com");
});

test("Booking Assistant can be completed", async ({ page }) => {
  await completeBookingToConsent(page);
  await page.locator("#consent").check();
  await page.locator("#next-btn").click();
  await expect(page).toHaveURL(/\/booking\/confirmation\?/);
});

test("Booking confirmation appears", async ({ page }) => {
  await completeBookingToConsent(page);
  await page.locator("#consent").check();
  await page.locator("#next-btn").click();

  await expect(page.getByRole("heading", { name: "Thank you for your request" })).toBeVisible();
  await expect(page.getByText("Your booking request has been received.")).toBeVisible();
  await expect(page.getByText("This is a request only, not a confirmed booking.")).toBeVisible();
});

test("Consent checkbox is required", async ({ page }) => {
  await completeBookingToConsent(page);
  await page.locator("#next-btn").click();
  await expect(page.locator("#status")).toContainText("Please accept consent to continue.");
  await expect(page).toHaveURL(/\/booking$/);
});

test("No payment flow exists", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /pay|checkout|payment/i })).toHaveCount(0);

  await page.goto("/gift/result");
  await expect(page.locator("body")).not.toContainText(/stripe|paypal|payment form|card number/i);
  await expect(page.getByRole("link", { name: "Open Shopify offer" })).toBeVisible();
});

test.describe("Mobile viewport", () => {
  test.use({
    viewport: { width: 390, height: 844 },
  });

  test("Mobile viewport renders correctly", async ({ page }) => {
    await page.goto("/gift");
    await expect(page.getByRole("heading", { name: "Gift Constructor" })).toBeVisible();
    await expect(page.locator(".page-card")).toBeVisible();

    const viewportWidth = page.viewportSize()?.width ?? 390;
    const mainWidth = await page.locator(".page-card").evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return Math.ceil(rect.right);
    });
    expect(mainWidth).toBeLessThanOrEqual(viewportWidth);
  });
});
