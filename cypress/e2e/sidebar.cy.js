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
        cy.get('#unlimited-photos-recent-searches li').should('have.length', 0)
        cy.get('#unlimited-photos-search').type('zzzzzzzzzzzzz')
        cy.get('#unlimited-photos-recent-searches li').should('have.length', 1)

        cy.reload()
        cy.addBlock('kevinbatdorf/unlimited-photos')
        // It should persist
        cy.get('#unlimited-photos-recent-searches li').should('have.length', 1)

        // press the first one x button to remove it
        cy.get('[data-cy-up="delete-recent-search"]').first().click()
        cy.get('#unlimited-photos-recent-searches li').should('have.length', 0)
    })
})
