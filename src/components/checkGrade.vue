<template>
  <div class="chekGrade">
    <div class="title">
      <span @click="goback">布置作业</span>
      <span>>查看评分</span>
    </div>
    <div class="work_num">
      <div class="num">
        <span>3/3</span>
        <span>作业已收齐</span>
      </div>
    </div>
    <div class="work_list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column label="作业">
          <template slot-scope="scope">
            <span @click="HandleCheck(scope.$index)">{{scope.row.work}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="提交时间 " width="120"></el-table-column>
        <el-table-column prop="group" label="所属小组" width="120"></el-table-column>
        <el-table-column prop="grade" label=" 评分">
          <el-rate v-model="value2" :colors="colors"></el-rate>
        </el-table-column>
        <el-table-column prop="remark" label="评语"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            name: "王小虎",
            work: "第一次作业文件.doc",
            date: "2016-05-02",
            group: "第一小组",
            remark: " 做的不错，希望今后继续努力"
          },
          {
            name: "王小虎",
            work: "第一次作业文件.doc",
            date: "2016-05-02",
            group: "第一小组",
            remark: " 做的不错，希望今后继续努力"
          },
          {
            name: "王小虎",
            work: "第一次作业文件.doc",
            date: "2016-05-02",
            group: "第一小组",
            remark: " 做的不错，希望今后继续努力"
          },
          {
            name: "王小虎",
            work: "第一次作业文件.doc",
            date: "2016-05-02",
            group: "第一小组",
            remark: " 做的不错，希望今后继续努力"
          }
        ],
        value2: null,
        colors: ["#99A9BF", "#F7BA2A", "#FF9900"] // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      };
    },
    created() {},
    mountedL() {},
    methods: {
      goback() {
        this.$router.push({
          name: "assignWork"
        });
      },
      HandleCheck(id) {
        console.log(id);
      }
    }
  };
</script>
<style>
</style>

<style lang="scss" scoped>
  .chekGrade {
    background: #fff;
    .title {
      height: 50px;
      color: #333;
      background: #fafafd;
      span {
        &:nth-of-type(1) {
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
    .work_num {
      position: relative;
      .num {
        position: absolute;
        top: -28px;
        right: 0;
        span {
          font-size: 20px;
          color: #999;
          &:nth-of-type(1) {
            margin-right: 10px;
          }
        }
      }
    }
    .work_list {
      .cell {
        > span {
          cursor: pointer;
          color: #32aafc;
        }
      }
    }
  }
</style>
