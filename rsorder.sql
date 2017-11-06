/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : rsorder

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-11-04 17:36:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `chart`
-- ----------------------------
DROP TABLE IF EXISTS `chart`;
CREATE TABLE `chart` (
  `chartId` int(11) NOT NULL,
  `chartName` varchar(255) NOT NULL,
  `chartTotal` varchar(255) NOT NULL,
  `chartTypeTotal` varchar(255) NOT NULL,
  `chartPrice` varchar(255) NOT NULL,
  PRIMARY KEY (`chartId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chart
-- ----------------------------

-- ----------------------------
-- Table structure for `member`
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `userNumber` int(20) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userLevel` varchar(255) NOT NULL,
  `userPoints` int(11) NOT NULL,
  `userTel` double(11,0) NOT NULL,
  `userRemark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userNumber`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menuId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `menuName` varchar(255) NOT NULL,
  `menuType` varchar(255) NOT NULL,
  `menuImg` varchar(255) NOT NULL,
  `menuPrice` varchar(255) NOT NULL,
  `menuDescribe` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`menuId`)
) ENGINE=MyISAM AUTO_INCREMENT=22279 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('22226', '花开富贵', '精品点心', 'bac67254f6d8db92b9c271b9f5e2e4c4.jpg', '100', '花开富贵');
INSERT INTO `menu` VALUES ('22227', '如意糕', '精品点心', 'ca208b249cb8059c23c0e71fdf21e971.jpg', '20', '如意糕');
INSERT INTO `menu` VALUES ('22228', '花开五月', '精品点心', '25bdee342a3711551545f7abd6608393.jpg', '22', '花开五月');
INSERT INTO `menu` VALUES ('22229', '十全十美', '精品点心', '48aaa1969ba8b79ca4e8a3f9585681d7.jpg', '10', '十全十美');
INSERT INTO `menu` VALUES ('22230', '招积鲍鱼盏', '精品点心', '042840b685c39c5773775332e08f8947.jpg', '40', '招积鲍鱼盏');
INSERT INTO `menu` VALUES ('22231', '剁椒鱼头', '湘菜', '2d545aaf35c6486c343805919828d319.jpg', '80', '正宗湘菜');
INSERT INTO `menu` VALUES ('22232', '豆腐香片', '湘菜', '542e2ac6c98fdf425bc7b8363ec1d43b.jpg', '40', '正宗湘菜');
INSERT INTO `menu` VALUES ('22267', '蛋花汤', '汤类', '66e7a013f1d2bea6d6fde4d5992ec2f4.jpg', '15', '');
INSERT INTO `menu` VALUES ('22234', '芋头排骨', '湘菜', '3194bb50297f376aac2772e8f6d66db4.jpg', '50', '正宗湘菜');
INSERT INTO `menu` VALUES ('22233', '酸菜鱼', '湘菜', 'b35d009833f07bc66548611ba2487470.jpg', '90', '正宗湘菜');
INSERT INTO `menu` VALUES ('22235', '卤猪蹄', '湘菜', '872b615981193220861385d5b4c212a5.jpg', '36', '正宗湘菜');
INSERT INTO `menu` VALUES ('22236', '腊尔第啤酒', '酒水饮料', '43505fd36f2109fc3d810ef1577d62c2.jpg', '36', '正宗湘菜');
INSERT INTO `menu` VALUES ('22237', '精品红酒', '酒品饮料', '0e4bc018b22447cdec3f86022507b651.jpg', '120', '精品红酒');
INSERT INTO `menu` VALUES ('22238', '凉拌海带', '凉菜', '4c5fa108c8fc74694c5f81085cc68bbd.jpg', '30', '这是凉菜');
INSERT INTO `menu` VALUES ('22239', '佛手观音莲', '凉菜', 'ef79fabe996ffaa774b1168aa9f1a803.jpg', '30', '这是佛手观音莲');
INSERT INTO `menu` VALUES ('22240', '白切肉', '凉菜', 'fc72462627c916ff2ccb3b3723e28485.jpg', '33', '白切肉');
INSERT INTO `menu` VALUES ('22241', '千层香', '凉菜', 'c511ad485f0626a83828d72699b88038.jpg', '45', '');
INSERT INTO `menu` VALUES ('22242', '爽口凉粉', '凉菜', 'fa3cb3ac619061faacfdea0c6621c178.jpg', '23', '');
INSERT INTO `menu` VALUES ('22243', '凉拌豆芽', '凉菜', '0fd68fcfab26f91e819944bf4e060d03.jpg', '33', '');
INSERT INTO `menu` VALUES ('22244', '凉拌粉丝', '凉菜', '38e17ba24a6d751e61b9b3cbbc7c2576.jpg', '20', '');
INSERT INTO `menu` VALUES ('22245', '精品凉拌黄瓜', '凉菜', '996a95a7474d522ee97bcfae32f00072.jpg', '21', '');
INSERT INTO `menu` VALUES ('22246', '孜然脆骨', '热菜', '6a547935a011841d522ea82210306805.jpg', '23', '');
INSERT INTO `menu` VALUES ('22247', '青椒小河鱼', '热菜', '6c8d42b921429d49c5d7783f84a72f15.jpg', '31', '');
INSERT INTO `menu` VALUES ('22248', '卤香牛肉片', '凉菜', 'e749ac1586bc5f34e618dd2afb1ebd5b.jpg', '42', '');
INSERT INTO `menu` VALUES ('22249', '香辣牛肚', '热菜', '531948a82190cde8f326ac8e95c50dfb.jpg', '34', '');
INSERT INTO `menu` VALUES ('22250', '牡丹花开', '热菜', '1df8959a6df1710b919a49f0af47dca4.jpg', '66', '');
INSERT INTO `menu` VALUES ('22251', '酸菜鱼片', '凉菜', '5b1e4b1982daa3e98a89ed6a10747bb2.jpg', '88', '');
INSERT INTO `menu` VALUES ('22252', '湘西外婆菜', '热菜', 'b1a9837f32272b0902f6c419b21ab2cb.jpg', '59', '');
INSERT INTO `menu` VALUES ('22253', '香辣鸡杂', '热菜', '3d2287c3f99b049612016977941a1630.jpg', '57', '');
INSERT INTO `menu` VALUES ('22254', '凉拌三丝', '凉菜', 'f200277b0cd2e3a417350e94bec5f831.jpg', '33', '');
INSERT INTO `menu` VALUES ('22255', '香辣豆腐', '凉菜', '722c3f6df0b603622d2a166da2a84f27.jpg', '15', '');
INSERT INTO `menu` VALUES ('22256', '脆汁豆腐', '热菜', 'cb93e2ae8a65f7a20a7c5d41eabd2630.jpg', '13', '');
INSERT INTO `menu` VALUES ('22257', '荷塘小炒', '小炒类', 'd9b529869b4f8ac2ec836101c0504a17.jpg', '22', '');
INSERT INTO `menu` VALUES ('22258', '回锅肉', '小炒类', '2e7597d7eb72a8e59c06a6959139510c.jpg', '33', '');
INSERT INTO `menu` VALUES ('22259', '爆炒腊肉', '凉菜', '81feb5ae25439a48db9dfa504b3623ff.jpg', '32', '');
INSERT INTO `menu` VALUES ('22260', '农家小炒', '凉菜', '058fdb29ff8195aee2092f2bdc7f9ada.jpg', '26', '');
INSERT INTO `menu` VALUES ('22261', '香辣肉片', '凉菜', 'ce941e966548d2c46f2cab4ba300abe0.jpg', '20', '');
INSERT INTO `menu` VALUES ('22262', '农家一碗香', '小炒类', '67473407d85954d6ac293a571c1b8013.jpg', '24', '');
INSERT INTO `menu` VALUES ('22263', '布丁奶茶', '酒水饮料', '6b9ddd9647d6affea21bfd584cfdaa17.jpg', '12', '');
INSERT INTO `menu` VALUES ('22264', '原味奶茶', '酒水饮料', '735cd01cf7ba3910e1afbf4ee286bcf0.jpg', '10', '');
INSERT INTO `menu` VALUES ('22265', '蜂蜜奶茶', '酒水饮料', 'eedc3c305a7a08199d12910472371a4d.jpg', '11', '');
INSERT INTO `menu` VALUES ('22266', '红茶', '酒水饮料', '482617ba51d903f674e9578bc1cb46f4.jpg', '10', '');
INSERT INTO `menu` VALUES ('22268', '虾仁豆腐汤', '汤类', '717553eadf48100e2541ebc0f7fe8d78.jpg', '14', '');
INSERT INTO `menu` VALUES ('22269', '青菜汤', '汤类', 'c63f8818b7c1e57498150ee21352cb54.jpg', '14', '');
INSERT INTO `menu` VALUES ('22270', '排骨汤', '汤类', '5bfc14ac1037df859fb0f5e258c5a01b.jpg', '13', '');
INSERT INTO `menu` VALUES ('22278', '凉拌菜', '凉菜', '29af5d3e0e5d3a5a4adc065e59a3c0f0.jpg', '12', '111');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `orderContent` varchar(500) NOT NULL,
  `orderPrice` varchar(255) NOT NULL,
  `orderStatus` varchar(255) NOT NULL,
  `orderTime` varchar(255) NOT NULL,
  `orderRemark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=MyISAM AUTO_INCREMENT=9492 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('9056', '[{\"count\":1,\"menuName\":\"花开富贵\",\"menuPrice\":\"100\"},{\"count\":1,\"menuName\":\"如意糕\",\"menuPrice\":\"20\"},{\"count\":1,\"menuName\":\"花开五月\",\"menuPrice\":\"22\"}]', '142', '1', '2017/11/3 下午3:46:29', null);
INSERT INTO `orders` VALUES ('1380', '[{\"count\":1,\"menuName\":\"青椒小河鱼\",\"menuPrice\":\"31\"},{\"count\":1,\"menuName\":\"香辣牛肚\",\"menuPrice\":\"34\"}]', '65', '1', '2017/11/3 下午3:46:42', null);
INSERT INTO `orders` VALUES ('1844', '[{\"count\":1,\"menuName\":\"原味奶茶\",\"menuPrice\":\"10\"},{\"count\":1,\"menuName\":\"农家小炒\",\"menuPrice\":\"26\"}]', '36', '1', '2017/11/3 下午3:47:03', null);
INSERT INTO `orders` VALUES ('6034', '[{\"count\":1,\"menuName\":\"虾仁豆腐汤\",\"menuPrice\":\"14\"},{\"count\":1,\"menuName\":\"青菜汤\",\"menuPrice\":\"14\"},{\"count\":1,\"menuName\":\"蜂蜜奶茶\",\"menuPrice\":\"11\"},{\"count\":1,\"menuName\":\"红茶\",\"menuPrice\":\"10\"},{\"count\":1,\"menuName\":\"豆腐香片\",\"menuPrice\":\"69.90\"},{\"count\":1,\"menuName\":\"凉拌豆芽\",\"menuPrice\":\"22\"}]', '140.9', '1', '2017/11/4 下午3:24:18', null);
INSERT INTO `orders` VALUES ('3689', '[{\"count\":2,\"menuName\":\"白切肉\",\"menuPrice\":\"33\"}]', '66', '0', '2017/11/4 下午3:27:54', null);
INSERT INTO `orders` VALUES ('7793', '[{\"count\":1,\"menuName\":\"白切肉\",\"menuPrice\":\"33\"},{\"count\":1,\"menuName\":\"佛手观音莲\",\"menuPrice\":\"30\"},{\"count\":1,\"menuName\":\"凉拌海带\",\"menuPrice\":\"30\"}]', '93', '0', '2017/11/4 下午3:28:00', null);

-- ----------------------------
-- Table structure for `review`
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `reviewId` int(11) NOT NULL AUTO_INCREMENT,
  `reviewContent` varchar(255) NOT NULL,
  `reviewGrade` float(11,2) NOT NULL,
  `reviewTime` varchar(255) NOT NULL,
  PRIMARY KEY (`reviewId`)
) ENGINE=MyISAM AUTO_INCREMENT=9969 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of review
-- ----------------------------
INSERT INTO `review` VALUES ('2588', '很好吃', '5.00', '2017/11/3 下午5:09:48');
INSERT INTO `review` VALUES ('5416', '还好', '4.00', '2017/11/2 下午8:50:57');
INSERT INTO `review` VALUES ('2460', '菜色齐全', '5.00', '2017/11/3 上午9:52:24');
INSERT INTO `review` VALUES ('1249', '好。。。。。。。', '5.00', '2017/11/3 上午11:44:00');
INSERT INTO `review` VALUES ('8060', '下次再来啊！！', '5.00', '2017/11/3 下午1:39:31');
INSERT INTO `review` VALUES ('2557', 'OK', '5.00', '2017/11/3 上午10:33:32');
INSERT INTO `review` VALUES ('1571', '五星好评', '5.00', '2017/11/4 下午2:24:35');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userLevel` varchar(255) NOT NULL,
  `userTel` double(11,0) DEFAULT NULL,
  `userRemark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '小金', '123456', '管理员', '13077777777', '123456');
INSERT INTO `user` VALUES ('2', '小明', '123456', '收银员', '13077777777', '99999');
INSERT INTO `user` VALUES ('3', 'admin', '123456', '管理员', '13077777777', '22222');
INSERT INTO `user` VALUES ('4', '小敏', '654321', '管理员', '13077773333', '66666');
