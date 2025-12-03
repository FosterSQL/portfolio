describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate through all main pages', () => {
    // Test navigation menu
    cy.contains('About').click()
    cy.url().should('include', '/about')
    
    cy.contains('Education').click()
    cy.url().should('include', '/education')
    
    cy.contains('Projects').click()
    cy.url().should('include', '/projects')
    
    cy.contains('Contact').click()
    cy.url().should('include', '/contact')
    
    cy.contains('Home').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should have responsive menu on mobile', () => {
    // Set mobile viewport
    cy.viewport('iphone-x')
    
    // Mobile menu button should be visible
    cy.get('button[aria-label="open drawer"]').should('be.visible')
    
    // Click to open drawer
    cy.get('button[aria-label="open drawer"]').click()
    
    // Verify drawer opens with navigation links
    cy.contains('Home').should('be.visible')
    cy.contains('About').should('be.visible')
  })
})
