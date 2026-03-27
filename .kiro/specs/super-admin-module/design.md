# Design Document — Super Admin Module

## Overview

The Super Admin Module is the central administration layer of Edusphère, a multi-tenant SaaS for Guinean schools. It provides a single Super Admin with the ability to onboard schools (tenants), manage their lifecycle (active/suspended), supervise school administrators, and maintain a complete immutable audit trail of every administrative action.

The module is built on **Next.js 14 App Router**, **Supabase** (Auth + PostgreSQL + RLS), **Tailwind CSS**, **TanStack Query v5**, and **TypeScript**. All pages live under the `/super-admin/*` route segment, protected by a Next.js Edge Middleware that validates the `superadmin` custom claim in the Supabase JWT.

### Key Design Decisions

- **Custom JWT claim** (`superadmin: true`) is the single source of truth for super-admin identity — no separate role table is needed.
- **Supabase RLS** enforces tenant isolation at the database layer, making it impossible for school admins to read other tenants' data even if application-level checks are bypassed.
- **Server Actions + TanStack Query** are used together: mutations go through Next.js Server Actions (keeping secrets server-side), reads are cached and invalidated via TanStack Query.
- **Atomic school creation** is implemented as a sequential Server Action with compensating rollback (delete the `schools` row if the Supabase Auth user creation fails).
- **Audit logging** is fire-and-log: the originating action always completes; a `logAudit` failure is written to the server console but does not block the user.

---

## Architecture

```mermaid
graph TD
    Browser -->|HTTPS| NextJS[Next.js 14 App Router]
    NextJS -->|Edge Middleware| Auth{superadmin JWT?}
    Auth -->|No| LoginPage[/super-admin/login]
    Auth -->|Yes| SuperAdminPages[/super-admin/* pages]

    SuperAdminPages --> ServerActions[Server Actions]
    SuperAdminPages --> TanStackQuery[TanStack Query hooks]

    ServerActions --> SupabaseAdmin[Supabase Admin Client\n(service_role key)]
    TanStackQuery --> SupabaseClient[Supabase Browser Client]

    SupabaseAdmin --> PostgreSQL[(PostgreSQL\nschools · school_admins · audit_logs)]
    SupabaseClient --> PostgreSQL

    SupabaseAdmin --> SupabaseAuth[Supabase Auth\n(create/disable users)]
```

### Route Map

| Route | Purpose |
|---|---|
| `/super-admin/login` | Authentication page |
| `/super-admin/dashboard` | Metrics, charts, recent activity |
| `/super-admin/schools` | Paginated school list |
| `/super-admin/schools/new` | Create school form |
| `/super-admin/schools/[id]` | School detail + edit + suspend |
| `/super-admin/audit-log` | Filterable audit log + CSV export |

---

## Components and Interfaces

### Page Components

| Component | Route | Responsibility |
|---|---|---|
| `LoginPage` | `/super-admin/login` | Email/password form, calls Supabase `signInWithPassword`, reads JWT claim |
| `DashboardPage` | `/super-admin/dashboard` | Renders `StatsCard` grid, Recharts chart, recent schools/audit entries |
| `SchoolsPage` | `/super-admin/schools` | Renders `SchoolsTable` with search/filter/pagination |
| `NewSchoolPage` | `/super-admin/schools/new` | Renders `CreateSchoolForm` |
| `SchoolDetailPage` | `/super-admin/schools/[id]` | School info, edit form, `SuspendModal` trigger |
| `AuditLogPage` | `/super-admin/audit-log` | Renders `AuditLogTable` with filters and CSV export |

### Shared UI Components

| Component | Props | Notes |
|---|---|---|
| `Sidebar` | `collapsed: boolean` | Fixed nav; collapses to icon-only below 768 px |
| `StatsCard` | `label, value, icon, trend?` | Displays a single metric tile |
| `SchoolsTable` | `schools, pagination, onSearch, onFilter` | Paginated, debounced search |
| `SchoolStatusBadge` | `status: 'active' \| 'suspended'` | Color-coded badge using design tokens |
| `CreateSchoolForm` | `onSuccess` | Zod-validated, calls `createSchool` Server Action |
| `SuspendModal` | `school, action, onConfirm, onCancel` | Confirmation dialog for suspend/reactivate |
| `AuditLogTable` | `entries, filters, onFilter, onExport` | Filterable table with CSV export |

### UI Primitives

`Button`, `Input`, `Badge`, `Modal`, `Toast` — thin wrappers over Tailwind classes using design-system CSS custom properties.

### TanStack Query Hooks

```typescript
// Read hooks (browser client)
useSchools(params: { page, search, status })   // GET /api/schools or direct Supabase query
useSchool(id: string)                           // single school
useAuditLogs(params: { action?, from?, to? })  // audit log entries
useDashboardStats()                             // aggregated metrics

// Mutation hooks (wrap Server Actions)
useCreateSchool()
useUpdateSchool()
useSuspendSchool()
useReactivateSchool()
```

### Server Actions

```typescript
createSchool(data: CreateSchoolInput): Promise<{ school: School }>
updateSchool(id: string, data: UpdateSchoolInput): Promise<{ school: School }>
suspendSchool(id: string): Promise<void>
reactivateSchool(id: string): Promise<void>
```

### Audit Logger

```typescript
async function logAudit(params: {
  action: AuditAction;
  actor_id: string;
  target_id: string;
  metadata?: Record<string, unknown>;
}): Promise<void>

type AuditAction =
  | 'school.created'
  | 'school.updated'
  | 'school.suspended'
  | 'school.activated'
  | 'school_admin.created';
```

---

## Data Models

### `schools` table

```sql
CREATE TABLE schools (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  code        text NOT NULL UNIQUE,
  address     text,
  status      text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
```

### `school_admins` table

```sql
CREATE TABLE school_admins (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id   uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
```

### `audit_logs` table

```sql
CREATE TABLE audit_logs (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action      text NOT NULL,
  actor_id    uuid NOT NULL,
  target_id   uuid NOT NULL,
  metadata    jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
  -- no updated_at: audit logs are immutable
);
```

### TypeScript Types

```typescript
type SchoolStatus = 'active' | 'suspended';

interface School {
  id: string;
  name: string;
  code: string;
  address: string | null;
  status: SchoolStatus;
  created_at: string;
  updated_at: string;
}

interface SchoolAdmin {
  id: string;
  school_id: string;
  user_id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface AuditLog {
  id: string;
  action: AuditAction;
  actor_id: string;
  target_id: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}
```

### Zod Schemas

```typescript
const CreateSchoolSchema = z.object({
  name:          z.string().min(2).max(100),
  code:          z.string().min(2).max(20).regex(/^[A-Z0-9_-]+$/),
  address:       z.string().max(255).optional(),
  adminEmail:    z.string().email(),
  adminPassword: z.string().min(8),
});

const UpdateSchoolSchema = z.object({
  name:    z.string().min(2).max(100).optional(),
  code:    z.string().min(2).max(20).regex(/^[A-Z0-9_-]+$/).optional(),
  address: z.string().max(255).optional(),
});
```

### RLS Policies

```sql
-- schools: school_admin can only see their own school
CREATE POLICY school_admin_read_own ON schools
  FOR SELECT TO school_admin
  USING (id = (current_setting('request.jwt.claims', true)::jsonb->>'school_id')::uuid);

-- school_admins: school_admin can only see their own row
CREATE POLICY school_admin_read_own_admin ON school_admins
  FOR SELECT TO school_admin
  USING (school_id = (current_setting('request.jwt.claims', true)::jsonb->>'school_id')::uuid);

-- audit_logs: school_admin has no access
CREATE POLICY no_school_admin_access ON audit_logs
  FOR ALL TO school_admin USING (false);

-- updated_at trigger (applied to schools and school_admins)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;
```

### Middleware Logic

```typescript
// middleware.ts (Edge Runtime)
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/super-admin')) return NextResponse.next();

  const token = await getToken(request); // decode Supabase JWT
  const isSuperAdmin = token?.app_metadata?.superadmin === true;

  if (pathname === '/super-admin/login') {
    return isSuperAdmin
      ? NextResponse.redirect(new URL('/super-admin/dashboard', request.url))
      : NextResponse.next();
  }

  return isSuperAdmin
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/super-admin/login', request.url));
}
```

---


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Middleware routing correctness

*For any* JWT and any `/super-admin/*` path, the middleware should route the request to `/super-admin/login` if and only if the JWT does not contain `app_metadata.superadmin === true`; otherwise it should allow the request to proceed (or redirect away from `/super-admin/login` to `/super-admin/dashboard` if already authenticated).

**Validates: Requirements 1.3, 1.4, 2.2, 2.3, 2.4**

---

### Property 2: Generic error message on failed login

*For any* combination of email and password that does not correspond to a valid superadmin account, the error message returned by the login handler should be identical regardless of whether the email exists or the password is wrong — it must not reveal which field is incorrect.

**Validates: Requirements 1.2**

---

### Property 3: Tenant data isolation via RLS

*For any* school_admin JWT carrying a given `school_id`, all rows returned by queries to the `schools` and `school_admins` tables should have a `school_id` (or `id` for the schools table) equal to the claim value — no rows from other tenants should ever appear.

**Validates: Requirements 3.1, 3.2, 3.6, 8.6**

---

### Property 4: Audit log inaccessible to school_admin

*For any* school_admin JWT, any SELECT, INSERT, UPDATE, or DELETE query against the `audit_logs` table should return an empty result set or a permission-denied error — no audit log data should be exposed.

**Validates: Requirements 3.3**

---

### Property 5: updated_at trigger invariant

*For any* row in `schools` or `school_admins`, after any UPDATE operation the `updated_at` value should be greater than or equal to the `updated_at` value before the update, and should equal the current UTC timestamp at the time of the update.

**Validates: Requirements 3.5**

---

### Property 6: Dashboard stats accuracy

*For any* set of schools and school_admins in the database, the `computeDashboardStats` function should return counts where `total === active + suspended`, `active` equals the number of schools with status `'active'`, `suspended` equals the number with status `'suspended'`, and `totalAdmins` equals the total number of school_admins rows.

**Validates: Requirements 4.1**

---

### Property 7: Registration chart data correctness

*For any* list of schools, the `buildRegistrationChart` function should return an array of at most 30 data points (one per day over the last 30 days), and the sum of all data point values should equal the number of schools whose `created_at` falls within the last 30 days.

**Validates: Requirements 4.3**

---

### Property 8: Recent items ordering

*For any* list of schools or audit log entries, the `getRecentItems(list, n)` function should return at most `n` items ordered by their timestamp field descending, and every returned item should have a timestamp greater than or equal to any item not returned.

**Validates: Requirements 4.4, 4.5**

---

### Property 9: Pagination correctness

*For any* list of schools and any page number, the `paginateSchools(schools, page, pageSize=25)` function should return at most 25 rows, the rows should be ordered by `created_at` descending, and the union of all pages should equal the full list with no duplicates or omissions.

**Validates: Requirements 5.1, 5.6**

---

### Property 10: Search filter correctness

*For any* search query string and list of schools, the `filterSchoolsBySearch(schools, query)` function should return only schools whose `name` or `code` contains the query string (case-insensitive), and every school matching the query should appear in the result.

**Validates: Requirements 5.2**

---

### Property 11: Status filter correctness

*For any* status filter value (`'active'`, `'suspended'`, or `'all'`) and list of schools, the `filterSchoolsByStatus(schools, status)` function should return only schools whose `status` matches the filter (or all schools when filter is `'all'`).

**Validates: Requirements 5.3**

---

### Property 12: Zod validation accepts valid and rejects invalid inputs

*For any* `CreateSchoolInput` or `UpdateSchoolInput`, the Zod schema should parse successfully if and only if all required fields are present, the email is well-formed, the code matches the allowed pattern, and no required field is empty — any input violating these constraints should produce a `ZodError` with at least one issue.

**Validates: Requirements 6.1, 6.2, 7.2**

---

### Property 13: School creation atomicity

*For any* valid `CreateSchoolInput`, after a successful `createSchool` call, exactly one `schools` row, one `auth.users` entry, and one `school_admins` row should exist with matching IDs; and if the auth user creation fails, no `schools` row should exist for that creation attempt.

**Validates: Requirements 6.3, 6.6**

---

### Property 14: Audit logging completeness

*For any* call to `logAudit` with a valid `AuditAction`, `actor_id`, and `target_id`, the resulting row in `audit_logs` should contain all five required fields (`action`, `actor_id`, `target_id`, `metadata`, `created_at`) with non-null values for the first four and a UTC timestamp for `created_at`.

**Validates: Requirements 6.4, 7.3, 8.4, 9.5**

---

### Property 15: Suspend/reactivate round trip

*For any* active school, calling `suspendSchool` followed by `reactivateSchool` should restore the school's `status` to `'active'` and re-enable the associated Supabase Auth user — the final state should be equivalent to the initial state.

**Validates: Requirements 8.2, 8.3**

---

### Property 16: Audit log ordering

*For any* set of audit log entries returned by `fetchAuditLogs`, the entries should be sorted by `created_at` descending — no entry should have a `created_at` value greater than the entry before it in the list.

**Validates: Requirements 9.1**

---

### Property 17: Audit log filter correctness

*For any* combination of action type filter and date range filter applied to a set of audit log entries, all returned entries should satisfy both filter conditions simultaneously — action matches the selected type (if set) AND `created_at` falls within the date range (if set).

**Validates: Requirements 9.2, 9.3**

---

### Property 18: CSV export completeness

*For any* set of filtered audit log entries passed to `generateAuditCsv`, the resulting CSV string should contain exactly one data row per entry (plus a header row), and each row should include the `action`, `actor_id`, `target_id`, `metadata`, and `created_at` fields.

**Validates: Requirements 9.4**

---

## Error Handling

| Scenario | Handling Strategy |
|---|---|
| Invalid login credentials | Return generic "Invalid credentials" message; never distinguish email vs. password error |
| JWT refresh failure | Clear session cookies, redirect to `/super-admin/login` |
| School creation — auth user creation fails | Delete the already-inserted `schools` row (compensating transaction), return error to client |
| School not found (404) | Return Next.js `notFound()` from the Server Component |
| Zod validation failure | Return field-level errors from Server Action; display inline in form within 200ms |
| `logAudit` failure | `console.error` on server; originating action still resolves successfully |
| RLS violation | Supabase returns empty result or `PGRST116`; surface as "Access denied" to client |
| Supabase network error | TanStack Query retries up to 3 times with exponential backoff; shows error toast on final failure |
| CSV export timeout | Stream response; if generation exceeds 5s, return 504 with user-facing error message |

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. They are complementary:
- **Unit tests** cover specific examples, integration points, and error conditions.
- **Property-based tests** verify universal correctness across all generated inputs.

### Property-Based Testing

**Library**: [`fast-check`](https://github.com/dubzzz/fast-check) (TypeScript-native, works with Vitest/Jest).

Each property-based test must:
- Run a minimum of **100 iterations** (fast-check default is 100; set `numRuns: 100` explicitly).
- Include a comment tag referencing the design property:
  `// Feature: super-admin-module, Property N: <property_text>`
- Be implemented as a **single test per property**.

Example structure:

```typescript
import fc from 'fast-check';

// Feature: super-admin-module, Property 10: Search filter correctness
it('filterSchoolsBySearch returns only matching schools', () => {
  fc.assert(
    fc.property(
      fc.array(arbitrarySchool()),
      fc.string({ minLength: 1 }),
      (schools, query) => {
        const result = filterSchoolsBySearch(schools, query);
        return result.every(
          s => s.name.toLowerCase().includes(query.toLowerCase()) ||
               s.code.toLowerCase().includes(query.toLowerCase())
        );
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Tests

Unit tests should focus on:
- **Specific examples**: e.g., creating a school with known data and asserting the exact response shape.
- **Error conditions**: e.g., `logAudit` failure does not throw in the calling Server Action.
- **Edge cases**: e.g., school not found returns 404, empty search query returns all schools.
- **Integration points**: e.g., `createSchool` calls `logAudit` with the correct arguments.

Avoid writing unit tests that duplicate what property tests already cover (e.g., don't write 10 unit tests for different search queries when Property 10 covers all of them).

### Test File Organization

```
src/
  lib/
    __tests__/
      middleware.test.ts          # P1, P2
      schools-filters.test.ts     # P9, P10, P11
      dashboard-stats.test.ts     # P6, P7, P8
      zod-schemas.test.ts         # P12
      audit-logger.test.ts        # P14, P16, P17, P18
      suspend-reactivate.test.ts  # P15
  app/super-admin/
    __tests__/
      create-school.test.ts       # P13, unit: 6.6 rollback
      school-detail.test.ts       # unit: 7.4 not-found
```

### Coverage Targets

- All 18 correctness properties must have a corresponding property-based test.
- All `yes - example` criteria (1.6, 6.6, 7.4, 8.5, 9.6) must have a corresponding unit test.
- Edge cases (2.4, 3.6, 5.6, 8.6) are covered by the property tests that subsume them.
