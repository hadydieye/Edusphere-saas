-- ─── Teachers ─────────────────────────────────────────────────────────────────

CREATE TABLE teachers (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id  uuid        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  first_name text        NOT NULL,
  last_name  text        NOT NULL,
  phone      text,
  email      text,
  specialty  text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_admin_all_teachers" ON teachers
  FOR ALL TO authenticated
  USING (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()))
  WITH CHECK (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()));

-- ─── Attendance ───────────────────────────────────────────────────────────────

CREATE TABLE attendance (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id  uuid        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id uuid        NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id   uuid        NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  date       date        NOT NULL DEFAULT CURRENT_DATE,
  status     text        NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  comment    text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, date)
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_admin_all_attendance" ON attendance
  FOR ALL TO authenticated
  USING (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()))
  WITH CHECK (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()));

-- ─── Expenses ─────────────────────────────────────────────────────────────────

CREATE TABLE expenses (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id  uuid        NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  amount     bigint      NOT NULL, -- In GNF
  label      text        NOT NULL,
  category   text        NOT NULL,
  date       date        NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "school_admin_all_expenses" ON expenses
  FOR ALL TO authenticated
  USING (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()))
  WITH CHECK (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()));
