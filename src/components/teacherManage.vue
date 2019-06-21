<template>
    <div class="content__">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index/teacherList' }">导师库</el-breadcrumb-item>
            <el-breadcrumb-item>导师管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="background-color: white">
            <div class="block">
                <el-input
                        style="width: 450px"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="search"
                        @blur="getData(1)"
                        >
                </el-input>
                <div>
                    <el-button type="primary" @click="jump()">添加导师</el-button>
                    <el-button type="primary" @click="dialogDutyVisible = true" v-if="role == 'manage'">导入老师</el-button>
                </div>
            </div>
            <div v-if="res.data">
                <el-table
                        :data="res.data.result"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="45">
                    </el-table-column>
                    <el-table-column
                            width="280"
                            prop=""
                            label="导师">
                        <template slot-scope="scope">
                            <img :src="scope.row.tutorImg">
                            <span style="margin-left: 10px"><strong>{{ scope.row.tutorName }}</strong><br>{{ scope.row.position }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="导师类型"
                            width="200">
                        <template slot-scope="scope">
                            <div>
                                <span style="color:#606266">{{ scope.row.tutorType.tutorTypeName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="230"
                            prop="unitName"
                            label="行业领域">
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin: 10px 20px"><el-button @click="del">删除选中</el-button></div>
                <div style="margin: 10px">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :page-size="10"
                            :pager-count="5"
                            layout="total, prev, pager, next"
                            :total="res.data.allRowNum">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog title="导入资料" :visible.sync="dialogDutyVisible" width="40%">
            <div style="padding: 0 20px">
                <p>下载模板：<a style="color: #23a4ff">aaaaaaaaaaa</a></p>
                <p class="p2">上传文件：
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传文件</el-button>
<!--                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDutyVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogDutyVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "teacherManage",
        data(){
            return {
                search:'',
                res:[],
                select:[],

                dialogDutyVisible:false,
                fileList:[],
                tableData: [
                  {
                    date: '楼某某',
                    date1: '楼.某某 丨 测试',
                    name: '校内导师',
                    hangye: '金融学 信息科学 器械学'
                }, {
                    date: '楼某某',
                    date1: '楼某某 丨 测试',
                    name: '校内导师',
                    hangye: '金融学 信息科学 器械学'
                }, {
                    date: '楼某某',
                    date1: '楼某某 丨 测试',
                    name: '校内导师',
                    hangye: '金融学 信息科学 器械学'
                }
                ],
                multipleSelection:null,
            }
        },
        mounted(){
            this.getData(1);
        },
        methods:{
            getData(page){
                this.axios.get('/tutor/list',{
                    params:{
                        searchName:this.search,
                        fieldType:-1,
                        tutorType:-1,
                        page:page,
                        pageSize:10
                    }
                }).then(res=>{
                    this.$set(this.res,'data',res.data.data)
                })
            },
            jump(){
              this.$router.push({
                  path:'/addTeacher'
              })
            },
            handleSelectionChange(val) {
                this.select = val.map(item => {
                    return item.tutorId
                });
                console.log(this.select)
            },
            handleCurrentChange(page){
              this.getData(page)
            },
            del(){
              this.axios.post('/tutor/delete',{
                  tutorIds:this.select.join()
              }).then(res => {
                  if(res.data.code == 200){
                      this.$message('处理成功！', '', {
                          type: 'warning'
                      });
                      this.select = [];
                      this.getData(1);
                  }
              })
            },
            handleEdit(index, row) {
                this.$router.push({path:`/editTeacher/${row.tutorId}`})
            },
            handleDelete(index, row) {
                this.axios.post('/tutor/delete',{
                    tutorIds:row.tutorId
                }).then(res => {
                    if(res.data.code == 200){
                        this.$message('处理成功！', '', {
                            type: 'warning'
                        });
                        this.select = [];
                        this.getData(1);
                    }
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
        }
    }
</script>

<style>
    .content__ .p1{
        display: block;
        padding: 10px 0 15px 10px ;
        font-size: 19px;
        color: #333333;
    }
    .content__ .block{
        display: flex;
        justify-content: space-between;
        padding: 20px 10px;
    }
    .sel{
        border-top: 1px solid #f3f3f3;
        border-bottom: 1px solid #f3f3f3;
        padding: 10px 0 25px 0;
    }
    .selspan{
        width: 150px;
        display: inline-block;
        padding: 25px 0;
        text-align: center;
        flex-shrink: 0;
    }
    .content__ .el-button{
        margin-right: 15px;
    }
    .content__ .el-radio__input{
        display: none!important;
    }
    .content__ .flex{
        display: flex;
        justify-content: space-between;
    }
    .content__ .el-radio-group>label{
        margin: 10px 10px;
    }
    .con .el-radio-group{
        padding-top: 5px;
        border-top: 1px dashed #c4e5ff;
    }
    .content__ .cell img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .content__ .cell>span{
        display: inline-block;
        color:#d8d8d8;
    }
    .content__ .cell span>strong{
        color: #4d4d4d;
    }
    .content__ .el-table{
        padding-left: 10px;
    }
    .content__ .p2{
        display: flex;
        margin-top: 25px;
        align-items: baseline;
    }
</style>