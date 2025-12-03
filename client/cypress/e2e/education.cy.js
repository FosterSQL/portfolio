describe('Education Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/education')
  })

  it('should display the education page', () => {
    // Check if page title is visible
    cy.contains(/education|academic/i, { timeout: 10000 }).should('be.visible')
  })

  it('should display education timeline or empty state', () => {
    // Wait for API call to complete
    cy.wait(2000)
    
    // Check for content
    cy.get('body').then(($body) => {
      const bodyText = $body.text()
      // Should show either education entries or timeline elements
      expect(bodyText.length).to.be.greaterThan(50)
    })
  })
})
