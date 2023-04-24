beforeEach(() => {
    cy.resetDatabase()
    cy.clearBrowserStorage()
    cy.loginUser()
    cy.visitNewPageEditor()
})

context('Image source checks', () => {
    it('Image sources can be switched from Unsplash to lexica', () => {
        cy.addBlock('kevinbatdorf/unlimited-photos')

        // Search something that exists on Lexica, but not Unsplash
        cy.get('#unlimited-photos-search').type('zzzzzzzzzzzzz')
        cy.get('.unlimited-photos-image-container img').should('have.length', 0)

        cy.get('[data-cy-up="ai-images-toggle"] input').should('not.be.checked')
        cy.get('[data-cy-up="ai-images-toggle"] input').click()
        cy.get('[data-cy-up="ai-images-toggle"] input').should('be.checked')

        // Search a string that deosnt exist and see no results
        cy.get('.unlimited-photos-image-container img').should(
            'have.length.gte',
            10,
        )
    })
})
