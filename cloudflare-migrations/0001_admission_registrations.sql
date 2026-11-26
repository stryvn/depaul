CREATE TABLE IF NOT EXISTS admission_registrations (
  id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL CHECK (length(student_name) BETWEEN 2 AND 120),
  class_sought TEXT NOT NULL CHECK (class_sought IN ('Kindergarten', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII')),
  guardian_name TEXT NOT NULL CHECK (length(guardian_name) BETWEEN 2 AND 120),
  guardian_phone TEXT NOT NULL CHECK (length(guardian_phone) BETWEEN 7 AND 25),
  guardian_email TEXT,
  message TEXT,
  consent INTEGER NOT NULL CHECK (consent = 1),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL DEFAULT (datetime('now', '+12 months'))
);
CREATE INDEX IF NOT EXISTS admission_registrations_created_at ON admission_registrations (created_at DESC);
