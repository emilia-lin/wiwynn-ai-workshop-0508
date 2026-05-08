# Dashboard

## Purpose

Provides the main dashboard view including KPI summary cards, vehicle status visualisation, and persistent sidebar navigation for the vehicle management system.

## Requirements

### Requirement: KPI summary cards
The dashboard SHALL display at least four KPI cards at the top of the page summarising vehicle fleet status: Total Vehicles, In Use, Under Maintenance, and Available.

#### Scenario: Dashboard loads KPI data
- **WHEN** an authenticated user visits `/dashboard`
- **THEN** four KPI cards SHALL be visible, each showing a label and a numeric value derived from the vehicle dataset

#### Scenario: KPI values reflect current data
- **WHEN** a vehicle's status changes (via vehicle management)
- **THEN** the KPI counts on the dashboard SHALL reflect the updated counts on next load

### Requirement: Vehicle status chart
The dashboard SHALL display a chart (BarChart or PieChart) visualising the distribution of vehicle statuses (Available / In Use / Under Maintenance).

#### Scenario: Chart renders on load
- **WHEN** the dashboard page finishes loading vehicle data
- **THEN** a chart SHALL be visible showing each status category with its count

#### Scenario: Chart uses Recharts library
- **WHEN** the dashboard renders the chart
- **THEN** the chart SHALL be built with Recharts components (`BarChart` + `Bar` or `PieChart` + `Pie`)

### Requirement: Sidebar navigation
The layout SHALL include a persistent left sidebar with navigation links to Dashboard, Vehicles, and (for admin only) Employees.

#### Scenario: Admin sees all nav items
- **WHEN** a user with role `admin` is logged in
- **THEN** the sidebar SHALL show links for Dashboard, Vehicles, and Employees

#### Scenario: Regular user sees restricted nav
- **WHEN** a user with role `user` is logged in
- **THEN** the sidebar SHALL show links for Dashboard and Vehicles only (no Employees link)
