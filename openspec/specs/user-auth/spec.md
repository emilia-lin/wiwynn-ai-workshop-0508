# User Auth

## Purpose

Handles user authentication, session management, route protection, and role-based access control for the vehicle management system.

## Requirements

### Requirement: Login with credentials
The system SHALL authenticate users via username and password. On success, the system SHALL return a user object containing `id`, `name`, `role` (`admin` | `user`), and a mock token. On failure (invalid credentials), the system SHALL return HTTP 401 with an error message.

#### Scenario: Successful admin login
- **WHEN** user submits username `admin` and password `admin123`
- **THEN** system returns HTTP 200 with `{ token, name: "Admin User", role: "admin" }`
- **THEN** user is redirected to the dashboard

#### Scenario: Successful regular user login
- **WHEN** user submits username `user1` and password `user123`
- **THEN** system returns HTTP 200 with `{ token, name: "Alice", role: "user" }`
- **THEN** user is redirected to the dashboard

#### Scenario: Invalid credentials
- **WHEN** user submits an unrecognised username or wrong password
- **THEN** system returns HTTP 401
- **THEN** login page displays an inline error message "帳號或密碼錯誤"

### Requirement: Protected routes
The system SHALL redirect unauthenticated users to the login page when they attempt to access any protected route (`/dashboard`, `/vehicles`, `/employees`).

#### Scenario: Unauthenticated access
- **WHEN** an unauthenticated user navigates to `/dashboard`
- **THEN** the system SHALL redirect them to `/login`

#### Scenario: Authenticated access
- **WHEN** an authenticated user navigates to `/dashboard`
- **THEN** the system SHALL render the dashboard page

### Requirement: Role-based access control
The system SHALL restrict the Employees page to users with `role === "admin"`. A regular user attempting to access `/employees` SHALL be redirected to `/dashboard`.

#### Scenario: Admin accesses employees page
- **WHEN** a user with role `admin` navigates to `/employees`
- **THEN** the system SHALL render the employees management page

#### Scenario: Regular user blocked from employees page
- **WHEN** a user with role `user` navigates to `/employees`
- **THEN** the system SHALL redirect them to `/dashboard`

### Requirement: Logout
The system SHALL provide a logout action that clears the stored auth token and redirects the user to the login page.

#### Scenario: User logs out
- **WHEN** user clicks the logout button
- **THEN** localStorage auth data is cleared
- **THEN** user is redirected to `/login`
