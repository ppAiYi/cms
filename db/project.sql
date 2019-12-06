/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : localhost:3306
 Source Schema         : cms

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 16/10/2019 14:29:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `uids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `ctime` datetime(0) NOT NULL DEFAULT '0000-01-01 00:00:00',
  `utime` datetime(0) NOT NULL DEFAULT '0000-01-01 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (1, '项目1', '1,2,3', '项目1描述', '2019-09-30 20:53:51', '2019-10-14 20:44:42');
INSERT INTO `project` VALUES (2, 'abc菜鸟测试95', '1,2,3', '我是描述测试数据95', '2019-09-30 20:57:33', '2019-09-30 20:57:33');
INSERT INTO `project` VALUES (3, 'abc菜鸟测试55', '1,2,3', '我是描述测试数据55', '2019-09-30 21:00:23', '2019-09-30 21:00:23');
INSERT INTO `project` VALUES (4, 'abc菜鸟测试67', '1,2,3', '我是描述测试数据67', '2019-09-30 21:00:28', '2019-09-30 21:00:28');
INSERT INTO `project` VALUES (5, 'abc菜鸟测试102', '1,2,3', '我是描述测试数据103', '2019-10-01 15:42:25', '2019-10-01 15:42:25');
INSERT INTO `project` VALUES (6, 'test123', '1,2,3', 'fdgsfdfasfsdgs', '2019-10-01 15:42:55', '2019-10-01 15:42:55');
INSERT INTO `project` VALUES (7, 'yrdy', 'dgdsgfdsg', 'dgsdfgfd', '2019-10-01 15:47:19', '2019-10-01 15:47:19');
INSERT INTO `project` VALUES (8, 'sfsdfsdf', '1,2', 'sdfsdfsafdsaf', '2019-10-01 15:48:10', '2019-10-01 16:01:38');
INSERT INTO `project` VALUES (11, 'dsfhgfdfh', '1,2', '2423ggfd', '2019-10-01 15:58:00', '2019-10-01 16:08:30');
INSERT INTO `project` VALUES (12, 'fdgsfsadf', '1', '24342344trfgdsfs', '2019-10-01 16:06:08', '2019-10-01 16:06:08');
INSERT INTO `project` VALUES (13, 'gfghjrwetfdbvbmktrf', '1', '2454352', '2019-10-01 16:08:22', '2019-10-01 16:08:22');
INSERT INTO `project` VALUES (14, 'safsfs', '1', 'safsdfdsd', '2019-10-01 16:20:04', '2019-10-01 16:20:04');

SET FOREIGN_KEY_CHECKS = 1;
