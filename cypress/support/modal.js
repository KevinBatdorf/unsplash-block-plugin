export const closeModal = () => {
    cy.get('[data-cy-up="main-modal"] button[aria-label="Close"]').click()
}
