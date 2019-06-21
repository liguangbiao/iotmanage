<template>
  <div class="assignWork">
    <div class="title">布置作业</div>
    <div class="Work_btn">
      <el-row>
        <el-button type="primary" @click="ManageGroup">管理小组</el-button>
        <el-button type="warning" @click="AddWork">添加作业</el-button>
      </el-row>
    </div>
    <div class="Work_list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="50"></el-table-column>
        <el-table-column prop="missionName" label="名称" width="180"></el-table-column>
        <el-table-column prop="teamName" label="所属工坊"></el-table-column>
        <el-table-column prop="endTime" label="截止日期"></el-table-column>
        <el-table-column prop="hasCommit" label="提交数"></el-table-column>
        <el-table-column label="操作" class="operation">
          <template slot-scope="scope">
            <span @click="HandleAmend(scope.row.id)">修改</span>
            <span @click="HandleGrade(scope.row.id)">评分</span>
            <span @click="HandleDelete(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              v-if="tableData.length >0"
              :page-size="5"
              :pager-count="5"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :total="pageList.allRowNum">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        pageList:{},
        active1:false,
      };
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData() {
        this.axios.post('/teamproject/studytopic/studymissionlist', {
          userId: this.$store.state.user.userId,
          page: 1,
          pageSize: 10
        }).then((res) => {
          this.$set(this.tableData, 'list', res.data.data.pageList.content)
          this.pageList = res.data.data.pageList;
        })
      },
      handleCurrentChange(page){
        this.axios.post('/teamproject/studytopic/studymissionlist', {
          userId: this.$store.state.user.userId,
          page: page,
          pageSize: 10
        }).then((res) => {
          this.$set(this.tableData, 'list', res.data.data.pageList.content)
          this.pageList = res.data.data.pageList;
        })
      },
      ManageGroup() {
        console.log("123");
      },
      AddWork() {
        console.log("123");
        this.$router.push({ name: "addWork" });
      },
      HandleAmend(id) {
        console.log(id);
      },
      HandleGrade(id) {
        console.log(id);
        this.$router.push({ name: "checkGrade" });
      },
      HandleDelete(id) {
        console.log(id);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .assignWork {
    background: #fff;
    .title {
      height: 50px;
      font-size: 24px;
      font-weight: 400;
      color: #333;
      background: #fafafd;
    }
    .Work_btn {
      position: relative;
      .el-row {
        position: absolute;
        top: -45px;
        right: 0;
      }
    }
    .Work_list {
      .cell {
        span {
          display: inline-block;
          cursor: pointer;
          &:nth-of-type(2) {
            color: #1aba43;
            margin: 0 10px;
          }
          &:nth-of-type(1) {
            color: #2f9dea;
          }
          &:nth-of-type(3) {
            color: #ea4545;
          }
        }
      }
    }
  }
</style>
