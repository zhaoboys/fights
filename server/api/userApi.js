let models = require("../db"); //引入db配置
let express = require("express");
let router = express.Router();
let mysql = require("mysql");
// const { query } = require("express");

//连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//用户登录
router.get("/login", (req, res) => {
  let params = req.query;
  let sql = `select * from fs_user where uid='${params.uid}' && upwd='${params.upwd}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//user region
router.post("/register", (req, res) => {
  let params = req.body;
  console.log(params);
  let sql = `insert into fs_user values('${params.uid}','${params.upwd}','${params.uname}',${params.uquestion},'${params.uanswer}',${params.isRoot})`;
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

//user rester pwd
router.post("/newPwd", (req, res) => {
  let params = req.body;
  let sql = `update fs_user set upwd='${params.upwd}' where uid='${params.uid}' && uquestion=${params.uquestion} && uanswer='${params.uanswer}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//获取用户关注航班
router.get("/planeCare", (req, res) => {
  let params = req.body;
  let sql = `select*from fs_userCare where uid='${params.uid}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

//root 删除用户
router.post("/deleteUser", (req, res) => {
  let params = req.body;
  let sql = `delete from fs_user where uid='${params.uid}'`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(res);
    }
  });
});

//root 修改航班信息
router.post("/planeChange", (req, res) => {
  let params = req.body;
  let string = "";
  for (let key in req.body) {
    if (key !== "pid") {
      string += `${key}='${req.body[key]}', `;
    }
  }
  string = string.slice(0, -2);
  console.log(string, "航班信息");
  let sql = `update fs_info set ${string} where pid=${params.pid}`;
  // let sql=`update fs_info set pmodel='ass5+46' where pid=1`
  conn.query(sql, function (err, result) {
    if (err) throw err;
    if (result) {
      res.send(result);
    }
  });
});

module.exports = router;
