import React from 'react'
import About from '../../src/About'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../../theme'

const mountWithProviders = (component) => {
  return cy.mount(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {component}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('About Component Tests', () => {
  beforeEach(() => {
    mountWithProviders(<About />)
  })

  it('should render the About heading with TypeAnimation', () => {
    cy.contains(/About Me/i, { timeout: 5000 }).should('be.visible')
  })

  it('should display the main description', () => {
    cy.contains('Diego Emiliano González Martínez').should('be.visible')
    cy.contains('Software Developer').should('be.visible')
  })

  it('should render profile image', () => {
    cy.get('img[alt*="Diego"]').should('exist')
  })

  it('should display location, school, and role chips', () => {
    cy.contains('Canada').should('be.visible')
    cy.contains('Centennial College').should('be.visible')
    cy.contains('Full-Stack Developer').should('be.visible')
  })

  it('should have download resume button', () => {
    cy.contains('Download My Resume')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', '.pdf')
  })

  it('should render highlight cards', () => {
    cy.contains('Education').should('be.visible')
    cy.contains('Expertise').should('be.visible')
    cy.contains('Location').should('be.visible')
  })

  it('should display CTA section', () => {
    cy.contains('Let\'s Build Something Amazing Together').should('be.visible')
    cy.contains('Get In Touch').should('be.visible')
  })

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x')
    cy.contains('Diego Emiliano González Martínez').should('be.visible')
  })
})
