let models = require("../db"); //引入db配置
let express = require("express");
let router = express.Router();
let mysql = require("mysql");
// var $sql = require("../sqlMap");
// const { query } = require("express");

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

// let jsonWrite = function (res, ret) {
//   if (typeof ret === "undefined") {
//     res.json({
//       code: "1",
//       msg: "操作失败",
//     });
//   } else {
//     res.json(ret);
//   }
// };

//查询列表接口
router.get("/getlist", (req, res) => {
  // 获取到sqlMaps中的search语句
  var sql = "select * from fs_info";
  // var parms = req.query;
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.send(result);
    }
  });
});

//查询城市接口
router.get("/getCity", (req, res) => {
  let sql = "select * from fs_city";
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//根据城市查询机场
router.get("/getPlaneArea", (req, res) => {
  let params = req.query;
  let sql = `select * from fs_planeArea where city='${params.city}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

router.get("/getPlaneArea1", (req, res) => {
  let params = req.query;
  let string = "";
  for (let key in params) {
    string += `${key}='${params[key]}' and `;
  }
  string = string.slice(0, -4);
  let sql = `select * from fs_planeArea where ${string}`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//获取所有城市机场
router.get("/geAllPlaneArea", (req, res) => {
  var params = req.query;
  let sql = `select * from fs_planeArea`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});
//添加航班信息
router.post("/addPlane", (req, res) => {
  var params = req.body;
  let sql = `INSERT INTO   fs_info values('${params.pid}','${params.cid}','${params.pname}','${params.pmodel}','${params.pStartCity}','${params.pEndCity}','${params.pStartArea}','${params.pEndArea}','${params.pStartTime}','${params.pEndTime}')`;
  conn.query(sql, function (err, result) {
    if (err) {
      res.send({ code: 0 });
    }
    if (result) {
      res.send(result);
    }
  });
});

router.get("/airSearch", (req, res) => {
  let params = req.query;
  let string = "";
  for (let key in params) {
    if (key === "pStartTime") {
      continue;
    }
    if (key === "pEndTime") {
      continue;
    }
    if (key === "pStartArea" && params[key] === "") {
      continue;
    }
    if (key === "pEndArea" && params[key] === "") {
      continue;
    }
    string += `${key}='${params[key]}' and `;
  }
  string = string.slice(0, -4);
  if (params.pStartTime) {
    string += ` and pStartTime between ${params.pStartTime} and ${params.pEndTime}`;
  }
  let sql = `select * from fs_info where ${string}`;
  // console.log(sql);
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//只根据航空公司查询航班  首页
router.get("/companySearch", (req, res) => {
  let parms = req.query;
  conn.query(
    `select * from fs_info where cid='${parms.cid}'`,
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.send(result);
      }
    }
  );
});

//获取航班公司信息表
router.get("/getCompany", (req, res) => {
  conn.query("select * from fs_company", function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//添加航班信息
router.post("/addCityPlane", (req, res) => {
  let params = req.body;
  let string = "";
  for (let key in params) {
    string += `'${params[key]}',`;
  }
  string = string.slice(0, -1);
  let sql = `INSERT INTO fs_planeArea values(${string})`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

module.exports = router;
