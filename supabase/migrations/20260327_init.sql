-- ─── Tables ───────────────────────────────────────────────────────────────────

CREATE TABLE schools (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  code       text        NOT NULL UNIQUE,
  address    text,
  status     text        NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE school_admins (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id  uuid        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email      text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  action     text        NOT NULL,
  actor_id   uuid        NOT NULL,
  target_id  uuid        NOT NULL,
  metadata   jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ─── updated_at trigger ───────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER schools_updated_at
  BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER school_admins_updated_at
  BEFORE UPDATE ON school_admins
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE schools      ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs   ENABLE ROW LEVEL SECURITY;

-- schools : super admin (service role) full access ; school_admin can read own school
CREATE POLICY "super_admin_schools_all"
  ON schools FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "school_admin_read_own_school"
  ON schools FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT school_id FROM school_admins WHERE user_id = auth.uid()
    )
  );

-- school_admins : service role full access ; user can read own record
CREATE POLICY "super_admin_school_admins_all"
  ON school_admins FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "school_admin_read_own_record"
  ON school_admins FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- audit_logs : service role full access ; authenticated can read (super admin only in practice)
CREATE POLICY "super_admin_audit_logs_all"
  ON audit_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "authenticated_read_audit_logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (true);
