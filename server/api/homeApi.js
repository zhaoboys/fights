let models = require("../db"); //引入db配置
let express = require("express");
let router = express.Router();
let mysql = require("mysql");
// var $sql = require("../sqlMap");
// const { query } = require("express");

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

let jsonWrite = function (res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败",
    });
  } else {
    res.json(ret);
  }
};

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
    string += `${key}='${params[key]}' and `;
  }
  string = string.slice(0, -4);
  if (params.pStartTime) {
    string += ` and pStartTime between ${params.pStartTime} and ${params.pEndTime}`;
  }
  let sql = `select * from fs_info where ${string}`;
  console.log(sql);
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//根据起飞将落地和时间搜索航班
router.get("/planeSearch", (req, res) => {
  let parms = req.query;
  // conn.query(`select * from fs_info where pStartCity='南京' and pEndCity='北京' and pStartTime between 1616947200000 and 1617033599000`,function(err,result){
  conn.query(
    `select * from fs_info where pStartCity=${parms.pStartCity} and pEndCity=${parms.pEndCity} and pStartTime between ${parms.time1} and ${parms.time2}`,
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.send(result);
      }
    }
  );
});

//根据起飞降落地、时间和航班公司查询航班
router.get("/pcSearch", (req, res) => {
  let parms = req.query;
  // conn.query(`select * from fs_info where pStartCity='南京' and pEndCity='北京' and cid='DF' and pStartTime between 1616947200000 and 1617033599000`,function(err,result){
  conn.query(
    `select * from fs_info where pStartCity=${parms.pStartCity} and pEndCity=${parms.pEndCity} and cid=${parms.cid} and pStartTime between ${parms.time1} and ${parms.time2}`,
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.send(result);
      }
    }
  );
});

//根据起飞降落地、机场和时间搜索航班
router.get("/pcpSearch", (req, res) => {
  let parms = req.query;
  // conn.query(`select * from fs_info where pStartCity='南京' and pEndCity='北京'and pStartArea='南京禄口机场' and pEndArea='北京大兴机场's and pStartTime between 1616947200000 and 1617033599000`,function(err,result){
  conn.query(
    `select * from fs_info where pStartCity=${parms.pStartCity} and pEndCity=${parms.pEndCity} and pStartArea=${parms.pStartArea} and pEndArea=${parms.pEndArea} and pStartTime between ${parms.time1} and ${parms.time2}`,
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.send(result);
      }
    }
  );
});

//根据起飞降落地、机场和时间和航班公司查询航班
router.get("/pcpcSearch", (req, res) => {
  let parms = req.query;
  // conn.query(`select * from fs_info where pStartCity='南京' and pEndCity='北京'and pStartArea='南京禄口机场' and pEndArea='北京大兴机场' and cid='DF' and pStartTime between 1616947200000 and 1617033599000`,function(err,result){
  conn.query(
    `select * from fs_info where pStartCity=${parms.pStartCity} and pEndCity=${parms.pEndCity} and pStartArea=${parms.pStartArea} and pEndArea='北京大兴机场' and cid='DF' and pStartTime between 1616947200000 and 1617033599000`,
    function (err, result) {
      if (err) throw err;
      if (result) {
        res.send(result);
      }
    }
  );
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
  let parms = req.query;
  conn.query("select * from fs_company", function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//用户登录
// router.get

// router.post('/postlist',(req,res)=>{
//     // 获取到sqlMaps中的search语句
//     var sql=$sql.home.search
//     var parms=req.query
//     console.log(parms,'parms')
//     console.log(req.body,'body')
//     conn.query(sql,function(err,result){
//         if(err){
//             console.log(err)
//         }
//         if(result){
//             console.log(result)
//             res.send(result)
//         }
//     })
// })

module.exports = router;
