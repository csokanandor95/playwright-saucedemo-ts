# playwright-saucedemo-ts

Playwright + TypeScript end-to-end test suite targeting [saucedemo.com](https://www.saucedemo.com), built as demo project to demonstrate and practice core test automation concepts: Page Object Model, fixtures, and CI/CD integration via GitHub Actions.

> **Selenium counterpart:** This project is the TypeScript/Playwright solution of a previously built [Selenium + Python](https://github.com/csokanandor95/selenium-automation-demo) test suite on the same application. I aim to write the same testst with the different technologies and will compare the results - as my time will allow :)

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev/) | 1.59.1 | Test framework & browser automation |
| TypeScript | 5.x | Language |
| Node.js | 20.x | Runtime |
| GitHub Actions | – | CI/CD pipeline |

---

## Project Structure

```
playwright-saucedemo-ts/
│
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline – headless Chromium
│
├── pages/                       # Page Object Model layer
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
│
├── tests/                       # Test specs
│   ├── login.spec.ts            # 4 login test cases
│   └── cart.spec.ts             # 5 shopping cart test cases
│
├── fixtures/
│   └── auth.fixture.ts          # Custom fixture – authenticated state
│
├── test-data/
│   └── users.ts                 # Credentials & expected error messages
│
├── playwright.config.ts         # Base URL, retries, reporter, screenshot config
└── tsconfig.json
```

---

## Test Cases

### Login Tests (`login.spec.ts`)

| ID | Description | Type |
|---|---|---|
| TC-L01 | Successful login with valid credentials | Happy path |
| TC-L02 | Failed login with invalid password | Negative |
| TC-L03 | Locked user login attempt | Negative |
| TC-L04 | Empty fields login attempt | Boundary |

### Shopping Cart Tests (`cart.spec.ts`)

| ID | Description | Type |
|---|---|---|
| TC-C01 | Add single item to cart | Happy path |
| TC-C02 | Add multiple items to cart | Happy path |
| TC-C03 | Cart badge updates dynamically | State verification |
| TC-C04 | Remove item from cart | Happy path |
| TC-C05 | Cart contains added item | Happy path |

---

## Key Concepts Demonstrated

**Page Object Model** – Each page of the application has a dedicated class encapsulating its locators and actions. Tests interact only through POM methods, never directly with locators.

**Custom Fixture (`auth.fixture.ts`)** – Cart tests require an authenticated state. Instead of repeating login logic in every test, a Playwright custom fixture handles setup once and injects the ready-to-use page objects. This keeps test code clean and focused on business logic only.

**Locator API** – All element interactions use Playwright's modern `Locator` API with `data-test` attributes. Playwright's built-in auto-waiting eliminates the need for manual explicit waits.

**Data separation** – All credentials and expected error messages are centralized in `test-data/users.ts` as a single source of truth.

---

## Running Locally

**Prerequisites:** Node.js 20+, npm

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install chromium

# Run all tests (headless)
npx playwright test

# Run specific spec file
npx playwright test tests/login.spec.ts

# Run with headed browser (visible)
npx playwright test --headed

# Open HTML report after run
npx playwright show-report
```

---

## CI/CD

The pipeline runs automatically on every push and pull request to `main`.

**Steps:**
1. Checkout repository
2. Setup Node.js 20 with npm cache
3. `npm ci` – deterministic dependency install from lockfile
4. Install Chromium with system dependencies
5. Run full test suite in headless mode
6. Upload HTML report as artifact (retained for 14 days)

The HTML report is downloadable from the **Actions** tab → latest run → **Artifacts → playwright-report**.

---

## Author

**Csóka Nándor** – QA Engineer  
[GitHub](https://github.com/csokanandor95) · [Portfolio website](https://csokanandor95.github.io)

