<template>
  <div id="main">
    <!-- <div class="imgBox">
      <img src="./../assets/planeIcon/sky.jpeg" alt="" />
    </div> -->
    <div class="titleBox">
      <span><img src="./../assets/planeIcon/titlePlane.png" alt="" /></span>
      <span>欢迎来到航班查询系统</span>
    </div>
    <div><UserShow></UserShow></div>
    <!-- 轮播图开始 -->
    <div class="carouselBlock">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item>
          <img
            @click="runTo"
            class="imgClass"
            src="./../assets/planeIcon/caroul3.jpeg"
            alt=""
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            class="imgClass"
            src="./../assets/planeIcon/carousl4.jpeg"
            alt=""
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            class="imgClass"
            src="./../assets/planeIcon/caroul6.jpeg"
            alt=""
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图结束 -->
    <!-- 左侧地球图
    <div id="echarts" style="width: 300px; height: 300px"></div> -->
    <div class="searchBox">
      <el-collapse-transition>
        <el-tabs v-show="show" v-model="activeName">
          <el-tab-pane label="航班查询" name="first">
            <PlaneSearchTable :cityArr="cityArr"></PlaneSearchTable>
          </el-tab-pane>
          <el-tab-pane label="航班动态查询" name="second">
            <PlaneIdSearch :cityArr="cityArr"></PlaneIdSearch>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-transition>
    </div>
  </div>
</template>
<script>
import PlaneSearchTable from "./../components/planeSearchTable";
import PlaneIdSearch from "./../components/planeIdSearch";
import UserShow from "./../components/userShow";
export default {
  components: {
    PlaneSearchTable,
    PlaneIdSearch,
    UserShow,
  },
  data() {
    return {
      show: false,
      activeName: "first",
      cityArr: null,
    };
  },
  created() {
    this.show = true;
    this.getCity();
    // this.getCharts();
    // console.log(this.$store.state.uid, 123);
  },
  methods: {
    getCharts() {
      var ROOT_PATH =
        "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

      var chartDom = document.getElementById("echarts");
      var myChart = this.echarts.init(chartDom);
      var option;

      this.getJSON(
        ROOT_PATH + "/data-gl/asset/data/flights.json",
        function (data) {
          var airports = data.airports.map(function (item) {
            return {
              coord: [item[3], item[4]],
            };
          });
          function getAirportCoord(idx) {
            return [data.airports[idx][3], data.airports[idx][4]];
          }

          // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
          var routesGroupByAirline = {};
          data.routes.forEach(function (route) {
            var airline = data.airlines[route[0]];
            var airlineName = airline[0];
            if (!routesGroupByAirline[airlineName]) {
              routesGroupByAirline[airlineName] = [];
            }
            routesGroupByAirline[airlineName].push(route);
          });

          var pointsData = [];
          data.routes.forEach(function (airline) {
            pointsData.push(getAirportCoord(airline[1]));
            pointsData.push(getAirportCoord(airline[2]));
          });

          var series = data.airlines
            .map(function (airline) {
              var airlineName = airline[0];
              var routes = routesGroupByAirline[airlineName];

              if (!routes) {
                return null;
              }
              return {
                type: "lines3D",
                name: airlineName,

                effect: {
                  show: true,
                  trailWidth: 2,
                  trailLength: 0.15,
                  trailOpacity: 1,
                  trailColor: "rgb(30, 30, 60)",
                },

                lineStyle: {
                  width: 1,
                  color: "rgb(50, 50, 150)",
                  // color: 'rgb(118, 233, 241)',
                  opacity: 0.1,
                },
                blendMode: "lighter",

                data: routes.map(function (item) {
                  return [airports[item[1]].coord, airports[item[2]].coord];
                }),
              };
            })
            .filter(function (series) {
              return !!series;
            });
          series.push({
            type: "scatter3D",
            coordinateSystem: "globe",
            blendMode: "lighter",
            symbolSize: 2,
            itemStyle: {
              color: "rgb(50, 50, 150)",
              opacity: 0.2,
            },
            data: pointsData,
          });

          myChart.setOption({
            legend: {
              selectedMode: "single",
              left: "left",
              data: Object.keys(routesGroupByAirline),
              orient: "vertical",
              textStyle: {
                color: "#fff",
              },
            },
            globe: {
              environment: ROOT_PATH + "/data-gl/asset/starfield.jpg",

              heightTexture:
                ROOT_PATH + "/data-gl/asset/bathymetry_bw_composite_4k.jpg",

              displacementScale: 0.1,
              displacementQuality: "high",

              baseColor: "#000",

              shading: "realistic",
              realisticMaterial: {
                roughness: 0.2,
                metalness: 0,
              },

              postEffect: {
                enable: true,
                depthOfField: {
                  enable: false,
                  focalDistance: 150,
                },
              },
              temporalSuperSampling: {
                enable: true,
              },
              light: {
                ambient: {
                  intensity: 0,
                },
                main: {
                  intensity: 0.1,
                  shadow: false,
                },
                ambientCubemap: {
                  texture: ROOT_PATH + "/data-gl/asset/lake.hdr",
                  exposure: 1,
                  diffuseIntensity: 0.5,
                  specularIntensity: 2,
                },
              },
              viewControl: {
                autoRotate: false,
              },
              silent: true,
            },
            series: series,
          });
          window.addEventListener("keydown", function () {
            series.forEach(function (series, idx) {
              myChart.dispatchAction({
                type: "lines3DToggleEffect",
                seriesIndex: idx,
              });
            });
          });
        }
      );

      option && myChart.setOption(option);
    },
    async getCity() {
      let res = await this.$request({ type: "get", url: "/home/getCity" });
      if (res.data.length > 0) {
        this.cityArr = res.data;
        console.log(this.cityArr);
      }
    },
    runTo() {
      this.$router.push({
        path: "/resultShow",
        query: {
          pStartCity: "四川",
          pEndCity: "南京",
          pStartTime: 1630252800000,
          pEndTime: "",
          isBack: false,
        },
      });
    },
  },
};
</script>
<style scoped>
.searchBox {
  width: 500px;
  margin: auto;
  text-align: center;
  padding: 0 6px 6px;
  border: 1px solid #939ca7;
  border-radius: 5px;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
::v-deep .searchBox .el-tabs__nav {
  width: 100%;
}
/* ::v-deep .searchBox .el-form-item {
  padding-left: 20%;
} */
::v-deep .searchBox .el-tabs__nav .el-tabs__item {
  width: 50%;
}
::v-deep .searchBox .el-form-item__content {
  text-align: left;
}
::v-deep .searchBtn .el-form-item__content {
  text-align: center;
}
::v-deep .searchBox .el-button {
  width: 100px;
}
::v-deep .el-tabs__content {
  padding: 0 19%;
}

::v-deep .el-scrollbar__wrap {
  max-height: 200px;
}

.titleBox {
  padding: 20px 0 20px 10%;
  font-size: 30px;
  color: #2577e3;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  vertical-align: middle;
}
.titleBox img {
  width: 50px;
  vertical-align: middle;
}
.imgBox {
  position: absolute;
  z-index: -1;
}
.imgBox img {
  max-width: 100%;
}
::v-deep .el-form-item {
  margin-bottom: 10px;
}
.carouselBlock {
}
.carouselBlock .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.carouselBlock .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.carouselBlock .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.imgClass {
  width: 100%;
  height: 100%;
}
</style>
