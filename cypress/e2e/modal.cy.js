beforeEach(() => {
    cy.resetDatabase()
    cy.clearBrowserStorage()
    cy.loginUser()
    cy.visitNewPageEditor()
})

context('Modal checks', () => {
    it('Basic UI checks', () => {
        // Adds our block
        cy.addBlock('kevinbatdorf/unlimited-photos')

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
        cy.addBlock('kevinbatdorf/unlimited-photos')

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
        cy.get('#unlimited-photos-search').clear()
        cy.get('#unlimited-photos-search').type('wordpress')
        cy.get('.unlimited-photos-image-container img').should(
            'have.length',
            30,
        )

        // Clear out the results again
        cy.get('#unlimited-photos-search').clear()
        cy.get('#unlimited-photos-search').type('zzzzzzzzzzzzz')
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
        cy.addBlock('kevinbatdorf/unlimited-photos')

        // Attempt to locate an image with low filesize
        cy.get('#unlimited-photos-search').type('Experimental')
        cy.get('.unlimited-photos-image-container img').should(
            'have.length',
            30,
        )

        // Wait for the first image to be ready
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .should('exist')

        // Focus the initial image and import it
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .focus()
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .should('be.focused')
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .should('have.text', 'Press to import')
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .click()
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .should('have.text', 'Importing image...')
            .contains('Done!', { timeout: 60000 })

        cy.getPostContent().find('img').should('exist')
        cy.getPostContent().find('img').click()

        // Open the modal back up
        cy.get('.unlimited-photos-toolbar-button').click()

        // Wait for the first image to be ready
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .should('exist')
    })

    it('Importing disables the sidebar', () => {
        // Adds our block
        cy.addBlock('kevinbatdorf/unlimited-photos')

        // Confirm items are not disabled
        cy.get('#unlimited-photos-search').should('not.be.disabled')
        cy.get('[data-cy-up="settings-button"]')
            .first()
            .should('not.be.disabled')
        cy.get('.unlimited-photos-suggestions-list button')
            .first()
            .should('be.not.disabled')

        // Focus the initial image and import it
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .click()
        cy.get('.unlimited-photos-image-container div[role="button"]').should(
            'have.text',
            'Importing image...',
        )

        // Confirm items are disabled
        cy.get('#unlimited-photos-search').should('be.disabled')
        cy.get('[data-cy-up="settings-button"]').first().should('be.disabled')
        cy.get('.unlimited-photos-suggestions-list button')
            .first()
            .should('be.disabled')

        cy.getPostContent().find('img').should('exist')
        cy.getPostContent().find('img').click()

        // Open the modal back up
        cy.get('.unlimited-photos-toolbar-button').click()

        // Wait for the first image to be ready
        cy.get('.unlimited-photos-image-container div[role="button"]')
            .first()
            .should('exist')
    })
})
