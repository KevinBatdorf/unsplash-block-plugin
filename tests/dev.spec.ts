import { expect, test } from "@wordpress/e2e-test-utils-playwright";

test.beforeEach(async ({ requestUtils }) => {
	// Tests are flaky if not logged in manually
	await requestUtils.login();
});

test("The modal stays closed until the toolbar button is pressed", async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost();
	await editor.insertBlock({ name: "core/image" });

	await expect(page.locator("#unlimited-photos-search")).toBeHidden();

	await page.locator(".unlimited-photos-toolbar-button").click();

	await expect(
		page
			.locator('.unlimited-photos-image-container div[role="button"]')
			.first(),
	).toBeVisible();
});
