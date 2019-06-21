<template>
    <div>
        <div class="wrap">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/index/innovativeTeam' }">工坊</el-breadcrumb-item>
                <el-breadcrumb-item>创建创业工坊</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
<!--            <p>工坊类别</p>-->
<!--            <el-radio-group v-model="radio" size="small" v-if="type.data" style="margin-left: 30px">-->
<!--                <el-radio v-for="item in type.data" :label="item.id" border>{{item.devDegreeName}}</el-radio>-->
<!--            </el-radio-group>-->
<!--            <el-button type="primary" style="margin-left: 30px">创新工坊</el-button>-->
            <p>工坊名称</p>
            <el-input placeholder="请输入内容" class="wid" v-model="teamName"></el-input>
            <p>工坊创建时间</p>
            <div class="wid">
                <el-date-picker
                        style="width: 350px"
                        v-model="time"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <p>工坊图片</p>
            <div class="wid">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <p>行业领域</p>
            <el-select v-model="value" placeholder="请选择" class="wid">
                <el-option
                        v-for="item in options.data"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id">
                </el-option>
            </el-select>
            <p>简介</p>
            <el-input
                    style="width: 450px"
                    class="wid"
                    type="textarea"
                    :rows="4"
                    placeholder="200字以内，介绍工坊业务/定位，请勿有公司名称"
                    v-model="description">
            </el-input>
            <span style="display: block;margin: 20px 0 10px 25px">详解介绍</span>
            <div>
                <el-card style="height: 210px; width: 672px;margin-left: 28px;">
                    <quill-editor v-model="content" ref="myQuillEditor" style="height: 108px;" :options="editorOption">
                    </quill-editor>
                </el-card>
            </div>
            <p>职务设置</p>
            <div>
                <div class="flex">
                    <el-button type="primary" size="small">批量删除</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="dialogDutyVisible =true">添加职务</el-button></div>
                <div class="view">
                </div>
            </div>
            <p>指导老师</p>
            <div>
               <div class="flex">
                   <el-button type="primary" size="small">批量删除</el-button>
                   <el-button type="primary" size="small" icon="el-icon-edit" @click="dialogTeacherVisible =true">添加老师</el-button></div>
                <div class="view">
                </div>
            </div>
            <p>工坊成员</p>
            <div>
                <div class="flex">
                    <el-button type="primary" size="small">批量删除</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit">添加成员</el-button></div>
                <div class="view">
                </div>
            </div>
            <div style="padding: 25px 20px">
                <el-button type="primary">发布</el-button>
                <el-button plain>保存草稿</el-button>
                <el-button plain>取消</el-button>
            </div>
        </div>
        <el-dialog title="增加指导老师" :visible.sync="dialogTeacherVisible">
            <el-input
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search">
            </el-input>
            <div class="dialogflex">
                <div>
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
                <div class="list">
                    <div>
                        <el-checkbox>
                            <img src="../assets/images/icon/cxsy-syx.png">李某某
                        </el-checkbox>
                    </div>
                    <div>
                    <el-checkbox>
                        <img src="../assets/images/icon/cxsy-syx.png">李某某
                    </el-checkbox>
                    </div>
                </div>
            </div>
            <div>
                <p>已选</p>
                <div class="list1">
                    <el-tag
                            style="margin-right: 15px"
                            v-for="tag in tags"
                            :key="tag.name"
                            closable
                            :type="tag.type">
                        {{tag.name}}
                    </el-tag>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTeacherVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTeacherVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="招聘职位编辑" :visible.sync="dialogDutyVisible">
            <div class="content con">
                <p>组织</p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <p>职位</p>
                <el-input placeholder="请输入内容" style="width: 400px"></el-input>
                <p>人数</p>
                <el-input placeholder="请输入内容" style="width: 400px"></el-input>
                <p>职位要求描述</p>
                <div>
                    <el-card style="height: 250px; width: 600px">
                        <quill-editor v-model="content" ref="myQuillEditor" style="height: 108px;" :options="editorOption">
                        </quill-editor>
                    </el-card>
                </div>
                <p>是否发布招聘&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-radio v-model="radio" label="1">是</el-radio>
                    <el-radio v-model="radio" label="2">否</el-radio></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDutyVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogDutyVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        name: "editPro",
        data(){
            return {
                radio:null,
                type:[],
                options: [],
                value: '',
                teamName:null,
                time:null,
                description:null,
                res:[],

                dialogTeacherVisible:true,
                dialogDutyVisible:false,
                data: [{
                    label: '飞瑞敖电子科技公司',
                    children: [{
                        label: '双创事业部',
                        children: [{
                            label: '再内部'
                        }]
                    }]
                },{
                    label: '飞瑞敖电子科技公司',
                    children: [{
                        label: '双创事业部',
                    }, {
                        label: '飞瑞敖电子科技公司',
                        children: [{
                            label: '飞瑞敖电子科技公司'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tags: [
                    { name: '标签一', type: '' },
                    { name: '标签一', type: '' },
                    { name: '标签一', type: '' },
                    { name: '标签一', type: '' },
                ]
            }
        },
        mounted(){
            this.axios.post('/teamproject/manage/addnewproject',{
                userId:this.$store.state.user.userId,
            }).then(res => {
                this.$set(this.type,'data',res.data.data.teamDevDegreeList);
                this.$set(this.options,'data',res.data.data.teamTypeList)
            })
            this.axios.post('/teamproject/manage/editaddproject',{
                userId:this.$store.state.user.userId,
                teamId:this.$route.params.id
            }).then(res => {
                this.teamName = res.data.data.teamBean.teamName;
                this.time = res.data.data.teamBean.startTime;
                this.description = res.data.data.teamBean.description;
                this.radio = res.data.data.teamBean.devDegreeId;
                this.value = res.data.data.teamBean.typeId;
            })
        },
        methods:{
            handleNodeClick(data) {
                console.log(data);
            }
        },
        components:{quillEditor}
    }
</script>

<style scoped>
    .wrap{
        padding: 0px 10px 13px 10px;
        border-bottom: solid 1px #d3dce6;
    }
    .content>p {
        margin: 30px 15px 10px 15px;
        display: block;
    }
    .content>p:before{
        position: relative;
        content: '*';
        top: 3px;
        color: #E85959;
        margin-right: 5px;
    }
    .wid{
        width: 350px;
        margin-left: 30px;
    }
    .flex{
        width: 800px;
        display: flex;
        margin-left: 20px;
        padding-right: 150px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .view{
        margin-left: 20px;
        width: 800px;
        height: 250px;
        padding: 10px;
        border: 1px solid #c4e5ff;
        margin-top: 10px;
        overflow: scroll;
    }
    .dialogflex{
        display: flex;
        justify-content: space-between;
    }
    .dialogflex>div {
        border: 1px solid #dedede;
        margin: 10px 0px;
        padding: 0px 10px;
        flex-grow: 1;
    }
    .dialogflex>div:first-child{
        margin-right: 20px;
        flex-grow: 0;
        padding: 10px 20px 10px 10px;
    }
    .list{
        display: flex;
        flex-direction: column;
    }
    .list>div{
        display: flex;
        align-items: center;
        margin: 10px;
    }
    .list img{
        border-radius: 50%;
        vertical-align: middle;
        margin: 0 10px;
        width: 44px;
        height: 44px;
    }
    .list1{
        border: 1px solid #dedede;
        margin: 10px 0;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
    }
    .con{
        margin-top: -30px;
    }
    .con p{
        margin-left: 0;
    }
</style>