// Check support/globals.js for some default checks
// as well as start up and clean up methods
context('Modal checks', () => {
    it('The search bar has intial focus', () => {
        // Adds our block
        cy.addBlock('unlimited-photos')

        // Check the search bar has focus
        cy.get('#unlimited-images-search').should('have.focus')
    })
})
