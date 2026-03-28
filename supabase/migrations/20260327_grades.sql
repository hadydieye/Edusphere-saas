-- ─── Tables ───

CREATE TABLE subjects (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id  uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE grades (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id  uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_id   uuid REFERENCES classes(id),
  period     text NOT NULL DEFAULT 'T1',  -- T1, T2, T3
  score      numeric(5,2),
  max_score  numeric(5,2) NOT NULL DEFAULT 20,
  comment    text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, subject_id, period)
);

-- ─── RLS ───

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades   ENABLE ROW LEVEL SECURITY;

-- Subjects
CREATE POLICY "school_admin_all_subjects" ON subjects
  FOR ALL TO authenticated
  USING (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()))
  WITH CHECK (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()));

-- Grades
CREATE POLICY "school_admin_all_grades" ON grades
  FOR ALL TO authenticated
  USING (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()))
  WITH CHECK (school_id IN (SELECT school_id FROM school_admins WHERE user_id = auth.uid()));
