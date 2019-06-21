<template>
    <div>
        <p class="p1">消息待办</p>
        <div style="background-color: white;padding: 10px">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="待办" name="first"></el-tab-pane>
                <el-tab-pane label="消息" name="second"></el-tab-pane>
            </el-tabs>
            <div style="padding: 0 10px">
                <div v-if='activeName == "first"' style="position: relative">
                    <el-tabs v-model="activeName1" @tab-click="handleClick1">
                        <el-tab-pane label="全部" name="first">
                            <div v-if="res.data">
                                <ul class="commission">
                                    <li @click="handleNews(item.processInstId)" class="unread clear"
                                        v-for="item in res.data.result">
                                        <div class="floatRight">{{item.timeStr}}</div>
                                        <a>
                                            <div class="circle_point">
                                                <p>{{item.processName}}</p>
                                                <p>{{item.summary}}</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="block">
                                    <el-pagination
                                            @current-change="handleCurrentChange1"
                                            :page-size="10"
                                            :pager-count="5"
                                            layout="total, prev, pager, next"
                                            :total="res.data.allRowNum">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="团队" name="second">
                            <div v-if="res.data">
                                <ul class="commission">
                                    <li @click="handleNews(item.processInstId)"  class="unread clear" v-for="item in res.data.result">
                                        <div class="floatRight">{{item.timeStr}}</div>
                                        <a>
                                            <div class="circle_point">
                                                <p>{{item.processName}}</p>
                                                <p>{{item.summary}}</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="block">
                                    <el-pagination
                                            @current-change="handleCurrentChange3"
                                            :page-size="10"
                                            :pager-count="5"
                                            layout="total, prev, pager, next"
                                            :total="res.data.allRowNum">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
<!--                        <el-tab-pane label="项目" name="third">-->
<!--                            <div v-if="res.data">-->
<!--                                <ul class="commission">-->
<!--                                    <li @click="handleNews(item.processInstId)"  class="unread clear" v-for="item in res.data.result">-->
<!--                                        <div class="floatRight">{{item.timeStr}}</div>-->
<!--                                        <a>-->
<!--                                            <div class="circle_point">-->
<!--                                                <p>{{item.processName}}</p>-->
<!--                                                <p>{{item.summary}}</p>-->
<!--                                            </div>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                                <div class="block">-->
<!--                                    <el-pagination-->
<!--                                            @current-change="handleCurrentChange5"-->
<!--                                            :page-size="10"-->
<!--                                            :pager-count="5"-->
<!--                                            layout="total, prev, pager, next"-->
<!--                                            :total="res.data.allRowNum">-->
<!--                                    </el-pagination>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </el-tab-pane>-->
                        <el-tab-pane label="设备" name="fourth">
                            <div v-if="res.data">
                                <ul class="commission">
                                    <li @click="handleNews(item.processInstId)"  class="unread clear" v-for="item in res.data.result">
                                        <div class="floatRight">{{item.timeStr}}</div>
                                        <a>
                                            <div class="circle_point">
                                                <p>{{item.processName}}</p>
                                                <p>{{item.summary}}</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="block">
                                    <el-pagination
                                            @current-change="handleCurrentChange6"
                                            :page-size="10"
                                            :pager-count="5"
                                            layout="total, prev, pager, next"
                                            :total="res.data.allRowNum">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <div class="news" style="position: absolute;top: 1px; right: 0;">
                        <el-radio v-model="read" label="true">已处理</el-radio>
                        <el-radio v-model="read" label="false">未处理</el-radio>
                    </div>
                </div>

                <div v-if='activeName == "second"'>
                    <div class="news">
                        <el-radio v-model="newsRead" label="true">已处理</el-radio>
                        <el-radio v-model="newsRead" label="false">未处理</el-radio>
                    </div>
                    <div v-if="newsData.data">
                        <ul class="commission">
                            <li class="unread" v-for="item in newsData.data.result">
                                <div class="floatRight">{{item.time}}</div>
                                <div class="infomation_poiot">
                                    <div class="floatLeft">
                                        <div class="form-cr">
                                            <el-checkbox class="myel" v-model="checked" :label="item.id"></el-checkbox>
                                        </div>
                                    </div>
                                    <a href="javaScript:;">{{item.content}}</a>
                                </div>
                            </li>
                        </ul>
                        <div style="padding: 20px 10px 3px 10px ">
                            <el-checkbox v-model="allchecked" @click="allchecked = !allchecked">全选</el-checkbox>
                            <el-button size="medium" @click="signRead">标记已读</el-button>
                            <el-button size="medium" @click="del">删除</el-button>
                        </div>
                    </div>
                    <div class="block">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :page-size="10"
                                :pager-count="5"
                                layout="total, prev, pager, next"
                                :total="newsData.data.allRowNum">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-if="resData.data" title="待办详情" :visible.sync="dialogDutyVisible" width="40%">
            <div class="dialog" v-for="item in resData.data">
                <p>{{item[0]}}：</p>
                <p>{{item[1]}}</p>
            </div>
            <div style="margin-top: 25px;margin-left: 10px">
                <el-radio v-model="handle" label="true">同意</el-radio>
                <el-radio v-model="handle" label="false">拒绝</el-radio>
            </div>
            <div style="margin-top: 15px">
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入备注内容"
                        v-model="textarea">
                </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDutyVisible = false">取 消</el-button>
                <el-button type="primary" @click="commit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "todoMsg",
        data() {
            return {
                activeName: 'first',
                activeName1: 'first',
                read: "false",
                newsRead: 'false',
                newsData: [],
                res: [],
                allchecked: false,
                dialogDutyVisible: true,
                handle: 'true',
                textarea: '',
                resData:[],
                processInstId:null,
                resourceId1:null,
                radio: 1,
                checked: [],

                currentPage1: 10,
            }
        },
        watch: {
            newsRead() {
                this.getNews(1);
            },
            read() {
                switch (this.activeName1) {
                    case "first":
                        this.getData1(1);
                        break
                    case "second":
                        this.getData3(1);
                        break
                    case "third":
                        this.getData5(1);
                        break
                    case "fourth":
                        this.getData6(1);
                        break
                }
            },
            allchecked() {
                if (this.allchecked) {
                    this.checked = [];
                    this.newsData.data.result.forEach(val => {
                        this.checked.push(val.id)
                    })
                } else {
                    this.checked = [];
                }
            }
        },
        mounted() {
            this.getData1(1);
            this.getNews(1);
        },
        methods: {
            //消息
            getNews(page) {
                this.axios.get('/message/list', {
                    params: {
                        read: this.newsRead,
                        page: page,
                        pageSize: 10
                    }
                }).then(res => {
                    this.$set(this.newsData, 'data', res.data.data)
                })
            },
            //待办全部
            getData1(page) {
                this.axios.get('/process/dealt/list', {
                    params: {
                        type: 0,
                        read: this.read,
                        page: page,
                        pageSize: 10
                    }
                }).then(res => {
                    this.$set(this.res, 'data', res.data.data)
                })
            },
            //待办工坊
            getData3(page) {
                this.axios.get('/process/dealt/list', {
                    params: {
                        type: 3,
                        read: this.read,
                        page: page,
                        pageSize: 20
                    }
                }).then(res => {
                    this.$set(this.res, 'data', res.data.data)
                })
            },
            //待办项目
            getData5(page) {
                this.axios.get('/process/dealt/list', {
                    params: {
                        type: 5,
                        read: this.read,
                        page: page,
                        pageSize: 20
                    }
                }).then(res => {
                    this.$set(this.res, 'data', res.data.data)
                })
            },
            //待办设备
            getData6(page) {
                this.axios.get('/process/dealt/list', {
                    params: {
                        type: 6,
                        read: this.read,
                        page: page,
                        pageSize: 20
                    }
                }).then(res => {
                    this.$set(this.res, 'data', res.data.data)
                })
            },
            handleCurrentChange(page) {
                this.getNews(page)
            },
            handleCurrentChange1(page) {
                this.getData1(page)
            },
            handleCurrentChange3(page) {
                this.getData3(page)
            },
            handleCurrentChange5(page) {
                this.getData5(page)
            },
            handleCurrentChange6(page) {
                this.getData6(page)
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            handleClick1() {
                switch (this.activeName1) {
                    case "first":
                        this.getData1(1);
                        break
                    case "second":
                        this.getData3(1);
                        break
                    case "third":
                        this.getData5(1);
                        break
                    case "fourth":
                        this.getData6(1);
                        break
                }
            },
            handleNews(val) {
                // let obj = {};
                // obj.processInstId = val;
                // obj.params = '';
                // let s =  JSON.stringify(obj);
                // console.log(s)
                this.processInstId = val;
                this.axios({
                    url: '/process/deal',
                    method: 'post',//Content-Type: application/json
                    headers: {'Content-Type': 'application/json'},
                    data: {
                        processInstId: val,
                        params: [{
                            key: "processuse",
                            value: "data"
                        }],
                    },
                    transformRequest: [function (data) {
                        data = JSON.stringify(data)
                        return data;
                    }],
                }).then(res => {
                    this.resourceId1 = res.data.data.resourceId1;
                    let arr1 = [];
                    let s = res.data.data.keyArray.join()
                    for(let item in res.data.data){
                        if(s.includes(item)){
                            let arr = [];
                            arr.push(item);
                            arr.push(res.data.data[item]);
                            arr1.push(arr)
                        }
                    }
                    this.$set(this.resData,'data',arr1)
                    this.dialogDutyVisible = true;
                })
            },
            signRead() {
                this.axios.post('/message/read', {
                    messageIds: this.checked.join(',')
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message('处理成功！', '', {
                            type: 'warning'
                        });
                        this.checked = [];
                        this.allchecked = false;
                        this.getNews(1);
                    }
                })
            },
            del() {
                this.axios.post('/message/delete', {
                    messageIds: this.checked.join(',')
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message('处理成功！', '', {
                            type: 'warning'
                        });
                        this.checked = [];
                        this.allchecked = false;
                        this.getNews(1);
                    }
                })
            },
            commit() {
                this.axios({
                    url: "/process/commit",
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    data: {
                        processInstId: this.processInstId,
                        params: [{
                            key:'resourceId1',
                            value:this.resourceId1
                        },{
                            key:'remark',
                            value:this.textarea
                        }],
                        agree: this.handle,
                        // userIdNext: null,
                        // userIdList: null,
                    },
                    transformRequest: [function (data) {
                        data = JSON.stringify(data)
                        return data;
                    }],
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message('处理成功！', '', {
                            type: 'warning'
                        });
                        this.dialogDutyVisible = false;
                        switch (this.activeName1) {
                            case "first":
                                this.getData1(1);
                                break
                            case "second":
                                this.getData3(1);
                                break
                            case "third":
                                this.getData5(1);
                                break
                            case "fourth":
                                this.getData6(1);
                                break
                        }
                    }

                })
            },
            handleSizeChange() {

            },
        }
    }
</script>

<style lang="scss" scoped>
    .dialog {
        display: flex;
        font-size: 15px;
        margin-bottom: 10px;

        > p:first-child {
            width: 100px;
        }
    }

    .p1 {
        display: block;
        padding: 10px 0 15px 10px;
        font-size: 19px;
        color: #333333;
    }

    .commission {
        min-height: 55px;
        font-size: 14px;
    }

    .commission > li {
        /*height: 55px;*/
        line-height: 55px;
        padding-right: 10px;
        border-bottom: 1px solid #E9F4FB;
        display: block;
    }

    .commission li:hover {
        cursor: pointer;
        background: #f3f9fd;
    }

    .commission li div.clear em {
        font-style: normal;
    }

    .commission li.unread > a {
        padding-right: 20px;
    }

    .commission li.unread .infomation_poiot {
        position: relative;
    }

    .commission li.unread .infomation_poiot:before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background: #FF6F6F;
        top: 23px;
        left: 30px;
    }

    .commission li div > a {
        overflow: hidden;
        display: block;
        color: #768087;
        text-decoration: none;
        text-indent: 25px;
    }

    #mc-content-tab-pane_2-1 .commission li > a > div {
        text-indent: 25px;
    }

    .commission .circle_point {
        padding: 10px 0;
    }

    .commission li.unread .infomation_poiot > a {
        /*font-weight: bold;*/
        color: #000;
    }

    .commission li.unread div.circle_point {
        position: relative;
    }

    .commission li.unread div.circle_point:before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background: #FF6F6F;
        top: 22px;
        left: 5px;
    }

    .commission li div.circle_point > p {
        line-height: 30px;
        padding-left: 25px;
    }

    .commission li div.floatRight {
        min-width: 140px;
    }

    .commission li > a {
        overflow: hidden;
        display: block;
        text-decoration: none;
        color: #000;
    }

    .commission .readed > a {
        color: #768087;
    }

    .commission li > a span {
        margin: 0 9px;
    }

    .commission li div.floatRight {
        min-width: 140px;
        /*float: right;*/
    }

    .block {
        margin-top: 10px;
    }

    .news {
        text-align: right;
        padding: 5px 20px 15px 0;
        border-bottom: 1px solid #E9F4FB;;
    }
</style>