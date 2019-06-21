<template>
    <div>
        <div class="wrap">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/index/belongWorkshop' }">工坊</el-breadcrumb-item>
                <el-breadcrumb-item>工坊详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="mc-content">
            <div class="mc-content-head clear">
                <div class="floatLeft">
                    <img src="../assets/images/123.png">
                    <span class="team_type color_yellow">创业工坊</span>
                </div>
                <div class="mc-content-head_right">
                    <p><span class="organize_titie">1+1家教服务平台</span>
                    </p>
                    <div class="information _1">
                        <span>现代服务</span>
                        <span>已孵化</span>
                        <span>优秀工坊</span>
                    </div>
                    <p><span>负责人：</span>
                        <span>&nbsp;入驻场地：</span>
                    </p>
                    <p><span>公司全称：</span><span>无</span></p>
                    <p class="team_summary"><span>“1+1家教”目前是一个是在微信服务号衍生开发web 端app的家教服务平台，并凭借自身的制作能力和策划能力，励志打造成一个知名家教平台，创立独家家教品牌。平台服务对象为需要找家教的家长及想做家教的学生及教师。让教员，家长/学生能不再难以找到合适的家教，同时建立有效的教员成长体系和教学流程教学质量管控体系，对家教过程提供优质服务。解决找家教，做家教过程的痛点问题，将优秀大学生和一些机构老师的盈余时间有效利用起来，共享他们的知识能力，缓解k12教育好老师供应不足的问题。</span></p>
                    <!-- 当权限为工坊管理员时，显示此图标-->
                    <a  @click="dialogVisible = true" class="if_admin btn-type-1 btn-type-blue"><span style="color: white;">评价</span></a>
                    <!-- 获取当前用户是否为此工坊的负责人 是否显示工坊管理的图标-->
                </div>
            </div>
            <div style="margin-top: 50px">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="工坊介绍" name="first"><div>
                        <p>测试测试测试测试测试测试测试测试测试测试测试</p>
                    </div></el-tab-pane>
                    <el-tab-pane label="工坊成员" name="second"><div>
                        <ul class="team_leaguer">
                            <li>
                                <div class="leaguer_img floatLeft">
                                    <a href="JavaScript:">
                                        <img src="">
                                    </a>
                                </div>
                                <div class="overflow">
                                    <p><a href="JavaScript:">王佳林</a></p>
                                    <p><span class="root_power admin_people">工坊成员</span></p>
                                </div>
                            </li>
                        </ul>
                    </div></el-tab-pane>
                    <el-tab-pane label="工坊动态" name="third">工坊动态</el-tab-pane>
                    <el-tab-pane label="招聘信息" name="1">招聘信息</el-tab-pane>
                    <el-tab-pane label="工坊项目" name="2">工坊项目</el-tab-pane>
                    <el-tab-pane label="工坊事记" name="3"><div>
                        <div style="padding: 20px 50px">
                            <el-timeline>
                                <el-timeline-item
                                        v-for="(activity, index) in activities"
                                        :key="index"
                                        :icon="activity.icon"
                                        :type="activity.type"
                                        :color="activity.color"
                                        :size="activity.size"
                                        :timestamp="activity.timestamp">
                                    {{activity.content}}
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </div></el-tab-pane>
                    <el-tab-pane label="工坊成果" name="4">工坊成果</el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog title="等级设置" :visible.sync="dialogVisible">
            <div class="con">
                <p>组织</p>
                <div>
                    <el-radio label="1">备选项</el-radio>
                    <el-radio label="2">备选项</el-radio>
                    <el-radio label="2">备选项</el-radio>
                    <el-radio label="2">备选项</el-radio>
                    <el-radio label="2">备选项</el-radio>
                </div>
                <p>发展阶段</p>
                <div>
                    <el-radio label="1">备选项</el-radio>
                    <el-radio label="2">备选项</el-radio>
                    <el-radio label="2">备选项</el-radio>
                    <el-radio label="2">备选项</el-radio>
                    <el-radio label="2">备选项</el-radio>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "workshopDetail",
        data(){
            return {
                dialogVisible:true,
                activeName:'first',
                activities: [{
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                }, {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                }, {
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 20:46',
                    size: 'large'
                }, {
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 20:46'
                }]
            }
        }
    }
</script>

<style scoped>
    .wrap{
        padding: 0px 10px 13px 10px;
        border-bottom: solid 1px #d3dce6;
    }
    .mc-content-head{
        position: relative;
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
        /*position: absolute;
        left: 215px;
        right: 0;*/
        padding-left:215px;

    }
    .mc-content-head_right>p:not(.team_summary){
        height: 33px;
        /*line-height: 33px;*/
        vertical-align: middle;
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
        background: url(../assets/images/icon/bg-team.png) -250px 0 no-repeat;
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
    .information._1 > span {
        font-size: 12px;
        color: rgb(59, 73, 83);
        background-color: rgb(235, 236, 237);
        user-select: none;
        display: inline-block;
        line-height: 24px;
        height: 24px;
        margin: 0px 10px 10px 0px;
        padding: 0px 24px;
    }
    .mc-content-head_right .if_admin {
        position: absolute;
        top: 0px;
        right: 0px;
        color: rgb(47, 157, 234);
    }
    .btn-type-blue {
        color: #fff;
        background-color: #2F9DEA;
        border: solid 1px #2F9DEA;
        border-radius: 0;
    }
    .btn-type-1 {
        display: inline-block;
        width: 123px;
        height: 34px;
        line-height: 34px;
        text-align: center;
    }
    .team_leaguer{
        padding-top: 30px;
    }
    .team_leaguer li{
        /* 	display: inline-block;
         */	float:left;
        width: 300px;
        padding: 15px 20px 0 20px;
        height: 80px;
        border: 1px solid #e7e7e7;
        margin:0 18px 20px 0;
        float:left;
        color: #000;
    }
    .team_leaguer li:hover{
        -moz-box-shadow: 2px 2px 2px #ccc;
        -webkit-box-shadow: 2px 2px 2px #ccc;
        box-shadow: 2px 2px 2px #ccc;
    }
    .team_leaguer li .overflow{
        line-height: 24px;
    }
    .leaguer_img{
        margin-right: 16px;
    }
    .leaguer_img img{
        width: 50px;
        height: 50px;
        border: 1px solid #e7e7e7;
        border-radius: 25px;
    }
    .project-item{
        margin: 20px 18px 5px 0;
    }
    span.root_power.admin_people {
        color: rgb(255, 255, 255);
        background: rgb(75, 202, 136);
    }
    .con{
        margin-top: -30px;
    }
    .con>p {
        margin: 30px 15px 15px 0px;
        display: block;
    }
    .con>p:before{
        position: relative;
        content: '*';
        top: 3px;
        color: #E85959;
        margin-right: 5px;
    }
</style>