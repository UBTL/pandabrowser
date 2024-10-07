-- migrate:up

CREATE TABLE IF NOT EXISTS `thumbnail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumb` varchar(150) NOT NULL,
  `ph0` int2 unsigned,
  `ph1` int2 unsigned,
  `ph2` int2 unsigned,
  `ph3` int2 unsigned,
  `bitcount` int1,
  UNIQUE (`thumb`),
  INDEX bitcount_idx using btree (`bitcount`),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE gallery ADD thumbnail_id int after thumb, ADD INDEX (thumbnail_id);


-- migrate:down

ALTER TABLE gallery DROP thumbnail_id;

-- letting table remain because it doesn't prevent rerunning migration
DROP TABLE thumbnail;
