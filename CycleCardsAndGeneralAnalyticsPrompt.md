# Dawagen — Cycle Cards & General Analytics Data Specification

This document defines the **data that should be displayed** in:

1. Historical / Previous Cycle Cards
2. Condensed Cycle Card state
3. Extended Cycle Card state
4. Global Farm Analytics

This document is a **data specification**, not a routing or architecture specification.

The main implementation prompt defines:

* routing
* active/viewed cycle behavior
* sidebar behavior
* historical cycle safety
* component architecture
* interaction behavior
* responsive behavior

This document defines **what information the UI should present**.

---

# 1. DATA SOURCE PRINCIPLE

All displayed values must be derived from the actual database.

Never invent values.

Never convert missing values into zero.

Distinguish clearly between:

```text
0
```

and:

```text
Not available
```

and:

```text
Not enough data
```

and:

```text
Not applicable
```

For example:

```text
Deaths = 0
```

means zero deaths were actually recorded.

While:

```text
Deaths = null
```

means the information is missing.

The UI must preserve this distinction.

---

# 2. CYCLE CARD DATA

Each cycle card represents ONE cycle.

The card has two information densities:

```text
Condensed
Extended
```

The condensed state is designed for scanning many cycles quickly.

The extended state provides additional context before opening the full cycle.

The card must never attempt to display the complete contents of a cycle.

---

# 3. CYCLE CARD — IDENTITY DATA

Every card should contain:

### Cycle ID

Source:

```text
Cycles.id
```

Display example:

```text
Cycle #13
```

### Chick Type

Source:

```text
Cycles.chick_type
```

Examples:

```text
Sasso
White
Ross
```

If missing:

```text
Unknown type
```

### Cycle Status

Derived from:

```text
Cycles.is_active
Cycles.ended_at
```

Possible states:

```text
ACTIVE
COMPLETED
```

An active cycle should never be treated as a historical cycle.

### Start Date

Source:

```text
Cycles.started_at
```

### End Date

Source:

```text
Cycles.ended_at
```

For an active cycle, there may be no end date.

### Duration

For completed cycles:

```text
ended_at - started_at
```

For active cycles:

```text
current date/time - started_at
```

Display example:

```text
28 days
```

---

# 4. INITIAL POPULATION

Source:

```text
Cycles.number_of_chicks
```

Display:

```text
10,000 chicks
```

This is a contextual metric and should not dominate the card.

---

# 5. CURRENT / FINAL WEIGHT

The card should show the most relevant available weight.

For an active cycle:

```text
Current Weight
```

For a completed cycle:

```text
Final Weight
```

The value should be derived from the latest valid `FollowUpData` associated with the latest relevant `Days` record.

Available weight fields:

```text
FollowUpData.weight_small
FollowUpData.weight_medium
FollowUpData.weight_large
FollowUpData.wight_random_sample
```

The UI must clearly distinguish the displayed metric from the raw individual size-category measurements.

If the application has an established formula for average weight, use that formula consistently.

Do not invent a new biological weighting formula without explicit business rules.

---

# 6. FCR

FCR should be displayed when enough valid data exists to calculate it.

The exact formula must be consistent throughout the application.

Conceptually:

```text
FCR =
Feed consumed / Live weight gain
```

Do not display FCR when required data is missing.

Use:

```text
FCR
—
```

or:

```text
Not enough data
```

rather than:

```text
FCR = 0
```

For completed cycles, FCR should represent the final cycle result.

For active cycles, label it as current-to-date if appropriate.

---

# 7. MORTALITY

Deaths are derived from:

```text
Events.deaths
```

associated with the cycle's days.

Total deaths:

```text
SUM(Events.deaths)
```

Mortality percentage should be derived from the initial population and recorded deaths.

Conceptually:

```text
Mortality % =
Total deaths / Initial chicks × 100
```

The exact business formula should remain consistent throughout the application.

Display example:

```text
Mortality
3.2%
```

Optionally show the absolute number in the extended state:

```text
320 deaths
3.2%
```

Do not show a mortality percentage if the initial population is unavailable.

---

# 8. SURVIVAL

Where enough data exists:

```text
Survival % =
100 - Mortality %
```

This can be displayed in the extended card or analytics.

It should not necessarily appear in the condensed card because mortality already communicates the same information.

---

# 9. FEED CONSUMPTION

Feed consumption is derived from:

```text
FoodWithdraw
```

through:

```text
FoodWithdraw.parent_event_id
Events.parent_day_id
Days.cycle_id
```

Relevant fields:

```text
FoodWithdraw.sacks_consumed
FoodWithdraw.consumption_type
```

The card may show:

```text
Total Feed
18.7 ton
```

where a valid conversion to kilograms/tons is available.

Do not show feed consumption if the data is incomplete without indicating that it is partial.

---

# 10. FEED COST

Feed purchasing information comes from:

```text
FeedShipments
```

Relevant fields:

```text
sacks_count
sack_weight
sack_price
```

The system may derive:

```text
Total Feed Purchased
Total Feed Purchase Cost
```

depending on the actual payment and shipment logic.

Feed cost can be used in the extended card and global analytics.

---

# 11. MEDICINE DATA

Medicine consumption comes from:

```text
DrugWithdraw
```

and medicine purchasing information comes from:

```text
MedicineInvoices
Medicine
```

Relevant information includes:

```text
Medicine names
Packages consumed
Consumed capacity
Measurement type
Medicine cost
```

Medicine should NOT appear in detail on the condensed cycle card.

The condensed card may show only:

```text
Medicine Cost
```

or:

```text
Medicine usage recorded
```

if useful.

The extended card may show:

```text
Medicine Cost
Number of medicine events
```

Detailed medicine information belongs to the cycle's Medicine section.

---

# 12. EXPENSE DATA

Daily expenses come from:

```text
DailyExpenses
```

Relevant fields:

```text
expense_item
amount
payment_type
```

For each cycle calculate:

```text
Total Expenses
```

The condensed card should show the total.

The extended card may show:

```text
Total Expenses
Feed Cost
Medicine Cost
Other Daily Expenses
```

only if these categories can be reliably derived.

Do not fabricate categories if the stored `expense_item` values are not structured enough.

---

# 13. SALES DATA

Sales come from:

```text
FarmSales
```

Relevant fields include:

```text
cycle_id
importer_id
vehicle_type
crates_count
crate_capacity
tare_weights
gross_weights
execution_price
payments
```

Cycle-level sales summary should include:

```text
Total Sales
Total Weight Sold
Number of Sales
Number of Traders / Importers
Number of Vehicles
```

where these values can be reliably calculated.

---

# 14. OUTSTANDING SALES PAYMENTS

For every cycle, calculate the amount sold versus the amount actually paid.

Conceptually:

```text
Total Sales
- Total Payments Received
= Outstanding Amount
```

The exact calculation must follow the application's actual `FarmSales.payments` structure.

If outstanding > 0, the Cycle Card should expose this as an important financial alert.

Example:

```text
⚠ 12,500 EGP outstanding
```

The card should NOT list all individual traders.

That information belongs in Finance / Sales details.

---

# 15. FINANCIAL SUMMARY

For completed cycles:

```text
Total Expenses
Total Sales
Total Payments Received
Outstanding Amount
Net Result
```

Conceptually:

```text
Net Result =
Total Sales - Total Expenses
```

Do not call this "Profit" if the business definition later includes additional financial adjustments that are not represented in the current schema.

For active cycles, do not label a current-to-date result as final profit.

Use:

```text
Current Sales
Current Expenses
Current Balance
```

as appropriate.

---

# 16. CYCLE CARD — CONDENSED DATA

The condensed card should contain approximately:

### Header

```text
Cycle #13
Sasso
COMPLETED
```

### Timeline

```text
Sep 02 → Sep 28
28 days
```

### Population

```text
10,000 chicks
```

### Core Performance

Show up to 3 primary metrics:

```text
Final Weight
FCR
Mortality
```

For active cycles:

```text
Current Weight
FCR
Mortality
```

### Financial Summary

```text
Total Expenses
Total Sales
```

For completed cycles optionally:

```text
Net Result
```

### Important Alert

If applicable:

```text
⚠ 12,500 EGP outstanding
```

or:

```text
⚠ Missing follow-up data
```

or another genuinely actionable issue.

### Primary Action

```text
View Cycle →
```

---

# 17. CONDENSED CARD — INFORMATION PRIORITY

The visual priority should be:

```text
1. Cycle identity
2. Status
3. Time period / current day
4. Core production performance
5. Financial summary
6. Important alert
7. View action
```

Do not display:

* individual days
* individual medicines
* individual expenses
* individual traders
* individual vehicles
* individual payments
* individual feed withdrawals

in the condensed card.

---

# 18. CYCLE CARD — EXTENDED DATA

The extended card can reveal additional summary data.

Recommended sections:

## Cycle Summary

```text
Cycle ID
Chick type
Status
Start date
End date
Duration
Initial chicks
```

## Production

```text
Current / Final Weight
FCR
Mortality %
Total deaths
Survival %
Total feed consumed
```

## Financial

```text
Total expenses
Total sales
Payments received
Outstanding amount
Net result
```

## Operational Summary

```text
Number of recorded days
Number of events
Number of feed withdrawals
Number of medicine withdrawals
Number of sales
Number of traders
Number of vehicles
```

Only show these operational counts if they provide useful context.

Do not make the extended card feel like a database dump.

---

# 19. CYCLE ALERTS

Alerts must be data-driven.

Potential alert categories:

## Financial

```text
Outstanding payment
Unpaid supplier invoice
Incomplete payment record
```

## Data completeness

```text
Missing daily follow-up
Missing weight data
Missing required cycle information
```

## Operational

```text
No recent daily record
No recent feed record
No recent medicine record
```

For historical completed cycles, "no recent record" should NOT automatically be treated as an error because the cycle is intentionally finished.

Only apply operational alerts appropriate to the cycle's status.

---

# 20. ALERT PRIORITY

Use:

```text
Critical
Warning
Information
```

Examples:

```text
Critical:
Payment/data issue requiring immediate attention

Warning:
Outstanding amount

Information:
Some records are incomplete
```

The card should expose only the most important 1–2 alerts.

If more exist:

```text
+ 3 more issues
```

The user can inspect the complete list inside the cycle.

---

# 21. HISTORICAL CYCLE CARD

Historical cycles should communicate clearly that they are completed.

Example information hierarchy:

```text
Cycle #11
Sasso
✓ Completed

Aug 02 → Aug 28
28 days

Final Weight
1.82 kg

FCR
1.61

Mortality
3.2%

Sales
485,000 EGP

Expenses
397,000 EGP

⚠ 12,500 EGP outstanding
```

The card must NOT look like the user is expected to continue daily operations on it.

---

# 22. ACTIVE CYCLE CARD

For the active cycle:

```text
Cycle #15
Sasso
● Active

Day 23
Started Sep 02

Current Weight
1.42 kg

FCR
1.61

Mortality
2.1%

Feed
18.7 ton

Expenses
397,000 EGP

Sales
485,000 EGP
```

The terminology must communicate that these are current-to-date values.

---

# 23. GLOBAL ANALYTICS — PURPOSE

The Global Analytics page is NOT a detailed cycle page.

Its purpose is to answer:

```text
How is the farm performing across cycles?
```

It should allow the user to identify:

* production trends
* efficiency trends
* mortality trends
* weight trends
* feed trends
* cost trends
* sales trends
* financial trends

without opening individual cycles.

---

# 24. GLOBAL ANALYTICS — FILTERS

Analytics should support:

```text
Cycle range
Poultry type
Date range
Number of cycles
```

Example:

```text
Cycles:
All / Last 5 / Last 10 / Custom

Poultry type:
All / Sasso / White / ...

Date:
All time / Custom range
```

Default to a reasonable recent selection if the farm contains many cycles.

---

# 25. GLOBAL ANALYTICS — TOP KPIs

The top of the Analytics page should contain high-level KPIs.

Recommended:

```text
Total Cycles
Completed Cycles
Average FCR
Average Mortality
Average Final Weight
Average Cycle Duration
Average Feed Consumption
Average Cost / Bird
Average Sales / Bird
Average Cycle Result
```

Not every KPI must be displayed simultaneously.

Prioritize the most meaningful values.

For example:

```text
Average FCR
Average Mortality
Average Final Weight
Average Cycle Result
```

can be the primary four.

Secondary KPIs can appear below.

---

# 26. ANALYTICS — FCR TREND

Use a LINE CHART.

Data:

```text
Cycle
FCR
```

X-axis:

```text
Cycle number or completion date
```

Y-axis:

```text
FCR
```

Each point should represent one cycle.

Tooltip:

```text
Cycle #13
Sasso
FCR: 1.61
Final weight: 1.82 kg
Mortality: 3.2%
```

The chart must allow the user to identify changes across cycles.

---

# 27. ANALYTICS — MORTALITY TREND

Use a LINE CHART.

Data:

```text
Cycle
Mortality %
```

Tooltip:

```text
Cycle #13
Initial chicks: 10,000
Deaths: 320
Mortality: 3.2%
```

This should communicate trend, not merely totals.

---

# 28. ANALYTICS — FINAL WEIGHT COMPARISON

Use a COLUMN / BAR CHART.

Data:

```text
Cycle
Final Weight
```

Example:

```text
Cycle #10
Cycle #11
Cycle #12
Cycle #13
```

Tooltip:

```text
Cycle #13
Final weight: 1.82 kg
```

This is a comparison chart rather than a trend chart.

---

# 29. ANALYTICS — WEIGHT DEVELOPMENT

This is different from final-weight comparison.

When the user drills into a selected cycle or comparison mode, show:

```text
Day
Average weight
```

using a LINE CHART.

This allows the user to understand how weight developed during a cycle.

The global dashboard should not display growth curves for dozens of cycles simultaneously because that would become visually noisy.

---

# 30. ANALYTICS — FEED CONSUMPTION

Use a COLUMN CHART for cycle comparison.

Data:

```text
Cycle
Total feed consumed
```

Optional secondary metric:

```text
Feed per bird
```

if the calculation is valid.

Tooltip:

```text
Cycle #13
Feed consumed: 18.7 ton
Initial birds: 10,000
```

---

# 31. ANALYTICS — FEED COST

Use a COLUMN CHART.

Data:

```text
Cycle
Total feed cost
```

This should allow comparison of feed expenditure between cycles.

---

# 32. ANALYTICS — TOTAL EXPENSES

Use a COLUMN CHART.

Data:

```text
Cycle
Total expenses
```

Tooltip should show:

```text
Cycle
Total expenses
```

and optionally:

```text
Cost / bird
```

if valid.

---

# 33. ANALYTICS — SALES

Use a COLUMN CHART.

Data:

```text
Cycle
Total sales
```

Optional contextual information:

```text
Total weight sold
Average execution price
```

---

# 34. ANALYTICS — NET RESULT

Use a COLUMN CHART.

Data:

```text
Cycle
Net result
```

Only include completed cycles unless the UI explicitly labels active-cycle data as current-to-date.

Do not call an unfinished cycle's current balance a final net result.

---

# 35. ANALYTICS — EXPENSE COMPOSITION

A DONUT chart may be used when a single cycle is selected.

Example:

```text
Cycle #13 Expense Composition

Feed
Medicine
Daily Expenses
Other
```

This chart answers:

```text
Where did the money go?
```

It should NOT be used for comparing different cycles.

---

# 36. ANALYTICS — SALES COMPOSITION

If useful, a selected-cycle visualization may show:

```text
Sales by trader
```

However, do not use a pie chart if there are many traders.

Use a horizontal BAR CHART for multiple traders.

Data:

```text
Trader
Sales amount
```

---

# 37. ANALYTICS — FINANCIAL OVERVIEW

Provide a combined factual summary:

```text
Total Sales
Total Expenses
Payments Received
Outstanding
Net Result
```

These can be represented through KPI cards and charts.

Avoid visually merging unrelated financial concepts into one confusing visualization.

---

# 38. ANALYTICS — CYCLE COMPARISON TABLE

A detailed table should be available beneath the visual analytics.

Columns:

```text
Cycle
Status
Type
Start
End
Duration
Initial Chicks
Final Weight
FCR
Mortality
Feed
Expenses
Sales
Paid
Outstanding
Net Result
```

The table should support sorting.

Useful sorting options:

```text
Newest
Oldest
FCR
Mortality
Final Weight
Expenses
Sales
Outstanding
Net Result
```

Do not assign subjective labels such as:

```text
Best
Worst
Excellent
Poor
```

unless explicit business rules define these states.

---

# 39. ANALYTICS — CLICKABLE DATA

Analytics should act as a gateway into actual cycle data.

Clicking a cycle data point should allow:

```text
View Cycle #13
```

which navigates to:

```text
/cycles/13
```

If cycle 13 is the active cycle, the router should resolve it to:

```text
/current-cycle
```

as defined by the main application logic.

---

# 40. ANALYTICS — DATA VALIDITY

The analytics page must handle:

### No cycles

```text
No cycle data available yet.
```

### One completed cycle

Show summary metrics but explain that historical comparison is limited.

### Multiple completed cycles

Enable historical comparisons and trends.

### Missing metrics

Show:

```text
Not enough data
```

instead of zero.

---

# 41. ANALYTICS — ACTIVE CYCLE

The active cycle can appear in current-status KPIs but should be clearly distinguished from completed historical cycles.

For example:

```text
Current Cycle
#15
Current FCR: 1.61
```

while historical trend charts may default to completed cycles only.

Do not silently mix incomplete current-cycle data with completed-cycle final results.

---

# 42. ANALYTICS — TIME SERIES

When plotting cycles over time, prefer:

```text
Completion date
```

or:

```text
Cycle number
```

depending on the analytical question.

For chronological trend analysis, completion date is often more meaningful.

For farm-specific cycle comparison, cycle number is easier to read.

The UI can expose a toggle if useful.

---

# 43. ANALYTICS — RESPONSIVE DATA

Desktop:

* KPI grid
* two-column charts
* full-width comparison charts
* detailed table

Tablet:

* two-column or single-column charts depending on width

Mobile:

* one chart per section
* horizontally scrollable tables
* compact KPI grid
* filters in a collapsible filter panel

Do not sacrifice readability to keep a desktop dashboard layout on mobile.

---

# 44. DATA PRESENTATION RULE

The application should follow this hierarchy:

```text
Cycle Card
    ↓
Summary

Extended Card
    ↓
More Context

Cycle Overview
    ↓
Complete Cycle Summary

Cycle Sections
    ↓
Detailed Domain Data

Specific Records
    ↓
Day / Event / Sale / Vehicle / Payment
```

The user should never need to see the entire database at once.

---

# 45. SUMMARY OF CARD DATA

## Condensed

```text
Cycle ID
Chick type
Status
Start / End
Duration / Current day
Initial chicks

Current / Final weight
FCR
Mortality

Total expenses
Total sales

Outstanding amount / important alert
```

## Extended

Everything above plus:

```text
Total deaths
Survival
Total feed
Feed cost
Medicine cost
Payment received
Net result
Recorded days
Events count
Sales count
Trader count
Vehicle count
Relevant alerts
```

---

# 46. SUMMARY OF GLOBAL ANALYTICS

Primary:

```text
Average FCR
Average Mortality
Average Final Weight
Average Cycle Result
```

Secondary:

```text
Total Cycles
Completed Cycles
Average Duration
Average Feed
Average Cost / Bird
Average Sales / Bird
```

Charts:

```text
FCR Trend              → LINE
Mortality Trend        → LINE
Final Weight           → BAR
Feed Consumption       → BAR
Feed Cost              → BAR
Expenses               → BAR
Sales                  → BAR
Net Result             → BAR
Selected Cycle Costs   → DONUT
```

Detailed table:

```text
Cycle
Status
Type
Dates
Duration
Initial Chicks
Final Weight
FCR
Mortality
Feed
Expenses
Sales
Paid
Outstanding
Net Result
```

---

# 47. FINAL DATA PRINCIPLE

Every metric shown in Dawagen should answer one of these questions:

```text
What happened?
How much happened?
When did it happen?
Which cycle did it happen in?
How much did it cost?
How much was sold?
How much was paid?
How much remains?
How did cycles change over time?
```

If a metric does not help answer one of these questions, it should not automatically be added to the dashboard.

The interface should prioritize **clarity, accuracy, traceability, and actionable information** over maximum data density.
