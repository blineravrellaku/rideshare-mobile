-- Ekzekuto në të njëjtën databazë Neon që përdor aplikacioni i Javës 4.
CREATE TABLE IF NOT EXISTS profilet (
  github_id TEXT PRIMARY KEY,
  emri TEXT NOT NULL,
  roli TEXT NOT NULL DEFAULT 'udhetar'
    CHECK (roli IN ('udhetar', 'shofer'))
);

ALTER TABLE udhetimet
  ADD COLUMN IF NOT EXISTS shofer_id TEXT REFERENCES profilet(github_id);

INSERT INTO profilet (github_id, emri, roli)
VALUES ('DEMO-SHOFER-2', 'Shoferi tjetër (demo)', 'shofer')
ON CONFLICT (github_id) DO NOTHING;

UPDATE udhetimet
SET shofer_id = 'DEMO-SHOFER-2'
WHERE id = '1' AND shofer_id IS NULL;

SELECT id, ora, shofer_id FROM udhetimet ORDER BY id;
