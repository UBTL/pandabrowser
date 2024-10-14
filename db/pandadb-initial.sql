-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2024 at 05:33 AM
-- Server version: 11.5.2-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pandadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `gid` int(11) NOT NULL,
  `token` char(10) NOT NULL,
  `archiver_key` varchar(60) NOT NULL,
  `title` varchar(300) NOT NULL,
  `title_jpn` varchar(300) NOT NULL,
  `category` varchar(15) NOT NULL,
  `thumb` varchar(150) NOT NULL,
  `thumbnail_id` int(11) DEFAULT NULL,
  `uploader` varchar(50) DEFAULT NULL,
  `posted` int(11) NOT NULL,
  `filecount` int(11) NOT NULL,
  `filesize` bigint(20) NOT NULL,
  `expunged` tinyint(1) NOT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT 0,
  `replaced` tinyint(1) NOT NULL DEFAULT 0,
  `rating` char(4) NOT NULL,
  `torrentcount` int(11) NOT NULL,
  `root_gid` int(11) DEFAULT NULL,
  `bytorrent` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_personal`
--

CREATE TABLE `gallery_personal` (
  `gid` int(11) NOT NULL,
  `have` tinyint(1) DEFAULT NULL,
  `done` tinyint(1) DEFAULT NULL,
  `want` tinyint(1) DEFAULT NULL,
  `flags` bit(8) DEFAULT NULL,
  `rating` varchar(4) DEFAULT NULL,
  `note` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gid_tid`
--

CREATE TABLE `gid_tid` (
  `gid` int(11) NOT NULL,
  `tid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thumbnail`
--

CREATE TABLE `thumbnail` (
  `id` int(11) NOT NULL,
  `thumb` varchar(150) NOT NULL DEFAULT '0',
  `ph0` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `ph1` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `ph2` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `ph3` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `bitcount` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `torrent`
--

CREATE TABLE `torrent` (
  `id` int(11) NOT NULL,
  `gid` int(11) NOT NULL,
  `name` varchar(300) NOT NULL,
  `hash` char(40) DEFAULT NULL,
  `addedstr` varchar(20) DEFAULT NULL,
  `fsizestr` varchar(15) DEFAULT NULL,
  `uploader` varchar(50) NOT NULL,
  `expunged` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`gid`),
  ADD KEY `category` (`category`),
  ADD KEY `uploader` (`uploader`),
  ADD KEY `root_gid` (`root_gid`),
  ADD KEY `posted` (`posted`),
  ADD KEY `thumbnail_id` (`thumbnail_id`);

--
-- Indexes for table `gallery_personal`
--
ALTER TABLE `gallery_personal`
  ADD PRIMARY KEY (`gid`);

--
-- Indexes for table `gid_tid`
--
ALTER TABLE `gid_tid`
  ADD UNIQUE KEY `tid` (`tid`,`gid`) USING BTREE,
  ADD UNIQUE KEY `gid` (`gid`,`tid`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `thumbnail`
--
ALTER TABLE `thumbnail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `thumb` (`thumb`),
  ADD KEY `bitcount_idx` (`bitcount`) USING BTREE;

--
-- Indexes for table `torrent`
--
ALTER TABLE `torrent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gid` (`gid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thumbnail`
--
ALTER TABLE `thumbnail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
