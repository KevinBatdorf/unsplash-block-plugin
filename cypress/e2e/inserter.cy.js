beforeEach(() => {
    cy.resetDatabase()
    cy.clearBrowserStorage()
    cy.loginUser()
    cy.visitNewPageEditor()
})

context('Inserter checks', () => {
    it('The image block is inserted', () => {
        // Adds our block
        cy.addBlock('kevinbatdorf/unlimited-photos')

        // Closes our modal
        cy.get(
            '.unlimited-photos-editor.unlimited-photos-modal button[aria-label="Close"]',
        ).click()

        // Check the core image block is there
        cy.getPostContent('.wp-block[class$="wp-block-image"]').should('exist')
    })
    it('The toolbar icon exists', () => {
        // Adds our block
        cy.addBlock('kevinbatdorf/unlimited-photos')

        // Closes our modal
        cy.closeOurModal()

        // Checks our toolbar icon exists
        cy.get('.unlimited-photos-toolbar-button').should('exist')

        // Open the modal back up
        cy.get('.unlimited-photos-toolbar-button').click()

        // Check the search bar has focus
        cy.get('#unlimited-photos-search').should('have.focus')
    })
})
