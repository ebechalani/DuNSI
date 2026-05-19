-- À exécuter dans Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS entries (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  date        DATE,
  title       TEXT,
  bloc        TEXT,        -- 'bloc0' .. 'bloc5'
  topic       TEXT,        -- thème précis du programme
  tasks       TEXT,
  learned     TEXT,
  notes       TEXT,
  mood        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Active la sécurité au niveau des lignes
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut lire/écrire (app personnelle)
CREATE POLICY "anon_all" ON entries
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Si entries existe déjà, ajoute les colonnes manquantes :
-- ALTER TABLE entries ADD COLUMN IF NOT EXISTS bloc  TEXT;
-- ALTER TABLE entries ADD COLUMN IF NOT EXISTS topic TEXT;

-- ── Fiches de cours ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS fiches (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bloc         TEXT,
  topic        TEXT,
  title        TEXT,
  summary      TEXT,
  content      TEXT,
  code_example TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE fiches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON fiches FOR ALL USING (true) WITH CHECK (true);

-- ── Statut par thème du programme ────────────────────────
CREATE TABLE IF NOT EXISTS topic_status (
  topic_key  TEXT PRIMARY KEY,
  status     TEXT DEFAULT 'not_started'  -- not_started | in_progress | mastered
);

ALTER TABLE topic_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON topic_status FOR ALL USING (true) WITH CHECK (true);
