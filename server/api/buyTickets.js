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
    if (params[key] === "") {
      continue;
    }
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

//添加新机票信息
router.post("/addTicket", (req, res) => {
  let params = req.body;
  let sql = `INSERT INTO   fs_ticketPrice values('${params.pid}','${params.usualNumber}','${params.usualPrice}','${params.noUsualNumber}','${params.noUsualPrice}')`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
      console.log(sql);
    }
  });
});

//获取酒店信息
router.get("/getPub", (req, res) => {
  let params = req.query;
  let sql = ``;
  if (JSON.stringify(params) === "{}") {
    sql = `select * from fs_cityPub`;
  } else {
    let string = "";
    for (let key in params) {
      if (!params[key]) {
        continue;
      }
      string += `${key}='${params[key]}' and `;
    }
    string = string.slice(0, -4);
    sql = `select * from fs_cityPub where ${string}`;
  }
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
      // console.log(sql);
    }
  });
});

// 修改酒店信息
router.post("/updataPub", (req, res) => {
  let params = req.body;
  let string = "";
  for (let key in req.body) {
    if (key !== "id") {
      string += `${key}='${req.body[key]}', `;
    }
  }
  string = string.slice(0, -2);
  let sql = `update fs_cityPub set ${string} where id=${params.id}`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});
//删除酒店
router.post("/deletePub", (req, res) => {
  let params = req.body;
  let sql = `DELETE FROM fs_cityPub where id='${params.id}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});
// 添加酒店星系
router.post("/addPub", (req, res) => {
  let params = req.body;
  let sql = `insert into fs_cityPub values('${params.city}','${params.pub}','${params.id}','${params.http}')`;
  console.log(sql);
  conn.query(sql, function (err, result) {
    if (err) {
      res.send({ msg: 0 });
    }
    if (result) {
      if (result.affectedRows !== 0) {
        res.send({ msg: 1 });
      }
    }
  });
});
module.exports = router;
