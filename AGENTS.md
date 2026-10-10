# Project Technical Rules & Coding Standards

## 1. File Length Constraint (Strict Rule)
- **NO file should exceed 50 lines of code**.
- Any file that approaches or exceeds 50 lines must be decomposed into smaller, focused, modular sub-components.
- Each sub-component must have its own dedicated CSS module file (`ComponentName.module.css`).
- The parent component folder must contain a `Components/` subfolder containing these sub-components.

## 2. Organization & Readability
- Code must be clean, highly organized, and easy to read, test, and edit.
- Keep JSX trees shallow by delegating chunks of UI into well-named child components.
- Do not mix complex styling or monolithic markup into a single file.

## 3. Financial Calculations & Data Integrity
- Always verify numbers and financial logic before rendering:
  - Total Sales Revenue must never be less than collected payments from buyers/importers.
  - Net Profit/Loss = Total Sales Revenue - Total Expenses.
  - Coverage ratio = Total Sales Revenue / Total Expenses.
  - When calculating prices, ensure execution price per kg reflects realistic transaction values.
- Never display contradictory financial indicators (e.g. collected cash > total revenue, or profit showing as deficit).
