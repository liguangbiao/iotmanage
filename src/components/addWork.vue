<template>
  <div class="addWork">
    <div class="title">
      <span @click="goback">布置作业</span>
      <span>>添加作业</span>
    </div>
    <div class="homework">
      <div class="work_assin_box">
        <ul class="work_assin_flow clearfix" ref="work_assin_flow">
          <li class="active_select">
            <span>1.编辑作业内容</span>
          </li>
          <li>
            <span>2.设置分组</span>
          </li>
          <li>
            <span>3.完成</span>
          </li>
          <!-- <li v-for="(item,index) in title" :key="index">
            <span>{{item}}</span>
          </li>-->
        </ul>
      </div>
      <div class="assin_Edit">
        <!-- 1、编辑作业内容 -->
        <div class="homework_edit" ref="homework_edit">
          <div class="work_edit_content">
            <div class="work_edit">
              <span>作业名称</span>
              <input type="text" value="第五期作业">
            </div>
            <div class="work_edit">
              <span>所属工坊</span>
              <el-select v-if="resultMap.teamList" style="width: 288px" v-model="value2" placeholder="工坊列表">
                <el-option
                        v-for="item in resultMap.teamList"
                        :key="item.teamId"
                        :label="item.teamName"
                        :value="item.teamId"
                ></el-option>
              </el-select>
            </div>
            <div class="work_edit">
              <span>截止日期</span>
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="请选择日期时间"
                style="width:288px;"
              ></el-date-picker>
              <span class="iconfont iconxiajiantou"></span>
            </div>
            <div class="work_edit clearfix">
              <span class="homework_detail fl">作业详情</span>
              <textarea class="fl" name id cols="30" rows="10" v-model="textarea"></textarea>
            </div>
            <div class="work_edit">
              <span class="reference_data">参考资料</span>
              <div class="zil_ckao">
                <span>Python基础知识讲解1.MP4</span>
                <span>删除</span>
              </div>
            </div>
            <div class="work_edit">
              <span class="continue_add">继续添加</span>
              <input type="file" name class="file_input" title>
            </div>
            <span class="next_buttom" @click="HandleNext">下一步</span>
          </div>
        </div>
        <!-- 2、设置分组 -->
        <div class="grouping_sets" style="display:none" ref="grouping_sets">
          <div class="sets_btns" ref="sets_btns">
            <p>是否需要分组布置作业？</p>
            <span class="sets_group" @click="HandleSets_group">设置分组</span>
            <span class="not_group" @click="HandleNot_group">不分组</span>
          </div>
          <div class="sets_group_list" style="display:none;" ref="sets_group_list">
            <div class="grouping_title" ref="grouping_title">
              <span class="active" @click.stop="HandleUnabsorbed">未分配(120)</span>
              <span @click.stop="HandleGroup_List">小组(05)</span>
            </div>
            <div class="demo">
              <!-- 未分配 -->
              <div ref="grouping_content">
                <div class="grouping_content">
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="school" label="学校" width="180"></el-table-column>
                    <el-table-column prop="college" label="学院"></el-table-column>
                    <el-table-column prop="specialty" label="专业"></el-table-column>
                    <el-table-column prop="grade" label="年级"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <span @click="HandleAllot(scope.$index, scope.row)" class="HandleAllot">分配</span>
                      </template>
                    </el-table-column>
                   
                  </el-table>
                   <!-- 弹窗 -->
                  <div class="allocation" ref="allocation">
                      <div class="add_top">
                        <input type="text" value class="add_input">
                        <span class="add_grouping">新建分组</span>
                      </div>
                      <div class="grouping_list">
                        <span class="group_edit" style="display: block;">第一小组</span>
                        <div class="grouping_renewal" style="display: none;">
                          <input type="text" value="第一小组" class="renewal_input">
                          <span id="comfig">确定</span>
                        </div>
                      </div>
                  </div>
                  <!-- <el-dialog :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="活动名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                        <el-row>
                          <el-button plain>朴素按钮</el-button>
                        </el-row>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                  </el-dialog> -->
                </div>
                <div class="grouping_info"></div>
                <!-- page -->
                <div class="pagination_box">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="1"
                    layout="total, prev, pager, next"
                    :total="10"
                    style="text-align:center;"
                  ></el-pagination>
                </div>
                <div class="grouping_select">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <el-checkbox v-model="checked"></el-checkbox>
                        </td>
                        <td>
                          已选:
                          <span>21</span>
                        </td>
                        <td>自动分组</td>
                        <td>手动分组</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="grouping_btn">
                  <span class="last_step" @click="Handlelast_step">上一步</span>
                  <span class="finish" @click="Handlefinish">完成</span>
                </div>
              </div>
              <!-- 小组 -->
              <div style="display:none;" ref="group_data">
                <div class="group_data">
                  <ul class="clearfix">
                    <li v-for="(itemGroup,index) in group_data" :key="'A'+index">
                      <div class="dot" @click="HandleDissolve(index)">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div class="info_top">
                        <div class="group_numInfo">
                          <span>{{itemGroup.name}}</span>
                          <span>{{itemGroup.num}}人</span>
                        </div>
                      </div>
                      <div class="info_bottom">
                        <div class="group_dataInfo">
                          <span>组长</span>
                          <span>{{itemGroup.zuname}}</span>
                          <div class="info_btn">
                            <span>查看组员</span>
                            <span>管理组员</span>
                          </div>
                        </div>
                      </div>
                      <!-- 弹窗 -->
                      <div class="dissolve_btn" ref="dissolve_btn">
                        <span>解散群组</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="group_data_btns">
                  <span class="last_step" @click="Handlelast_step">上一步</span>
                  <span class="finish" @click="Handlefinish">完成</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 3、完成 -->
        <div class="accomplish" style="display:none" ref="accomplish">
          <div class="img">
            <img src="../assets/images/ok.png" alt class="finish_ok">
          </div>
          <p class>
            作业添加完成，
            <a href="javascript:;">继续添加</a>？
          </p>
          <p class="goback_worklist">
            <a href="javascript:;">返回作业列表</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        resultMap:[],
        //
        workNext: false,
        finish: false,
        setting: false,
        value1: "",
        textarea:
          "2009年12月15日，港珠澳大桥正式开工建设。2018年10月24日，港珠澳大桥正式通车。一座大桥，连接三座城市：香港、澳门、珠海。三座城市有着不同故事和发展境界，同样有着进一步发展的要求。如何在更高层次上进一步发展，三座城市面临着不同的问题，珠三角整体发展也面临着结构调整的难题。在这个背景下，需要港珠澳大桥来打通区域经济发展的瓶颈。在港珠澳大桥的建设过程中，建设者们充分考虑了台风、航运、海事安全、环保、景观、航运管制等诸多难题。港珠澳大桥是科技工程，也是人心工程，大桥每一个节点的进展、每一次攻关、每一次创新，都蕴含着可经受历史考验的中国工匠精神。",
        title: [""],
        grouptitle: ["未分配", "小组"],
        group_data: [
          {
            id:1,
            name: "第一小组",
            num: 52,
            zuname: "饭碗那么大"
          },
          {
            id:2,
            name: "第一小组",
            num: 52,
            zuname: "饭碗那么大"
          },
          {
            id:3,
            name: "第一小组",
            num: 52,
            zuname: "饭碗那么大"
          }
        ],
        tableData: [
          {
            id:1,
            name: "张宁远",
            school: "华南理工大学",
            college: "计算机学院",
            specialty: "信息技术专业",
            grade: "15级"
          },
          {
            id:2,
            name: "张宁远",
            school: "华南理工大学",
            college: "计算机学院",
            specialty: "信息技术专业",
            grade: "15级"
          },
          {
            id:3,
            name: "张宁远",
            school: "华南理工大学",
            college: "计算机学院",
            specialty: "信息技术专业",
            grade: "15级"
          }
        ],
        checked: true,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        active: ["color: #32aafc", "border-bottom: 1px solid #2ba9ff"],
        dissolve_btn: "",
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        formLabelWidth: "120px"
      };
    },
    mounted(){
      this.axios.post('/teamproject/studytopic/workshoplistforstudymission',{userId:this.$store.state.user.userId})
              .then((res)=>{
               this.$set(this.resultMap,'teamList',res.data.data.teamList)
               console.log(this.resultMap.teamList)
              })
    },
    methods: {
      goback() {
        this.$router.push({
          name: "assignWork"
        });
      },
      handleSelectionChange() {},
      HandleNext() {
        this.$(this.$refs.homework_edit).hide();
        this.$(this.$refs.work_assin_flow)
          .children("li")
          .eq(0)
          .removeClass("active_select");
        this.$(this.$refs.work_assin_flow)
          .children("li")
          .eq(1)
          .addClass("active_select");
        this.$(this.$refs.grouping_sets).show();
      },
      HandleSets_group() {
        this.$(this.$refs.sets_btns).hide();
        this.$(this.$refs.sets_group_list).show();
      },
      HandleNot_group() {
        this.$(this.$refs.grouping_sets).hide();
        this.$(this.$refs.work_assin_flow)
          .children("li")
          .eq(1)
          .removeClass("active_select");
        this.$(this.$refs.work_assin_flow)
          .children("li")
          .eq(2)
          .addClass("active_select");
        this.$(this.$refs.accomplish).show();
      },
      Handlelast_step() {
        this.$(this.$refs.sets_group_list).hide();
        this.$(this.$refs.sets_btns).show();
      },
      Handlefinish() {
        this.$(this.$refs.grouping_sets).hide();
        this.$(this.$refs.work_assin_flow)
          .children("li")
          .eq(1)
          .removeClass("active_select");
        this.$(this.$refs.work_assin_flow)
          .children("li")
          .eq(2)
          .addClass("active_select");
        this.$(this.$refs.accomplish).show();
      },
      HandleAllot(index, row) {
        console.log(index, row);
        this.dialogFormVisible = true;
        this.$(this.$refs.allocation).eq(index).toggle()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      HandleUnabsorbed() {
        this.$(this.$refs.grouping_title)
          .children("span")
          .eq(0)
          .addClass("active");
        this.$(this.$refs.grouping_title)
          .children("span")
          .eq(1)
          .removeClass("active");
        this.$(this.$refs.grouping_content).show();
        this.$(this.$refs.group_data).hide();
      },
      HandleGroup_List() {
        this.$(this.$refs.grouping_title)
          .children("span")
          .eq(0)
          .removeClass("active");
        this.$(this.$refs.grouping_title)
          .children("span")
          .eq(1)
          .addClass("active");
        this.$(this.$refs.grouping_content).hide();
        this.$(this.$refs.group_data).show();
      },
      HandleDissolve(index) {
        console.log(index);
        this.$(this.$refs.dissolve_btn)
          .eq(index)
          .toggle();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .addWork {
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
    .work_assin_box {
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
    }

    .work_assin_flow {
      width: 50%;
      margin: 0 auto;

      li {
        float: left;
        height: 56px;
        line-height: 56px;
        cursor: pointer;

        &:nth-of-type(2) {
          margin: 0 97px;
        }
      }

      li.active {
        color: #bacad4;
      }

      li.active_select {
        color: #32aafc;
        border-bottom: 2px solid #32aafc;
      }
    }

    .workList_title {
      border-bottom: 1px solid #e5e5e5;

      ul {
        li {
          float: left;
          width: 17%;
          height: 48px;
          line-height: 48px;
          font-weight: bold;

          &:nth-of-type(1) {
            width: 5%;
            text-align: center;
          }

          &:nth-of-type(2) {
            width: 22%;
          }

          &:nth-of-type(3) {
            width: 22%;
          }
        }
      }
    }

    .workList_content {
      li {
        border-bottom: 1px solid #e5e5e5;

        > span {
          float: left;
          padding: 24px 0;
          width: 16%;

          &:nth-of-type(1) {
            width: 5%;
            text-align: center;
          }

          &:nth-of-type(2) {
            width: 22%;
          }

          &:nth-of-type(3) {
            width: 22%;
          }
        }

        .operation {
          display: inline-block;
          width: 16%;
          padding: 24px 0;

          span {
            cursor: pointer;

            &:nth-of-type(1) {
              color: #2f9dea;
            }

            &:nth-of-type(2) {
              color: #1aba43;
              margin: 0 10px;
            }

            &:nth-of-type(3) {
              color: #ea4545;
            }
          }
        }
      }
    }
    .homework {
      height: 830px;
    }
    // 编辑作业内容
    .homework_edit {
      .work_edit_content {
        width: 70%;
        margin: 0 auto;

        > div {
          &:nth-of-type(1) {
            padding-top: 36px;
          }

          &:nth-of-type(4) {
            padding-bottom: 20px;
          }
        }

        .work_edit {
          padding-top: 14px;
          position: relative;

          > span {
            color: #666;
            padding-right: 12px;

            &.iconxiajiantou {
              position: absolute;
              top: 25px;
              left: 330px;
              padding: 0;
            }
          }

          .homework_detail {
          }

          input {
            width: 286px;
            height: 36px;
            border-radius: 3px;
            border: 1px solid #eeeced;
            text-indent: 10px;
          }

          input[value] {
            color: #666;
          }

          textarea {
            display: inline-block;
            width: 572px;
            height: 200px;
            text-align: justify;
            padding: 8px;
            line-height: 22px;
            color: #666;
          }

          .reference_data {
            display: inline-block;
          }

          .zil_ckao {
            position: absolute;
            top: -14px;
            left: 68px;
            display: block;
            width: 286px;
            height: 36px;
            line-height: 36px;
            border: 1px solid #eeeced;
            position: relative;
            padding: 0 10px;
            margin-bottom: 3px;

            span {
              color: #666;

              &:nth-of-type(2) {
                position: absolute;
                right: 10px;
                color: red;
                cursor: pointer;
              }
            }
          }

          .continue_add {
            padding: 0;
            display: block;
            width: 286px;
            height: 36px;
            border: 1px dashed #2ba9ff;
            text-align: center;
            line-height: 36px;
            color: #2ba9ff;
            margin-top: 16px;
            margin-left: 70px;
            cursor: pointer;
          }

          .file_input {
            position: absolute;
            top: 30px;
            left: 72px;
            opacity: 0;
            cursor: pointer;
          }
        }

        .next_buttom {
          display: block;
          width: 98px;
          height: 36px;
          line-height: 36px;
          border-radius: 3px;
          background: #32aafc;
          text-align: center;
          color: #fff;
          margin-top: 36px;
          margin-left: 70px;
          cursor: pointer;
        }
      }
    }

    // 设置分组
    .grouping_sets {
      width: 100%;
      margin: 0 auto;

      .sets_btns {
        text-align: center;
        margin-top: 150px;

        p {
          margin-bottom: 70px;
        }

        > span {
          display: inline-block;
          width: 144px;
          height: 36px;
          line-height: 36px;
          border: 1px solid #f1f1f1;
          border-radius: 3px;
          text-align: center;
          cursor: pointer;

          &:nth-of-type(2) {
            background: #32aafc;
            color: #fff;
            margin-left: 44px;
          }
        }
      }

      .grouping_title {
        margin-top: 35px;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        border: 1px solid #eeeced;
        margin-bottom: 14px;

        span {
          display: inline-block;
          color: #333;
          padding: 0 10px;
          cursor: pointer;

          &:nth-of-type(2) {
            margin-left: 10px;
          }
        }

        span.active {
          color: #32aafc;
          border-bottom: 1px solid #2ba9ff;
        }
      }
      .grouping_info {
        width: 100%;
      }

      .grouping_select {
        padding: 20px 10px;
        table {
          > tbody {
            tr {
              display: inline;

              td {
                font-size: 14px;

                &:nth-child(1) {
                  width: 28px;
                  text-align: center;
                  position: relative;

                  input[type="checkbox"] {
                    -webkit-appearance: none;
                    vertical-align: middle;
                    margin-top: 0;
                    background: #fff;
                    border: 1px solid #999;
                    border-radius: 3px;
                    min-height: 14px;
                    min-width: 14px;
                  }

                  input[type="checkbox"]:checked {
                    background: #3190e8;
                    border-color: #428bca;
                  }

                  input[type="checkbox"]:checked::after {
                    content: "";
                    top: 4px;
                    left: 9px;
                    position: absolute;
                    background: transparent;
                    border: #fff solid 2px;
                    border-top: none;
                    border-right: none;
                    height: 4px;
                    width: 8px;
                    -moz-transform: rotate(-45deg);
                    -ms-transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                  }
                }

                &:nth-of-type(2) {
                  width: 60px;

                  span {
                    color: #32abff;
                    cursor: pointer;
                  }
                }

                &:nth-of-type(3),
                &:nth-of-type(4) {
                  color: #32abff;
                  width: 80px;
                  cursor: pointer;
                }
              }
            }
          }
        }

        .select_num {
          display: inline-block;
          margin-left: 20px;

          span {
            &:nth-of-type(2) {
              color: #2f9dea;
            }
          }
        }

        .self_motion {
          color: #32abff;
          margin-left: 24px;
        }

        .hand_motion {
          color: #32abff;
          margin-left: 23px;
        }
      }

      .grouping_btn {
        text-align: center;

        .last_step,
        .finish {
          display: inline-block;
          width: 98px;
          height: 36px;
          line-height: 36px;
          border-radius: 3px;
          text-align: center;
          cursor: pointer;
        }

        .last_step {
          border: 1px solid #f1f1f1;
          color: #333;
          margin-right: 18px;
        }

        .finish {
          background: #32aafc;
          color: #fff;
          margin-left: 18px;
        }
      }
    }

    // 小组
    .group_data {
      padding: 41px 38px;

      ul {
        li {
          float: left;
          width: 165px;
          height: 216px;
          border: 1px solid rgba(238, 236, 237, 1);
          border-radius: 3px;
          position: relative;
          margin-right: 45px;
          margin-bottom: 20px;

          &:nth-of-type(4n) {
            margin-right: 0;
          }

          .dot {
            position: absolute;
            top: 6px;
            right: 6px;
            z-index: 10;
            cursor: pointer;

            span {
              display: block;
              width: 7px;
              height: 7px;
              background: #fff;
              border-radius: 50%;
              margin-bottom: 3px;
            }
          }

          .info_top {
            width: 100%;
            height: 124px;
            background: rgba(255, 199, 36, 1);
            border-radius: 3px 3px 0px 0px;
            position: relative;

            .group_numInfo {
              position: absolute;
              width: 80px;
              height: 43px;
              left: 50%;
              top: 50%;
              margin-left: -40px;
              margin-top: -21.5px;

              span {
                display: block;
                text-align: center;
                color: #fff;

                &:nth-of-type(1) {
                  font-size: 20px;
                  margin-bottom: 10px;
                }
              }
            }
          }

          .info_bottom {
            width: 100%;
            height: 86px;

            .group_dataInfo {
              padding: 11px 20px;
              text-align: center;

              > span {
                display: block;
                color: #999;
                font-size: 12px;

                &:nth-of-type(2) {
                  color: #333;
                  font-size: 14px;
                  font-weight: bold;
                  margin-top: 6px;
                  margin-bottom: 14px;
                }
              }

              .info_btn {
                span {
                  width: 54px;
                  height: 18px;
                  display: inline-block;
                  font-size: 12px;
                  text-align: center;
                  line-height: 18px;
                  border: 1px solid rgba(229, 229, 229, 1);
                  border-radius: 2px;
                  color: #999;
                  cursor: pointer;

                  &:nth-of-type(1) {
                    margin-right: 7px;
                  }
                }
              }
            }
          }

          .dissolve_btn {
            position: absolute;
            top: 0;
            right: -86px;
            width: 86px;
            height: 36px;
            line-height: 36px;
            z-index: 10;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(238, 236, 237, 1);
            box-shadow: 0px 4px 4px 0px rgba(188, 205, 217, 0.2);
            border-radius: 3px;
            text-align: center;
            cursor: pointer;
            display: none;
          }
        }
      }
    }

    // 小组按钮
    .group_data_btns {
      text-align: center;

      span {
        display: inline-block;
        width: 98px;
        height: 36px;
        line-height: 36px;
        border-radius: 3px;
        cursor: pointer;

        &:nth-of-type(2) {
          background: rgba(50, 170, 252, 1);
          color: #fff;
          margin-left: 38px;
        }

        &:nth-of-type(1) {
          border: 1px solid rgba(241, 241, 241, 1);
        }
      }
    }
  }
  // 完成
  .accomplish {
    .img {
      width: 80px;
      height: 80px;
      margin: 30% auto 5%;
    }
    .finish_ok {
      width: 100%;
      height: 100%;
    }
    p {
      text-align: center;
      &:nth-of-type(1) {
        padding-bottom: 19px;
        a {
          color: #2ba9ff;
        }
      }
      &:nth-of-type(2) {
        a {
          color: #2ba9ff;
        }
      }
    }
  }
  .HandleAllot {
    color: #32abff;
    cursor: pointer;
  }
  .pagination_box {
    border-bottom: 1px solid #eeeced;
    text-align: center;
    .el-pagination {
      padding: 20px 0;
    }
  }
  .grouping_content {
    position: relative;
  }
  // 弹窗分配
  .allocation {
    position: absolute;
    top:48px;
    right: -153px;
    width: 249px;
    background: #fff;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    display: none;
    .add_top {
      padding: 16px 12px;
      border-bottom: 1px solid #e5e5e5;

      .add_input {
        width: 142px;
        height: 28px;
        border-radius: 2px;
        border: 1px solid #e5e5e5;
      }

      .add_grouping {
        display: inline-block;
        width: 72px;
        height: 28px;
        line-height: 28px;
        border-radius: 2px;
        color: #666;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        text-align: center;
        margin-left: 5px;
      }
    }

    .grouping_list {
      padding: 16px 12px;

      .grouping_renewal {
        line-height: 30px;
        display: none;

        input {
          display: inline-block;
          width: 168px;
          height: 30px;
          background: #f3f3f3;
          vertical-align: top;
          text-indent: 6px;
        }

        > span {
          display: inline-block;
          width: 52px;
          height: 30px;
          background: #32abff;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
      }

      span {
        display: block;
        padding-top: 16px;

        &:nth-of-type(1) {
          padding-top: 0;
        }
      }
    }
  }
</style>
