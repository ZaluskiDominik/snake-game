-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 12, 2019 at 07:18 PM
-- Server version: 10.3.15-MariaDB-1
-- PHP Version: 7.3.4-2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snake`
--

-- --------------------------------------------------------

--
-- Table structure for table `top_scores`
--

CREATE TABLE `top_scores` (
  `place` int(11) NOT NULL,
  `player_name` varchar(50) COLLATE utf8_polish_ci DEFAULT NULL,
  `score` int(11) DEFAULT NULL
) ;

--
-- Dumping data for table `top_scores`
--

INSERT INTO `top_scores` (`place`, `player_name`, `score`) VALUES
(1, 'Player', 20),
(2, 'gracz', 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `top_scores`
--
ALTER TABLE `top_scores`
  ADD PRIMARY KEY (`place`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
