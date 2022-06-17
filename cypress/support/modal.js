export const closeModal = () => {
    const modalX = '[data-cy-up="main-modal"] button[aria-label="Close"]'
    cy.get('body').then((body) => {
        if (body.find(modalX).length > 0) {
            cy.get(modalX).click()
        }
    })
    cy.get(modalX).should('not.exist')
}
