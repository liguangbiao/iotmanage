<template>
    <div>
        <p class="p1">成果数据</p>
        <div style="display: flex">
            <div style="margin-right: 20px">
                <!-- 按时间 -->
                <div class="block">
                    <span class="demonstration">日期范围：</span>
                    <el-date-picker
                            v-model="dateStart"
                            style="width: 150px"
                            size="mini"
                            type="month"
                            placeholder="选择月份">
                    </el-date-picker><span class="demonstration">-</span>
                    <el-date-picker
                            v-model="dateEnd"
                            style="width: 150px"
                            size="mini"
                            type="month"
                            placeholder="选择月份">
                    </el-date-picker>
<!--                    <span class="el-icon-refresh"></span>-->
                </div>
                <div id="main"></div>
            </div>
            <div>
<!--                <div class="block">-->
<!--                    <span class="demonstration">日期范围：</span>-->
<!--                    <el-date-picker-->
<!--                            v-model="date"-->
<!--                            style="width: 150px"-->
<!--                            size="mini"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期">-->
<!--                    </el-date-picker><span class="demonstration">-</span>-->
<!--                    <el-date-picker-->
<!--                            v-model="date"-->
<!--                            style="width: 150px"-->
<!--                            size="mini"-->
<!--                            type="date"-->
<!--                            placeholder="选择日期">-->
<!--                    </el-date-picker>-->
<!--                    <span class="el-icon-refresh"></span>-->
<!--                </div>-->
<!--                <div id="main1"></div>-->
            </div>
        </div>
        <div style="margin-top: 30px">
<!--            <div class="block">-->
<!--                <span class="demonstration">日期范围：</span>-->
<!--                <el-date-picker-->
<!--                        v-model="date"-->
<!--                        style="width: 150px"-->
<!--                        size="mini"-->
<!--                        type="date"-->
<!--                        placeholder="选择日期">-->
<!--                </el-date-picker><span class="demonstration">-</span>-->
<!--                <el-date-picker-->
<!--                        v-model="date"-->
<!--                        style="width: 150px"-->
<!--                        size="mini"-->
<!--                        type="date"-->
<!--                        placeholder="选择日期">-->
<!--                </el-date-picker>-->
<!--                <span class="el-icon-refresh"></span>-->
<!--            </div>-->
<!--            <div id="main2"></div>-->
        </div>
        <!--成果按时间点击列表-->
        <el-dialog  :title='"成果数据统计-"+active_pro' :visible.sync="active_pro_dialog" @close="page = 1">
            <el-table v-if="active" :data="active_pro_data.result">
<!--                <el-table-column property="id" label="工坊ID" width="120"></el-table-column>-->
                <el-table-column property="teamName" label="工坊名称" width="300"></el-table-column>
                <el-table-column property="paper_name" label="论文名称"></el-table-column>
                <el-table-column property="journal_level" label="刊物等级"></el-table-column>
            </el-table>
            <el-pagination
                    v-if="active"
                    :page-size="5"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :current-page="page"
                    @current-change="handleCurrentChange"
                    :total="active_pro_data.allRowNum">
            </el-pagination>
        </el-dialog>
        <el-dialog  :title='"成果数据统计-"+active_pro' :visible.sync="active_pro_dialog1" @close="page = 1">
            <el-table v-if="active1" :data="active_pro_data1.result">
                <!--                <el-table-column property="id" label="工坊ID" width="120"></el-table-column>-->
                <el-table-column property="teamName" label="工坊名称" width="200"></el-table-column>
                <el-table-column property="match_name" label="获奖项目" width="300"></el-table-column>
                <el-table-column property="award_level" label="获奖等级"></el-table-column>
            </el-table>
            <el-pagination
                    v-if="active1"
                    :page-size="5"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :current-page="page"
                    @current-change="handleCurrentChange"
                    :total="active_pro_data1.allRowNum">
            </el-pagination>
        </el-dialog>
        <el-dialog  :title='"成果数据统计-"+active_pro' :visible.sync="active_pro_dialog2" @close="page = 1">
            <el-table v-if="active2" :data="active_pro_data2.result">
                <!--                <el-table-column property="id" label="工坊ID" width="120"></el-table-column>-->
                <el-table-column property="teamName" label="工坊名称" width="220"></el-table-column>
                <el-table-column property="patent_name" label="专利名称" width="280"></el-table-column>
                <el-table-column property="patent_level" label="专利类型"></el-table-column>
            </el-table>
            <el-pagination
                    v-if="active2"
                    :page-size="5"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :current-page="page"
                    @current-change="handleCurrentChange"
                    :total="active_pro_data2.allRowNum">
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
                //按时间
                pro_data:null,
                dateStart:new Date().setMonth(new Date().getMonth()-5),
                dateEnd:new Date(),
                active_pro_dialog:false,
                active_pro_dialog1:false,
                active_pro_dialog2:false,
                active_pro:null,
                active_pro_data:null,
                active_pro_data1:null,
                active_pro_data2:null,
                active:false,
                active1:false,
                active2:false,
                type:null,
                page:1,
            }
        },
        watch: {
            dateStart:function () {
                this.getData(this.dateStart,this.dateEnd)
            },
            dateEnd:function () {
                this.getData(this.dateStart,this.dateEnd)
            },
        },
        mounted() {
            this.getData(this.dateStart,new Date());//按时间分布柱状图
            this.draw1();
            this.draw2();
        },
        methods:{
            getE1data(data){
                let arr = new Array();
                for(let i of data){
                    // let obj = {};
                    // obj.name = i.name;
                    // obj.value = i.singleValue;
                    arr.push(i.name)
                }
                return arr
            },//图表取数据
            getE1data1(data){
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
            getData(dateStart,dateEnd){
                dateStart = new Date(dateStart)
                let mydate = this.getMonth(dateStart);
                let mydate1 = this.getMonth(dateEnd);
                this.axios.post('/teamproject/manager/data/innovate/resultdisbymonth',{
                    userId:this.$store.state.user.userId,
                    startDate:mydate,
                    endDate:mydate1,
                }).then((res)=>{
                    this.pro_data = res.data.data.resultDisByMonth;
                    this.Chart_data_1();
                })
            },//按时间
            Chart_data_1:function(){
                let myChart1 = echarts.init(document.getElementById('main'));
                myChart1.on('click', (params)=> {
                    this.active_pro = params.name;
                    if(params.seriesName.includes('论文')){
                        this.type = 0;
                        this.axios.post('/teamproject/manager/data/paperlistbymonth',{
                            userId:this.$store.state.user.userId,
                            year:params.name.split('-')[0],
                            month:params.name.split('-')[1],
                            page:1,
                            pageSize:5
                        }).then((res)=>{
                            this.active = true;
                            this.active_pro_dialog = true;
                            this.active_pro_data = res.data.data;
                        })
                    }else if(params.seriesName.includes('获奖')){
                        this.type = 1;
                        this.axios.post('/teamproject/manager/data/awardlistbymonth',{
                            userId:this.$store.state.user.userId,
                            year:params.name.split('-')[0],
                            month:params.name.split('-')[1],
                            page:1,
                            pageSize:5
                        }).then((res)=>{
                            this.active1 = true;
                            this.active_pro_dialog1 = true;
                            this.active_pro_data1 = res.data.data;
                        })
                    } else {
                        this.type = 2;
                        this.axios.post('/teamproject/manager/data/patentlistbymonth',{
                            userId:this.$store.state.user.userId,
                            year:params.name.split('-')[0],
                            month:params.name.split('-')[1],
                            page:1,
                            pageSize:5
                        }).then((res)=>{
                            this.active2 = true;
                            this.active_pro_dialog2 = true;
                            this.active_pro_data2 = res.data.data;
                        })
                    }
                });
                myChart1.setOption({
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
                            data: this.getE1data(this.pro_data)
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
                    series:this.getE1data1(this.pro_data),
                    color: ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3', '#a9e04b', '#759fd3', '#ffa893', '#506bbe', '#febc48', 'ba86f8']
                })
            },
            draw1:function () {
                let myChart1 = echarts.init(document.getElementById('main1'));
                myChart1.on('click', function (params) {
                    alert(params);
                });
                myChart1.setOption({
                    title: {
                        text: '项目数量统计',
                        textStyle: {
                            fontSize: 16,
                            fontWeight: 'normal'
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
                            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                            name:'直接访问',
                            type:'bar',
                            barWidth: '60%',
                            data:[10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                })
            },
            draw2:function () {
                let myChart2 = echarts.init(document.getElementById('main2'));
                myChart2.on('click', function (params) {
                    alert(params);
                });
                myChart2.setOption({
                    title: {
                        text: '项目发展状态统计',
                        subtext: '项目数量：0',
                        left: 'left'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    // legend: {
                    //     // orient: 'vertical',
                    //     // top: 'middle',
                    //     bottom: 0,
                    //     left: 'center',
                    //     data: ['高新技术产业', '初孵阶段','出孵阶段']
                    // },
                    color: ['#2f9dea', '#46d88b', '#f7d448', '#e85959', '#3de0e7', '#3a68e3', '#a9e04b', '#759fd3', '#ffa893', '#506bbe', '#febc48',],
                    series : [
                        {
                            name:"项目发展",
                            type: 'pie',
                            radius : '45%',
                            center: ['50%', '50%'],
                            // selectedMode: 'single',
                            data:[
                                {value:810, name: '高新技术产业'},
                                {value:535, name: '初孵阶段'},
                                {value:510, name: '出孵阶段'},
                            ],
                        }
                    ]
                })
            },
            getMonth(date){
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                month =(month<10 ? "0"+month:month);
                let mydate = year.toString()+'-'+month.toString();
                return mydate
            },//月份转换
            //按时间点击列表
            handleCurrentChange(page){
                this.page = page;
                switch (this.type) {
                    case 0 :{
                        this.axios.post('/teamproject/manager/data/paperlistbymonth',{
                            userId:this.$store.state.user.userId,
                            year:this.active_pro.split('-')[0],
                            month:this.active_pro.split('-')[1],
                            page:page,
                            pageSize:5
                        }).then((res)=>{
                            this.active = true;
                            this.active_pro_dialog = true;
                            this.active_pro_data = res.data.data;
                        })
                        break
                    }
                    case 1 : {
                        this.axios.post('/teamproject/manager/data/awardlistbymonth',{
                            userId:this.$store.state.user.userId,
                            year:this.active_pro.split('-')[0],
                            month:this.active_pro.split('-')[1],
                            page:page,
                            pageSize:5
                        }).then((res)=>{
                            this.active1 = true;
                            this.active_pro_dialog1 = true;
                            this.active_pro_data1 = res.data.data;
                        })
                        break
                    }
                    case 2 : {
                        this.axios.post('/teamproject/manager/data/patentlistbymonth',{
                            userId:this.$store.state.user.userId,
                            year:this.active_pro.split('-')[0],
                            month:this.active_pro.split('-')[1],
                            page:page,
                            pageSize:5
                        }).then((res)=>{
                            this.active2 = true;
                            this.active_pro_dialog2 = true;
                            this.active_pro_data2 = res.data.data;
                        })
                        break
                    }
                }
            },
        }
    }
</script>

<style scoped>
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
    #main,#main1,#main2{
        width: 484px;
        height: 324px;
        border: 1px solid #ccc;
        margin-top: 10px;
        padding: 10px;
        background-color: white;
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