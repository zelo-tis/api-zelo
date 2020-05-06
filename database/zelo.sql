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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.change_record: ~35 rows (aproximadamente)
DELETE FROM `change_record`;
/*!40000 ALTER TABLE `change_record` DISABLE KEYS */;
INSERT INTO `change_record` (`id`, `patient_id`, `responsible_user_id`, `prevision_date`, `treatment_id`, `status`, `completed_by_user_id`, `completed_at`, `created_at`) VALUES
	(1, 2, NULL, '2020-05-06 10:05:00', 1, 'TODO', NULL, NULL, NULL),
	(2, 2, NULL, '2020-05-06 13:05:00', 2, 'TODO', NULL, NULL, NULL),
	(3, 2, NULL, '2020-05-06 16:05:00', 3, 'TODO', NULL, NULL, NULL),
	(4, 2, NULL, '2020-05-06 19:05:00', 1, 'TODO', NULL, NULL, NULL),
	(5, 2, NULL, '2020-05-06 22:05:00', 2, 'TODO', NULL, NULL, NULL),
	(6, 2, NULL, '2020-05-07 01:05:00', 3, 'TODO', NULL, NULL, NULL),
	(7, 2, NULL, '2020-05-07 04:05:00', 1, 'TODO', NULL, NULL, NULL),
	(8, 2, NULL, '2020-05-07 10:05:00', 3, 'TODO', NULL, NULL, NULL),
	(9, 2, NULL, '2020-05-07 07:05:00', 2, 'TODO', NULL, NULL, NULL),
	(10, 2, NULL, '2020-05-07 16:05:00', 2, 'TODO', NULL, NULL, NULL),
	(11, 2, NULL, '2020-05-07 13:05:00', 1, 'TODO', NULL, NULL, NULL),
	(12, 2, NULL, '2020-05-07 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(13, 2, NULL, '2020-05-07 22:05:00', 1, 'TODO', NULL, NULL, NULL),
	(14, 2, NULL, '2020-05-08 01:05:00', 2, 'TODO', NULL, NULL, NULL),
	(15, 1, NULL, '2020-05-06 09:05:00', 4, 'TODO', NULL, NULL, NULL),
	(16, 1, NULL, '2020-05-06 11:05:00', 2, 'TODO', NULL, NULL, NULL),
	(17, 1, NULL, '2020-05-06 13:05:00', 3, 'TODO', NULL, NULL, NULL),
	(18, 1, NULL, '2020-05-06 15:05:00', 4, 'TODO', NULL, NULL, NULL),
	(19, 1, NULL, '2020-05-06 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(20, 1, NULL, '2020-05-06 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(21, 1, NULL, '2020-05-06 21:05:00', 4, 'TODO', NULL, NULL, NULL),
	(22, 1, NULL, '2020-05-06 23:05:00', 2, 'TODO', NULL, NULL, NULL),
	(23, 1, NULL, '2020-05-07 01:05:00', 3, 'TODO', NULL, NULL, NULL),
	(24, 1, NULL, '2020-05-07 03:05:00', 4, 'TODO', NULL, NULL, NULL),
	(25, 1, NULL, '2020-05-07 05:05:00', 2, 'TODO', NULL, NULL, NULL),
	(26, 1, NULL, '2020-05-07 07:05:00', 3, 'TODO', NULL, NULL, NULL),
	(27, 1, NULL, '2020-05-07 09:05:00', 4, 'TODO', NULL, NULL, NULL),
	(28, 1, NULL, '2020-05-07 11:05:00', 2, 'TODO', NULL, NULL, NULL),
	(29, 1, NULL, '2020-05-07 13:05:00', 3, 'TODO', NULL, NULL, NULL),
	(30, 1, NULL, '2020-05-07 15:05:00', 4, 'TODO', NULL, NULL, NULL),
	(31, 1, NULL, '2020-05-07 17:05:00', 2, 'TODO', NULL, NULL, NULL),
	(32, 1, NULL, '2020-05-07 19:05:00', 3, 'TODO', NULL, NULL, NULL),
	(33, 1, NULL, '2020-05-07 21:05:00', 4, 'TODO', NULL, NULL, NULL),
	(34, 1, NULL, '2020-05-07 23:05:00', 2, 'TODO', NULL, NULL, NULL),
	(35, 1, NULL, '2020-05-08 01:05:00', 3, 'TODO', NULL, NULL, NULL);
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
  `contact_restriction` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_patient_monitoring_patient1_idx` (`patient_id`),
  KEY `fk_patient_monitoring_movement_frequency1_idx` (`movement_frequency_id`),
  CONSTRAINT `fk_patient_monitoring_movement_frequency1` FOREIGN KEY (`movement_frequency_id`) REFERENCES `movement_frequency` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_patient_monitoring_patient1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.patient_monitoring: ~2 rows (aproximadamente)
DELETE FROM `patient_monitoring`;
/*!40000 ALTER TABLE `patient_monitoring` DISABLE KEYS */;
INSERT INTO `patient_monitoring` (`id`, `start_date`, `end_date`, `observation`, `active`, `patient_id`, `movement_frequency_id`, `contact_restriction`) VALUES
	(1, '2020-05-06 07:07:54', NULL, NULL, 1, 1, 1, NULL),
	(2, '2020-05-06 07:08:23', NULL, NULL, 1, 2, 2, 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela zelo.treatment: ~4 rows (aproximadamente)
DELETE FROM `treatment`;
/*!40000 ALTER TABLE `treatment` DISABLE KEYS */;
INSERT INTO `treatment` (`id`, `name`, `description`) VALUES
	(1, 'Decúbito Lateral Direito', NULL),
	(2, 'Decúbito Lateral Esquerdo', NULL),
	(3, 'Dorsal', NULL),
	(4, 'Descompressão', NULL);
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
