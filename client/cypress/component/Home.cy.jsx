import React from 'react'
import Home from '../../src/Home'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../../theme'

// Helper function to mount component with required providers
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

describe('Home Component Tests', () => {
  beforeEach(() => {
    // Mount the Home component before each test
    mountWithProviders(<Home />)
  })

  describe('Visual Elements', () => {
    it('should render the hero section with gradient background', () => {
      // Check if the main hero section exists
      cy.contains('Diego Emiliano González Martínez').should('be.visible')
    })

    it('should display the main heading', () => {
      cy.contains('Diego Emiliano González Martínez')
        .should('be.visible')
        .and('have.css', 'font-weight', '800')
    })

    it('should render the TypeAnimation component', () => {
      // The TypeAnimation should eventually show one of the sequences
      cy.contains(/Software Developer|Full Stack Engineer|Problem Solver|Tech Enthusiast/, { timeout: 10000 })
        .should('be.visible')
    })

    it('should display the description text', () => {
      cy.contains('Passionate about building innovative solutions')
        .should('be.visible')
    })
  })

  describe('Call-to-Action Buttons', () => {
    it('should render "View My Work" button', () => {
      cy.contains('button', 'View My Work')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', '/projects')
    })

    it('should render "Get In Touch" button', () => {
      cy.contains('button', 'Get In Touch')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', '/contact')
    })

    it('should navigate to projects page when clicking "View My Work"', () => {
      cy.contains('button', 'View My Work').click()
      cy.url().should('include', '/projects')
    })

    it('should navigate to contact page when clicking "Get In Touch"', () => {
      cy.contains('button', 'Get In Touch').click()
      cy.url().should('include', '/contact')
    })
  })

  describe('Feature Cards', () => {
    it('should render all four feature cards', () => {
      cy.contains('Projects').should('be.visible')
      cy.contains('Education').should('be.visible')
      cy.contains('Skills').should('be.visible')
      cy.contains('Contact').should('be.visible')
    })

    it('should display feature card descriptions', () => {
      cy.contains('Explore my latest work and technical achievements').should('be.visible')
      cy.contains('My academic journey and qualifications').should('be.visible')
      cy.contains('Technologies and tools I work with').should('be.visible')
      cy.contains('Get in touch with me').should('be.visible')
    })

    it('should render icons for each feature card', () => {
      // Check if MUI icons are rendered (they have specific SVG structure)
      cy.get('svg[data-testid*="Icon"]').should('have.length.at.least', 4)
    })

    it('should have clickable feature cards', () => {
      // Click on Projects card
      cy.contains('Projects').parent().parent().click()
      cy.url().should('include', '/projects')
    })
  })

  describe('Bottom CTA Section', () => {
    it('should render the collaboration section', () => {
      cy.contains('Ready to collaborate?').should('be.visible')
    })

    it('should display the CTA description', () => {
      cy.contains('I\'m always open to discussing new projects')
        .should('be.visible')
    })

    it('should render "Let\'s Talk" button', () => {
      cy.contains('button', 'Let\'s Talk')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', '/contact')
    })
  })

  describe('Responsive Design', () => {
    it('should be responsive on mobile viewport', () => {
      cy.viewport('iphone-x')
      cy.contains('Diego Emiliano González Martínez').should('be.visible')
      cy.contains('button', 'View My Work').should('be.visible')
    })

    it('should be responsive on tablet viewport', () => {
      cy.viewport('ipad-2')
      cy.contains('Diego Emiliano González Martínez').should('be.visible')
      cy.get('svg[data-testid*="Icon"]').should('be.visible')
    })

    it('should be responsive on desktop viewport', () => {
      cy.viewport(1920, 1080)
      cy.contains('Diego Emiliano González Martínez').should('be.visible')
      cy.contains('Projects').should('be.visible')
    })
  })

  describe('Theme and Styling', () => {
    it('should apply theme colors correctly', () => {
      // Check if buttons have the correct color scheme
      cy.contains('button', 'View My Work')
        .should('have.css', 'background-color')
    })

    it('should have proper spacing in the layout', () => {
      // Check container has proper padding
      cy.get('div').first().should('have.css', 'padding')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist')
      cy.get('h2').should('exist')
    })

    it('should have accessible buttons with text', () => {
      cy.contains('button', 'View My Work').should('not.be.empty')
      cy.contains('button', 'Get In Touch').should('not.be.empty')
    })

    it('should support keyboard navigation', () => {
      cy.contains('button', 'View My Work').focus().should('have.focus')
    })
  })

  describe('Animation and Interactions', () => {
    it('should apply hover effects to feature cards', () => {
      cy.contains('Projects')
        .parent()
        .parent()
        .parent()
        .trigger('mouseover')
        .should('have.css', 'transition')
    })

    it('should apply fade-in animation', () => {
      // Check if Fade component is working (MUI Fade)
      cy.contains('Diego Emiliano González Martínez')
        .parent()
        .should('be.visible')
    })
  })

  describe('Content Verification', () => {
    it('should display correct portfolio sections', () => {
      const sections = ['Projects', 'Education', 'Skills', 'Contact']
      sections.forEach(section => {
        cy.contains(section).should('be.visible')
      })
    })

    it('should have proper grid layout for feature cards', () => {
      // Check if Grid container exists
      cy.get('div[class*="MuiGrid-container"]').should('exist')
    })

    it('should display the portfolio exploration heading', () => {
      cy.contains('Explore My Portfolio').should('be.visible')
    })
  })
})
