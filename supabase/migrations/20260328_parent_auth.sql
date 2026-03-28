-- ─── Parent Authentication ───────────────────────────────────────────────────

-- Add guardian_password to students table
ALTER TABLE students ADD COLUMN IF NOT EXISTS guardian_password text;

-- For existing students, set a default password or leave null
-- UPDATE students SET guardian_password = 'password123' WHERE guardian_password IS NULL;

-- ─── RLS for Parents ─────────────────────────────────────────────────────────

-- Note: Since we are using a custom cookie-based session for parents 
-- (to avoid the cost of full individual Supabase Auth users for every parent),
-- we will handle the "is my child" logic in Server Actions using the adminClient.
-- However, we can still add restrictive policies if we decide to use custom JWT claims.

-- For now, the adminClient in Server Actions will enforce that a parent
-- can only see students matching their session's phone number.
