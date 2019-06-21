<template>
  <div class="Data_collection">
    <div class="data_statistios">
      <div class="title">数据补录</div>
      <div class="sreach">
        <i class="el-icon-search" @click="HandleSreach"></i>
        <input class type="text" placeholder="工坊搜索" v-model="sreach" @blur="getData(1)">
        <el-row>
<!--          <el-button class="primary" @click="handleExport">导出数据</el-button>-->
          <el-button type="danger" class="el-danger" @click="handleAdd('/newTeam')">+ 添加工坊</el-button>
          <el-button type="danger" class="el-danger" @click="handleAdd('/newPro1')">+ 添加项目</el-button>
        </el-row>
      </div>
      <el-table v-if="res.data" :data="res.data.result" style="width: 100%">
        <el-table-column prop="" label="工坊类别" width="120">
          <template slot-scope="scope">
            <span style="padding-left: 10px">{{scope.row.teamCategory == 1? "工坊":"项目"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teamName" label="工坊名称" width="200"></el-table-column>
        <el-table-column prop="startTime" label="工坊创建时间"></el-table-column>
        <el-table-column prop="typeName" label="行业领域"></el-table-column>
<!--        <el-table-column prop="chargeUserName" label="负责人"></el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 4" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row.id)"></el-button>
            <el-button v-if="scope.row.status == 4" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row.teamCategory,scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              v-if="res.data"
              @current-change="handleCurrentChange1"
              :page-size="10"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="res.data.allRowNum">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        sreach: "",
        input: "",
        res:[],
        page:1,
      };
    },
    created() {},
    mounted() {
      this.getData(1);
    },
    methods: {
      getData(page){
        this.axios.post('/teamproject/manage/getaddteamlist',{
          userId:this.$store.state.user.userId,
          searchKey:this.sreach,
          teamCategory:-1,
          page:page,
          pageSize:10
        }).then(res => {
          this.$set(this.res,'data',res.data.data.myTeamMap)
        })
      },
      handleCurrentChange1(page){
        this.page = page;
        this.getData(page)
      },
      HandleSreach() {
        console.log("123");
      },
      handleExport() {
        console.log("123");
      },
      handleAdd(path) {
        this.$router.push({path:path})
      },
      handleDelete(id) {
        this.$confirm("是否删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
              this.axios.post('/teamproject/manage/deleteteam',{
                  userId:this.$store.state.user.userId,
                  teamId:id
              }).then(res => {
                  if(res.data.code == 200){
                      this.$message({
                          type: "success",
                          message: "删除成功!"
                      });
                      this.getData(this.page);
                  }
              })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      handleEdit(type,id) {
        if(type == 1){
          this.$router.push({path:`/editTeam/${id}`})
        }else if(type == 2){
          this.$router.push({path:`/editPro/${id}`})
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .Data_collection {
    background: #fff;
  }
  .data_statistios {
    background-color: #FAFAFD;
    .title {
      height: 50px;
      font-size: 24px;
      font-weight: 400;
      color: #333;
      background: #fafafd;
    }
    .sreach {
      width: 100%;
      height: 32px;
      background: #fff;
      position: relative;
      padding: 10px 0;
      margin-bottom: 8px;
      i {
        position: absolute;
        top: 20px;
        left: 30px;
        cursor: pointer;
      }
      input {
        margin-left: 20px;
        text-indent: 2em;
        width: 50%;
        height: 35px;
        outline-color: invert;
        outline-style: none;
        outline-width: 0px;
        border: none;
      }
      .primary {
        position: absolute;
        right: 224px;
        top: -47px;
        height: 52px;
        border:none;
        color:#409EFF;
      }
      .el-danger {
        position: absolute;
        top: -46px;
        right: 112px;
        height: 50px;
        background: #ff6026;
        &:last-child{
          right: 0;
        }
      }
    }
  }
</style>

