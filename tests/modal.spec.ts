import { expect, test } from '@wordpress/e2e-test-utils-playwright'
import { insertBlockAndOpenModal } from './helpers'

const IMAGES = '.unlimited-photos-image-container img'
const TILES = '.unlimited-photos-image-container div[role="button"]'

test.beforeEach(async ({ requestUtils }) => {
    // Tests are flaky if not logged in manually
    await requestUtils.login()
})

test('The modal opens with search focused, suggestions and a page of photos', async ({
    admin,
    page,
    editor,
}) => {
    await admin.createNewPost()
    await insertBlockAndOpenModal(page, editor)

    await expect(page.locator('#unlimited-photos-search')).toBeFocused()
    await expect(
        page.locator('.unlimited-photos-suggestions-list li'),
    ).not.toHaveCount(0)
    await expect(
        page.locator('.unlimited-photos-button-nav button').first(),
    ).toBeVisible()
    await expect(page.locator(IMAGES)).toHaveCount(30)
})

test('Searching swaps the results and reports when there are none', async ({
    admin,
    page,
    editor,
}) => {
    await admin.createNewPost()
    await insertBlockAndOpenModal(page, editor)

    const search = page.locator('#unlimited-photos-search')
    await expect(page.locator(IMAGES)).toHaveCount(30)

    await search.fill('zzzzzzzzzzzzz')
    await expect(page.locator(IMAGES)).toHaveCount(0)
    await expect(
        page.locator('.unlimited-photos-image-container-error'),
    ).toHaveText('No photos found')

    await search.fill('wordpress')
    await expect(page.locator(IMAGES)).toHaveCount(30)
})

test('A suggestion and the next-page button each load a fresh page', async ({
    admin,
    page,
    editor,
}) => {
    await admin.createNewPost()
    await insertBlockAndOpenModal(page, editor)
    await expect(page.locator(IMAGES)).toHaveCount(30)

    await page
        .locator('.unlimited-photos-suggestions-list li:nth-child(2) button')
        .click()
    await expect(page.locator(IMAGES)).toHaveCount(30)

    await page.locator('.unlimited-photos-button-nav button:last-child').click()
    await expect(page.locator(IMAGES)).toHaveCount(30)
})

test('Importing a photo puts it in the post and locks the sidebar', async ({
    admin,
    page,
    editor,
}) => {
    await admin.createNewPost()
    await insertBlockAndOpenModal(page, editor)
    await expect(page.locator(IMAGES)).toHaveCount(30)

    const firstTile = page.locator(TILES).first()
    await expect(firstTile).toHaveText('Press to import')
    await firstTile.click()

    await expect(page.locator('#unlimited-photos-search')).toBeDisabled()
    await expect(
        page.locator('[data-cy-up="settings-button"]').first(),
    ).toBeDisabled()
    await expect(
        page.locator('.unlimited-photos-suggestions-list button').first(),
    ).toBeDisabled()

    await expect(editor.canvas.locator('img')).toBeVisible({ timeout: 60_000 })
})
