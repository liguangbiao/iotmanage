<template>
    <div v-if="res.data">
        <div class="wrap">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/teacherManage' }">导师管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑老师</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <p>导师姓名</p>
            <el-input placeholder="请输入内容" class="wid" v-model="res.data.tutorName"></el-input>
            <p>手机</p>
            <el-input placeholder="请输入内容" class="wid" v-model="res.data.tutorPhone"></el-input>
            <p>性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="0">女</el-radio></p>
            <p>上传头像</p>
            <div class="wid">
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-change="handle"
                        :file-list="fileList"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb.</div>
                </el-upload>
            </div>
            <p>邮箱</p>
            <el-input placeholder="请输入内容" class="wid" v-model="res.data.mailBox"></el-input>
            <p>导师类型</p>
            <el-select v-model="value" placeholder="请选择" class="wid" v-if="type.data">
                <el-option
                        v-for="item in type.data"
                        :key="item.id"
                        :label="item.tutorTypeName"
                        :value="item.id">
                </el-option>
            </el-select>
            <p>单位名称</p>
            <el-input placeholder="请输入内容" class="wid" v-model="res.data.unit"></el-input>
            <p>职业</p>
            <el-input placeholder="请输入内容" class="wid" v-model="res.data.position"></el-input>
            <p>特长</p>
            <el-input placeholder="请输入内容" class="wid" v-model="res.data.skills"></el-input>
            <p>行业</p>
            <el-select v-model="value1" placeholder="请选择" class="wid" v-if="type1.data">
                <el-option
                        v-for="item in type1.data"
                        :key="item.id"
                        :label="item.fieldTypeName"
                        :value="item.id">
                </el-option>
            </el-select>
            <p>导师简介</p>
            <div>
                <el-card style="height: 210px; width: 672px;margin-left: 28px;">
                    <quill-editor v-model="content" ref="myQuillEditor" style="height: 108px;" :options="editorOption">
                    </quill-editor>
                </el-card>
            </div>
            <div style="padding: 25px 20px">
                <el-button type="primary" @click="commit">提交</el-button>
                <el-button plain>取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        name: "editTeacher",
        data(){
            return {
                type:[],
                type1:[],
                value:null,
                value1:null,
                res:[],
                radio:null,
                content:null,
                file:null,
                filename:null,
                fileList:[],
                editorOption:null,
            }
        },
        async mounted(){
            await this.axios.get('/tutor/types')
                .then(res => {
                    this.$set(this.type,'data',res.data.data);
                });
            await this.axios.get('/tutor/field/types')
                .then(res => {
                    this.$set(this.type1,'data',res.data.data);
                })
            this.axios.get('/tutor/detail',{
                params:{
                    tutorId:this.$route.params.id
                }
            }).then(res => {
                this.$set(this.res,'data',res.data.data);
                this.radio = res.data.data.sex.toString();
                this.content = res.data.data.instructor;
                this.value = res.data.data.tutorTypeId;
                this.value1 = res.data.data.listFieldType[0].id;
            })
        },
        methods:{
            commit(){
              this.axios.post('/tutor/save',{
                  tutorName:this.res.data.tutorName,
                  tutorPhone:this.res.data.tutorPhone,
                  sex:this.radio,
                  oldHeaderImg:this.res.data.tutorImg,
                  newHeaderImg:this.file,
                  fileName:this.filename,
                  mailBox:this.res.data.tutorName,
                  position:this.res.data.position,
                  skills:this.res.data.skills,
                  instructor:this.content,
                  unit:this.res.data.unit,
                  fieldTypeIdStr:this.value1,
                  tutorTypeId:this.value,
                  userId:this.$store.state.user.userId,
                  tutorId:this.$route.params.id,
              }).then(res => {
                  if(res.data.code == 200){
                      this.$message('修改成功！', '', {
                          type: 'warning'
                      });
                      setTimeout(()=>{
                          this.$router.push({path:'/teacherManage'})
                      },3000)
                  }
              })
            },
            handleNodeClick(data) {
                console.log(data);
            },
            handle(file){
                let reader = new FileReader();
                reader.onload = ()=> {
                    let _base64 = reader.result;
                    this.file = _base64;
                };
                reader.readAsDataURL(file.raw);
                this.filename = file.name;
            },
        },
        watch:{
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