<template>
    <div class="flex">
        <el-input v-model="user" placeholder="账号"></el-input>
        <el-input v-model="pwd" placeholder="密码"></el-input>
        <el-select v-model="value" placeholder="请选择"  @change="handleChange">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary" @click="login()">登录</el-button>
    </div>
</template>

<script>
    export default {
        name: "devLogin",
        data(){
            return {
                user:2016092204,
                pwd:12345678,
                source:null,
                options: [{
                    value: 'manage',
                    label: '管理员',
                    user:2016092204,
                    pwd:12345678,
                }, {
                    value: 'teacher',
                    label: '老师',
                    user:13223453456,
                    pwd:12345678,
                }, {
                    value: 'student',
                    label: '学生',
                    user:13334564567,
                    pwd:12345678,
                }],
                value: 'manage',
            }
        },
        mounted(){
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
                this.source = 'app';
            } else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
                this.source = 'app';
            } else {  //pc
                this.source = 'web';
            }
            let cookies = document.cookie.split(";");
            let s = null;
            cookies.forEach(val => {
                if(val.includes("g-token")){
                    s=val.split("=")[1];
                }
            });
        },
        methods:{
            login(){
                this.axios({
                    baseURL:'http://api.test.chuangfeigu.com/auth',
                    url:'/login',
                    method: 'post',
                    headers:{
                        'i-version':1
                    },
                    //管2016092204  12345678 老13223453456
                    data:{
                        authInfo:this.user,
                        password:this.pwd,
                        source:this.source
                    }
                }).then(async (res)=>{
                    await this.$store.commit("setUser",res.data.data);
                    await this.axios({
                        url:'/teamproject/common/userrole',
                        method: 'post',
                        data:{
                            userId:this.$store.state.user.userId
                        }
                    }).then(res => {
                        this.$store.commit('setRole',res.data.data)
                    })
                    if(this.$store.getters.isLogin) this.$router.push({path:'/index'})
                })
            },
            handleChange(data){
                this.options.forEach((i)=>{
                    if(i.value == data){
                        this.user = i.user;
                        this.pwd = i.pwd;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .flex{
        display: flex;
        justify-content: center;
        padding-top: 200px;
        flex-direction: column;
        width: 30%;
        margin: 0 auto;
    }
    .el-input,.el-button{
        margin: 10px 0;
    }
</style>