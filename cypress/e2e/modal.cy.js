// Check support/globals.js for some default checks
// as well as start up and clean up methods
context('Modal checks', () => {
    it('Basic UI checks', () => {
        // Adds our block
        cy.addBlock('unlimited-photos')

        // Check the search bar has focus
        cy.get('#unlimited-photos-search').should('have.focus')

        // Check the sidebar has at least 10 items
        cy.get('.unlimited-photos-suggestions-list li').should(
            'have.length.gte',
            10,
        )

        // Check the buttons show
        cy.get('.unlimited-photos-button-nav button').should('exist')

        // Check 30 images load in the main window
        cy.get('.unlimited-photos-image-container img').should(
            'have.length.gte',
            30,
        )
    })

    it('Search for images', () => {
        // Adds our block
        cy.addBlock('unlimited-photos')

        // grab initial 30 images
        cy.get('.unlimited-photos-image-container img').should(
            'have.length',
            30,
        )

        // Search a string that deosnt exist and see no results
        cy.get('#unlimited-photos-search').type('zzzzzzzzzzzzz')
        cy.get('.unlimited-photos-image-container img').should('have.length', 0)
        cy.get('.unlimited-photos-image-container-error').should(
            'have.text',
            'No photos found',
        )

        // Search for a specific string and see 30 results
        cy.get('#unlimited-photos-search').clear().type('wordpress')
        cy.get('.unlimited-photos-image-container img').should(
            'have.length',
            30,
        )

        // Clear out the results again
        cy.get('#unlimited-photos-search').clear().type('zzzzzzzzzzzzz')
        cy.get('.unlimited-photos-image-container img').should('have.length', 0)
        cy.get('.unlimited-photos-image-container-error').should(
            'have.text',
            'No photos found',
        )

        // Press the second sidebar button and see 30 results
        const secondButton =
            '.unlimited-photos-suggestions-list li:nth-child(2) button'
        cy.get(secondButton).click()
        cy.get('.unlimited-photos-image-container img').should(
            'have.length',
            30,
        )

        // Press the next button and see 30 results
        cy.get('.unlimited-photos-button-nav button:last-child').click()
        cy.get('.unlimited-photos-image-container img').should(
            'have.length',
            30,
        )
    })

    it('Imports an image', () => {
        // Confirm no images in post
        cy.getPostContent().find('img').should('not.exist')

        // Adds our block
        cy.addBlock('unlimited-photos')

        // Attempt to locate an image with low filesize
        cy.get('#unlimited-photos-search').type('Experimental')
        cy.get('.unlimited-photos-image-container img').should(
            'have.length',
            30,
        )

        // Focus the initial image and import it
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .focus()
            .should('have.text', 'Press to import')
            .click()
            .should('have.text', 'Importing image...')
            .contains('Done!', { timeout: 60000 })

        cy.getPostContent().find('img').should('exist')
    })
})
