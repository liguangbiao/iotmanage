<template>
    <div>
        <div class="wrap">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/index/innovativeTeam' }">工坊</el-breadcrumb-item>
                <el-breadcrumb-item>创建工坊</el-breadcrumb-item>
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
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </div>
            <p>工坊图片</p>
            <div class="wid">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handle"
                        :file-list="fileList"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <p>行业领域</p>
            <el-select v-if="options.data" v-model="value" placeholder="请选择" class="wid">
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
                    v-model="textarea">
            </el-input>
            <span style="display: block;margin: 20px 0 10px 25px">详解介绍</span>
            <div>
                <el-card style="height: 210px; width: 672px;margin-left: 28px;">
                    <quill-editor v-model="content" ref="myQuillEditor" style="height: 108px;" >
                    </quill-editor>
                </el-card>
            </div>
<!--            <p>职务设置</p>-->
<!--            <div>-->
<!--                <div class="flex">-->
<!--                    <el-button type="primary" size="small">批量删除</el-button>-->
<!--                    <el-button type="primary" size="small" icon="el-icon-edit" @click="dialogDutyVisible =true">添加职务</el-button></div>-->
<!--                <div class="view">-->
<!--                </div>-->
<!--            </div>-->
            <p>指导老师</p>
            <div>
               <div class="flex">
                   <el-button type="primary" size="small">批量删除</el-button>
                   <el-button type="primary" size="small" icon="el-icon-edit" @click="dialogTeacherVisible =true">添加老师</el-button></div>
                <div class="view">
                    <el-tag
                            style="margin-right: 15px"
                            v-for="tag in checkList"
                            closable
                            @close="remove(tag)"
                    >
                        {{tag.split(',')[0]}}
                    </el-tag>
                </div>
            </div>
            <p>工坊成员</p>
            <div>
                <div class="flex">
                    <el-button type="primary" size="small">批量删除</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click="dialogStudentVisible = true">添加成员</el-button></div>
                <div class="view">
                    <el-tag
                            style="margin-right: 15px"
                            v-for="tag in checkList1"
                            closable
                            @close="remove1(tag)"
                    >
                        {{tag.split(',')[0]}}
                    </el-tag>
                </div>
            </div>
            <div style="padding: 25px 20px">
                <el-button type="primary" @click="commit">发布</el-button>
                <el-button plain @click="save">保存草稿</el-button>
                <el-button @click="handleDelete" plain>取消</el-button>
            </div>
        </div>
        <el-dialog title="增加指导老师" :visible.sync="dialogTeacherVisible">
            <el-input
                    v-model="search"
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search">
            </el-input>
            <div class="dialogflex">
                <div v-if="data.data">
                    <el-tree :data="data.data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
                <div class="list">
                    <div v-if="listData.data">
                        <el-checkbox-group v-model="checkList" @change="change">
                            <el-checkbox :label="item.realName+','+item.id" v-for="item in listData.data.result" style="margin-top: 10px">
                                <img :src="item.imgAddress">{{item.realName}}
<!--                            <img src="../assets/images/123.png">{{item.realName}}-->
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :page-size="5"
                                :pager-count="5"
                                layout=" prev, pager, next"
                                :total="listData.data.allRowNum">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div>
                <p>已选</p>
                <div class="list1">
                    <el-tag
                            style="margin-right: 15px"
                            v-for="tag in checkList"
                            closable
                            @close="remove(tag)"
                            >
                        {{tag.split(',')[0]}}
                    </el-tag>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTeacherVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTeacherVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="增加工坊成员" :visible.sync="dialogStudentVisible">
            <el-input
                    v-model="search1"
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search">
            </el-input>
            <div class="dialogflex">
                <div v-if="data1.data">
                    <el-tree :data="data1.data" :props="defaultProps1" @node-click="handleNodeClick1"></el-tree>
                </div>
                <div class="list">
                    <div v-if="listData1.data">
                        <el-checkbox-group v-model="checkList1" @change="change1">
                            <el-checkbox :label="item.realName+','+item.id" v-for="item in listData1.data.result" style="margin-top: 10px">
                                <img :src="item.imgAddress">{{item.realName}}
                                <!--                            <img src="../assets/images/123.png">{{item.realName}}-->
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-pagination
                                @current-change="handleCurrentChange1"
                                :page-size="5"
                                :pager-count="5"
                                layout=" prev, pager, next"
                                :total="listData1.data.allRowNum">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div>
                <p>已选</p>
                <div class="list1">
                    <el-tag
                            style="margin-right: 15px"
                            v-for="tag in checkList1"
                            closable
                            @close="remove1(tag)"
                    >
                        {{tag.split(',')[0]}}
                    </el-tag>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogStudentVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogStudentVisible = false">确 定</el-button>
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
        name: "newTeam",
        data(){
            return {
                teamName:'',
                type:[],
                radio:null,
                options:[],
                value: '',
                id:null,
                fileList:[],
                file:null,
                fileName:null,
                search:'',
                search1:'',
                dialogTeacherVisible:false,
                dialogStudentVisible:false,
                dialogDutyVisible:false,
                data: [],
                data1: [],
                defaultProps: {
                    children: 'deptNodeList',
                    label: 'nodeName'
                },
                defaultProps1: {
                    children: 'deptNodeList',
                    label: 'nodeName'
                },
                listData:[],
                listData1:[],
                page:1,
                page1:1,
                treeNodeId:null,
                treeNodeId1:null,
                deptId:null,
                deptId1:null,
                checkList:[],
                checkList1:[],
                tags: new Set(),
                tags1: new Set(),
                arr:[],
                arr1:[],
                studentList:null,
                teacherList:null,



                value1:null,
                textarea:'',
                content:'',
                editorOption:[],
            }
        },
        watch:{
            checkList(){
                // console.log(this.checkList);
                let s='';
                this.checkList.forEach(val => {
                    let obj={ };
                    obj['userId']=val.split(',')[1];
                    if(val.split(',')[2] == '' || val.split(',')[2] == undefined){
                        obj['id']=-1;
                    }else{
                        obj['id']=val.split(',')[2];
                    }

                    s += JSON.stringify(obj) + 'JSONOBJ';
                })
                this.teacherList = s;
                // s = this.checkList.reduce((res,val)=>{
                //     console.log(res)
                //     console.log(val)
                //     let obj={};
                //     obj['id']=val.split(',')[1];
                //     obj['memberId']=-1;
                //     return res+JSON.stringify(obj)+'JSONOBJ'
                // });
            },
            checkList1(){
                // console.log(this.checkList);
                let s='';
                this.checkList1.forEach(val => {
                    let obj={ };
                    obj['userId']=val.split(',')[1];
                    if(val.split(',')[2] == '' || val.split(',')[2] == undefined){
                        obj['id']=-1;
                    }else{
                        obj['id']=val.split(',')[2];
                    }
                    s += JSON.stringify(obj) + 'JSONOBJ';
                })
                this.studentList = s;
            }
        },
        mounted(){
          this.axios.post('/teamproject/manage/addnewworkshop',{
              userId:this.$store.state.user.userId,
          }).then(res => {
              this.$set(this.type,'data',res.data.data.teamDevDegreeList);
              this.$set(this.options,'data',res.data.data.teamTypeList);
              this.id = res.data.data.teamBean.id;
              this.value1 = res.data.data.teamBean.startTime;
          });
          this.getData();
          this.getData1();
        },
        methods:{
            getData(){
                this.axios.post('/teamproject/manage/getalldeptforchoise',{
                    userId:this.$store.state.user.userId,
                    selectType:0,
                    searchKey:this.search
                }).then(res => {
                    this.$set(this.data,'data',res.data.data.listNode)
                })
            },
            getData1(){
                this.axios.post('/teamproject/manage/getalldeptforchoise',{
                    userId:this.$store.state.user.userId,
                    selectType:1,
                    searchKey:this.search
                }).then(res => {
                    this.$set(this.data1,'data',res.data.data.listNode)
                })
            },
            handleDelete() {
                this.$confirm("是否删除?", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                })
                    .then(() => {
                        this.axios.post('/teamproject/manage/deleteteam',{
                            userId:this.$store.state.user.userId,
                            teamId:this.id,
                        }).then(res => {
                            if(res.data.code == 200){
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                            }
                            this.$router.go(-1)
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            handle(file){
                let reader = new FileReader();
                reader.onload = ()=> {
                    let _base64 = reader.result;
                    this.file = _base64;
                };
                reader.readAsDataURL(file.raw);
                this.fileName = file.name;
            },
            handleNodeClick(data) {
                this.treeNodeId = data.$treeNodeId;
                this.deptId = data.id;
                this.page = 1;
               this.getList()
            },
            handleNodeClick1(data) {
                this.treeNodeId1 = data.$treeNodeId;
                this.deptId1 = data.id;
                this.page1 = 1;
                this.getList1()
            },
            getList(){
                if(this.treeNodeId == 1){
                    this.axios.post("/teamproject/manage/getallteacherofdept",{
                        userId:this.$store.state.user.userId,
                        deptId:this.deptId,
                        teamId:this.id,
                        category:'school',
                        searchKey:'',
                        page:this.page,
                        pageSize:5
                    }).then(res => {
                        this.$set(this.listData,'data',res.data.data)
                    })
                }else{
                    this.axios.post("/teamproject/manage/getallteacherofdept",{
                        userId:this.$store.state.user.userId,
                        deptId:this.deptId,
                        teamId:this.id,
                        category:'dept',
                        searchKey:'',
                        page:this.page,
                        pageSize:5
                    }).then(res => {
                        this.$set(this.listData,'data',res.data.data)
                    })
                }
            },
            getList1(){
                if(this.treeNodeId1 == 1){
                    this.axios.post("/teamproject/manage/getallstudentofdept",{
                        userId:this.$store.state.user.userId,
                        deptId:this.deptId1,
                        teamId:this.id,
                        category:'school',
                        searchKey:'',
                        page:this.page1,
                        pageSize:5
                    }).then(res => {
                        this.$set(this.listData1,'data',res.data.data)
                    })
                }else{
                    this.axios.post("/teamproject/manage/getallstudentofdept",{
                        userId:this.$store.state.user.userId,
                        deptId:this.deptId1,
                        teamId:this.id,
                        category:'dept',
                        searchKey:'',
                        page:this.page1,
                        pageSize:5
                    }).then(res => {
                        this.$set(this.listData1,'data',res.data.data)
                    })
                }
            },
            handleCurrentChange(page){
                this.page = page;
                this.getList();
            },
            handleCurrentChange1(page){
                this.page1 = page;
                this.getList1();
            },
            change(val){
                val.forEach(val => {
                    console.log(val.split(',')[1])
                })
                // val.forEach(val => {
                //     this.tags.add(val)
                // });
                // this.arr = [...this.tags];
            },
            change1(val){
                // val.forEach(val => {
                //     this.tags1.add(val)
                // });
                // this.arr1 = [...this.tags1];
            },
            remove(val){
                // this.arr = this.arr.filter( item => {
                //     return val != item;
                // });
                // this.tags = new Set(this.arr);
                this.checkList = this.checkList.filter(item => {
                    return val != item;
                });
            },
            remove1(val){
                // this.arr1 = this.arr1.filter( item => {
                //     return val != item;
                // });
                // this.tags1 = new Set(this.arr1);
                this.checkList1 = this.checkList1.filter(item => {
                    return val != item;
                });
            },
            save(){
                this.axios.post('/teamproject/manage/saveworkshop',{
                    userId:this.$store.state.user.userId,
                    teamId:this.id,
                    teamName:this.teamName,
                    teamDescription:this.textarea,
                    imgName:this.fileName,
                    imgString:this.file,
                    teamInstructor:this.content,
                    startTime:this.value1,
                    teamTypeId:this.value,
                    memberList:this.studentList,//成员
                    teacherList:this.teacherList,//教师
                }).then(res => {
                    if(res.data.code == 200){
                        this.$message('保存成功！', '', {
                            type: 'warning'
                        });
                        this.$router.go(0);
                    }else{
                        this.$message('保存失败了！', '', {
                            type: 'warning'
                        });
                    }
                })
            },
            commit(){
                this.axios.post('/teamproject/manage/saveworkshop',{
                    userId:this.$store.state.user.userId,
                    teamId:this.id,
                    teamName:this.teamName,
                    teamDescription:this.textarea,
                    imgName:this.fileName,
                    imgString:this.file,
                    teamInstructor:this.content,
                    startTime:this.value1,
                    teamTypeId:this.value,
                    memberList:this.studentList,//成员
                    teacherList:this.teacherList,//教师
                }).then(res => {
                    if(res.data.code == 200){
                        this.axios.post('/teamproject/manage/publishteam',{
                            teamId:this.id
                        }).then(res => {
                            if(res.data.code == 200){
                                this.$message('发布成功！', '', {
                                    type: 'warning'
                                });
                                this.$router.go(-1);
                            }
                        })
                    }
                })
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
        width: 346px;
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
        flex-wrap: wrap;
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