<template>
  <div>
    <div class="wrap">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/innovativeTeam' }">工坊</el-breadcrumb-item>
        <el-breadcrumb-item>工坊详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="mc-content">
      <div class="mc-content-head clear">
        <div class="floatLeft">
          <img :src="teamInfo.imgAddress||'/asset//docsave/manage/team/21/image/一佳一工坊.jpg'">
          <span class="team_type color_yellow">创新工坊</span>
        </div>
        <div class="mc-content-head_right">
          <p>
            <span class="organize_titie">{{teamInfo.teamName}}</span>
          </p>
          <div class="information _1">
            <span>{{teamInfo.typeName}}</span>
            <span>{{teamInfo.devDegreeName}}</span>
            <span>{{teamInfo.gradeName}}</span>
          </div>
          <p>
            <span>负责人：{{teamInfo.chargeUserName}}</span>
            <span>&nbsp;入驻场地：</span>
          </p>
          <p>
            <span>公司全称：</span>
            <span>无</span>
          </p>
          <p class="team_summary">
            <span>{{teamInfo.description}}</span>
          </p>
          <!-- 当权限为团队管理员时，显示此图标-->
          <!-- <a @click="dialogVisible = true" class="if_admin btn-type-1 btn-type-blue">
            <span style="color: white;">评价</span>
          </a>-->
          <!-- 获取当前用户是否为此团队的负责人 是否显示团队管理的图标-->
          <a @click.stop="HandleManage" class="if_admin" v-show="isshow == true">
<!--          <a @click.stop="start1" class="if_admin">-->
            <span class="el-icon-setting" style="font-size: 14px">管理</span>
          </a>
          <a @click.stop="start1" class="if_admin" v-show="isshow1 == true">
            <!--          <a @click.stop="start1" class="if_admin">-->
            <span class="el-icon-setting" style="font-size: 14px">编辑</span>
          </a>
          <a @click.stop="comment" class="if_admin" v-show="$store.state.user.role == 1">
            <!--          <a @click.stop="start1" class="if_admin">-->
            <el-button type="primary">评价</el-button>
          </a>
           <!-- <a @click.stop="start1" class="if_admin">
            <span class="el-icon-setting"></span>
          </a> -->
        </div>
      </div>
      <div style="margin-top: 50px">
        <el-tabs v-model="activeName" @tab-click="handleClick" v-show="activeIndex==1">
          <el-tab-pane label="团队介绍" name="first">
            <div>
              <p>{{teamInfo.description}}</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工坊成员" name="second">
            <div>
              <ul class="team_leaguer">
                <li
                  v-for="(teamItem,teamIndex) in teamInfo.memberList"
                  :key="`teamItem.id`+teamIndex"
                >
                  <div class="leaguer_img floatLeft">
                    <a href="JavaScript:">
                      <img :src="teamItem.imgAddress">
                    </a>
                  </div>
                  <div class="overflow">
                    <p>
                      <a href="JavaScript:" @click.stop="Handle_TeamUsersInfo(teamItem.userId)">{{teamItem.userName}}</a>
                    </p>
                    <p>
                      <span class="root_power admin_people">工坊成员</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工坊动态" name="third">
            <div class="tab-pane">
                        <ul class="team_news">
                                <li class="clear" v-for="(newsItem,newsIndex) of teamInfo.newsList" :key="newsIndex" @click.stop="intoTeamNewsDetail(newsItem.id)">
                                    <p class="text-ellipsis-1">{{newsItem.newsName}}</p>
                                    <p>{{newsItem.createDate}}</p>
                                </li>
                        </ul>
                    </div>
          </el-tab-pane>
          <el-tab-pane label="招聘信息" name="1">
            <ul class="advertises_for" ref="advertises_for">
              <li v-for="(poItem,poIndex) in positionList" :key="poIndex" class="advertises_li">
                <div class="clear">
                  <strong>
                    {{poItem.positionName}}(
                    <span>{{poItem.positionCnt}}</span>人)
                  </strong>
                </div>
                <div class="abstract"></div>
                <div class="panel-collapse">
                  <p v-html="poItem.description"></p>
                </div>
                <span @click.stop="HandleMore(poIndex)">显示更多</span>
              </li>
            </ul>
          </el-tab-pane>
          <!-- <el-tab-pane label="工坊项目" name="2">工坊项目</el-tab-pane> -->
          <el-tab-pane label="工坊事记" name="2">
            <div>
              <div style="padding: 20px 50px">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in teamInfo.historyList"
                    :key="index"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.time"
                  >{{activity.content}}</el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工坊成果" name="3">
            <div class="achievementMain">
              <div class="achievementMainLi">
                <div class="title" @mouseenter="onMouseenter(1)" @mouseleave="onMouseleave(1)">
                  <span>&nbsp;</span>
                  <span>论文</span>
                  <i
                    id="add-award-btn"
                    class="iconfont iconjia add fr"
                    v-show="seen==true&&Lindex==1&&jurisdiction_show==true"
                    @click.stop="Handle_achievementAdd(1)"
                  ></i>
                </div>
                <ol>
                  <li
                    v-for="(achItem,achIndex) in papers"
                    :key="achIndex"
                    @mouseenter="Handle_onMouseenter(achIndex)"
                    @mouseleave="Handle_onMouseleave(achIndex)"
                  >
                    <p @click.stop="HandlePatents(1,achItem.id)">{{achItem.paperName}}</p>
                    <i
                      class="iconfont iconbianji edit"
                      v-show="seen==true&&ach_Lindex==achIndex&&jurisdiction_show==true"
                      @click.stop="Handle_Edit(1,achItem.id)"
                    ></i>
                    <i
                      class="iconfont iconshanchu delete"
                      v-show="seen==true&&ach_Lindex==achIndex&&jurisdiction_show==true"
                      @click.stop="Handle_Delete(1,achItem.id)"
                    ></i>
                  </li>
                  <br>
                </ol>
              </div>
              <div class="achievementMainLi">
                <div class="title" @mouseenter="onMouseenter(2)" @mouseleave="onMouseleave(2)">
                  <span>&nbsp;</span>
                  <span>获奖情况</span>
                  <i
                    class="iconfont iconjia add fr"
                    v-show="seen==true&&Lindex==2&&jurisdiction_show==true"
                    @click.stop="Handle_achievementAdd(2)"
                  ></i>
                </div>
                <ol>
                  <li
                    v-for="(awItem,awIndex) of awards"
                    :key="awIndex"
                    @mouseenter="Award_onMouseenter(awIndex)"
                    @mouseleave="Award_onMouseleave(awIndex)"
                  >
                    <p class="p_zhan" @click.stop="HandlePatents(2,awItem.id)">
                      <span>{{awItem.matchName}}</span>
                      <span>{{awItem.awardLevel}}</span>
                    </p>
                    <i
                      class="iconfont iconbianji edit"
                      v-show="seen==true&&Award_Lindex==awIndex&&jurisdiction_show==true"
                      @click.stop="Handle_Edit(2,awItem.id)"
                    ></i>
                    <i
                      class="iconfont iconshanchu delete"
                      v-show="seen==true&&Award_Lindex==awIndex&&jurisdiction_show==true"
                      @click.stop="Handle_Delete(2,awItem.id)"
                    ></i>
                  </li>
                  <br>
                </ol>
              </div>
              <div class="achievementMainLi">
                <div class="title" @mouseenter="onMouseenter(3)" @mouseleave="onMouseleave(3)">
                  <span>&nbsp;</span>
                  <span>专利</span>
                  <i
                    id="add-patent-btn"
                    class="iconfont iconjia add fr"
                    v-show="seen==true&&Lindex==3&&jurisdiction_show==true"
                    @click.stop="Handle_achievementAdd(3)"
                  ></i>
                </div>
                <ol>
                  <li
                    v-for="(item,index) of patents"
                    :key="index"
                    @mouseenter="Patent_onMouseenter(index)"
                    @mouseleave="Patent_onMouseleave(index)"
                  >
                    <p @click.stop="HandlePatents(3,item.id)">{{item.patentName}}</p>
                    <i
                      class="iconfont iconbianji edit"
                      v-show="seen==true&&Patent_Lindex==index&&jurisdiction_show==true"
                      @click.stop="Handle_Edit(3,item.id)"
                    ></i>
                    <i
                      class="iconfont iconshanchu delete"
                      v-show="seen==true&&Patent_Lindex==index&&jurisdiction_show==true"
                      @click.stop="Handle_Delete(3,item.id)"
                    ></i>
                  </li>
                  <br>
                </ol>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="Active_Name" @tab-click="handleClick" v-show="activeIndex==2">
          <el-tab-pane label="成员管理" name="first">
            <div class="content tab-content">
              <div class="tab-pane fade active in">
                <!-- 团队成员 -->
                <ul>
                  <li class="news_head">
                    <a>
                      <span class="delete_all" @click.stop="Handle_batchDelete">批量删除</span>
                    </a>
                    <!--                     <a class="floatRight set_power">-->
                    <!--                      <span class="el-icon-circle-plus-outline"></span>-->
                    <!--                      <span>成员邀请记录</span>-->
                    <!--                    </a>-->
                    <a class="floatRight set_power" @click="start1">
                      <span class="el-icon-circle-plus-outline"></span>
                      <span>添加成员</span>
                    </a>
                  </li>
                </ul>
                <ul id="employee_admin_member" class="employee_admin_member">
                  <el-table
                    ref="multipleTable"
                    :data="memberList "
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handlebatchChange"
                  >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="userName" label="成员名称"></el-table-column>
                    <el-table-column label="职位">
                      <template slot-scope="scope">{{ scope.row.positionNameStr ||'未知' }}</template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click.stop="HandleOne_batchDelete(scope.row.id)"
                        ></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="老师管理" name="third">
            <div class="content tab-content">
              <div class="tab-pane fade active in">
                <!-- 团队成员 -->
                <ul>
                  <li class="news_head">
                    <a>
                      <span class="delete_all" @click.stop="Handle_batchDelete">批量删除</span>
                    </a>
                    <!--                     <a class="floatRight set_power">-->
                    <!--                      <span class="el-icon-circle-plus-outline"></span>-->
                    <!--                      <span>成员邀请记录</span>-->
                    <!--                    </a>-->
                    <a class="floatRight set_power">
                      <span class="el-icon-circle-plus-outline"></span>
                      <span>邀请老师</span>
                    </a>
                  </li>
                </ul>
                <ul id class="employee_admin_member">
                  <el-table
                    ref="multipleTable"
                    :data="teacherList "
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handlebatchChange"
                  >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="userName" label="老师名称"></el-table-column>
                    <el-table-column label="职位">
                      <template slot-scope="scope">{{ scope.row.positionNameStr ||'未知' }}</template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <!-- <template slot-scope="scope">
                                        <el-button
                                                type="danger"
                                                icon="el-icon-delete"
                                                circle
                                                @click.stop=""
                                        ></el-button>
                      </template>-->
                    </el-table-column>
                  </el-table>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="新闻管理" name="second">
            <div class="tab-pane fade active in" id="team-data-2">
              <ul>
                <li class="news_head">
                  <a>
                    <span class="delete_all" @click.stop="Handle_newsDelete">批量删除</span>
                  </a>
                  <a class="floatRight" @click.stop="dialogFormVisible = true">
                    <span class="el-icon-circle-plus-outline"></span>
                    <span>添加新闻</span>
                  </a>
                </li>
              </ul>
              <ul id="teamnewslist">
                <el-table
                  ref="multipleTable"
                  :data="newsList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column prop="newsName" label="新闻标题"></el-table-column>
                  <el-table-column label="日期">
                    <template slot-scope="scope">{{ scope.row.createDate }}</template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click.stop="HandleOne_NewDelete(scope.row.id)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </ul>
              <!-- 分页 -->
              <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="招聘管理" name="1">
            <div class="tab-pane fade active in" id="team-data-3">
              <ul>
                <li class="news_head">
                  <span class="delete_all" @click.stop="handlePoDelete">
                    <a>批量删除</a>
                  </span>
                  <a class="floatRight" @click.stop="DutyVisible = true">
                    <span class="el-icon-circle-plus-outline"></span>
                    <span>添加职务</span>
                  </a>
                </li>
              </ul>
              <ul id="teampositionlist" class="business_list clear">
                <el-table
                  ref="PomultipleTable"
                  :data="positionList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handlePoChange"
                >
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column prop="positionName" label="职位"></el-table-column>
                  <el-table-column label="日期">
                    <template slot-scope="scope">{{ scope.row.createDate }}</template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click.stop="HandleOne_Delete(scope.row.id)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="等级设置" :visible.sync="dialogVisible">
      <div class="con">
        <p>工坊等级</p>
        <div>
          <el-radio-group v-model="DevRadio" @change="changeDevRadio">
            <el-radio
              :label="DevItem.id"
              v-for="(DevItem,DevIndex) in teamDevDegreeList"
              :key="`DevItem.id`+DevIndex"
            >{{DevItem.devDegreeName}}</el-radio>
          </el-radio-group>
        </div>
        <p>发展阶段</p>
        <div>
          <el-radio-group v-model="GradeRadio" @change="changeGradeRadio">
            <el-radio
              :label="GradeItem.id"
              v-for="(GradeItem,GradeIndex) in teamGradeList"
              :key="`GradeItem.id`+GradeIndex"
            >{{GradeItem.gradeName}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Handle_determine">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 工坊成果论文详情 -->
    <el-dialog :visible.sync="paper_Visible" width="30%">
      <h2 class="Results_title">{{Results_paper.paperName}}</h2>
      <ul class="ResultsVisible">
        <li>
          <div class="frame">
            <span>所属学院:</span>
          </div>
          <p>{{Results_dept.deptName}}</p>
        </li>
        <li>
          <div class="frame">
            <span>论文作者:</span>
          </div>
          <p>{{Results_paper.authors}}</p>
        </li>
        <li>
          <div class="frame">
            <span>论文名称:</span>
          </div>
          <p>{{Results_paper.paperName}}</p>
        </li>
        <li>
          <div class="frame">
            <span>刊物名称:</span>
          </div>
          <p>{{Results_paper.journalName}}</p>
        </li>
        <li>
          <div class="frame">
            <span>刊物级别:</span>
          </div>
          <p>{{Results_paper.journalLevel}}</p>
        </li>
        <li>
          <div class="frame">
            <span>刊登日期:</span>
          </div>
          <p>{{Results_paper.postDate}}</p>
        </li>
        <li>
          <div class="frame">
            <span>附件:</span>
          </div>
          <p>{{Results_paper.attachmentName || '无'}}</p>
        </li>
      </ul>
    </el-dialog>
    <el-dialog :visible.sync="award_Visible" width="30%">
      <h2 class="Results_title">{{Results_award.matchName}}</h2>
      <ul class="ResultsVisible">
        <li>
          <div class="frame">
            <span>所属学院:</span>
          </div>
          <p>{{Results_dept.deptName}}</p>
        </li>
        <li>
          <div class="frame">
            <span>参赛年份:</span>
          </div>
          <p>{{Results_award.year}}</p>
        </li>
        <li>
          <div class="frame">
            <span>参赛学生:</span>
          </div>
          <p>{{Results_award.students}}</p>
        </li>
        <li>
          <div class="frame">
            <span>参赛项目:</span>
          </div>
          <p>{{Results_award.projectName}}</p>
        </li>
        <li>
          <div class="frame">
            <span>大赛全称:</span>
          </div>
          <p>{{Results_award.matchName}}</p>
        </li>
        <li>
          <div class="frame">
            <span>大赛级别:</span>
          </div>
          <p>{{Results_award.matchLevel}}</p>
        </li>
        <li>
          <div class="frame">
            <span>获奖情况:</span>
          </div>
          <p>{{Results_award.awardLevel}}</p>
        </li>
        <li>
          <div class="frame">
            <span>附件:</span>
          </div>
          <p>{{Results_award.attachmentName|| '无'}}</p>
        </li>
      </ul>
    </el-dialog>
    <el-dialog :visible.sync="patent_Visible" width="30%">
      <h2 class="Results_title">{{Results_patent.paperName}}</h2>
      <ul class="ResultsVisible">
        <li>
          <div class="frame">
            <span>所属学院:</span>
          </div>
          <p>{{Results_dept.deptName}}</p>
        </li>
        <li>
          <div class="frame">
            <span>申请人:</span>
          </div>
          <p>{{Results_patent.users}}</p>
        </li>
        <li>
          <div class="frame">
            <span>专利:</span>
          </div>
          <p>{{Results_patent.patentName}}</p>
        </li>
        <li>
          <div class="frame">
            <span>专利号:</span>
          </div>
          <p>{{Results_patent.patentNo}}</p>
        </li>
        <li>
          <div class="frame">
            <span>类型:</span>
          </div>
          <p>{{Results_patent.patentType}}</p>
        </li>
        <li>
          <div class="frame">
            <span>申请日期:</span>
          </div>
          <p>{{Results_patent.applyDate}}</p>
        </li>
        <li>
          <div class="frame">
            <span>公告日期:</span>
          </div>
          <p>{{Results_patent.postDate}}</p>
        </li>
        <li>
          <div class="frame">
            <span>附件:</span>
          </div>
          <p>{{Results_patent.attachmentName || '无'}}</p>
        </li>
      </ul>
    </el-dialog>
    <!--  -->
    <el-dialog
      :title="AddVisible==true ? '新增成果' :'更新成果'"
      :visible.sync="achievementAddVisible"
      width="750px"
    >
      <div class="types" v-if="AddVisible==true">
        <ul>
          <li
            :class="['type', TY_dex==ty_index ? 'choice' :'']"
            v-for="(ty_item,ty_index) of types"
            :key="ty_index"
            @click.stop="HandleTY_index(ty_index)"
          >
            <span>{{ty_item.ty_name}}</span>
          </li>
        </ul>
      </div>
      <div class="contentBox">
        <div class="content" v-if="TY_dex==0">
          <div>
            <input type="hidden" name="teamId" value="${teamInfo.id}">
            <ul>
              <li>
                <span>所属学院:</span>
                <div class="down">
                  <span class="text" @click="_Handlechoise_">{{coll_text||'请选择'}}</span>
                  <input type="hidden" name="deptId" value="-1">
                  <i class="icon-angle-down"></i>
                  <div class="downAll" ref="coll_All">
                    <i
                      v-for="(coll_item,coll_index) of collegeList"
                      :key="coll_index"
                      @click.stop="_Handlechoise_click(coll_item.id,coll_item.deptName)"
                    >{{coll_item.deptName}}</i>
                  </div>
                </div>
              </li>
              <li>
                <span>论文作者:</span>
                <input type="text" class="authorInput" v-model="author">
                <input type="hidden" name="author">
                <div class="authorBox">
                  <div class="author"></div>
                  <i class="iconfont iconjiaxuan" style="font-size:18px"></i>
                  <i class="iconfont iconminus-square-antic" style="font-size:18px"></i>
                </div>
              </li>
              <li>
                <span>论文名称:</span>
                <input type="text" name="paperName" v-model="paperName">
              </li>
              <li>
                <span>刊物名称:</span>
                <input type="text" name="journalName" v-model="journalName">
              </li>
              <li>
                <span>刊物级别:</span>
                <input type="text" name="journalLevel" v-model="journalLevel">
              </li>
              <li>
                <span>刊登日期:</span>
                <el-date-picker
                  v-model="postDate"
                  type="date"
                  placeholder="yyyy-MM-dd"
                  style="width: 240px; height:36px;"
                ></el-date-picker>
              </li>
              <li>
                <span>上传附件:</span>
                <div class="file">
                  <span>上传附件</span>
                  <input type="file" name="attachment" id="upfile" @change="handleChange">
                </div>
                <p class="file-name" v-if="augment_control">{{attachment_amend}}</p>
                <p class="file-name" v-if="amend_control">{{attachmentName}}</p>
                <p style="color: #aaa">请上传doc、docx或图片文件,大小不超过10M</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="content" v-if="TY_dex==1">
          <div>
            <input type="hidden" name="teamId">
            <ul>
              <li>
                <span>参赛年份:</span>
                <el-date-picker
                  v-model="year"
                  type="year"
                  placeholder="yyyy"
                  style="width: 240px; height:36px;"
                ></el-date-picker>
              </li>
              <li>
                <span>所属学院:</span>
                <div class="down">
                  <span class="text" @click="_Handlechoise_">{{coll_text||'请选择'}}</span>
                  <input type="hidden" name="deptId">
                  <i class="icon-angle-down"></i>
                  <div class="downAll" ref="coll_All">
                    <i
                      v-for="(coll_item,coll_index) of collegeList"
                      :key="coll_index"
                      @click.stop="_Handlechoise_click(coll_item.id,coll_item.deptName)"
                    >{{coll_item.deptName}}</i>
                  </div>
                </div>
              </li>
              <li>
                <span>参赛学生:</span>
                <input type="text" class="authorInput" v-model="students">
                <input type="hidden" name="students">
                <div class="authorBox">
                  <div class="author"></div>
                  <i class="iconfont iconjiaxuan" style="font-size:18px"></i>
                  <i class="iconfont iconminus-square-antic" style="font-size:18px"></i>
                </div>
              </li>
              <li>
                <span>参赛项目:</span>
                <input type="text" name="projectName" v-model="projectName">
              </li>
              <li>
                <span>大赛全称:</span>
                <input type="text" name="matchName" v-model="matchName">
              </li>
              <li>
                <span>大赛级别:</span>
                <input type="text" name="matchLevel" v-model="matchLevel">
              </li>
              <li>
                <span>获奖情况:</span>
                <input type="text" name="awardLevel" v-model="awardLevel">
              </li>
              <li>
                <span>上传附件:</span>
                <div class="file">
                  <span>上传附件</span>
                  <input type="file" name="attachment" id="upfile" @change="handleChange">
                </div>
                <p class="file-name" v-if="augment_control">{{attachment_amend}}</p>
                <p class="file-name" v-if="amend_control">{{attachmentName}}</p>
                <p style="color: #aaa">请上传doc、docx或图片文件,大小不超过10M</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="content" v-if="TY_dex==2">
          <div>
            <input type="hidden" name="teamId">
            <ul>
              <li>
                <span>所属学院:</span>
                <div class="down">
                  <span class="text" @click="_Handlechoise_">{{coll_text||'请选择'}}</span>
                  <input type="hidden" name="deptId">
                  <i class="icon-angle-down"></i>
                  <div class="downAll" ref="coll_All">
                    <i
                      v-for="(coll_item,coll_index) of collegeList"
                      :key="coll_index"
                      @click.stop="_Handlechoise_click(coll_item.id,coll_item.deptName)"
                    >{{coll_item.deptName}}</i>
                  </div>
                </div>
              </li>
              <li>
                <span>申请人:</span>
                <input type="text" class="authorInput" v-model="users">
                <input type="hidden" name="users">
                <div class="authorBox">
                  <div class="author"></div>
                  <i class="iconfont iconjiaxuan" style="font-size:18px"></i>
                  <i class="iconfont iconminus-square-antic" style="font-size:18px"></i>
                </div>
              </li>
              <li>
                <span>专利:</span>
                <input type="text" name="patentName" v-model="patentName">
              </li>
              <li>
                <span>专利号:</span>
                <input type="text" name="patentNo" v-model="patentNo">
              </li>
              <li>
                <span>类型:</span>
                <div class="down">
                  <span class="text" @click.stop="Handle_ty_click">{{ty_Name||'请选择'}}</span>
                  <input type="hidden" name="patentType" v-model="ty_Name">
                  <i class="icon-angle-down"></i>
                  <div class="downAll" ref="downAll">
                    <i
                      v-for="(item,index) of Alltype"
                      :key="index"
                      @click.stop="handle_click(item.ty_name)"
                    >{{item.ty_name}}</i>
                  </div>
                </div>
              </li>
              <li>
                <span>专利申请日:</span>
                <el-date-picker
                  v-model="applyDate"
                  type="date"
                  placeholder="yyyy-MM-dd"
                  style="width: 240px; height:36px;"
                ></el-date-picker>
              </li>
              <li>
                <span>专利公告日:</span>
                <el-date-picker
                  v-model="postDate"
                  type="date"
                  placeholder="yyyy-MM-dd"
                  style="width: 240px; height:36px;"
                ></el-date-picker>
              </li>
              <li>
                <span>上传附件:</span>
                <div class="file">
                  <span>上传附件</span>
                  <input type="file" name="attachment" id="upfile" @change="handleChange">
                </div>
                <p class="file-name" v-if="augment_control">{{attachment_amend}}</p>
                <p class="file-name" v-if="amend_control">{{attachmentName}}</p>
                <p style="color: #aaa">请上传doc、docx或图片文件,大小不超过10M</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div v-if="AddVisible == true" class="push" @click.stop="Handle_conserve">保存</div>
        <div v-if="AddVisible == false" class="push" @click.stop="Handle_update">保存</div>
      </div>
    </el-dialog>
    <!-- 添加新闻弹窗 -->
    <el-dialog title="团队新闻编辑" :visible.sync="dialogFormVisible">
      <el-form :model="Teamform">
        <el-form-item label="活动名称">
          <el-input v-model="Teamform.newsName" autocomplete="off"></el-input>
          <span>50字以内，文明用语</span>
        </el-form-item>
        <el-form-item label="新闻详情">
          <div style="margin-top:30px;">
            <quill-editor ref="myTextEditor" v-model="Teamform.newsInstructor"></quill-editor>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Handleteamnews">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加新闻弹窗 -->
    <el-dialog title="招聘职位编辑" :visible.sync="DutyVisible">
      <el-form :v-model="form">
        <el-form-item label="组织">
          <el-select v-model="form.teamOrgArch" placeholder="请选择" style="width:100px;">
            <el-option
              v-for="item in teamOrgArchBeanList"
              :key="item.id"
              :label="item.orgName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-input
            v-model="form.positionName"
            autocomplete="off"
            style="display:block; width: 400px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="人数">
          <el-input
            v-model="form.positionCnt"
            autocomplete="off"
            style="display:block; width: 400px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位要求描述">
          <div style="margin-top:45px;">
            <quill-editor ref="myTextEditor" v-model="form.description"></quill-editor>
          </div>
        </el-form-item>
        <el-form-item label="是否发布招聘">
          <el-select v-model="form.isSatisfied" placeholder="请选择" style="width:100px;">
            <el-option v-for="item in Reoptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="HandleAdd_Duty">确 定</el-button>
        <el-button @click="DutyVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="增加工坊成员" :visible.sync="dialogStudentVisible">
      <el-input v-model="search1" placeholder="请输入搜索内容" prefix-icon="el-icon-search"></el-input>
      <div class="dialogflex">
        <div v-if="data1.data">
          <el-tree :data="data1.data" :props="defaultProps1" @node-click="handleNodeClick1"></el-tree>
        </div>
        <div class="list">
          <div v-if="listData1.data">
            <el-checkbox-group v-model="checkList1">
              <el-checkbox
                :label="item.realName+','+item.id"
                v-for="item in listData1.data.result"
                style="margin-top: 10px"
                :key="item.id"
              >
                <img :src="item.imgAddress">
                {{item.realName}}
                <!--                            <img src="../assets/images/123.png">{{item.realName}}-->
              </el-checkbox>
            </el-checkbox-group>
            <el-pagination
              @current-change="handleCurrentChange1"
              :page-size="5"
              :pager-count="5"
              layout=" prev, pager, next"
              :total="listData1.data.allRowNum"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div>
        <p>已选</p>
        <div class="list1">
          <el-tag
            style="margin-right: 15px"
            v-for="tag in checkList1"
            closable
            :key="tag.id"
            @close="remove1(tag)"
          >{{tag.split(',')[0]}}</el-tag>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStudentVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogStudentVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 团队成员个人信息弹窗 -->
    <TeamUsers :msg="userId" v-if="revealUsers_Visible" @on_Close="Handle_Close"></TeamUsers>
    <!-- 工坊动态个人信息弹窗 -->
    <NewsDetail :msg="newsId"  v-if="News_Visible" @OnClose="Handle_Close"></NewsDetail>
  </div>
</template>

<script>
  // import qs from 'qs'
  import TeamUsers from '@/components/comTeamUsers_info.vue'
  import NewsDetail from '@/components/NewsDetail.vue'
  export default {
    name: "teamDetail",
    components:{
        TeamUsers,
        NewsDetail
    },
    data() {
      return {
        //学生
        search1: "",
        dialogStudentVisible: false,
        News_Visible:false,
        data1: [],
        defaultProps1: {
          children: "deptNodeList",
          label: "nodeName"
        },
        listData1: [],
        page1: 1,
        treeNodeId1: null,
        deptId1: null,
        checkList1: [],
        tags1: new Set(),
        arr1: [],
        procInstId1: null,
        //老师
        search: "",
        dialogTeacherVisible: false,
        data: [],
        defaultProps: {
          children: "deptNodeList",
          label: "nodeName"
        },
        listData: [],
        page: 1,
        treeNodeId: null,
        deptId: null,
        checkList: [],
        tags: new Set(),
        arr: [],
        procInstId: null,
        dialogVisible: false,
        dialogFormVisible: false,
        activeName: "first",
        Active_Name: "first",
        activities: [],
        teamInfo: [], //工坊详情
        teamDevDegreeList: [],
        teamGradeList: [],
        DevRadio: null,
        GradeRadio: null,
        positionList: [], //招聘信息
        papers: [], //论文
        patents: [], //专利
        awards: [], //获奖情况
        description: undefined,
        desid: undefined,
        activeIndex: 1,
        DutyVisible: false,
        Teamform: {
          teamId: this.$route.params.id,
          newId: -1,
          newsName: undefined,
          newsInstructor: undefined
        },
        form: {
          id: -1,
          teamId: null,
          teamOrgArch: null,
          isSatisfied: null,
          positionCnt: undefined,
          description: undefined,
          positionName: undefined
        },
        content: "",
        checked: "",
        Value2: null,
        Reoptions: [{ id: 1, name: "是" }, { id: 0, name: "否" }],
        teamOrgArchBeanList: [],
        Value1: null,
        editorOption: "",
        newsList: [],
        multipleSelection: [],
        memberList: [],
        seen: false, //控制
        Lindex: undefined, //控制
        ach_Lindex: undefined, //控制
        Award_Lindex: undefined,
        Patent_Lindex: undefined,
        achievementAddVisible: false,
        revealUsers_Visible:false, //成员弹窗控制
        paper_Visible: false,
        award_Visible: false,
        patent_Visible: false,
        Results_details: [],
        Results_dept: {
          deptName: ""
        },
        Results_paper: {
          journalLevel: "",
          journalName: "",
          paperName: "",
          authors: "",
          postDate: 1543939200000
        },
        Results_award: {
          awardLevel: "",
          matchLevel: "",
          matchName: "",
          projectName: "",
          students: "",
          year: ""
        },
        Results_patent: {},
        Results_tyid: undefined,
        types: [
          { id: 1, ty_name: "论文" },
          { id: 2, ty_name: "获奖情况" },
          { id: 3, ty_name: "专利" }
        ],
        TY_dex: 0,
        Alltype: [
          { id: 1, ty_name: "发明专利" },
          { id: 2, ty_name: "实用新型专利" },
          { id: 3, ty_name: "外观设计" },
          { id: 4, ty_name: "软件著作权" }
        ],
        userId:undefined,
        ty_Name: undefined,
        collegeList: [],
        coll_text: undefined,
        // deptId: undefined,
        paperName: undefined,
        journalName: undefined,
        journalLevel: undefined,
        author: undefined,
        attachment: undefined,
        attachmentName: undefined,
        attachment_amend:undefined,
        postDate: "",
        applyDate: "",
        year: "",
        old_year: "",
        projectName: undefined,
        matchName: undefined,
        matchLevel: undefined,
        awardLevel: undefined,
        students: undefined,
        users: undefined,
        patentName: undefined,
        patentNo: undefined,
        AddVisible: false,
        paperId: undefined, //论文ID
        patentId: undefined, //	专利ID
        awardId: undefined, //获奖情况ID
        teacherList: [],
        augment_control:false,
        amend_control:true,
        newsId:undefined,
        isshow:true,
        isshow1:false,
        jurisdiction_show:false
      }
    },
    watch: {
      memberList: {
        handler: function(val) {
          this.memberList = val;
        },
        deep: true
      }
    },
    mounted() {
      this.initTeamDetail_Data();
      this.initDuty();
      this.initgetallteamnews();
      this.initmember();
      this.getData();
      this.getData1();
    },
    methods: {
      initvariate() {
        this.ty_Name = undefined;
        this.coll_text = undefined;
        this.deptId = undefined;
        this.paperName = undefined;
        this.journalName = undefined;
        this.journalLevel = undefined;
        this.author = undefined;
        this.attachment = undefined;
        this.attachmentName = undefined;
        this.attachment_amend = undefined;
        this.postDate = "";
        this.applyDate = "";
        this.old_year = "";
        this.year = "";
        this.projectName = undefined;
        this.matchName = undefined;
        this.matchLevel = undefined;
        this.awardLevel = undefined;
        this.students = undefined;
        this.users = undefined;
        this.patentName = undefined;
        this.patentNo = undefined;
        this.AddVisible = false;
      },
      getData() {
        this.axios.post("/teamproject/manage/getalldeptforchoise", {
            userId: this.$store.state.user.userId,
            selectType: 0,
            searchKey: this.search1
          }).then(res => {
            this.$set(this.data1, "data", res.data.data.listNode);
          });
      },
      getData1() {
        this.axios.post("/teamproject/manage/getalldeptforchoise", {
            userId: this.$store.state.user.userId,
            selectType: 1,
            searchKey: this.search
          }).then(res => {
            this.$set(this.data, "data", res.data.data.listNode);
          });
      },
      getList1() {
        if (this.treeNodeId1 == 1) {
          this.axios.post("/teamproject/manage/getallstudentofdept", {
              userId: this.$store.state.user.userId,
              deptId: this.deptId1,
              teamId: this.$route.params.id,
              category: "school",
              searchKey: "",
              page: this.page1,
              pageSize: 5
            }).then(res => {
              this.$set(this.listData1, "data", res.data.data);
            });
        } else {
          this.axios.post("/teamproject/manage/getallstudentofdept", {
              userId: this.$store.state.user.userId,
              deptId: this.deptId1,
              teamId: this.$route.params.id,
              category: "dept",
              searchKey: "",
              page: this.page1,
              pageSize: 5
            }).then(res => {
              this.$set(this.listData1, "data", res.data.data);
            });
        }
      },
      initTeamDetail_Data() {
        this.axios.post("/teamproject/common/teamdetail", {
            userId: this.$store.state.user.userId,
            teamId: this.$route.params.id
            // teamId:348
          }).then(res => {
            if (res.data.code == 200) {
              console.log(res)
              this.teamInfo = res.data.data.teamInfo;
              this.teamDevDegreeList = res.data.data.teamDevDegreeList;
              this.teamGradeList = res.data.data.teamGradeList;
              this.positionList = res.data.data.positionList;
              this.papers = res.data.data.papers;
              this.patents = res.data.data.patents;
              this.awards = res.data.data.awards;
              if(res.data.data.isManager == false && res.data.data.isManagerForOne == false){
                this.isshow = false;
               
              }
              if(res.data.data.isManager == true) {
                this.jurisdiction_show = true
              }
            }
          });
      },
      initDuty() {
        this.axios.get("/team/position/arch").then(res => {
          if (res.data.code == 200) {
            this.teamOrgArchBeanList = res.data.data.teamOrgArchBeanList;
          }
        });
      },
      initgetallteamnews() {
        this.axios.get("/teamproject/common/getallteamnews", {
            params: { teamId: this.$route.params.id }
          }).then(res => {
            if (res.data.code == 200) {
              this.newsList = res.data.data.newsList;
            }
          });
      },
      initmember() {
        this.axios.get("/team/member/all", {
            params: { teamId: this.$route.params.id }
          }).then(res => {
            if (res.data.code == 200) {
              this.memberList = res.data.data.memberList;
            }
          });
      },
      Handle_TeamUsersInfo(userId) {
        this.userId = userId
        this.revealUsers_Visible = true
      },
      Handle_Close(data) {
        this.revealUsers_Visible = data
        this.News_Visible = data
      },
      handleNodeClick1() {},
      handleClick() {},
      Handle_determine() {
        this.axios.post('/teamproject/manage/confirmteamgrade',{
          teamId:this.$route.params.id,
          devDegreeId:this.DevRadio,
          gradeId:this.GradeRadio,
        }).then(res => {
          if(res.data.code == 200){
            this.$message("评价成功！", "", {
              type: "warning"
            });
            this.dialogVisible = false;
          }
        })
      },
      HandleMore(index) {
        this.$(this.$refs.advertises_for).children(".advertises_li").eq(index).children(".panel-collapse").slideToggle(300);
      },
      HandleManage() {
        this.isshow1 = true;
        this.isshow = false;
        this.activeIndex = 2;
      },
      
      // 鼠标移入 移出
      onMouseenter(tyId) {
        switch (tyId) {
          case 1: {
            this.seen = true;
            this.Lindex = 1;
            break;
          }
          case 2: {
            this.seen = true;
            this.Lindex = 2;
            break;
          }
          case 3: {
            this.seen = true;
            this.Lindex = 3;
            break;
          }
        }
      },
      // 鼠标移入 移出
      onMouseleave(tyId) {
        switch (tyId) {
          case 1: {
            this.seen = false;
            this.Lindex = undefined;
            break;
          }
          case 2: {
            this.seen = false;
            this.Lindex = undefined;
            break;
          }
          case 3: {
            this.seen = false;
            this.Lindex = undefined;
            break;
          }
        }
      },
      Handle_achievementAdd(TYID) {
        this.augment_control = true
        this.coll_text = undefined;
        this.initvariate();
        switch (TYID) {
          case 1: {
            this.achievementAddVisible = true;
            this.AddVisible = true;
            this.TY_dex = 0;
            break;
          }
          case 2: {
            this.achievementAddVisible = true;
            this.AddVisible = true;
            this.TY_dex = 1;
            break;
          }
          case 3: {
            this.achievementAddVisible = true;
            this.AddVisible = true;
            this.TY_dex = 2;
            break;
          }
        }
        this.axios.get("/team/archive/deptlist").then(res => {
          if (res.data.code == 200) {
            this.collegeList = res.data.data;
          }
        });
      },
      Handle_onMouseenter(tyId) {
        this.seen = true;
        this.ach_Lindex = tyId;
      },
      Handle_onMouseleave() {
        this.seen = false;
        this.ach_Lindex = undefined;
      },
      Award_onMouseenter(tyId) {
        this.seen = true;
        this.Award_Lindex = tyId;
      },
      Award_onMouseleave() {
        this.seen = false;
        this.Award_Lindex = undefined;
      },
      Patent_onMouseenter(tyId) {
        this.seen = true;
        this.Patent_Lindex = tyId;
      },
      Patent_onMouseleave() {
        this.seen = false;
        this.Patent_Lindex = undefined;
      },
      intoTeamNewsDetail(newsId) {
        this.newsId = newsId
        this.News_Visible = true
      },
      Handle_Edit(type, id) {
        this.achievementAddVisible = true;
        this.initvariate();
        if (type == 1) {
          this.TY_dex = 0;
          this.paperId = id;
          this.axios.get("/team/paper/detail", { params: { paperId: id } }).then(res => {
              if (res.data.code == 200) {
                this.coll_text = res.data.data.dept.deptName;
                this.author = res.data.data.paper.authors;
                this.paperName = res.data.data.paper.paperName;
                this.journalLevel = res.data.data.paper.journalLevel;
                this.journalName = res.data.data.paper.journalName;
                this.postDate = res.data.data.paper.postDate;
                this.attachmentName = res.data.data.paper.attachmentName;
                this.deptId = res.data.data.paper.deptId;
              }
            });
        } else if (type == 2) {
          this.TY_dex = 1;
          this.awardId = id;
          this.axios.get("/team/award/detail", { params: { awardId: id } }).then(res => {
              if (res.data.code == 200) {
                this.deptId = res.data.data.award.deptId;
                this.coll_text = res.data.data.dept.deptName;
                this.old_year = res.data.data.award.year;
                this.year = res.data.data.award.year;
                this.projectName = res.data.data.award.projectName;
                this.matchName = res.data.data.award.matchName;
                this.matchLevel = res.data.data.award.matchLevel;
                this.awardLevel = res.data.data.award.awardLevel;
                this.students = res.data.data.award.students;
                this.attachmentName = res.data.data.award.attachmentName;
              }
            });
        } else if (type == 3) {
          this.TY_dex = 2;
          this.patentId = id;
          this.axios.get("/team/patent/detail", { params: { patentId: id } }).then(res => {
              if (res.data.code == 200) {
                this.deptId = res.data.data.patent.deptId;
                this.coll_text = res.data.data.dept.deptName;
                this.patentName = res.data.data.patent.patentName;
                this.patentNo = res.data.data.patent.patentNo;
                this.ty_Name = res.data.data.patent.patentType;
                this.users = res.data.data.patent.users;
                this.applyDate = this.getTime(res.data.data.patent.applyDate);
                this.postDate = this.getTime(res.data.data.patent.postDate);
                this.attachmentName = res.data.data.patent.attachmentName;
              }
            });
        }
      },
      Handle_Delete(type, id) {
        this.$confirm("此操作将永久删除该成果, 是否继续?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        })
          .then(() => {
            if (type == 1) {
              this.get_Delete(id, type);
            } else if (type == 2) {
              this.get_Delete(id, type);
            } else if (type == 3) {
              this.get_Delete(id, type);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      get_Delete(id, type) {
        this.axios
          .post("/team/archive/delete", { id: id, type: type })
          .then(res => {
            if (res.data.code == 200) {
              this.initTeamDetail_Data();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
      },
      Handleteamnews() {
        this.axios
          .post("/teamproject/common/saveeditteamnews", this.Teamform)
          .then(res => {
            if (res.data.code == 200) {
              this.newsName = undefined;
              this.newsInstructor = undefined;
              this.dialogFormVisible = false;
              this.initgetallteamnews();
            }
          });
      },
      HandleAdd_Duty() {
        this.form.teamId = this.teamInfo.id;
        this.axios
          .post("/team/position/save", JSON.stringify(this.form), {
            headers: { "Content-Type": "application/json" }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "添加职务成功",
                type: "success"
              });
              this.DutyVisible = false;
              this.form.teamOrgArch = null;
              this.isSatisfied = null;
              this.positionCnt = undefined;
              this.description = undefined;
              this.positionName = undefined;
              this.initTeamDetail_Data();
            }
          });
      },
      handlebatchChange(val) {
        this.multipleSelection = val;
      },
      Handle_batchDelete() {
        let ids = [];
        this.multipleSelection.map(item => {
          ids.push(item.id);
        });
        if (ids.length > 0) {
          this.$confirm("是否删除该成员", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              this.axios.post("/team/members/delete", {
                  idStr: ids,
                  teamId: this.$route.params.id
                }).then(res => {
                  if (res.data.code == 200) {
                    this.initmember();
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                  } else {
                    this.$message({
                      type: "error",
                      message: "删除失败"
                    });
                  }
                });
            }).catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else {
          this.$message({
            message: "请选择要删除的选项",
            type: "warning"
          });
        }
      },
      HandleOne_batchDelete(id) {
        this.$confirm("是否删除该成员", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {this.axios.post("/team/members/delete", {
                idStr: id,
                teamId: this.$route.params.id
              }).then(res => {
                if (res.data.code == 200) {
                  this.initmember();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.$message({
                    type: "error",
                    message: "删除失败"
                  });
                }
              });
          }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      Handle_newsDelete() {
        let ids = [];
        this.multipleSelection.map(item => {
          ids.push(item.id);
        });
        if (ids.length > 0) {
          this.$confirm("是否删除该新闻", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              this.axios.post("/teamproject/common/batchdeleteteamnews", { idStr: ids }).then(res => {
                  if (res.data.code == 200) {
                    this.initgetallteamnews();
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                  } else {
                    this.$message({
                      type: "error",
                      message: "删除失败"
                    });
                  }
                });
            }).catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else {
          this.$message({
            message: "请选择要删除的选项",
            type: "warning"
          });
        }
      },
      HandleOne_NewDelete(id) {
        this.$confirm("是否删除该新闻", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            this.axios.post("/teamproject/common/batchdeleteteamnews", { idStr: id }).then(res => {
                if (res.data.code == 200) {
                  this.initgetallteamnews();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.$message({
                    type: "error",
                    message: "删除失败"
                  });
                }
              });
          }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      handlePoChange(val) {
        this.multipleSelection = val;
      },
      HandleOne_Delete(id) {
        this.axios.post("/team/position/delete", { positionIds: id }).then(res => {
            if (res.data.code == 200) {
              this.initTeamDetail_Data();
            }
          });
      },
      handlePoDelete() {
        let ids = [];
        this.multipleSelection.map(item => {
          ids.push(item.id);
        });
        if (ids.length > 0) {
          this.$confirm("是否删除该职务", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              this.axios.post("/team/position/delete", { positionIds: ids.join(",") }).then(res => {
                  if (res.data.code == 200) {
                    this.$message({
                      type: "success",
                      message: "删除成功!"
                    });
                    this.initTeamDetail_Data();
                  } else {
                    this.$message({
                      type: "error",
                      message: "删除成功!"
                    });
                  }
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else {
          this.$message({
            message: "请选择要删除的选项",
            type: "warning"
          });
        }
      },
      HandlePatents(tyid, id) {
        if (tyid == 1) {
          this.paper_Visible = true;
          this.Results_tyid = tyid;
          this.axios
            .get("/team/paper/detail", { params: { paperId: id } })
            .then(res => {
              if (res.data.code == 200) {
                this.Results_dept = res.data.data.dept;
                this.Results_paper = res.data.data.paper;
                for (let item in this.Results_paper) {
                  if (item == "postDate") {
                    this.Results_paper.postDate = this.getTime(
                      this.Results_paper[item]
                    );
                  }
                }
              }
            });
        } else if (tyid == 2) {
          this.award_Visible = true;
          this.Results_tyid = tyid;
          this.axios
            .get("/team/award/detail", { params: { awardId: id } })
            .then(res => {
              if (res.data.code == 200) {
                this.Results_dept = res.data.data.dept;
                this.Results_award = res.data.data.award;
              }
            });
        } else if (tyid == 3) {
          this.patent_Visible = true;
          this.Results_tyid = tyid;
          this.axios
            .get("/team/patent/detail", { params: { patentId: id } })
            .then(res => {
              if (res.data.code == 200) {
                this.Results_dept = res.data.data.dept;
                this.Results_patent = res.data.data.patent;
                for (let item in this.Results_patent) {
                  if (item == "postDate") {
                    this.Results_patent.postDate = this.getTime(
                      this.Results_patent[item]
                    );
                  } else if (item == "applyDate") {
                    this.Results_patent.applyDate = this.getTime(
                      this.Results_patent[item]
                    );
                  }
                }
              }
            });
        }
      },

      handleChange() {
        let attachment = document.getElementById("upfile").files[0];
        this.attachment = attachment;
        this.attachment_amend = attachment.name
      },
      Handle_conserve() {
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        if (this.TY_dex == 0) {
          let data = new FormData();
          data.append("deptId", this.deptId);
          data.append("teamId", this.$route.params.id);
          data.append("paperName", this.paperName);
          data.append("journalLevel", this.journalLevel);
          data.append("journalName", this.journalName);
          data.append("author", this.author);
          data.append("postDate", this.get_Time(this.postDate));
          data.append("attachment", this.attachment);
          this.axios.post("/team/newpaper", data, config).then(res => {
            if (res.data.code == 200) {
              this.achievementAddVisible = false;
              this.initTeamDetail_Data();
              this.$message({
                message: "操作成功",
                type: "success"
              });
            }
          });
        } else if (this.TY_dex == 1) {
          // 创建获奖情况
          let data = new FormData();
          data.append("deptId", this.deptId);
          data.append("teamId", this.$route.params.id);
          data.append("year", this.get_year(this.year));
          data.append("projectName", this.projectName);
          data.append("matchName", this.matchName);
          data.append("matchLevel", this.matchLevel);
          data.append("awardLevel", this.awardLevel);
          data.append("students", this.students);
          data.append("attachment", this.attachment);
          if (this.AddVisible) {
            this.axios.post("/team/newaward", data, config).then(res => {
              if (res.data.code == 200) {
                this.achievementAddVisible = false;
                this.initTeamDetail_Data();
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
              }
            });
          } else {
            this.axios.post("/team/updatepaper", data, config).then(res => {
              if (res.data.code == 200) {
                this.achievementAddVisible = false;
                this.initTeamDetail_Data();
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
              }
            });
          }
        } else if (this.TY_dex == 2) {
          // 创建专利
          let data = new FormData();
          data.append("deptId", this.deptId);
          data.append("teamId", this.$route.params.id);
          data.append("patentName", this.patentName);
          data.append("patentNo", this.patentNo);
          data.append("patentType", this.ty_Name);
          data.append("users", this.users);
          data.append("applyDate", this.get_Time(this.applyDate));
          data.append("postDate", this.get_Time(this.postDate));
          data.append("attachment", this.attachment);
          this.axios.post("/team/newpatent", data, config).then(res => {
            if (res.data.code == 200) {
              this.achievementAddVisible = false;
              this.initTeamDetail_Data();
              this.$message({
                message: "操作成功",
                type: "success"
              });
            }
          });
        }
        this.attachment_amend = undefined
      },
      Handle_update() {
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        if (this.TY_dex == 0) {
          let data = new FormData();
          this.postDate = this.getTime(this.postDate);
          data.append("deptId", this.deptId);
          data.append("paperId", this.paperId);
          data.append("paperName", this.paperName);
          data.append("journalLevel", this.journalLevel);
          data.append("journalName", this.journalName);
          data.append("author", this.author);
          data.append("postDate",this.postDate == this.postDate ? this.postDate : this.getTime(this.postDate)
          );
          data.append("attachment", this.attachment == this.attachmentName ? "" : this.attachment
          );
          this.axios.post("/team/updatepaper", data, config).then(res => {
            if (res.data.code == 200) {
              this.achievementAddVisible = false;
              this.$message({
                message: "更新成功",
                type: "success"
              });
            }
          });
        } else if (this.TY_dex == 1) {
          let data = new FormData();
          data.append("deptId", this.deptId);
          data.append("awardId", this.awardId);
          data.append( "year", this.year == this.old_year ? this.year : this.get_year(this.year));
          data.append("projectName", this.projectName);
          data.append("matchName", this.matchName);
          data.append("matchLevel", this.matchLevel);
          data.append("awardLevel", this.awardLevel);
          data.append("students", this.students);
          data.append("attachment", this.attachment == this.attachmentName ? "" : this.attachment);
          this.axios.post("/team/updateaward", data, config).then(res => {
            if (res.data.code == 200) {
              this.achievementAddVisible = false;
              this.$message({
                message: "更新成功",
                type: "success"
              });
            }
          });
        } else if (this.TY_dex == 2) {
          // 编辑专利
          this.postDate = this.getTime(this.postDate);
          this.applyDate = this.getTime(this.applyDate);
          let data = new FormData();
          data.append("deptId", this.deptId);
          data.append("patentId", this.patentId);
          data.append("patentName", this.patentName);
          data.append("patentNo", this.patentNo);
          data.append("patentType", this.ty_Name);
          data.append("users", this.users);
          data.append("applyDate", this.applyDate == this.applyDate ? this.applyDate : this.getTime(this.applyDate));
          data.append("postDate", this.postDate == this.postDate ? this.postDate : this.getTime(this.postDate));
          data.append( "attachment", this.attachment == this.attachmentName ? "" : this.attachment);
          this.axios.post("/team/updatepatent", data, config).then(res => {
            if (res.data.code == 200) {
              this.achievementAddVisible = false;
              this.$message({
                message: "更新成功",
                type: "success"
              });
            }
          });
        }
      },
      HandleTY_index(index) {
        this.TY_dex = index;
        this.coll_text = undefined;
      },
      Handle_ty_click() {
        this.$(this.$refs.downAll).stop(true, false).slideToggle(300);
      },
      handle_click(text) {
        this.ty_Name = text;
        this.$(this.$refs.downAll).stop(true, false).slideUp(300);
      },
      _Handlechoise_() {
        this.$(this.$refs.coll_All).stop(true, false).slideToggle(300);
      },
      _Handlechoise_click(id, text) {
        this.deptId = id;
        this.coll_text = text;
        this.$(this.$refs.coll_All).stop(true, false).slideUp(300);
      },
      //学生
      remove1(val) {
        // this.arr1 = this.arr1.filter( item => {
        //     return val != item;
        // });
        // this.tags1 = new Set(this.arr1);
        this.checkList1 = this.checkList1.filter(item => {
          return val != item;
        });
      },
      start1() {
        this.$router.push({path:`/editTeam_ts/${this.$route.params.id}`})
        // this.dialogStudentVisible = true;
        // this.axios({
        //   url: "/process/start",
        //   method: "post",
        //   headers: { "Content-Type": "application/json" },
        //   transformRequest: [
        //     function(data) {
        //       data = JSON.stringify(data);
        //       return data;
        //     }
        //   ],
        //   data: {
        //     processId: 9,
        //     sourceId: this.$route.params.id,
        //     sourceType: 12
        //   }
        // }).then(res => {
        //   this.procInstId1 = res.data.data.procInstId;
        // });
      },
      commit1() {
        let s;
        let arr = this.checkList1.map(val => {
          return val.split(",")[1];
        });
        s = arr.join(",");
        this.axios({
          url: "/process/commit",
          method: "post",
          headers: { "Content-Type": "application/json" },
          transformRequest: [
            function(data) {
              data = JSON.stringify(data);
              return data;
            }
          ],
          data: {
            processInstId: this.procInstId1,
            agree: true,
            params: [
              {
                key: "processInstId",
                value: this.procInstId1
              },
              {
                key: "teamId",
                value: this.$route.params.id
              },
              {
                key: "userIdStr",
                value: s
              }
            ]
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.$message("邀请成功！", "", {
              type: "warning"
            });
            this.dialogStudentVisible = false;
          }
        });
      },
      //老师
      remove(val) {
        // this.arr1 = this.arr1.filter( item => {
        //     return val != item;
        // });
        // this.tags1 = new Set(this.arr1);
        this.checkList = this.checkList.filter(item => {
          return val != item;
        });
      },
      start() {
        this.dialogTeacherVisible = true;
        this.axios({
          url: "/process/start",
          method: "post",
          headers: { "Content-Type": "application/json" },
          transformRequest: [
            function(data) {
              data = JSON.stringify(data);
              return data;
            }
          ],
          data: {
            processId: 10,
            sourceId: this.$route.params.id,
            sourceType: 12
          }
        }).then(res => {
          this.procInstId = res.data.data.procInstId;
        });
      },
      commit() {
        let s;
        let arr = this.checkList.map(val => {
          return val.split(",")[1];
        });
        s = arr.join(",");
        this.axios({
          url: "/process/commit",
          method: "post",
          headers: { "Content-Type": "application/json" },
          transformRequest: [
            function(data) {
              data = JSON.stringify(data);
              return data;
            }
          ],
          data: {
            processInstId: this.procInstId,
            agree: true,
            params: [
              {
                key: "processInstId",
                value: this.procInstId
              },
              {
                key: "teamId",
                value: this.$route.params.id
              },
              {
                key: "userIdStr",
                value: s
              }
            ]
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.$message("邀请成功！", "", {
              type: "warning"
            });
            this.dialogTeacherVisible = false;
          }
        });
      },
      getTime(time) {
        const date = new Date(time);
        const month =date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + day;
      },
      get_Time(date) {
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + day;
      },
      get_year(date) {
        return date.getFullYear();
      },
      comment(){
        this.dialogVisible = true;
        this.axios.post('/teamproject/manage/intoconfirmteamgrade',{
          teamId:this.$route.params.id
        }).then(res => {
          this.teamDevDegreeList = res.data.data.teamDevDegreeList;
          this.teamGradeList = res.data.data.teamGradeList;
          this.DevRadio = res.data.data.devDegreeId;
          this.GradeRadio = res.data.data.gradeId;
        })
      },
      changeDevRadio(val){
        this.DevRadio = val;
      },
      changeGradeRadio(val){
        this.GradeRadio = val;
      },
    }
  };
</script>

<style scoped>
  .wrap {
    padding: 0px 10px 13px 10px;
    border-bottom: solid 1px #d3dce6;
  }
  .mc-content-head {
    position: relative;
  }
  #mc-content .content.tab-content {
    padding-top: 15px;
  }
  .mc-content-head .floatLeft {
    width: 195px;
    height: 130px;
    background: #ccc;
    margin-right: 20px;
    position: relative;
    overflow: hidden;
  }
  .mc-content-head .floatLeft > img {
    width: 100%;
    height: 100%;
  }
  .mc-content-head_right {
    padding-left: 215px;
  }
  .mc-content-head_right > p:not(.team_summary) {
    height: 33px;
    vertical-align: middle;
  }
  .mc-content-head_right .if_admin {
    position: absolute;
    top: 0px;
    right: 0px;
    color: #2f9dea;
  }
  .mc-content-head_right .if_admin > i {
    font-size: 20px;
  }
  .mc-content-head_right > p > span {
    font-size: 16px;
  }
  .mc-content-head_right .organize_titie {
    font-weight: bold;
  }
  .mc-content-head_right .official_website {
    padding: 0 3px;
    color: #fff;
    background: #2f9dea;
    text-decoration: none;
  }
  .mc-content-head_right .authentication {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../../assets/images/icon/bg-team.png) -250px 0 no-repeat;
    vertical-align: middle;
    margin: 0 5px;
  }
  .clear {
    zoom: 1;
  }
  #mc-content {
    padding: 40px 30px 0px;
  }
  #mc-content {
    min-height: 150px;
  }
  .team_type {
    position: absolute;
    top: 15px;
    left: -24px;
    color: #fff;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    width: 100px;
    text-align: center;
  }
  .color_yellow {
    background: #f7be11;
    color: #fff;
  }
  .information._1 > span {
    font-size: 12px;
    color: rgb(59, 73, 83);
    background-color: rgb(235, 236, 237);
    user-select: none;
    display: inline-block;
    line-height: 24px;
    height: 24px;
    margin: 0px 10px 10px 0px;
    padding: 0px 24px;
  }
  .mc-content-head_right .if_admin {
    position: absolute;
    top: 0px;
    right: 0px;
    color: rgb(47, 157, 234);
  }
  .btn-type-blue {
    color: #fff;
    background-color: #2f9dea;
    border: solid 1px #2f9dea;
    border-radius: 0;
  }
  .btn-type-1 {
    display: inline-block;
    width: 123px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .team_leaguer {
    padding-top: 30px;
  }
  .team_leaguer li {
    float: left;
    width: 300px;
    padding: 15px 20px 0 20px;
    height: 80px;
    border: 1px solid #e7e7e7;
    margin: 0 18px 20px 0;
    float: left;
    color: #000;
  }
  .team_leaguer li:hover {
    -moz-box-shadow: 2px 2px 2px #ccc;
    -webkit-box-shadow: 2px 2px 2px #ccc;
    box-shadow: 2px 2px 2px #ccc;
  }
  .team_leaguer li .overflow {
    line-height: 24px;
  }
  .leaguer_img {
    margin-right: 16px;
  }
  .leaguer_img img {
    width: 50px;
    height: 50px;
    border: 1px solid #e7e7e7;
    border-radius: 25px;
  }
  .project-item {
    margin: 20px 18px 5px 0;
  }
  span.root_power.admin_people {
    color: rgb(255, 255, 255);
    background: rgb(75, 202, 136);
  }
  .con {
    margin-top: -30px;
  }
  .con > p {
    margin: 30px 15px 15px 0px;
    display: block;
  }
  .con > p:before {
    position: relative;
    content: "*";
    top: 3px;
    color: #e85959;
    margin-right: 5px;
  }
  .achievementMain {
    padding: 24px 24px 0 24px;
    box-sizing: border-box;
    width: 100%;
    color: #333;
    font-size: 0;
  }
  .achievementMain .achievementMainLi .title {
    border-bottom: 1px solid #deeaff;
    margin-bottom: 26px;
    line-height: 1.4;
    overflow: hidden;
    line-height: 26px;
    cursor: pointer;
  }
  .achievementMain .achievementMainLi .title span:nth-of-type(1) {
    background: #2f9dea;
    display: inline-block;
    width: 7px;
    height: 18px;
    margin-right: 5px;
  }
  .achievementMain .achievementMainLi .title span {
    font-size: 18px;
    vertical-align: middle;
  }
  .achievementMain .achievementMainLi ol {
    list-style: none;
    counter-reset: sectioncounter;
    padding: 0;
  }
  .achievementMain .achievementMainLi ol > li {
    margin-bottom: 16px;
    line-height: 26px;
    font-size: 0;
    cursor: pointer;
    padding-right: 70px;
    box-sizing: border-box;
    position: relative;
  }
  .achievementMain .achievementMainLi ol > li p {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
  }
  .achievementMain .achievementMainLi ol > li:hover {
    color: #4289ff;
  }
  .achievementMain .achievementMainLi ol > li:before {
    content: "" counter(sectioncounter) ".";
    counter-increment: sectioncounter;
    font-size: 16px;
    vertical-align: middle;
  }
  .advertises_for > li {
    padding-bottom: 10px;
    border-bottom: 1px solid #e9f4fb;
    margin-bottom: 20px;
  }
  .advertises_for > li > div:first-child {
    height: 40px;
    line-height: 40px;
  }
  .advertises_for > li > span {
    color: #2f9dea;
    cursor: pointer;
    font-size: 14px;
  }
  .advertises_for > li .abstract {
    margin: 5px 0 20px 0;
    padding-right: 16%;
  }
  .panel-collapse {
    display: none;
  }
  .p_zhan > span:first-child {
    padding-right: 100px;
  }
  .el-icon-setting {
    font-size: 20px;
  }
  .tab-content > .active {
    display: block;
  }
  .mc-content-bottom .content.tab-content > div > ul > li {
    line-height: 60px;
    position: relative;
    padding-left: 30px;
  }
  .news_head {
    height: 60px;
    line-height: 60px;
    position: relative;
  }
  .news_head a {
    text-decoration: none;
    color: #2f9dea;
    font-weight: bold;
  }
  .news_head .delete_all {
    margin-left: 10px;
  }
  .news_head .delete_all {
    line-height: 1;
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e0e0e0;
  }
  .form-cr {
    position: absolute;
    left: 0;
    box-sizing: border-box;
    padding-left: 20px;
    line-height: 42px;
    display: inline-block;
  }
  .form-cr .el-checkbox {
    display: inline-block;
  }
  .admin_member_img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 0px 20px 0 38px;
    vertical-align: middle;
  }
  .user_detail {
    display: inline-block;
    position: relative;
    padding-right: 45px;
  }
  span.root_power.creating_people {
    background: #f7be11;
    color: #fff;
  }
  span.root_power.creating_people {
    background: #f7be11;
    color: #fff;
  }
  .list_data {
    line-height: 42px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .powers {
    position: relative;
    width: 53%;
    float: left;
  }
  .list_data > div:first-child {
    width: 45%;
    padding-left: 16px;
    float: left;
    position: relative;
  }
  .root_power {
    margin-left: 10px;
    padding: 5px;
  }
  span {
    font-size: 14px;
  }
  .floatRight {
    float: right;
  }
  .ql-container.ql-snow {
    border: 1px solid #ccc;
    padding: 20px;
  }
  ul.business_list {
    border: 1px solid #f3f9fd;
    margin-top: 10px;
    /* height: 300px; */
    overflow: auto;
  }
  .add,
  .edit,
  .delete {
    width: 32px;
    height: 26px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    color: #fff;
    transition: all 0.3s;
  }
  .add,
  .edit {
    background: #2f9dea;
  }
  .edit {
    position: absolute;
    top: 0;
    right: 40px;
    font-size: 17px;
  }
  .delete {
    background: #cc4949;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
  }
  .Results_title {
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 24px;
  }
  .ResultsVisible li {
    position: relative;
    padding-left: 74px;
    margin-bottom: 24px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
  }
  .ResultsVisible li .frame {
    width: 64px;
    text-align: right;
    font-size: 14px;
    color: #999;
    position: absolute;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .types {
    padding: 20px 20px 0;
    border-bottom: 5px solid #fbfbfb;
  }
  .types ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .types ul li.type {
    width: 70px;
    height: 32px;
    border-radius: 4px;
    background: #fff;
    line-height: 32px;
    text-align: center;
    margin-right: 15px;
    margin-bottom: 15px;
    display: inline-block;
    border: 1px solid #4289ff;
    color: #4289ff;
    cursor: pointer;
    transition: all 0.3s;
  }
  .types ul li.type span {
    font-size: 14px;
  }
  .types ul i {
    font-size: 24px;
    margin-top: 4px;
    color: #4289ff;
    cursor: pointer;
  }
  .choice {
    background: #4289ff !important;
    color: #fff !important;
  }
  .contentBox .content {
    padding: 21px 28px;
    display: none;
  }

  .contentBox .content:nth-of-type(1) {
    display: block;
  }

  .contentBox .content div > ul {
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
  }

  .contentBox .content div > ul > li {
    padding-left: 70px;
    /*height: 36px;*/
    line-height: 36px;
    margin-bottom: 14px;
    position: relative;
  }

  .contentBox .content div > ul > li input[type="text"],
  .contentBox .content div > ul > li .down {
    width: 240px;
    height: 36px;
    box-sizing: border-box;
    font-size: 14px;
    padding: 5px 10px;
  }

  .contentBox .content div > ul > li .down {
    text-align: center;
    padding: 0 30px 0 10px;
    background: #fff;
    position: relative;
    line-height: 34px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    cursor: pointer;
  }

  .contentBox .content div > ul > li .down .text {
    font-size: 14px;
    width: 100%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .contentBox .content div > ul > li .down i.icon-angle-down {
    position: absolute;
    right: 2px;
    top: 0px;
    font-size: 30px;
    line-height: 34px;
    transition: all 0.3s;
  }

  .contentBox .content div > ul > li .down .rotate {
    transform: rotate(180deg);
  }

  .contentBox .content div > ul > li .down .downAll {
    width: 100%;
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 1;
    border: 1px solid #eee;
    display: none;
    border-radius: 1px;
    max-height: 180px;
    overflow-y: auto;
  }

  .contentBox .content div > ul > li .down .downAll i {
    display: block;
    width: 100%;
    height: 36px;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    padding: 0 5px;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .contentBox .content div > ul > li .down .downAll i:hover {
    background: #f3f3f3;
  }

  .contentBox .content div > ul > li .down .downAll i:nth-last-of-type(1) {
    border: none;
  }

  .contentBox .content div > ul > li .choice {
    border: 1px solid #4289ff;
  }
  .contentBox .content div > ul > li .authorInput {
    width: 72px !important;
    vertical-align: middle;
    margin-right: 10px;
  }

  .contentBox .content div > ul > li .authorBox {
    display: inline-block;
    vertical-align: middle;
  }

  .contentBox .content div > ul > li .authorBox .author {
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
  }

  .contentBox .content div > ul > li .authorBox .author i {
    font-style: normal;
    width: 72px;
    height: 36px;
    border: 1px solid #4289ff;
    margin-right: 8px;
    color: #4289ff;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    line-height: 34px;
    text-align: center;
    border-radius: 3px;
  }

  .contentBox .content div > ul li .authorBox .author i.selected {
    border: 2px solid #4289ff;
    color: #4289ff;
  }

  .contentBox .content div > ul li .authorBox .author i span {
    font-size: 14px;
  }

  .contentBox .content div > ul > li .authorBox i.iconfont {
    font-size: 14px;
    vertical-align: middle;
    color: #4289ff;
  }

  .contentBox .content div > ul > li .authorBox i.iconfont:nth-of-type(1) {
    margin-right: 16px;
  }

  .contentBox .content div > ul > li .file {
    width: 72px;
    height: 30px;
    border-radius: 4px;
    font-size: 14px;
    background: #24b076;
    color: #fff;
    text-align: center;
    line-height: 30px;
    position: relative;
  }

  .contentBox .content div > ul > li .file input {
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    font-size: 0;
    opacity: 0;
  }

  .contentBox .content div > ul > li > span {
    position: absolute;
    left: 0;
    color: #666;
    font-size: 14px;
  }
  .push {
    font-size: 14px;
    height: 36px;
    width: 120px;
    margin: auto;
    text-align: center;
    line-height: 36px;
    background: #4289ff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  input {
    border: 1px solid #f0f0f0;
    outline: none;
    background: #fff;
  }
  .dialogflex {
    display: flex;
    justify-content: space-between;
  }
  .dialogflex > div {
    border: 1px solid #dedede;
    margin: 10px 0px;
    padding: 0px 10px;
    flex-grow: 1;
  }
  .dialogflex > div:first-child {
    margin-right: 20px;
    flex-grow: 0;
    padding: 10px 20px 10px 10px;
  }
  .list {
    display: flex;
    flex-direction: column;
  }
  .list > div {
    display: flex;
    align-items: center;
    margin: 10px;
    flex-wrap: wrap;
  }
  .list img {
    border-radius: 50%;
    vertical-align: middle;
    margin: 0 10px;
    width: 44px;
    height: 44px;
  }
  .list1 {
    border: 1px solid #dedede;
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }
  .tab-pane {
   
  }
   .team_news>li{
          line-height: 55px;
    height: 55px;
    position: relative; 
    }
    .team_news>li>p:first-child {
    position: absolute;
    left: 0;
    right: 100px;
    top: 0;
    bottom: 0;
    padding-right: 5%;
    text-indent: 14px;
    }
    .team_news>li>p:last-child {
    float: right;
    width: 100px;
    color: currentcolor;
    }
    .team_news>li .text-ellipsis-1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
    .team_news>li:hover {
    background: #F3F9FD;
    color: #2F9DEA;
    }
</style>