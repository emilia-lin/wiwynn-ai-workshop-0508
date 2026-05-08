## ADDED Requirements

### Requirement: Vehicle list view
The system SHALL display a paginated or scrollable table of vehicles with columns: License Plate, Model, Brand, Year, Status, and Actions.

#### Scenario: List loads successfully
- **WHEN** an authenticated user navigates to `/vehicles`
- **THEN** a table SHALL display all vehicles from the mock API (`GET /api/vehicles`)

#### Scenario: Search filters vehicles
- **WHEN** the user types in the search input
- **THEN** the table SHALL filter rows to show only vehicles whose license plate or model contains the search string (case-insensitive)

### Requirement: Add vehicle
The system SHALL allow any authenticated user to open an "Add Vehicle" dialog and submit a form to create a new vehicle.

#### Scenario: Successful vehicle creation
- **WHEN** the user fills in all required fields (License Plate, Model, Brand, Year, Status) and submits
- **THEN** the system SHALL call `POST /api/vehicles` with the form data
- **THEN** the new vehicle SHALL appear in the table without a full page reload

#### Scenario: Validation on empty required fields
- **WHEN** the user submits the form with any required field empty
- **THEN** the form SHALL display inline validation errors and NOT call the API

### Requirement: Edit vehicle
The system SHALL allow any authenticated user to edit an existing vehicle's data via an edit dialog pre-filled with current values.

#### Scenario: Successful vehicle update
- **WHEN** the user modifies fields and submits the edit form
- **THEN** the system SHALL call `PUT /api/vehicles/:id`
- **THEN** the updated values SHALL be reflected in the table

### Requirement: Delete vehicle
The system SHALL allow any authenticated user to delete a vehicle after confirming the action.

#### Scenario: Successful vehicle deletion
- **WHEN** the user clicks "Delete" and confirms in the confirmation dialog
- **THEN** the system SHALL call `DELETE /api/vehicles/:id`
- **THEN** the vehicle SHALL be removed from the table

#### Scenario: Delete cancelled
- **WHEN** the user clicks "Delete" but then cancels the confirmation
- **THEN** the vehicle SHALL remain in the table and no API call SHALL be made

### Requirement: Vehicle data model
Each vehicle record SHALL contain: `id` (string), `licensePlate` (string), `brand` (string), `model` (string), `year` (number), `status` (enum: `"available"` | `"in-use"` | `"maintenance"`).

#### Scenario: Mock API returns correct shape
- **WHEN** `GET /api/vehicles` is called
- **THEN** each item in the response array SHALL conform to the vehicle data model
