SET NAMES UTF8;
DROP DATABASE IF EXISTS fs;
CREATE DATABASE fs CHARSET=UTF8;
USE fs;
/*航班信息表*/
CREATE TABLE fs_info(
    pId INT PRIMARY KEY AUTO_INCREMENT,  /*飞机id*/
    cId VARCHAR(32) NOT NULL,/*航班公司名称，和fs_company连接查询*/ 
    pName VARCHAR(32) NOT NULL, /*飞机名称*/
    pModel VARCHAR(32) NOT NULL, /*飞机型号*/
    pStartCity VARCHAR(32) NOT NULL, /*起飞城市*/
    pEndCity VARCHAR(32) NOT NULL, /*降落城市*/
    pStartArea VARCHAR(32) NOT NULL, /*起飞机场地点*/
    pEndArea VARCHAR(32) NOT NULL, /*降落机场地点*/
    pStartTime BIGINT NOT NULL, /*起飞时间*/ 
    pEndTime BIGINT NOT NULL /*降落时间*/
);
-- INSERT INTO fs_info VALUES(NULL,'DF','DF12563','u747','南京','北京','南京禄口机场','北京大兴机场',1616918845000,1616929645000);
--  INSERT INTO fs_info VALUES(NULL,'DF','DF12553','5747','南京禄口机场','北京大兴机场',1616918845000,1616929645000);
--  INSERT INTO fs_info VALUES(NULL,'DF','DF15563','G747','北京大兴','南京禄口',1616918845000,1616929645000);

/*用户表*/
CREATE TABLE fs_user(
    uName VARCHAR(32)  PRIMARY KEY ,
    uPwd VARCHAR(32) NOT NULL,
    uQuestion INT NOT NULL,
    uAnswer VARCHAR(32) NOT NULL
);

/*航空公司表*/
CREATE TABLE fs_company{
    cid VARCHAR(32) PRIMARY KEY,
    cname VARCHAR(32) NOT NULL
}
