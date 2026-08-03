-- Customs declaration self-service index (Neon / Postgres)
-- Run once in Neon SQL editor after creating the project.

CREATE TABLE IF NOT EXISTS customs_declarations (
  id BIGSERIAL PRIMARY KEY,
  expedition_no CHAR(6) NOT NULL,
  serial_no CHAR(10) NOT NULL,
  declaration_date DATE,
  order_no TEXT,
  sequence_no TEXT,
  direction CHAR(1) CHECK (direction IN ('I', 'E')),
  org_no TEXT,
  pin_hash TEXT NOT NULL,
  blob_pathname TEXT NOT NULL,
  blob_url TEXT,
  source_path TEXT,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (expedition_no, serial_no)
);

CREATE INDEX IF NOT EXISTS customs_declarations_date_idx
  ON customs_declarations (declaration_date);

CREATE TABLE IF NOT EXISTS customs_lookup_attempts (
  id BIGSERIAL PRIMARY KEY,
  expedition_no CHAR(6) NOT NULL,
  serial_no CHAR(10) NOT NULL,
  ip_hash TEXT,
  success BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS customs_lookup_attempts_key_idx
  ON customs_lookup_attempts (expedition_no, serial_no, created_at DESC);

CREATE INDEX IF NOT EXISTS customs_lookup_attempts_ip_idx
  ON customs_lookup_attempts (ip_hash, created_at DESC);
