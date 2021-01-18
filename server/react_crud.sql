-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 18 jan 2021 om 19:26
-- Serverversie: 10.4.11-MariaDB
-- PHP-versie: 7.4.2

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
-- Tabelstructuur voor tabel `location_data`
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
-- Gegevens worden geëxporteerd voor tabel `location_data`
--

INSERT INTO `location_data` (`id`, `delete_id`, `name`, `phonenumber`, `coordinates`, `img_url`, `img_name`, `img_description`, `created_at`, `is_deleted`, `not_found`) VALUES
(1, '', 'Reno Simons', '04788448', '51.3098168,4.42483', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FUpcoming3-min.jpg?alt=media&token=eb486e15-ba43-4c80-81ca-8e2d52e7befb', 'Upcoming3-min.jpg', '', '2020-11-23', 0, 1),
(2, '', 'frefre', 'fefefe', '51.3098168,4.42483', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FBTOBS_5-min.jpg?alt=media&token=8d942db9-a583-4c63-a046-270650833268', 'BTOBS_5-min.jpg', '', '2020-11-23', 0, 1),
(3, '', 'fzfczeefz', 'fezfzfe', '51.3098168,4.42483', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FVolume_I-min.jpg?alt=media&token=86aa6ba8-4a3b-4dc9-91b1-4fde092544f5', 'Volume_I-min.jpg', '', '2020-11-23', 1, 1),
(4, '', 'admin', 'fefef', '51.3098168,4.42483', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FUpcoming2-min.jpg?alt=media&token=102001d9-5dbe-4d1b-b9ab-a0de9146076a', 'Upcoming2-min.jpg', '', '2020-11-23', 0, 1),
(5, '', 'regfreg', 'grege', '51.314688,4.4204032', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FBTOBS_5-min.jpg?alt=media&token=3ffe66c5-ecc8-4614-8003-5b8801f53db0', 'BTOBS_5-min.jpg', '', '2020-11-23', 0, 1),
(6, '', 'Reno Simons', '0470583092', '51.3098542,4.4247771', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2FVolume_I-min.jpg?alt=media&token=1dea6a5f-b8ab-44d7-814f-04856cf24703', 'Volume_I-min.jpg', '', '2020-11-23', 0, 1),
(7, '9f3166af6a5486f1e43bc40fb85780c1', 'Anonymous', 'Anonymous', '51.260704499999996,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=0f82d304-d96d-46d9-9be8-80a5ccd3fe74', 'qr1x3uvayptv_wd640.jpeg', '', '2020-11-27', 0, 1),
(8, '1434e75d897ccf672cb7eecb59942e91', '', '', '51.260684399999995,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=6d352270-7588-4eb5-8e24-f0efbe1057d7', 'qr1x3uvayptv_wd640.jpeg', '', '2020-11-27', 1, 0),
(9, '66b5ae84315efd713d9e27c3ba751014', '', '', '51.260727599999996,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=392b9e5f-f985-4039-889a-2149570a7e1f', 'qr1x3uvayptv_wd640.jpeg', '', '2020-11-27', 1, 0),
(10, '4feb2500bf51042ab9633ba0b186060f', 'Gianni', '2134324', '51.2607188,4.0576925', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=203d4f2c-ac31-44d5-b5f3-9751a655eb5f', 'qr1x3uvayptv_wd640.jpeg', '', '2020-11-27', 1, 0),
(11, 'fb19820adf03f8384702d50f92a2481a', 'Gianni', '063435215153', '51.2607148,4.057677', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fimg_2609.jpg?alt=media&token=adb2c55f-2797-4956-bdc5-c2c55aeebec8', 'img_2609.jpg', '', '2020-11-27', 0, 0),
(12, '66a3a6cf0be6e64c083d11aef85ba8e8', 'Anonymous', 'Anonymous', '51.260686799999995,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=19d769b3-2360-410d-b27e-f60805f00160', 'qr1x3uvayptv_wd640.jpeg', '', '2020-11-27', 0, 1),
(13, 'bd3e6d800dfbf8ac276426ea07332bcd', 'Anonymous', 'Anonymous', '51.260701499999996,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=74c80ab4-5413-406f-ae0e-2326cb8c0fe6', 'qr1x3uvayptv_wd640.jpeg', '', '2020-11-27', 1, 0),
(14, 'ac1bab15671081a68cddc4fd90636676', 'Anonymous', 'Anonymous', '51.260748799999995,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=40deeba5-cdf5-4ea7-9359-b1b5ea18603a', 'qr1x3uvayptv_wd640.jpeg', 'test123', '2020-12-01', 1, 0),
(15, '8a6a3a15c8a8bfb86c6732b7cf2b4eee', '', '', '51.260687999999995,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=2aa3fecb-fd52-4b45-b56a-9078a162526a', 'qr1x3uvayptv_wd640.jpeg', 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', '2020-12-01', 1, 0),
(16, '47e941dd632cda89a417f1e054571af9', 'Anonymous', 'Anonymous', '51.2607025,4.0576957', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=5ef6c566-09a1-4846-9e44-9dc15d9dc52c', 'qr1x3uvayptv_wd640.jpeg', 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', '2020-12-01', 1, 0),
(17, '988eb8cd59f68c57f90b3f1cb9cdddff', NULL, NULL, '51.2606447,4.0576799', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=d815e17d-044b-49b5-ac74-700833cdb9b6', 'qr1x3uvayptv_wd640.jpeg', '', '2020-12-08', 0, 0),
(18, 'b370b93d960718f31e16ade938cc108a', NULL, NULL, '51.2608402,4.0577591', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fimg_2609.jpg?alt=media&token=27b41ff0-1bbc-4848-926f-41ec86c0a328', 'img_2609.jpg', ',ppo', '2020-12-08', 0, 0),
(19, '05e378f3040de3be0e3205bee87ccb8c', NULL, NULL, '51.265536,4.0566784', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fimg_2609.jpg?alt=media&token=bad2a573-c692-4fc8-bb61-49abd2c122e5', 'img_2609.jpg', 'test', '2020-12-09', 0, 0),
(20, '7af8a77586515d49b272306511ea3bf0', NULL, NULL, '51.265536,4.0566784', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fimg_2609.jpg?alt=media&token=7f05e450-bdd0-4445-a22a-6df11aa1a1d7', 'img_2609.jpg', 'Veel afval in deze regio', '2020-12-10', 0, 0),
(21, '0d1098c573d46f7a17dd08de693878e8', NULL, NULL, '51.260656399999995,4', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=0d928f72-ce7a-405e-93c7-d5fef5aaca15', 'qr1x3uvayptv_wd640.jpeg', 'Veel afval bij het strand', '2020-12-15', 0, 0),
(22, '7c45b102c9fc09855b56439b42e95cc6', NULL, NULL, '51.2607408,4.0577124', 'https://firebasestorage.googleapis.com/v0/b/cs-image-uploader.appspot.com/o/images%2Fqr1x3uvayptv_wd640.jpeg?alt=media&token=aabe770b-8d6b-42d7-96a5-806ee3b56483', 'qr1x3uvayptv_wd640.jpeg', 'ttt', '2021-01-10', 0, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `token` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `token`) VALUES
(1, 'test', 'test', 'b7b1bce5034251ebaa26ab3a1179430a'),
(2, 'pipi', 'kaka', '0c9611bd93886a0e5e7e662e6da485ee'),
(3, 'jofnjzenfzejnzf', 'test', 'af3dde0eeef08561ad938e4e9d6c0bf6'),
(4, 'Wouter', 'kippensoep', 'e3f50a2e9ed73e03aef0599604d00e4f');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `location_data`
--
ALTER TABLE `location_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `location_data`
--
ALTER TABLE `location_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
