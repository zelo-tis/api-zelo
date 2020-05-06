-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.3.13-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para zelo
CREATE DATABASE IF NOT EXISTS `zelo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `zelo`;

-- Copiando estrutura para tabela zelo.bed
CREATE TABLE IF NOT EXISTS `bed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) DEFAULT NULL,
  `observation` varchar(200) DEFAULT NULL,
  `station_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bed_station1_idx` (`station_id`),
  CONSTRAINT `fk_bed_station1` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.bed: ~3 rows (aproximadamente)
DELETE FROM `bed`;
/*!40000 ALTER TABLE `bed` DISABLE KEYS */;
INSERT INTO `bed` (`id`, `number`, `observation`, `station_id`) VALUES
	(1, 1, NULL, 1),
	(2, 2, NULL, 1),
	(3, 3, NULL, 1);
/*!40000 ALTER TABLE `bed` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.change_record
CREATE TABLE IF NOT EXISTS `change_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL,
  `responsible_user_id` int(11) DEFAULT NULL,
  `prevision_date` datetime DEFAULT NULL,
  `treatment_id` int(11) NOT NULL,
  `status` enum('TODO','DONE') DEFAULT NULL,
  `completed_by_user_id` int(11) DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_change_record_patient2_idx` (`patient_id`),
  KEY `fk_change_record_user3_idx` (`responsible_user_id`),
  KEY `fk_change_record_user4_idx` (`completed_by_user_id`),
  KEY `fk_change_record_treatment1_idx` (`treatment_id`),
  CONSTRAINT `fk_change_record_patient2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_change_record_treatment1` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_change_record_user3` FOREIGN KEY (`responsible_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_change_record_user4` FOREIGN KEY (`completed_by_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.change_record: ~101 rows (aproximadamente)
DELETE FROM `change_record`;
/*!40000 ALTER TABLE `change_record` DISABLE KEYS */;
INSERT INTO `change_record` (`id`, `patient_id`, `responsible_user_id`, `prevision_date`, `treatment_id`, `status`, `completed_by_user_id`, `completed_at`, `created_at`) VALUES
	(1, 2, NULL, '2020-05-02 23:05:00', 1, 'TODO', NULL, NULL, NULL),
	(2, 2, NULL, '2020-05-03 02:05:00', 1, 'TODO', NULL, NULL, NULL),
	(3, 2, NULL, '2020-05-03 05:05:00', 2, 'TODO', NULL, NULL, NULL),
	(4, 2, NULL, '2020-05-03 08:05:00', 3, 'TODO', NULL, NULL, NULL),
	(5, 2, NULL, '2020-05-03 14:05:00', 2, 'TODO', NULL, NULL, NULL),
	(6, 2, NULL, '2020-05-03 17:05:00', 3, 'TODO', NULL, NULL, NULL),
	(7, 2, NULL, '2020-05-03 11:05:00', 1, 'TODO', NULL, NULL, NULL),
	(8, 2, NULL, '2020-05-03 23:05:00', 2, 'TODO', NULL, NULL, NULL),
	(9, 2, NULL, '2020-05-04 02:05:00', 3, 'TODO', NULL, NULL, NULL),
	(10, 2, NULL, '2020-05-04 05:05:00', 1, 'TODO', NULL, NULL, NULL),
	(11, 2, NULL, '2020-05-03 20:05:00', 1, 'TODO', NULL, NULL, NULL),
	(12, 2, NULL, '2020-05-04 11:05:00', 3, 'TODO', NULL, NULL, NULL),
	(13, 2, NULL, '2020-05-04 08:05:00', 2, 'TODO', NULL, NULL, NULL),
	(14, 2, NULL, '2020-05-04 14:05:00', 1, 'TODO', NULL, NULL, NULL),
	(15, 2, NULL, '2020-05-04 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(16, 2, NULL, '2020-05-04 20:05:00', 3, 'TODO', NULL, NULL, NULL),
	(17, 2, NULL, '2020-05-04 23:05:00', 1, 'TODO', NULL, NULL, NULL),
	(18, 2, NULL, '2020-05-05 02:05:00', 2, 'TODO', NULL, NULL, NULL),
	(19, 2, NULL, '2020-05-05 05:05:00', 3, 'TODO', NULL, NULL, NULL),
	(20, 2, NULL, '2020-05-05 08:05:00', 1, 'TODO', NULL, NULL, NULL),
	(21, 2, NULL, '2020-05-05 11:05:00', 2, 'TODO', NULL, NULL, NULL),
	(22, 2, NULL, '2020-05-05 14:05:00', 3, 'TODO', NULL, NULL, NULL),
	(23, 2, NULL, '2020-05-05 17:05:00', 1, 'TODO', NULL, NULL, NULL),
	(24, 2, NULL, '2020-05-05 20:05:00', 2, 'TODO', NULL, NULL, NULL),
	(25, 2, NULL, '2020-05-05 23:05:00', 3, 'TODO', NULL, NULL, NULL),
	(26, 2, NULL, '2020-05-06 02:05:00', 1, 'TODO', NULL, NULL, NULL),
	(27, 2, NULL, '2020-05-06 05:05:00', 2, 'TODO', NULL, NULL, NULL),
	(28, 2, NULL, '2020-05-06 08:05:00', 3, 'TODO', NULL, NULL, NULL),
	(29, 2, NULL, '2020-05-06 11:05:00', 1, 'TODO', NULL, NULL, NULL),
	(30, 2, NULL, '2020-05-06 14:05:00', 2, 'TODO', NULL, NULL, NULL),
	(31, 2, NULL, '2020-05-06 20:05:00', 1, 'TODO', NULL, NULL, NULL),
	(32, 2, NULL, '2020-05-06 17:05:00', 3, 'TODO', NULL, NULL, NULL),
	(33, 2, NULL, '2020-05-06 23:05:00', 2, 'TODO', NULL, NULL, NULL),
	(34, 2, NULL, '2020-05-07 02:05:00', 3, 'TODO', NULL, NULL, NULL),
	(35, 1, NULL, '2020-05-01 13:05:00', 2, 'TODO', NULL, NULL, NULL),
	(36, 1, NULL, '2020-05-01 15:05:00', 3, 'TODO', NULL, NULL, NULL),
	(37, 1, NULL, '2020-05-01 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(38, 1, NULL, '2020-05-01 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(39, 1, NULL, '2020-05-01 21:05:00', 2, 'TODO', NULL, NULL, NULL),
	(40, 1, NULL, '2020-05-01 23:05:00', 3, 'TODO', NULL, NULL, NULL),
	(41, 1, NULL, '2020-05-02 03:05:00', 3, 'TODO', NULL, NULL, NULL),
	(42, 1, NULL, '2020-05-02 01:05:00', 2, 'TODO', NULL, NULL, NULL),
	(43, 1, NULL, '2020-05-02 05:05:00', 2, 'TODO', NULL, NULL, NULL),
	(44, 1, NULL, '2020-05-02 07:05:00', 3, 'TODO', NULL, NULL, NULL),
	(45, 1, NULL, '2020-05-02 09:05:00', 2, 'TODO', NULL, NULL, NULL),
	(46, 1, NULL, '2020-05-02 11:05:00', 3, 'TODO', NULL, NULL, NULL),
	(47, 1, NULL, '2020-05-02 13:05:00', 2, 'TODO', NULL, NULL, NULL),
	(48, 1, NULL, '2020-05-02 15:05:00', 3, 'TODO', NULL, NULL, NULL),
	(49, 1, NULL, '2020-05-02 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(50, 1, NULL, '2020-05-02 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(51, 1, NULL, '2020-05-02 21:05:00', 2, 'TODO', NULL, NULL, NULL),
	(52, 1, NULL, '2020-05-02 23:05:00', 3, 'TODO', NULL, NULL, NULL),
	(53, 1, NULL, '2020-05-03 01:05:00', 2, 'TODO', NULL, NULL, NULL),
	(54, 1, NULL, '2020-05-03 03:05:00', 3, 'TODO', NULL, NULL, NULL),
	(55, 1, NULL, '2020-05-03 05:05:00', 2, 'TODO', NULL, NULL, NULL),
	(56, 1, NULL, '2020-05-03 07:05:00', 3, 'TODO', NULL, NULL, NULL),
	(57, 1, NULL, '2020-05-03 09:05:00', 2, 'TODO', NULL, NULL, NULL),
	(58, 1, NULL, '2020-05-03 11:05:00', 3, 'TODO', NULL, NULL, NULL),
	(59, 1, NULL, '2020-05-03 13:05:00', 2, 'TODO', NULL, NULL, NULL),
	(60, 1, NULL, '2020-05-03 15:05:00', 3, 'TODO', NULL, NULL, NULL),
	(61, 1, NULL, '2020-05-03 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(62, 1, NULL, '2020-05-03 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(63, 1, NULL, '2020-05-03 21:05:00', 2, 'TODO', NULL, NULL, NULL),
	(64, 1, NULL, '2020-05-03 23:05:00', 3, 'TODO', NULL, NULL, NULL),
	(65, 1, NULL, '2020-05-04 01:05:00', 2, 'TODO', NULL, NULL, NULL),
	(66, 1, NULL, '2020-05-04 03:05:00', 3, 'TODO', NULL, NULL, NULL),
	(67, 1, NULL, '2020-05-04 05:05:00', 2, 'TODO', NULL, NULL, NULL),
	(68, 1, NULL, '2020-05-04 07:05:00', 3, 'TODO', NULL, NULL, NULL),
	(69, 1, NULL, '2020-05-04 09:05:00', 2, 'TODO', NULL, NULL, NULL),
	(70, 1, NULL, '2020-05-04 11:05:00', 3, 'TODO', NULL, NULL, NULL),
	(71, 1, NULL, '2020-05-04 13:05:00', 2, 'TODO', NULL, NULL, NULL),
	(72, 1, NULL, '2020-05-04 15:05:00', 3, 'TODO', NULL, NULL, NULL),
	(73, 1, NULL, '2020-05-04 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(74, 1, NULL, '2020-05-04 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(75, 1, NULL, '2020-05-04 21:05:00', 2, 'TODO', NULL, NULL, NULL),
	(76, 1, NULL, '2020-05-04 23:05:00', 3, 'TODO', NULL, NULL, NULL),
	(77, 1, NULL, '2020-05-05 01:05:00', 2, 'TODO', NULL, NULL, NULL),
	(78, 1, NULL, '2020-05-05 03:05:00', 3, 'TODO', NULL, NULL, NULL),
	(79, 1, NULL, '2020-05-05 05:05:00', 2, 'TODO', NULL, NULL, NULL),
	(80, 1, NULL, '2020-05-05 07:05:00', 3, 'TODO', NULL, NULL, NULL),
	(81, 1, NULL, '2020-05-05 09:05:00', 2, 'TODO', NULL, NULL, NULL),
	(82, 1, NULL, '2020-05-05 11:05:00', 3, 'TODO', NULL, NULL, NULL),
	(83, 1, NULL, '2020-05-05 13:05:00', 2, 'TODO', NULL, NULL, NULL),
	(84, 1, NULL, '2020-05-05 15:05:00', 3, 'TODO', NULL, NULL, NULL),
	(85, 1, NULL, '2020-05-05 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(86, 1, NULL, '2020-05-05 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(87, 1, NULL, '2020-05-05 21:05:00', 2, 'TODO', NULL, NULL, NULL),
	(88, 1, NULL, '2020-05-05 23:05:00', 3, 'TODO', NULL, NULL, NULL),
	(89, 1, NULL, '2020-05-06 01:05:00', 2, 'TODO', NULL, NULL, NULL),
	(90, 1, NULL, '2020-05-06 03:05:00', 3, 'TODO', NULL, NULL, NULL),
	(91, 1, NULL, '2020-05-06 05:05:00', 2, 'TODO', NULL, NULL, NULL),
	(92, 1, NULL, '2020-05-06 07:05:00', 3, 'TODO', NULL, NULL, NULL),
	(93, 1, NULL, '2020-05-06 09:05:00', 2, 'TODO', NULL, NULL, NULL),
	(94, 1, NULL, '2020-05-06 11:05:00', 3, 'TODO', NULL, NULL, NULL),
	(95, 1, NULL, '2020-05-06 13:05:00', 2, 'TODO', NULL, NULL, NULL),
	(96, 1, NULL, '2020-05-06 15:05:00', 3, 'TODO', NULL, NULL, NULL),
	(97, 1, NULL, '2020-05-06 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(98, 1, NULL, '2020-05-06 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(99, 1, NULL, '2020-05-06 21:05:00', 2, 'TODO', NULL, NULL, NULL),
	(100, 1, NULL, '2020-05-06 23:05:00', 3, 'TODO', NULL, NULL, NULL),
	(101, 1, NULL, '2020-05-07 01:05:00', 2, 'TODO', NULL, NULL, NULL);
/*!40000 ALTER TABLE `change_record` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.movement_frequency
CREATE TABLE IF NOT EXISTS `movement_frequency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `frequency` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.movement_frequency: ~2 rows (aproximadamente)
DELETE FROM `movement_frequency`;
/*!40000 ALTER TABLE `movement_frequency` DISABLE KEYS */;
INSERT INTO `movement_frequency` (`id`, `frequency`) VALUES
	(1, 2),
	(2, 3);
/*!40000 ALTER TABLE `movement_frequency` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.patient
CREATE TABLE IF NOT EXISTS `patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `attendance_number` int(11) DEFAULT NULL,
  `braden` int(11) DEFAULT NULL,
  `observation` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.patient: ~4 rows (aproximadamente)
DELETE FROM `patient`;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` (`id`, `name`, `attendance_number`, `braden`, `observation`) VALUES
	(1, 'Flávio Cunha dos Santos', 1234512, 50, NULL),
	(2, 'Gabriela Nolasco', 1234514, 60, NULL),
	(3, 'Victor de Souza', 534413, 45, NULL),
	(5, 'Maria Geraldo da Silva', 3, 45, '');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.patient_hospitalization
CREATE TABLE IF NOT EXISTS `patient_hospitalization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` int(11) NOT NULL,
  `bed_id` int(11) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `observation` varchar(46) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patient_hospitalization_patient1_idx` (`patient_id`),
  KEY `fk_patient_hospitalization_bed1_idx` (`bed_id`),
  CONSTRAINT `fk_patient_hospitalization_bed1` FOREIGN KEY (`bed_id`) REFERENCES `bed` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_patient_hospitalization_patient1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.patient_hospitalization: ~2 rows (aproximadamente)
DELETE FROM `patient_hospitalization`;
/*!40000 ALTER TABLE `patient_hospitalization` DISABLE KEYS */;
INSERT INTO `patient_hospitalization` (`id`, `patient_id`, `bed_id`, `start_date`, `end_date`, `observation`, `active`) VALUES
	(1, 1, 1, '2020-02-25 17:56:56', NULL, NULL, 1),
	(2, 2, 2, '2020-03-25 20:10:31', NULL, NULL, 1);
/*!40000 ALTER TABLE `patient_hospitalization` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.patient_monitoring
CREATE TABLE IF NOT EXISTS `patient_monitoring` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `observation` varchar(600) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `patient_id` int(11) NOT NULL,
  `movement_frequency_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patient_monitoring_patient1_idx` (`patient_id`),
  KEY `fk_patient_monitoring_movement_frequency1_idx` (`movement_frequency_id`),
  CONSTRAINT `fk_patient_monitoring_movement_frequency1` FOREIGN KEY (`movement_frequency_id`) REFERENCES `movement_frequency` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_patient_monitoring_patient1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.patient_monitoring: ~2 rows (aproximadamente)
DELETE FROM `patient_monitoring`;
/*!40000 ALTER TABLE `patient_monitoring` DISABLE KEYS */;
INSERT INTO `patient_monitoring` (`id`, `start_date`, `end_date`, `observation`, `active`, `patient_id`, `movement_frequency_id`) VALUES
	(1, '2020-05-01 11:07:54', NULL, NULL, 1, 1, 1),
	(2, '2020-05-02 20:08:23', NULL, NULL, 1, 2, 2);
/*!40000 ALTER TABLE `patient_monitoring` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.patient_restriction
CREATE TABLE IF NOT EXISTS `patient_restriction` (
  `patient_id` int(11) NOT NULL,
  `restriction_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patient_has_restriction_restriction1_idx` (`restriction_id`),
  KEY `fk_patient_has_restriction_patient1_idx` (`patient_id`),
  CONSTRAINT `fk_patient_has_restriction_patient1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_patient_has_restriction_restriction1` FOREIGN KEY (`restriction_id`) REFERENCES `restriction` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.patient_restriction: ~1 rows (aproximadamente)
DELETE FROM `patient_restriction`;
/*!40000 ALTER TABLE `patient_restriction` DISABLE KEYS */;
INSERT INTO `patient_restriction` (`patient_id`, `restriction_id`, `id`, `active`) VALUES
	(1, 1, 1, 1);
/*!40000 ALTER TABLE `patient_restriction` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.restriction
CREATE TABLE IF NOT EXISTS `restriction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(150) DEFAULT NULL,
  `treatment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_restriction_treatment1_idx` (`treatment_id`),
  CONSTRAINT `fk_restriction_treatment1` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.restriction: ~1 rows (aproximadamente)
DELETE FROM `restriction`;
/*!40000 ALTER TABLE `restriction` DISABLE KEYS */;
INSERT INTO `restriction` (`id`, `description`, `treatment_id`) VALUES
	(1, NULL, 1);
/*!40000 ALTER TABLE `restriction` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.station
CREATE TABLE IF NOT EXISTS `station` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.station: ~0 rows (aproximadamente)
DELETE FROM `station`;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;
INSERT INTO `station` (`id`, `name`, `description`) VALUES
	(1, 'Posto 1', NULL);
/*!40000 ALTER TABLE `station` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.treatment
CREATE TABLE IF NOT EXISTS `treatment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `description` varchar(1200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.treatment: ~3 rows (aproximadamente)
DELETE FROM `treatment`;
/*!40000 ALTER TABLE `treatment` DISABLE KEYS */;
INSERT INTO `treatment` (`id`, `name`, `description`) VALUES
	(1, 'Decúbito Lateral Direito', NULL),
	(2, 'Decúbito Lateral Esquerdo', NULL),
	(3, 'Dorsal', NULL);
/*!40000 ALTER TABLE `treatment` ENABLE KEYS */;

-- Copiando estrutura para tabela zelo.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.user: ~0 rows (aproximadamente)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
