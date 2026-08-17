import type { Page } from "@playwright/test";
import type { Editor } from "@wordpress/e2e-test-utils-playwright";

export const BLOCK = "kevinbatdorf/unlimited-photos";

// The double-rAF auto-open races the listener mount; click only when it lost.
export const insertBlockAndOpenModal = async (page: Page, editor: Editor) => {
	await editor.insertBlock({ name: BLOCK });
	const search = page.locator("#unlimited-photos-search");
	const autoOpened = await search
		.waitFor({ timeout: 5000 })
		.then(() => true)
		.catch(() => false);
	if (autoOpened) return;
	await page.locator(".unlimited-photos-toolbar-button").click();
	await search.waitFor();
};
