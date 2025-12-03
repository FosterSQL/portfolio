import React from 'react'
import Projects from '../../src/Projects'
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

describe('Projects Component Tests', () => {
  const mockProjects = [
    {
      _id: '1',
      title: 'E-commerce Platform',
      completion: '2024-01-15',
      description: 'A full-stack e-commerce solution built with React and Node.js',
      image: 'https://example.com/image1.jpg'
    },
    {
      _id: '2',
      title: 'Weather Dashboard',
      completion: '2024-03-20',
      description: 'Real-time weather tracking application',
      image: 'https://example.com/image2.jpg'
    }
  ]

  beforeEach(() => {
    // Mock the API call for fetching projects
    cy.intercept('GET', '/api/projects', {
      statusCode: 200,
      body: mockProjects
    }).as('getProjects')
  })

  it('should render the Projects heading with animation', () => {
    mountWithProviders(<Projects />)
    cy.contains(/My Projects/i, { timeout: 5000 }).should('be.visible')
  })

  it('should load and display projects from API', () => {
    mountWithProviders(<Projects />)
    cy.wait('@getProjects')
    cy.contains('E-commerce Platform').should('be.visible')
    cy.contains('Weather Dashboard').should('be.visible')
  })

  it('should display project descriptions', () => {
    mountWithProviders(<Projects />)
    cy.contains('A full-stack e-commerce solution').should('be.visible')
    cy.contains('Real-time weather tracking').should('be.visible')
  })

  it('should display project completion dates', () => {
    mountWithProviders(<Projects />)
    cy.contains('1/15/2024').should('be.visible')
    cy.contains('3/20/2024').should('be.visible')
  })

  it('should render project images', () => {
    mountWithProviders(<Projects />)
    cy.get('img[alt="E-commerce Platform"]').should('exist')
    cy.get('img[alt="Weather Dashboard"]').should('exist')
  })

  it('should display projects in a grid layout', () => {
    mountWithProviders(<Projects />)
    cy.get('[class*="MuiGrid-container"]').should('exist')
  })

  it('should show loading state initially', () => {
    // Delay the API response to test loading state
    cy.intercept('GET', '/api/projects', (req) => {
      req.reply({ delay: 1000, body: mockProjects })
    })
    
    mountWithProviders(<Projects />)
    cy.contains('Loading projects').should('be.visible')
  })

  it('should handle empty projects list', () => {
    cy.intercept('GET', '/api/projects', {
      statusCode: 200,
      body: []
    })
    
    mountWithProviders(<Projects />)
    cy.contains('No projects available yet').should('be.visible')
  })

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x')
    mountWithProviders(<Projects />)
    cy.wait('@getProjects')
    cy.contains('E-commerce Platform').should('be.visible')
  })

  it('should apply hover effects to project cards', () => {
    mountWithProviders(<Projects />)
    cy.wait('@getProjects')
    cy.contains('E-commerce Platform')
      .parent()
      .parent()
      .parent()
      .trigger('mouseover')
      .should('have.css', 'transition')
  })

  describe('Admin Functionality', () => {
    beforeEach(() => {
      // Mock authenticated admin user
      window.localStorage.setItem('jwt', JSON.stringify({
        token: 'mock-token',
        user: { _id: 'admin-id', isAdmin: true }
      }))
    })

    afterEach(() => {
      window.localStorage.clear()
    })

    it('should show Add New Project button for admin', () => {
      mountWithProviders(<Projects />)
      cy.contains('button', 'Add New Project').should('be.visible')
    })

    it('should show edit and delete buttons for admin', () => {
      mountWithProviders(<Projects />)
      cy.wait('@getProjects')
      cy.get('[data-testid="EditIcon"]').should('have.length.at.least', 1)
      cy.get('[data-testid="DeleteIcon"]').should('have.length.at.least', 1)
    })

    it('should open dialog when clicking Add New Project', () => {
      mountWithProviders(<Projects />)
      cy.contains('button', 'Add New Project').click()
      cy.contains('Add New Project').should('be.visible')
      cy.get('input[name="title"]').should('be.visible')
    })
  })

  describe('Error Handling', () => {
    it('should display error message when API fails', () => {
      cy.intercept('GET', '/api/projects', {
        statusCode: 500,
        body: { error: 'Server error' }
      })
      
      mountWithProviders(<Projects />)
      cy.contains(/error|failed/i, { timeout: 5000 }).should('be.visible')
    })
  })
})
