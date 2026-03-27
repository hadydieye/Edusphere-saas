# Tasks — Super Admin Module

## Task List

- [-] 1. Supabase setup & database schema
  - [ ] 1.1 Create `schools`, `school_admins`, and `audit_logs` tables with the SQL schema defined in the design document
  - [ ] 1.2 Add `updated_at` trigger function `set_updated_at` and attach it to `schools` and `school_admins`
  - [ ] 1.3 Write RLS policies: school_admin isolation on `schools` and `school_admins`, no-access policy on `audit_logs`
  - [ ] 1.4 Configure Supabase custom claim: add `superadmin: true` to `app_metadata` for the super admin user via a Supabase Auth hook or SQL function

- [ ] 2. Next.js middleware & route protection
  - [ ] 2.1 Create `middleware.ts` at the project root implementing the JWT claim check for all `/super-admin/*` routes
  - [ ] 2.2 Write property-based tests for middleware routing correctness (Property 1) using fast-check
  - [ ] 2.3 Write unit test for JWT refresh failure redirect (Requirement 1.6)

- [ ] 3. Authentication — login page
  - [ ] 3.1 Create `/super-admin/login` page with email/password form using `Input` and `Button` primitives
  - [ ] 3.2 Implement `signInWithPassword` call and `superadmin` claim verification; redirect to dashboard on success
  - [ ] 3.3 Write property-based test for generic error message on failed login (Property 2)

- [ ] 4. Design system & shared UI primitives
  - [ ] 4.1 Define CSS custom properties (`--color-bg`, `--color-surface`, `--color-border`, `--color-primary`, `--color-accent`, `--color-success`, `--color-warning`, `--color-danger`, `--color-text`, `--color-muted`) in `globals.css`
  - [ ] 4.2 Load Syne, DM Sans, and JetBrains Mono fonts via `next/font/google` in the root layout
  - [ ] 4.3 Implement `Button`, `Input`, `Badge`, `Modal`, and `Toast` UI primitives using Tailwind and design tokens

- [ ] 5. Super Admin layout & Sidebar
  - [ ] 5.1 Create `/super-admin/layout.tsx` with the fixed `Sidebar` component and a main content area
  - [ ] 5.2 Implement `Sidebar` with navigation links (Dashboard, Schools, Audit Log) and responsive collapse below 768px

- [ ] 6. Dashboard page
  - [ ] 6.1 Implement `computeDashboardStats` utility function (total, active, suspended schools; total admins)
  - [ ] 6.2 Write property-based test for dashboard stats accuracy (Property 6)
  - [ ] 6.3 Implement `buildRegistrationChart` utility for 30-day school registration time series
  - [ ] 6.4 Write property-based test for registration chart data correctness (Property 7)
  - [ ] 6.5 Implement `getRecentItems` utility returning the N most recent items by timestamp
  - [ ] 6.6 Write property-based test for recent items ordering (Property 8)
  - [ ] 6.7 Create `useDashboardStats` TanStack Query hook with 30-second refetch interval
  - [ ] 6.8 Build `/super-admin/dashboard` page composing `StatsCard` grid, Recharts chart, recent schools list, and recent audit entries

- [ ] 7. Schools list page
  - [ ] 7.1 Implement `paginateSchools` utility (25 rows/page, ordered by `created_at` desc)
  - [ ] 7.2 Write property-based test for pagination correctness (Property 9)
  - [ ] 7.3 Implement `filterSchoolsBySearch` utility (name or code, case-insensitive)
  - [ ] 7.4 Write property-based test for search filter correctness (Property 10)
  - [ ] 7.5 Implement `filterSchoolsByStatus` utility
  - [ ] 7.6 Write property-based test for status filter correctness (Property 11)
  - [ ] 7.7 Create `useSchools` TanStack Query hook accepting `{ page, search, status }` params
  - [ ] 7.8 Build `SchoolsTable` component with debounced search (300ms), status filter, pagination controls, and quick action buttons
  - [ ] 7.9 Build `/super-admin/schools` page
  - [ ] 7.10 Write unit test for quick action buttons rendering per school status (Requirement 5.5)

- [ ] 8. Zod schemas & validation
  - [ ] 8.1 Implement `CreateSchoolSchema` and `UpdateSchoolSchema` Zod schemas as defined in the design document
  - [ ] 8.2 Write property-based test for Zod validation accepting valid and rejecting invalid inputs (Property 12)

- [ ] 9. Audit logger
  - [ ] 9.1 Implement `logAudit` function writing to `audit_logs` using the Supabase admin client
  - [ ] 9.2 Write property-based test for audit logging completeness (Property 14)
  - [ ] 9.3 Write unit test for `logAudit` failure — originating action still completes (Requirement 9.6)

- [ ] 10. Create school feature
  - [ ] 10.1 Implement `createSchool` Server Action: validate with Zod, insert `schools` row, create Supabase Auth user, insert `school_admins` row, call `logAudit` for both events, rollback on auth failure
  - [ ] 10.2 Write property-based test for school creation atomicity (Property 13)
  - [ ] 10.3 Write unit test for rollback when auth user creation fails (Requirement 6.6)
  - [ ] 10.4 Build `CreateSchoolForm` component with field-level Zod error display
  - [ ] 10.5 Build `/super-admin/schools/new` page

- [ ] 11. School detail & edit feature
  - [ ] 11.1 Create `useSchool(id)` TanStack Query hook
  - [ ] 11.2 Implement `updateSchool` Server Action: validate with Zod, update `schools` row, call `logAudit` with changed fields
  - [ ] 11.3 Write property-based test for audit logging on school update (covered by Property 14 — verify `school.updated` event contains changed fields)
  - [ ] 11.4 Build `/super-admin/schools/[id]` page displaying all school fields and the edit form
  - [ ] 11.5 Write unit test for 404 when school_id does not exist (Requirement 7.4)

- [ ] 12. Suspend & reactivate feature
  - [ ] 12.1 Implement `suspendSchool` Server Action: update status to `suspended`, disable Supabase Auth user, call `logAudit`
  - [ ] 12.2 Implement `reactivateSchool` Server Action: update status to `active`, re-enable Supabase Auth user, call `logAudit`
  - [ ] 12.3 Write property-based test for suspend/reactivate round trip (Property 15)
  - [ ] 12.4 Build `SuspendModal` confirmation dialog component
  - [ ] 12.5 Write unit test for modal cancel — no status change (Requirement 8.5)

- [ ] 13. Audit log page
  - [ ] 13.1 Implement `fetchAuditLogs` query with action type and date range filter support
  - [ ] 13.2 Write property-based test for audit log ordering (Property 16)
  - [ ] 13.3 Write property-based test for audit log filter correctness (Property 17)
  - [ ] 13.4 Implement `generateAuditCsv` function
  - [ ] 13.5 Write property-based test for CSV export completeness (Property 18)
  - [ ] 13.6 Create `useAuditLogs` TanStack Query hook
  - [ ] 13.7 Build `AuditLogTable` component with action filter, date range filter, and Export CSV button
  - [ ] 13.8 Build `/super-admin/audit-log` page
