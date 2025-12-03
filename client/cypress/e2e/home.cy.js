describe('Home Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page and display main content', () => {
    // Check if the hero section is visible
    cy.contains(/software developer|full.?stack developer/i, { timeout: 10000 }).should('be.visible')
    
    // Verify navigation menu is present
    cy.get('header').should('be.visible')
    cy.contains('Home').should('be.visible')
  })

  it('should navigate to other pages from home', () => {
    // Click on About link
    cy.contains('About').click()
    cy.url().should('include', '/about')
    
    // Go back and click Projects
    cy.visit('/')
    cy.contains('Projects').click()
    cy.url().should('include', '/projects')
  })
})
