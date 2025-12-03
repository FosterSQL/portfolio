// Import commands.js using ES2015 syntax:
import './commands'

// Import React and ReactDOM for mounting
import { mount } from 'cypress/react'
import React from 'react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)
