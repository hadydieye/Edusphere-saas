-- ─── 1. Create a Test School ──────────────────────────────────────────────────
INSERT INTO schools (id, name, code, status)
VALUES ('00000000-0000-0000-0000-000000000000', 'Ecole Pilote Edusphère', 'PILOTE001', 'active')
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name;

-- ─── 2. Create the School Admin User in Auth ──────────────────────────────────
-- NOTE: In Supabase, users are in the auth.users table.
-- We use a specific ID to keep it consistent if possible, or just generate one.
-- Passwords in Supabase Auth are hashed. For testing, it's easier to create them via the UI,
-- but we can verify the metadata and the link here.

/* 
INSTRUCTIONS FOR THE USER:
1. Go to Supabase Dashboard > Authentication > Users
2. Create a user with your preferred admin email and password.
3. Copy the 'User ID' of this new user.
4. Replace 'YOUR_USER_ID' below with that ID and run the rest of this script.
*/

-- ─── 3. Link User to School and Set Metadata ──────────────────────────────────
-- REPLACE 'YOUR_USER_ID' with the actual UUID from Supabase Auth
DO $$
DECLARE
    target_user_id UUID := 'b01170fe-4bad-4052-a80f-648290adad9b'; -- <--- CHANGE THIS
    target_email TEXT := 'scriptseinseidieye@gmail.com'; -- <--- CHANGE THIS
BEGIN
    -- Link to school_admins table
    INSERT INTO school_admins (school_id, user_id, email)
    VALUES ('00000000-0000-0000-0000-000000000000', target_user_id, target_email)
    ON CONFLICT DO NOTHING;

    -- IMPORTANT: Set the app_metadata for the login check
    -- This requires service_role or running as superuser
    UPDATE auth.users 
    SET app_metadata = app_metadata || jsonb_build_object('school_admin', true)
    WHERE id = target_user_id;

END $$;

-- ─── 4. Seed some test students linked to this school ────────────────────────
INSERT INTO classes (id, name, level, school_id)
VALUES ('11111111-1111-1111-1111-111111111111', 'Tle Sciences Maths', 'Terminale', '00000000-0000-0000-0000-000000000000')
ON CONFLICT DO NOTHING;

INSERT INTO students (first_name, last_name, gender, status, school_id, class_id, guardian_phone, guardian_password)
VALUES 
('Alpha', 'Diallo', 'M', 'active', '00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', '600000000', 'password123'),
('Mariam', 'Camara', 'F', 'active', '00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', '611111111', 'password123');
