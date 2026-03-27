# Requirements Document

## Introduction

Le Super Admin Module est le module central d'administration d'Edusphère, un SaaS multi-tenant de gestion scolaire ciblant les écoles guinéennes. Ce module permet au Super Administrateur d'onboarder les écoles (tenants), de gérer leurs statuts, de superviser les administrateurs scolaires, et de tracer toutes les actions dans un journal d'audit. Sans ce module, aucun tenant ne peut exister dans le système.

Stack technique : Next.js 14 App Router · Supabase (Auth + PostgreSQL + RLS) · Tailwind CSS · TanStack Query · TypeScript.

## Glossary

- **Super_Admin**: Utilisateur unique disposant du rôle `superadmin` injecté dans le JWT via les custom claims Supabase. Seul acteur capable d'onboarder des écoles.
- **School**: Tenant représentant une école guinéenne, stocké dans la table `schools`.
- **School_Admin**: Utilisateur Supabase Auth associé à une école, stocké dans la table `school_admins`.
- **Audit_Log**: Enregistrement immuable d'une action effectuée par le Super_Admin, stocké dans la table `audit_logs`.
- **Auth_System**: Système d'authentification Supabase gérant les sessions, les JWT et les custom claims.
- **Middleware**: Middleware Next.js protégeant les routes `/super-admin/*`.
- **RLS**: Row Level Security — politiques Supabase garantissant l'isolation des données entre tenants.
- **Dashboard**: Page principale du Super_Admin affichant les métriques en temps réel.
- **Schools_Table**: Composant de liste paginée des écoles avec filtres et recherche.
- **Audit_Logger**: Fonction utilitaire `logAudit` enregistrant chaque action traçable dans `audit_logs`.
- **Validator**: Couche de validation Zod appliquée aux formulaires de création et modification d'école.

---

## Requirements

### Requirement 1: Authentification Super Admin

**User Story:** As a Super_Admin, I want to log in with my email and password, so that I can access the administration module securely.

#### Acceptance Criteria

1. WHEN the Super_Admin submits valid credentials, THE Auth_System SHALL verify the `superadmin` custom claim in the JWT and redirect to `/super-admin/dashboard`.
2. WHEN the Super_Admin submits invalid credentials, THE Auth_System SHALL display an error message within 3 seconds without revealing whether the email or password is incorrect.
3. WHEN the Super_Admin navigates to `/super-admin/login` while already authenticated with a valid `superadmin` JWT, THE Middleware SHALL redirect to `/super-admin/dashboard`.
4. WHEN a user without the `superadmin` custom claim attempts to access any `/super-admin/*` route, THE Middleware SHALL redirect to `/super-admin/login`.
5. WHILE a Super_Admin session is active, THE Auth_System SHALL auto-refresh the JWT before expiration to maintain a persistent session.
6. IF the JWT refresh fails, THEN THE Auth_System SHALL redirect the Super_Admin to `/super-admin/login` and clear the session.

---

### Requirement 2: Protection des routes

**User Story:** As a system operator, I want all Super Admin routes to be protected, so that unauthorized users cannot access sensitive administration pages.

#### Acceptance Criteria

1. THE Middleware SHALL intercept all requests to `/super-admin/*` routes before rendering.
2. WHEN a request to a `/super-admin/*` route is received without a valid `superadmin` JWT, THE Middleware SHALL return a redirect response to `/super-admin/login` within 50ms.
3. WHEN a valid `superadmin` JWT is present, THE Middleware SHALL allow the request to proceed to the requested route.
4. IF the `superadmin` custom claim is absent from an otherwise valid JWT, THEN THE Middleware SHALL redirect the request to `/super-admin/login`.

---

### Requirement 3: Base de données et isolation des tenants

**User Story:** As a system operator, I want the database schema to enforce tenant isolation, so that no school can access another school's data.

#### Acceptance Criteria

1. THE RLS SHALL enforce policies on the `schools` table so that a `school_admin` role can only read and write rows where `school_id` matches the value in their JWT claims.
2. THE RLS SHALL enforce policies on the `school_admins` table so that a `school_admin` role can only read rows associated with their own `school_id`.
3. THE RLS SHALL enforce policies on the `audit_logs` table so that a `school_admin` role cannot read or write any rows.
4. THE Super_Admin role SHALL bypass RLS policies and have full read and write access to all tables.
5. WHEN a row in `schools` or `school_admins` is updated, THE database trigger SHALL automatically set the `updated_at` column to the current UTC timestamp.
6. IF a `school_admin` attempts a query that violates RLS, THEN THE RLS SHALL return an empty result set or a permission denied error without exposing other tenants' data.

---

### Requirement 4: Dashboard Super Admin

**User Story:** As a Super_Admin, I want to see real-time metrics on the dashboard, so that I can monitor the overall state of the platform at a glance.

#### Acceptance Criteria

1. WHEN the Super_Admin loads `/super-admin/dashboard`, THE Dashboard SHALL display the total number of schools, the number of active schools, the number of suspended schools, and the total number of School_Admins.
2. WHEN the underlying data changes, THE Dashboard SHALL reflect updated metrics within 30 seconds without requiring a full page reload.
3. THE Dashboard SHALL display a line or bar chart (via Recharts) showing school registrations over the last 30 days.
4. THE Dashboard SHALL display the 5 most recently created schools with their name, status, and creation date.
5. THE Dashboard SHALL display the 5 most recent Audit_Log entries with their action, target, and timestamp.
6. WHILE the Super_Admin is on any `/super-admin/*` page, THE Sidebar SHALL remain fixed and visible, providing navigation links to Dashboard, Schools, and Audit Log.

---

### Requirement 5: Liste des écoles

**User Story:** As a Super_Admin, I want to browse a paginated and searchable list of schools, so that I can quickly find and manage any school.

#### Acceptance Criteria

1. WHEN the Super_Admin loads `/super-admin/schools`, THE Schools_Table SHALL display schools in pages of 25 rows, ordered by creation date descending.
2. WHEN the Super_Admin types in the search field, THE Schools_Table SHALL debounce the input by 300ms and then filter results by school name or code.
3. WHEN the Super_Admin selects a status filter (active, suspended, all), THE Schools_Table SHALL display only schools matching the selected status.
4. WHEN the Super_Admin clicks a school row, THE Schools_Table SHALL navigate to `/super-admin/schools/[school_id]`.
5. THE Schools_Table SHALL provide quick action buttons (view, edit, suspend/reactivate) for each row without requiring navigation.
6. WHEN the total number of schools exceeds 25, THE Schools_Table SHALL display pagination controls allowing navigation between pages.

---

### Requirement 6: Création d'une école

**User Story:** As a Super_Admin, I want to create a new school with its initial administrator, so that the school can immediately start using the platform.

#### Acceptance Criteria

1. WHEN the Super_Admin submits the creation form with valid data, THE Validator SHALL pass all Zod schema checks before any database write is performed.
2. IF the creation form contains invalid data (missing required fields, invalid email format, duplicate school code), THEN THE Validator SHALL display field-level error messages within 200ms of form submission attempt.
3. WHEN the form passes validation, THE system SHALL atomically create a `schools` row, a Supabase Auth user for the School_Admin, and a `school_admins` row in a single transaction or sequential operation with rollback on failure.
4. WHEN a school is successfully created, THE Audit_Logger SHALL record a `school.created` event and a `school_admin.created` event in `audit_logs` with the Super_Admin's ID, the school ID, and a UTC timestamp.
5. WHEN a school is successfully created, THE system SHALL redirect the Super_Admin to `/super-admin/schools/[school_id]` and display a success toast notification.
6. IF the Supabase Auth user creation fails during school creation, THEN THE system SHALL roll back the `schools` row insertion and display an error message to the Super_Admin.

---

### Requirement 7: Détail et modification d'une école

**User Story:** As a Super_Admin, I want to view and edit a school's details, so that I can keep school information up to date.

#### Acceptance Criteria

1. WHEN the Super_Admin loads `/super-admin/schools/[school_id]`, THE system SHALL display all school fields: name, code, address, status, creation date, and associated School_Admin information.
2. WHEN the Super_Admin submits the edit form with valid data, THE Validator SHALL validate all fields via Zod before writing to the database.
3. WHEN a school is successfully updated, THE Audit_Logger SHALL record a `school.updated` event in `audit_logs` with the changed fields, the Super_Admin's ID, and a UTC timestamp.
4. IF the `school_id` in the URL does not correspond to an existing school, THEN THE system SHALL display a 404 error page.

---

### Requirement 8: Suspension et réactivation d'une école

**User Story:** As a Super_Admin, I want to suspend or reactivate a school, so that I can control platform access for non-compliant or reactivated schools.

#### Acceptance Criteria

1. WHEN the Super_Admin clicks "Suspend" on a school with `active` status, THE system SHALL display a modal confirmation dialog before performing any action.
2. WHEN the Super_Admin confirms suspension in the modal, THE system SHALL update the school's `status` to `suspended` and disable the associated School_Admin's Supabase Auth account.
3. WHEN the Super_Admin confirms reactivation of a `suspended` school, THE system SHALL update the school's `status` to `active` and re-enable the associated School_Admin's Supabase Auth account.
4. WHEN a school status changes, THE Audit_Logger SHALL record a `school.suspended` or `school.activated` event in `audit_logs` with the Super_Admin's ID, the school ID, and a UTC timestamp.
5. WHEN the Super_Admin cancels the modal, THE system SHALL close the modal and make no changes to the school's status.
6. WHILE a school has `suspended` status, THE RLS SHALL prevent the associated School_Admin from authenticating or accessing any school data.

---

### Requirement 9: Journal d'audit

**User Story:** As a Super_Admin, I want to consult a complete and filterable audit log, so that I can trace all administrative actions on the platform.

#### Acceptance Criteria

1. WHEN the Super_Admin loads `/super-admin/audit-log`, THE Audit_Log_Table SHALL display all audit entries in reverse chronological order.
2. WHEN the Super_Admin applies a filter by action type (`school.created`, `school.suspended`, `school.activated`, `school.updated`, `school_admin.created`), THE Audit_Log_Table SHALL display only entries matching the selected action.
3. WHEN the Super_Admin applies a date range filter, THE Audit_Log_Table SHALL display only entries whose timestamp falls within the specified range.
4. WHEN the Super_Admin clicks "Export CSV", THE system SHALL generate and download a CSV file containing all currently filtered audit entries within 5 seconds.
5. THE Audit_Logger SHALL record every call to `logAudit` with at minimum: `action`, `actor_id` (Super_Admin ID), `target_id` (school or admin ID), `metadata` (JSON), and `created_at` (UTC timestamp).
6. IF the `logAudit` function call fails, THEN THE system SHALL log the error to the server console and NOT silently discard the audit event — the originating action SHALL still complete.

---

### Requirement 10: Responsive et accessibilité

**User Story:** As a Super_Admin, I want the module to work correctly on mobile devices, so that I can manage schools from any device.

#### Acceptance Criteria

1. THE Super_Admin Module SHALL render correctly on viewport widths from 375px to 1920px without horizontal overflow.
2. WHEN the viewport width is below 768px, THE Sidebar SHALL collapse to an icon-only or drawer mode to preserve content space.
3. THE Super_Admin Module SHALL use the design system color tokens (`--color-bg`, `--color-surface`, `--color-border`, `--color-primary`, `--color-accent`, `--color-success`, `--color-warning`, `--color-danger`, `--color-text`, `--color-muted`) consistently across all pages.
4. THE Super_Admin Module SHALL load the "Syne" font for display elements, "DM Sans" for body text, and "JetBrains Mono" for IDs and school codes via Google Fonts.
