<template>
    <div>
        <p class="p1">我的项目</p>
        <p style="margin-top: 20px;text-align: center" v-if="res.length == 0">暂未有所属项目！</p>
        <a v-if="res.length > 0" class="mc-content-head clear" @click="jump(item.id)" v-for="item in res">
            <div class="floatLeft">
                <img :src="item.imgAddress">
                <span class="team_type color_yellow">创业项目</span>
            </div>
            <div class="mc-content-head_right">
                <p><span class="organize_titie">{{item.teamName}}
                    <strong style="font-size: 14px; margin-left: 13px; font-weight: lighter;position: absolute; right: 7px;">【{{item.userIdCreate == user? "自建项目":"参与项目"}}】</strong></span>
                </p>

                <p><span>负责人：{{item.userNameCreate}}</span>

                </p>
                <p style="width: 690px;line-height: 22px; height: 45px;"><span>工坊简介：</span><span>{{item.description}}</span></p>
                <!-- 当权限为工坊管理员时，显示此图标-->
                <a  @click="dialogVisible = true" class="if_admin btn-type-1 btn-type-blue"><span style="color: white;">评价</span></a>
                <!-- 获取当前用户是否为此工坊的负责人 是否显示工坊管理的图标-->
            </div>
        </a>
<!--        <a class="mc-content-head clear">-->
<!--            <div class="floatLeft">-->
<!--                <img src="../../assets/images/123.png">-->
<!--                <span class="team_type color_yellow">创业工坊</span>-->
<!--            </div>-->
<!--            <div class="mc-content-head_right">-->
<!--                <p><span class="organize_titie">1+1家教服务平台</span>-->
<!--                </p>-->

<!--                <p><span>负责人：</span>-->

<!--                </p>-->
<!--                <p><span>公司全称：</span><span>无</span></p>-->
<!--                &lt;!&ndash; 当权限为工坊管理员时，显示此图标&ndash;&gt;-->
<!--                <a  @click="dialogVisible = true" class="if_admin btn-type-1 btn-type-blue"><span style="color: white;">评价</span></a>-->
<!--                &lt;!&ndash; 获取当前用户是否为此工坊的负责人 是否显示工坊管理的图标&ndash;&gt;-->
<!--            </div>-->
<!--        </a>-->
<!--        <a class="mc-content-head clear">-->
<!--            <div class="floatLeft">-->
<!--                <img src="../../assets/images/123.png">-->
<!--                <span class="team_type color_yellow">创业工坊</span>-->
<!--            </div>-->
<!--            <div class="mc-content-head_right">-->
<!--                <p><span class="organize_titie">1+1家教服务平台</span>-->
<!--                </p>-->

<!--                <p><span>负责人：</span>-->

<!--                </p>-->
<!--                <p><span>公司全称：</span><span>无</span></p>-->
<!--                &lt;!&ndash; 当权限为工坊管理员时，显示此图标&ndash;&gt;-->
<!--                <a  @click="dialogVisible = true" class="if_admin btn-type-1 btn-type-blue"><span style="color: white;">评价</span></a>-->
<!--                &lt;!&ndash; 获取当前用户是否为此工坊的负责人 是否显示工坊管理的图标&ndash;&gt;-->
<!--            </div>-->
<!--        </a>-->
    </div>
</template>

<script>
    export default {
        name: "belongPro",
        data(){
            return {
                user:null,
                res:[],
            }
        },
        mounted() {
            this.user = this.$store.state.user.userId;
            this.getData();
        },
        methods:{
            getData(){
                let s = '/teamproject/belongproject';
                // if(this.$store.state.user.role == 2){
                //     s = '/teamproject/student/studentteam'
                // }else if(this.$store.state.user.role == 3){
                //     s = '/teamproject/teacher/teacherteam'
                // }
                this.axios.post(s,{
                    userId:this.$store.state.user.userId
                }).then(res => {
                    this.res = res.data.data.myCreateTeam.concat(res.data.data.myJoinTeam)
                })
            },
            jump(id){
                this.$router.push({path:`/index/proDetail/${id}`})
            }
        }
    }
</script>

<style scoped>
    .p1{
        display: inline-block;
        /*width:95px;*/
        height: 22px;
        font-size: 24px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 2px 0 20px 5px;
    }
    .wrap{
        padding: 0px 10px 13px 10px;
        border-bottom: solid 1px #d3dce6;
    }
    .mc-content-head{
        position: relative;
        border: 1px solid gainsboro;
        padding: 20px 15px;
        display: flex;
    }
    #mc-content .content.tab-content{
        padding-top: 15px;
    }
    .mc-content-head .floatLeft{
        width: 195px;
        height: 130px;
        background: #ccc;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
    }
    .mc-content-head .floatLeft>img{
        width: 100%;
        height: 100%;
    }
    .mc-content-head_right{
        padding-top: 5px   ;
    }
    .mc-content-head_right>p:not(.team_summary){
        height: 33px;
        /*line-height: 33px;*/
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

    }
    .mc-content-head_right .if_admin{
        position: absolute;
        top: 0px;
        right: 0px;
        color: #2F9DEA;
    }
    .mc-content-head_right .if_admin>i{
        font-size: 20px;
    }
    .mc-content-head_right>p>span{
        font-size: 16px;
    }
    .mc-content-head_right .organize_titie{
        font-weight: bold;
    }
    .mc-content-head_right .official_website{
        padding: 0 3px;
        color: #fff;
        background: #2F9DEA;
        text-decoration: none;
    }
    .mc-content-head_right .authentication{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(../../assets/images/icon/bg-team.png) -250px 0 no-repeat;
        vertical-align: middle;
        margin: 0 5px;
    }
    .clear {
        zoom: 1;
    }
    #mc-content {
        padding: 40px 30px 0px;
    }
    #mc-content {
        min-height: 150px;
    }
    .team_type {
        position: absolute;
        top: 15px;
        left: -24px;
        color: #fff;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        width: 100px;
        text-align: center;
    }
    .color_yellow {
        background: #F7BE11;
        color: #fff;
    }
</style>