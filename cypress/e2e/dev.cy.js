context('Dev mode checks', () => {
    it("Make sure the modal isn't open on page load", () => {
        // Adds core image block
        cy.addBlock('editor-block-list-item-image')

        // Check the search bar is not there
        cy.get('#unlimited-photos-search').should('not.exist')
    })
})
