<template>
  <!-- 团队成员详情弹窗 -->
  <div class="com_teamUsers">
    <div class="menber">
      <i class="iconfont iconguanbi" @click.stop="Handle_Close"></i>
      <div class="contcomTeamUsers_infoent_location">
        <!-- <div class="default">暂时没有数据</div> -->
        <div class="content_nav">
          <div class="content_nav_all">
            <div class="content_nav_img">
              <img
                id="user_userImg"
                src="http://192.6.6.87:81/group1/M00/00/05/wAYGV1t81nWAfIIcAANnaDXtjHA408.jpg"
                alt
              >
            </div>
            <div class="content_nav_text">
              <h3>
                <span id="user_realName">{{UserInfo_List.realName}}</span>&nbsp;&nbsp;
                <span id="user_nickName">({{UserInfo_List.nickName}})</span>&nbsp;&nbsp;
                <span id="user_sex_woman" class="woman" style="display: none;">♀</span>
                <span id="user_sex_man" class="man">♂</span>
              </h3>
              <div class="message_left" style="padding:0 24px 0 0;">
                <p id="user_schoolAndRole">{{UserInfo_List.deptName}} | 学生</p>
                <p id="user_class">{{UserInfo_List.topDeptName}}</p>
              </div>
              <div class="message_left">
                <p id="user_mobile">电话：{{UserInfo_List.mobile}}</p>
                <p id="user_mailBox">邮箱：{{UserInfo_List.mailBox}}</p>
              </div>
              <div class="message_right">
                <p id="user_industry">行业：物联网</p>
              </div>
            </div>
          </div>
          <div class="content_nav_title">
            <ul class="clearfix" ref="navTitleUl">
              <li
                ref="navTitleLi"
                v-for="(Nav_Item,Nav_index) of nav_title"
                :key="`A+${Nav_index}`"
                @mouseenter="Handle_enter(Nav_index)"
                @click.stop="Handle_Cilck(Nav_index)"
                @mouseleave="Handle_enter(NavIndex)"
              >
                <span :class="[NavIndex==Nav_index ? 'blue' :'']">{{Nav_Item.nav_name}}</span>
              </li>
              <span class="line" ref="navTitleLine"></span>
            </ul>
          </div>
        </div>
      </div>
      <div class="content">
        <!-- ------------content_data------------ -->
        <div class="content_data" v-show="NavIndex==0">
          <div class="content_data_body">
            <span></span>
            <h2>简介</h2>
            <p id="user_userInstructor">{{UserInfo_List.userInstructor ||'我是谁'}}</p>
          </div>
          <div class="content_data_spacialty">
            <span></span>
            <h2>专业特长</h2>
            <ol id="user_userSkill">{{UserInfo_List.userSkill ||'学会react'}}</ol>
          </div>
        </div>
        <!-- ------------content_team------------ -->
        <div class="content_team" v-show="NavIndex==1">
          <div class="content_team_project_build">
            <span></span>
            <h2>创建的团队</h2>
            <ul class="clearfix">
              <li
                class="rantangle"
                v-for="(T_Item,T_Index) of UserInfo_Team.myCreateTeam"
                :key="T_Index"
              >
                <span title="asdas">{{T_Item.teamName}}</span>
                <span>{{T_Item.typeName}}</span>
              </li>
            </ul>
          </div>
          <div class="content_team_project_join">
            <span></span>
            <h2>参加的团队</h2>
            <ul class="clearfix">
              <li
                class="rantangle"
                v-for="(T_Item,T_Index) of UserInfo_Team.myJoinTeam"
                :key="T_Index"
              >
                <span>{{T_Item.teamName}}</span>
                <span>{{T_Item.typeName}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- ------------content_project------------ -->
        <div class="content_project" v-show="NavIndex==2">
          <div class="content_team_project_build">
            <span></span>
            <h2>创建的项目</h2>
            <ul class="clearfix">
              <li
                class="rantangle"
                v-for="(T_Item,T_Index) of UserInfo_Project.myCreateProject"
                :key="T_Index"
              >
                <span title="asdas">{{T_Item.projectName}}</span>
                <span>{{T_Item.typeName}}</span>
              </li>
            </ul>
          </div>
          <div class="content_team_project_join">
            <span></span>
            <h2>参加的项目</h2>
            <ul class="clearfix" id="user_joinProject">
              <li
                class="rantangle"
                v-for="(T_Item,T_Index) of UserInfo_Project.myJoinProject"
                :key="T_Index"
              >
                <span title="asdas">{{T_Item.projectName}}</span>
                <span>{{T_Item.typeName}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      msg: {
        type: String
      }
    },
    data() {
      return {
        activeName: "first",
        Visible: false,
        nav_title: [
          { id: 1, nav_name: "个人资料" },
          { id: 2, nav_name: "所属团队" },
          { id: 3, nav_name: "所在项目" }
        ],
        NavIndex: 0,
        UserInfo_List: [],
        UserInfo_Team: [],
        UserInfo_Project: []
      };
    },
    computed: {},
    mounted() {
      this.initUsersInfo();
      this.initUsersTeam();
      this.initUsersProject();
    },
    methods: {
      initUsersInfo() {
        this.axios
          .get("/team/member/user/info", {
            params: { userId: this.msg }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.UserInfo_List = res.data.data;
            }
          });
      },
      initUsersTeam() {
        this.axios
          .get("/team/member/user/team", { params: { userId: this.msg } })
          .then(res => {
            if (res.data.code == 200) {
              this.UserInfo_Team = res.data.data;
            }
          });
      },
      initUsersProject() {
        this.axios
          .get("/team/member/user/project", { params: { userId: this.msg } })
          .then(res => {
            if (res.data.code == 200) {
              this.UserInfo_Project = res.data.data;
            }
          });
      },
      Handle_enter(index) {
        let left = this.$(this.$refs.navTitleUl)
          .children("li")
          .eq(index)
          .position().left;
        let lineWidth = this.$(this.$refs.navTitleUl)
          .children("li")
          .eq(index)
          .width();
        this.$(this.$refs.navTitleLine)
          .stop(true, false)
          .animate({ left: left, width: lineWidth }, 300);
      },
      Handle_Cilck(index) {
        this.NavIndex = index;
      },
      Handle_Close() {
        this.$emit("on_Close", this.Visible);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .com_teamUsers {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 6666;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .menber {
    width: 840px;
    height: 560px;
    overflow: auto;
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-sizing: border-box;
    user-select: none;
    .iconguanbi {
      font-size: 25px;
      line-height: 25px;
      color: #666;
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: pointer;
    }
    .content_nav {
      background: #fff;
      height: 181px;
      font-size: 0;
      box-sizing: content-box;
      border-bottom: 12px solid #f8f8f8;
      .content_nav_all {
        height: 138px;
        padding: 24px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        background: #f5f7fb;
        // cursor: move;
        .content_nav_img {
          width: 80px;
          height: 80px;
          display: inline-block;
          vertical-align: top;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .content_nav_text {
          padding-left: 25px;
          display: inline-block;
          vertical-align: top;
          color: #666;
          h3 {
            color: #333333;
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 13px;
            font-weight: 500;
          }
          .man {
            color: #2f9dea;
          }
          .woman {
            // color:
          }
        }
        .message_left {
          display: inline-block;
          vertical-align: top;
          border-right: 1px solid #ccc;
          padding: 0 24px;
        }
        .message_right {
          display: inline-block;
          padding-left: 24px;
          vertical-align: top;
        }
        .message_left,
        .message_right {
          p {
            color: #666;
            line-height: 14px;
            font-size: 14px;
            margin-bottom: 14px;
          }
        }
      }
      .content_nav_title {
        height: 42px;
        line-height: 42px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 26px;
        > ul {
          width: 100%;
          height: 43px;
          position: relative;
          font-size: 0;
          > li {
            margin-right: 78px;
            float: left;
            cursor: pointer;
            span {
              color: #464c5b;
              font-size: 14px;
            }
          }
          .line {
            display: inline-block;
            position: absolute;
            left: 0;
            bottom: 0;
            height: 2px;
            width: 56px;
            background: #2f9dea;
          }
        }
      }
    }
    .content {
      .content_data {
        .content_data_body,
        .content_data_spacialty {
          padding: 24px 34px;
          box-sizing: border-box;
          position: relative;

          h2 {
            font-size: 18px;
            color: #333;
            font-weight: 500;
            line-height: 18px;
            margin-bottom: 15px;
          }
          > span {
            position: absolute;
            left: 24px;
            top: 24px;
            background: #2f9dea;
            width: 2px;
            height: 18px;
          }
        }
      }
      .content_team,
      .content_project {
        .content_team_project_build,
        .content_team_project_join {
          padding: 24px 34px;
          box-sizing: border-box;
          position: relative;
          font-size: 16px;
          > span {
            position: absolute;
            left: 24px;
            top: 24px;
            background: #2f9dea;
            width: 2px;
            height: 18px;
          }
          > h2 {
            font-size: 18px;
            color: #333;
            font-weight: 500;
            line-height: 18px;
            margin-bottom: 15px;
          }
          > ul {
            li.rantangle {
              width: 200px;
              height: 80px;
              background-color: #ffffff;
              box-shadow: 0px 8px 27px 4px rgba(66, 177, 240, 0.09);
              border-radius: 4px;
              border: solid 1px #f1f9ff;
              text-align: left;
              box-sizing: border-box;
              padding: 0 24px;
              float: left;
              margin-left: 20px;
              margin-bottom: 20px;
              > span {
                display: block;
                font-size: 12px;
                color: #999;
                &:nth-of-type(1) {
                  color: #32abff;
                  padding: 20px 0 10px;
                  font-size: 14px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
    }
  }
  .blue {
    color: #2f9dea !important;
  }
</style>
