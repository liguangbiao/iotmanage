<template>
    <div class="Right_Content">
        <p><a style="font-size: 20px">课题任务</a><span> > 任务详情 </span></p>
        <div class="Right_main">
            <div class="myTask">
                <img src="../assets/images/123.png">
                <div>
                    <p>编程技术学习</p>
                    <span>开始时间：2019/05/25</span><br>
                    <span>负责人：负责人</span><br>
                    <span>课题简介：<p>课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介课题简介</p></span>
                </div>
            </div>
            <div class="timeLine">
                <p>里程碑</p>
                <div>
                    <ul class="time-vertical">
                        <li><b class="bnoactive">07/02</b><span class="nobef"></span><span class="snormal snonormal">·</span><a href="javascript:void(0)" class="nonormal">正价F2E前端导航</a></li>
                        <li><b class="bactive">07/02</b><span class="bef befactive"></span><span class=" snormal sactive">·</span><a href="javascript:void(0)" class="active normal">正价F2E前端导航</a><span class="detail" @click="dialogTimelineVisible = true">查看详情</span></li>
                        <li><b class="">07/02</b><span class="bef"></span><span class="snormal">·</span><a href="javascript:void(0)" class="normal">正价F2E前端导航</a></li>
                        <li><b>07/02</b><span class="bef"></span><span class="snormal">·</span><a href="javascript:void(0)" class="normal">正价F2E前端导航</a></li>
                        <li><b>07/02</b><span class="bef"></span><span class="snormal">·</span><a href="javascript:void(0)" class="normal">正价F2E前端导航</a></li>
                        <li><b>07/02</b><span class="bef"></span><span class="snormal">·</span><a href="javascript:void(0)" class="normal">正价F2E前端导航</a></li>
                        <li><b>07/02</b><span class="bef"></span><span class="snormal">·</span><a href="javascript:void(0)" class="normal">正价F2E前端导航</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <el-dialog title="更新里程碑" :visible.sync="dialogTimelineVisible" width="32%">
            <div class="updata">
                <p>更新里程碑</p>
                <textarea></textarea>
                <div class="fujian" style="margin-top: 12px;padding-top: 2px;background-color: white">
                    <span>前端静态页面代码（3.4m）.zip<a>删除</a></span>
                    <span>前端静态页面代码（3.4m）.zip<a>删除</a></span>
                    <span>前端静态页面代码（3.4m）.zip<a>删除</a></span>
                    <input type="file" id="myFile" onchange="getFile()">
                    <span class="upload">上传封面</span>
                    <a class="submit">提交</a>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "topicDetail",
        data(){
            return {
                dialogTimelineVisible:false,
            }
        },
    }
</script>

<style scoped>
    .Right_Content>p{
        display: inline-block;
        /*width:95px;*/
        height: 22px;
        font-size: 16px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
    }
    .Right_main {
        width: 100%;
        height: 878px;
        background: rgba(255, 255, 255, 1);
        margin-top: 25px;
        padding: 20px;
    }
    .myTask>img{
        width:224px;
        height:150px;
        vertical-align: top;
    }
    .myTask>div{
        width: 716px;
        display: inline-block;
        margin-left: 20px;
    }
    .myTask>div>p:first-child{
        font-size:16px;
        font-weight:bold;
        color:rgba(51,51,51,1);
        margin-top:20px ;
    }
    .myTask>div>span{
        display: inline-block;
        font-size:14px;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-top: 13px;
    }
    .myTask>div>span:last-child>p{
        display: inline-block;
        width: 640px;
        vertical-align: text-top;
        line-height: 19px;
    }
    .timeLine{
        width: 100%;
        margin-top: 40px;
    }
    .timeLine>p{
        display: block;
        padding: 20px 0;
        border-top: 1px solid rgba(241, 241, 241, 1);
        border-bottom: 1px solid rgba(241, 241, 241, 1);
        font-size:16px;
        font-weight:bold;
        color:rgba(153,153,153,1);
    }
    /*纵向时间轴*/
    .time-vertical {
        list-style-type: none;
        border-left: 3px solid rgba(228,228,228,1);
        padding: 0px;
        /*height: 400px;*/
        font-size: 16px;
        margin-left: 80px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-top: 15px;
    }

    .time-vertical li {
        height: 65px;
        position: relative;
        top: 40px;
    }
    .nonormal {
        display: inline-block;
        /*margin-left: 20px;*/
        margin-top: 15px;
        text-decoration: none;
        color: #000;
        font-size: 16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .normal {
        display: inline-block;
        /*margin-left: 20px;*/
        margin-top: 15px;
        text-decoration: none;
        color: #000;
        font-size: 16px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(73,154,255,0.6);
    }

    .time-vertical li b{
        position: relative;
        left: -80px;
        color:rgba(73,154,255,0.6);
    }
    .bactive{
        font-size:18px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(73,154,255,1)!important;
        text-shadow:0px 3px 2px rgba(73,154,255,0.24);
    }
    .bnoactive{
        font-size:16px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color: rgba(153,153,153,1)!important;
        /*text-shadow:0px 3px 2px rgba(153,153,153,1);*/
    }
    .nobef{
        border: 2px solid rgba(153,153,153,1);
        box-shadow:0px 2px 2px 0px rgba(153,153,153,1);
        content: '';
        position: absolute;
        top: 15px;
        left: -9px;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        /*background: rgba(73,154,255,1);*/
        background: white;
    }
    .bef {
        /*.time-vertical li b:before {*/
        content: '';
        position: absolute;
        top: 15px;
        left: -9px;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        /*background: rgba(73,154,255,1);*/
        background: white;
        border: 2px solid rgba(73,154,255,0.6);
        box-shadow:0px 2px 2px 0px rgba(73,154,255,0.6);
        /*border: 2px solid rgba(73,154,255,1);*/
        /*box-shadow:0px 3px 2px 0px rgba(73,154,255,0.24);*/
    }
    .befactive{
        border: 2px solid rgba(73,154,255,1);
        box-shadow:0px 3px 2px 0px rgba(73,154,255,0.24);
    }
    .snonormal{
        color: rgba(153,153,153,1)!important;
    }
    .snormal {
        position: absolute;
        /*color: rgba(153,153,153,1);*/
        color: rgba(73,154,255,0.6);
        /*color: rgba(73,154,255,1);*/
        top: 18px;
        left: -5.5px;
        font-size: 33px;
        line-height: 5px;
    }
    .sactive{
        color: rgba(73,154,255,1);
    }
    .active{
        font-size:18px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(73,154,255,1);
        text-shadow:0px 3px 2px rgba(73,154,255,0.24);
    }
    .detail{
        display: inline-block;
        padding: 3px 5px;
        color: rgba(255,255,255,1);
        text-align: center;
        background:rgba(73,154,255,1);
        border-radius:3px;
        font-size: 14px;
        margin-left: 15px;
    }
    .mask {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 999;
    }

    .add {
        margin: 286px auto;
        background-color: white;
        width: 401px;
        /*height: 465px;*/
        box-sizing: border-box;
    }

    .add>p{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        margin: 45px;
    }
    .fujian{
        width: 100%;
        background:rgba(249,251,249,1);
        padding-bottom: 20px;
    }
    .fujian>p{
        display: inline-block;
        margin: 12px 45px 2px 45px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:22px;
    }
    .fujian>span{
        display: block;
        margin: 10px 45px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .fujian>span>a{
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(50,170,252,1);
        margin-left: 5px;
    }
    .add>div:last-child{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 40px 95px;
    }
    .add>div:last-child>a:first-child{
        border:1px solid rgba(241,241,241,1);
        background: white;
        color:rgba(153,153,153,1);
    }
    .add>div:last-child>a{
        display: inline-block;
        width: 64px;
        height: 32px;
        background:rgba(50,170,252,1);
        border-radius:3px;
        color: white;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 32px;
    }
    .updata{
        /*margin: 286px auto;*/
        background-color: white;
        /*width: 388px;*/
        /*height: 465px;*/
        box-sizing: border-box;
        margin-top: -50px;
    }
    .updata>p{
        display: inline-block;
        margin: 34px 45px 6px 45px;
        font-size: 16px;
    }
    .updata>textarea{
        width: 300px;
        height: 120px;
        margin: 6px 45px;
        box-sizing: border-box;
        padding: 10px;
    }
    .upload {
        display: inline-block;
        width: 300px;
        height: 32px;
        border: 1px dashed rgba(43, 169, 255, 1);
        border-radius: 3px;
        vertical-align: middle;
        text-align: center;
        line-height: 32px;
        color: rgba(43, 169, 255, 1)!important;
        box-sizing: border-box;
        margin-top: -20px!important;

    }
    .submit{
        display: inline-block;
        width: 300px;
        height:32px;
        background:rgba(50,170,252,1);
        border-radius:3px;
        text-align: center;
        line-height: 32px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-left: 45px;
        margin-top: 8px;
    }
    #myFile{
        position: relative;
        top: 8px;
        left: 157px;
        opacity: 0;
    }

</style>