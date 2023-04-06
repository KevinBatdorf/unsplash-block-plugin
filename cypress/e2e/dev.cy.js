beforeEach(() => {
    cy.resetDatabase()
    cy.clearBrowserStorage()
    cy.loginUser()
    cy.visitNewPageEditor()
})

context('Dev mode checks', () => {
    it("Make sure the modal isn't open on page load", () => {
        // Adds core image block
        cy.addBlock('core/image')

        // Check the search bar is not there
        cy.get('#unlimited-photos-search').should('not.exist')

        // Finally open it to make sure it opens properly
        cy.get('.unlimited-photos-toolbar-button').click()

        // Wait for the first image to be ready
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .should('exist')
    })
})
