beforeEach(() => {
    cy.resetDatabase()
    cy.clearBrowserStorage()
    cy.loginUser()
    cy.visitNewPageEditor()
})

context('Theme checks', () => {
    beforeEach(() => {
        cy.clearLocalStorage('unlimited-photos')
        // Adds our block
        cy.addBlock('kevinbatdorf/unlimited-photos')

        // Open the settings modal
        cy.get('[data-cy-up="settings-button"]').click()
    })

    it('Light theme has a white background color', () => {
        // Switch to light theme
        cy.get('div[role="radio"]').contains('light').click()
        cy.get('div[role="radio"][aria-checked="true"]')
            .contains('light')
            .should('exist')
        cy.get(
            '[data-cy-up="settings-modal"] button[aria-label="Close"]',
        ).click()
        cy.get('[data-cy-up="settings-modal"]').should('not.exist')

        cy.get('#unlimited-photos-modal-inner').should(
            'not.have.class',
            'backdrop-blur',
        )
        cy.get('#unlimited-photos-modal-inner').should('have.class', 'bg-white')
    })

    it('Midnight theme has a midnight background color', () => {
        // Switch to light theme
        cy.get('div[role="radio"]').contains('midnight').click()
        cy.get('div[role="radio"][aria-checked="true"]')
            .contains('midnight')
            .should('exist')
        cy.get(
            '[data-cy-up="settings-modal"] button[aria-label="Close"]',
        ).click()
        cy.get('[data-cy-up="settings-modal"]').should('not.exist')

        cy.get('#unlimited-photos-modal-inner').should(
            'not.have.class',
            'backdrop-blur',
        )
        cy.get('#unlimited-photos-modal-inner').should(
            'have.class',
            'bg-main-midnight',
        )
    })
})
