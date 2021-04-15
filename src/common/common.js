import Vue from "vue";
Vue.prototype.$oneDayTime = function (time) {
  let realTime = new Date(time);
  let startTime = new Date(
    realTime.getFullYear() +
      "-" +
      (realTime.getMonth() + 1) +
      "-" +
      realTime.getDate() +
      " " +
      "00:00:00"
  ).getTime();
  let endTime = new Date(
    realTime.getFullYear() +
      "-" +
      (realTime.getMonth() + 1) +
      "-" +
      realTime.getDate() +
      " " +
      "23:59:59"
  ).getTime();
  return [startTime, endTime];
};

Vue.prototype.$getHours = function (time) {
  let allTime = new Date(time);
  let hours = "";
  let day = "";
  let week = "周";
  let weekArr = ["日", "一", "二", "三", "四", "五", "六"];
  allTime.getMonth() + 1 < 10
    ? (day = "0" + (allTime.getMonth() + 1) + "月")
    : allTime.getMonth() + 1 + "月";
  allTime.getDate() < 10
    ? (day += "0" + allTime.getDate() + "日")
    : (day += allTime.getDate() + "日");

  allTime.getHours() < 10
    ? (hours = "0" + allTime.getHours())
    : (hours = allTime.getHours());
  allTime.getMinutes() < 10
    ? (hours += ":" + "0" + allTime.getMinutes())
    : (hours += ":" + allTime.getMinutes());
  week += weekArr[allTime.getDay()];
  return [day, hours, week];
};

//封装请求函数
Vue.prototype.$request = async function ({
  type = null,
  url = null,
  params = null,
}) {
  let a = "";
  if (type === "get") {
    if (params) {
      url += "?";
      for (let key in params) {
        url += key + "=" + params[key] + "&";
      }
      url = url.slice(0, -1);
      console.log(url);
    }
    a = await this.axios.get(url).then((res) => {
      return res;
    });
  }

  if (type === "post") {
    a = await this.axios.post(url, params).then((res) => {
      return res;
    });
  }
  return a;
};

// Vue.prototype.$moreDayTime=function(time1,time2){
//     let realTime1=new Date(time1)
//     let realTime2=new Date(time2)
//     let startTime=new Date(realTime1.getFullYear()+'-'+(realTime1.getMonth()+1)+'-'+realTime1.getDate()+' '+'00:00:00').getTime()
//     let endTime=new Date(realTime2.getFullYear()+'-'+(realTime2.getMonth()+1)+'-'+realTime2.getDate()+' '+'23:59:59').getTime()
//     return [startTime,endTime]
// }
