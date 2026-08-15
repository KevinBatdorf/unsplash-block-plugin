import { expect, test } from '@wordpress/e2e-test-utils-playwright'
import type { Page } from '@playwright/test'
import { insertBlockAndOpenModal } from './helpers'

const SETTINGS_MODAL = '[data-cy-up="settings-modal"]'

test.beforeEach(async ({ requestUtils }) => {
    // Tests are flaky if not logged in manually
    await requestUtils.login()
})

const openSettings = async (page: Page) => {
    await page.locator('[data-cy-up="settings-button"]').first().click()
    await expect(page.locator(SETTINGS_MODAL)).toBeAttached()
}

const closeSettings = async (page: Page) => {
    await page
        .locator(SETTINGS_MODAL)
        .getByRole('button', { name: 'Close' })
        .click()
    await expect(page.locator(SETTINGS_MODAL)).not.toBeAttached()
}

test('Regular is the default image size', async ({ admin, page, editor }) => {
    await admin.createNewPost()
    await insertBlockAndOpenModal(page, editor)

    await openSettings(page)
    await expect(page.locator('input[type="radio"][value="regular"]')).toBeChecked()
    await closeSettings(page)
})

test('The chosen image size survives a reload', async ({
    admin,
    page,
    editor,
}) => {
    await admin.createNewPost()
    await insertBlockAndOpenModal(page, editor)

    await openSettings(page)
    await page.locator('input[type="radio"][value="raw"]').check()
    await closeSettings(page)

    await page.reload()
    await insertBlockAndOpenModal(page, editor)

    await openSettings(page)
    await expect(page.locator('input[type="radio"][value="raw"]')).toBeChecked()
    await closeSettings(page)
})

test('Picking full size warns when the server cannot take large uploads', async ({
    admin,
    page,
    editor,
}) => {
    await admin.createNewPost()
    await insertBlockAndOpenModal(page, editor)

    await expect(page.locator('[data-cy-up="file-size-warning"]')).toBeHidden()

    await page.evaluate(() => {
        window.unlimitedPhotosConfig.maxUploadSize = 2
    })

    await openSettings(page)
    await page.locator('input[type="radio"][value="full"]').check()
    await closeSettings(page)

    await expect(page.locator('[data-cy-up="file-size-warning"]')).toBeVisible()
})
