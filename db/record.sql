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

 Date: 16/10/2019 14:30:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `uri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `mid` int(11) NOT NULL,
  `struct` json NOT NULL,
  `ctime` datetime(0) NOT NULL DEFAULT '0000-01-01 00:00:00',
  `utime` datetime(0) NOT NULL DEFAULT '0000-01-01 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (1, 'select项目和模板组合', 'select项目和模板组合描述', 'select', 1, 1, 4, '[{\"name\": \"select-name-1\", \"image\": \"select-image-1\", \"people\": \"测试1\"}, {\"name\": \"select-name-2\", \"image\": \"select-image-2\", \"people\": \"测试12\"}, {\"name\": \"select-name-3\", \"image\": \"select-image-3\", \"people\": \"test1\"}, {\"name\": \"select-name-5\", \"image\": \"select-image-5\", \"people\": \"test2\"}]', '2019-10-08 14:53:18', '2019-10-14 19:49:28');
INSERT INTO `record` VALUES (3, '图片模板组合', '图片模板组合描述', 'picture', 1, 1, 3, '[{\"name\": \"test-picture-1\"}]', '2019-10-08 15:15:28', '2019-10-14 19:32:07');
INSERT INTO `record` VALUES (4, '组合3', '组合3描述', 'nickname', 1, 1, 5, '[{\"nickImg\": \"44\", \"nickname\": \"12\"}]', '2019-10-14 20:46:10', '2019-10-14 20:46:31');
INSERT INTO `record` VALUES (5, '组合test', '组合test', 'test', 1, 1, 6, '[{\"text\": \"发士大夫士大夫\", \"imgtest\": \"大股东\"}]', '2019-10-14 20:48:30', '2019-10-14 20:48:51');
INSERT INTO `record` VALUES (6, '功能民', '', '', 1, 1, 8, '[]', '2019-10-14 21:09:15', '2019-10-14 21:09:15');

SET FOREIGN_KEY_CHECKS = 1;
