-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: zula_travels
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ai_knowledge`
--

DROP TABLE IF EXISTS `ai_knowledge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_knowledge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `keywords` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `topic` (`topic`,`content`,`keywords`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_knowledge`
--

LOCK TABLES `ai_knowledge` WRITE;
/*!40000 ALTER TABLE `ai_knowledge` DISABLE KEYS */;
/*!40000 ALTER TABLE `ai_knowledge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airlines`
--

DROP TABLE IF EXISTS `airlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airlines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airlines`
--

LOCK TABLES `airlines` WRITE;
/*!40000 ALTER TABLE `airlines` DISABLE KEYS */;
/*!40000 ALTER TABLE `airlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airport_transfers`
--

DROP TABLE IF EXISTS `airport_transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport_transfers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `vehicle_type` varchar(100) DEFAULT NULL,
  `pickup_location` varchar(255) DEFAULT NULL,
  `dropoff_location` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `description` text DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airport_transfers`
--

LOCK TABLES `airport_transfers` WRITE;
/*!40000 ALTER TABLE `airport_transfers` DISABLE KEYS */;
INSERT INTO `airport_transfers` VALUES (1,1,'Entebbe Airport Transfer','SUV','Entebbe International Airport','Kampala City',45.00,'USD','Private airport pickup service',NULL,'2026-06-08 15:48:16'),(2,1,'Luxury Airport Transfer','Executive SUV','Entebbe International Airport','Kampala Serena Hotel',80.00,'USD','Premium executive transfer',NULL,'2026-06-08 15:48:16');
/*!40000 ALTER TABLE `airport_transfers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_audit`
--

DROP TABLE IF EXISTS `booking_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_audit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `table_name` varchar(50) DEFAULT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `change_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_booking_audit_booking` (`booking_id`),
  CONSTRAINT `fk_booking_audit_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_audit`
--

LOCK TABLES `booking_audit` WRITE;
/*!40000 ALTER TABLE `booking_audit` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking_audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_history`
--

DROP TABLE IF EXISTS `booking_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `booking_history_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `booking_history_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_history`
--

LOCK TABLES `booking_history` WRITE;
/*!40000 ALTER TABLE `booking_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_items`
--

DROP TABLE IF EXISTS `booking_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `service_type` enum('hotel_room','flight','car_hire','venue','tour') NOT NULL,
  `service_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  KEY `idx_service` (`service_type`,`service_id`),
  CONSTRAINT `booking_items_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_items`
--

LOCK TABLES `booking_items` WRITE;
/*!40000 ALTER TABLE `booking_items` DISABLE KEYS */;
INSERT INTO `booking_items` VALUES (2,1,'hotel_room',1,3,150.00,'2025-01-10','2025-01-13',NULL,NULL),(3,5,'hotel_room',0,1,100.00,NULL,NULL,16,NULL),(4,6,'hotel_room',0,1,100.00,NULL,NULL,16,NULL),(5,7,'hotel_room',0,1,100.00,NULL,NULL,16,NULL),(6,8,'hotel_room',0,1,100.00,NULL,NULL,16,NULL),(7,8,'hotel_room',4,1,280.00,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `booking_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_status_history`
--

DROP TABLE IF EXISTS `booking_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_status_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `old_status` varchar(50) DEFAULT NULL,
  `new_status` varchar(50) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `changed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `booking_status_history_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_status_history`
--

LOCK TABLES `booking_status_history` WRITE;
/*!40000 ALTER TABLE `booking_status_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `booking_date` datetime DEFAULT current_timestamp(),
  `status` enum('pending','confirmed','checked_in','completed','cancelled') NOT NULL DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `check_in` date DEFAULT NULL,
  `check_out` date DEFAULT NULL,
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_booking_status` (`status`),
  KEY `idx_hotel_id` (`hotel_id`),
  KEY `idx_vendor_id` (`vendor_id`),
  KEY `fk_booking_room` (`room_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_booking_hotel` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`),
  CONSTRAINT `fk_booking_room` FOREIGN KEY (`room_id`) REFERENCES `hotel_rooms` (`id`),
  CONSTRAINT `fk_booking_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,'2025-12-18 14:50:59','pending',450.00,'USD',NULL,NULL,NULL,NULL,NULL,'pending'),(2,2,'2026-04-23 19:54:33','pending',100.00,'USD',16,NULL,NULL,'2026-04-20','2026-04-22','pending'),(3,2,'2026-04-23 20:10:13','pending',100.00,'USD',16,NULL,NULL,'2026-04-20','2026-04-22','pending'),(4,2,'2026-04-23 20:14:39','pending',100.00,'USD',16,NULL,NULL,'2026-04-20','2026-04-22','pending'),(5,2,'2026-05-21 15:05:02','pending',100.00,'USD',16,NULL,NULL,'2026-04-20','2026-04-22','pending'),(6,2,'2026-05-21 15:20:19','pending',100.00,'USD',16,NULL,NULL,'2026-04-20','2026-04-22','pending'),(7,2,'2026-05-21 15:40:44','pending',100.00,'USD',16,NULL,NULL,'2026-04-20','2026-04-22','pending'),(8,2,'2026-06-01 16:30:55','cancelled',100.00,'USD',16,NULL,NULL,'2026-06-15','2026-06-18','pending'),(9,1,'2026-06-14 13:19:52','pending',500.00,'USD',22,NULL,1,'2026-07-01','2026-07-05','pending'),(10,1,'2026-06-15 15:35:35','pending',480.00,'USD',22,NULL,1,'2026-07-01','2026-07-05','pending'),(11,1,'2026-06-15 16:34:18','confirmed',240.00,'USD',22,NULL,1,'2026-07-01','2026-07-03','paid'),(12,2,'2026-07-16 22:16:54','pending',840.00,'USD',16,4,1,'2026-07-20','2026-07-23','pending'),(13,2,'2026-07-17 20:22:54','confirmed',840.00,'USD',16,4,1,'2026-07-20','2026-07-23','paid');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business_types`
--

DROP TABLE IF EXISTS `business_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `slug` varchar(150) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `template_name` varchar(100) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_types`
--

LOCK TABLES `business_types` WRITE;
/*!40000 ALTER TABLE `business_types` DISABLE KEYS */;
INSERT INTO `business_types` VALUES (1,'Hotel','hotel',NULL,'hotel',1),(2,'Restaurant','restaurant',NULL,'restaurant',1),(3,'Tour Operator','tour-operator',NULL,'tour',1),(4,'Car Rental','car-rental',NULL,'car',1),(5,'Airport Transfer','airport-transfer',NULL,'transport',1),(6,'Travel Agency','travel-agency',NULL,'travel',1),(7,'Tour Guide','tour-guide',NULL,'guide',1),(8,'Apartment','apartment',NULL,'apartment',1),(9,'Camping','camping',NULL,'camping',1),(10,'Boat Cruise','boat-cruise',NULL,'boat',1),(11,'Safari Lodge','safari-lodge',NULL,'lodge',1),(12,'Conference Centre','conference-centre',NULL,'conference',1),(13,'Spa & Wellness','spa',NULL,'spa',1);
/*!40000 ALTER TABLE `business_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_bookings`
--

DROP TABLE IF EXISTS `car_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_item_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `driver_id` int(11) DEFAULT NULL,
  `pricing_type` enum('dry','wet') NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `booking_item_id` (`booking_item_id`),
  KEY `driver_id` (`driver_id`),
  KEY `idx_car_booking_dates` (`car_id`,`start_date`,`end_date`),
  CONSTRAINT `car_bookings_ibfk_1` FOREIGN KEY (`booking_item_id`) REFERENCES `booking_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `car_bookings_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`),
  CONSTRAINT `car_bookings_ibfk_3` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_bookings`
--

LOCK TABLES `car_bookings` WRITE;
/*!40000 ALTER TABLE `car_bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_hire_options`
--

DROP TABLE IF EXISTS `car_hire_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_hire_options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `includes_driver` tinyint(1) NOT NULL,
  `includes_fuel` tinyint(1) NOT NULL,
  `extra_cost` decimal(10,2) DEFAULT 0.00,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_hire_options`
--

LOCK TABLES `car_hire_options` WRITE;
/*!40000 ALTER TABLE `car_hire_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_hire_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_hire_rates`
--

DROP TABLE IF EXISTS `car_hire_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_hire_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `car_id` int(11) NOT NULL,
  `base_rate_per_day` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `available_quantity` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `car_id` (`car_id`),
  CONSTRAINT `car_hire_rates_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_hire_rates`
--

LOCK TABLES `car_hire_rates` WRITE;
/*!40000 ALTER TABLE `car_hire_rates` DISABLE KEYS */;
INSERT INTO `car_hire_rates` VALUES (1,1,120.00,'USD',1),(2,2,80.00,'USD',1),(3,3,150.00,'USD',1),(4,4,90.00,'USD',1),(5,5,220.00,'USD',1);
/*!40000 ALTER TABLE `car_hire_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `vendor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `plate_number` (`plate_number`),
  UNIQUE KEY `ux_car_identity` (`make`,`model`,`year`,`destination_id`),
  KEY `destination_id` (`destination_id`),
  KEY `idx_cars_available` (`is_available`,`category`),
  KEY `fk_cars_vendor` (`vendor_id`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`),
  CONSTRAINT `fk_cars_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,1,'Toyota','Land Cruiser Prado',NULL,2022,7,'manual','4x4 safari vehicle suitable for long tours','/assets/cars/prado.jpg',1,'2025-12-31 12:38:28','SUV',1,'Diesel',NULL,NULL,0,NULL,NULL),(2,1,'Toyota','RAV4',NULL,2021,5,'manual','Comfortable SUV for city and highway travel','/assets/cars/rav4.jpg',1,'2025-12-31 12:38:28','Sedan',1,'Diesel',NULL,NULL,0,NULL,NULL),(3,2,'Toyota','Hiace Van',NULL,2020,14,'manual','Tour van ideal for groups and airport transfers','/assets/cars/hiace.jpg',1,'2025-12-31 12:38:28','Van',1,'Diesel',NULL,NULL,0,NULL,NULL),(4,3,'Nissan','X-Trail',NULL,2019,5,'manual','Reliable mid-size SUV','/assets/cars/xtrail.jpg',1,'2025-12-31 12:38:28','Sedan',1,'Diesel',NULL,NULL,0,NULL,NULL),(5,4,'Toyota','Coaster Bus',NULL,2018,29,'manual','Large bus for group tours and conferences','/assets/cars/coaster.jpg',1,'2025-12-31 12:38:28','Van',1,'Diesel',NULL,NULL,0,NULL,NULL),(6,1,'Toyota','Prado','UBK123A',2022,7,'manual',NULL,NULL,1,'2026-06-13 12:33:30','SUV',1,'Petrol',NULL,NULL,0,NULL,1);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `service_type` varchar(50) NOT NULL,
  `service_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `service_type` enum('hotel_room','car_hire','tour','airport_transfer','restaurant') NOT NULL,
  `service_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `unit_price` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,2,'hotel_room',4,1,280.00,'2026-06-08 19:28:23'),(2,2,'hotel_room',4,1,280.00,'2026-06-09 11:24:02');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `travel_tips` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courier_bookings`
--

DROP TABLE IF EXISTS `courier_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courier_bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `current_location` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tracking_id` (`tracking_id`),
  KEY `customer_id` (`customer_id`),
  KEY `vehicle_id` (`vehicle_id`),
  KEY `idx_courier_bookings_status` (`delivery_status`,`created_at`),
  KEY `courier_bookings_driver_fk` (`driver_id`),
  KEY `idx_delivery_status` (`delivery_status`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `courier_bookings_driver_fk` FOREIGN KEY (`driver_id`) REFERENCES `courier_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `courier_bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `courier_users` (`id`),
  CONSTRAINT `courier_bookings_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `courier_fleet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courier_bookings`
--

LOCK TABLES `courier_bookings` WRITE;
/*!40000 ALTER TABLE `courier_bookings` DISABLE KEYS */;
INSERT INTO `courier_bookings` VALUES (1,2,4,1,'Kampala – Ntinda','Entebbe Airport',NULL,NULL,0,NULL,NULL,'Handle with care','Documents',NULL,NULL,12000.00,'Paid','MTN MoMo','In Transit','ZULA-TEST001','2026-01-05 15:29:44',NULL),(2,3,NULL,3,'Makerere University','Bugolobi',NULL,NULL,1,'Mary','0700554433','Surprise delivery, call before arrival','Birthday Gift',NULL,NULL,30000.00,'Unpaid','Cash','Pending','ZULA-TEST002','2026-01-05 15:29:44',NULL);
/*!40000 ALTER TABLE `courier_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courier_fleet`
--

DROP TABLE IF EXISTS `courier_fleet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courier_fleet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vehicle_name` varchar(100) NOT NULL,
  `vehicle_category` enum('Motorcycle','Car','Truck','Regional') NOT NULL,
  `base_fare` decimal(10,2) NOT NULL,
  `price_per_km` decimal(10,2) NOT NULL,
  `max_weight_kg` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courier_fleet`
--

LOCK TABLES `courier_fleet` WRITE;
/*!40000 ALTER TABLE `courier_fleet` DISABLE KEYS */;
INSERT INTO `courier_fleet` VALUES (1,'Boda Boda','Motorcycle',5000.00,1500.00,20,'/assets/fleet/boda.jpg',1),(2,'Motorcycle Express','Motorcycle',7000.00,1800.00,25,'/assets/fleet/motorbike.jpg',1),(3,'City Car','Car',15000.00,3000.00,100,'/assets/fleet/car.jpg',1),(4,'Van Delivery','Car',25000.00,4500.00,500,'/assets/fleet/van.jpg',1),(5,'Pickup Truck','Truck',35000.00,6000.00,1000,'/assets/fleet/pickup.jpg',1),(6,'Trailer / Cargo Truck','Regional',60000.00,10000.00,5000,'/assets/fleet/trailer.jpg',1);
/*!40000 ALTER TABLE `courier_fleet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courier_tracking`
--

DROP TABLE IF EXISTS `courier_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courier_tracking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `status_update` varchar(255) NOT NULL,
  `current_location` text DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_tracking_booking` (`booking_id`),
  CONSTRAINT `courier_tracking_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `courier_bookings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courier_tracking`
--

LOCK TABLES `courier_tracking` WRITE;
/*!40000 ALTER TABLE `courier_tracking` DISABLE KEYS */;
INSERT INTO `courier_tracking` VALUES (1,1,'Package picked up','Ntinda','2026-01-05 15:30:25'),(2,1,'In transit','Entebbe Road','2026-01-05 15:30:25'),(3,2,'Booking created','System','2026-01-05 15:30:25');
/*!40000 ALTER TABLE `courier_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courier_users`
--

DROP TABLE IF EXISTS `courier_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courier_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `user_role` enum('admin','customer','driver') DEFAULT 'customer',
  `vehicle_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `email_verified` tinyint(1) DEFAULT 0,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_courier_users_vehicle` (`vehicle_id`),
  KEY `idx_courier_users_role` (`user_role`,`is_active`),
  CONSTRAINT `fk_courier_users_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `courier_fleet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courier_users`
--

LOCK TABLES `courier_users` WRITE;
/*!40000 ALTER TABLE `courier_users` DISABLE KEYS */;
INSERT INTO `courier_users` VALUES (1,'Admin User','admin@zula.com','$2b$10$hashedpassword','0774488956','admin',NULL,1,0,NULL,'2026-01-05 15:27:14'),(2,'John Customer','john@example.com','$2b$10$hashedpassword','0700123456','customer',NULL,1,0,NULL,'2026-01-05 15:27:14'),(3,'Sarah Customer','sarah@example.com','$2b$10$hashedpassword','0700654321','customer',NULL,1,0,NULL,'2026-01-05 15:27:14'),(4,'Moses Rider','kasolo@zula.com','$2b$10$hashedpassword','0700789123','driver',1,1,0,NULL,'2026-01-05 15:27:14'),(5,'Peter Rider','sseguya@zula.com','$2b$10$hashedpassword','0700998877','driver',2,1,0,NULL,'2026-01-05 15:27:14'),(6,'Joshua Williams','joshua.w@zula.com','$2b$10$DxD8UeTBIg7FQsM5MEdiXeZlavP8XxFBzYnCxzuCNO0QERESvT2nO','0774488999','customer',NULL,1,0,NULL,'2026-05-30 15:36:42');
/*!40000 ALTER TABLE `courier_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destination_distances`
--

DROP TABLE IF EXISTS `destination_distances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination_distances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) NOT NULL,
  `place_id` int(11) NOT NULL,
  `place_type` enum('hospital','market','police','airport','shopping','attraction') DEFAULT NULL,
  `distance_km` decimal(6,2) DEFAULT NULL,
  `travel_time_minutes` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `destination_id` (`destination_id`),
  CONSTRAINT `destination_distances_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination_distances`
--

LOCK TABLES `destination_distances` WRITE;
/*!40000 ALTER TABLE `destination_distances` DISABLE KEYS */;
/*!40000 ALTER TABLE `destination_distances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destination_info`
--

DROP TABLE IF EXISTS `destination_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destination_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) NOT NULL,
  `block_type` enum('history','heritage','economy','transport','healthcare','education','religion','nightlife','security','shopping','tips') DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `destination_id` (`destination_id`),
  CONSTRAINT `destination_info_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destination_info`
--

LOCK TABLES `destination_info` WRITE;
/*!40000 ALTER TABLE `destination_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `destination_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_country_city` (`country`,`city`),
  UNIQUE KEY `slug` (`slug`),
  FULLTEXT KEY `description` (`description`,`history`,`culture`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (1,'Uganda','Kampala','Capital city of Uganda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'active','2026-06-27 14:08:31','2026-06-27 14:08:31'),(2,'Uganda','Entebbe','International airport city',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'active','2026-06-27 14:08:31','2026-06-27 14:08:31'),(3,'Uganda','Jinja','Source of the Nile',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'active','2026-06-27 14:08:31','2026-06-27 14:08:31'),(4,'Uganda','Mbarara','Western Uganda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'active','2026-06-27 14:08:31','2026-06-27 14:08:31'),(5,'Uganda','Kabale','Lake Bunyonyi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'active','2026-06-27 14:08:31','2026-06-27 14:08:31'),(6,'Uganda','Kalangala','Ssese Islands',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'active','2026-06-27 14:08:31','2026-06-27 14:08:31');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(150) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `license_number` varchar(100) DEFAULT NULL,
  `experience_years` int(11) DEFAULT 0,
  `languages` varchar(100) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `daily_rate` decimal(10,2) NOT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES (1,'John Okello','+256701234567',NULL,8,NULL,NULL,35.00,1,1,'2025-12-31 12:41:05'),(2,'Peter Ssemakula','+256702345678',NULL,5,NULL,NULL,30.00,1,1,'2025-12-31 12:41:05'),(3,'David Mugisha','+256703456789',NULL,10,NULL,NULL,40.00,1,1,'2025-12-31 12:41:05'),(4,'Michael Kato','+256704567890',NULL,6,NULL,NULL,32.00,1,1,'2025-12-31 12:41:05'),(5,'Samuel Ochieng','+256705678901',NULL,12,NULL,NULL,45.00,1,1,'2025-12-31 12:41:05');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_verifications`
--

DROP TABLE IF EXISTS `email_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_verifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `verified_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `email_verifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_verifications`
--

LOCK TABLES `email_verifications` WRITE;
/*!40000 ALTER TABLE `email_verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,1,'Kampala City Festival','Annual cultural festival','2026-10-01','2026-10-03','Kampala City Centre');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `external_links`
--

DROP TABLE IF EXISTS `external_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `external_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entity_type` enum('flight','hotel','tour') DEFAULT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `provider_name` varchar(100) DEFAULT NULL,
  `url` text DEFAULT NULL,
  `affiliate_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `external_links`
--

LOCK TABLES `external_links` WRITE;
/*!40000 ALTER TABLE `external_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `external_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entity_type` enum('destination','hotel','tour','car','venue','courier','blog','platform') NOT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_documents`
--

DROP TABLE IF EXISTS `financial_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `document_number` (`document_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_documents`
--

LOCK TABLES `financial_documents` WRITE;
/*!40000 ALTER TABLE `financial_documents` DISABLE KEYS */;
INSERT INTO `financial_documents` VALUES (1,11,1,1,'invoice','INV-1781904226427','2026-06-20 00:23:46',240.00,'USD','issued',NULL,'2026-06-19 21:23:46'),(2,11,1,1,'receipt','REC-1781906178632','2026-06-20 00:56:18',240.00,'USD','issued',NULL,'2026-06-19 21:56:18'),(3,12,NULL,2,'proforma_invoice','PRO-1784229414644','2026-07-16 22:16:54',840.00,'USD','issued',NULL,'2026-07-16 19:16:54'),(4,13,NULL,2,'proforma_invoice','PRO-1784308974234','2026-07-17 20:22:54',840.00,'USD','issued',NULL,'2026-07-17 17:22:54'),(5,13,2,2,'invoice','INV-1784313569484','2026-07-17 21:39:29',840.00,'USD','issued',NULL,'2026-07-17 18:39:29');
/*!40000 ALTER TABLE `financial_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight_price_history`
--

DROP TABLE IF EXISTS `flight_price_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight_price_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flight_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `recorded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `flight_id` (`flight_id`),
  CONSTRAINT `flight_price_history_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight_price_history`
--

LOCK TABLES `flight_price_history` WRITE;
/*!40000 ALTER TABLE `flight_price_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `flight_price_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `destination_id` (`destination_id`),
  KEY `idx_flight_route` (`origin_id`,`destination_id`),
  KEY `idx_departure_time` (`departure_time`),
  KEY `idx_airline` (`airline_id`),
  CONSTRAINT `fk_flights_airline` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`),
  CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`origin_id`) REFERENCES `destinations` (`id`),
  CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (1,1,2,NULL,'Uganda Airlines','UR123','domestic','2026-03-20 08:00:00','2026-03-20 09:00:00',NULL,150.00,'USD',100,100,NULL,NULL,NULL,'scheduled','2026-03-22 20:49:03');
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_rooms`
--

DROP TABLE IF EXISTS `hotel_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel_rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hotel_id` int(11) NOT NULL,
  `room_type` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `available_quantity` int(11) DEFAULT 0,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hotel_id` (`hotel_id`),
  CONSTRAINT `hotel_rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_rooms`
--

LOCK TABLES `hotel_rooms` WRITE;
/*!40000 ALTER TABLE `hotel_rooms` DISABLE KEYS */;
INSERT INTO `hotel_rooms` VALUES (4,16,'Deluxe Room',2,280.00,'USD',18,'Elegant deluxe room with city view'),(5,16,'Executive Suite',3,450.00,'USD',10,'Luxury executive suite'),(6,17,'Classic Room',2,240.00,'USD',25,'Modern classic room'),(7,17,'Club Suite',3,380.00,'USD',12,'Premium club-level suite'),(8,18,'Standard Room',2,120.00,'USD',30,'Affordable and comfortable'),(9,18,'Business Room',2,180.00,'USD',15,'Ideal for business travelers'),(10,19,'Lake View Room',2,260.00,'USD',18,'Scenic lakefront room'),(11,19,'Family Room',4,340.00,'USD',8,'Spacious family room'),(12,20,'Beach Chalet',2,220.00,'USD',14,'Private beach chalet'),(13,20,'Honeymoon Suite',2,300.00,'USD',6,'Romantic lakeside suite'),(14,22,'Deluxe Room',2,120.00,'USD',10,'Luxury room with lake view');
/*!40000 ALTER TABLE `hotel_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_hotel_name_destination` (`name`,`destination_id`),
  KEY `idx_hotels_destination` (`destination_id`),
  FULLTEXT KEY `name` (`name`,`description`),
  CONSTRAINT `hotels_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (16,1,'Kampala Serena Hotel','Kintu Road, Kampala',5.0,'Luxury 5-star hotel',1),(17,1,'Sheraton Kampala Hotel','Ternan Avenue, Kampala',4.8,'Premium city hotel',1),(18,1,'Africana Hotel Kampala','Jinja Road, Kampala',4.2,'Affordable comfort',1),(19,2,'Protea Hotel Entebbe','Victoria Mall, Entebbe',4.6,'Lakefront hotel',1),(20,6,'Brovad Sands Lodge','Kalangala Island',4.4,'Beach resort',1),(22,1,'Hakim Safari Lodge','Entebbe Road',4.7,'Luxury safari experience',1);
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entity_type` enum('hotel','tour_package','destination','car','venue','place','flight') DEFAULT NULL,
  `entity_id` int(11) NOT NULL,
  `media_type` enum('image','video') NOT NULL,
  `url` varchar(500) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `national_parks`
--

DROP TABLE IF EXISTS `national_parks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `national_parks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `wildlife` text DEFAULT NULL,
  `entry_fee` decimal(10,2) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `national_parks`
--

LOCK TABLES `national_parks` WRITE;
/*!40000 ALTER TABLE `national_parks` DISABLE KEYS */;
/*!40000 ALTER TABLE `national_parks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nearby_airports`
--

DROP TABLE IF EXISTS `nearby_airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nearby_airports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `airport_name` varchar(255) DEFAULT NULL,
  `iata_code` varchar(10) DEFAULT NULL,
  `distance_km` decimal(6,2) DEFAULT NULL,
  `transport_options` text DEFAULT NULL,
  `booking_links` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `destination_id` (`destination_id`),
  CONSTRAINT `nearby_airports_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nearby_airports`
--

LOCK TABLES `nearby_airports` WRITE;
/*!40000 ALTER TABLE `nearby_airports` DISABLE KEYS */;
/*!40000 ALTER TABLE `nearby_airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_transactions`
--

DROP TABLE IF EXISTS `payment_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` int(11) NOT NULL,
  `transaction_type` enum('payment','refund','commission','vendor_payout') DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_transactions`
--

LOCK TABLES `payment_transactions` WRITE;
/*!40000 ALTER TABLE `payment_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,11,1,NULL,NULL,NULL,240.00,'USD','cash','paid','2026-06-20 00:23:46','PAY-1781904226420',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL),(2,13,2,NULL,NULL,NULL,840.00,'USD','mobile_money','paid','2026-07-17 21:39:29','PAY-1784309223509',NULL,NULL,'mtn_momo',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `places_of_interest`
--

DROP TABLE IF EXISTS `places_of_interest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `places_of_interest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` enum('attraction','hospital','bank','restaurant','hotel','school','university','religious','police','market','shopping','nightlife') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `opening_hours` varchar(100) DEFAULT NULL,
  `is_featured` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `destination_id` (`destination_id`),
  CONSTRAINT `places_of_interest_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places_of_interest`
--

LOCK TABLES `places_of_interest` WRITE;
/*!40000 ALTER TABLE `places_of_interest` DISABLE KEYS */;
/*!40000 ALTER TABLE `places_of_interest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricing_rules`
--

DROP TABLE IF EXISTS `pricing_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pricing_rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_type` enum('hotel','car','tour') DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `rule_type` enum('discount','seasonal','promo') DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `value_type` enum('percent','fixed') DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricing_rules`
--

LOCK TABLES `pricing_rules` WRITE;
/*!40000 ALTER TABLE `pricing_rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `pricing_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `is_cover` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_inventory`
--

DROP TABLE IF EXISTS `product_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `available_quantity` int(11) DEFAULT 0,
  `booked_quantity` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_inventory`
--

LOCK TABLES `product_inventory` WRITE;
/*!40000 ALTER TABLE `product_inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promo_codes`
--

DROP TABLE IF EXISTS `promo_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promo_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_to` date DEFAULT NULL,
  `max_usage` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promo_codes`
--

LOCK TABLES `promo_codes` WRITE;
/*!40000 ALTER TABLE `promo_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `promo_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `device_name` varchar(100) DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `revoked_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cuisine_type` varchar(100) DEFAULT NULL,
  `price_range` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `vendor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_restaurants_vendor` (`vendor_id`),
  CONSTRAINT `fk_restaurants_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,1,'Cafe Javas','International','$$','Popular family restaurant',4.5,'Kampala Road','+256700000001',NULL,NULL,'/assets/restaurants/cafe-javas.jpg',NULL,1,'2026-06-08 15:20:21',NULL),(2,1,'Khana Khazana','Indian','$$$','Authentic Indian cuisine',4.8,'Acacia Mall Kampala','+256700000002',NULL,NULL,'/assets/restaurants/khana-khazana.jpg',NULL,1,'2026-06-08 15:20:21',NULL),(3,1,'The Lawns Restaurant','Continental','$$$$','Fine dining experience',4.9,'Speke Road Kampala','+256700000003',NULL,NULL,'/assets/restaurants/lawns.jpg',NULL,1,'2026-06-08 15:20:21',NULL),(4,1,'Hakim Restaurant','African','$$','Traditional Ugandan cuisine',4.5,'Kampala Road','0771234567','restaurant@test.com',NULL,NULL,NULL,1,'2026-06-13 18:14:56',1);
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `entity_type` enum('hotel','tour','car','destination') DEFAULT NULL,
  `entity_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(11,'airline_partner'),(12,'content_manager'),(2,'customer'),(5,'driver'),(13,'finance'),(10,'hotel_partner'),(7,'staff'),(6,'super_admin'),(9,'tour_guide'),(8,'vendor');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_logs`
--

DROP TABLE IF EXISTS `search_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) NOT NULL,
  `entity_type` enum('destination','hotel','tour','car','venue','courier','blog','flight_info') DEFAULT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `user_ip` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `results_count` int(11) DEFAULT 0,
  `searched_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `keyword` (`keyword`),
  KEY `entity_type` (`entity_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_logs`
--

LOCK TABLES `search_logs` WRITE;
/*!40000 ALTER TABLE `search_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `search_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_itinerary_days`
--

DROP TABLE IF EXISTS `tour_itinerary_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_itinerary_days` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_package_id` int(11) NOT NULL,
  `day_number` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `meals_included` varchar(50) DEFAULT NULL,
  `accommodation` varchar(255) DEFAULT NULL,
  `activities` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tour_package_id` (`tour_package_id`),
  CONSTRAINT `tour_itinerary_days_ibfk_1` FOREIGN KEY (`tour_package_id`) REFERENCES `tour_packages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_itinerary_days`
--

LOCK TABLES `tour_itinerary_days` WRITE;
/*!40000 ALTER TABLE `tour_itinerary_days` DISABLE KEYS */;
/*!40000 ALTER TABLE `tour_itinerary_days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_package_destinations`
--

DROP TABLE IF EXISTS `tour_package_destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_package_destinations` (
  `tour_package_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `day_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`tour_package_id`,`destination_id`),
  KEY `destination_id` (`destination_id`),
  CONSTRAINT `tour_package_destinations_ibfk_1` FOREIGN KEY (`tour_package_id`) REFERENCES `tour_packages` (`id`),
  CONSTRAINT `tour_package_destinations_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_package_destinations`
--

LOCK TABLES `tour_package_destinations` WRITE;
/*!40000 ALTER TABLE `tour_package_destinations` DISABLE KEYS */;
/*!40000 ALTER TABLE `tour_package_destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tour_packages`
--

DROP TABLE IF EXISTS `tour_packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tour_packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `vendor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_tour_name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  KEY `start_destination_id` (`start_destination_id`),
  KEY `end_destination_id` (`end_destination_id`),
  KEY `fk_tours_vendor` (`vendor_id`),
  FULLTEXT KEY `description` (`description`,`itinerary`),
  CONSTRAINT `fk_tours_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`),
  CONSTRAINT `tour_packages_ibfk_1` FOREIGN KEY (`start_destination_id`) REFERENCES `destinations` (`id`),
  CONSTRAINT `tour_packages_ibfk_2` FOREIGN KEY (`end_destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tour_packages`
--

LOCK TABLES `tour_packages` WRITE;
/*!40000 ALTER TABLE `tour_packages` DISABLE KEYS */;
INSERT INTO `tour_packages` VALUES (3,'3 Days Murchison Falls Safari',1,3,3,750.00,'USD','Game drives and boat cruise',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `tour_packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(150) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `full_description` longtext DEFAULT NULL,
  `duration_days` int(11) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `hero_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `destination_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tours`
--

LOCK TABLES `tours` WRITE;
/*!40000 ALTER TABLE `tours` DISABLE KEYS */;
INSERT INTO `tours` VALUES (1,'murchison-falls-safari','Murchison Falls Safari','3 Day wildlife safari','Experience game drives, boat cruise and Murchison Falls.',3,NULL,NULL,'2026-06-07 20:21:10',1),(2,'queen-elizabeth-safari','Queen Elizabeth National Park','4 Day safari adventure','Game drives, boat cruise and tree climbing lions.',4,NULL,NULL,'2026-06-07 20:21:10',NULL),(3,'gorilla-trekking','Bwindi Gorilla Trekking','2 Day gorilla experience','Track mountain gorillas in Bwindi Impenetrable Forest.',2,NULL,NULL,'2026-06-07 20:21:10',NULL);
/*!40000 ALTER TABLE `tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_alerts`
--

DROP TABLE IF EXISTS `travel_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `sent_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_alerts`
--

LOCK TABLES `travel_alerts` WRITE;
/*!40000 ALTER TABLE `travel_alerts` DISABLE KEYS */;
/*!40000 ALTER TABLE `travel_alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `user_id` int(11) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `profile_type` enum('customer','driver','admin','partner') DEFAULT 'customer',
  `avatar` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_role` (`user_id`,`role_id`),
  KEY `fk_user_roles_role` (`role_id`),
  CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1,2,'2026-07-08 10:13:52'),(2,2,1,'2026-07-08 10:13:52'),(5,5,8,'2026-07-11 17:39:07'),(6,6,8,'2026-07-11 21:20:20'),(8,7,2,'2026-07-14 15:18:30'),(9,3,8,'2026-07-14 18:02:36'),(10,8,2,'2026-07-14 18:43:29');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_type` enum('customer','vendor','admin') DEFAULT 'customer',
  `status` enum('active','inactive','suspended','pending','rejected') DEFAULT 'pending',
  `email_verified` tinyint(1) DEFAULT 0,
  `phone_verified` tinyint(1) DEFAULT 0,
  `profile_image` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `failed_login_attempts` int(11) DEFAULT 0,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` datetime DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sseguya','Kasolo','kasoloe@test.com','+256700123456','$2b$10$xLvNImk7parxTocxLpIDR.Mi/BffmNs1nBWxppIYI2MUDMq/wdFuW',1,'2025-12-16 17:56:35','customer','active',0,0,NULL,'2026-07-11 21:15:39',NULL,NULL,NULL,0,0,NULL,NULL),(2,'Brian','Kasolo','kasolo@gmail.com','0789457685','$2b$10$aSv382r0IExpwxW42TF24.ueXGfoYjpb8JyRYY.6DzlAH5VUEmlta',1,'2026-03-31 19:57:57','admin','active',0,0,NULL,'2026-07-20 08:59:59',NULL,NULL,'2026-07-20 11:59:59',0,0,NULL,NULL),(3,'Hakim','Asiimwe','vendor@test.com','0771234567','$2b$10$xY.5Z/HZtUnG07huwax5qO1uG.1QmqA13.MFLnCnrCS5lSwpLSxlG',1,'2026-06-13 12:48:18','vendor','active',0,0,NULL,'2026-07-14 18:02:36',NULL,NULL,NULL,0,0,NULL,NULL),(4,'John','Doe','john@test.com','0700000000','$2b$10$FTrbPHyJ3CkaWG0LM6ejZ.zsVbhn3BSWJr/7N2y7pxcnZsy1n4qwm',1,'2026-07-09 13:52:46','customer','active',0,0,NULL,'2026-07-15 11:37:12',NULL,NULL,NULL,0,0,NULL,NULL),(5,'John','Kasolo','kasolo56@gmail.com','0702356790','$2b$10$FCFR1DZml6o7SI.kXCMQ0e/6cZRO4zSu6A5krxoYr8o6iIMLOPlkC',1,'2026-07-11 20:39:07','vendor','active',0,0,NULL,'2026-07-11 21:14:51',NULL,NULL,NULL,0,1,'2026-07-12 00:14:51',NULL),(6,'walugembe','makanika','walugembe@gmail.com','0784563412','$2b$10$MD.jZZqDLKQkOWd2MLSZv.Q3gHGVpIxLssGyE0/UaBIzedrmtVqEu',1,'2026-07-12 00:20:20','vendor','active',0,0,NULL,'2026-07-13 14:54:57',NULL,NULL,NULL,0,1,'2026-07-13 17:54:57',6),(7,'walugembe','Asiimwe','asimwe@gmail.com','0783127867','$2b$10$i.jvXhEZ7ub2RU/wKazuYei0qIUpEZu96HCYSMqhh68C0ErDh8qCK',1,'2026-07-14 17:57:43','customer','active',0,0,NULL,'2026-07-14 15:18:30',NULL,NULL,NULL,0,0,NULL,NULL),(8,'Nambalirwa ','Juliet','juliet@gmail.com','0767489756','$2b$10$eeEUv.vTHsT4t9YaD1RzGOox0kYVhqvOyYUKM/hGCLlYPKkGgYGJC',1,'2026-07-14 21:43:29','customer','active',0,0,NULL,'2026-07-14 18:43:29',NULL,NULL,NULL,0,0,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_businesses`
--

DROP TABLE IF EXISTS `vendor_businesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_businesses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `website_id` int(11) NOT NULL,
  `business_type_id` int(11) NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `logo` varchar(500) DEFAULT NULL,
  `cover_image` varchar(500) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `whatsapp` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `website_id` (`website_id`),
  KEY `business_type_id` (`business_type_id`),
  CONSTRAINT `vendor_businesses_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`),
  CONSTRAINT `vendor_businesses_ibfk_2` FOREIGN KEY (`website_id`) REFERENCES `vendor_websites` (`id`),
  CONSTRAINT `vendor_businesses_ibfk_3` FOREIGN KEY (`business_type_id`) REFERENCES `business_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_businesses`
--

LOCK TABLES `vendor_businesses` WRITE;
/*!40000 ALTER TABLE `vendor_businesses` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_businesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_ledger`
--

DROP TABLE IF EXISTS `vendor_ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_ledger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_ledger`
--

LOCK TABLES `vendor_ledger` WRITE;
/*!40000 ALTER TABLE `vendor_ledger` DISABLE KEYS */;
INSERT INTO `vendor_ledger` VALUES (1,1,11,1,'booking_income',240.00,10.00,24.00,216.00,'pending',NULL,'2026-06-19 21:56:18');
/*!40000 ALTER TABLE `vendor_ledger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_payouts`
--

DROP TABLE IF EXISTS `vendor_payouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_payouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_payouts`
--

LOCK TABLES `vendor_payouts` WRITE;
/*!40000 ALTER TABLE `vendor_payouts` DISABLE KEYS */;
INSERT INTO `vendor_payouts` VALUES (1,1,100.00,'USD','mtn_momo',NULL,NULL,'256774488956',NULL,'approved','2026-06-19 13:29:58','2026-06-20 00:08:48',NULL,NULL,NULL);
/*!40000 ALTER TABLE `vendor_payouts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_wallets`
--

DROP TABLE IF EXISTS `vendor_wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_wallets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `pending_balance` decimal(10,2) DEFAULT 0.00,
  `available_balance` decimal(10,2) DEFAULT 0.00,
  `withdrawn_balance` decimal(10,2) DEFAULT 0.00,
  `currency` varchar(10) DEFAULT 'USD',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_vendor_wallet` (`vendor_id`),
  CONSTRAINT `vendor_wallets_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_wallets`
--

LOCK TABLES `vendor_wallets` WRITE;
/*!40000 ALTER TABLE `vendor_wallets` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_websites`
--

DROP TABLE IF EXISTS `vendor_websites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_websites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `template_id` int(11) DEFAULT NULL,
  `website_name` varchar(255) NOT NULL,
  `subdomain` varchar(255) DEFAULT NULL,
  `custom_domain` varchar(255) DEFAULT NULL,
  `logo` varchar(500) DEFAULT NULL,
  `favicon` varchar(500) DEFAULT NULL,
  `hero_image` varchar(500) DEFAULT NULL,
  `primary_color` varchar(20) DEFAULT '#C8102E',
  `secondary_color` varchar(20) DEFAULT '#000000',
  `accent_color` varchar(20) DEFAULT '#008751',
  `font_family` varchar(100) DEFAULT 'Poppins',
  `about` text DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `whatsapp` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `status` enum('draft','published','suspended') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `subdomain` (`subdomain`),
  KEY `vendor_id` (`vendor_id`),
  KEY `fk_website_template` (`template_id`),
  CONSTRAINT `fk_website_template` FOREIGN KEY (`template_id`) REFERENCES `website_templates` (`id`),
  CONSTRAINT `vendor_websites_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_websites`
--

LOCK TABLES `vendor_websites` WRITE;
/*!40000 ALTER TABLE `vendor_websites` DISABLE KEYS */;
INSERT INTO `vendor_websites` VALUES (1,2,1,'Kasolo Hospitality','kasolohospitality',NULL,NULL,NULL,NULL,'#C8102E','#000000','#008751','Poppins','Luxury hospitality services in Uganda.','info@kasolohospitality.com','+256700123456',NULL,NULL,'Kampala','Uganda',NULL,NULL,NULL,NULL,'published','2026-07-20 09:21:55','2026-07-20 17:20:50');
/*!40000 ALTER TABLE `vendor_websites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_withdrawals`
--

DROP TABLE IF EXISTS `vendor_withdrawals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_withdrawals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `wallet_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(100) DEFAULT NULL,
  `status` enum('pending','approved','paid','rejected') DEFAULT 'pending',
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `processed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `wallet_id` (`wallet_id`),
  CONSTRAINT `vendor_withdrawals_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`),
  CONSTRAINT `vendor_withdrawals_ibfk_2` FOREIGN KEY (`wallet_id`) REFERENCES `vendor_wallets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_withdrawals`
--

LOCK TABLES `vendor_withdrawals` WRITE;
/*!40000 ALTER TABLE `vendor_withdrawals` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_withdrawals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `business_type` enum('hotel','car_rental','tour_operator','restaurant','venue','mixed') DEFAULT 'mixed',
  `status` enum('pending','approved','rejected','suspended') DEFAULT 'pending',
  `commission_rate` decimal(5,2) DEFAULT 10.00,
  `address` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `tax_number` varchar(100) DEFAULT NULL,
  `registration_number` varchar(100) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `rating` decimal(2,1) DEFAULT 0.0,
  `total_reviews` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,1,'Zula Admin','admin@zula.com','0702123456','Zula Travels','2026-03-25 12:04:15','2026-07-20 09:12:09','mixed','pending',10.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0.0,0),(2,2,'John Doe','john@example.com','0700000000','Zula Travels','2026-03-25 12:05:28','2026-07-20 09:11:47','mixed','pending',10.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0.0,0);
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venues`
--

DROP TABLE IF EXISTS `venues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `venue_type` varchar(100) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `price_per_day` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `destination_id` (`destination_id`),
  KEY `fk_venues_vendor` (`vendor_id`),
  CONSTRAINT `fk_venues_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`),
  CONSTRAINT `venues_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venues`
--

LOCK TABLES `venues` WRITE;
/*!40000 ALTER TABLE `venues` DISABLE KEYS */;
INSERT INTO `venues` VALUES (1,1,'Hakim Conference Centre','Conference Hall',500,1200.00,'USD','Modern conference venue',1);
/*!40000 ALTER TABLE `venues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_programs`
--

DROP TABLE IF EXISTS `volunteer_programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer_programs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration_days` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_programs`
--

LOCK TABLES `volunteer_programs` WRITE;
/*!40000 ALTER TABLE `volunteer_programs` DISABLE KEYS */;
/*!40000 ALTER TABLE `volunteer_programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_transactions`
--

DROP TABLE IF EXISTS `wallet_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wallet_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `transaction_type` enum('booking_payment','commission','release','withdrawal','refund','adjustment') DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `balance_before` decimal(10,2) DEFAULT NULL,
  `balance_after` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `wallet_id` (`wallet_id`),
  KEY `vendor_id` (`vendor_id`),
  CONSTRAINT `wallet_transactions_ibfk_1` FOREIGN KEY (`wallet_id`) REFERENCES `vendor_wallets` (`id`),
  CONSTRAINT `wallet_transactions_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_transactions`
--

LOCK TABLES `wallet_transactions` WRITE;
/*!40000 ALTER TABLE `wallet_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `wallet_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_media`
--

DROP TABLE IF EXISTS `website_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) DEFAULT NULL,
  `business_id` int(11) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `file_type` varchar(100) DEFAULT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_media`
--

LOCK TABLES `website_media` WRITE;
/*!40000 ALTER TABLE `website_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `website_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_pages`
--

DROP TABLE IF EXISTS `website_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `website_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `page_type` varchar(100) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_homepage` tinyint(1) DEFAULT 0,
  `status` enum('published','draft') DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `website_id` (`website_id`),
  CONSTRAINT `website_pages_ibfk_1` FOREIGN KEY (`website_id`) REFERENCES `vendor_websites` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_pages`
--

LOCK TABLES `website_pages` WRITE;
/*!40000 ALTER TABLE `website_pages` DISABLE KEYS */;
INSERT INTO `website_pages` VALUES (2,1,'Home','/','homepage',NULL,0,1,'published','2026-07-20 10:26:33'),(3,1,'Rooms','rooms','rooms',NULL,0,0,'published','2026-07-20 10:26:33'),(4,1,'Restaurant','restaurant','restaurant',NULL,0,0,'published','2026-07-20 10:26:33'),(5,1,'Contact','contact','contact',NULL,0,0,'published','2026-07-20 10:26:33');
/*!40000 ALTER TABLE `website_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_sections`
--

DROP TABLE IF EXISTS `website_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` int(11) NOT NULL,
  `section_name` varchar(255) DEFAULT NULL,
  `section_type` varchar(100) DEFAULT NULL,
  `content_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content_json`)),
  `ai_generated` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `status` enum('active','hidden') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `page_id` (`page_id`),
  CONSTRAINT `website_sections_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `website_pages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_sections`
--

LOCK TABLES `website_sections` WRITE;
/*!40000 ALTER TABLE `website_sections` DISABLE KEYS */;
INSERT INTO `website_sections` VALUES (7,2,'hero','hero','{\"title\": \"hero\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,1,'active','2026-07-20 10:26:33'),(8,2,'about','about','{\"title\": \"about\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,2,'active','2026-07-20 10:26:33'),(9,2,'gallery','gallery','{\"title\": \"gallery\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,3,'active','2026-07-20 10:26:33'),(10,3,'room_listing','room_listing','{\"title\": \"room_listing\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,1,'active','2026-07-20 10:26:33'),(11,3,'booking','booking','{\"title\": \"booking\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,2,'active','2026-07-20 10:26:33'),(12,4,'menu','menu','{\"title\": \"menu\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,1,'active','2026-07-20 10:26:33'),(13,4,'gallery','gallery','{\"title\": \"gallery\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,2,'active','2026-07-20 10:26:33'),(14,5,'contact_form','contact_form','{\"title\": \"contact_form\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,1,'active','2026-07-20 10:26:33'),(15,5,'map','map','{\"title\": \"map\", \"subtitle\": \"\", \"description\": \"Content will be generated.\", \"button_text\": \"\", \"button_link\": \"\", \"images\": [], \"videos\": [], \"items\": [], \"settings\": {\"background_color\": \"#ffffff\", \"text_color\": \"#000000\", \"visible\": true}}',0,2,'active','2026-07-20 10:26:33');
/*!40000 ALTER TABLE `website_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `website_templates`
--

DROP TABLE IF EXISTS `website_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `website_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `business_type` enum('hotel','restaurant','tour_operator','car_rental','venue','mixed') NOT NULL,
  `layout` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`layout`)),
  `preview_image` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `website_templates`
--

LOCK TABLES `website_templates` WRITE;
/*!40000 ALTER TABLE `website_templates` DISABLE KEYS */;
INSERT INTO `website_templates` VALUES (1,'Luxury Hotel Template','hotel','{\n\"pages\":[\n{\n\"title\":\"Home\",\n\"slug\":\"/\",\n\"page_type\":\"homepage\",\n\"sections\":[\n\"hero\",\n\"about\",\n\"gallery\"\n]\n},\n{\n\"title\":\"Rooms\",\n\"slug\":\"rooms\",\n\"page_type\":\"rooms\",\n\"sections\":[\n\"room_listing\",\n\"booking\"\n]\n},\n{\n\"title\":\"Restaurant\",\n\"slug\":\"restaurant\",\n\"page_type\":\"restaurant\",\n\"sections\":[\n\"menu\",\n\"gallery\"\n]\n},\n{\n\"title\":\"Contact\",\n\"slug\":\"contact\",\n\"page_type\":\"contact\",\n\"sections\":[\n\"contact_form\",\n\"map\"\n]\n}\n]\n}',NULL,'active','2026-07-20 09:28:57'),(2,'Restaurant Template','restaurant','{\n\"pages\":[\n{\n\"title\":\"Home\",\n\"slug\":\"/\",\n\"page_type\":\"homepage\",\n\"sections\":[\n\"hero\",\n\"about\",\n\"gallery\"\n]\n},\n{\n\"title\":\"Menu\",\n\"slug\":\"menu\",\n\"page_type\":\"menu\",\n\"sections\":[\n\"food_menu\",\n\"gallery\"\n]\n},\n{\n\"title\":\"Reservation\",\n\"slug\":\"reservation\",\n\"page_type\":\"reservation\",\n\"sections\":[\n\"booking\",\n\"contact\"\n]\n}\n]\n}',NULL,'active','2026-07-20 09:28:57'),(3,'Safari Experience Template','tour_operator','{\n\"pages\":[\n{\n\"title\":\"Home\",\n\"slug\":\"/\",\n\"page_type\":\"homepage\",\n\"sections\":[\n\"hero\",\n\"about\",\n\"destinations\"\n]\n},\n{\n\"title\":\"Safari Packages\",\n\"slug\":\"packages\",\n\"page_type\":\"packages\",\n\"sections\":[\n\"tour_packages\",\n\"booking\"\n]\n},\n{\n\"title\":\"Gallery\",\n\"slug\":\"gallery\",\n\"page_type\":\"gallery\",\n\"sections\":[\n\"photos\"\n]\n},\n{\n\"title\":\"Contact\",\n\"slug\":\"contact\",\n\"page_type\":\"contact\",\n\"sections\":[\n\"contact_form\"\n]\n}\n]\n}',NULL,'active','2026-07-20 09:28:57'),(4,'Transport Template','car_rental','{\n\"pages\":[\n{\n\"title\":\"Home\",\n\"slug\":\"/\",\n\"page_type\":\"homepage\",\n\"sections\":[\n\"hero\",\n\"fleet\"\n]\n},\n{\n\"title\":\"Fleet\",\n\"slug\":\"fleet\",\n\"page_type\":\"fleet\",\n\"sections\":[\n\"vehicles\",\n\"drivers\"\n]\n},\n{\n\"title\":\"Booking\",\n\"slug\":\"booking\",\n\"page_type\":\"booking\",\n\"sections\":[\n\"booking_form\"\n]\n},\n{\n\"title\":\"Contact\",\n\"slug\":\"contact\",\n\"page_type\":\"contact\",\n\"sections\":[\n\"contact_form\"\n]\n}\n]\n}',NULL,'active','2026-07-20 09:28:57');
/*!40000 ALTER TABLE `website_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wildlife`
--

DROP TABLE IF EXISTS `wildlife`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wildlife` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `scientific_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `habitat` text DEFAULT NULL,
  `diet` text DEFAULT NULL,
  `lifespan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wildlife`
--

LOCK TABLES `wildlife` WRITE;
/*!40000 ALTER TABLE `wildlife` DISABLE KEYS */;
/*!40000 ALTER TABLE `wildlife` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-20 21:29:03
