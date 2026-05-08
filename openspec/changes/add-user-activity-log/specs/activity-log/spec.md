## ADDED Requirements

### Requirement: Admin-only access
The Activity Log page (`/activity-log`) SHALL only be accessible to users with `role === "admin"`. Non-admin users SHALL be redirected to `/dashboard`.

#### Scenario: Admin can access activity log page
- **WHEN** a user with role `admin` navigates to `/activity-log`
- **THEN** the activity log list SHALL be rendered

#### Scenario: Non-admin redirected
- **WHEN** a user with role `user` navigates to `/activity-log`
- **THEN** the system SHALL redirect them to `/dashboard`

### Requirement: Activity log list view
The system SHALL display a table of activity logs with columns: Time, User, Action, Resource Type, and Resource.

#### Scenario: List loads successfully
- **WHEN** an admin navigates to `/activity-log`
- **THEN** a table SHALL display all activity logs from `GET /api/activity-logs`
- **THEN** logs SHALL be sorted by timestamp descending (most recent first)

#### Scenario: Search filters logs
- **WHEN** the admin types in the search input
- **THEN** the table SHALL filter rows to show only logs whose userName, resourceLabel, action, or resource contains the search string (case-insensitive)

### Requirement: Activity log data model
Each activity log record SHALL contain: `id` (string), `userId` (string), `userName` (string), `action` ("create" | "update" | "delete"), `resource` ("vehicle" | "employee"), `resourceId` (string), `resourceLabel` (string), `timestamp` (ISO 8601 string).

#### Scenario: Mock API returns correct shape
- **WHEN** `GET /api/activity-logs` is called
- **THEN** each item in the response SHALL conform to the activity log data model
- **THEN** the response SHALL have shape `{ data: ActivityLog[], total: number }`

### Requirement: Activity log API supports filtering and pagination
The `GET /api/activity-logs` endpoint SHALL accept optional query parameters for filtering and pagination.

#### Scenario: Keyword search via query param
- **WHEN** `GET /api/activity-logs?q=<keyword>` is called
- **THEN** only logs matching the keyword (in userName, resourceLabel, action, or resource) SHALL be returned

#### Scenario: Pagination
- **WHEN** `GET /api/activity-logs?page=2&pageSize=10` is called
- **THEN** the response SHALL return the correct slice of results with accurate `total`

### Requirement: Automatic activity log capture
The system SHALL automatically record an activity log entry whenever a vehicle or employee record is created, updated, or deleted.

#### Scenario: Vehicle created
- **WHEN** `POST /api/vehicles` succeeds
- **THEN** an activity log entry SHALL be written with `action: "create"`, `resource: "vehicle"`, and `resourceLabel` set to the vehicle's license plate

#### Scenario: Vehicle updated
- **WHEN** `PUT /api/vehicles/:id` succeeds
- **THEN** an activity log entry SHALL be written with `action: "update"`, `resource: "vehicle"`

#### Scenario: Vehicle deleted
- **WHEN** `DELETE /api/vehicles/:id` succeeds
- **THEN** an activity log entry SHALL be written with `action: "delete"`, `resource: "vehicle"`

#### Scenario: Employee created
- **WHEN** `POST /api/employees` succeeds
- **THEN** an activity log entry SHALL be written with `action: "create"`, `resource: "employee"`, and `resourceLabel` set to the employee's name

#### Scenario: Employee updated
- **WHEN** `PUT /api/employees/:id` succeeds
- **THEN** an activity log entry SHALL be written with `action: "update"`, `resource: "employee"`

#### Scenario: Employee deleted
- **WHEN** `DELETE /api/employees/:id` succeeds
- **THEN** an activity log entry SHALL be written with `action: "delete"`, `resource: "employee"`
