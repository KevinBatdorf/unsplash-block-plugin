import type { Page } from "@playwright/test";
import { expect, test } from "@wordpress/e2e-test-utils-playwright";
import { insertBlockAndOpenModal } from "./helpers";

const SETTINGS_MODAL = '[data-cy-up="settings-modal"]';
const MODAL_INNER = "#unlimited-photos-modal-inner";

test.beforeEach(async ({ requestUtils }) => {
	// Tests are flaky if not logged in manually
	await requestUtils.login();
});

const chooseTheme = async (page: Page, theme: string) => {
	await page.locator('[data-cy-up="settings-button"]').first().click();
	await page.getByRole("radio").filter({ hasText: theme }).click();
	await expect(
		page.getByRole("radio", { checked: true }).filter({ hasText: theme }),
	).toBeVisible();
	await page
		.locator(SETTINGS_MODAL)
		.getByRole("button", { name: "Close" })
		.click();
	await expect(page.locator(SETTINGS_MODAL)).not.toBeAttached();
};

test("The light theme paints the modal white", async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost();
	await insertBlockAndOpenModal(page, editor);

	await chooseTheme(page, "light");

	await expect(page.locator(MODAL_INNER)).toHaveClass(/bg-white/);
	await expect(page.locator(MODAL_INNER)).not.toHaveClass(/backdrop-blur/);
});

test("The midnight theme paints the modal midnight and persists", async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost();
	await insertBlockAndOpenModal(page, editor);

	await chooseTheme(page, "midnight");

	await expect(page.locator(MODAL_INNER)).toHaveClass(/bg-main-midnight/);
	await expect(page.locator(MODAL_INNER)).not.toHaveClass(/backdrop-blur/);

	await page.reload();
	await insertBlockAndOpenModal(page, editor);
	await expect(page.locator(MODAL_INNER)).toHaveClass(/bg-main-midnight/);
});
