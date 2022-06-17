context('Settings modal checks', () => {
    context('Image size/quality', () => {
        beforeEach(() => {
            cy.clearLocalStorage('unlimited-photos')
            // Adds our block
            cy.addBlock('unlimited-photos')

            // Open the settings modal
            cy.get('[data-cy-up="settings-button"]').click()
        })
        afterEach(() => {
            cy.get(
                '[data-cy-up="settings-modal"] button[aria-label="Close"]',
            ).click()
            cy.get('[data-cy-up="settings-modal"]').should('not.exist')
        })

        it('Full is select by default', () => {
            cy.get('[data-cy-up="settings-modal"]').should('exist')
            cy.get('input[type="radio"][value="full"]').should('be.checked')
        })

        it('Settings are persisted', () => {
            cy.get('input[type="radio"][value="raw"]').click()
            cy.get('input[type="radio"][value="raw"]').should('be.checked')
            // reload the page to make sure the settings are saved
            cy.reload()
            cy.addBlock('unlimited-photos')
            cy.get('[data-cy-up="settings-button"]').click()
            cy.get('input[type="radio"][value="raw"]').should('be.checked')
        })

        // Note: this test depends on the max file upload size from wp-env
        // being set to 2MB
        it('Filesize warning disappears when regular is selected', () => {
            cy.get('[data-cy-up="file-size-warning"]').should('exist')
            cy.get('input[type="radio"][value="regular"]').click()
            cy.get('input[type="radio"][value="regular"]').should('be.checked')
            cy.get('[data-cy-up="file-size-warning"]').should('not.exist')
        })
    })
    context('Theme selector', () => {
        beforeEach(() => {
            cy.clearLocalStorage('unlimited-photos')
            // Adds our block
            cy.addBlock('unlimited-photos')

            // Open the settings modal
            cy.get('[data-cy-up="settings-button"]').click()
        })
        afterEach(() => {
            cy.get(
                '[data-cy-up="settings-modal"] button[aria-label="Close"]',
            ).click()
            cy.get('[data-cy-up="settings-modal"]').should('not.exist')
        })

        it('Can switch themes and persist', () => {
            // light mode
            cy.get('div[role="radio"]').contains('light').click()
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('light')
                .should('exist')

            // reload the page to make sure the settings are saved
            cy.reload()
            cy.addBlock('unlimited-photos')
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
            cy.reload()
            cy.addBlock('unlimited-photos')
            cy.get('[data-cy-up="settings-button"]').click()
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('midnight')
                .should('exist')
            cy.get('div[role="radio"][aria-checked="true"]')
                .contains('default')
                .should('not.exist')
        })
    })
})
