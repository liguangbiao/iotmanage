<template>
    <div class="Right_Content">
        <p>课题任务</p>
        <div class="Right_main">
            <router-link class="Right_main_list" to="/topicDetail_student">
                <img src="../assets/images/123.png">
                <div>
                    <p>编程技术学习</p><br>
                    <span>开始时间：2019/05/29</span><br>
                    <span>负责任：第三方</span>
                </div>
            </router-link>
            <router-link class="Right_main_list" to="topicDetail_teacher">
                <img src="../assets/images/123.png">
                <div>
                    <p>编程技术学习</p><br>
                    <span>开始时间：2019/05/29</span><br>
                    <span>负责任：第三方</span>
                </div>
            </router-link>
            <a class="Right_main_list">
                <img src="../assets/images/123.png">
                <div>
                    <p>编程技术学习</p><br>
                    <span>开始时间：2019/05/29</span><br>
                    <span>负责任：第三方</span>
                </div>
            </a>
            <a class="Right_main_list">
                <img src="../assets/images/123.png">
                <div>
                    <p>编程技术学习</p><br>
                    <span>开始时间：2019/05/29</span><br>
                    <span>负责任：第三方</span>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "topicTask"
    }
</script>

<style scoped>
    .Right_Content>p {
        display: inline-block;
        /*width:95px;*/
        height: 22px;
        font-size: 24px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding-top: 5px;
    }

    .Right_main {
        width: 100%;
        height: 878px;
        background: rgba(255, 255, 255, 1);
        margin-top: 25px;
    }

    .Right_main_list {
        width: 460px;
        height: 152px;
        border: 1px solid rgba(241, 241, 241, 1);
        margin-top: 20px;
        margin-left: 20px;
        display: inline-block;
    }

    .Right_main_list>img {
        width: 224px;
        height: 150px;
        vertical-align: bottom;
    }

    .Right_main_list>div {
        display: inline-block;
        width: 236px;
        height: 100%;
    }

    .Right_main_list>div>p {
        display: inline-block;
        /*width:94px;*/
        height: 16px;
        font-size: 16px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-top: 20px;
        margin-left: 20px;
    }

    .Right_main_list>div>span {
        display: inline-block;
        /*width:150px;*/
        height: 14px;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-left: 20px;
        margin-top: 13px;
    }

    .Right_main_list>div>span:last-child {
        /*width:97px;*/
        height: 14px;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-left: 20px;
        margin-top: 15px;
    }
    .emitTimeline{
        background: white;
        margin: 286px auto;
        width: 610px;
        /*height: 384px;*/
        border-radius: 3px;
        padding-bottom: 30px;
        display: inline-block;
    }
    .emitTimeline a{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(102,102,102,1);
    }
    .emitTimeline>div:first-child{
        width: 100%;
        border: 1px solid rgba(241, 241, 241, 1);
        padding: 16px 40px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }
    .emitMain{
        padding: 20px 40px 30px 40px ;
    }
    .emitMain>label{
        display: inline-block;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-top: 13px;
    }
    .date{
        width:130px;
        height:36px;
        border:1px solid rgba(238,236,237,1);
        border-radius:3px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-left: 10px;
        padding-left: 7px;
        padding-right: 5px;
    }
    .cont{
        width:268px;
        height:36px;
        border:1px solid rgba(238,236,237,1);
        border-radius:3px;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        margin-left: -4px;
        margin-right: 2px;
        padding-left: 5px;
    }
    .up{
        display: block !important;
        width:528px;
        height:36px;
        background:rgba(50,170,252,1);
        border-radius:3px;
        margin: 0 auto;
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1)!important;
        text-align: center;
        line-height: 36px;
    }
    .iconrili{
        position: relative;
        left: -24px;
    }
    input[type=date]::-webkit-calendar-picker-indicator{
        z-index: 999;
        opacity:0;
    }
</style>