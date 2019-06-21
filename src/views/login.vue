<template>
    <div id="login">
        <div class="header">
            <p>广轻工团队项目应用管理</p>
        </div>
        <div class="body">
            <div class="input_wrap">
                <div class="input_">
                    <i class="icon iconfont icon-wode"></i>
                    <input type="text" id="userName" placeholder="用户名" v-model="user">
                </div>
                <div class="input_">
                    <i class="icon iconfont icon-jiesuo"></i>
                    <input type="password" id="password" placeholder="密码" v-model="pwd">
                </div>
                <div>
                    <p class="error"></p>
                    <span id="login_btn" @click="login">登录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {baseUrl} from '../utils/baseUrl'
    export default {
        name: "login",
        data(){
            return {
                user:2016092204,
                pwd:12345678,
                source:null,
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
            this.axios({
                url:'/teamproject/common/userrole',
                method: 'post',
                data:{
                    token:s
                }
            }).then(res => {
                this.$store.commit('setRole',res.data.data);
                this.$store.commit('setToken',s);
                if(this.$store.getters.isLogin) this.$router.push({path:'/index'})
            })

            console.log(s);
        },
        methods:{
            login(){
                this.axios({
                    baseURL:baseUrl+'auth',
                    // baseURL:'http://api.test.chuangfeigu.com/auth',
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
                            token:this.$store.state.user.token
                        }
                    }).then(res => {

                        // console.log(res.data.data.roleType)
                        // if(res.data.data.roleType == 1){
                        //     this.$store.commit('setRole',1)
                        // }else if(res.data.data.roleType == 2){
                        //     this.$store.commit('setRole',2)
                        // }else if(res.data.data.roleType == 3){
                        //     this.$store.commit('setRole',3)
                        // }
                        this.$store.commit('setRole',res.data.data)
                    })
                    if(this.$store.getters.isLogin) this.$router.push({path:'/index'})
                })
            },
        }
    }
</script>

<style scoped>
    html, body, div, textarea, button, input,
    span, h1, h2, h3, h4, h5, h6, p, pre, em,
    img, strong, i, dl, dt, dd, ol, ul, li,
    form, label, table, tbody, tfoot, thead, tr, th, td, canvas, video{
        margin: 0;
        padding: 0;
    }
    html{
        font-size: 62.5%;
        height: 100%;
    }
    body{
        min-height: 100%;
        font-family:  "PingFang SC", Helvetica, "Helvetica Neue", "微软雅黑", Tahoma, Arial, sans-serif;     /*前三是苹果字体，第四个雅黑*/
        font-size: 14px;
        color: #333;
        min-width: 1200px;
        position: relative;
        line-height:1.2;
        background-color: #f0f4f7;
    }
    a{
        text-decoration: none;
    }
    img{
        border: none;
        outline: none;
    }
    ul,li{
        list-style: none;
    }
    #login{
        width: 620px;
        height: 418px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-shadow: 0px 10px 49px 0 rgba(183, 193, 201, 0.5);
        border-radius: 4px;
        background: #fafafa;
    }
    .header{
        height: 80px;
        background-color: #2f9dea;
    }

    .header p{
        text-align: center;
        line-height: 80px;
        color: #fff;
        font-size: 2.4rem;
        letter-spacing: 2.4px;
    }
    .input_wrap{
        width: 370px;

        margin: 0 auto;
    }
    .input_wrap>.input_{
        margin-top: 50px;
        height: 32px;
        border-bottom:1px solid #d7dde4;
        /*padding-left: 10px;*/
        position: relative;
    }
    .input_wrap>.input_ input{
        border: none;
        outline: none;
        display: block;
        line-height: 60px;
        height: 60px;
        background: #fafafa;
        font-size: 20px;
        width: 100%;
    }
    .input_wrap>.input_ input::-moz-placeholder{
        color: #9ea7b4;
    }
    .input_wrap>.input_ input:-ms-input-placeholder{
        color: #9ea7b4;
    }
    .input_wrap>.input_ input::-webkit-input-placeholder{
        color: #9ea7b4;
    }
    .error{
        color: #ff2e00;
        line-height: 60px;
        font-size: 12px;
        min-height: 60px;
    }
    #login_btn{
        display: block;
        height: 50px;
        background-color: #2f9dea;
        font-size: 1.8rem;
        line-height: 50px;
        width: 100%;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
    }
    .input_ .icon{
        font-size: 20px;
        position: absolute;
        left: 0;
        top: 3px;
    }
</style>