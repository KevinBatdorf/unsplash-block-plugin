const SETTINGS_MODAL_CLOSE =
    '[data-cy-up="settings-modal"] button[aria-label="Close"]'
beforeEach(() => {
    cy.resetDatabase()
    cy.clearBrowserStorage()
    cy.loginUser()
    cy.visitNewPageEditor()
})
afterEach(() => {
    cy.closeOurModal()
    cy.saveDraft()
    cy.logoutUser()
})
context('Settings modal checks', () => {
    context('Image size/quality', () => {
        it('Regular is select by default', () => {
            cy.addBlock('kevinbatdorf/unlimited-photos')
            cy.get('[data-cy-up="settings-button"]').click()
            cy.get('[data-cy-up="settings-modal"]').should('exist')
            cy.get('input[type="radio"][value="regular"]').should('be.checked')
            cy.get(SETTINGS_MODAL_CLOSE).click()
            cy.get('[data-cy-up="settings-modal"]').should('not.exist')
        })

        it('Settings are persisted', () => {
            cy.addBlock('kevinbatdorf/unlimited-photos')
            cy.get('[data-cy-up="settings-button"]').click()
            cy.get('input[type="radio"][value="raw"]').click()
            cy.get('input[type="radio"][value="raw"]').should('be.checked')

            // reload the page to make sure the settings are saved
            cy.get(SETTINGS_MODAL_CLOSE).click()
            cy.closeOurModal()
            cy.saveDraft()
            cy.reload()
            cy.addBlock('kevinbatdorf/unlimited-photos')

            cy.get('[data-cy-up="settings-button"]').click()
            cy.get('input[type="radio"][value="raw"]').should('be.checked')
            cy.get(SETTINGS_MODAL_CLOSE).click()
            cy.get('[data-cy-up="settings-modal"]').should('not.exist')
        })

        // Note: this test depends on the max file upload size from wp-env
        // being set to 2MB
        it('Filesize warning shows when full is selected', () => {
            cy.addBlock('kevinbatdorf/unlimited-photos')
            cy.get('[data-cy-up="file-size-warning"]').should('not.exist')

            cy.get('[data-cy-up="settings-button"]').click()
            cy.get('input[type="radio"][value="full"]').click()
            cy.get('input[type="radio"][value="full"]').should('be.checked')
            cy.get(SETTINGS_MODAL_CLOSE).click()
            cy.get('[data-cy-up="settings-modal"]').should('not.exist')

            cy.get('[data-cy-up="file-size-warning"]').should('exist')
        })
    })
    context('Theme selector', () => {
        it('Can switch themes and persist', () => {
            cy.addBlock('kevinbatdorf/unlimited-photos')
            cy.get('[data-cy-up="settings-button"]').click()
            // light mode
            cy.get('div[role="radio"]').contains('light').click()
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('light')
                .should('exist')

            // reload the page to make sure the settings are saved
            cy.get(SETTINGS_MODAL_CLOSE).click()
            cy.closeOurModal()
            cy.saveDraft()
            cy.reload()

            cy.addBlock('kevinbatdorf/unlimited-photos')
            cy.get('[data-cy-up="settings-button"]').click()
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('light')
                .should('exist')
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('default')
                .should('not.exist')

            // midnight mode
            cy.get('div[role="radio"]').contains('midnight').click()
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('midnight')
                .should('exist')

            // reload the page to make sure the settings are saved
            cy.get(SETTINGS_MODAL_CLOSE).click()
            cy.closeOurModal()
            cy.saveDraft()
            cy.reload()

            cy.addBlock('kevinbatdorf/unlimited-photos')
            cy.get('[data-cy-up="settings-button"]').click()
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('midnight')
                .should('exist')
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('default')
                .should('not.exist')

            cy.get(SETTINGS_MODAL_CLOSE).click()
        })
    })
})
