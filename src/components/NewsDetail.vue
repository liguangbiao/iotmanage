<template>
  <el-dialog title="团队动态" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
    <div class="modal-body">
      <div class="modal-body-head" v-if="NewsdDetailData.DetailData != undefined">
        <p>标题：{{NewsdDetailData.DetailData.newsName}}</p>
        <span>发布时间：{{NewsdDetailData.DetailData.createDate}}</span>
      </div>
      <div v-if="NewsdDetailData.DetailData != undefined">
        <p>详情：</p>
        <p v-html="NewsdDetailData.DetailData.newsInstructor"></p>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      msg: {
        type: Number
      }
    },
    data() {
      return {
        dialogVisible: true,
        NewsdDetailData:[]
      };
    },
    computed: {},
    mounted() {
      this.initNewsdDetail()
    },
    methods: {
      initNewsdDetail() {
        this.axios.get("/teamproject/common/getteamnew",{params:{newId:this.msg}}).then(res =>{
          if(res.data.code == 200) {
            this.$set(this.NewsdDetailData,"DetailData",res.data.data)
          }
        })
      },
      handleClose() {
        this.dialogVisible = false;
        this.$emit("OnClose", false);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .modal-body {
    position: relative;
    overflow: auto;
    max-height: 500px;
    >div {
      >p {
        margin: 0 0 10px;
      }
    }
    .modal-body-head {
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
      p {
        margin: 0 0 10px;
        line-height: 30px;
      }
    }
  }
</style>
