<template>
  <div class="Team_data">
    <div class="title">工坊数据</div>
    <div class="Team_data_content clearfix">
      <div class="chart_box fixed-size-1">
        <div class="chart_date">
          <span>截止月份:&nbsp;</span>
<!--          <el-date-picker v-model="date1Start" type="month" placeholder="选择月份"></el-date-picker>-->
<!--          <span>&nbsp;-&nbsp;</span>-->
          <el-date-picker v-model="date1End" type="month" placeholder="选择月份"></el-date-picker>
<!--          <span class="el-icon-refresh"></span>-->
        </div>
        <div class="chart_data chart_container" id="chart_data_1"></div>
      </div>
      <div class="chart_box fixed-size-1">
        <div class="chart_date">
          <span>日期范围:&nbsp;</span>
<!--          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>-->
<!--          <span>&nbsp;-&nbsp;</span>-->
          <el-date-picker v-model="date2End" type="month" placeholder="选择月份"></el-date-picker>
<!--          <span class="el-icon-refresh"></span>-->
        </div>
        <div class="chart_data chart_container" id="chart_data_2"></div>
      </div>
    </div>
    <el-dialog :title='"工坊人员分布统计-"+active_team' :visible.sync="active_team_dialog">
      <el-table v-if="active" :data="active_team_data.result">
<!--        <el-table-column property="id" label="工坊ID" width="120"></el-table-column>-->
        <el-table-column property="teamName" label="工坊名称" width="180"></el-table-column>
        <el-table-column property="userName" label="负责人" width="100"></el-table-column>
        <el-table-column property="deptName" label="学院" width="140"></el-table-column>
        <el-table-column property="studentNum" label="学生数量" width="100"></el-table-column>
        <el-table-column property="teacherNum" label="老师数量"></el-table-column>
      </el-table>
      <el-pagination
              v-if="active"
              :page-size="5"
              :pager-count="5"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :total="active_team_data.allRowNum">
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // date1Start:null,
        //按部门
        date1End:new Date(),
        team_data:null,
        active_team:null,
        active_team_dialog:false,
        active_team_data:null,
        active:false,
        //按人数
        date2End:new Date(),
        team_data1:null,
        active_team1:null,
        active_team_dialog1:false,
        active_team_data1:null,
        active1:false,
      };
    },
    computed: {},
    watch: {
      date1End:function () {
        this.getData(this.date1End);
      },
      date2End:function () {
        this.getData1(this.date2End);
      }
    },
    created() {},
    mounted() {
      this.getData(new Date()); //工坊按部门分布饼图
      this.getData1(new Date());
    },
    methods: {
      getData(date){
        // let date = new Date();
        let mydate = this.getMonth(date);
        this.axios.post('/teamproject/manager/data/innovate/workshopdisbydept',{
          userId:this.$store.state.user.userId,
          endDate:mydate,
        }).then((res)=>{
          this.team_data = res.data.data.workshopDisByDept;
          let sum = 0;
          this.team_data.forEach((i)=>{sum += i.singleValue});
          this.Chart_data_1(sum);
        })
      },//按部门
      getData1(date){
        // let date = new Date();
        let mydate = this.getMonth(date);
        this.axios.post('/teamproject/manager/data/innovate/peoplecountbydept',{
          userId:this.$store.state.user.userId,
          endDate:mydate,
        }).then((res)=>{
          this.team_data1 = res.data.data.countDisByMonth;
          let sum = 0;
          this.team_data1.forEach((i)=>{sum += i.singleValue});
          this.Chart_data_2(sum);
        })
      },//按人数
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
      Chart_data_1(sum) {
        let chart_data_1 = this.$echarts.init(
          document.getElementById("chart_data_1")
        );
        chart_data_1.setOption({
          title: {
            text: "工坊按学院分布统计",
            textStyle: {
              fontSize: 16,
              fontWeight: "normal"
            },
            subtext: "工坊数量：" + sum,
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
            data:this.getE1data(this.team_data),
          },
          series: [
            {
              name: "工坊数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data:this.getE1data1(this.team_data),
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
        chart_data_1.on('click',(params)=>{
          this.active_team = params.name;
          this.axios.post('/teamproject/manager/data/workshoplistbydept',{
            userId:this.$store.state.user.userId,
            deptName:params.name,
            endDate:this.getMonth(this.date1End),
            page:1,
            pageSize:5
          }).then((res)=>{
            this.active_team_dialog = true;
            this.active = true;
            this.active_team_data = res.data.data;
          })
        });
      },
      Chart_data_2(sum) {
        let chart_data_2 = this.$echarts.init(
                document.getElementById("chart_data_2")
        );
        chart_data_2.setOption({
          title: {
            text: "工坊人数按学院统计",
            textStyle: {
              fontSize: 16,
              fontWeight: "normal"
            },
            subtext: "工坊数量：" + sum,
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
            data:this.getE1data(this.team_data1),
          },
          series: [
            {
              name: "工坊数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data:this.getE1data1(this.team_data1),
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
      handleCurrentChange(page){
        this.axios.post('/teamproject/manager/data/workshoplistbydept',{
          userId:this.$store.state.user.userId,
          deptName:this.active_team ,
            endDate:this.getMonth(this.date1End),
          page:page,
          pageSize:5
        }).then((res)=>{
          this.active_team_dialog = true;
          this.active = true;
          this.active_team_data = res.data.data;
        })
      },
      getMonth(date){
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        month =(month<10 ? "0"+month:month);
        let mydate = year.toString()+'-'+month.toString();
        return mydate
      }
    }
  };
</script>
<style lang="scss" scoped>
  .Team_data {
    box-sizing: border-box;
    background: #fff;
  }
  .title {
    display: block;
    height: 50px;
    font-size: 24px;
    font-weight: 400;
    color: #333;
    background: #fafafd;
  }
  .Team_data_content {
    background: #fff;
    padding: 10px 20px;

    .chart_box {
      float: left;
      margin-right: 16px;
      &:nth-child(2) {
        margin: 0;
      }
      .chart_data {
        margin-top: 10px;
      }
      .chart_container {
        width: 460px;
        height: 324px;
        background: #fff;
        border: 1px solid #ccc;
      }
    }
  }
  .el-icon-refresh {
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    cursor: pointer;
    margin-left: 10px;
  }
  .el-pagination{
    text-align: center;
    margin-top: 8px;
  }
</style>

