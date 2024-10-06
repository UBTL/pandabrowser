-- migrate:up

CREATE TABLE IF NOT EXISTS `gallery_personal` (
    `gid` int(11) NOT NULL,
    `have` bool, `done` bool, `want` bool,
    `flags` bit(8),
    `rating` varchar(4),
    `note` text,
    PRIMARY KEY (`gid`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- migrate:down

