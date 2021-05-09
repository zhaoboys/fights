//node后端服务器
const homeApi = require("./api/homeApi");
const userApi = require("./api/userApi");
const buyApi = require("./api/buyTickets");
//中间件
const bodyParser = require("body-parser");
const express = require("express"); //express框架
const app = express(); //创建服务器

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//后端api路由
app.use("/home", homeApi); //使用homeapi文件中的接口
app.use("/user", userApi); //用户接口
app.use("/ticket", buyApi);

//监听端口
app.listen(3000);
console.log("success");
