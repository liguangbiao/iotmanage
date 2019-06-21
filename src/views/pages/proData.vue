<template>
    <div>
        <p class="p1">项目数据</p>
        <div class="wrap">
            <div>
                <div style="margin-right: 20px">
                    <!--项目按部门-->
                    <div class="block">
                        <span class="demonstration">截止月份：</span>
                        <!--                    <el-date-picker-->
                        <!--                            v-model="date"-->
                        <!--                            style="width: 150px"-->
                        <!--                            size="mini"-->
                        <!--                            type="date"-->
                        <!--                            placeholder="选择日期">-->
                        <!--                    </el-date-picker><span class="demonstration">-</span>-->
                        <el-date-picker
                                v-model="dateEnd"
                                style="width: 150px"
                                size="mini"
                                type="month"
                                placeholder="选择月份">
                        </el-date-picker>
<!--                        <span class="el-icon-refresh"></span>-->
                    </div>
                    <div id="main"></div>
                </div>
                <div>
                    <!--项目按人数-->
                    <div class="block">
                        <span class="demonstration">截止月份：</span>
<!--                        <el-date-picker-->
<!--                                v-model="date"-->
<!--                                style="width: 150px"-->
<!--                                size="mini"-->
<!--                                type="date"-->
<!--                                placeholder="选择日期">-->
<!--                        </el-date-picker><span class="demonstration">-</span>-->
                        <el-date-picker
                                v-model="dateEnd1"
                                style="width: 150px"
                                size="mini"
                                type="month"
                                placeholder="选择月份">
                        </el-date-picker>
<!--                        <span class="el-icon-refresh"></span>-->
                    </div>
                    <div id="main1"></div>
                </div>
            </div>
            <div style="margin-right: 20px;margin-top: 30px">
                <!--项目按时间-->
                <div class="block">
                    <span class="demonstration">时间范围：</span>
                                        <el-date-picker
                                                v-model="dateStart2"
                                                style="width: 150px"
                                                size="mini"
                                                type="month"
                                                placeholder="选择月份">
                                        </el-date-picker><span class="demonstration">-</span>
                    <el-date-picker
                            v-model="dateEnd2"
                            style="width: 150px"
                            size="mini"
                            type="month"
                            placeholder="选择月份">
                    </el-date-picker>
<!--                    <span class="el-icon-refresh"></span>-->
                </div>
                <div id="main2"></div>
            </div>
            <div style="margin-top: 30px">
                <!--项目按在线/入孵-->
                <div class="block">
                    <span class="demonstration">日期范围：</span>
                    <el-date-picker
                            v-model="dateStart3"
                            style="width: 150px"
                            size="mini"
                            type="month"
                            placeholder="选择月份">
                    </el-date-picker><span class="demonstration">-</span>
                    <el-date-picker
                            v-model="dateEnd3"
                            style="width: 150px"
                            size="mini"
                            type="month"
                            placeholder="选择月份">
                    </el-date-picker>
<!--                    <span class="el-icon-refresh"></span>-->
                </div>
                <div id="main3"></div>
            </div>
        </div>
       <!--项目按部门点击列表-->
        <el-dialog  :title='"项目分布统计-"+active_pro' :visible.sync="active_pro_dialog">
            <el-table v-if="active" :data="active_pro_data.result">
<!--                <el-table-column property="id" label="工坊ID" width="120"></el-table-column>-->
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
                    :total="active_pro_data.allRowNum">
            </el-pagination>
        </el-dialog>
        <!--项目按时间点击列表-->
        <el-dialog  :title='"项目分布统计-"+active_pro2' :visible.sync="active_pro_dialog2">
            <el-table v-if="active2" :data="active_pro_data2.result">
<!--                <el-table-column property="id" label="工坊ID" width="120"></el-table-column>-->
                <el-table-column property="teamName" label="工坊名称" width="180"></el-table-column>
                <el-table-column property="userName" label="负责人" width="100"></el-table-column>
                <el-table-column property="deptName" label="学院" width="140"></el-table-column>
                <el-table-column property="studentNum" label="学生数量" width="100"></el-table-column>
                <el-table-column property="teacherNum" label="老师数量"></el-table-column>
            </el-table>
            <el-pagination
                    v-if="active2"
                    :page-size="5"
                    :pager-count="5"
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange2"
                    :total="active_pro_data2.allRowNum">
            </el-pagination>
        </el-dialog>
        <!--项目按在线入孵点击列表-->
        <el-dialog  :title='"项目分布统计-"+active_pro3' :visible.sync="active_pro_dialog3">
            <el-table v-if="active3" :data="active_pro_data3.result">
<!--                <el-table-column property="id" label="工坊ID" width="120"></el-table-column>-->
                <el-table-column property="teamName" label="工坊名称" width="180"></el-table-column>
                <el-table-column property="userName" label="负责人" width="100"></el-table-column>
                <el-table-column property="deptName" label="学院" width="140"></el-table-column>
                <el-table-column property="studentNum" label="学生数量" width="100"></el-table-column>
                <el-table-column property="teacherNum" label="老师数量"></el-table-column>
            </el-table>
            <el-pagination
                    v-if="active3"
                    :page-size="5"
                    :pager-count="5"
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange3"
                    :total="active_pro_data3.allRowNum">
            </el-pagination>
        </el-dialog>
    </div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require("echarts/lib/component/legend");
    export default {
        name: "proData",
        data(){
            return {
                date:null,
                //按部门
                pro_data:null,
                dateEnd:new Date(),
                active_pro_dialog:false,
                active_pro:null,
                active_pro_data:null,
                active:false,
                //按人数
                pro_data1:null,
                dateEnd1:new Date(),
                active_pro_dialog1:false,
                active_pro1:null,
                active_pro_data1:null,
                active1:false,
                //按时间
                dateStart2:new Date().setMonth(new Date().getMonth()-5),
                dateEnd2:new Date(),
                pro_data2:null,
                active_pro_dialog2:false,
                active_pro2:null,
                active_pro_data2:null,
                active2:false,
                //按在线入孵
                dateStart3:new Date().setMonth(new Date().getMonth()-5),
                dateEnd3:new Date(),
                pro_data3:null,
                active_pro_dialog3:false,
                active_pro3:null,
                active_pro_data3:null,
                active3:false,
                type:null,
            }
        },
        mounted() {
            this.getData(new Date());//项目按部门分布饼图
            this.getData1(new Date());//项目按人数分布饼图
            this.getData2(this.dateStart2,new Date());//项目按时间分布柱状图
            this.getData3(this.dateStart3,new Date());//项目按时间分布柱状图
        },
        watch: {
            dateEnd:function () {
                this.getData(this.dateEnd);
            },
            dateEnd1:function () {
                this.getData1(this.dateEnd1);
            },
            dateStart2:function () {
                this.getData2(this.dateStart2,this.dateEnd2)
            },
            dateEnd2:function () {
                this.getData2(this.dateStart2,this.dateEnd2)
            },
            dateStart3:function () {
                this.getData3(this.dateStart3,this.dateEnd3)
            },
            dateEnd3:function () {
                this.getData3(this.dateStart3,this.dateEnd3)
            }
        },
        methods:{
            getData(date){
                let mydate = this.getMonth(date);
                this.axios.post('/teamproject/manager/data/carveout/projectdisbydept',{
                    userId:this.$store.state.user.userId,
                    endDate:mydate,
                }).then((res)=>{
                    this.pro_data = res.data.data.projectDisByDept;
                    let sum = 0;
                    this.pro_data.forEach((i)=>{sum += i.singleValue});
                    this.Chart_data_1(sum);
                })
            },//按部门
            getData1(date){
                let mydate = this.getMonth(date);
                this.axios.post('/teamproject/manager/data/carveout/peoplecountbydept',{
                    userId:this.$store.state.user.userId,
                    endDate:mydate,
                }).then((res)=>{
                    this.pro_data1 = res.data.data.countDisByMonth;
                    let sum = 0;
                    this.pro_data1.forEach((i)=>{sum += i.singleValue});
                    this.Chart_data_2(sum);
                })
            },//按人数
            getData2(dateStart,dateEnd){
                dateStart = new Date(dateStart)
                let mydate = this.getMonth(dateStart);
                let mydate1 = this.getMonth(dateEnd);
                this.axios.post('/teamproject/manager/data/carveout/projectdisbytime',{
                    userId:this.$store.state.user.userId,
                    startDate:mydate,
                    endDate:mydate1,
                }).then((res)=>{
                    this.pro_data2 = res.data.data.projectDisByTime;
                    let sum = 0;
                    this.pro_data2.forEach((i)=>{sum += i.singleValue});
                    this.Chart_data_3();
                })
            },//按时间
            getData3(dateStart,dateEnd){
                dateStart = new Date(dateStart)
                let mydate = this.getMonth(dateStart);
                let mydate1 = this.getMonth(dateEnd);
                this.axios.post('/teamproject/manager/data/carveout/projectinornotin',{
                    userId:this.$store.state.user.userId,
                    startDate:mydate,
                    endDate:mydate1,
                }).then((res)=>{
                    this.pro_data3 = res.data.data.projectInOrNotIn;
                    // let sum = 0;
                    // this.pro_data2.forEach((i)=>{sum += i.singleValue});
                    this.Chart_data_4();
                })
            },//按在线入孵
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
                    name:'入孵',
                    type:'bar',
                    barWidth:'15%',
                    data:new Array()
                };
                let obj2 = {
                    name:'在线',
                    type:'bar',
                    barWidth:'15%',
                    data:new Array()
                }
                for(let i in data){
                   obj1.data.push(data[i].value["入孵"])
                   obj2.data.push(data[i].value["在线"])
                }
                arr.push(obj1,obj2)
                return arr
            },//图表取数据
            //按部门
            Chart_data_1:function (sum) { //按部门
                let myChart = echarts.init(document.getElementById('main'));
                myChart.on('click', (params)=> {
                    this.active_pro = params.name;
                    this.axios.post('/teamproject/manager/data/projectlistbydept',{
                        userId:this.$store.state.user.userId,
                        deptName:params.name,
                        endDate:this.getMonth(this.dateEnd),
                        page:1,
                        pageSize:5
                    }).then((res)=>{
                        this.active = true;
                        this.active_pro_dialog = true;
                        this.active_pro_data = res.data.data;
                    })
                });
                myChart.setOption({
                    title: {
                        text: '项目分布统计',
                        subtext: '项目数量：'+sum,
                        left: 'left'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        // orient: 'vertical',
                        // top: 'middle',
                        bottom: 0,
                        left: 'center',
                        data: this.getE1data(this.pro_data),
                    },
                    color: ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3', '#a9e04b', '#759fd3', '#ffa893', '#506bbe', '#febc48',],
                    series : [
                        {
                            name:"项目分布情况",
                            type: 'pie',
                            radius : '45%',
                            center: ['50%', '50%'],
                            // selectedMode: 'single',
                            data:this.getE1data1(this.pro_data),
                        }
                    ]
                })
            },
            //按人数
            Chart_data_2:function (sum) {
                let myChart = echarts.init(document.getElementById('main1'));
                myChart.on('click', (params)=> {
                });
                myChart.setOption({
                    title: {
                        text: '项目人数分布统计',
                        subtext: '项目人数：'+sum,
                        left: 'left'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        // orient: 'vertical',
                        // top: 'middle',
                        bottom: 0,
                        left: 'center',
                        data: this.getE1data(this.pro_data1),
                    },
                    color: ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3', '#a9e04b', '#759fd3', '#ffa893', '#506bbe', '#febc48',],
                    series : [
                        {
                            name:"项目人数分布情况",
                            type: 'pie',
                            radius : '45%',
                            center: ['50%', '50%'],
                            // selectedMode: 'single',
                            data:this.getE1data1(this.pro_data1),
                        }
                    ]
                })
            },
            //按时间
            Chart_data_3:function(){
                let myChart1 = echarts.init(document.getElementById('main2'));
                myChart1.on('click', (params)=> {
                    this.active_pro2 = params.name;
                    this.axios.post('/teamproject/manager/data/carveout/projectlistbytime',{
                        userId:this.$store.state.user.userId,
                        endDate:params.name,
                        page:1,
                        pageSize:5
                    }).then((res)=>{
                        this.active2 = true;
                        this.active_pro_dialog2 = true;
                        this.active_pro_data2 = res.data.data;
                    })
                });
                myChart1.setOption({
                    title: {
                        text: '项目按时间段统计',
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 'bold'
                        },
                        subtext: '',
                        x: 'left',
                    },
                    color: ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3', '#a9e04b', '#759fd3', '#ffa893', '#506bbe', '#febc48',],                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.getE1data(this.pro_data2),
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'项目数量',
                            type:'bar',
                            barWidth: '60%',
                            data:this.getE1data1(this.pro_data2)
                        }
                    ]
                })
            },
            //在线/入孵
            Chart_data_4:function(){
                let myChart1 = echarts.init(document.getElementById('main3'));
                myChart1.on('click', (params)=> {
                    this.active_pro3 = params.name;
                    if(params.seriesName.includes('在线')){
                        this.type = 0;
                        this.axios.post('/teamproject/manager/data/carveout/projectnotinlistbytime',{
                            userId:this.$store.state.user.userId,
                            endDate:params.name,
                            page:1,
                            pageSize:5
                        }).then((res)=>{
                            this.active3 = true;
                            this.active_pro_dialog3 = true;
                            this.active_pro_data3 = res.data.data;
                        })
                    }else{
                        this.type = 1;
                        this.axios.post('/teamproject/manager/data/carveout/projectinlistbytime',{
                            userId:this.$store.state.user.userId,
                            endDate:params.name,
                            page:1,
                            pageSize:5
                        }).then((res)=>{
                            this.active3 = true;
                            this.active_pro_dialog3 = true;
                            this.active_pro_data3 = res.data.data;
                        })
                    }
                });
                myChart1.setOption({
                    title: {
                        text: '在线/入孵项目数对比',
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
                        data: ['入孵','在线']
                    },
                    grid: {
                        top: '18%',
                        left: '12%',
                        right: '12%',
                        bottom: '12%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.getE1data(this.pro_data3)
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} %'
                            },
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
                    series:this.getE1data2(this.pro_data3),
                    color: ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3', '#a9e04b', '#759fd3', '#ffa893', '#506bbe', '#febc48', 'ba86f8']
                })
            },
            //按部门点击列表
            handleCurrentChange(page){
                this.axios.post('/teamproject/manager/data/projectlistbydept',{
                    userId:this.$store.state.user.userId,
                    deptName:this.active_pro,
                    endDate:this.getMonth(this.dateEnd),
                    page:page,
                    pageSize:5
                }).then((res)=>{
                    this.active = true;
                    this.active_pro_dialog = true;
                    this.active_pro_data = res.data.data;
                })
            },
            //按时间点击列表
            handleCurrentChange2(page){
                this.axios.post('/teamproject/manager/data/carveout/projectlistbytime',{
                    userId:this.$store.state.user.userId,
                    endDate:this.active_pro2,
                    page:page,
                    pageSize:5
                }).then((res)=>{
                    this.active2 = true;
                    this.active_pro_dialog2 = true;
                    this.active_pro_data2 = res.data.data;
                })
            },
            //按在线入孵点击列表
            handleCurrentChange3(page){
                if(this.type == 0){
                    this.axios.post('/teamproject/manager/data/carveout/projectnotinlistbytime',{
                        userId:this.$store.state.user.userId,
                        endDate:this.active_pro3,
                        page:page,
                        pageSize:5
                    }).then((res)=>{
                        this.active3 = true;
                        this.active_pro_dialog3 = true;
                        this.active_pro_data3 = res.data.data;
                    })
                }else{
                    this.axios.post('/teamproject/manager/data/carveout/projectinlistbytime',{
                        userId:this.$store.state.user.userId,
                        endDate:this.active_pro3,
                        page:page,
                        pageSize:5
                    }).then((res)=>{
                        this.active3 = true;
                        this.active_pro_dialog3 = true;
                        this.active_pro_data3 = res.data.data;
                    })
                }

            },
            getMonth(date){
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                month =(month<10 ? "0"+month:month);
                let mydate = year.toString()+'-'+month.toString();
                return mydate
            }//月份转换
        }
    }
</script>

<style scoped>
    .wrap{
        display: flex;
        flex-wrap: wrap;
        background-color: white;
        padding: 12px;
    }
    .wrap>div:first-child{
        display: flex;
    }
    .p1{
        display: block;
        padding: 10px 0 15px 10px ;
        font-size: 19px;
        color: #333333;
    }
    .block{
        margin-top: 15px;
        /*padding-left: 15px;*/
    }
    #main,#main1,#main2,#main3{
        width: 484px;
        height: 324px;
        border: 1px solid #ccc;
        margin-top: 10px;
        padding: 10px;
    }
    .demonstration{
        color:#768087;
        font-size: 14px;
        margin: 0 5px;
    }
    .el-icon-refresh {
        font-size: 18px;
        /*font-weight: bold;*/
        line-height: 30px;
        cursor: pointer;
        margin-left: 10px;
        vertical-align: middle;
    }
</style>