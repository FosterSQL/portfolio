describe('Projects Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/projects')
  })

  it('should display the projects page', () => {
    // Check if page title is visible
    cy.contains(/my projects|projects/i, { timeout: 10000 }).should('be.visible')
  })

  it('should display projects or empty state', () => {
    // Wait for API call to complete
    cy.wait(2000)
    
    // Either projects are shown or "No projects" message
    cy.get('body').then(($body) => {
      if ($body.text().includes('No projects')) {
        cy.contains('No projects').should('be.visible')
      } else {
        // At least one project card should exist
        cy.get('[class*="Card"], [class*="card"]').should('exist')
      }
    })
  })
})
