/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : 106.13.99.166:3306
 Source Schema         : fs

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 28/05/2021 20:54:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fs_city
-- ----------------------------
DROP TABLE IF EXISTS `fs_city`;
CREATE TABLE `fs_city`  (
  `city` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`city`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_city
-- ----------------------------
INSERT INTO `fs_city` VALUES ('上海');
INSERT INTO `fs_city` VALUES ('临汾');
INSERT INTO `fs_city` VALUES ('北京');
INSERT INTO `fs_city` VALUES ('南京');
INSERT INTO `fs_city` VALUES ('四川');
INSERT INTO `fs_city` VALUES ('太原');
INSERT INTO `fs_city` VALUES ('无锡');
INSERT INTO `fs_city` VALUES ('杭州');
INSERT INTO `fs_city` VALUES ('湖北');
INSERT INTO `fs_city` VALUES ('苏州');
INSERT INTO `fs_city` VALUES ('运城');

-- ----------------------------
-- Table structure for fs_cityPub
-- ----------------------------
DROP TABLE IF EXISTS `fs_cityPub`;
CREATE TABLE `fs_cityPub`  (
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pub` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `id` int NOT NULL,
  `http` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ratings` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_cityPub
-- ----------------------------
INSERT INTO `fs_cityPub` VALUES ('南京', '南京中心大酒店', 1, 'http://www.centre-hotel.cn/', '4.8');
INSERT INTO `fs_cityPub` VALUES ('四川', '四川凯撒大酒店', 2, 'http://www.sckairuihotel.com/', '4.7');
INSERT INTO `fs_cityPub` VALUES ('南京', '南京北方大酒店', 3, 'http://www.baidu.com', '4.5');
INSERT INTO `fs_cityPub` VALUES ('四川', '四川东方大酒店', 4, 'http://www.baidu.com', '4.8');

-- ----------------------------
-- Table structure for fs_company
-- ----------------------------
DROP TABLE IF EXISTS `fs_company`;
CREATE TABLE `fs_company`  (
  `cid` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_company
-- ----------------------------
INSERT INTO `fs_company` VALUES ('DF', '东方航空');
INSERT INTO `fs_company` VALUES ('HB', '湖北航空');
INSERT INTO `fs_company` VALUES ('NF', '南方航空');
INSERT INTO `fs_company` VALUES ('SC', '四川航空');
INSERT INTO `fs_company` VALUES ('SZ', '深圳航空');
INSERT INTO `fs_company` VALUES ('XM', '厦门航空');

-- ----------------------------
-- Table structure for fs_info
-- ----------------------------
DROP TABLE IF EXISTS `fs_info`;
CREATE TABLE `fs_info`  (
  `pid` int NOT NULL AUTO_INCREMENT,
  `cid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pmodel` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pStartCity` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pEndCity` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pStartArea` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pEndArea` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pStartTime` bigint NOT NULL,
  `pEndTime` bigint NOT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 334 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_info
-- ----------------------------
INSERT INTO `fs_info` VALUES (1, 'NF', 'AS6666', 'yt1145', '南京', '北京', '南京禄口国际机场', '北京大兴国际机场', 1616918845000, 1616929645000);
INSERT INTO `fs_info` VALUES (2, 'DF', 'AS1264', 'u747', '无锡', '北京', '苏南硕放国际机场', '北京首都国际机场', 1616918845000, 1616929645000);
INSERT INTO `fs_info` VALUES (3, 'HB', 'WQ5662', 'd4526', '湖北', '南京', '武汉天河国际机场', '南京禄口国际机场', 1619336415000, 1619347215000);
INSERT INTO `fs_info` VALUES (4, 'HB', 'WA5662', 'd4526', '湖北', '南京', '武汉天河国际机场', '南京禄口国际机场', 1619350815000, 1619354415000);
INSERT INTO `fs_info` VALUES (5, 'SC', 'SI1234', 'cd4896', '四川', '南京', '成都双流国际机场', '南京禄口国际机场', 1630276815000, 1630291215000);
INSERT INTO `fs_info` VALUES (6, 'SC', 'SI1834', 'cd4896', '四川', '南京', '宜宾五粮液机场', '南京禄口国际机场', 1630299015000, 1630309815000);
INSERT INTO `fs_info` VALUES (7, 'SC', 'SI1652', 'cd4896', '四川', '南京', '泸州云龙机场', '南京禄口国际机场', 1630313415000, 1630327815000);
INSERT INTO `fs_info` VALUES (8, 'SC', 'SI1654', 'cd4896', '四川', '南京', '泸州云龙机场', '南京禄口国际机场', 1619787015000, 1619797815000);
INSERT INTO `fs_info` VALUES (9, 'SC', 'SI1652', 'cd4896', '四川', '南京', '泸州云龙机场', '南京禄口国际机场', 1619787015000, 1619797815000);
INSERT INTO `fs_info` VALUES (11, 'DF', '123', '124', '北京', '南京', '北京首都国际机场', '南京禄口国际机场', 1619452800000, 1619712000000);
INSERT INTO `fs_info` VALUES (14, 'HB', '123', '123', '湖北', '北京', '武汉天河国际机场', '北京首都国际机场', 1619452800000, 1619712000000);
INSERT INTO `fs_info` VALUES (15, 'NF', 'DE1234', 'AD1252', '南京', '杭州', '南京禄口国际机场', '杭州萧山国际机场', 1619665741000, 1619690760000);
INSERT INTO `fs_info` VALUES (25, 'SZ', 'DJ2265', 'ml2551', '南京', '四川', '南京禄口国际机场', '泸州云龙机场', 1630303813000, 1630311194000);
INSERT INTO `fs_info` VALUES (33, 'HB', '33', 'MA33', '四川', '北京', '成都双流国际机场', '北京大兴国际机场', 1619744763000, 1619787600000);
INSERT INTO `fs_info` VALUES (40, 'NF', 'KD155', 'MOD11', '四川', '南京', '宜宾五粮液机场', '南京禄口国际机场', 1630292820000, 1630268182000);
INSERT INTO `fs_info` VALUES (45, 'DF', 'dk1556', 'md1266', '四川', '南京', '成都双流国际机场', '南京禄口国际机场', 1624320961000, 1623261678000);

-- ----------------------------
-- Table structure for fs_planeArea
-- ----------------------------
DROP TABLE IF EXISTS `fs_planeArea`;
CREATE TABLE `fs_planeArea`  (
  `id` int NOT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cityArea` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_planeArea
-- ----------------------------
INSERT INTO `fs_planeArea` VALUES (1, '北京', '北京首都国际机场');
INSERT INTO `fs_planeArea` VALUES (2, '北京', '北京大兴国际机场');
INSERT INTO `fs_planeArea` VALUES (3, '湖北', '武汉天河国际机场');
INSERT INTO `fs_planeArea` VALUES (4, '南京', '南京禄口国际机场');
INSERT INTO `fs_planeArea` VALUES (5, '四川', '成都双流国际机场');
INSERT INTO `fs_planeArea` VALUES (6, '四川', '宜宾五粮液机场');
INSERT INTO `fs_planeArea` VALUES (7, '四川', '泸州云龙机场');
INSERT INTO `fs_planeArea` VALUES (8, '无锡', '苏南硕放国际机场');
INSERT INTO `fs_planeArea` VALUES (9, '上海', '上海虹桥国际机场');
INSERT INTO `fs_planeArea` VALUES (10, '杭州', '杭州萧山国际机场');
INSERT INTO `fs_planeArea` VALUES (14, '上海', '上海浦东国际机场');

-- ----------------------------
-- Table structure for fs_planeState
-- ----------------------------
DROP TABLE IF EXISTS `fs_planeState`;
CREATE TABLE `fs_planeState`  (
  `pid` int NOT NULL,
  `checkInCounter` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '值机柜台',
  `expectedFly` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '预计出发时间',
  `expectedLand` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '预计降落时间',
  `signIn` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '登机口',
  `signOut` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '出口',
  `luggage` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '行李转盘',
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_planeState
-- ----------------------------
INSERT INTO `fs_planeState` VALUES (1, '123', '1620835200000', '1620856800000', '123', '124', '21');
INSERT INTO `fs_planeState` VALUES (5, '2-12', '1630276815000', '1630291215000', '25', '30', '15');
INSERT INTO `fs_planeState` VALUES (40, '3-6', '1630289760000', '1630314360000', '30', '20', '15');

-- ----------------------------
-- Table structure for fs_ticketPrice
-- ----------------------------
DROP TABLE IF EXISTS `fs_ticketPrice`;
CREATE TABLE `fs_ticketPrice`  (
  `pid` int NOT NULL,
  `usualNumber` int NOT NULL,
  `usualPrice` int NOT NULL,
  `noUsualNumber` int NOT NULL,
  `noUsualPrice` int NOT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_ticketPrice
-- ----------------------------
INSERT INTO `fs_ticketPrice` VALUES (1, 12, 320, 3, 560);
INSERT INTO `fs_ticketPrice` VALUES (2, 20, 200, 2, 300);
INSERT INTO `fs_ticketPrice` VALUES (3, 30, 1000, 2, 220);
INSERT INTO `fs_ticketPrice` VALUES (4, 30, 2000, 30, 50000);
INSERT INTO `fs_ticketPrice` VALUES (5, 27, 300, 17, 600);
INSERT INTO `fs_ticketPrice` VALUES (6, 30, 2222, 111, 333215);
INSERT INTO `fs_ticketPrice` VALUES (7, 300, 22222, 12, 2022);
INSERT INTO `fs_ticketPrice` VALUES (8, 20, 2000, 2, 230000);
INSERT INTO `fs_ticketPrice` VALUES (9, 20, 3000, 1, 222222);
INSERT INTO `fs_ticketPrice` VALUES (11, 10, 222, 20, 11222);
INSERT INTO `fs_ticketPrice` VALUES (14, 20, 2000, 3000, 50000);
INSERT INTO `fs_ticketPrice` VALUES (15, 20, 2000, 15, 20302);
INSERT INTO `fs_ticketPrice` VALUES (25, 12, 333, 22, 14444);
INSERT INTO `fs_ticketPrice` VALUES (33, 20, 3000, 122, 202220);
INSERT INTO `fs_ticketPrice` VALUES (40, 20, 3000, 15, 5000);

-- ----------------------------
-- Table structure for fs_user
-- ----------------------------
DROP TABLE IF EXISTS `fs_user`;
CREATE TABLE `fs_user`  (
  `uid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `upwd` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uname` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uquestion` int NOT NULL,
  `uanswer` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isRoot` int NOT NULL,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_user
-- ----------------------------
INSERT INTO `fs_user` VALUES ('111', 'bbb', '111', 1, '111', 0);
INSERT INTO `fs_user` VALUES ('qwe', 'qwe', 'qwe', 1, 'qwe', 0);
INSERT INTO `fs_user` VALUES ('root', 'root', 'root', 1, 'root', 1);
INSERT INTO `fs_user` VALUES ('user2', 'user2', 'user2', 1, 'user2', 0);
INSERT INTO `fs_user` VALUES ('user3', 'user3', 'user3', 1, 'user3', 0);
INSERT INTO `fs_user` VALUES ('user4', 'user4', 'user4', 1, 'user4', 0);
INSERT INTO `fs_user` VALUES ('user5', '123456', 'user5', 1, 'user5', 0);
INSERT INTO `fs_user` VALUES ('wyg', 'wyg123', 'wyg123', 1, 'wyg123', 0);

-- ----------------------------
-- Table structure for fs_userCare
-- ----------------------------
DROP TABLE IF EXISTS `fs_userCare`;
CREATE TABLE `fs_userCare`  (
  `uid` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pid` int NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_userCare
-- ----------------------------
INSERT INTO `fs_userCare` VALUES ('root', 5);
INSERT INTO `fs_userCare` VALUES ('root', 25);
INSERT INTO `fs_userCare` VALUES ('root', 6);

-- ----------------------------
-- Table structure for fs_userTickets
-- ----------------------------
DROP TABLE IF EXISTS `fs_userTickets`;
CREATE TABLE `fs_userTickets`  (
  `uid` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pid` int NOT NULL,
  `pname` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `bname` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `bphone` bigint NOT NULL,
  `bIndextity` bigint NOT NULL,
  `ticket` int NOT NULL,
  `isUsual` int NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fs_userTickets
-- ----------------------------
INSERT INTO `fs_userTickets` VALUES ('root', 9, 'SI1652', 'root', 15698536845, 321088199911125636, 200, 1);
INSERT INTO `fs_userTickets` VALUES ('root', 5, 'SI1234', '刘雅文', 13569856984, 321088199311112222, 300, 1);
INSERT INTO `fs_userTickets` VALUES ('root', 5, 'SI1234', '而王菲菲', 13666666666, 321088199911111111, 300, 1);
INSERT INTO `fs_userTickets` VALUES ('root', 5, 'SI1234', '续保', 13666666666, 321088198711111111, 600, 0);
INSERT INTO `fs_userTickets` VALUES ('root', 5, 'SI1234', '减打豆豆', 13655569855, 321088199911112222, 600, 0);
INSERT INTO `fs_userTickets` VALUES ('root', 5, 'SI1234', '啊水水', 15666666656, 321088198811111111, 600, 0);
INSERT INTO `fs_userTickets` VALUES ('root', 5, 'SI1234', '发生的', 13222222222, 321088111111111111, 300, 1);
INSERT INTO `fs_userTickets` VALUES ('root', 5, 'SI1234', '建瓯的', 15622222222, 321088199811111111, 600, 0);

SET FOREIGN_KEY_CHECKS = 1;
