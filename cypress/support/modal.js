export const closeModal = () => {
    const modalX =
        '.unlimited-photos-editor.unlimited-photos-modal button[aria-label="Close"]'
    cy.get('body').then((body) => {
        if (body.find(modalX).length > 0) {
            cy.get(modalX).click()
        }
    })
}
