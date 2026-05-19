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
DROP POLICY IF EXISTS "anon_all" ON entries;
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
DROP POLICY IF EXISTS "anon_all" ON fiches;
CREATE POLICY "anon_all" ON fiches FOR ALL USING (true) WITH CHECK (true);

-- ── Statut par thème du programme ────────────────────────
CREATE TABLE IF NOT EXISTS topic_status (
  topic_key  TEXT PRIMARY KEY,
  status     TEXT DEFAULT 'not_started'  -- not_started | in_progress | mastered
);

ALTER TABLE topic_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all" ON topic_status FOR ALL USING (true) WITH CHECK (true);

-- ── Champs pédagogiques supplémentaires pour les fiches ───
ALTER TABLE fiches ADD COLUMN IF NOT EXISTS objectifs TEXT;
ALTER TABLE fiches ADD COLUMN IF NOT EXISTS exercices TEXT;

-- ── Ressources (fichiers : PDF, audio, documents…) ───────
CREATE TABLE IF NOT EXISTS ressources (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT,
  bloc        TEXT,        -- 'bloc0' .. 'bloc5'
  topic       TEXT,
  description TEXT,
  file_path   TEXT,        -- chemin dans le bucket Storage
  file_name   TEXT,
  file_type   TEXT,
  file_size   BIGINT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ressources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all" ON ressources;
CREATE POLICY "anon_all" ON ressources FOR ALL USING (true) WITH CHECK (true);

-- ── Bucket de stockage des fichiers ──────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('ressources', 'ressources', true)
ON CONFLICT (id) DO NOTHING;

-- Autoriser l'app (clé anon) à lire / déposer / supprimer dans ce bucket
DROP POLICY IF EXISTS "ressources_read"   ON storage.objects;
DROP POLICY IF EXISTS "ressources_insert" ON storage.objects;
DROP POLICY IF EXISTS "ressources_delete" ON storage.objects;

CREATE POLICY "ressources_read"   ON storage.objects
  FOR SELECT USING (bucket_id = 'ressources');
CREATE POLICY "ressources_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'ressources');
CREATE POLICY "ressources_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'ressources');
