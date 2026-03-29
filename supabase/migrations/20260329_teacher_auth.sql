-- ─── Teacher Authentication ───────────────────────────────────────────────────

-- Add password column to teachers table
-- Use the same logic as parents: custom password for manual management by school admin
ALTER TABLE teachers ADD COLUMN IF NOT EXISTS password text;

-- Add index on phone for faster login lookups
CREATE INDEX IF NOT EXISTS idx_teachers_phone ON teachers(phone);

-- Ensure phone is unique per school for login purposes
-- This prevents cases where two teachers in the same school have the same login phone
-- (In reality, they might share a phone number if they are family, but for login unique is better)
-- Commented out for now to avoid breaking existing data if any duplicates exist
-- ALTER TABLE teachers ADD CONSTRAINT unique_teacher_phone_per_school UNIQUE (school_id, phone);
