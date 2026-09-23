import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { installerFallbackUrl } from "../src/hooks/useRelease";

test("hero assembles the logo and reverses to the original content", async ({ page }) => {
  await page.route("**/releases/latest", route => route.abort());
  await page.goto("./");
  await page.waitForTimeout(1500);
  await page.locator(".hero-track").evaluate(el => window.scrollTo(0, (el.clientHeight - innerHeight) * .8));
  await expect(page.locator(".logo-paper")).toHaveCSS("stroke-dashoffset", "0px");
  await expect(page.locator(".hero-resolution")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-content")).toHaveCSS("opacity", "0");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator(".hero-content")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-resolution")).toHaveCSS("opacity", "0");
});

async function scrollStory(page: Page, progress: number) {
  await page.locator(".product-track").evaluate((element, p) => {
    window.scrollTo(
      0,
      element.getBoundingClientRect().top +
        scrollY +
        (element.clientHeight - innerHeight) * p,
    );
  }, progress);
  await page.waitForTimeout(180);
}

test("release resolution and fallback keep all download links consistent", async ({
  page,
}) => {
  await page.route("**/releases/latest", (route) =>
    route.fulfill({
      json: {
        assets: [
          {
            name: "PaperGraph.exe",
            browser_download_url:
              "https://github.com/Hug00x/PaperGraph/releases/download/v2/PaperGraph.exe",
          },
        ],
      },
    }),
  );
  await page.goto("./");
  await expect(page.locator("[data-download-link]")).toHaveCount(2);
  for (const link of await page.locator("[data-download-link]").all())
    await expect(link).toHaveAttribute("href", /\/v2\/PaperGraph.exe$/);
  await page.route("**/releases/latest", (route) =>
    route.fulfill({ status: 503, body: "" }),
  );
  await page.reload();
  await expect(page.locator("[data-download-link]").first()).toHaveAttribute(
    "href",
    installerFallbackUrl,
  );
});

test("scroll is reversible, stable when stopped, and reduced motion restores content", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.route("**/releases/latest", (route) => route.abort());
  await page.goto("./");
  await scrollStory(page, 0);
  await expect(page.locator(".tex-content")).toHaveCSS("opacity", "1");
  await scrollStory(page, 0.5);
  await expect(page.locator(".pdf-content")).toHaveCSS("opacity", "1");
  await scrollStory(page, 1);
  await expect(page.locator(".research-node").first()).toHaveCSS(
    "opacity",
    "1",
  );
  const transform = await page.locator(".paper-document").getAttribute("style");
  await page.waitForTimeout(300);
  expect(await page.locator(".paper-document").getAttribute("style")).toBe(
    transform,
  );
  await scrollStory(page, 0);
  await expect(page.locator(".tex-content")).toHaveCSS("opacity", "1");
  await expect(page.locator(".pdf-content")).toHaveCSS("opacity", "0");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".paper-document")).toHaveCSS("opacity", "1");
  await expect(page.locator(".product-sticky")).toHaveCSS(
    "position",
    "relative",
  );
  await expect(page.locator(".pdf-content")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-content")).toHaveCSS("opacity", "1");
  expect(errors).toEqual([]);
});

test("responsive layouts, assets, anchors and keyboard access", async ({
  page,
}) => {
  await page.route("**/releases/latest", (route) => route.abort());
  await page.goto("./");
  for (const width of [375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(120);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await scrollStory(page, 0.6);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  expect(
    await page
      .locator(".logo-frame img")
      .first()
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBeTruthy();
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#download$/);
  await expect(page.locator("#download [data-download-link]")).toBeInViewport();
  await page.reload();
  await expect(page.locator("#download h2")).toBeVisible();
});
