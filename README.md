# playwright-saucedemo-ts

Playwright + TypeScript end-to-end test suite targeting [saucedemo.com](https://www.saucedemo.com), built as demo project to demonstrate and practice core test automation concepts: Page Object Model, fixtures, Allure reporting, and CI/CD integration via GitHub Actions.

> **Selenium counterpart:** This project is the TypeScript/Playwright solution of a previously built [Selenium + Python](https://github.com/csokanandor95/selenium-automation-demo) test suite on the same application. I aim to write the same tests with the different technologies and will compare the results - as my time will allow :)

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev/) | 1.59.1 | Test framework & browser automation |
| TypeScript | 5.x | Language |
| Node.js | 20.x | Runtime |
| [Allure Report](https://allurereport.org/) | 2.x | Test reporting |
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
├── allure-results/              # Auto-generated – raw Allure data (gitignored)
├── allure-report/               # Auto-generated – Allure HTML report (gitignored)
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

**Allure Reporting** – Integrated alongside Playwright's built-in HTML reporter. Allure provides a richer, interactive report with step-by-step breakdown, suite grouping, and visual statistics.

---

## Running Locally

**Prerequisites:** Node.js 20+, npm, Java 11+ (required by Allure CLI)

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

# Open Playwright HTML report
npx playwright show-report
```

---

## Reporting

The project uses two reporters running simultaneously:

| Reporter | Command | Output |
|---|---|---|
| Playwright HTML | `npx playwright show-report` | `playwright-report/` |
| Allure Report | `npm run allure:report` | `allure-report/` |

### Allure commands

```bash
# Generate Allure report from test results
npm run allure:generate

# Open generated report in browser (requires local web server – do not open index.html directly)
npm run allure:open

# Generate and open in one step
npm run allure:report
```

> **Note:** Allure Report requires a local web server to run correctly. Opening `index.html` directly in the browser will result in errors. Always use `npm run allure:open` or VS Code Live Server.

---

## CI/CD

The pipeline runs automatically on every push and pull request to `main`.

**Steps:**
1. Checkout repository
2. Setup Node.js 20 with npm cache
3. `npm ci` – deterministic dependency install from lockfile
4. Install Chromium with system dependencies
5. Run full test suite in headless mode
6. Generate reports
7. Upload artifacts (retained for 14 days)

### Artifacts available after each pipeline run

| Artifact | Contents |
|---|---|
| `playwright-report` | Playwright built-in HTML report |
| `allure-report` | Generated Allure HTML report |
| `allure-results` | Raw Allure JSON data (for future history/trend support) |

> **Tip:** To view the downloaded Allure artifact locally, unzip it and run `npx allure open allure-report` from the project root.

---

## Author

**Csóka Nándor** – QA Engineer  
[GitHub](https://github.com/csokanandor95) · [Portfolio website](https://csokanandor95.github.io)