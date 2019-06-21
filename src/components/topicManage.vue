<template>
    <div class="Right_Content">
        <p>课题管理</p>
        <a @click="dialogVisible =true">添加课程</a>
        <div class="Right_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="当前" name="first"><table class="main_table">
                    <tr>
                        <th>序号</th>
                        <th>名称</th>
                        <th>所属工坊</th>
                        <th>创建日期</th>
                        <th>负责人</th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>编程技术学习<span class="updata">有更新</span></td>
                        <td>创新创业工坊</td>
                        <td>2019/01/12 20:20</td>
                        <td>负责人</td>
                        <td><a class="modify" @click="dialogTimelineVisible =true">修改</a><a class="poit">里程碑</a><a class="del">删除</a></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>编程技术学习</td>
                        <td>创新创业工坊</td>
                        <td>2019/01/12 20:20</td>
                        <td>负责人</td>
                        <td><a class="modify">修改</a><a class="poit">里程碑</a><a class="del">删除</a></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>编程技术学习</td>
                        <td>创新创业工坊</td>
                        <td>2019/01/12 20:20</td>
                        <td>负责人</td>
                        <td><a class="modify">修改</a><a class="poit">里程碑</a><a class="del">删除</a></td>
                    </tr>
                </table>
                </el-tab-pane>
                <el-tab-pane label="已结束" name="second"></el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="添加课题" :visible.sync="dialogVisible" width="40%">
            <div class="add">
                <div>
                    <p>课题名称：<input placeholder="初识计算机语言"></p>
                    <p>所属工坊：<input placeholder="Python基础知识讲解"></p>
                    <p>负责人：<select>
                        <option>111</option>
                        <option>222</option>
                        <option>333</option>
                    </select></p>
                    <p style="display: flex;line-height: 30px">课题封面：<el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload></p>
                    <p>课程简介：<textarea></textarea></p>
                    <p>课题目的：<input></p>
                    <p>课题目标：<input></p>
                    <a><span>上传</span></a>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogTimelineVisible" width="40%">
            <div class="emitTimeline">
                <div>
                    <a>编辑里程碑</a>
                    <a style="color:rgba(50,170,252,1);">修改里程碑</a>
                </div>
                <div class="emitMain">
                    <label>里程碑1
                        <el-date-picker
                                style="width: 140px"
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                        <input type="text" class="cont" placeholder="第一次课题任务">
                        <a class="delete">删除</a>
                    </label>
                    <label>里程碑1
                        <el-date-picker
                                style="width: 140px"
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                        <input type="text" class="cont" placeholder="第一次课题任务">
                        <a class="delete">删除</a>
                    </label>
                </div>
                <div>
                    <a class="up">上传</a>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "topicManage",
        data(){
          return {
              dialogVisible:false,
              dialogTimelineVisible:false
          }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>
    .Right_Content{
        padding-top: 5px;
    }
    .Right_Content>p {
        display: inline-block;
        /*width:95px;*/
        height: 22px;
        font-size: 24px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
    }
    .Right_main {
        width: 100%;
        height: 878px;
        background: rgba(255, 255, 255, 1);
        margin-top: 25px;
    }

    .Right_Content>a {
        display: inline-block;
        width: 112px;
        height: 36px;
        background: rgba(47, 157, 234, 1);
        border-radius: 3px;
        position: absolute;
        right: 0;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: center;
        line-height: 36px;
    }

    .Right_main {
        padding: 20px;
    }

    .main_a_normal {
        display: inline-block;
        width: 98px;
        height: 36px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(241, 241, 241, 1);
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        text-align: center;
        line-height: 36px;
        border-bottom: none;
    }

    .Right_main>a:first-child {
        border-right: none;
    }

    .main_a_active {
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid rgba(241, 241, 241, 1);
    }

    .main_table {
        width: 940px;
        background: rgba(255, 255, 255, 1);
        /*border: 1px solid rgba(241, 241, 241, 1);*/
        position: relative;
        top: -1px;
    }

    .main_table {
        text-indent: 10px;
    }

    .main_table th {
        height: 40px;
        font-size: 14px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: left;
    }

    .main_table td {
        height: 50px;
        font-size: 14px;
        font-family: PingFang-SC-Bold;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
    }

    .main_table th:nth-child(1),
    .main_table td:nth-child(1) {
        width: 7%;
        text-indent: 15px;
    }

    .main_table th:nth-child(2),
    .main_table td:nth-child(2) {
        width: 23%;
    }

    .main_table td:nth-child(2) {
        color: rgba(47, 157, 234, 1);
    }

    .main_table th:nth-child(3),
    .main_table td:nth-child(3) {
        width: 19%;
    }

    .main_table th:nth-child(4),
    .main_table td:nth-child(4) {
        width: 19%;
    }

    .main_table th:nth-child(5),
    .main_table td:nth-child(5) {
        width: 11%;
    }

    .main_table th:nth-child(6),
    .main_table td:nth-child(6) {
        width: 23%;
    }

    .updata {
        display: inline;
        width: 46px;
        padding: 2px 4px;
        margin-left: 3px;
        /*height:20px;*/
        background: rgba(255, 133, 133, 1);
        box-shadow: 0px 3px 2px 0px rgba(255, 133, 133, 0.24);
        border-radius: 3px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    .modify {
        color: rgba(47, 157, 234, 1);
        margin-right: 12px;
    }

    .poit {
        color: rgba(26, 186, 67, 1);
    }

    .del {
        color: rgba(234, 69, 69, 1);
        margin-left: 12px;
    }
    .delete{
        color:rgba(234,69,69,1)!important;
    }
    .mask {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        z-index: 999;
    }
    .add{
        margin-top: -40px;
    }
    .add>div {
        padding: 20px 36px;
    }

    .add input,
    select,
    textarea {
        width: 280px;
        height: 36px;
        padding-left: 10px;
        border: solid 1px #d7dde4;
        border-radius: 4px;
        display: inline-block;
    }

    .add select {
        margin-left: 14px;
    }

    .add textarea {
        height: 124px;
        vertical-align: middle;
        padding: 5px;
    }

    .add>div>p {
        margin: 14px 0;
    }

    .upload {
        display: inline-block;
        width: 100px;
        height: 60px;
        border: 1px dashed rgba(43, 169, 255, 1);
        border-radius: 3px;
        vertical-align: middle;
        text-align: center;
        line-height: 60px;
        color: rgba(43, 169, 255, 1);
        margin-top: -52px;
        margin-left: 72px;
    }
    #myFile{
        position: relative;
        top: 0px;
        left: 77px;
        opacity: 0;
    }
    .add>div>a {
        display: block;
        width: 353px;
        height: 36px;
        background: rgba(50, 170, 252, 1);
        border-radius: 3px;
        margin: 10px auto;
        color: white;
        line-height: 36px;
        text-align: center;
    }

    .Right_Content>p {
        display: inline-block;
        /*width:95px;*/
        height: 22px;
        font-size: 24px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
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
        /*margin: 286px auto;*/
        /*width: 610px;*/
        /*height: 384px;*/
        border-radius: 3px;
        padding-bottom: 30px;
        /*display: inline-block;*/
        box-sizing: border-box;
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
        /*border: 1px solid rgba(241, 241, 241, 1);*/
        padding: 16px 40px 16px 15px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin-top: -55px;
    }
    .emitMain{
        padding: 20px 10px 30px 20px ;
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
        width: 198px;
        height: 30px;
        border: 1px solid rgba(238,236,237,1);
        border-radius: 6px;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(102,102,102,1);
        margin-left: 8px;
        margin-right: 9px;
        padding-left: 10px;
    }
    .up{
        display: block !important;
        width:388px;
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