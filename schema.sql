-- Lacet survey responses
-- Slugs courts stockés en base, labels affichés côté front via i18n

CREATE TABLE IF NOT EXISTS survey_responses (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  lang             TEXT NOT NULL,
  ip_country       TEXT,

  -- Section 1 - Profil
  age              TEXT NOT NULL,
  gender           TEXT,           -- nullable: question facultative
  region           TEXT NOT NULL,
  practice         TEXT NOT NULL,
  km_season        TEXT NOT NULL,
  bike_size        TEXT,           -- nullable: question facultative
  maintenance      TEXT NOT NULL,
  maintenance_satisfaction INTEGER NOT NULL,

  -- Section 2 - Intérêt et contexte
  interest         INTEGER NOT NULL,
  rented_before    TEXT NOT NULL,
  past_experience  TEXT,
  contexts         TEXT NOT NULL,
  bike_type        TEXT NOT NULL,
  duration         TEXT NOT NULL,
  rentals_per_season TEXT NOT NULL,
  purchase_intent  INTEGER,        -- nullable: échelle 1-4 (1=Non, 4=Certainement)

  -- Section 4 - Prix
  price_week       TEXT NOT NULL,
  price_month      TEXT NOT NULL,
  price_season     TEXT NOT NULL,

  -- Section 5 - Services (grille Q14)
  val_delivery     TEXT NOT NULL,
  val_bikefit      TEXT NOT NULL,
  val_maintenance  TEXT NOT NULL,
  val_insurance    TEXT NOT NULL,
  val_exchange     TEXT NOT NULL,
  val_coaching     TEXT NOT NULL,
  val_equipment    TEXT NOT NULL,
  val_purchase     TEXT NOT NULL,
  val_routes       TEXT NOT NULL,

  top_service      TEXT NOT NULL,

  -- Section 6 - Freins & commentaires
  nps              INTEGER,
  main_concern     TEXT NOT NULL,
  comments         TEXT
);

CREATE INDEX IF NOT EXISTS idx_survey_created_at ON survey_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_lang       ON survey_responses(lang);

-- Contest entries (kept SEPARATE from survey_responses to preserve anonymity).
-- A row here = someone who opted into the prize draw.
-- There is intentionally NO foreign key or shared id with survey_responses.
CREATE TABLE IF NOT EXISTS contest_entries (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  lang            TEXT NOT NULL,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  accepted_rules  INTEGER NOT NULL DEFAULT 1,
  ip_country      TEXT,
  ip_hash         TEXT
);

CREATE INDEX        IF NOT EXISTS idx_contest_created_at      ON contest_entries(created_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_contest_email_unique    ON contest_entries(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_contest_ip_hash_unique  ON contest_entries(ip_hash) WHERE ip_hash IS NOT NULL;
