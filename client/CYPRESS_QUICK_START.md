# 🚀 Cypress Testing Quick Reference

## Run Tests

```powershell
# Open interactive test runner (RECOMMENDED FOR FIRST TIME)
npm run test:component:open

# Run tests in headless mode
npm run test:component

# Open Cypress (all test types)
npm run cypress:open

# Run all tests
npm run cypress:run
```

## ✅ What's Been Set Up

### Tests Created:

1. **Home.cy.jsx** - 30+ comprehensive tests
2. **About.cy.jsx** - 10 focused tests
3. **Projects.cy.jsx** - 15+ tests with API mocking

### Configuration:

- ✅ Cypress installed
- ✅ Vite integration configured
- ✅ Theme providers set up
- ✅ Router providers configured
- ✅ Test scripts added to package.json

## 📝 Create Your Own Test

### Step 1: Create test file

`cypress/component/YourComponent.cy.jsx`

### Step 2: Use this template:

```jsx
import React from "react";
import YourComponent from "../../src/YourComponent";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../theme";

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
  it("should render", () => {
    mountWithProviders(<YourComponent />);
    cy.contains("Expected Text").should("be.visible");
  });
});
```

## 🎯 Common Test Patterns

### Test Button Click

```javascript
cy.contains("button", "Submit").click();
```

### Test Form Input

```javascript
cy.get('input[name="email"]').type("test@example.com");
```

### Test Navigation

```javascript
cy.url().should("include", "/projects");
```

### Test API with Mock

```javascript
cy.intercept("GET", "/api/projects", { body: mockData });
```

### Test Visibility

```javascript
cy.contains("Hello").should("be.visible");
```

### Test Responsive

```javascript
cy.viewport("iphone-x");
cy.contains("Menu").should("be.visible");
```

## 🐛 Debug Tips

1. **Use Cypress UI** - See tests run in real-time
2. **cy.pause()** - Pause test execution
3. **cy.debug()** - Open DevTools
4. **Time travel** - Click on commands to see app state

## 📊 Test Coverage

| Component | Tests | Status      |
| --------- | ----- | ----------- |
| Home      | 30+   | ✅ Complete |
| About     | 10    | ✅ Complete |
| Projects  | 15+   | ✅ Complete |
| Education | 0     | ⏳ To Do    |
| Contact   | 0     | ⏳ To Do    |
| Services  | 0     | ⏳ To Do    |
| Menu      | 0     | ⏳ To Do    |

## 🎓 Next Steps

1. Run `npm run test:component:open`
2. Select a test file (Home.cy.jsx recommended)
3. Watch it run!
4. Create tests for remaining components
5. Add more test cases as needed

## 📚 Resources

- Full Guide: `CYPRESS_TESTING_GUIDE.md`
- [Cypress Docs](https://docs.cypress.io/)
- [Component Testing](https://docs.cypress.io/guides/component-testing/overview)

---

**Start Testing Now:**

```powershell
cd client
npm run test:component:open
```

Select `Home.cy.jsx` or `Projects.cy.jsx` to see comprehensive test examples! 🎉
