## ADDED Requirements

### Requirement: Admin-only access
The Employees page (`/employees`) SHALL only be accessible to users with `role === "admin"`. Non-admin users SHALL be redirected to `/dashboard`.

#### Scenario: Admin can access employees page
- **WHEN** a user with role `admin` navigates to `/employees`
- **THEN** the employee list SHALL be rendered

#### Scenario: Non-admin redirected
- **WHEN** a user with role `user` navigates to `/employees`
- **THEN** the system SHALL redirect them to `/dashboard`

### Requirement: Employee list view
The system SHALL display a table of employees with columns: Name, Department, Role, Email, and Actions.

#### Scenario: List loads successfully
- **WHEN** an admin navigates to `/employees`
- **THEN** a table SHALL display all employees from `GET /api/employees`

#### Scenario: Search filters employees
- **WHEN** the admin types in the search input
- **THEN** the table SHALL filter rows to show only employees whose name or department contains the search string (case-insensitive)

### Requirement: Add employee
The system SHALL allow admin users to create a new employee via a dialog form.

#### Scenario: Successful employee creation
- **WHEN** the admin fills in all required fields (Name, Department, Role, Email) and submits
- **THEN** the system SHALL call `POST /api/employees`
- **THEN** the new employee SHALL appear in the table

#### Scenario: Validation on missing required fields
- **WHEN** the admin submits the form with any required field empty
- **THEN** inline validation errors SHALL be displayed and the API SHALL NOT be called

### Requirement: Edit employee
The system SHALL allow admin users to edit an employee record via an edit dialog.

#### Scenario: Successful employee update
- **WHEN** the admin modifies fields and submits
- **THEN** the system SHALL call `PUT /api/employees/:id`
- **THEN** the updated values SHALL appear in the table

### Requirement: Delete employee
The system SHALL allow admin users to delete an employee after confirmation.

#### Scenario: Successful employee deletion
- **WHEN** the admin confirms deletion
- **THEN** the system SHALL call `DELETE /api/employees/:id`
- **THEN** the employee SHALL be removed from the table

### Requirement: Employee data model
Each employee record SHALL contain: `id` (string), `name` (string), `department` (string), `role` (string), `email` (string).

#### Scenario: Mock API returns correct shape
- **WHEN** `GET /api/employees` is called
- **THEN** each item SHALL conform to the employee data model
