afterEach(() => {
    cy.window().then((win) => {
        expect(win.console.error).to.have.callCount(0)
    })
})

beforeEach(() => {
    cy.loginUser()
    cy.visitNewPageEditor()
})

afterEach(() => {
    cy.closeOurModal()
    cy.saveDraft() // so we can leave without an alert
    // cy.uninstallPlugin('unlimited-photos')
    cy.logoutUser()
})
