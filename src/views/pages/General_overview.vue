<template>
  <div class="general_overview">
    <div class="overview_title" v-if="$store.state.user.role == 1">总体概览</div>
    <div class="overview_title" v-if="$store.state.user.role != 1">我的概览</div>
    <div class="btn" v-if="$store.state.user.role != 1">
      <el-row>
<!--        <el-button type="primary" @click="SetUpTeam">创建工坊</el-button>-->
        <el-button type="primary" @click="JoinTeam" v-show="$store.state.user.role == 2">加入团队</el-button>
      </el-row>
    </div>
    <div class="overview_data" v-if="resData.length >= 0">
      <ul class="clearfix">
        <li>
          <div class="overview_data_box clearfix">
            <i class="overview_icon data_icon1 fl"></i>
            <div class="overview_content fl">
              <span>{{resData.workshopNum}}</span>
              <span>{{$store.state.user.role == 1 ? "工坊数量":"所属工坊"}}</span>
            </div>
          </div>
        </li>
        <li>
          <div class="overview_data_box clearfix">
            <i class="overview_icon data_icon2 fl"></i>
            <div class="overview_content fl">
              <span>{{resData.projectNum}}</span>
              <span>{{$store.state.user.role == 1 ? "项目数量":"所属项目"}}</span>
            </div>
          </div>
        </li>
        <li v-if="$store.state.user.role == 1">
          <div class="overview_data_box clearfix">
            <i class="overview_icon data_icon3 fl"></i>
            <div class="overview_content fl">
              <span>{{resData.teacherNum}}</span>
              <span>教师数量</span>
            </div>
          </div>
        </li>
        <li v-if="$store.state.user.role == 1">
          <div class="overview_data_box clearfix">
            <i class="overview_icon data_icon4 fl"></i>
            <div class="overview_content fl">
              <span>{{resData.studentNum}}</span>
              <span>学生数量</span>
            </div>
          </div>
        </li>
        <li v-if="$store.state.user.role != 1">
          <div class="overview_data_box clearfix">
            <i class="overview_icon data_icon3 fl"></i>
            <div class="overview_content fl">
              <span>{{resData.workNum}}</span>
              <span>待办消息</span>
            </div>
          </div>
        </li>
        <li v-if="$store.state.user.role != 1">
          <div class="overview_data_box clearfix">
            <i class="overview_icon data_icon4 fl"></i>
            <div class="overview_content fl">
              <span>{{resData.salonNum}}</span>
              <span>所属沙龙</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="chart_content">
      <div class="chart_team_development" v-if="role == 'manage'">
        <div class="team_development" id="chart_team_d"></div>
        <p>工坊发展阶段数量统计</p>
      </div>
      <div class="chart_box type_1">
        <div class="chart_item">
          <div class="bottom chart_container type_1" id="chart_1" ref="chart_1"></div>
        </div>
      </div>
      <div class="chart_box type_2">
        <div class="chart_item">
          <div class="bottom chart_container type_1" id="chart_2" ref="chart_2"></div>
        </div>
      </div>
      <div class="chart_box type_3">
        <div class="chart_item">
          <div class="bottom chart_container type_1" id="chart_3" ref="chart_3"></div>
        </div>
      </div>
      <div class="chart_box type_4">
        <div class="chart_item">
          <div class="bottom chart_container type_1" id="chart_4" ref="chart_4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: false,
        resData:[],
        role: undefined
      };
    },
    watch: {},
    created() {},
    mounted() {
      this.getData();
      this.Chat_team();
    },
    methods: {
      getData(){
        let s;
        if(this.$store.state.user.role == 1){
          s='/teamproject/manager/data/overview';
        }else if(this.$store.state.user.role == 2){
          s = '/teamproject/student/data/overview'
        }else if(this.$store.state.user.role == 3){
          s = '/teamproject/teacher/data/overview'
        }
        this.axios.post(s,{
          userId:this.$store.state.user.userId
        }).then((res) => {
          this.$set(this.resData,'projectNum',res.data.data.overView.projectNum);
          this.$set(this.resData,'studentNum',res.data.data.overView.studentNum);
          this.$set(this.resData,'teacherNum',res.data.data.overView.teacherNum);
          this.$set(this.resData,'workshopNum',res.data.data.overView.workshopNum);
          this.$set(this.resData,'workNum',res.data.data.overView.workNum);
          this.$set(this.resData,'salonNum',res.data.data.overView.salonNum);
          this.$set(this.resData,'listProjectDisByDept',res.data.data.overView.listProjectDisByDept);
          this.$set(this.resData,'listResultDisByTime',res.data.data.overView.listResultDisByTime);
          this.$set(this.resData,'listTopicDisByTime',res.data.data.overView.listTopicDisByTime);
          this.$set(this.resData,'listVolveStudentTeacher',res.data.data.overView.listVolveStudentTeacher);
          this.$set(this.resData,'listWorkshopDisByDept',res.data.data.overView.listWorkshopDisByDept);
          let sum1 = 0;
          res.data.data.overView.listWorkshopDisByDept.forEach((i)=>{sum1 += i.singleValue});
          let sum2 = 0;
          res.data.data.overView.listProjectDisByDept.forEach((i)=>{sum2 += i.singleValue});
          this.Chart_1(sum1,this.getE1data(res.data.data.overView.listWorkshopDisByDept),this.getE1data1(res.data.data.overView.listWorkshopDisByDept));
          this.Chart_2(sum2,this.getE1data(res.data.data.overView.listProjectDisByDept),this.getE1data1(res.data.data.overView.listProjectDisByDept));
          this.Chart_3(this.getE1data(res.data.data.overView.listResultDisByTime),this.getE1data2(res.data.data.overView.listResultDisByTime));
          this.Chart_4(this.getE1data(res.data.data.overView.listVolveStudentTeacher),this.getE1data3(res.data.data.overView.listVolveStudentTeacher));
        })
      },
      Chat_team() {
        let chartTeam = this.$echarts.init(
          document.getElementById("chart_team_d")
        );
        chartTeam.setOption({
          // title: {
          //   text: "项目分布状态",
          //   textStyle: {
          //     fontSize: 16,
          //     fontWeight: "normal"
          //   },
          //   subtext: "",
          //   x: "left"
          // },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "none" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            // orient: "horizontal",
            left: "center",
            bottom: 0,
            itemWidth: 14,
            data: ["初始工坊", "成熟工坊"]
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
              data: ["2018-11", "2018-12", "2019-01", "2019-02", "2019-03"]
            }
          ],
          yAxis: [
            {
              type: "value",
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
          series: [
            {
              name: "直接访问",
              type: "bar",
              barWidth: "40%",
              data: [.5, .6, .2, .4, .8]
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
      Chart_1(sum1,data1,data2) {
        // 基于准备好的dom，初始化echarts实例
        let myChart_1 = this.$echarts.init(document.getElementById("chart_1"));
        // 绘制图表
        myChart_1.setOption({
          title: {
            text: "工坊按学院分布统计",
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold'
            },
            subtext: "工坊数量：" + sum1,
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
            data: data1
          },
          series: [
            {
              name: "工坊数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: data2,
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
      Chart_2(sum2,data1,data2) {
        let myChart_2 = this.$echarts.init(document.getElementById("chart_2"));
        myChart_2.setOption({
          title: {
            text: "项目按学院分布统计",
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold'
            },
            subtext: "项目数量：" + sum2,
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
            data: data1
          },
          series: [
            {
              name: "项目数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data:data2,
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
      Chart_3(data1,data2) {
        let myChart_3 = this.$echarts.init(document.getElementById("chart_3"));
        myChart_3.setOption({
          title: {
            text: '成果数据统计',
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold'
            },
            subtext: '',
            x: 'left',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            itemWidth: 14,
            data: ['论文','获奖','专利']
          },
          grid: {
            // top: '18%',
            // left: '12%',
            // right: '12%',
            // bottom: '12%',
            // containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: data1
            }
          ],
          yAxis: [
            {
              type: 'value',
              // axisLabel: {
              //     formatter: '{value} %'
              // },
              axisLine: {
                show: true
              },
              axisTick: {
                show: true
              },
              splitLine: {
                lineStyle: {
                  color: '#d8d8d8'
                }
              }
            }
          ],
          series:data2,
          color: ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3', '#a9e04b', '#759fd3', '#ffa893', '#506bbe', '#febc48', 'ba86f8']
        })
      },
      Chart_4(data1,data2) {
        let myChart_4 = this.$echarts.init(document.getElementById("chart_4"));
        myChart_4.setOption({
          title: {
            text: '师生数据统计',
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold'
            },
            subtext: '',
            x: 'left',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            itemWidth: 14,
            data: ['老师','学生']
          },
          grid: {
            // top: '18%',
            // left: '12%',
            // right: '12%',
            // bottom: '12%',
            // containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: data1
            }
          ],
          yAxis: [
            {
              type: 'value',
              // axisLabel: {
              //     formatter: '{value} %'
              // },
              axisLine: {
                show: true
              },
              axisTick: {
                show: true
              },
              splitLine: {
                lineStyle: {
                  color: '#d8d8d8'
                }
              }
            }
          ],
          series:data2,
          color: ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3', '#a9e04b', '#759fd3', '#ffa893', '#506bbe', '#febc48', 'ba86f8']
        })
      },
      getE1data(data){
        let arr = new Array();
        for(let i of data){
          arr.push(i.name)
        }
        return arr
      }, //图表取数据
      getE1data1(data){
        let arr = new Array();
        for(let i of data){
          let obj = {};
          obj.name = i.name;
          obj.value = i.singleValue;
          arr.push(obj)
        }
        return arr
      },//图表取数据
      getE1data2(data){
        let arr = new Array();
        let obj1 = {
          name:'论文',
          type:'bar',
          barWidth:'15%',
          data:new Array()
        };
        let obj2 = {
          name:'获奖',
          type:'bar',
          barWidth:'15%',
          data:new Array()
        };
        let obj3 = {
          name:'专利',
          type:'bar',
          barWidth:'15%',
          data:new Array()
        }
        for(let i in data){
          obj1.data.push(data[i].value["论文"])
          obj2.data.push(data[i].value["获奖"])
          obj3.data.push(data[i].value["专利"])
        }
        arr.push(obj1,obj2,obj3)
        return arr
      },//图表取数据
      getE1data3(data){
        let arr = new Array();
        let obj1 = {
          name:'老师',
          type:'bar',
          barWidth:'15%',
          data:new Array()
        };
        let obj2 = {
          name:'学生',
          type:'bar',
          barWidth:'15%',
          data:new Array()
        };
        for(let i in data){
          obj1.data.push(data[i].value["teacherNum"])
          obj2.data.push(data[i].value["studentNum"])
        }
        arr.push(obj1,obj2);
        return arr
      },//图表取数据
      SetUpTeam() {
        this.$router.push({path:'/newTeam'})
      },
      JoinTeam() {
        this.$router.push({ name: "joinTeam" });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .chart_item>div:first-child{
    padding: 10px;
    box-sizing: border-box;
  }
  .overview_title {
    display: block;
    height: 50px;
    font-size: 24px;
    font-weight: 400;
    color: #333;
    background: #fafafd;
  }
  .overview_data {
    ul {
      li {
        float: left;
        width: 230px;
        height: 120px;
        background: #fff;
        margin-right: 20px;
        box-sizing: border-box;

        .overview_data_box {
          padding: 36px 0 36px 50px;

          .overview_icon {
            display: inline-block;
            width: 48px;
            height: 48px;
            margin-right: 10px;
            vertical-align: middle;
          }

          .data_icon1 {
            background: url("../../assets/images/icon/td_icon.png") no-repeat;
          }

          .data_icon2 {
            background: url("../../assets/images/icon/xm_icon.png") no-repeat;
          }

          .data_icon3 {
            background: url("../../assets/images/icon/zl_icon.png") no-repeat;
          }

          .data_icon4 {
            background: url("../../assets/images/icon/lw_icon.png") no-repeat;
          }

          .overview_content {
            vertical-align: middle;
            box-sizing: border-box;

            span {
              display: block;
              font-size: 14px;


              &:nth-of-type(1) {
                font-size: 30px;
                margin-bottom: 6px;
                font-weight: bold;
              }
            }
          }
        }

        &:nth-of-type(4) {
          margin-right: 0;
        }
      }
    }
  }
  .chart_content {
    width: 100%;
    background: #fff;
    margin-top: 20px;
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
    margin-bottom: 12px;
    .chart_item {
      width: 100%;
      height: 100%;
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
  .btn {
    position: relative;
    .el-row {
      position: absolute;
      right: 0;
      top: -51px;
    }
  }
</style>
