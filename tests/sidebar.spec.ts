import { expect, test } from "@wordpress/e2e-test-utils-playwright";
import { insertBlockAndOpenModal } from "./helpers";

const RECENT = "#unlimited-photos-recent-searches li";

test.beforeEach(async ({ requestUtils }) => {
	// Tests are flaky if not logged in manually
	await requestUtils.login();
});

test("Recent searches survive a reload and can be deleted", async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost();
	await insertBlockAndOpenModal(page, editor);

	await expect(page.locator(RECENT)).toHaveCount(0);
	await page.locator("#unlimited-photos-search").fill("zzzzzzzzzzzzz");
	await expect(page.locator(RECENT)).toHaveCount(1);

	await page.reload();
	await insertBlockAndOpenModal(page, editor);
	await expect(page.locator(RECENT)).toHaveCount(1);

	await page.locator('[data-cy-up="delete-recent-search"]').first().click();
	await expect(page.locator(RECENT)).toHaveCount(0);
});
