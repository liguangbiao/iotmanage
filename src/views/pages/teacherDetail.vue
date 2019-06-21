<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index/teacherList' }">导师库</el-breadcrumb-item>
            <el-breadcrumb-item>导师资料</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content" v-if="res.data">
            <img :src="res.data.tutorImg">
            <div>
                <p>{{res.data.tutorName}}</p>
                <span>{{res.data.position}} 丨 {{res.data.tutorTypeName}}</span>
                <span>{{res.data.unit}}</span>
            </div>
        </div>
        <div class="main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first"><div>
                    <p>简介</p>
                    <span>{{res.data.instructor}}</span>
                    <p>专业特长</p>
                    <span>{{res.data.skills}}</span>
                </div></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "teacherDetail",
        data(){
            return {
                activeName:"first",
                res:[],
            }
        },
        mounted(){
          this.axios.get('/tutor/detail',{
              params:{
                  tutorId:this.$route.params.id
              }
          }).then(res => {
              this.$set(this.res,'data',res.data.data)
          })
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content{
        padding: 10px 30px;
        /*border-bottom: 1px solid #e5e5e5;*/
        >img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            vertical-align: top;
            margin-right: 20px;
        }
        >div{
            display: inline-block;
            >p{
                color: #333333;
                font-size: 24px;
                line-height: 24px;
                margin-bottom: 13px;
                font-weight: 500;
            }
            >span{
                display: block;
                color: #666;
                line-height: 14px;
                font-size: 14px;
                margin-bottom: 14px;
            }
        }
    };
    .main{
        padding-left: 30px;
        .el-tabs p{
            font-size: 18px;
            color: #333;
            font-weight: 600;
            line-height: 18px;
            margin-bottom: 15px;
            border-left: 2px solid #2f9dea;
            padding-left: 10px;
            margin-top: 10px;
            &:nth-child(3){
                margin-top:40px;
            }
        }
    }
</style>