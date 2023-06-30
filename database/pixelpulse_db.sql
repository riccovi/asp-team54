CREATE DATABASE  IF NOT EXISTS `pixelpulse_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pixelpulse_db`;
-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: pixelpulse_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('student','recruiter') NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

CREATE TABLE Projet (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectTitle` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `projectPicture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  Foreign Key (`id`) REFERENCES (`users`)
  Foreign Key (`username`) REFERENCES (`users`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'JamaicaNegra','BlackJamaicaPassword','blackJamaica@gmail.com','student',NULL,'2023-06-23 03:26:43','2023-06-23 03:26:43'),(2,'tercer','10101010101010','tercer@g.com','student',NULL,'2023-06-23 03:32:07','2023-06-23 03:32:07'),(3,'Elon Musk','TeslaRules','elon@tesla.com','recruiter',NULL,'2023-06-23 03:38:46','2023-06-23 03:38:46'),(4,'PhantomTech','$2b$10$Z1bmQP56sBD7pED6nt7MDO9tGP9.HQpPF0U/6RhCN8Yc2IUXPSgPO','phantomthec@gmail.com','student',NULL,'2023-06-23 03:44:18','2023-06-23 03:44:18'),(5,'jose','$2b$10$J2yUJ5n6.uq6whocGHTSyOywgkByZlWzyplkOLA8o/em.xyM3MCWG','joslangarica@gmail.com','student',NULL,'2023-06-23 04:02:54','2023-06-23 04:02:54'),(6,'Maria','$2b$10$bOSwPmncUeJVrxbZ6i2zoOyK2ehW31GQseSe14QtXmI5TeAs9BOmG','maria@gmail.com','student',NULL,'2023-06-23 04:05:40','2023-06-23 04:05:40'),(7,'lalolanda','$2b$10$RuAXbcTJXCQfQ0NlmOZ6KO7splFwKve8qjlSmJwxLGJOomCyfYghW','lalolanda@gmail.com','student',NULL,'2023-06-23 04:52:50','2023-06-23 04:52:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-23  8:20:17
