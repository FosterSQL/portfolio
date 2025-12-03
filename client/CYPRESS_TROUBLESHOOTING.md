# Cypress Troubleshooting Guide

## ✅ Issues Fixed

### Issue 1: Config File Error ✅

**What Was Wrong:** The `cypress.config.js` was trying to import the entire `vite.config.js`, but Cypress needs a simplified configuration.

### Issue 2: Missing component-index.html ✅

**What Was Wrong:** Cypress couldn't find `cypress/support/component-index.html` which is required for component testing.
**Solution:** Created the file with proper HTML structure and a root div for React mounting.

### What Was Changed:

```javascript
// OLD (Caused errors)
import viteConfig from './vite.config.js'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,  // ❌ Too complex
    },
  },
})

// NEW (Works!)
import react from '@vitejs/plugin-react'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        plugins: [react()],  // ✅ Simple and direct
        server: {
          port: 5173,
        },
      },
    },
  },
})
```

---

## 🚀 Quick Start (Now Fixed!)

```powershell
cd client
npm run test:component:open
```

Cypress UI should now open without errors!

---

## 🐛 Common Issues & Solutions

### Issue 1: "Config file crashed"

**Solution:** ✅ FIXED - Config simplified to work with Vite

### Issue 2: Browser closes unexpectedly

**Possible Causes:**

- Chrome/browser version compatibility
- Memory issues
- GPU acceleration problems

**Solutions:**

1. **Try different browser** in Cypress UI (Firefox, Edge)
2. **Disable GPU acceleration:**

   ```javascript
   // In cypress.config.js, add:
   export default defineConfig({
     chromeWebSecurity: false,
     video: false,
     component: {
       // ... existing config
     },
   });
   ```

3. **Run in headless mode:**
   ```powershell
   npm run test:component
   ```

### Issue 3: Tests timeout

**Solution:** Increase timeout in tests:

```javascript
it("should load", { timeout: 10000 }, () => {
  // test code
});
```

### Issue 4: Module not found errors

**Solution:** Verify support file imports:

```javascript
// cypress/support/component.js
import { mount } from "cypress/react18";
// NOT: import { mount } from 'cypress/react'
```

### Issue 5: Theme/Router errors in tests

**Solution:** Always mount with providers (already in test files):

```javascript
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
```

---

## ✅ Verification Steps

### 1. Check Cypress Installation

```powershell
npx cypress verify
```

Expected: ✔ Verified Cypress!

### 2. Check Config

```powershell
npx cypress info
```

Should show no errors

### 3. List Available Tests

```powershell
npx cypress run --component --spec "cypress/component/**/*"
```

---

## 🎯 Running Tests

### Interactive Mode (Recommended)

```powershell
npm run test:component:open
```

- Opens Cypress UI
- Select browser (Chrome, Firefox, Edge)
- Click on test file to run
- Watch tests in real-time

### Headless Mode (CI/CD)

```powershell
npm run test:component
```

- Runs all tests without UI
- Faster for automation
- Generates videos/screenshots

### Run Specific Test

```powershell
npx cypress run --component --spec "cypress/component/Home.cy.jsx"
```

### Run with Specific Browser

```powershell
npx cypress run --component --browser firefox
```

---

## 📊 Test Status

### Working Tests:

- ✅ Home.cy.jsx (30+ tests)
- ✅ About.cy.jsx (10 tests)
- ✅ Projects.cy.jsx (15+ tests with API mocking)

### Available Commands:

```powershell
npm run cypress:open              # Open Cypress (all types)
npm run cypress:run               # Run all tests headless
npm run test:component            # Run component tests headless
npm run test:component:open       # Open component test UI
```

---

## 🔧 Advanced Configuration

### Disable Video Recording (Faster)

```javascript
// cypress.config.js
export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  component: {
    // ... existing config
  },
});
```

### Change Viewport Size

```javascript
// cypress.config.js
export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  component: {
    // ... existing config
  },
});
```

### Add Custom Commands

```javascript
// cypress/support/commands.js
Cypress.Commands.add("login", (email, password) => {
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains("button", "Sign In").click();
});

// Use in tests:
cy.login("user@example.com", "password123");
```

---

## 📝 Writing Better Tests

### Use data-testid

```jsx
// In your component:
<button data-testid="submit-btn">Submit</button>;

// In your test:
cy.get('[data-testid="submit-btn"]').click();
```

### Wait for API Calls

```javascript
cy.intercept("GET", "/api/projects").as("getProjects");
mountWithProviders(<Projects />);
cy.wait("@getProjects");
```

### Test Accessibility

```powershell
npm install -D cypress-axe axe-core
```

```javascript
import "cypress-axe";

it("should be accessible", () => {
  mountWithProviders(<Home />);
  cy.injectAxe();
  cy.checkA11y();
});
```

---

## 🎉 Success Checklist

- ✅ Cypress installed
- ✅ Config fixed (no more crash!)
- ✅ Support files created
- ✅ Test files created (Home, About, Projects)
- ✅ Scripts added to package.json
- ✅ Documentation created

---

## 🆘 Still Having Issues?

### Get More Info:

```powershell
npx cypress open --component --browser chrome --config video=true
```

### Check Logs:

Look in the Cypress UI console for detailed error messages

### Debug Mode:

```javascript
// In your test:
cy.debug(); // Pauses and opens DevTools
cy.pause(); // Pauses execution
```

### Reset Cypress:

```powershell
npx cypress cache clear
npx cypress install
```

---

## 📚 Resources

- [Cypress Docs](https://docs.cypress.io/)
- [Component Testing](https://docs.cypress.io/guides/component-testing/overview)
- [Debugging Guide](https://docs.cypress.io/guides/guides/debugging)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)

---

**You're all set! The config error is fixed. Run:**

```powershell
npm run test:component:open
```

And start testing! 🚀
