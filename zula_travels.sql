-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2026 at 04:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zula_travels`
--

-- --------------------------------------------------------

--
-- Table structure for table `airlines`
--

CREATE TABLE `airlines` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `airport_transfers`
--

CREATE TABLE `airport_transfers` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `vehicle_type` varchar(100) DEFAULT NULL,
  `pickup_location` varchar(255) DEFAULT NULL,
  `dropoff_location` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `description` text DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airport_transfers`
--

INSERT INTO `airport_transfers` (`id`, `destination_id`, `name`, `vehicle_type`, `pickup_location`, `dropoff_location`, `price`, `currency`, `description`, `provider_id`, `created_at`) VALUES
(1, 1, 'Entebbe Airport Transfer', 'SUV', 'Entebbe International Airport', 'Kampala City', 45.00, 'USD', 'Private airport pickup service', NULL, '2026-06-08 15:48:16'),
(2, 1, 'Luxury Airport Transfer', 'Executive SUV', 'Entebbe International Airport', 'Kampala Serena Hotel', 80.00, 'USD', 'Premium executive transfer', NULL, '2026-06-08 15:48:16');

-- --------------------------------------------------------

--
-- Table structure for table `ai_knowledge`
--

CREATE TABLE `ai_knowledge` (
  `id` int(11) NOT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `keywords` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `availability`
--

CREATE TABLE `availability` (
  `id` int(11) NOT NULL,
  `service_type` enum('hotel_room','car','tour','venue') DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `available_date` date DEFAULT NULL,
  `available_quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `booking_date` datetime DEFAULT current_timestamp(),
  `status` enum('pending','confirmed','checked_in','completed','cancelled') NOT NULL DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `check_in` date DEFAULT NULL,
  `check_out` date DEFAULT NULL,
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `booking_date`, `status`, `total_amount`, `currency`, `hotel_id`, `vendor_id`, `check_in`, `check_out`, `payment_status`) VALUES
(1, 1, '2025-12-18 14:50:59', 'pending', 450.00, 'USD', NULL, NULL, NULL, NULL, 'pending'),
(2, 2, '2026-04-23 19:54:33', 'pending', 100.00, 'USD', 16, NULL, '2026-04-20', '2026-04-22', 'pending'),
(3, 2, '2026-04-23 20:10:13', 'pending', 100.00, 'USD', 16, NULL, '2026-04-20', '2026-04-22', 'pending'),
(4, 2, '2026-04-23 20:14:39', 'pending', 100.00, 'USD', 16, NULL, '2026-04-20', '2026-04-22', 'pending'),
(5, 2, '2026-05-21 15:05:02', 'pending', 100.00, 'USD', 16, NULL, '2026-04-20', '2026-04-22', 'pending'),
(6, 2, '2026-05-21 15:20:19', 'pending', 100.00, 'USD', 16, NULL, '2026-04-20', '2026-04-22', 'pending'),
(7, 2, '2026-05-21 15:40:44', 'pending', 100.00, 'USD', 16, NULL, '2026-04-20', '2026-04-22', 'pending'),
(8, 2, '2026-06-01 16:30:55', 'cancelled', 100.00, 'USD', 16, NULL, '2026-06-15', '2026-06-18', 'pending'),
(9, 1, '2026-06-14 13:19:52', 'pending', 500.00, 'USD', 22, 1, '2026-07-01', '2026-07-05', 'pending'),
(10, 1, '2026-06-15 15:35:35', 'pending', 480.00, 'USD', 22, 1, '2026-07-01', '2026-07-05', 'pending'),
(11, 1, '2026-06-15 16:34:18', 'confirmed', 240.00, 'USD', 22, 1, '2026-07-01', '2026-07-03', 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `booking_audit`
--

CREATE TABLE `booking_audit` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `table_name` varchar(50) DEFAULT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `change_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `booking_items`
--

CREATE TABLE `booking_items` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `service_type` enum('hotel_room','flight','car_hire','venue','tour') NOT NULL,
  `service_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_items`
--

INSERT INTO `booking_items` (`id`, `booking_id`, `service_type`, `service_id`, `quantity`, `unit_price`, `start_date`, `end_date`, `hotel_id`, `vendor_id`) VALUES
(2, 1, 'hotel_room', 1, 3, 150.00, '2025-01-10', '2025-01-13', NULL, NULL),
(3, 5, 'hotel_room', 0, 1, 100.00, NULL, NULL, 16, NULL),
(4, 6, 'hotel_room', 0, 1, 100.00, NULL, NULL, 16, NULL),
(5, 7, 'hotel_room', 0, 1, 100.00, NULL, NULL, 16, NULL),
(6, 8, 'hotel_room', 0, 1, 100.00, NULL, NULL, 16, NULL),
(7, 8, 'hotel_room', 4, 1, 280.00, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `make` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `plate_number` varchar(50) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `seating_capacity` int(11) DEFAULT NULL,
  `transmission` enum('manual','automatic') NOT NULL DEFAULT 'manual',
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category` varchar(50) DEFAULT 'SUV',
  `available_quantity` int(11) DEFAULT 1,
  `fuel_type` varchar(20) DEFAULT 'Petrol',
  `engine_capacity` varchar(20) DEFAULT NULL,
  `features` text DEFAULT NULL,
  `driver_included` tinyint(1) DEFAULT 0,
  `daily_rate_with_driver` decimal(10,2) DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `destination_id`, `make`, `model`, `plate_number`, `year`, `seating_capacity`, `transmission`, `description`, `image_url`, `is_available`, `created_at`, `category`, `available_quantity`, `fuel_type`, `engine_capacity`, `features`, `driver_included`, `daily_rate_with_driver`, `provider_id`, `vendor_id`) VALUES
(1, 1, 'Toyota', 'Land Cruiser Prado', NULL, 2022, 7, 'manual', '4x4 safari vehicle suitable for long tours', '/assets/cars/prado.jpg', 1, '2025-12-31 12:38:28', 'SUV', 1, 'Diesel', NULL, NULL, 0, NULL, NULL, NULL),
(2, 1, 'Toyota', 'RAV4', NULL, 2021, 5, 'manual', 'Comfortable SUV for city and highway travel', '/assets/cars/rav4.jpg', 1, '2025-12-31 12:38:28', 'Sedan', 1, 'Diesel', NULL, NULL, 0, NULL, NULL, NULL),
(3, 2, 'Toyota', 'Hiace Van', NULL, 2020, 14, 'manual', 'Tour van ideal for groups and airport transfers', '/assets/cars/hiace.jpg', 1, '2025-12-31 12:38:28', 'Van', 1, 'Diesel', NULL, NULL, 0, NULL, NULL, NULL),
(4, 3, 'Nissan', 'X-Trail', NULL, 2019, 5, 'manual', 'Reliable mid-size SUV', '/assets/cars/xtrail.jpg', 1, '2025-12-31 12:38:28', 'Sedan', 1, 'Diesel', NULL, NULL, 0, NULL, NULL, NULL),
(5, 4, 'Toyota', 'Coaster Bus', NULL, 2018, 29, 'manual', 'Large bus for group tours and conferences', '/assets/cars/coaster.jpg', 1, '2025-12-31 12:38:28', 'Van', 1, 'Diesel', NULL, NULL, 0, NULL, NULL, NULL),
(6, 1, 'Toyota', 'Prado', 'UBK123A', 2022, 7, 'manual', NULL, NULL, 1, '2026-06-13 12:33:30', 'SUV', 1, 'Petrol', NULL, NULL, 0, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_type` varchar(50) NOT NULL,
  `service_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_type` enum('hotel_room','car_hire','tour','airport_transfer','restaurant') NOT NULL,
  `service_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `unit_price` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `service_type`, `service_id`, `quantity`, `unit_price`, `created_at`) VALUES
(1, 2, 'hotel_room', 4, 1, 280.00, '2026-06-08 19:28:23'),
(2, 2, 'hotel_room', 4, 1, 280.00, '2026-06-09 11:24:02');

-- --------------------------------------------------------

--
-- Table structure for table `car_bookings`
--

CREATE TABLE `car_bookings` (
  `id` int(11) NOT NULL,
  `booking_item_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `pricing_type` enum('dry','wet') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `car_hire_options`
--

CREATE TABLE `car_hire_options` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `includes_driver` tinyint(1) NOT NULL,
  `includes_fuel` tinyint(1) NOT NULL,
  `extra_cost` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `car_hire_rates`
--

CREATE TABLE `car_hire_rates` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `base_rate_per_day` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `available_quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_hire_rates`
--

INSERT INTO `car_hire_rates` (`id`, `car_id`, `base_rate_per_day`, `currency`, `available_quantity`) VALUES
(1, 1, 120.00, 'USD', 1),
(2, 2, 80.00, 'USD', 1),
(3, 3, 150.00, 'USD', 1),
(4, 4, 90.00, 'USD', 1),
(5, 5, 220.00, 'USD', 1);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `capital` varchar(100) DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `language` varchar(100) DEFAULT NULL,
  `visa_information` text DEFAULT NULL,
  `tourism_board` text DEFAULT NULL,
  `political_status` text DEFAULT NULL,
  `economy` text DEFAULT NULL,
  `culture` text DEFAULT NULL,
  `security_info` text DEFAULT NULL,
  `health_info` text DEFAULT NULL,
  `climate` text DEFAULT NULL,
  `travel_tips` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courier_bookings`
--

CREATE TABLE `courier_bookings` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) NOT NULL,
  `pickup_address` text NOT NULL,
  `dropoff_address` text NOT NULL,
  `pickup_coords` varchar(100) DEFAULT NULL,
  `dropoff_coords` varchar(100) DEFAULT NULL,
  `is_surprise` tinyint(1) DEFAULT 0,
  `receiver_name` varchar(255) DEFAULT NULL,
  `receiver_phone` varchar(20) DEFAULT NULL,
  `special_instructions` text DEFAULT NULL,
  `parcel_items` varchar(255) DEFAULT NULL,
  `estimated_distance_km` decimal(6,2) DEFAULT NULL,
  `estimated_delivery_time` datetime DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `payment_status` enum('Unpaid','Paid','Refunded') DEFAULT 'Unpaid',
  `payment_method` enum('MTN MoMo','Airtel Money','Cash','Visa','Flutterwave') DEFAULT NULL,
  `delivery_status` enum('Pending','Assigned','Picked Up','In Transit','Delivered','Cancelled') DEFAULT 'Pending',
  `tracking_id` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `current_location` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courier_bookings`
--

INSERT INTO `courier_bookings` (`id`, `customer_id`, `driver_id`, `vehicle_id`, `pickup_address`, `dropoff_address`, `pickup_coords`, `dropoff_coords`, `is_surprise`, `receiver_name`, `receiver_phone`, `special_instructions`, `parcel_items`, `estimated_distance_km`, `estimated_delivery_time`, `total_price`, `payment_status`, `payment_method`, `delivery_status`, `tracking_id`, `created_at`, `current_location`) VALUES
(1, 2, 4, 1, 'Kampala – Ntinda', 'Entebbe Airport', NULL, NULL, 0, NULL, NULL, 'Handle with care', 'Documents', NULL, NULL, 12000.00, 'Paid', 'MTN MoMo', 'In Transit', 'ZULA-TEST001', '2026-01-05 15:29:44', NULL),
(2, 3, NULL, 3, 'Makerere University', 'Bugolobi', NULL, NULL, 1, 'Mary', '0700554433', 'Surprise delivery, call before arrival', 'Birthday Gift', NULL, NULL, 30000.00, 'Unpaid', 'Cash', 'Pending', 'ZULA-TEST002', '2026-01-05 15:29:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `courier_fleet`
--

CREATE TABLE `courier_fleet` (
  `id` int(11) NOT NULL,
  `vehicle_name` varchar(100) NOT NULL,
  `vehicle_category` enum('Motorcycle','Car','Truck','Regional') NOT NULL,
  `base_fare` decimal(10,2) NOT NULL,
  `price_per_km` decimal(10,2) NOT NULL,
  `max_weight_kg` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courier_fleet`
--

INSERT INTO `courier_fleet` (`id`, `vehicle_name`, `vehicle_category`, `base_fare`, `price_per_km`, `max_weight_kg`, `image_url`, `is_available`) VALUES
(1, 'Boda Boda', 'Motorcycle', 5000.00, 1500.00, 20, '/assets/fleet/boda.jpg', 1),
(2, 'Motorcycle Express', 'Motorcycle', 7000.00, 1800.00, 25, '/assets/fleet/motorbike.jpg', 1),
(3, 'City Car', 'Car', 15000.00, 3000.00, 100, '/assets/fleet/car.jpg', 1),
(4, 'Van Delivery', 'Car', 25000.00, 4500.00, 500, '/assets/fleet/van.jpg', 1),
(5, 'Pickup Truck', 'Truck', 35000.00, 6000.00, 1000, '/assets/fleet/pickup.jpg', 1),
(6, 'Trailer / Cargo Truck', 'Regional', 60000.00, 10000.00, 5000, '/assets/fleet/trailer.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `courier_tracking`
--

CREATE TABLE `courier_tracking` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `status_update` varchar(255) NOT NULL,
  `current_location` text DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courier_tracking`
--

INSERT INTO `courier_tracking` (`id`, `booking_id`, `status_update`, `current_location`, `update_time`) VALUES
(1, 1, 'Package picked up', 'Ntinda', '2026-01-05 15:30:25'),
(2, 1, 'In transit', 'Entebbe Road', '2026-01-05 15:30:25'),
(3, 2, 'Booking created', 'System', '2026-01-05 15:30:25');

-- --------------------------------------------------------

--
-- Table structure for table `courier_users`
--

CREATE TABLE `courier_users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `user_role` enum('admin','customer','driver') DEFAULT 'customer',
  `vehicle_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `email_verified` tinyint(1) DEFAULT 0,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courier_users`
--

INSERT INTO `courier_users` (`id`, `full_name`, `email`, `password`, `phone`, `user_role`, `vehicle_id`, `is_active`, `email_verified`, `last_login`, `created_at`) VALUES
(1, 'Admin User', 'admin@zula.com', '$2b$10$hashedpassword', '0774488956', 'admin', NULL, 1, 0, NULL, '2026-01-05 15:27:14'),
(2, 'John Customer', 'john@example.com', '$2b$10$hashedpassword', '0700123456', 'customer', NULL, 1, 0, NULL, '2026-01-05 15:27:14'),
(3, 'Sarah Customer', 'sarah@example.com', '$2b$10$hashedpassword', '0700654321', 'customer', NULL, 1, 0, NULL, '2026-01-05 15:27:14'),
(4, 'Moses Rider', 'kasolo@zula.com', '$2b$10$hashedpassword', '0700789123', 'driver', 1, 1, 0, NULL, '2026-01-05 15:27:14'),
(5, 'Peter Rider', 'sseguya@zula.com', '$2b$10$hashedpassword', '0700998877', 'driver', 2, 1, 0, NULL, '2026-01-05 15:27:14'),
(6, 'Joshua Williams', 'joshua.w@zula.com', '$2b$10$DxD8UeTBIg7FQsM5MEdiXeZlavP8XxFBzYnCxzuCNO0QERESvT2nO', '0774488999', 'customer', NULL, 1, 0, NULL, '2026-05-30 15:36:42');

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `country` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `population` int(11) DEFAULT NULL,
  `history` longtext DEFAULT NULL,
  `economy` text DEFAULT NULL,
  `culture` text DEFAULT NULL,
  `security_info` text DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` varchar(500) DEFAULT NULL,
  `seo_keywords` text DEFAULT NULL,
  `hero_video_url` varchar(255) DEFAULT NULL,
  `hero_image` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `country`, `city`, `description`, `slug`, `latitude`, `longitude`, `population`, `history`, `economy`, `culture`, `security_info`, `seo_title`, `seo_description`, `seo_keywords`, `hero_video_url`, `hero_image`, `country_id`, `is_featured`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Uganda', 'Kampala', 'Capital city of Uganda', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'active', '2026-06-27 14:08:31', '2026-06-27 14:08:31'),
(2, 'Uganda', 'Entebbe', 'International airport city', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'active', '2026-06-27 14:08:31', '2026-06-27 14:08:31'),
(3, 'Uganda', 'Jinja', 'Source of the Nile', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'active', '2026-06-27 14:08:31', '2026-06-27 14:08:31'),
(4, 'Uganda', 'Mbarara', 'Western Uganda', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'active', '2026-06-27 14:08:31', '2026-06-27 14:08:31'),
(5, 'Uganda', 'Kabale', 'Lake Bunyonyi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'active', '2026-06-27 14:08:31', '2026-06-27 14:08:31'),
(6, 'Uganda', 'Kalangala', 'Ssese Islands', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'active', '2026-06-27 14:08:31', '2026-06-27 14:08:31');

-- --------------------------------------------------------

--
-- Table structure for table `destination_distances`
--

CREATE TABLE `destination_distances` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `place_id` int(11) NOT NULL,
  `place_type` enum('hospital','market','police','airport','shopping','attraction') DEFAULT NULL,
  `distance_km` decimal(6,2) DEFAULT NULL,
  `travel_time_minutes` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `destination_info`
--

CREATE TABLE `destination_info` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `block_type` enum('history','heritage','economy','transport','healthcare','education','religion','nightlife','security','shopping','tips') DEFAULT NULL,
  `content` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `license_number` varchar(100) DEFAULT NULL,
  `experience_years` int(11) DEFAULT 0,
  `languages` varchar(100) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `daily_rate` decimal(10,2) NOT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `full_name`, `phone`, `license_number`, `experience_years`, `languages`, `rating`, `daily_rate`, `is_available`, `is_active`, `created_at`) VALUES
(1, 'John Okello', '+256701234567', NULL, 8, NULL, NULL, 35.00, 1, 1, '2025-12-31 12:41:05'),
(2, 'Peter Ssemakula', '+256702345678', NULL, 5, NULL, NULL, 30.00, 1, 1, '2025-12-31 12:41:05'),
(3, 'David Mugisha', '+256703456789', NULL, 10, NULL, NULL, 40.00, 1, 1, '2025-12-31 12:41:05'),
(4, 'Michael Kato', '+256704567890', NULL, 6, NULL, NULL, 32.00, 1, 1, '2025-12-31 12:41:05'),
(5, 'Samuel Ochieng', '+256705678901', NULL, 12, NULL, NULL, 45.00, 1, 1, '2025-12-31 12:41:05');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `destination_id`, `name`, `description`, `start_date`, `end_date`, `venue`) VALUES
(1, 1, 'Kampala City Festival', 'Annual cultural festival', '2026-10-01', '2026-10-03', 'Kampala City Centre');

-- --------------------------------------------------------

--
-- Table structure for table `external_links`
--

CREATE TABLE `external_links` (
  `id` int(11) NOT NULL,
  `entity_type` enum('flight','hotel','tour') DEFAULT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `provider_name` varchar(100) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `affiliate_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `entity_type` enum('destination','hotel','tour','car','venue','courier','blog','platform') NOT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `financial_documents`
--

CREATE TABLE `financial_documents` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `document_type` enum('proforma_invoice','invoice','receipt','credit_note','debit_note','refund_note') NOT NULL,
  `document_number` varchar(100) DEFAULT NULL,
  `issue_date` datetime DEFAULT current_timestamp(),
  `amount` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `status` enum('draft','issued','paid','cancelled') DEFAULT 'issued',
  `pdf_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `financial_documents`
--

INSERT INTO `financial_documents` (`id`, `booking_id`, `payment_id`, `user_id`, `document_type`, `document_number`, `issue_date`, `amount`, `currency`, `status`, `pdf_url`, `created_at`) VALUES
(1, 11, 1, 1, 'invoice', 'INV-1781904226427', '2026-06-20 00:23:46', 240.00, 'USD', 'issued', NULL, '2026-06-19 21:23:46'),
(2, 11, 1, 1, 'receipt', 'REC-1781906178632', '2026-06-20 00:56:18', 240.00, 'USD', 'issued', NULL, '2026-06-19 21:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` int(11) NOT NULL,
  `origin_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `airline_id` int(11) DEFAULT NULL,
  `airline` varchar(100) DEFAULT NULL,
  `flight_number` varchar(50) DEFAULT NULL,
  `flight_type` enum('domestic','international') NOT NULL,
  `departure_time` datetime NOT NULL,
  `arrival_time` datetime NOT NULL,
  `duration_minutes` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `seats_total` int(11) NOT NULL,
  `seats_available` int(11) NOT NULL,
  `aircraft_type` varchar(50) DEFAULT NULL,
  `total_capacity` int(11) DEFAULT NULL,
  `estimated_available_seats` int(11) DEFAULT NULL,
  `status` enum('scheduled','delayed','cancelled') DEFAULT 'scheduled',
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `origin_id`, `destination_id`, `airline_id`, `airline`, `flight_number`, `flight_type`, `departure_time`, `arrival_time`, `duration_minutes`, `price`, `currency`, `seats_total`, `seats_available`, `aircraft_type`, `total_capacity`, `estimated_available_seats`, `status`, `last_updated`) VALUES
(1, 1, 2, NULL, 'Uganda Airlines', 'UR123', 'domestic', '2026-03-20 08:00:00', '2026-03-20 09:00:00', NULL, 150.00, 'USD', 100, 100, NULL, NULL, NULL, 'scheduled', '2026-03-22 20:49:03');

-- --------------------------------------------------------

--
-- Table structure for table `flight_price_history`
--

CREATE TABLE `flight_price_history` (
  `id` int(11) NOT NULL,
  `flight_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `recorded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `destination_id`, `name`, `address`, `rating`, `description`, `provider_id`, `vendor_id`) VALUES
(16, 1, 'Kampala Serena Hotel', 'Kintu Road, Kampala', 5.0, 'Luxury 5-star hotel', NULL, 1),
(17, 1, 'Sheraton Kampala Hotel', 'Ternan Avenue, Kampala', 4.8, 'Premium city hotel', NULL, 1),
(18, 1, 'Africana Hotel Kampala', 'Jinja Road, Kampala', 4.2, 'Affordable comfort', NULL, 1),
(19, 2, 'Protea Hotel Entebbe', 'Victoria Mall, Entebbe', 4.6, 'Lakefront hotel', NULL, 1),
(20, 6, 'Brovad Sands Lodge', 'Kalangala Island', 4.4, 'Beach resort', NULL, 1),
(22, 1, 'Hakim Safari Lodge', 'Entebbe Road', 4.7, 'Luxury safari experience', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hotel_rooms`
--

CREATE TABLE `hotel_rooms` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `room_type` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `available_quantity` int(11) DEFAULT 0,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotel_rooms`
--

INSERT INTO `hotel_rooms` (`id`, `hotel_id`, `room_type`, `capacity`, `price_per_night`, `currency`, `available_quantity`, `description`) VALUES
(4, 16, 'Deluxe Room', 2, 280.00, 'USD', 20, 'Elegant deluxe room with city view'),
(5, 16, 'Executive Suite', 3, 450.00, 'USD', 10, 'Luxury executive suite'),
(6, 17, 'Classic Room', 2, 240.00, 'USD', 25, 'Modern classic room'),
(7, 17, 'Club Suite', 3, 380.00, 'USD', 12, 'Premium club-level suite'),
(8, 18, 'Standard Room', 2, 120.00, 'USD', 30, 'Affordable and comfortable'),
(9, 18, 'Business Room', 2, 180.00, 'USD', 15, 'Ideal for business travelers'),
(10, 19, 'Lake View Room', 2, 260.00, 'USD', 18, 'Scenic lakefront room'),
(11, 19, 'Family Room', 4, 340.00, 'USD', 8, 'Spacious family room'),
(12, 20, 'Beach Chalet', 2, 220.00, 'USD', 14, 'Private beach chalet'),
(13, 20, 'Honeymoon Suite', 2, 300.00, 'USD', 6, 'Romantic lakeside suite'),
(14, 22, 'Deluxe Room', 2, 120.00, 'USD', 10, 'Luxury room with lake view');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `entity_type` enum('hotel','tour_package','destination','car','venue','place','flight') DEFAULT NULL,
  `entity_id` int(11) NOT NULL,
  `media_type` enum('image','video') NOT NULL,
  `url` varchar(500) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `national_parks`
--

CREATE TABLE `national_parks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `wildlife` text DEFAULT NULL,
  `entry_fee` decimal(10,2) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nearby_airports`
--

CREATE TABLE `nearby_airports` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `airport_name` varchar(255) DEFAULT NULL,
  `iata_code` varchar(10) DEFAULT NULL,
  `distance_km` decimal(6,2) DEFAULT NULL,
  `transport_options` text DEFAULT NULL,
  `booking_links` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(50) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `method` varchar(50) DEFAULT NULL,
  `status` enum('pending','paid','failed') NOT NULL,
  `payment_date` datetime DEFAULT current_timestamp(),
  `transaction_id` varchar(255) DEFAULT NULL,
  `gateway_reference` varchar(255) DEFAULT NULL,
  `gateway_response` text DEFAULT NULL,
  `provider` enum('mtn_momo','airtel','visa','flutterwave') DEFAULT NULL,
  `payment_channel` varchar(50) DEFAULT NULL,
  `reference` text DEFAULT NULL,
  `gross_amount` decimal(10,2) DEFAULT NULL,
  `commission_amount` decimal(10,2) DEFAULT NULL,
  `vendor_amount` decimal(10,2) DEFAULT NULL,
  `settled_to_vendor` tinyint(1) DEFAULT 0,
  `settlement_date` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `booking_id`, `user_id`, `customer_name`, `customer_phone`, `customer_email`, `amount`, `currency`, `method`, `status`, `payment_date`, `transaction_id`, `gateway_reference`, `gateway_response`, `provider`, `payment_channel`, `reference`, `gross_amount`, `commission_amount`, `vendor_amount`, `settled_to_vendor`, `settlement_date`, `notes`) VALUES
(1, 11, 1, NULL, NULL, NULL, 240.00, 'USD', 'cash', 'paid', '2026-06-20 00:23:46', 'PAY-1781904226420', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment_transactions`
--

CREATE TABLE `payment_transactions` (
  `id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `transaction_type` enum('payment','refund','commission','vendor_payout') DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `places_of_interest`
--

CREATE TABLE `places_of_interest` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` enum('attraction','hospital','bank','restaurant','hotel','school','university','religious','police','market','shopping','nightlife') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `opening_hours` varchar(100) DEFAULT NULL,
  `is_featured` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pricing_rules`
--

CREATE TABLE `pricing_rules` (
  `id` int(11) NOT NULL,
  `service_type` enum('hotel','car','tour') DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `rule_type` enum('discount','seasonal','promo') DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `value_type` enum('percent','fixed') DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `category` enum('hotel','tour','car','restaurant','flight','transfer','event') NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(250) DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(12,2) DEFAULT 0.00,
  `currency` varchar(10) DEFAULT 'USD',
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `status` enum('draft','pending','approved','rejected') DEFAULT 'draft',
  `featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `is_cover` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_inventory`
--

CREATE TABLE `product_inventory` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `available_quantity` int(11) DEFAULT 0,
  `booked_quantity` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes`
--

CREATE TABLE `promo_codes` (
  `id` int(11) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_to` date DEFAULT NULL,
  `max_usage` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `business_type` enum('hotel','tour_company','restaurant','bar','car_rental','venue') NOT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `providers`
--

INSERT INTO `providers` (`id`, `name`, `business_type`, `contact_email`, `contact_phone`, `address`, `description`, `is_verified`, `created_at`) VALUES
(1, 'Hakim Tours Ltd', 'tour_company', 'vendor@test.com', '0771234567', NULL, NULL, 0, '2026-06-13 09:48:18');

-- --------------------------------------------------------

--
-- Table structure for table `provider_ai_settings`
--

CREATE TABLE `provider_ai_settings` (
  `id` int(11) NOT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `auto_pricing` tinyint(1) DEFAULT 0,
  `auto_response` tinyint(1) DEFAULT 1,
  `smart_recommendation` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cuisine_type` varchar(100) DEFAULT NULL,
  `price_range` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `destination_id`, `name`, `cuisine_type`, `price_range`, `description`, `rating`, `provider_id`, `address`, `phone`, `email`, `website`, `image_url`, `opening_hours`, `is_active`, `created_at`, `vendor_id`) VALUES
(1, 1, 'Cafe Javas', 'International', '$$', 'Popular family restaurant', 4.5, NULL, 'Kampala Road', '+256700000001', NULL, NULL, '/assets/restaurants/cafe-javas.jpg', NULL, 1, '2026-06-08 15:20:21', NULL),
(2, 1, 'Khana Khazana', 'Indian', '$$$', 'Authentic Indian cuisine', 4.8, NULL, 'Acacia Mall Kampala', '+256700000002', NULL, NULL, '/assets/restaurants/khana-khazana.jpg', NULL, 1, '2026-06-08 15:20:21', NULL),
(3, 1, 'The Lawns Restaurant', 'Continental', '$$$$', 'Fine dining experience', 4.9, NULL, 'Speke Road Kampala', '+256700000003', NULL, NULL, '/assets/restaurants/lawns.jpg', NULL, 1, '2026-06-08 15:20:21', NULL),
(4, 1, 'Hakim Restaurant', 'African', '$$', 'Traditional Ugandan cuisine', 4.5, NULL, 'Kampala Road', '0771234567', 'restaurant@test.com', NULL, NULL, NULL, 1, '2026-06-13 18:14:56', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `entity_type` enum('hotel','tour','car','destination') DEFAULT NULL,
  `entity_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'admin'),
(2, 'customer'),
(5, 'driver');

-- --------------------------------------------------------

--
-- Table structure for table `search_logs`
--

CREATE TABLE `search_logs` (
  `id` int(11) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `entity_type` enum('destination','hotel','tour','car','venue','courier','blog','flight_info') DEFAULT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `user_ip` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `results_count` int(11) DEFAULT 0,
  `searched_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `surprise`
--

CREATE TABLE `surprise` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `includes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`includes`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `id` int(11) NOT NULL,
  `slug` varchar(150) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `full_description` longtext DEFAULT NULL,
  `duration_days` int(11) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `hero_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `destination_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `slug`, `title`, `short_description`, `full_description`, `duration_days`, `location`, `hero_image`, `created_at`, `destination_id`) VALUES
(1, 'murchison-falls-safari', 'Murchison Falls Safari', '3 Day wildlife safari', 'Experience game drives, boat cruise and Murchison Falls.', 3, NULL, NULL, '2026-06-07 20:21:10', 1),
(2, 'queen-elizabeth-safari', 'Queen Elizabeth National Park', '4 Day safari adventure', 'Game drives, boat cruise and tree climbing lions.', 4, NULL, NULL, '2026-06-07 20:21:10', NULL),
(3, 'gorilla-trekking', 'Bwindi Gorilla Trekking', '2 Day gorilla experience', 'Track mountain gorillas in Bwindi Impenetrable Forest.', 2, NULL, NULL, '2026-06-07 20:21:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tour_itinerary_days`
--

CREATE TABLE `tour_itinerary_days` (
  `id` int(11) NOT NULL,
  `tour_package_id` int(11) NOT NULL,
  `day_number` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `meals_included` varchar(50) DEFAULT NULL,
  `accommodation` varchar(255) DEFAULT NULL,
  `activities` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tour_packages`
--

CREATE TABLE `tour_packages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_destination_id` int(11) NOT NULL,
  `end_destination_id` int(11) NOT NULL,
  `duration_days` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `description` text DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `inclusions` longtext DEFAULT NULL,
  `exclusions` longtext DEFAULT NULL,
  `itinerary` longtext DEFAULT NULL,
  `difficulty` enum('easy','moderate','hard') DEFAULT NULL,
  `min_people` int(11) DEFAULT 1,
  `max_people` int(11) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` varchar(500) DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tour_packages`
--

INSERT INTO `tour_packages` (`id`, `name`, `start_destination_id`, `end_destination_id`, `duration_days`, `price`, `currency`, `description`, `slug`, `inclusions`, `exclusions`, `itinerary`, `difficulty`, `min_people`, `max_people`, `seo_title`, `seo_description`, `provider_id`, `vendor_id`) VALUES
(3, '3 Days Murchison Falls Safari', 1, 3, 3, 750.00, 'USD', 'Game drives and boat cruise', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tour_package_destinations`
--

CREATE TABLE `tour_package_destinations` (
  `tour_package_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `day_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `travel_alerts`
--

CREATE TABLE `travel_alerts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `sent_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_type` enum('customer','vendor','admin') DEFAULT 'customer',
  `vendor_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive','suspended') DEFAULT 'active',
  `email_verified` tinyint(1) DEFAULT 0,
  `phone_verified` tinyint(1) DEFAULT 0,
  `profile_image` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `password_hash`, `is_active`, `created_at`, `user_type`, `vendor_id`, `status`, `email_verified`, `phone_verified`, `profile_image`, `updated_at`) VALUES
(1, 'Sseguya', 'Kasolo', 'kasoloe@test.com', '+256700000000', '$2b$10$xLvNImk7parxTocxLpIDR.Mi/BffmNs1nBWxppIYI2MUDMq/wdFuW', 1, '2025-12-16 17:56:35', 'customer', NULL, 'active', 0, 0, NULL, '2026-06-15 12:56:18'),
(2, 'Brian', 'Kasolo', 'kasolo@gmail.com', NULL, '$2b$10$aSv382r0IExpwxW42TF24.ueXGfoYjpb8JyRYY.6DzlAH5VUEmlta', 1, '2026-03-31 19:57:57', 'admin', NULL, 'active', 0, 0, NULL, '2026-04-10 12:43:33'),
(3, 'Hakim', 'Asiimwe', 'vendor@test.com', '0771234567', '$2b$10$xY.5Z/HZtUnG07huwax5qO1uG.1QmqA13.MFLnCnrCS5lSwpLSxlG', 1, '2026-06-13 12:48:18', 'vendor', 1, 'active', 0, 0, NULL, '2026-06-13 09:48:18');

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `user_id` int(11) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `profile_type` enum('customer','driver','admin','partner') DEFAULT 'customer',
  `avatar` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `business_type` enum('hotel','car_rental','tour_operator','restaurant','venue','mixed') DEFAULT 'mixed',
  `status` enum('pending','approved','rejected','suspended') DEFAULT 'pending',
  `commission_rate` decimal(5,2) DEFAULT 10.00,
  `address` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `name`, `email`, `phone`, `company_name`, `created_at`, `business_type`, `status`, `commission_rate`, `address`, `description`) VALUES
(1, 'Zula Admin', 'admin@zula.com', '0702123456', 'Zula Travels', '2026-03-25 12:04:15', 'mixed', 'pending', 10.00, NULL, NULL),
(2, 'John Doe', 'john@example.com', '0700000000', 'Zula Travels', '2026-03-25 12:05:28', 'mixed', 'pending', 10.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_ledger`
--

CREATE TABLE `vendor_ledger` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `entry_type` enum('booking_income','commission','payout','refund') DEFAULT NULL,
  `gross_amount` decimal(10,2) NOT NULL,
  `commission_rate` decimal(5,2) DEFAULT 10.00,
  `commission_amount` decimal(10,2) NOT NULL,
  `net_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','settled') DEFAULT 'pending',
  `settlement_date` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor_ledger`
--

INSERT INTO `vendor_ledger` (`id`, `vendor_id`, `booking_id`, `payment_id`, `entry_type`, `gross_amount`, `commission_rate`, `commission_amount`, `net_amount`, `status`, `settlement_date`, `created_at`) VALUES
(1, 1, 11, 1, 'booking_income', 240.00, 10.00, 24.00, 216.00, 'pending', NULL, '2026-06-19 21:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_payouts`
--

CREATE TABLE `vendor_payouts` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `payment_method` varchar(50) DEFAULT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','completed','rejected') DEFAULT 'pending',
  `requested_at` datetime DEFAULT current_timestamp(),
  `approved_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor_payouts`
--

INSERT INTO `vendor_payouts` (`id`, `vendor_id`, `amount`, `currency`, `payment_method`, `account_name`, `account_number`, `phone_number`, `reference`, `status`, `requested_at`, `approved_at`, `completed_at`, `approved_by`, `notes`) VALUES
(1, 1, 100.00, 'USD', 'mtn_momo', NULL, NULL, '256774488956', NULL, 'approved', '2026-06-19 13:29:58', '2026-06-20 00:08:48', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `venues`
--

CREATE TABLE `venues` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `venue_type` varchar(100) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `price_per_day` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `venues`
--

INSERT INTO `venues` (`id`, `destination_id`, `name`, `venue_type`, `capacity`, `price_per_day`, `currency`, `description`, `provider_id`, `vendor_id`) VALUES
(1, 1, 'Hakim Conference Centre', 'Conference Hall', 500, 1200.00, 'USD', 'Modern conference venue', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `volunteer_programs`
--

CREATE TABLE `volunteer_programs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration_days` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wildlife`
--

CREATE TABLE `wildlife` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scientific_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `habitat` text DEFAULT NULL,
  `diet` text DEFAULT NULL,
  `lifespan` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `airlines`
--
ALTER TABLE `airlines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `airport_transfers`
--
ALTER TABLE `airport_transfers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ai_knowledge`
--
ALTER TABLE `ai_knowledge`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `ai_knowledge` ADD FULLTEXT KEY `topic` (`topic`,`content`,`keywords`);

--
-- Indexes for table `availability`
--
ALTER TABLE `availability`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_booking_status` (`status`),
  ADD KEY `idx_hotel_id` (`hotel_id`),
  ADD KEY `idx_vendor_id` (`vendor_id`);

--
-- Indexes for table `booking_audit`
--
ALTER TABLE `booking_audit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_booking_audit_booking` (`booking_id`);

--
-- Indexes for table `booking_items`
--
ALTER TABLE `booking_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `idx_service` (`service_type`,`service_id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plate_number` (`plate_number`),
  ADD UNIQUE KEY `ux_car_identity` (`make`,`model`,`year`,`destination_id`),
  ADD KEY `destination_id` (`destination_id`),
  ADD KEY `idx_cars_available` (`is_available`,`category`),
  ADD KEY `fk_cars_provider` (`provider_id`),
  ADD KEY `fk_cars_vendor` (`vendor_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_bookings`
--
ALTER TABLE `car_bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_item_id` (`booking_item_id`),
  ADD KEY `driver_id` (`driver_id`),
  ADD KEY `idx_car_booking_dates` (`car_id`,`start_date`,`end_date`);

--
-- Indexes for table `car_hire_options`
--
ALTER TABLE `car_hire_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_hire_rates`
--
ALTER TABLE `car_hire_rates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courier_bookings`
--
ALTER TABLE `courier_bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tracking_id` (`tracking_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `idx_courier_bookings_status` (`delivery_status`,`created_at`),
  ADD KEY `courier_bookings_driver_fk` (`driver_id`),
  ADD KEY `idx_delivery_status` (`delivery_status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `courier_fleet`
--
ALTER TABLE `courier_fleet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courier_tracking`
--
ALTER TABLE `courier_tracking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_tracking_booking` (`booking_id`);

--
-- Indexes for table `courier_users`
--
ALTER TABLE `courier_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_courier_users_vehicle` (`vehicle_id`),
  ADD KEY `idx_courier_users_role` (`user_role`,`is_active`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_country_city` (`country`,`city`),
  ADD UNIQUE KEY `slug` (`slug`);
ALTER TABLE `destinations` ADD FULLTEXT KEY `description` (`description`,`history`,`culture`);

--
-- Indexes for table `destination_distances`
--
ALTER TABLE `destination_distances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `destination_info`
--
ALTER TABLE `destination_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `external_links`
--
ALTER TABLE `external_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `financial_documents`
--
ALTER TABLE `financial_documents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document_number` (`document_number`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`),
  ADD KEY `idx_flight_route` (`origin_id`,`destination_id`),
  ADD KEY `idx_departure_time` (`departure_time`),
  ADD KEY `idx_airline` (`airline_id`);

--
-- Indexes for table `flight_price_history`
--
ALTER TABLE `flight_price_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flight_id` (`flight_id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_hotel_name_destination` (`name`,`destination_id`),
  ADD KEY `idx_hotels_destination` (`destination_id`),
  ADD KEY `fk_hotels_provider` (`provider_id`);
ALTER TABLE `hotels` ADD FULLTEXT KEY `name` (`name`,`description`);

--
-- Indexes for table `hotel_rooms`
--
ALTER TABLE `hotel_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `national_parks`
--
ALTER TABLE `national_parks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nearby_airports`
--
ALTER TABLE `nearby_airports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `places_of_interest`
--
ALTER TABLE `places_of_interest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `pricing_rules`
--
ALTER TABLE `pricing_rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_inventory`
--
ALTER TABLE `product_inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provider_ai_settings`
--
ALTER TABLE `provider_ai_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_restaurants_provider` (`provider_id`),
  ADD KEY `fk_restaurants_vendor` (`vendor_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `search_logs`
--
ALTER TABLE `search_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `keyword` (`keyword`),
  ADD KEY `entity_type` (`entity_type`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `surprise`
--
ALTER TABLE `surprise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `tour_itinerary_days`
--
ALTER TABLE `tour_itinerary_days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tour_package_id` (`tour_package_id`);

--
-- Indexes for table `tour_packages`
--
ALTER TABLE `tour_packages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ux_tour_name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `start_destination_id` (`start_destination_id`),
  ADD KEY `end_destination_id` (`end_destination_id`),
  ADD KEY `fk_tours_provider` (`provider_id`),
  ADD KEY `fk_tours_vendor` (`vendor_id`);
ALTER TABLE `tour_packages` ADD FULLTEXT KEY `description` (`description`,`itinerary`);

--
-- Indexes for table `tour_package_destinations`
--
ALTER TABLE `tour_package_destinations`
  ADD PRIMARY KEY (`tour_package_id`,`destination_id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `travel_alerts`
--
ALTER TABLE `travel_alerts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_users_vendor` (`vendor_id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_ledger`
--
ALTER TABLE `vendor_ledger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor_payouts`
--
ALTER TABLE `vendor_payouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `venues`
--
ALTER TABLE `venues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`),
  ADD KEY `fk_venues_provider` (`provider_id`),
  ADD KEY `fk_venues_vendor` (`vendor_id`);

--
-- Indexes for table `volunteer_programs`
--
ALTER TABLE `volunteer_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wildlife`
--
ALTER TABLE `wildlife`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `airlines`
--
ALTER TABLE `airlines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `airport_transfers`
--
ALTER TABLE `airport_transfers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ai_knowledge`
--
ALTER TABLE `ai_knowledge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `availability`
--
ALTER TABLE `availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `booking_audit`
--
ALTER TABLE `booking_audit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking_items`
--
ALTER TABLE `booking_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `car_bookings`
--
ALTER TABLE `car_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_hire_options`
--
ALTER TABLE `car_hire_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `car_hire_rates`
--
ALTER TABLE `car_hire_rates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courier_bookings`
--
ALTER TABLE `courier_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `courier_fleet`
--
ALTER TABLE `courier_fleet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `courier_tracking`
--
ALTER TABLE `courier_tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `courier_users`
--
ALTER TABLE `courier_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `destination_distances`
--
ALTER TABLE `destination_distances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `destination_info`
--
ALTER TABLE `destination_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `external_links`
--
ALTER TABLE `external_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `financial_documents`
--
ALTER TABLE `financial_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `flight_price_history`
--
ALTER TABLE `flight_price_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `hotel_rooms`
--
ALTER TABLE `hotel_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `national_parks`
--
ALTER TABLE `national_parks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nearby_airports`
--
ALTER TABLE `nearby_airports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment_transactions`
--
ALTER TABLE `payment_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `places_of_interest`
--
ALTER TABLE `places_of_interest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pricing_rules`
--
ALTER TABLE `pricing_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_inventory`
--
ALTER TABLE `product_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `provider_ai_settings`
--
ALTER TABLE `provider_ai_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `search_logs`
--
ALTER TABLE `search_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `surprise`
--
ALTER TABLE `surprise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tour_itinerary_days`
--
ALTER TABLE `tour_itinerary_days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tour_packages`
--
ALTER TABLE `tour_packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `travel_alerts`
--
ALTER TABLE `travel_alerts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vendor_ledger`
--
ALTER TABLE `vendor_ledger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendor_payouts`
--
ALTER TABLE `vendor_payouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `venues`
--
ALTER TABLE `venues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `volunteer_programs`
--
ALTER TABLE `volunteer_programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wildlife`
--
ALTER TABLE `wildlife`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_booking_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  ADD CONSTRAINT `fk_booking_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`);

--
-- Constraints for table `booking_audit`
--
ALTER TABLE `booking_audit`
  ADD CONSTRAINT `fk_booking_audit_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `booking_items`
--
ALTER TABLE `booking_items`
  ADD CONSTRAINT `booking_items_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`);

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`),
  ADD CONSTRAINT `fk_cars_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `fk_cars_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`);

--
-- Constraints for table `car_bookings`
--
ALTER TABLE `car_bookings`
  ADD CONSTRAINT `car_bookings_ibfk_1` FOREIGN KEY (`booking_item_id`) REFERENCES `booking_items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `car_bookings_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`),
  ADD CONSTRAINT `car_bookings_ibfk_3` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`);

--
-- Constraints for table `car_hire_rates`
--
ALTER TABLE `car_hire_rates`
  ADD CONSTRAINT `car_hire_rates_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`);

--
-- Constraints for table `courier_bookings`
--
ALTER TABLE `courier_bookings`
  ADD CONSTRAINT `courier_bookings_driver_fk` FOREIGN KEY (`driver_id`) REFERENCES `courier_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `courier_bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `courier_users` (`id`),
  ADD CONSTRAINT `courier_bookings_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `courier_fleet` (`id`);

--
-- Constraints for table `courier_tracking`
--
ALTER TABLE `courier_tracking`
  ADD CONSTRAINT `courier_tracking_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `courier_bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `courier_users`
--
ALTER TABLE `courier_users`
  ADD CONSTRAINT `fk_courier_users_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `courier_fleet` (`id`);

--
-- Constraints for table `destination_distances`
--
ALTER TABLE `destination_distances`
  ADD CONSTRAINT `destination_distances_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`);

--
-- Constraints for table `destination_info`
--
ALTER TABLE `destination_info`
  ADD CONSTRAINT `destination_info_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `flights`
--
ALTER TABLE `flights`
  ADD CONSTRAINT `fk_flights_airline` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`),
  ADD CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`origin_id`) REFERENCES `destinations` (`id`),
  ADD CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`);

--
-- Constraints for table `flight_price_history`
--
ALTER TABLE `flight_price_history`
  ADD CONSTRAINT `flight_price_history_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hotels`
--
ALTER TABLE `hotels`
  ADD CONSTRAINT `fk_hotels_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `hotels_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`);

--
-- Constraints for table `hotel_rooms`
--
ALTER TABLE `hotel_rooms`
  ADD CONSTRAINT `hotel_rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);

--
-- Constraints for table `nearby_airports`
--
ALTER TABLE `nearby_airports`
  ADD CONSTRAINT `nearby_airports_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`);

--
-- Constraints for table `places_of_interest`
--
ALTER TABLE `places_of_interest`
  ADD CONSTRAINT `places_of_interest_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_inventory`
--
ALTER TABLE `product_inventory`
  ADD CONSTRAINT `product_inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `provider_ai_settings`
--
ALTER TABLE `provider_ai_settings`
  ADD CONSTRAINT `provider_ai_settings_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`);

--
-- Constraints for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `fk_restaurants_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `fk_restaurants_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`);

--
-- Constraints for table `tour_itinerary_days`
--
ALTER TABLE `tour_itinerary_days`
  ADD CONSTRAINT `tour_itinerary_days_ibfk_1` FOREIGN KEY (`tour_package_id`) REFERENCES `tour_packages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tour_packages`
--
ALTER TABLE `tour_packages`
  ADD CONSTRAINT `fk_tours_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `fk_tours_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`),
  ADD CONSTRAINT `tour_packages_ibfk_1` FOREIGN KEY (`start_destination_id`) REFERENCES `destinations` (`id`),
  ADD CONSTRAINT `tour_packages_ibfk_2` FOREIGN KEY (`end_destination_id`) REFERENCES `destinations` (`id`);

--
-- Constraints for table `tour_package_destinations`
--
ALTER TABLE `tour_package_destinations`
  ADD CONSTRAINT `tour_package_destinations_ibfk_1` FOREIGN KEY (`tour_package_id`) REFERENCES `tour_packages` (`id`),
  ADD CONSTRAINT `tour_package_destinations_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_provider` FOREIGN KEY (`vendor_id`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `fk_users_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `venues`
--
ALTER TABLE `venues`
  ADD CONSTRAINT `fk_venues_provider` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`),
  ADD CONSTRAINT `fk_venues_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`),
  ADD CONSTRAINT `venues_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
