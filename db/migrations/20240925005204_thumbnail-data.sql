-- migrate:up

-- if table has any rows already then don't insert
INSERT INTO thumbnail (thumb) select distinct thumb from gallery
  WHERE NOT EXISTS (SELECT 1 FROM thumbnail limit 1) order by thumb;

CREATE INDEX IF NOT EXISTS thumb on gallery (thumb);

-- this might take 3min depending on hardware
UPDATE gallery g inner join thumbnail t on (t.thumb=g.thumb) set g.thumbnail_id=t.id;

-- shorten local file paths to basename, UI knows which folder they're in
UPDATE thumbnail set thumb=REGEXP_REPLACE(thumb,'.*/','') where thumb like 'pandathumbs/%.jpg';

ALTER TABLE gallery DROP thumb;


-- migrate:down

ALTER TABLE gallery ADD thumb varchar(150) NOT NULL after thumbnail_id;

UPDATE gallery g inner join thumbnail t on (t.id=g.thumbnail_id) set g.thumb=t.thumb;
