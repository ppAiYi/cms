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

 Date: 16/10/2019 14:29:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mould
-- ----------------------------
DROP TABLE IF EXISTS `mould`;
CREATE TABLE `mould`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `pid` int(11) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `struct` json NOT NULL,
  `ctime` datetime(0) NOT NULL DEFAULT '0000-01-01 00:00:00',
  `utime` datetime(0) NOT NULL DEFAULT '0000-01-01 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mould
-- ----------------------------
INSERT INTO `mould` VALUES (2, '普通模板', 1, '这是个普通的模板', '[{\"type\": \"text\", \"value\": \"name\"}, {\"type\": \"text\", \"value\": \"nickname\"}, {\"type\": \"text\", \"value\": \"enname\"}]', '2019-10-01 18:32:55', '2019-10-14 19:27:51');
INSERT INTO `mould` VALUES (3, '图片模板', 1, '这个是图片的模板', '[{\"type\": \"image\", \"value\": \"name\"}]', '2019-10-01 18:37:00', '2019-10-14 19:28:00');
INSERT INTO `mould` VALUES (4, 'selected模板', 1, 'selected模板描述', '[{\"type\": \"text\", \"value\": \"name\"}, {\"type\": \"image\", \"value\": \"image\"}, {\"type\": \"selected\", \"value\": \"people\", \"selected\": \"[{\\\"name\\\":\\\"test1\\\",\\\"value\\\":\\\"测试1\\\"},{\\\"name\\\":\\\"test2\\\",\\\"value\\\":\\\"测试12\\\"}]\"}]', '2019-10-08 11:49:33', '2019-10-14 19:27:42');
INSERT INTO `mould` VALUES (5, 'nickname模板', 1, 'nickname模板描述', '[{\"type\": \"text\", \"value\": \"nickname\"}, {\"type\": \"image\", \"value\": \"nickImg\"}]', '2019-10-14 20:45:33', '2019-10-14 20:45:33');
INSERT INTO `mould` VALUES (6, '模板test', 1, '模板test', '[{\"type\": \"image\", \"value\": \"imgtest\"}, {\"type\": \"text\", \"value\": \"text\"}]', '2019-10-14 20:47:58', '2019-10-14 20:47:58');
INSERT INTO `mould` VALUES (7, '', 1, '', '[{\"type\": \"\", \"value\": \"\"}, {\"type\": \"image\", \"value\": \"\"}]', '2019-10-14 21:02:23', '2019-10-14 21:02:23');
INSERT INTO `mould` VALUES (8, '', 1, '', '[{\"type\": \"text\", \"value\": \"功能名称\"}]', '2019-10-14 21:08:54', '2019-10-14 21:09:43');
INSERT INTO `mould` VALUES (9, '老师卡片', 1, '卡片描述', '[{\"type\": \"text\", \"value\": \"wenben\"}, {\"type\": \"image\", \"value\": \"teachPic\"}]', '2019-10-15 11:25:16', '2019-10-15 11:25:16');

SET FOREIGN_KEY_CHECKS = 1;
