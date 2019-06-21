<template>
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
        <div class="content">
           <div>
               <p><img src="../assets/images/back.png" @click="jump"></p>
               <div>
                   <h1>{{title}}</h1>
                   <div v-html="content">
                      {{content}}
                   </div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "listDetail",
        data(){
            return {
                navActive:1,
                title:null,
                content:null
            }
        },
        mounted() {
           this.navActive = this.$route.params.id;
           this.axios({
               baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
               url:'/portal/contentpage',
               method: 'post',
               data:{
                   userId:this.$store.state.user.userId,
                   pageListId:this.$route.params.pageListId,
                   contentId:this.$route.params.contentId
               }
           }).then(res => {
               console.log(res.data);
               this.title = res.data.data.infoMap.contentPageInfo[0].title;
               this.content = res.data.data.infoMap.contentPageInfo[0].content;
           })
        },
        methods:{
            handleNav(index){
                this.navActive = index;
                this.$router.push({
                    path:`/list/${index}`
                })
            },
            jump(){
                this.$router.push({
                    path:`/list/${this.navActive}`
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
                    height: 108px;;
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
    .content{
        width: 100%;
        >div{
            margin: 0 auto;
            width: 1300px;
            padding-top: 30px;
            >p>img{
                width: 34px;
                height: 28px;
                cursor: pointer;
            }
            >div{
                margin-top: 40px;
                >h1{
                    text-align: left;
                    margin: 24px 40px ;
                    font-weight: bold;
                    font-size: 26px;
                    border-bottom: 1px solid #e8e8e8;
                    padding-bottom: 20px;
                }
                >div{
                    text-align: left;
                    margin: 24px 40px ;
                    font-size: 20px;
                    padding-bottom: 20px;
                }
            }
        }
    }
</style>