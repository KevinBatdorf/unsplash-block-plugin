import type { Page } from '@playwright/test'
import type { Editor } from '@wordpress/e2e-test-utils-playwright'

export const BLOCK = 'kevinbatdorf/unlimited-photos'

// A store-level insert loses the double-rAF race a real inserter click wins.
export const insertBlockAndOpenModal = async (page: Page, editor: Editor) => {
    await editor.insertBlock({ name: BLOCK })
    await page.locator('.unlimited-photos-toolbar-button').click()
    await page.locator('#unlimited-photos-search').waitFor()
}
