import { expect, test } from "@playwright/test";

import {
  startStaticExportServer,
  stopStaticExportServer
} from "./static-export-server.mjs";

const previewPath = "/preview/prastuti/";
let staticServer;

test.beforeAll(async () => {
  staticServer = await startStaticExportServer();
});

test.afterAll(async () => {
  await stopStaticExportServer(staticServer);
});

test("preview exposes the approved structure and availability labels", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(previewPath);

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 2, name: "Available Today — Residential Access" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Pilot — ANPR and Parking Intelligence" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Launching — Commercial Parking Operations" })).toHaveCount(2);
  await expect(page.getByRole("heading", { level: 2, name: "Coming Next — 2–4 months" })).toHaveCount(2);
  await expect(page.getByText("Illustrative connected-parking concept", { exact: true })).toBeVisible();

  const availabilityCards = page.locator("#availability section[data-availability-state]");
  await expect(availabilityCards).toHaveCount(4);
  const layout = await availabilityCards.evaluateAll((cards) =>
    cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        state: card.getAttribute("data-availability-state"),
        left: rect.left,
        top: rect.top
      };
    })
  );
  expect(layout.map(({ state }) => state)).toEqual([
    "live",
    "pilot",
    "launching",
    "comingSoon"
  ]);
  expect(layout[0].top).toBeCloseTo(layout[1].top);
  expect(layout[2].top).toBeCloseTo(layout[3].top);
  expect(layout[0].left).toBeLessThan(layout[1].left);
  expect(layout[2].left).toBeLessThan(layout[3].left);

  await expect(page.locator('[data-availability-detail="launching"]')).toBeVisible();
  await expect(page.locator('[data-availability-detail="comingSoon"]')).toBeVisible();
  await expect(page.getByLabel("Premises type")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator('[data-feedback-state="fail-closed"]')).toContainText(
    "Evidence remains hidden"
  );

  for (const state of ["pilot", "launching", "comingSoon"]) {
    const group = page.locator(`section[data-availability-state="${state}"]`).first();
    await expect(group.getByText("Live", { exact: true })).toHaveCount(0);
  }
});

test("keyboard focus is visible and the mobile disclosure returns focus on Escape", async ({
  page
}) => {
  await page.goto(previewPath);

  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press("Tab");
    const focus = await page.evaluate(() => {
      const active = document.activeElement;
      const style = active ? getComputedStyle(active) : null;
      return {
        tag: active?.tagName,
        outlineWidth: style?.outlineWidth,
        outlineStyle: style?.outlineStyle
      };
    });
    expect(["A", "BUTTON"]).toContain(focus.tag);
    expect(Number.parseFloat(focus.outlineWidth || "0")).toBeGreaterThanOrEqual(2);
    expect(focus.outlineStyle).not.toBe("none");
  }

  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.locator('button[aria-controls="preview-mobile-navigation"]');
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Preview mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
});

test("forced colours retain the approved system focus outline", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.goto(previewPath);

  const action = page.getByRole("link", { name: "Review availability" }).first();
  await action.focus();
  const focus = await action.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      width: style.outlineWidth,
      style: style.outlineStyle
    };
  });

  expect(Number.parseFloat(focus.width)).toBeGreaterThanOrEqual(2);
  expect(focus.style).not.toBe("none");
});

for (const width of [320, 640]) {
  test(`preview reflows without horizontal document overflow at ${width}px`, async ({
    page
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(previewPath);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

    const clipped = await page.locator("a:visible, button:visible, h1:visible, h2:visible").evaluateAll(
      (elements) =>
        elements
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              text: element.textContent?.trim(),
              left: rect.left,
              right: rect.right
            };
          })
          .filter((item) => item.left < -1 || item.right > window.innerWidth + 1)
    );
    expect(clipped).toEqual([]);
  });
}

test("site assessment form exposes field, error, pending, and success semantics", async ({
  page
}) => {
  await page.goto(previewPath);

  const form = page.locator("form");
  const name = page.getByLabel("Full name *");
  const email = page.getByLabel("Email address *");
  const phone = page.getByLabel("Phone number");
  const context = page.getByLabel("Site and operating context *");

  await expect(name).toHaveAttribute("autocomplete", "name");
  await expect(email).toHaveAttribute("type", "email");
  await expect(phone).toHaveAttribute("type", "tel");
  await expect(phone).toHaveAttribute("autocomplete", "tel");

  await page.getByRole("button", { name: "Request a site assessment" }).click();
  const alert = page.locator('[role="alert"][tabindex="-1"]');
  await expect(alert).toContainText("Correct 3 fields before sending.");
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(alert).toBeFocused();

  await name.fill("Asha Rao");
  await email.fill("asha@example.com");
  await context.fill("Two residential entry lanes with existing barrier controllers.");
  await page.getByRole("button", { name: "Request a site assessment" }).click();

  await expect(form).toHaveAttribute("aria-busy", "true");
  await expect(page.getByRole("button", { name: /Sending assessment request/ })).toBeDisabled();
  await expect(form.getByRole("status")).toContainText("Preview request captured locally.");
  await expect(form).toHaveAttribute("aria-busy", "false");
});
