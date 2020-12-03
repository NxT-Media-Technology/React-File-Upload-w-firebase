-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2020 at 06:22 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `location_data`
--

CREATE TABLE `location_data` (
  `id` int(11) NOT NULL,
  `delete_id` varchar(32) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `coordinates` varchar(20) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `img_name` varchar(255) NOT NULL,
  `img_description` text NOT NULL,
  `created_at` varchar(10) NOT NULL,
  `is_deleted` int(1) NOT NULL,
  `not_found` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location_data`
--

INSERT INTO `location_data` (`id`, `delete_id`, `name`, `phonenumber`, `coordinates`, `img_url`, `img_name`, `img_description`, `created_at`, `is_deleted`, `not_found`) VALUES
(19, 'f3387b72d7180926d7ca7b6d2a6cedfc', 'Anonymous', 'Anonymous', '51.309801699999994,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fdansbingo_6-min.jpg?alt=media&token=faffb976-a13a-46cb-b6d2-be98cf6d3a99', 'dansbingo_6-min.jpg', '', '2020-11-30', 0, 1),
(20, 'ad1b5b715d437a1160427322f865cef6', 'Anonymous', 'Anonymous', '51.314688,4.4204032', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FBTOBS_3-min.jpg?alt=media&token=2bccda56-bb9f-43a5-896f-7a963666282c', 'BTOBS_3-min.jpg', '', '2020-11-30', 1, 0),
(21, '90b9fad57453dd21e4be9b5abfd1aaf6', 'Anonymous', 'Anonymous', '51.314688,4.4204032', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FClubbing_3-min.jpg?alt=media&token=30ab5212-bceb-401c-b51b-f9a2c288ce00', 'Clubbing_3-min.jpg', '', '2020-11-30', 1, 0),
(22, '', '1', '1', '1', '1', '', '1', '1', 0, 0),
(23, '', '1', '1', '1', '1', '', '1', '1', 0, 0),
(24, '', '1', '1', '1', '1', '', '1', '1', 0, 0),
(25, '', '1', '1', '1', '1', '', '1', '1', 0, 0),
(26, '', '1', '1', '1', '1', '', '1', '1', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `location_data`
--
ALTER TABLE `location_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `location_data`
--
ALTER TABLE `location_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
