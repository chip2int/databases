



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Messages'
-- 
-- ---

DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `Uid` TINYINT(4) NULL DEFAULT NULL,
  `Tweet` MEDIUMTEXT NULL DEFAULT NULL,
  `Created At` DATE NULL DEFAULT NULL,
  `RoomID` TINYINT(4) NULL DEFAULT NULL
);

-- ---
-- Table 'ChatterBoxMain'
-- 
-- ---

DROP TABLE IF EXISTS `ChatterBoxMain`;
    
CREATE TABLE `ChatterBoxMain` (
  `UserID` TINYINT(4) NULL AUTO_INCREMENT DEFAULT NULL,
  `UserName` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`UserID`)
);

-- ---
-- Table 'Rooms'
-- 
-- ---

DROP TABLE IF EXISTS `Rooms`;
    
CREATE TABLE `Rooms` (
  `RoomID` TINYINT(4) NULL AUTO_INCREMENT   DEFAULT NULL,
  `RoomName` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`RoomID`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (Uid) REFERENCES `ChatterBoxMain` (`UserID`);
ALTER TABLE `Messages` ADD FOREIGN KEY (RoomID) REFERENCES `Rooms` (`RoomID`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ChatterBoxMain` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`Uid`,`Tweet`,`Created At`,`RoomID`) VALUES
-- ('','','','');
-- INSERT INTO `ChatterBoxMain` (`UserID`,`UserName`) VALUES
-- ('','');
-- INSERT INTO `Rooms` (`RoomID`,`RoomName`) VALUES
-- ('','');

