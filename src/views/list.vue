<template>
    <div>
        <div class="wrap">
            <div class="head">
                <span>欢迎访问广州市轻工技师学院</span>
                <span><a>设为首页</a><a>加入收藏</a></span>
            </div>
            <div class="nav">
                <div>
                    <img src="../assets/LOGO1.png" @click="jump1('/')">
                    <a @click="handleNav(1)" :class="{navActive:navActive == 1}">
                        <img :src="navActive == 1?  require('../assets/images/an1.png'):require('../assets/images/n1.png')">新闻动态
                    </a>
                    <a @click="handleNav(2)" :class="{navActive:navActive == 2}">
                        <img :src="navActive == 2?  require('../assets/images/an2.png'):require('../assets/images/n2.png')">学校要闻
                    </a>
                    <a @click="handleNav(3)" :class="{navActive3:navActive == 3}">
                        <img :src="navActive == 3?  require('../assets/images/an3.png'):require('../assets/images/n3.png')">通知公告
                    </a>
                    <a @click="handleNav(4)" :class="{navActive4:navActive == 4}">
                        <img :src="navActive == 4?  require('../assets/images/an4.png'):require('../assets/images/n4.png')">轻创导师
                    </a>
                    <a @click="handleNav(5)" :class="{navActive5:navActive == 5}">
                        <img :src="navActive == 5?  require('../assets/images/an5.png'):require('../assets/images/n5.png')">轻创竞技场
                    </a>
                    <a @click="handleNav(6)" :class="{navActive:navActive == 6}">
                        <img :src="navActive == 6?  require('../assets/images/an6.png'):require('../assets/images/n6.png')">轻创活动
                    </a>
                    <a @click="handleNav(7)" :class="{navActive:navActive == 7}">
                        <img :src="navActive == 7?  require('../assets/images/an6.png'):require('../assets/images/n6.png')">获奖信息
                    </a>
                </div>
                <div>
                    <button @click="jump('/login')" v-if="$store.state.user.token == null">登录</button>
                    <el-select  @change="winOpen" v-model="value" placeholder="服务应用" style="width: 115px;margin-left:2px" v-if="$store.state.user.token != null">
                        <el-option
                                v-for="item in $store.state.options"
                                :key="item.webUrl"
                                :label="item.webName"
                                :value="item.webUrl">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div v-if="navActive == 1" class="dreamwork">
            <div class="news" >
                <p>新闻动态</p>
                <div>
                    <a v-for="item in data11.data.result" @click="jump(item.id)">
                        <img :src="item.thumbNail_image">
                        <div>
                            <p>{{item.title}}</p>
                            <span>{{getDate(item.create_time)}}</span>
                        </div>
                    </a>
                </div>
                <div>
                    <el-pagination
                            v-if="active1"
                            :page-size="10"
                            :pager-count="5"
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange1"
                            :total="data11.data.allRowNum">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-if="navActive == 2" class="dreamwork2">
            <div class="news">
                <p>学校要闻</p>
                <div>
                    <a v-for="item in data22.data.result" @click="jump(item.id)">
                            <p>{{item.title}}</p>
                            <span>{{getDate(item.create_time)}}</span>
                    </a>
                </div>
                <div>
                    <el-pagination
                            v-if="active2"
                            :page-size="10"
                            :pager-count="5"
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange2"
                            :total="data22.data.allRowNum">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-if="navActive == 3" class="dreamwork2">
            <div class="news">
                <p>通知公告</p>
                <div>
                    <a v-for="item in data33.data.result" @click="jump(item.id)">
                        <p>{{item.title}}</p>
                        <span>{{getDate(item.create_time)}}</span>
                    </a>
                </div>
                <div>
                    <el-pagination
                            v-if="active3"
                            :page-size="10"
                            :pager-count="5"
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange3"
                            :total="data33.data.allRowNum">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-if="navActive == 4" class="dreamwork1">
            <div class="news">
                <p>导师列表</p>
                <div>
                    <a v-for="item in data44.data.result">
                        <div>
                            <p>{{item.title}}</p>
                            <span>{{item.subTitle}}</span>
                            <span>{{item.summary}}</span>
                        </div>
                        <img :src="item.thumbNail_image">
                    </a>
                </div>
                <div>
                    <el-pagination
                            v-if="active4"
                            :page-size="10"
                            :pager-count="5"
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange4"
                            :total="data44.data.allRowNum">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-if="navActive == 5" class="dreamwork">
            <div class="news" >
                <p>竞技场</p>
                <div>
                    <a v-for="item in data55.data.result" @click="jump(item.id)">
                        <img :src="item.thumbNail_image">
                        <div>
                            <p>{{item.title}}</p>
                            <span>{{getDate(item.create_time)}}</span>
                        </div>
                    </a>
                </div>
                <div>
                    <el-pagination
                            v-if="active5"
                            :page-size="10"
                            :pager-count="5"
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange5"
                            :total="data55.data.allRowNum">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-if="navActive == 6" class="dreamwork">
            <div class="news" >
                <p>活动信息</p>
                <div>
                    <a v-for="item in data66.data.result" @click="jump(item.id)">
                        <img :src="item.thumbNail_image">
                        <div>
                            <p>{{item.title}}</p>
                            <span>{{getDate(item.create_time)}}</span>
                        </div>
                    </a>
                </div>
                <div>
                    <el-pagination
                            v-if="active6"
                            :page-size="10"
                            :pager-count="5"
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange6"
                            :total="data66.data.allRowNum">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div v-if="navActive == 7" class="dreamwork">
            <div class="news" >
                <p>获奖信息</p>
                <div>
                    <a v-for="item in data77.data.result" @click="jump(item.id)">
                        <img :src="item.thumbNail_image">
                        <div>
                            <p>{{item.title}}</p>
                            <span>{{getDate(item.create_time)}}</span>
                        </div>
                    </a>
                </div>
                <div>
                    <el-pagination
                            v-if="active7"
                            :page-size="10"
                            :pager-count="5"
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange7"
                            :total="data77.data.allRowNum">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data(){
            return {
                navActive:null,
                pageListId:66,
                data11:[],
                data22:[],
                data33:[],
                data44:[],
                data55:[],
                data66:[],
                data77:[],
                active1:1,
                active2:1,
                active3:1,
                active4:1,
                active5:1,
                active6:1,
                active7:1,
            }
        },
        mounted(){
            this.navActive = this.$route.params.id ;
            // this.getData1(1);
            // this.$nextTick(()=>{
            //     this.navActive = this.$route.params.id;
            // })
        },
        watch:{
            navActive:function () {
                let i = parseInt(this.navActive)
                switch (i) {
                    case 1 :
                        this.getData1(1);
                        this.pageListId = 66;
                        break
                    case 2 :
                        this.getData2(1);
                        this.pageListId = 67;
                        break
                    case 3 :
                        this.getData3(1);
                        this.pageListId = 68;
                        break
                    case 4 :
                        this.getData4(1);
                        this.pageListId = 70;
                        break
                    case 5 :
                        console.log(this.navActive)
                        this.getData5(1);
                        this.pageListId = 69;
                        break
                    case 6 :
                        this.getData6(1);
                        this.pageListId = 73;
                        break
                    case 7 :
                        this.getData7(1);
                        this.pageListId = 72;
                        break
                    // default :
                    //     this.getData1(1);
                    //     this.pageListId = 66;
                    //     break
                }
            }
        },
        methods:{
            getData1(page){
                this.axios({
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    url:'/portal/pagelist',
                    method: 'post',
                    data:{
                        userId:this.$store.state.user.userId,
                        pageListId:66,
                        page:page,
                        pageSize:10
                    }
                }).then(res => {
                    this.$set(this.data11,'data',res.data.data.infoMap.contentPageInfo);
                });
            },
            getData2(page){
                this.axios({
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    url:'/portal/pagelist',
                    method: 'post',
                    data:{
                        userId:this.$store.state.user.userId,
                        pageListId:67,
                        page:page,
                        pageSize:10
                    }
                }).then(res => {
                    this.$set(this.data22,'data',res.data.data.infoMap.contentPageInfo);
                });
            },
            getData3(page){
                this.axios({
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    url:'/portal/pagelist',
                    method: 'post',
                    data:{
                        userId:this.$store.state.user.userId,
                        pageListId:68,
                        page:page,
                        pageSize:10
                    }
                }).then(res => {
                    this.$set(this.data33,'data',res.data.data.infoMap.contentPageInfo);
                });
            },
            getData4(page){
                this.axios({
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    url:'/portal/pagelist',
                    method: 'post',
                    data:{
                        userId:this.$store.state.user.userId,
                        pageListId:70,
                        page:page,
                        pageSize:10
                    }
                }).then(res => {
                    this.$set(this.data44,'data',res.data.data.infoMap.contentPageInfo);
                });
            },
            getData5(page){
                this.axios({
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    url:'/portal/pagelist',
                    method: 'post',
                    data:{
                        userId:this.$store.state.user.userId,
                        pageListId:69,
                        page:page,
                        pageSize:10
                    }
                }).then(res => {
                    this.$set(this.data55,'data',res.data.data.infoMap.contentPageInfo);
                });
            },
            getData6(page){
                this.axios({
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    url:'/portal/pagelist',
                    method: 'post',
                    data:{
                        userId:this.$store.state.user.userId,
                        pageListId:73,
                        page:page,
                        pageSize:10
                    }
                }).then(res => {
                    this.$set(this.data66,'data',res.data.data.infoMap.contentPageInfo);
                });
            },
            getData7(page){
                this.axios({
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    url:'/portal/pagelist',
                    method: 'post',
                    data:{
                        userId:this.$store.state.user.userId,
                        pageListId:72,
                        page:page,
                        pageSize:10
                    }
                }).then(res => {
                    this.$set(this.data77,'data',res.data.data.infoMap.contentPageInfo);
                });
            },
            getDate(t){
                let date = new Date(t);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDay();
                month =(month<10 ? "0"+month:month);
                day =(day<10 ? "0"+day:day);
                let mydate = year.toString()+'/'+month.toString()+'/'+day.toString();
                return mydate
            },
            handleNav(index){
                this.navActive = index;
            },
            handleCurrentChange1(page){
                this.getData1(page)
            },
            handleCurrentChange2(page){
                this.getData2(page)
            },
            handleCurrentChange3(page){
                this.getData3(page)
            },
            handleCurrentChange4(page){
                this.getData4(page)
            },
            handleCurrentChange5(page){
                this.getData5(page)
            },
            handleCurrentChange6(page){
                this.getData6(page)
            },
            handleCurrentChange7(page){
                this.getData7(page)
            },
            jump(contentId){
                this.$router.push({
                    path:`/list/${this.navActive}/pageListId/${this.pageListId}/contentId/${contentId}`
                })
            },
            jump1(s){
                this.$router.push({
                    path:s
                })
            },
            winOpen(val){
                window.open(val)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;

    .head{
        width: 100%;
        box-sizing: border-box;
        height:40px;
        background:rgba(56,65,90,1);
        padding: 0 20px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        color:rgba(255,255,255,1);
    a{
        margin: 0 5px;
        display: inline-block;
        color: white;
    &:first-child:after{
         height: 100%;
         width: 2px;
         content: '';
         margin-left: 10px;
         border-right: 1px solid rgba(255,255,255,1);
     }
    }
    }
    .nav{
        width: 100%;
        height:96px;
        background:rgba(255,255,255,1);
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
    >div{
        display: flex;
        align-items: center;
    img{
        width:234px;
        height: 108px;
        margin-right: 5px;
    }
    .navActive{
        background-color: #0082CA;
        color:#FFFFFF!important;
    }
    .navActive3{
        background-color: #19C0C2;
        color:#FFFFFF!important;
    }
    .navActive4{
        background-color: #11BA94;
        color:#FFFFFF!important;
    }
    .navActive5{
        background-color: #7B4AD6;
        color:#FFFFFF!important;
    }
    a{
        display: flex;
        align-items: center;
        justify-content: center;
        width:138px;
        height:100%;
        text-align: center;
        line-height: 100px;
        font-weight:bold;
        color:rgba(27,27,27,1);
        font-size: 20px;
    img{
        width: 22px;
        height: 22px;
        margin-right: 5px;
    }
    }
    button{
        width:54px;
        height:30px;
        border:1px solid rgba(50,170,252,1);
        background-color: white;
        display: block;
    &:last-child{
         margin-left: 7px;
     }
    }
    }
    }
    }
    .dreamwork {
        border-top: 1px solid #efefef;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 0;
        background-color: white;
        > .news {
            width: 1300px;
            margin: 0 auto;
            >p{
                font-size: 26px;
                padding: 20px 20px;
                border-bottom: 1px solid #e1e1e1;
                margin-bottom: 25px;
            }
            >div{
                width:100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                background-color: white;
                >a{
                    display: flex;
                    width: 630px;
                    background-color: white;
                    padding: 12px 10px 15px 0;
                    box-sizing: border-box;
                    height: 150px;
                    border-bottom: 1px solid #e1e1e1;
                    >img{
                        width: 220px;
                        height: 100%;
                    }
                    >div{
                        padding: 0px 20px 10px 20px;
                        >p{
                            font-weight:400;
                            color:rgba(51,51,51,1);
                            height: 98px;
                            line-height: 25px;
                        }
                        >span{
                            font-size: 16px;
                            color:rgba(153,153,153,1);
                        }
                    }
                }
            }
        }
    }
    .dreamwork1 {
        border-top: 1px solid #efefef;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 0;
        background-color: white;
        > .news {
            width: 1300px;
            margin: 0 auto;
            >p{
                font-size: 26px;
                padding: 20px 20px;
                border-bottom: 1px solid #e1e1e1;
                margin-bottom: 25px;
            }
            >div{
                width:100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                background-color: white;
                >a{
                    display: flex;
                    width: 630px;
                    background-color: white;
                    padding:15px 30px 15px 10px;
                    box-sizing: border-box;
                    height: 212px;
                    box-shadow:0px 3px 10px 0px rgba(96,122,252,0.1);
                    justify-content: space-between;
                    margin-top: 20px;
                    >img{
                        width: 140px;
                        height: 176px;
                    }
                    >div{
                        padding: 0px 20px 10px 20px;
                        width: 310px;
                        >p{
                            font-weight:400;
                            color:#000000;
                            /*line-height: 25px;*/
                            font-size: 24px;
                            margin: 10px 0 ;
                        }
                        >span:nth-child(2){
                            font-size: 18px;
                            color:#999999;
                        }
                        >span:nth-child(3){
                            display: block;
                            font-size: 16px;
                            color:#333333;
                            margin-top: 18px;
                            line-height: 26px;
                        }
                    }
                }
            }
        }
    }
    .dreamwork2 {
        border-top: 1px solid #efefef;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 0;
        background-color: white;
        > .news {
            width: 1300px;
            margin: 0 auto;
            >p{
                font-size: 26px;
                padding: 20px 20px;
                border-bottom: 1px solid #e1e1e1;
                margin-bottom: 25px;
            }
            >div{
                width:100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                background-color: white;
                >a{
                    display: flex;
                    width: 100%;
                    background-color: white;
                    padding:35px 0;
                    box-sizing: border-box;
                    justify-content: space-between;
                    border-bottom: 1px solid #f1f1f1;
                    >p{
                        font-size:16px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                    }
                    >span{
                        font-size:16px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                }
            }
        }
    }
    .el-pagination{
        margin: 35px auto;
    }
</style>