# Cypress Component Testing Guide

## 🚀 Quick Start

### Installation Complete! ✅

Cypress has been installed and configured for component testing.

### Run Tests

**Open Cypress Test Runner (Interactive Mode):**

```powershell
npm run test:component:open
```

**Run Tests in Headless Mode:**

```powershell
npm run test:component
```

**Open Cypress for All Test Types:**

```powershell
npm run cypress:open
```

---

## 📁 Project Structure

```
client/
├── cypress/
│   ├── component/                  # Component test files
│   │   ├── Home.cy.jsx            # Home component tests ✅
│   │   ├── About.cy.jsx           # About component tests ✅
│   │   └── Projects.cy.jsx        # Projects component tests ✅
│   ├── support/
│   │   ├── component.js           # Component testing setup
│   │   ├── component-index.html   # HTML template for tests
│   │   └── commands.js            # Custom Cypress commands
├── cypress.config.js               # Cypress configuration
└── package.json                   # Updated with test scripts
```

---

## 🧪 Available Tests

### 1. Home Component Tests (cypress/component/Home.cy.jsx)

**Comprehensive test suite covering:**

- ✅ Visual elements rendering
- ✅ TypeAnimation functionality
- ✅ CTA buttons and navigation
- ✅ Feature cards (Projects, Education, Skills, Contact)
- ✅ Bottom CTA section
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Theme and styling
- ✅ Accessibility
- ✅ Animations and interactions
- ✅ Content verification

**Total Tests:** ~30 test cases

### 2. About Component Tests (cypress/component/About.cy.jsx)

**Focused test suite covering:**

- ✅ TypeAnimation header
- ✅ Profile information display
- ✅ Profile image rendering
- ✅ Information chips (location, school, role)
- ✅ Download resume button
- ✅ Highlight cards
- ✅ CTA section
- ✅ Mobile responsiveness

**Total Tests:** ~10 test cases

---

## 📝 How to Create Tests for Other Components

### Template for Testing a Component

```jsx
import React from "react";
import YourComponent from "../../src/YourComponent";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../theme";

// Helper function to mount with all required providers
const mountWithProviders = (component) => {
  return cy.mount(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe("YourComponent Tests", () => {
  beforeEach(() => {
    // Mount component before each test
    mountWithProviders(<YourComponent />);
  });

  it("should render the component", () => {
    cy.contains("Expected Text").should("be.visible");
  });

  it("should handle user interactions", () => {
    cy.get("button").click();
    cy.contains("Result").should("be.visible");
  });

  // Add more tests...
});
```

---

## 🎯 Common Cypress Commands

### Finding Elements

```javascript
cy.get("button"); // Get by selector
cy.contains("Submit"); // Get by text content
cy.get('[data-testid="submit"]'); // Get by data attribute
cy.get(".class-name"); // Get by class
cy.get("#id-name"); // Get by ID
```

### Assertions

```javascript
.should('be.visible')              // Element is visible
.should('exist')                   // Element exists
.should('have.text', 'Hello')     // Has exact text
.should('contain', 'Hello')       // Contains text
.should('have.class', 'active')   // Has class
.should('have.attr', 'href')      // Has attribute
.should('have.css', 'color')      // Has CSS property
```

### Interactions

```javascript
cy.get("button").click(); // Click element
cy.get("input").type("text"); // Type in input
cy.get("select").select("option"); // Select dropdown
cy.get("element").trigger("hover"); // Trigger event
cy.get("button").focus(); // Focus element
```

### Navigation

```javascript
cy.url().should("include", "/path"); // Check URL
cy.visit("/path"); // Navigate to path
```

### Waiting

```javascript
cy.wait(1000); // Wait milliseconds
cy.contains("Text", { timeout: 5000 }); // Custom timeout
```

---

## 📊 Test Examples for Different Components

### Testing Forms (Contact Component)

```jsx
it("should submit the contact form", () => {
  cy.get('input[name="firstname"]').type("John");
  cy.get('input[name="lastname"]').type("Doe");
  cy.get('input[name="email"]').type("john@example.com");
  cy.contains("button", "Submit").click();
  cy.contains("Success").should("be.visible");
});
```

### Testing CRUD Operations (Projects Component)

```jsx
it("should create a new project", () => {
  cy.contains("button", "Add New Project").click();
  cy.get('input[name="title"]').type("Test Project");
  cy.get('textarea[name="description"]').type("Project description");
  cy.contains("button", "Create").click();
  cy.contains("Test Project").should("be.visible");
});
```

### Testing Authentication

```jsx
it("should sign in successfully", () => {
  cy.get('input[name="email"]').type("user@example.com");
  cy.get('input[name="password"]').type("password123");
  cy.contains("button", "Sign In").click();
  cy.contains("My Profile").should("be.visible");
});
```

### Testing Responsive Design

```jsx
it("should be mobile responsive", () => {
  cy.viewport("iphone-x");
  cy.get('[data-testid="mobile-menu"]').should("be.visible");
});

it("should be tablet responsive", () => {
  cy.viewport("ipad-2");
  cy.get(".feature-cards").should("have.css", "grid-template-columns");
});
```

---

## 🔍 Testing Best Practices

### 1. **Use data-testid Attributes**

Add to your components for easier testing:

```jsx
<button data-testid="submit-button">Submit</button>
```

### 2. **Organize Tests with describe Blocks**

```javascript
describe("Component Name", () => {
  describe("Feature A", () => {
    it("should do X", () => {});
  });
  describe("Feature B", () => {
    it("should do Y", () => {});
  });
});
```

### 3. **Use beforeEach for Setup**

```javascript
beforeEach(() => {
  mountWithProviders(<Component />);
  // Common setup code
});
```

### 4. **Test User Behavior, Not Implementation**

❌ Bad: `cy.get('.internal-class-name')`
✅ Good: `cy.contains('Submit')`

### 5. **Use Descriptive Test Names**

```javascript
it("should display error when email is invalid");
it("should redirect to dashboard after login");
```

---

## 🛠️ Advanced Testing Scenarios

### Testing with Mock Data

```jsx
it("should display projects from API", () => {
  // Intercept API calls
  cy.intercept("GET", "/api/projects", {
    statusCode: 200,
    body: [
      { id: 1, title: "Project 1", description: "Desc 1" },
      { id: 2, title: "Project 2", description: "Desc 2" },
    ],
  }).as("getProjects");

  mountWithProviders(<Projects />);

  cy.wait("@getProjects");
  cy.contains("Project 1").should("be.visible");
  cy.contains("Project 2").should("be.visible");
});
```

### Testing Error States

```jsx
it("should show error message when API fails", () => {
  cy.intercept("GET", "/api/projects", {
    statusCode: 500,
    body: { error: "Server error" },
  });

  mountWithProviders(<Projects />);
  cy.contains("Could not load projects").should("be.visible");
});
```

### Testing Loading States

```jsx
it("should show loading indicator", () => {
  cy.intercept("GET", "/api/projects", (req) => {
    req.reply({ delay: 2000, body: [] });
  });

  mountWithProviders(<Projects />);
  cy.contains("Loading").should("be.visible");
});
```

---

## 🎨 Component-Specific Test Suggestions

### Projects Component

- Create/edit/delete functionality
- Image upload handling
- Sorting and filtering
- Admin vs user permissions

### Education Component

- Timeline rendering
- Add/edit/delete entries
- Date formatting
- Admin controls

### Contact Component

- Form validation
- Email format checking
- Success/error messages
- Contact list display

### Services Component

- Skill categories display
- Animation functionality
- Responsive grid layout

---

## 🐛 Debugging Tests

### View Test in Browser

```powershell
npm run test:component:open
```

Then select the test file and watch it run in real-time!

### Add Debug Points

```javascript
cy.debug(); // Pause and open DevTools
cy.pause(); // Pause execution
cy.log("Debug message"); // Log to Cypress console
```

### Screenshots and Videos

Cypress automatically captures:

- Screenshots on test failure
- Videos of test runs (in headless mode)

Files saved to:

- `cypress/screenshots/`
- `cypress/videos/`

---

## 📈 Running Tests in CI/CD

### GitHub Actions Example

```yaml
- name: Run Component Tests
  run: |
    cd client
    npm run test:component
```

### View Test Results

```powershell
npm run test:component -- --reporter json --reporter-options output=results.json
```

---

## 🎓 Next Steps

1. **Run the existing tests:**

   ```powershell
   npm run test:component:open
   ```

2. **Create tests for Projects component:**

   - Copy the pattern from Home.cy.jsx
   - Test CRUD operations
   - Test admin functionality

3. **Add more test coverage:**

   - Education component
   - Contact component
   - Services component
   - Navigation/Menu component

4. **Add E2E tests:**
   - Full user journeys
   - Integration between pages
   - Authentication flows

---

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Component Testing Guide](https://docs.cypress.io/guides/component-testing/overview)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Examples](https://github.com/cypress-io/cypress-example-recipes)

---

## 🎉 You're All Set!

Run your first test:

```powershell
cd client
npm run test:component:open
```

Select either `Home.cy.jsx` or `About.cy.jsx` and watch your tests run! 🚀
