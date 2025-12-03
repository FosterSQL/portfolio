# Cypress E2E Testing Guide

## Overview

Simple end-to-end tests for your portfolio application. Each component has 2 focused tests.

## Test Files

- **home.cy.js** - Tests home page load and navigation
- **about.cy.js** - Tests profile display and resume download
- **projects.cy.js** - Tests projects page and content display
- **education.cy.js** - Tests education timeline
- **contact.cy.js** - Tests contact form
- **navigation.cy.js** - Tests menu navigation across all pages

## Running E2E Tests

### Prerequisites

Make sure your dev server is running:

```powershell
npm run dev
```

The dev server should be running on `http://localhost:5173`

### Run Tests in Interactive Mode (Recommended)

```powershell
npm run test:e2e:open
```

This opens the Cypress Test Runner where you can:

- Select which tests to run
- See tests execute in real-time
- Debug failing tests
- View before/after screenshots

### Run Tests in Headless Mode

```powershell
npm run test:e2e
```

This runs all tests in the terminal without opening a browser window. Good for CI/CD.

### Run Specific Test File

```powershell
npx cypress run --e2e --spec "cypress/e2e/home.cy.js"
```

## Test Structure

Each test file follows this pattern:

```javascript
describe("Component Name E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/route"); // Navigate to page before each test
  });

  it("should test basic functionality", () => {
    // Test assertions here
  });

  it("should test user interaction", () => {
    // Test assertions here
  });
});
```

## Common Commands Used

- `cy.visit(url)` - Navigate to a page
- `cy.contains(text)` - Find element containing text
- `cy.get(selector)` - Find element by CSS selector
- `cy.click()` - Click an element
- `cy.should('be.visible')` - Assert element is visible
- `cy.url().should('include', path)` - Assert URL contains path

## Troubleshooting

**Tests failing with timeout errors:**

- Ensure dev server is running on port 5173
- Increase timeout in test: `cy.contains('text', { timeout: 10000 })`

**API call tests failing:**

- Tests expect backend to be running or will check for empty states
- Update tests if you change API endpoints

**Navigation tests failing:**

- Verify all routes exist in MainRouter.jsx
- Check menu links match route paths

## Best Practices

1. **Keep tests simple** - Focus on critical user paths
2. **Use data-testid** - Add `data-testid` attributes for reliable selectors
3. **Avoid hardcoded waits** - Use `cy.wait()` only when necessary
4. **Test user behavior** - Click, type, navigate like a real user
5. **Clean state** - Use `beforeEach()` to reset state

## Extending Tests

To add more tests:

1. Create new file in `cypress/e2e/`
2. Follow the naming pattern: `feature-name.cy.js`
3. Keep it simple: max 2-3 tests per file
4. Focus on user flows, not implementation details

## CI/CD Integration

Add to GitHub Actions workflow:

```yaml
- name: Run E2E Tests
  run: |
    npm run dev &
    npx wait-on http://localhost:5173
    npm run test:e2e
```
