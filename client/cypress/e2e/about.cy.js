describe('About Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('should display profile information', () => {
    // Check if name is displayed
    cy.contains('Diego Emiliano', { timeout: 10000 }).should('be.visible')
    
    // Check if profile image is loaded
    cy.get('img[alt*="Diego"]').should('exist')
  })

  it('should have a working resume download link', () => {
    // Check if download button exists and has href
    cy.contains('Download My Resume')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', '.pdf')
  })
})
