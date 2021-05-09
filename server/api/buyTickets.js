let models = require("../db"); //引入db配置
let express = require("express");
let router = express.Router();
let mysql = require("mysql");

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//获取对应的航班的票价及票数
router.get("/getNumber", (req, res) => {
  let params = req.query;
  let string = "";
  for (let key in params) {
    string += `${key}='${params[key]}' and `;
  }
  string = string.slice(0, -4);
  let sql = `select * from fs_ticketPrice where ${string}`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//获取所有航班票价
router.get("/getAllNumber", (req, res) => {
  let sql = `select * from fs_ticketPrice`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//购票
router.post("/buyTickets", (req, res) => {
  let params = req.body;
  let sql = `INSERT INTO fs_userTickets values('${params.uid}','${params.pid}','${params.pname}','${params.bname}','${params.bphone}','${params.bIndextity}','${params.ticket}','${params.isUsual}')`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//获取用户订票信息
router.get("/getUserTickets", (req, res) => {
  let params = req.query;
  let string = "";
  for (let key in params) {
    string += `${key}='${params[key]}' and `;
  }
  string = string.slice(0, -4);
  let sql = `select * from fs_userTickets where ${string}`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//删除航班订票
router.post("/deleteTicket", (req, res) => {
  let params = req.body;
  let sql = `DELETE FROM fs_userTickets WHERE uid='${params.uid}' && pid='${params.pid}' && pname='${params.pname}' && bname='${params.bname}' && ticket='${params.ticket}' `;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
      // console.log(sql);
    }
  });
});

// 更新机票数量或价格
router.post("/updataTickets", (req, res) => {
  let params = req.body;
  let string = "";
  for (let key in params) {
    if (key === "pid") {
      continue;
    }
    string += `${key}='${params[key]}' ,`;
  }
  string = string.slice(0, -1);
  let sql = `update  fs_ticketPrice set ${string} WHERE pid ='${[params.pid]}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
      console.log(sql);
    }
  });
});
module.exports = router;
