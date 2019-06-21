<template>
  <div>
    <div class="wrap">
<!--      <el-select style="width: 110px" v-model="value" placeholder="工坊类型">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value"-->
<!--        ></el-option>-->
<!--      </el-select>-->
<!--      <el-select style="width: 110px" v-model="value" placeholder="工坊类型">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value"-->
<!--        ></el-option>-->
<!--      </el-select>-->
<!--      <el-select style="width: 110px" v-model="value" placeholder="工坊类型">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value"-->
<!--        ></el-option>-->
<!--      </el-select>-->
<!--      <el-select style="width: 110px" v-model="value" placeholder="工坊类型">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value"-->
<!--        ></el-option>-->
<!--      </el-select>-->
      <el-input placeholder="请输入关键字" style="width: 130px;margin-left: 8px" v-model="searchKey" @blur="search"></el-input>
      <div>
        <a class="mya" @click="exp" v-show="$store.state.user.role == 1" style="width: 128px;margin-right: 133px">导出</a>
<!--        <el-button type="primary" @click="exp" style="right: 133px;" v-show="$store.state.user.role == 1">导出</el-button>-->
<!--        <router-link to="/newTeam" class="mya">增加创新工坊</router-link>-->
      </div>
<!--      <router-link to="/newPro" class="mya">增加创业项目</router-link>-->
    </div>
    <div class="content_wrap">
      <div
        v-for="(TteamItem,TeamIndex) in teamList"
        class="team-info-card-type1 _legal"
        :key="TeamIndex"
        @click="HandleClick(TteamItem.id)"
      >
        <div class="top">
          <a href="javascript:" class="img-container">
            <img :src="TteamItem.imgAddress" style="width: 100%;height: 100%;">
          </a>
          <div class="team-description">
            <div class="content">
              <span class>工坊简介：</span>
              <p class="body-text text-not-overflow">{{TteamItem.description}}</p>
            </div>
            <div class="full-bg"></div>
            <a href="javascript:" class="full-alink"></a>
          </div>
        </div>
        <div class="bottom">
          <strong class="team-name">
            <a class="common-a" href="javascript:">{{TteamItem.teamName}}</a>
          </strong>
          <div class="team-leader-name">
            <span class="comment-label">负责人：{{TteamItem.userNameCreate}}</span>
            <span class="content">
              <a href="#" class="common-a"></a>
            </span>
          </div>
          <span class="team-personnel-status">还缺职</span>
        </div>
        <div class="team-type-drt">
          <span class="description">{{TteamItem.typeName}}</span>
          <div class="full-bg"></div>
        </div>
        <div class="team-legal-status">
          <div class="full-bg"></div>
          <a href="#" class="common-a">审核状态</a>
        </div>
        <div class="team_type_left">
          <span class="color_yellow">创新工坊</span>
        </div>
      </div>
    </div>
    <el-pagination
            v-if="teamList.length > 0"
            :page-size="9"
            :pager-count="5"
            layout="prev, pager, next"
            :current-page="page"
            @current-change="handleCurrentChange"
            :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {fileUrl} from '../../utils/baseUrl'
  export default {
    name: "innovativeTeam",
    data() {
      return {
        searchKey:'',
        options: [
          // {
          //   value: "选项1",
          //   label: "黄金糕"
          // },
          // {
          //   value: "选项2",
          //   label: "双皮奶"
          // },
          // {
          //   value: "选项3",
          //   label: "蚵仔煎"
          // },
          // {
          //   value: "选项4",
          //   label: "龙须面"
          // },
          // {
          //   value: "选项5",
          //   label: "北京烤鸭"
          // }
        ],
        value: "",
        teamList: [],
        total: undefined,
        page:1
      };
    },
    mounted() {
      this.getdata();
    },
    methods: {
      getdata() {
        this.axios
          .post("/teamproject/workshop/workshoplist", {
            userId: this.$store.state.user.userId,
            searchKey: this.searchKey,
            page: 1,
            pageSize: 9
          })
          .then(res => {
            this.teamList = res.data.data.calcPage.result;
            this.total = res.data.data.calcPage.allRowNum;
          });
      },
      handleCurrentChange(page) {
        this.axios
          .post("/teamproject/workshop/workshoplist", {
            userId: this.$store.state.user.userId,
            searchKey: this.searchKey,
            page: page,
            pageSize: 9
          })
          .then(res => {
            this.teamList = res.data.data.calcPage.result;
          });
      },
      HandleClick(id) {
        console.log(id)
        this.$router.push({ name: "teamDetail", params: { id: id } });
      },
      search(){
        this.getdata();
      },
      exp(){
        this.axios.get('/teamproject/common/exportworkshop',{
          params:{
            searchStr:this.searchKey,
            typeId:-1,
          }
        }).then(res => {
          let down = document.createElement('a');
          down.href = fileUrl+res.data.data.file;
          down.download = res.data.data.name;
          down.click();
        })
      },
    }
  };
</script>

<style lang="scss" scoped>
  .wrap {
    border-bottom: solid 1px #d3dce6;
    display: flex;
    justify-content: space-between;
  }
  .el-button {
    color: #555;
    background-color: white;
    border: 1px solid #ccc;
    margin-left: 10px;
  }
  .el-popper[x-placement^="bottom"] {
    margin-top: 2px;
  }
  .mya {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #2f9dea;
    border: 1px solid #dcdfe6;
    color: white;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 10px;
  }
  .content_wrap {
    padding: 20px 0;
  }
  .team-info-card-type1 {
    position: relative;
    display: inline-block;
    width: 270px;
    /*height: 270px;*/
    margin: 20px 20px 40px 20px;
    border: solid 1px #c4c8cb;
    overflow: hidden;
    cursor: pointer;
  }

  .team-info-card-type1 .top {
    position: relative;
    height: 180px;
    border-bottom: solid 1px #eee;
    overflow: hidden;
  }

  .team-info-card-type1 a.img-container {
    display: block;
    height: 100%;
  }

  .team-info-card-type1 .bottom {
    position: relative;
    /*height: 88px;*/
    background-color: #fff;
    padding: 0 13px 2px 13px;
    border: solid 1px transparent;
    border-top-color: #fff;
    z-index: 2;
  }

  .team-info-card-type1 .team-name {
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    margin-top: 13px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    /*超出显示省略号*/
    white-space: nowrap;
    /*强制单行显示*/
  }

  .team-info-card-type1 .team-leader-name {
    height: 20px;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    /*超出显示省略号*/
    white-space: nowrap;
    /*强制单行显示*/
  }

  .team-info-card-type1 .team-leader-name span {
    display: inline-block;
    height: 17px;
    line-height: 20px;
    color: #999;
    font-size: 12px;
  }

  .team-info-card-type1 .team-leader-name span .common-a {
    color: #999;
  }

  .team-info-card-type1 .team-personnel-status,
  .team-info-card-type1 .team-site {
    display: block;
    height: 20px;
    margin-top: 5px;
    overflow: hidden;
    font-size: 12px;
    color: #768087;
    text-overflow: ellipsis;
    /*超出显示省略号*/
    white-space: nowrap;
    /*强制单行显示*/
  }

  .team-info-card-type1 .team-personnel-status._full {
    color: #4bca88;
  }

  .team-info-card-type1 .team-personnel-status._unfull {
    color: #e85959;
  }

  .team-info-card-type1 .team-description {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 150px;
    transition: top 0.45s;
    -moz-transition: top 0.45s;
    /* Firefox 4 */
    -webkit-transition: top 0.45s;
    /* Safari and Chrome */
    -o-transition: top 0.45s;
    /* Opera */
    border-top: solid 1px transparent;
  }

  .team-info-card-type1._legal .team-description {
    display: block;
  }

  .team-info-card-type1:hover .team-description {
    top: 30px;
  }

  .team-info-card-type1 .team-description .full-bg {
    background-color: #000;
    filter: alpha(opacity=60);
    -moz-opacity: 0.6;
    /*Firefox私有，透明度50%*/
    opacity: 0.6;
  }

  .team-info-card-type1 .team-description .content {
    position: relative;
    width: 80%;
    margin-left: 10%;
    margin-top: 17px;
    height: 120px;
    font-size: 13px;
    z-index: 1;
    color: #fff;
  }

  .team-info-card-type1 .team-description .content p.body-text {
    text-indent: 2em;
    padding-top: 5px;
    font-family: "宋体";
    height: 95px;
  }

  .team-info-card-type1 .team_type_left {
    width: 65px;
    height: 65px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }

  .team-info-card-type1 .team_type_left > span {
    position: absolute;
    left: -25px;
    top: 14px;
    width: 100px;
    text-align: center;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .project-item .project-legal-status,
  .team-info-card-type1 .team-legal-status {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }

  .project-item._legal .project-legal-status,
  .team-info-card-type1._legal .team-legal-status {
    display: none;
  }

  .project-item .project-legal-status .full-bg,
  .team-info-card-type1 .team-legal-status .full-bg {
    background-color: #000;
    filter: alpha(opacity=30);
    -moz-opacity: 0.3;
    /*Firefox私有，透明度50%*/
    opacity: 0.3;
  }

  .project-item .project-legal-status a.common-a,
  .team-info-card-type1 .team-legal-status a.common-a {
    display: block;
    position: relative;
    width: 129px;
    height: 41px;
    line-height: 41px;
    margin: 45% auto;
    text-align: center;
    z-index: 1;
    color: #fff;
    letter-spacing: 1px;
    background: url(../../assets/images/icon/sprite-1.png) no-repeat;
  }

  .project-item .project-legal-status a.common-a {
    margin-top: 13%;
    margin-bottom: 0;
  }

  .project-item._check-hnb_submitted .project-legal-status a.common-a,
  .team-info-card-type1._check-hnb_submitted .team-legal-status a.common-a {
    background-position: 0 0;
  }

  .project-item._check-underway .project-legal-status a.common-a,
  .project-item._apply-unconfirmed .project-legal-status a.common-a,
  .team-info-card-type1._check-underway .team-legal-status a.common-a,
  .team-info-card-type1._apply-unconfirmed .team-legal-status a.common-a {
    background-position: 0 -51px;
  }

  .project-item._check-unsucceed .project-legal-status a.common-a,
  .project-item._apply-deny .project-legal-status a.common-a,
  .team-info-card-type1._check-unsucceed .team-legal-status a.common-a,
  .team-info-card-type1._apply-deny .team-legal-status a.common-a {
    background-position: 0 -101px;
  }
  .team-type-drt .description {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    line-height: 25px;
    text-align: center;
    color: #fff;
    z-index: 1;
  }
  .team-type-drt {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 25px;
    background-color: #555555;
    font-size: 14px;
  }
  .color_green {
    background: #4bca88;
    color: #fff;
  }
  .color_yellow {
    background: #f7be11;
    color: #fff;
  }
  .team-info-card-type1 .team-description {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 150px;
    transition: top 0.45s;
    -moz-transition: top 0.45s;
    -webkit-transition: top 0.45s;
    -o-transition: top 0.45s;
    border-top: solid 1px transparent;
    background-color: #555555;
  }
  .text-not-overflow {
    overflow: hidden;
    word-wrap: break-word;
  }
  .team-info-card-type1 .team-description .content p.body-text[data-v-8b816ac0] {
    text-indent: 2em;
    padding-top: 5px;
    font-family: "\5B8B\4F53";
    height: 95px;
  }
  .el-select {
    margin-left: 8px;
  }
  .el-pagination {
    text-align: center;
  }
</style>