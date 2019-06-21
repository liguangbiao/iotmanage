<template>
  <div class="Ttem_Pandect">
    <div class="title">项目总览</div>
    <div class="wrap">
<!--      <el-select v-if="resultMap.teamCategoryList" style="width: 120px" v-model="value1" placeholder="工坊类型" @change="change">-->
<!--        <el-option-->
<!--          v-for="item in resultMap.teamCategoryList"-->
<!--          :key="item.id"-->
<!--          :label="item.categoryName"-->
<!--          :value="item.id"-->
<!--        ></el-option>-->
<!--      </el-select>-->
      <el-select v-if="resultMap.teamTypeList" style="width: 130px" v-model="value2" placeholder="项目所属行业" @change="change">
        <el-option
                v-for="item in resultMap.teamTypeList"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-if="resultMap.teamGradeList" style="width: 120px" v-model="value3" placeholder="项目等级" @change="change">
        <el-option
          v-for="item in resultMap.teamGradeList"
          :key="item.id"
          :label="item.gradeName"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-if="resultMap.teamDevDegreeList" style="width: 120px" v-model="value4" placeholder="项目阶段" @change="change">
        <el-option
          v-for="item in resultMap.teamDevDegreeList"
          :key="item.id"
          :label="item.devDegreeName"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input placeholder="请输入关键字" style="width: 130px;margin-left: 8px" v-model="search" @blur="searchFun"></el-input>
      <el-row>
        <el-button type="primary" @click="exp" style="right: 133px;" v-show="$store.state.user.role == 1">导出</el-button>
        <el-button type="primary" @click="handleExport" v-show="$store.state.user.role == 2">增加创业项目</el-button>

      </el-row>
    </div>
    <div class="team_content clearfix" v-if="resData != null">
      <div class="project_item" v-for="item in resData.result" :key="item.id" @click.stop="check_details(item.id)">
        <a href="javascript:;" class="img_container">
          <img :src="item.imgAddress">
        </a>
        <div class="right">
          <strong class="project_name">
            <a class="common-a" href="javascript:;" title="无人机研发">{{item.teamName}}</a>
          </strong>
          <div class="information _1">
            <span>现代服务</span>
            <span>未注册</span>
          </div>
          <div class="intro">{{item.description}}</div>
        </div>
        <span class="decorate status-4">{{item.typeName}}</span>
      </div>

<!--      <div class="project_item">-->
<!--        <a href="javascript:;" class="img_container">-->
<!--          <img src="../../assets/images/123.png">-->
<!--        </a>-->
<!--        <div class="right">-->
<!--          <strong class="project_name">-->
<!--            <a class="common-a" href="javascript:;" title="无人机研发">无人机研发</a>-->
<!--          </strong>-->
<!--          <div class="information _1">-->
<!--            <span>现代服务</span>-->
<!--            <span>未注册</span>-->
<!--          </div>-->
<!--          <div class="intro">跨学院、多学科交叉运营的工坊，工坊成员来自物理、自动化、机电、信息、计算机、材料、数学等八个学院，共有32人</div>-->
<!--        </div>-->
<!--        <span class="decorate status-4">高新技术企业</span>-->
<!--      </div>-->
    </div>
    <div style="float: left;width: 100%;padding-bottom: 30px">
      <el-pagination
              v-if="resData != null"
              :page-size="10"
              :pager-count="5"
              layout="prev, pager, next"
              :current-page="page"
              @current-change="handleCurrentChange"
              :total="resData.allRowNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import {fileUrl} from '../../utils/baseUrl'
  export default {
    name: "innovativeTeam",
    data() {
      return {
        value1:null,
        value2:null,
        value3:null,
        value4:null,
        search: "",
        resultMap:[],
        resData:null,
        page:1,
      };
    },
    created() {},
    mounted() {
      this.getData().then(()=>{
        // this.value1 = this.resultMap.teamCategoryList[0].id;
        // this.value2 = this.resultMap.teamTypeList[0].id;
        // this.value3 = this.resultMap.teamGradeList[0].id;
        // this.value4 = this.resultMap.teamDevDegreeList[0].id;
          this.axios.post('/teamproject/project/projectlist',{
              userId:this.$store.state.user.userId,
              searchKey:this.search,
              typeId:-1,
              gradeId:-1,
              devDegreeId:-1,
              page:1,
              pageSize:10,
          }).then((res) => {
              console.log(res)
              this.resData = res.data.data.calcPage;
          })
      });
    },
    methods: {
      getData(){
        return new Promise((resolve, reject) => {
          this.axios.post('/teamproject/project/projecttypeclass',{
            userId:this.$store.state.user.userId,
          }).then((res)=>{
            this.$set(this.resultMap,'teamCategoryList',res.data.data.resultMap.teamCategoryList);
            this.$set(this.resultMap,'teamTypeList',res.data.data.resultMap.teamTypeList);
            this.$set(this.resultMap,'teamGradeList',res.data.data.resultMap.teamGradeList);
            this.$set(this.resultMap,'teamDevDegreeList',res.data.data.resultMap.teamDevDegreeList);
            resolve();
          }).catch(()=>{
            reject();
          })
        })
      },
      getData1(){
        this.axios.post('/teamproject/project/projectlist',{
            userId:this.$store.state.user.userId,
            searchKey:this.search,
            typeId:this.value2 != null?this.value2:-1,
            gradeId:this.value3 != null?this.value3:-1,
            devDegreeId:this.value4 != null?this.value4:-1,
          page:1,
          pageSize:10,
        }).then((res) => {
          console.log(res)
          this.resData = res.data.data.calcPage;
        })
      },
      change(){
        this.getData1();
      },
      handleCurrentChange(page){
        this.axios.post('/teamproject/project/projectlist',{
          userId:this.$store.state.user.userId,
          searchKey:this.search,
            typeId:this.value2 != null?this.value2:-1,
            gradeId:this.value3 != null?this.value3:-1,
            devDegreeId:this.value4 != null?this.value4:-1,
          page:page,
          pageSize:10,
        }).then((res) => {
          this.resData = res.data.data.calcPage;
        })
      },
      handleExport() {
        this.$router.push({path:'/newPro'})
      },
      check_details(id) {
        // this.$router.push({ baseUrl:`/index/teamDetail/${id}`})
        this.$router.push({
          name:'proDetail',
          params:{
            id:id
          }
        })
      },
        exp(){
            this.axios.get('/teamproject/common/exportproject',{
                params:{
                    searchStr:'',
                    typeId:this.value2 != null?this.value2:-1,
                    gradeId:this.value3 != null?this.value3:-1,
                    devDegreeId:this.value4 != null?this.value4:-1,
                }
            }).then(res => {
                let down = document.createElement('a');
                down.href = fileUrl+res.data.data.file;
                down.download = res.data.data.name;
                down.click();
            })
        },
        searchFun(){
          this.getData1();
        }
    }
  };
</script>

<style lang="scss" scoped>
  .Ttem_Pandect {
    background: #fff;
  }
  .title {
    display: block;
    height: 50px;
    font-size: 24px;
    font-weight: 400;
    color: #333;
    background: #fafafd;
  }
  .wrap {
    border-bottom: solid 1px #d3dce6;
    background: #fff;
    padding: 12px 13px 0;
    position: relative;
    .el-select {
      margin-right: 10px;
    }
    .el-input__inner {
      height: 42px;
    }
    .el-button {
      position: absolute;
      right: 0;
      top: -35px;
      height: 34px;
      line-height: 10px;
      width: 128px;
    }
  }
  .team_content {
    background: #fff;
    .project_item {
      position: relative;
      width: 460px;
      height: 150px;
      padding: 13px 12px;
      background-color: #fff;
      border: solid 1px #ccc;
      float: left;
      overflow: hidden;
      margin: 33px 0px 10px 3px;
      cursor: pointer;
      .img_container {
        display: block;
        width: 224px;
        height: 150px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 222px;
        height: 150px;
        margin-left: 12px;
        padding-top: 3px;
        float: left;
        .project_name {
          display: block;
          font-weight: normal;
          height: 40px;
          overflow: hidden;
          word-wrap: break-word;
        }
        .information {
          height: 20px;
          margin-top: 3px;
          overflow: hidden;
          > span {
            margin-right: 7px;
            padding: 0 10px;
            font-size: 12px;
            color: #3b4953;
            background-color: #ebeced;
          }
        }
        .intro {
          font-size: 13px;
          color: #768087;
          margin-top: 9px;
          height: 72px;
          line-height: 18px;
          overflow: hidden;
          word-wrap: break-word;
        }
      }
      .decorate {
        position: absolute;
        top: 0;
        right: 0;
        width: 56px;
        background-color: #4bca88;
        color: #fff;
        height: 24px;
        line-height: 24px;
        background-image: none;
        font-size: 12px;
        text-align: center;
      }
      .status-4 {
        background-position: -151px -151px;
      }
    }
  }
</style>