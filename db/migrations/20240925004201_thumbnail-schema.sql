-- migrate:up

CREATE TABLE IF NOT EXISTS `thumbnail` (
  `id` int(11) NOT NULL,
  `thumb` varchar(150) NOT NULL,
  `ph0` int2 unsigned NOT NULL,
  `ph1` int2 unsigned NOT NULL,
  `ph2` int2 unsigned NOT NULL,
  `ph3` int2 unsigned NOT NULL,
  `bitcount` int1 NOT NULL,
  UNIQUE (`thumb`),
  INDEX bitcount_idx using btree (`bitcount`),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

ALTER TABLE gallery ADD thumbnail_id int after thumb, ADD INDEX (thumbnail_id);


-- migrate:down

ALTER TABLE gallery DROP thumbnail_id;

-- letting table remain because it doesn't prevent rerunning migration
-- DROP TABLE thumbnail;
