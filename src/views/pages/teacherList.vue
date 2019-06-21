<template>
    <div class="content_">
        <p class="p1">导师管理</p>
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
<!--                    <el-button type="primary">私信记录</el-button>-->
                    <el-button v-if="$store.state.user.role == 1" type="primary" @click="jump()">导师管理</el-button>
                </div>
            </div>
            <div class="sel">
                <div class="flex">
                    <div>
                        <span class="selspan">导师类型</span>
                        <el-radio-group v-model="radio" size="small" v-if="type.data" @change="change">
                            <el-radio v-for="item in type.data" :label="item.id" border>{{item.tutorTypeName}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div>
                    <div class="flex con">
                        <span class="selspan">行业领域</span>
                        <el-radio-group v-model="radio1" size="small" v-if="type1.data" @change="change1">
                            <el-radio  v-for="item in type1.data" :label="item.id" border>{{item.fieldTypeName}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <div v-if="res.data">
                <el-table
                        :data="res.data.result"
                        style="width: 100%">
                    <el-table-column
                            width="400"
                            prop=""
                            label="导师">
                        <template slot-scope="scope">
                            <div @click="jumpDetail(scope.row.tutorId)" style="cursor: pointer">
                                <img :src="scope.row.tutorImg">
                                <span style="margin-left: 10px"><strong>{{ scope.row.tutorName }}</strong><br>{{ scope.row.position }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            @click="jumpDetail(scope.row.tutorId)" style="cursor: pointer"
                            prop=""
                            label="导师类型"
                            width="300">
                        <template slot-scope="scope">
                            <div>
                                <span style="color:#606266">{{ scope.row.tutorType.tutorTypeName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            @click="jumpDetail(scope.row.tutorId)" style="cursor: pointer"
                            width="230"
                            prop="unitName"
                            label="行业领域">
                    </el-table-column>
                </el-table>
                <div style="margin: 20px">
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
    </div>
</template>

<script>
    export default {
        name: "teacherList",
        data(){
            return {
                type:[],
                type1:[],
                search:'',
                radio:'',
                radio1:'',
                res:[],
            }
        },
        async mounted(){
           await this.axios.get('/tutor/types')
                .then(res => {
                    this.$set(this.type,'data',res.data.data);
                    this.radio = res.data.data[0].id;
                });
           await this.axios.get('/tutor/field/types')
                .then(res => {
                    this.$set(this.type1,'data',res.data.data);
                    this.radio1 = res.data.data[0].id;
                })
            this.getData(1);
        },
        methods:{
            getData(page){
                this.axios.get('/tutor/list',{
                    params:{
                        searchName:this.search,
                        fieldType:this.radio,
                        tutorType:this.radio1,
                        page:page,
                        pageSize:10
                    }
                }).then(res=>{
                    this.$set(this.res,'data',res.data.data)
                })
            },
            change(val){
                this.radio = val;
                this.getData(1)
            },
            change1(val){
                this.radio1 = val;
                this.getData(1)
            },
            handleCurrentChange(page){
              this.getData(page)
            },
            jump(){
                this.$router.push({
                    path:'/teacherManage'
                })
            },
            jumpDetail(id){
                this.$router.push({
                    path:`/index/teacherDetail/${id}`
                })
            }
        }
    }
</script>

<style>
    .content_ .p1{
        display: block;
        padding: 10px 0 15px 10px ;
        font-size: 19px;
        color: #333333;
    }
    .content_ .block{
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
    .content_ .el-button{
        margin-right: 15px;
    }
    .content_ .el-radio__input{
        display: none!important;
    }
    .content_ .flex{
        display: flex;
        justify-content: space-between;
    }
    .content_ .el-radio-group>label{
        margin: 10px 10px;
    }
    .con .el-radio-group{
        padding-top: 5px;
        border-top: 1px dashed #c4e5ff;
    }
    .content_ .cell img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .content_ .cell span{
        display: inline-block;
        color:#d8d8d8;
    }
    .content_ .cell span>strong{
        color: #4d4d4d;
    }
    .content_ .el-table{
        padding-left: 10px;
    }
</style>