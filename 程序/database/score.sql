/*
Navicat MySQL Data Transfer

Source Server         : ten1
Source Server Version : 50711
Source Host           : 127.0.0.1:3306
Source Database       : score

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2017-06-10 13:11:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for scorelist
-- ----------------------------
DROP TABLE IF EXISTS `scorelist`;
CREATE TABLE `scorelist` (
  `id` int(13) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `career` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `usualScore` int(10) DEFAULT NULL,
  `jobScore` int(10) DEFAULT NULL,
  `finalScore` int(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of scorelist
-- ----------------------------
INSERT INTO `scorelist` VALUES ('4', '4', '4', '4', '4', '44', '4');
INSERT INTO `scorelist` VALUES ('12', '12', '12', '12', '12', '12', '12');
INSERT INTO `scorelist` VALUES ('123', '111', '1', '1', '1', '1', '1');
INSERT INTO `scorelist` VALUES ('201324106', '王+5', '123', '123', '123', '123', '12');
INSERT INTO `scorelist` VALUES ('201324166', '王7', '123', '123', '123', '123', '123');
INSERT INTO `scorelist` VALUES ('201324198', '王6', '123', '123', '123', '123', '123');
INSERT INTO `scorelist` VALUES ('2013241099', '王8', '123', '123', '123', '123', '123');
INSERT INTO `scorelist` VALUES ('2013242009', '我们', '结算及科学与技术', '123', '12', '12', '12');
