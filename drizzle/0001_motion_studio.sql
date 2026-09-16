CREATE TABLE IF NOT EXISTS motion_projects (
  id TEXT PRIMARY KEY NOT NULL,
  owner_key TEXT NOT NULL,
  title TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  archived INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_opened_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_motion_projects_owner_archived_updated
  ON motion_projects(owner_key, archived, updated_at DESC);

CREATE TABLE IF NOT EXISTS motion_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_key TEXT NOT NULL,
  project_id TEXT,
  event_type TEXT NOT NULL,
  detail_json TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_motion_events_owner_created
  ON motion_events(owner_key, created_at DESC);
