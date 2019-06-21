<template>
  <div>
    <header>
      <div class="header w">
        <img src="../assets/LOGO.png" alt>
        <div class="buttonBox fr">
<!--          <div class="button">-->
            <div id="info" v-if="$store.state.user.token != null">
              <el-popover
                      placement="bottom"
                      trigger="click">
<!--                <el-button @click="loginOut()">click 激活</el-button>-->
                <p @click="loginOut()" style="width: 100%;height: 100%;text-align: center;letter-spacing: 6px;cursor: pointer">退出登录</p>
                <div slot="reference"><span style="margin-right: 5px;font-weight: bold">{{$store.state.user.name}}</span><img :src="$store.state.user.img"></div>
              </el-popover>
            </div>
<!--            <span>登录</span>-->
<!--          </div>-->
<!--          <div class="button">-->
<!--            <span>注册</span>-->
<!--          </div>-->
        </div>
      </div>
    </header>
    <div class="main w">
      <el-aside width="200px" style="background-color: rgb(43, 52, 74)" v-if="role == 1">
      <el-col>
        <el-menu
                router
                :default-active="this.$route.path"
                :default-openeds="['1','2','3']"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#2B344A"
                text-color="#A5B8C5"
                active-text-color="#5080FF"
        >
          <el-submenu index="1">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <span>数据统计</span>
            </template>
            <el-menu-item index="/index/General_overview">总体概览</el-menu-item>
            <el-menu-item index="/index/Team_Data">工坊数据</el-menu-item>
            <el-menu-item index="/index/proData">项目数据</el-menu-item>
            <el-menu-item index="/index/resultData">成果数据</el-menu-item>
            <el-menu-item index="/index/salonData">沙龙数据</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <!-- <i class="el-icon-menu"></i> -->
              <span>管理工作</span>
            </template>
            <el-menu-item index="/index/todoMsg">我要审批</el-menu-item>
<!--            <el-menu-item index="2-2">通知操作</el-menu-item>-->
            <el-menu-item index="/index/Data_collection">数据补录</el-menu-item>
            <el-menu-item index="/index/teacherList">导师管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <!-- <i class="el-icon-menu"></i> -->
              <span>详情浏览</span>
            </template>
            <el-menu-item index="/index/innovativeTeam">工坊总览</el-menu-item>
            <el-menu-item index="/index/Ttem_Pandect">项目总览</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
      <el-aside width="200px" style="background-color: rgb(43, 52, 74)" v-if="role == 2">
        <el-col>
          <el-menu
                  router
                  :default-active="this.$route.path"
                  :default-openeds="['1','2']"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#2B344A"
                  text-color="#A5B8C5"
                  active-text-color="#5080FF"
          >
            <el-submenu index="1">
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>个人中心</span>
              </template>
              <el-menu-item index="/index/General_overview">我的概览</el-menu-item>
              <el-menu-item index="/index/todoMsg">消息待办</el-menu-item>
<!--              <el-menu-item index="/index/assignWork">工坊作业</el-menu-item>-->
<!--              <el-menu-item index="/topicTask">课题任务</el-menu-item>-->
              <el-menu-item index="/index/belongWorkshop">所属工坊</el-menu-item>
              <el-menu-item index="/index/belongPro">所属项目</el-menu-item>
<!--              <el-menu-item index="/index/assignWork">作业查看</el-menu-item>-->
<!--              <el-menu-item index="/topicManage">课程查看</el-menu-item>-->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <span>详情浏览</span>
              </template>
              <el-menu-item index="/index/innovativeTeam">工坊总览</el-menu-item>
              <el-menu-item index="/index/Ttem_Pandect">项目总览</el-menu-item>
              <el-menu-item index="/index/joinTeam">招聘信息</el-menu-item>
<!--              <el-menu-item index="">公共需求</el-menu-item>-->
              <el-menu-item index="/index/teacherList">导师信息</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-aside width="200px" style="background-color: rgb(43, 52, 74)" v-if="role == 3">
        <el-col>
          <el-menu
                  router
                  :default-active="this.$route.path"
                  :default-openeds="['1','2']"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#2B344A"
                  text-color="#A5B8C5"
                  active-text-color="#5080FF"
          >
            <el-submenu index="1">
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>个人中心</span>
              </template>
              <el-menu-item index="/index/General_overview">我的概览</el-menu-item>
              <el-menu-item index="/index/todoMsg">消息待办</el-menu-item>
<!--              <el-menu-item index="/index/assignWork">作业管理</el-menu-item>-->
<!--              <el-menu-item index="/topicManage">课程管理</el-menu-item>-->
<!--              <el-menu-item index="/topicTask">课题任务</el-menu-item>-->
              <el-menu-item index="/index/belongWorkshop">所属工坊</el-menu-item>
              <el-menu-item index="/index/belongPro">指导项目</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <!-- <i class="el-icon-menu"></i> -->
                <span>详情浏览</span>
              </template>
              <el-menu-item index="/index/innovativeTeam">工坊总览</el-menu-item>
              <el-menu-item index="/index/Ttem_Pandect">项目总览</el-menu-item>
              <el-menu-item index="/index/joinTeam">招聘信息</el-menu-item>
<!--              <el-menu-item index="/">公共需求</el-menu-item>-->
              <el-menu-item index="/index/teacherList">导师信息</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <router-view style="margin: 0 10px;flex: 1;box-sizing: border-box;"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        role:null  //student teacher manage
      }
    },
    created(){
      this.role=this.$store.state.user.role;
      if(!this.role) this.$router.push({path:'/'})
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      loginOut(){
        let data = {
          userName:null,
          userId:null,
          token:null,
          refreshToken:null,
        };
        let data1 ={
          roleType:null,
          imgAddress:null,
          realName:null
        }
        this.$store.commit("setUser",data);
        this.$store.commit("setRole",data1);
        this.$router.push({path:'/'})
      }
    }
  };
</script>

<style lang="scss" scoped>
  #info{
    position: absolute;
    right:-65px;
    img{
      width: 50px!important;
      height: 50px!important;
      border-radius: 50%;
    }
  }
  header {
    height: 80px;
    line-height: 80px;
    background: #fff;
    .header {
      img {
        width: 62px;
        margin-right: 9px;
        vertical-align: middle;
      }

      .headerName {
        font-size: 16px;
        color: #2f9dea;
        vertical-align: middle;
        font-weight: bold;
      }

      .buttonBox {
        .button {
          width: 48px;
          height: 24px;
          border: 1px solid #2f9dea;
          color: #2f9dea;
          line-height: 22px;
          text-align: center;
          margin-left: 14px;
          border-radius: 3px;
        }
      }
    }
  }
  .el-menu {
    // padding-left: 19px;
  }
  .el-menu-item {
    min-width: 0px !important;
  }
  .button {
    display: inline-block;
  }
  .main {
    display: flex;
    margin-top: 20px;
    .el-aside {
      background-color: #f9f9f9;
    }
  }
</style>