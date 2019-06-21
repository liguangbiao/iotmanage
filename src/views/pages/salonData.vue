<template>
  <div>
    <div class="title">
      <span>沙龙</span>
    </div>
    <div class="chart_content">
      <div class="chart_box type_1">
        <div class="chart_item">
          <div class="chart_date">
            <span>月份截止：&nbsp;</span>
            <el-date-picker
              v-model="date1End"
              style="width: 150px"
              size="mini"
              type="month"
              placeholder="选择月份"
            ></el-date-picker>
            <span class="el-icon-refresh" @click="HandleRefresh(1)"></span>
          </div>
          <div class="bottom chart_container type_1" id="chart_1" ref="chart_1"></div>
        </div>
      </div>
      <div class="chart_box type_2">
        <div class="chart_item">
          <div class="chart_date">
            <span>日期范围：&nbsp;</span>
            <el-date-picker
              v-model="date2End"
              style="width: 150px"
              size="mini"
              type="month"
              placeholder="选择月份"
            ></el-date-picker>
            <span class="el-icon-refresh" @click="HandleRefresh(2)"></span>
          </div>
          <div class="bottom chart_container type_1" id="chart_2" ref="chart_2"></div>
        </div>
      </div>
      <div class="chart_box type_3">
        <div class="chart_item">
          <div class="chart_date">
            <span>日期范围：&nbsp;</span>
            <el-date-picker
              v-model="date3Start"
              style="width: 150px"
              size="mini"
              type="month"
              placeholder="选择月份"
            ></el-date-picker>
            <span class="demonstration">-</span>
            <el-date-picker
              v-model="date3End"
              style="width: 150px"
              size="mini"
              type="month"
              placeholder="选择月份"
            ></el-date-picker>
            <span class="el-icon-refresh" @click="HandleRefresh(3)"></span>
          </div>
          <div class="bottom chart_container type_1" id="chart_3" ref="chart_3"></div>
        </div>
      </div>
    </div>
    <!--按部门学院点击列表-->
    <el-dialog :title="'部门分布列表-'+active_salon" :visible.sync="active_salon_dialog">
      <el-table v-if="flipbox" :data="active_salon_data.result">
        <el-table-column property="id" label="学院ID"></el-table-column>
        <el-table-column property="deptName" label="学院名称"></el-table-column>
        <el-table-column property="title" label="标题"></el-table-column>
        <el-table-column property="userName" label="用户名"></el-table-column>
      </el-table>
      <el-pagination
        v-if="flipbox"
        :page-size="5"
        :pager-count="5"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="active_salon_data.allRowNum"
      ></el-pagination>
    </el-dialog>
    <!--沙龙是否拥有工坊-->
    <el-dialog :title="'工坊列表-'+active_salon3" :visible.sync="active_salon3_dialog">
      <el-table v-if="flipbox3" :data="active_salon3_data.result">
        <el-table-column property="id" label="学院ID"></el-table-column>
        <el-table-column property="deptName" label="学院名称"></el-table-column>
        <el-table-column property="className" label="学院名称"></el-table-column>
        <el-table-column property="title" label="标题"></el-table-column>
        <el-table-column property="userName" label="用户名"></el-table-column>
      </el-table>
      <el-pagination
        v-if="flipbox3"
        :page-size="5"
        :pager-count="5"
        layout="prev, pager, next"
        @current-change="handleCurrentChange3"
        :total="active_salon3_data.allRowNum"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "salonData",
    data() {
      return {
        date1End: new Date(),
        active_salon: undefined,
        active_salon_data: undefined,
        flipbox: false,
        active_salon_dialog: false,
        date2End: new Date(),
        date3Start: new Date().setMonth(new Date().getMonth()-5),
        date3End: new Date(),
        flipbox3: false,
        flipboxType: undefined,
        active_salon3: undefined,
        active_salon3_dialog: undefined,
        active_salon3_data: undefined,
        salonData: undefined,
        salonData1: undefined,
        salonData2: undefined
      };
    },
    watch: {
      date1End: {
        handler: function() {
          this.initGetData1(this.date1End);
        },
        deep: true
      },
      date2End: {
        handler: function() {
          this.initGetData2(this.date2End);
        },
        deep: true
      },
      date3Start: {
        handler: function() {
          this.initGetData2(this.date3Start, this.date3End);
        },
        deep: true
      },
      date3End: {
        handler: function() {
          this.initGetData2(this.date3Start, this.date3End);
        },
        deep: true
      }
    },
    mounted() {
      this.initGetData1(new Date());
      this.initGetData2(new Date());
      this.initGetData3(this.date3Start, new Date());
    },
    methods: {
      HandleRefresh(type) {
         switch (type) {
           case 1 :{
              this.initGetData1(new Date())
              this.date1End = new Date()
              break
           }
            case 2 :{
              this.initGetData2(new Date())
               this.date2End = new Date()
              break
           }
            case 3 :{
              this.initGetData3(new Date(), new Date())
              this.date3Start = new Date()
              this.date3End = new Date()
              break
           }
         }
      },
      initGetData1(date) {
        let mydate = this.getMonth(date);
        this.axios
          .post("/teamproject/manager/data/salondisbydept", {
            userId: this.$store.state.user.userId,
            endDate: mydate
          })
          .then(res => {
            if (res.data.code == 200) {
              this.salonData = res.data.data.salonDisByDept;
              let sum1 = 0;
              this.salonData.forEach(item => {
                sum1 += item.singleValue;
              });
              this.Chart_1(sum1);
            }
          });
      },
      initGetData2(date) {
        let mydate = this.getMonth(date);
        this.axios
          .post("/teamproject/manager/data/salonpeopledisbydept", {
            userId: this.$store.state.user.userId,
            endDate: mydate
          })
          .then(res => {
            if (res.data.code == 200) {
              this.salonData1 = res.data.data.salonPeopleDisByDept;
              let sum2 = 0;
              this.salonData1.forEach(item => {
                sum2 += item.singleValue;
              });
              this.Chart_2(sum2);
            }
          });
      },
      initGetData3(dateStart, dateEnd) {
        dateStart = new Date(dateStart)
        var startTime = this.getMonth(dateStart);
        var endTime = this.getMonth(dateEnd);
        this.axios.post("/teamproject/manager/data/salonhasteamornot", {
            userId: this.$store.state.user.userId,
            // startDate: '2019-01',
            startDate: startTime,
            endDate: endTime
          })
          .then(res => {
            if(res.data.code == 200) {
              this.salonData3 = res.data.data.salonHasTeamOrNot;
              this.Chart_3();
              }
          });
      },
      getE1data(data) {
        let arr = new Array();
        for (let i of data) {
          arr.push(i.name);
        }
        return arr;
      },
      getE1data1(data) {
        let arr = new Array();
        for (let i of data) {
          let obj = {};
          obj.name = i.name;
          obj.value = i.singleValue;
          arr.push(obj);
        }
        return arr;
      },
      getE1data2(data) {
        let arr = new Array();
        let obj1 = {
          name: "成型",
          type: "bar",
          barWidth: "15%",
          data: new Array()
        };
        let obj2 = {
          name: "汇聚",
          type: "bar",
          barWidth: "15%",
          data: new Array()
        };
        for (let i in data) {
          obj1.data.push(data[i].value["成型"]);
          obj2.data.push(data[i].value["汇聚"]);
        }
        arr.push(obj1, obj2);
        return arr;
      }, //图表取数据
      Chart_1(sum1) {
        let myChart_1 = this.$echarts.init(document.getElementById("chart_1"));
        myChart_1.on("click", params => {
          console.log(params.name);
          this.active_salon = params.name;
          this.axios
            .post("/teamproject/manager/data/salonlistbydept", {
              userId: this.$store.state.user.userId,
              deptName: params.name,
              endDate: this.getMonth(this.date1End),
              page: 1,
              pageSize: 5
            })
            .then(res => {
              if (res.data.code == 200) {
                this.flipbox = true;
                this.active_salon_dialog = true;
                this.active_salon_data = res.data.data.salonMap;
              }
            });
        });
        myChart_1.setOption({
          title: {
            text: "沙龙按部门学院分布",
            textStyle: {
              fontSize: 18,
              fontWeight: "bold"
            },
            subtext: "按部门学院分布数量：" + sum1,
            x: "left"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "horizontal",
            left: "center",
            bottom: 0,
            itemWidth: 14,
            data: this.getE1data(this.salonData)
          },
          series: [
            {
              name: "分布数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: this.getE1data1(this.salonData),
              label: {
                normal: {
                  textStyle: {
                    color: "#3b4953"
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 3,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ],
          color: [
            "#2f9dea",
            "#46d88b",
            "#f7d448",
            "#e85959",
            "#3de0e7",
            "#3a68e3",
            "#a9e04b",
            "#759fd3",
            "#ffa893",
            "#506bbe",
            "#febc48",
            "ba86f8"
          ]
        });
      },
      handleCurrentChange(val) {
        this.axios
          .post("/teamproject/manager/data/salonlistbydept", {
            userId: this.$store.state.user.userId,
            deptName: this.active_salon,
            endDate: this.getMonth(this.date1End),
            page: val,
            pageSize: 5
          })
          .then(res => {
            if (res.data.code == 200) {
              console.log(res);
              this.active = true;
              this.active_salon_dialog = true;
              this.active_salon_data = res.data.data.salonMap;
            }
          });
      },
      Chart_2(sum2) {
        let myChart_2 = this.$echarts.init(document.getElementById("chart_2"));
        // myChart_2.on("click", params => {
        //   console.log(params.name);
        //   this.active_salon = params.name;
        //   this.axios
        //     .post("/teamproject/manager/data/salonlistbydept", {
        //       userId: this.$store.state.user.userId,
        //       deptName: params.name,
        //       endDate: this.getMonth(this.date1End),
        //       page: 1,
        //       pageSize: 5
        //     })
        //     .then(res => {
        //       if (res.data.code == 200) {
        //         this.flipbox = true;
        //         this.active_salon_dialog = true;
        //         this.active_salon_data = res.data.data.salonMap;
        //       }
        //     });
        // });
        myChart_2.setOption({
          title: {
            text: "沙龙成员按部门学院分布",
            textStyle: {
              fontSize: 18,
              fontWeight: "bold"
            },
            subtext: "成员按部门学院分布数量：" + sum2,
            x: "left"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "horizontal",
            left: "center",
            bottom: 0,
            itemWidth: 14,
            data: this.getE1data(this.salonData1)
          },
          series: [
            {
              name: "学院数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: this.getE1data1(this.salonData1),
              label: {
                normal: {
                  textStyle: {
                    color: "#3b4953"
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 3,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ],
          color: [
            "#2f9dea",
            "#46d88b",
            "#f7d448",
            "#e85959",
            "#3de0e7",
            "#3a68e3",
            "#a9e04b",
            "#759fd3",
            "#ffa893",
            "#506bbe",
            "#febc48",
            "ba86f8"
          ]
        });
      },
      Chart_3() {
        let myChart_3 = this.$echarts.init(document.getElementById("chart_3"));
        myChart_3.on("click", params => {
          this.active_salon3 = params.seriesName;
          if (params.seriesName.includes("成型")) {
            this.flipboxType = 1;
            this.axios
              .post("/teamproject/manager/data/salonlisthasteam", {
                userId: this.$store.state.user.userId,
                endDate: this.getMonth(this.date3End),
                page: 1,
                pageSize: 5
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.flipbox3 = true;
                  this.active_salon3_dialog = true;
                  this.active_salon3_data = res.data.data.salonMap;
                }
              });
          } else {
            this.flipboxType = 0;
            this.axios
              .post("/teamproject/manager/data/salonlisthasnoteam", {
                userId: this.$store.state.user.userId,
                endDate: this.getMonth(this.date3End),
                page: 1,
                pageSize: 5
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.flipbox3 = true;
                  this.active_salon3_dialog = true;
                  this.active_salon3_data = res.data.data.salonMap;
                }
              });
          }
        });
        myChart_3.setOption({
          title: {
            text: "沙龙工坊",
            textStyle: {
              fontSize: 18,
              fontWeight: "bold"
            },
            subtext: "",
            x: "left"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "none" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: "horizontal",
            left: "center",
            bottom: 0,
            itemWidth: 14,
            data: ["成型", "汇聚"]
          },
          grid: {
            top: "18%",
            left: "12%",
            right: "12%",
            bottom: "12%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.getE1data(this.salonData3)
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                formatter: "{value}"
              },
              axisLine: {
                show: true
              },
              axisTick: {
                show: true
              },
              splitLine: {
                lineStyle: {
                  color: "#d8d8d8"
                }
              }
            }
          ],
          series: this.getE1data2(this.salonData3),
          color: [
            "#2f9dea",
            "#46d88b",
            "#f7d448",
            "#e85959",
            "#3de0e7",
            "#3a68e3",
            "#a9e04b",
            "#759fd3",
            "#ffa893",
            "#506bbe",
            "#febc48",
            "ba86f8"
          ]
        });
      },
      handleCurrentChange3(val) {
        if (this.flipboxType == 1) {
          this.axios
            .post("/teamproject/manager/data/salonlisthasteam", {
              userId: this.$store.state.user.userId,
              endDate: this.getMonth(this.date3End),
              page: val,
              pageSize: 5
            })
            .then(res => {
              this.flipbox3 = true
              this.active_salon3_dialog = true;
              this.active_salon3_data = res.data.data;
            });
        } else if(this.flipboxType == 0) {
          this.axios
            .post("/teamproject/manager/data/salonlisthasnoteam", {
              userId: this.$store.state.user.userId,
              endDate: this.getMonth(this.date3End),
              page: val,
              pageSize: 5
            })
            .then(res => {
              this.flipbox3 = true
              this.active_salon3_dialog = true;
              this.active_salon3_data = res.data.data;
            });
        }
      },
      getMonth(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let mydate = year.toString() + "-" + month.toString();
        return mydate;
      },
      getListDate(time) {
         const date = new Date(time)
         const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
        return date.getFullYear() + '-' + month 
      }
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    padding: 10px 0 15px 10px;
    > span {
      font-size: 19px;
      color: #333333;
    }
  }
  .chart_content {
    width: 100%;
    background: #fff;
    box-sizing: border-box;

    .chart_team_development {
      padding: 10px;
      margin-bottom: 20px;
      .team_development {
        width: 941px;
        height: 300px;
        border: solid 1px #ccc;
      }
      p {
        margin-top: 10px;
        text-align: center;
        color: #2e9deb;
      }
    }
  }
  .chart_box {
    width: 484px;
    height: 360px;
    float: left;
    margin-right: 12px;
    margin-bottom: 40px;
    .chart_item {
      width: 100%;
      height: 100%;
      .chart_date {
        display: block;
        margin-bottom: 10px;
      }
      .bottom {
        width: 484px;
        height: 350px;
        background: #fff;
      }
    }
  }
  .type_2,
  .type_4 {
    margin: 0;
  }
  .el-icon-refresh {
    font-size: 18px;
    /*font-weight: bold;*/
    line-height: 30px;
    cursor: pointer;
    margin-left: 10px;
    vertical-align: middle;
  }
  .demonstration {
    color: #768087;
    font-size: 14px;
    margin: 0 5px;
  }
</style>