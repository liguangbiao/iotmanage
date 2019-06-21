<template>
  <div class="joinTeam">
    <div class="title">招聘信息</div>
    <div class="warp">
      <div class="warp_top">
        <el-select v-model="value" style="width: 110px" placeholder="职位类型" @change="HandleOption">
          <el-option
            v-for="DutyItem in DutyTpyeData"
            :key="DutyItem.id"
            :label="DutyItem.orgName"
            :value="DutyItem.id"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入团队名称/职位名称"
          style="width: 185px; margin-left: 8px;"
          v-model="keyword"
          @change="HandleSearch"
        ></el-input>
      </div>
      <div class="warp_list">
        <el-table :data="tableData" border style="width: 100%;  text-align: center;">
          <el-table-column prop="teamName" label="团队名称" width="180"></el-table-column>
          <el-table-column prop="positionName" label="职位名称" width="180"></el-table-column>
          <el-table-column prop="positionCnt" label="招聘人数"></el-table-column>
          <el-table-column prop="orgName" label="职位类型"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看职位</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        :total="total"
        @current-change="HandleCurrent_change"
      ></el-pagination>
      <el-dialog title="职位详情" :visible.sync="dialogVisible" width="42%" height="50%">
        <div class="job_details">
          <p>
            <span>名称:</span>
            <span>{{dutyDetails.positionName}}</span>
          </p>
          <p>
            <span>人数:</span>
            <span>{{dutyDetails.positionCnt}}</span>
          </p>
          <p>
            <span>类型:</span>
            <span>{{dutyDetails.orgId}}</span>
          </p>
          <p>
            <span>工坊:</span>
            <span>创业17</span>
          </p>
          <p>
            <span>负责人:</span>
            <span>测试学生1</span>
          </p>
          <p>
            <span>职位描述:</span>
            <span v-html="dutyDetails.positionName"></span>
          </p>
          <p class="details_text">
            <span>申请理由:</span>
            <textarea v-model="textarea"></textarea>
          </p>
          <p class="details_upload">
            <span>上传简历：</span>
            <span>
              <el-upload
                ref="upload"
                class="upload-demo"
                :limit="1"
                :on-change="HandleChange"
                :http-request="uploadSectionFile"
                :show-file-list="true"
                action="string"
              >
                <el-button size="small" type="success">上传简历</el-button>
                <div slot="tip" class="el-upload__tip">请上传doc、docx或图片文件,大小不超过10M</div>
              </el-upload>
            </span>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleCofirm" style="padding:15px 40px;">申请职位</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        options: [],
        value: "",
        keyword: "",
        tableData: [], //职位列表
        textarea: "",
        fileList: undefined, //文件上传
        uploadFilename: null,
        DutyTpyeData: [],
        pagesize: 5, //每页的数据条数
        currentPage: 1, //默认开始页面
        total: 100, //总条数
        dutyDetails: [],
        Datetype: undefined,
        formData: undefined
      };
    },
    watch: {},
    mounted() {
      this.initDutyTpyeData();
      this.initPositionList(this.currentPage);
    },
    methods: {
      initDutyTpyeData() {
        this.axios.get("/team/position/arch").then(res => {
          if (res.data.code == 200) {
            this.DutyTpyeData = res.data.data.teamOrgArchBeanList;
          }
        });
      },
      initPositionList(currentPage) {
        let data = {
          orgId: -1,
          searchName: "",
          page: currentPage,
          pageSize: this.pagesize
        };
        this.axios.get("/team/position/list", { params: data }).then(res => {
          if (res.data.code == 200) {
            console.log(res);
            this.Datetype = 1;
            this.tableData = res.data.data.result;
            this.total = res.data.data.allRowNum;
          }
        });
      },
      HandleOption(Val) {
        this.value = Val;
        this.SearchResult(Val, this.keyword);
      },
      HandleSearch(val) {
        this.keyword = val;
        if (this.value == "") {
          this.SearchAll_Result(val);
        } else {
          this.SearchResult(this.value, val);
        }
      },
      SearchResult(orgId, keyword) {
        let data = {
          orgId: orgId,
          searchName: keyword,
          page: this.currentPage,
          pageSize: this.pagesize
        };
        this.axios.get("/team/position/list", { params: data }).then(res => {
          if (res.data.code == 200) {
            this.Datetype = 2;
            this.tableData = res.data.data.result;
            this.total = res.data.data.allRowNum;
          }
        });
      },
      SearchAll_Result(keyword) {
        let data = {
          orgId: -1,
          searchName: keyword,
          page: this.currentPage,
          pageSize: this.pagesize
        };
        this.axios.get("/team/position/list", { params: data }).then(res => {
          if (res.data.code == 200) {
            this.Datetype = 2;
            this.tableData = res.data.data.result;
            this.total = res.data.data.allRowNum;
          }
        });
      },
      HandleCurrent_change(ValPage) {
        switch (this.Datetype) {
          case 1: {
            this.initPositionList(ValPage);
            break;
          }
          case 2: {
            this.initPositionList(ValPage);
            break;
          }
        }
      },
      handleClick(row) {
        this.dialogVisible = true;
        this.axios
          .get("/team/position/detail", {
            params: {
              positionId: row.id
            }
          })
          .then(res => {
            if (res.data.code == 200) console.log(res);
            this.dutyDetails = res.data.data;
          });
      },
      HandleChange() {},
      uploadSectionFile(params) {
        this.fileList = params.file;
        if (this.fileList.size > 10240 * 1024) {
          this.$message.error("文件的大小不能超过10M");
          return false;
        }
      },
      handleCofirm() {
        let data = new FormData();
        data.append("resume", this.fileList);
        data.append("teamId", this.dutyDetails.teamId);
        data.append("positionId", this.dutyDetails.id);
        data.append("remark", this.textarea);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data" ,
          }
        };
        // let str = Math.round(new Date().getTime()/1000) + '&appId='+'innovate-v2'+'a6e1f81461204ae8b64665fe04d4eef1';
        // let xhr = new XMLHttpRequest();
        // xhr.open("post","http://api.test.chuangfeigu.com/teamapi/team/position/apply",true)
        // xhr.withCredentials=true;
        // xhr.setRequestHeader("appId","innovate-v2")
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
        // xhr.setRequestHeader('t', Math.round(new Date().getTime()/1000))
        // xhr.setRequestHeader('token', this.$store.state.user.token)
        // xhr.setRequestHeader('sign', md5(str))
        // xhr.send(data)
        this.axios.post("/team/position/apply", data, config).then(res => {
          if (res.data.code == 200) {
            this.textarea = "";
            this.dialogVisible = false;
            this.fileList = undefined;
            this.$message({
              message: "申请成功！",
              type: "success"
            });
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .joinTeam {
    background: #fff;
    box-sizing: border-box;

    .title {
      display: block;
      height: 50px;
      font-size: 24px;
      font-weight: 400;
      color: #333;
      background: #fafafd;
    }
    .warp {
      padding: 17px 18px;
      .warp_top {
        border-bottom: 1px solid #d3dce6;
        .el-select {
          display: inline-block;
        }
      }
      .warp_list {
        margin-top: 15px;
        margin-bottom: 48px;
        .el-table .cell {
          text-align: center;
        }
        .el-table th > .cell {
          text-align: center;
        }
      }
      .pagination {
        span {
          display: inline-block;
          margin-right: 15px;
          &:nth-of-type(1) {
            width: 30px;
            height: 30px;
            background: #337ab7;
            color: #fff;
            text-align: center;
            line-height: 30px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .job_details {
    p {
      padding: 8px 0;
      position: relative;
      span {
        &:nth-of-type(1) {
          display: inline-block;
          width: 76px;
          color: #999;
          text-align: right;
        }
        &:nth-of-type(2) {
          margin-left: 10px;
        }
      }
    }
    .details_text {
      padding-left: 88px;
      position: relative;
      > span {
        position: absolute;
        top: 8px;
        left: 0;
      }
      textarea {
        width: 100%;
        height: 106px;
        box-sizing: border-box;
        display: block;
        resize: none;
        border: solid 1px #ccc;
        border-radius: 4px;
        padding: 5px;
        outline: 0;
      }
    }
    .details_upload {
      > span {
        vertical-align: top;
      }
    }
  }
  .el-table_3_column_14 {
    cursor: pointer;
  }
  .dialog-footer {
    text-align: center;
  }
</style>

