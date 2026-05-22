-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2026 at 04:03 PM
-- Server version: 8.0.44
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_library_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'John Doe', 'admin@gmail.com', '123', 'Active', '2026-03-02 00:00:00', '2026-03-02 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `page_number` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `user_id`, `book_id`, `page_number`, `createdAt`, `updatedAt`) VALUES
(372, 5, 39, 5, '2026-04-22 05:59:31', NULL),
(373, 7, 34, NULL, '2026-04-28 16:06:13', NULL),
(374, 7, 34, NULL, '2026-04-28 16:06:18', NULL),
(375, 5, 42, NULL, '2026-05-16 18:11:56', NULL),
(376, 5, 42, NULL, '2026-05-16 18:12:20', NULL),
(377, 5, 42, NULL, '2026-05-16 18:13:10', NULL),
(378, 11, 37, NULL, '2026-05-17 12:30:21', NULL),
(379, 11, 37, 23, '2026-05-17 12:30:38', NULL),
(380, 12, 39, 3, '2026-05-18 05:19:26', NULL),
(381, 5, 39, 5, '2026-05-18 07:14:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT 'Available',
  `isbn` varchar(255) NOT NULL,
  `publisherName` varchar(255) NOT NULL,
  `publishYear` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `pdf` varchar(255) DEFAULT NULL,
  `paid` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `status`, `isbn`, `publisherName`, `publishYear`, `photo`, `pdf`, `paid`, `price`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(31, 'HTML Basic', 'John Smith', 'Available', '978100000001', 'Tech Publisher', '2021', '/booksphoto/html.jpg', 'html.pdf', 1, 300, 4, '2026-04-06 15:25:50', '2026-05-18 04:50:30'),
(32, 'JAVA Programing language', 'Y.daniel liang', 'Available', '9780135166307', 'Oracle Press', '2021', '/booksphoto/Screenshot 2026-04-06 210453.png', 'Java Text - Liang.pdf', 0, 0, 2, '2026-04-06 15:35:55', '2026-04-06 15:35:55'),
(33, 'My English Book One', 'R.K. Gupta', 'Available', '978100000013', 'Bright kids Publications', '2020', '/booksphoto/Screenshot 2026-04-06 210933.png', 'kids.pdf', 1, 150, 10, '2026-04-06 15:42:20', '2026-04-20 13:12:43'),
(34, 'A Bref History of time', 'Douglas Crockford', 'Available', '9780143031031', 'Signat Press', '1947', '/booksphoto/Screenshot 2026-04-06 211727.png', 'history.pdf', 1, 500, 3, '2026-04-06 15:49:30', '2026-04-06 15:49:30'),
(35, 'Smart Quation Bank', 'S.Chand Experts', 'Available', '978100000014', 'S.Chand', '2022', '/booksphoto/Screenshot 2026-04-06 212304.png', 'exam.pdf', 1, 350, 8, '2026-04-06 15:56:10', '2026-05-18 04:50:56'),
(36, 'Balkumari', 'Suman kumari', 'Available', '978100000015', 'Bal Vikas Publication', '2019', '/booksphoto/Screenshot 2026-04-06 213403.png', 'Bal Kumari hindi.pdf', 0, 0, 13, '2026-04-06 16:06:19', '2026-04-06 16:06:19'),
(37, 'math', 'R.D.sharma', 'Available', '97800000016', 'Dhanpat rai publication', '2020', '/booksphoto/Screenshot 2026-04-06 214457.png', 'math.pdf', 1, 480, 5, '2026-04-06 16:15:30', '2026-04-06 16:15:30'),
(38, 'Business Environment', 'Francis Cherunilam', 'Available', '978100000018', 'Himalaya Publishing House', '2020', '/booksphoto/Screenshot 2026-04-06 214749.png', 'bussiness.pdf', 1, 380, 12, '2026-04-06 16:20:27', '2026-04-06 16:20:27'),
(39, 'Computer Science Fundamentals', 'P.K.Sinha', 'Available', '978100000020', 'BPB Publication', '2020', '/booksphoto/Screenshot 2026-04-06 225047.png', 'COMPUTER science.pdf', 1, 480, 1, '2026-04-06 17:22:59', '2026-05-17 12:57:20'),
(40, 'Basic Motivation and Human Behavior', 'Norman vincent Peale', 'Available', '9780743234801', 'Simon & Schuster', '2003', '/booksphoto/Screenshot 2026-04-06 230106.png', 'motivation.pdf', 1, 450, 9, '2026-04-06 17:31:31', '2026-04-06 17:31:31'),
(41, 'Python Programming: An Introduction to Computer Science', 'John M. Zelle', 'Available', '9781590282755', 'Franklin, Beedle & Associates', '2016', '/booksphoto/Screenshot 2026-04-22 234315.png', 'python.pdf', NULL, 500, 2, '2026-04-22 18:23:43', '2026-04-22 18:23:43'),
(42, 'Computer Science: An Overview', 'Dennis Brylow', 'Available', '9780133760064', 'Tom Johnson', '2024', '/booksphoto/Screenshot 2026-04-23 002802.png', 'sample.pdf', NULL, 340, 1, '2026-04-22 18:59:10', '2026-04-22 18:59:10'),
(43, 'The History of India', 'John McLeod', 'Available', '9781610697651', 'Greenwood', '2015', '/booksphoto/Screenshot 2026-04-23 003415.png', 'history.pdf', NULL, 660, 3, '2026-04-22 19:06:30', '2026-04-22 19:06:30'),
(44, 'A History of India, Third Edition', 'Hermann Kulke and Dietmar Rothermund', 'Available', '9781610697659', 'John McLeod', '2012', '/booksphoto/Screenshot 2026-04-23 003818.png', 'A History of India.pdf', NULL, 0, 3, '2026-04-22 19:12:29', '2026-04-22 19:12:29'),
(45, 'Communication Skills -- II', 'Prof. B. V. Pathak', 'Available', '9789387686175', 'Repro India Limited / Nirali Prakashan', '2024', '/booksphoto/Screenshot 2026-05-17 171651.png', 'Communication-Skills-II.pdf', NULL, 300, 7, '2026-05-17 11:52:34', '2026-05-17 11:52:34'),
(46, 'English grammer', 'P.C. Wren & H. Martin', 'Available', '9780199457069', 'S. Chand', '2009', '/booksphoto/Screenshot 2026-05-17 172412.png', 'Free-English-Grammar.pdf', NULL, 450, 7, '2026-05-17 11:57:10', '2026-05-17 11:57:10'),
(48, 'The Race of My Life', 'Milkha Singh with Sonia Sanwalka', 'Available', '9788129129107', 'Rupa Publications', '2013', '/booksphoto/Screenshot 2026-05-17 184032.png', 'The Race of My Life_ An Autobiography ( PDFDrive ).pdf', NULL, 350, 14, '2026-05-17 13:14:06', '2026-05-17 13:14:06'),
(49, 'DR. A.P.J. ABDUL KALAM: BIOGRAPHY OF A SAINTLY SCIENTIST', 'A.k .Gandhi', 'Available', '9788173711466', 'A.P.J.Abdul Kalam', '1999', '/booksphoto/Screenshot 2026-05-17 184702.png', 'My_Journey_Transforming_Dreams_Into_Actions.pdf', NULL, 250, 14, '2026-05-17 13:19:04', '2026-05-17 13:19:04');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `courseId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `courseId`, `createdAt`, `updatedAt`) VALUES
(1, 'CSE', 2, '2026-03-02 11:42:49', '2026-03-02 11:42:49'),
(2, 'MCA', 1, '2026-03-02 11:43:00', '2026-03-02 11:43:00'),
(3, 'BCA', 3, '2026-03-06 10:52:15', '2026-03-06 10:52:15'),
(4, 'IT', 6, '2026-04-03 07:48:07', '2026-04-03 07:48:07'),
(5, 'IT', 5, '2026-04-04 16:39:25', '2026-04-04 16:39:25'),
(6, 'Marketing', 8, '2026-04-05 16:19:55', '2026-04-05 16:19:55'),
(7, 'MBA', 10, '2026-04-15 06:23:51', '2026-04-15 06:23:51'),
(8, 'M.Sc', 9, '2026-05-17 18:34:34', '2026-05-17 18:34:34'),
(9, 'M.Com', 11, '2026-05-17 18:35:43', '2026-05-17 18:35:43');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Computer Science', '2026-03-02 11:42:03', '2026-03-02 11:42:03'),
(2, 'Programming', '2026-04-02 06:38:49', '2026-04-02 06:38:49'),
(3, 'History', '2026-04-02 06:39:13', '2026-04-02 06:39:13'),
(4, 'Web development', '2026-04-02 07:30:29', '2026-04-02 07:30:29'),
(5, 'Mathematics', '2026-04-02 07:32:06', '2026-04-02 07:32:06'),
(7, 'English', '2026-04-02 07:33:37', '2026-04-02 07:33:37'),
(8, 'competitive exam', '2026-04-02 07:33:49', '2026-04-02 07:33:49'),
(9, 'Motivational', '2026-04-02 07:34:37', '2026-04-02 07:34:37'),
(10, 'Children', '2026-04-03 07:28:05', '2026-04-03 07:28:05'),
(11, 'General Knowledge ', '2026-04-03 07:29:25', '2026-04-03 07:29:25'),
(12, 'Business', '2026-04-03 07:29:58', '2026-04-03 07:29:58'),
(13, 'Hindi', '2026-06-03 07:29:58', '2026-04-06 07:29:58'),
(14, 'Biography', '2026-04-20 13:14:14', '2026-04-20 13:14:14'),
(15, 'punjabi', '2026-05-18 07:15:34', '2026-05-18 07:15:34');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `degreeId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `degreeId`, `createdAt`, `updatedAt`) VALUES
(1, 'MCA', 1, '2026-03-02 11:42:26', '2026-03-02 11:42:26'),
(2, 'B.Tech', 2, '2026-03-02 11:42:36', '2026-03-02 11:42:36'),
(3, 'BCA', 2, '2026-03-06 10:52:07', '2026-03-06 10:52:07'),
(5, 'B.Voc', 2, '2026-04-03 07:43:22', '2026-04-03 07:43:22'),
(6, 'B.Sc', 2, '2026-04-03 07:47:46', '2026-04-03 07:47:46'),
(8, 'B.Com', 2, '2026-04-05 16:18:32', '2026-04-05 16:18:32'),
(9, 'M.Sc', 1, '2026-04-15 06:18:54', '2026-04-15 06:18:54'),
(10, 'MBA', 1, '2026-04-15 06:21:37', '2026-04-15 06:21:37'),
(11, 'M.Com', 1, '2026-04-15 06:26:19', '2026-04-15 06:26:19');

-- --------------------------------------------------------

--
-- Table structure for table `degrees`
--

CREATE TABLE `degrees` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `degrees`
--

INSERT INTO `degrees` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'PG', '2026-03-02 11:42:11', '2026-03-02 11:42:11'),
(2, 'UG', '2026-03-02 11:42:16', '2026-03-02 11:42:16'),
(3, 'Diploma ', '2026-04-02 07:24:03', '2026-04-02 07:24:03');

-- --------------------------------------------------------

--
-- Table structure for table `issue_books`
--

CREATE TABLE `issue_books` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  `issuedAt` datetime NOT NULL,
  `dueDate` datetime NOT NULL,
  `returnedAt` datetime DEFAULT NULL,
  `status` enum('Issued','Returned','Overdue','Lost') DEFAULT 'Issued',
  `fineAmount` decimal(10,2) DEFAULT '0.00',
  `finePaid` tinyint(1) DEFAULT '0',
  `paymentMode` enum('Cash','UPI','Card','Online') DEFAULT NULL,
  `transactionId` varchar(255) DEFAULT NULL,
  `paidAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `issue_books`
--

INSERT INTO `issue_books` (`id`, `userId`, `bookId`, `issuedAt`, `dueDate`, `returnedAt`, `status`, `fineAmount`, `finePaid`, `paymentMode`, `transactionId`, `paidAt`, `createdAt`, `updatedAt`) VALUES
(20, 5, 33, '2026-04-08 18:30:00', '2026-04-13 18:30:00', '2026-04-20 13:12:43', 'Returned', 70.00, 1, 'Cash', '60', '2026-04-20 13:12:43', '2026-04-15 06:02:42', '2026-04-20 13:12:43'),
(21, 7, 39, '2026-04-19 18:30:00', '2026-04-26 18:30:00', '2026-05-17 12:57:20', 'Returned', 210.00, 1, 'Online', '12345', '2026-05-17 12:57:20', '2026-04-28 15:58:16', '2026-05-17 12:57:20');

-- --------------------------------------------------------

--
-- Table structure for table `librarians`
--

CREATE TABLE `librarians` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `librarians`
--

INSERT INTO `librarians` (`id`, `name`, `email`, `password`, `gender`, `date`, `status`, `createdAt`, `updatedAt`) VALUES
(5, 'Suhani', 'suhani30957@gmail.com', '123', 'Female', '2026-04-02 00:00:00', 'Active', '2026-04-02 05:57:00', '2026-04-12 15:47:09'),
(6, 'Neha', 'nehanehaasr1812@gmail.com', '123', 'Female', '2026-04-02 00:00:00', 'Active', '2026-04-02 06:50:21', '2026-04-12 15:47:56');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `payment_status` varchar(20) DEFAULT 'pending',
  `access_type` varchar(20) DEFAULT 'lifetime',
  `transaction_id` int DEFAULT NULL,
  `purchased_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `user_id`, `book_id`, `payment_status`, `access_type`, `transaction_id`, `purchased_at`, `createdAt`, `updatedAt`) VALUES
(16, 5, 34, 'success', 'lifetime', 19, '2026-04-22 04:15:16', '2026-04-22 04:15:16', '2026-04-22 04:15:16'),
(18, 7, 34, 'success', 'lifetime', 21, '2026-04-28 16:05:42', '2026-04-28 16:05:42', '2026-04-28 16:05:42'),
(19, 10, 42, 'success', 'lifetime', 22, '2026-05-16 15:20:28', '2026-05-16 15:20:28', '2026-05-16 15:20:28'),
(24, 11, 37, 'success', 'lifetime', 27, '2026-05-17 12:28:32', '2026-05-17 12:28:32', '2026-05-17 12:28:32'),
(25, 11, 33, 'success', 'lifetime', 28, '2026-05-17 12:31:31', '2026-05-17 12:31:31', '2026-05-17 12:31:31'),
(27, 12, 39, 'success', 'lifetime', 30, '2026-05-18 05:18:21', '2026-05-18 05:18:21', '2026-05-18 05:18:21'),
(28, 12, 39, 'success', 'lifetime', 31, '2026-05-18 05:18:37', '2026-05-18 05:18:37', '2026-05-18 05:18:37'),
(29, 12, 39, 'success', 'lifetime', 32, '2026-05-18 05:18:38', '2026-05-18 05:18:38', '2026-05-18 05:18:38'),
(30, 12, 39, 'success', 'lifetime', 33, '2026-05-18 05:18:38', '2026-05-18 05:18:38', '2026-05-18 05:18:38'),
(31, 5, 39, 'success', 'lifetime', 34, '2026-05-18 07:13:37', '2026-05-18 07:13:37', '2026-05-18 07:13:37'),
(32, 5, 39, 'success', 'lifetime', 35, '2026-05-18 07:13:39', '2026-05-18 07:13:39', '2026-05-18 07:13:39');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  `amount` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `userId`, `bookId`, `amount`, `createdAt`, `updatedAt`) VALUES
(19, 5, 34, 500, '2026-04-22 04:15:16', '2026-04-22 04:15:16'),
(20, 5, 39, 480, '2026-04-22 05:58:18', '2026-04-22 05:58:18'),
(21, 7, 34, 500, '2026-04-28 16:05:42', '2026-04-28 16:05:42'),
(22, 10, 42, 340, '2026-05-16 15:20:28', '2026-05-16 15:20:28'),
(23, 5, 42, 340, '2026-05-16 15:24:47', '2026-05-16 15:24:47'),
(24, 5, 42, 340, '2026-05-16 18:03:28', '2026-05-16 18:03:28'),
(25, 5, 42, 340, '2026-05-16 18:03:54', '2026-05-16 18:03:54'),
(26, 5, 42, 340, '2026-05-16 18:04:30', '2026-05-16 18:04:30'),
(27, 11, 37, 480, '2026-05-17 12:28:32', '2026-05-17 12:28:32'),
(28, 11, 33, 150, '2026-05-17 12:31:31', '2026-05-17 12:31:31'),
(29, 5, 6, 200, '2026-05-17 13:01:29', '2026-05-17 13:01:29'),
(30, 12, 39, 480, '2026-05-18 05:18:21', '2026-05-18 05:18:21'),
(31, 12, 39, 480, '2026-05-18 05:18:37', '2026-05-18 05:18:37'),
(32, 12, 39, 480, '2026-05-18 05:18:38', '2026-05-18 05:18:38'),
(33, 12, 39, 480, '2026-05-18 05:18:38', '2026-05-18 05:18:38'),
(34, 5, 39, 480, '2026-05-18 07:13:37', '2026-05-18 07:13:37'),
(35, 5, 39, 480, '2026-05-18 07:13:39', '2026-05-18 07:13:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` int DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `branchId` int NOT NULL,
  `status` varchar(255) DEFAULT 'Active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `gender`, `mobile`, `address`, `city`, `state`, `zip`, `photo`, `branchId`, `status`, `createdAt`, `updatedAt`) VALUES
(3, 'Suhani', 'suhani30957@gmail.com', 'suhani123', 'Female', '1234567890', 'mali gali', 'amritsar', 'punjab', 143001, '/user/avatar.png', 3, 'Active', '2026-04-02 06:03:28', '2026-04-02 06:03:28'),
(5, 'Neha', 'nehanehaasr1812@gmail.com', '123', 'Female', '1234554321', 'mohkampura', 'Amritsar', 'Punjab', 143001, '/user/girl avtar.jpg', 3, 'Active', '2026-04-02 07:01:19', '2026-04-02 07:18:20'),
(6, 'Prabh', 'prabhjyotkaurp477@gmail.com', 'prabh123', 'Female', '5435476234', 'Majitha road', 'Amritsar', 'Punjab', 143001, '/user/prabh.jpg', 3, 'Active', '2026-04-02 07:44:31', '2026-04-02 07:44:31'),
(7, 'Amit', 'aak524025@gmail.com', 'pQhQNVj0', 'Male', '2345654323', 'Krishna Nagar', 'amritsar', 'Punjab', 143001, '/user/amit.jpg', 4, 'Active', '2026-04-03 07:52:31', '2026-04-03 07:52:31'),
(8, 'Ankit', 'kumarankit73970@gmail.com', 'GyviFbrV', 'Male', '5432456789', 'Krishna Nagar', 'Amritsar', 'Punjab', 143001, '/user/ankit.jpg', 6, 'Active', '2026-04-05 16:22:48', '2026-04-05 16:22:48'),
(9, 'Neha', 'nehaasr1812@gmail.com', 'nIBKJOWX', 'Female', '3456734567', 'Mohkampura', 'Amritsar', 'Punjab', 143001, '/user/girl avtar.jpg', 5, 'Active', '2026-04-05 16:24:37', '2026-04-05 16:24:37'),
(10, 'neha', 'neha@gmail.com', '123', 'Female', '8591174987', 'mohkampura', 'punjab', 'amritsar', 43001, NULL, 2, 'Active', '2026-05-16 15:07:08', '2026-05-16 15:07:08'),
(11, 'pari', 'pari@gmail.com', '123', 'Female', '8591174987', 'mohkampura', 'punjab', 'amritsar', 143001, NULL, 2, 'Active', '2026-05-16 15:09:49', '2026-05-16 15:09:49'),
(12, 'Ridhima', 'ridhima21@gmail.com', '123', 'Female', '987654321', 'laxmi vihar ', 'Amritsar ', 'punjab', 143001, NULL, 3, 'Active', '2026-05-18 05:16:42', '2026-05-18 05:16:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `degreeId` (`degreeId`);

--
-- Indexes for table `degrees`
--
ALTER TABLE `degrees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `issue_books`
--
ALTER TABLE `issue_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `issue_books_user_id` (`userId`),
  ADD KEY `issue_books_book_id` (`bookId`),
  ADD KEY `issue_books_status` (`status`),
  ADD KEY `issue_books_due_date` (`dueDate`);

--
-- Indexes for table `librarians`
--
ALTER TABLE `librarians`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branchId` (`branchId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=382;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `degrees`
--
ALTER TABLE `degrees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `issue_books`
--
ALTER TABLE `issue_books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `librarians`
--
ALTER TABLE `librarians`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `branches`
--
ALTER TABLE `branches`
  ADD CONSTRAINT `branches_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`degreeId`) REFERENCES `degrees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issue_books`
--
ALTER TABLE `issue_books`
  ADD CONSTRAINT `issue_books_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_books_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `fk_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  ADD CONSTRAINT `purchases_ibfk_3` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
