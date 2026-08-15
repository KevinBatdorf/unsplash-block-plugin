import { expect, test } from "@wordpress/e2e-test-utils-playwright";
import { BLOCK } from "./helpers";

test.beforeEach(async ({ requestUtils }) => {
	// Tests are flaky if not logged in manually
	await requestUtils.login();
});

test("Inserting the block leaves a core image block behind", async ({
	admin,
	editor,
}) => {
	await admin.createNewPost();
	await editor.insertBlock({ name: BLOCK });

	await expect(editor.canvas.locator('[data-type="core/image"]')).toBeVisible();
});

test("The toolbar button opens the modal and focuses search", async ({
	admin,
	page,
	editor,
}) => {
	await admin.createNewPost();
	await editor.insertBlock({ name: BLOCK });

	const toolbarButton = page.locator(".unlimited-photos-toolbar-button");
	await expect(toolbarButton).toBeVisible();
	await toolbarButton.click();

	await expect(page.locator("#unlimited-photos-search")).toBeFocused();
});
