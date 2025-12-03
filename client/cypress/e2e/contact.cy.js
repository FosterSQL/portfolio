describe('Contact Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should display the contact form', () => {
    // Check if page title is visible
    cy.contains(/contact/i, { timeout: 10000 }).should('be.visible')
    
    // Check if form fields exist
    cy.contains('First Name').should('be.visible')
    cy.contains('Email Address').should('be.visible')
  })

  it('should have form fields and submit button', () => {
    // Check for input fields
    cy.get('input[type="text"], input[type="email"]').should('have.length.greaterThan', 0)
    
    // Check for submit button with Send icon
    cy.contains('button', /send|submit/i).should('be.visible')
  })
})
