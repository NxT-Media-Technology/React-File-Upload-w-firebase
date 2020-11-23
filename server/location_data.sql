-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2020 at 03:39 PM
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
  `name` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `coordinates` varchar(20) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `img_name` varchar(255) NOT NULL,
  `img_description` text NOT NULL,
  `created_at` varchar(10) NOT NULL,
  `is_deleted` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location_data`
--

INSERT INTO `location_data` (`id`, `name`, `phonenumber`, `coordinates`, `img_url`, `img_name`, `img_description`, `created_at`, `is_deleted`) VALUES
(1, 'Reno Simons', '04788448', '51.3098168,4.42483', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FUpcoming3-min.jpg?alt=media&token=eb486e15-ba43-4c80-81ca-8e2d52e7befb', 'Upcoming3-min.jpg', '', '2020-11-23', 1),
(2, 'frefre', 'fefefe', '51.3098168,4.42483', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FBTOBS_5-min.jpg?alt=media&token=8d942db9-a583-4c63-a046-270650833268', 'BTOBS_5-min.jpg', '', '2020-11-23', 1),
(3, 'fzfczeefz', 'fezfzfe', '51.3098168,4.42483', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FVolume_I-min.jpg?alt=media&token=86aa6ba8-4a3b-4dc9-91b1-4fde092544f5', 'Volume_I-min.jpg', '', '2020-11-23', 1),
(4, 'admin', 'fefef', '51.3098168,4.42483', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FUpcoming2-min.jpg?alt=media&token=102001d9-5dbe-4d1b-b9ab-a0de9146076a', 'Upcoming2-min.jpg', '', '2020-11-23', 1),
(5, 'regfreg', 'grege', '51.314688,4.4204032', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FBTOBS_5-min.jpg?alt=media&token=3ffe66c5-ecc8-4614-8003-5b8801f53db0', 'BTOBS_5-min.jpg', '', '2020-11-23', 1),
(6, 'Reno Simons', '0470583092', '51.3098542,4.4247771', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FVolume_I-min.jpg?alt=media&token=1dea6a5f-b8ab-44d7-814f-04856cf24703', 'Volume_I-min.jpg', '', '2020-11-23', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
