<template>
    <div>
        <div class="wrap" v-if="workshop.length > 0">
            <div class="head">
                <span>欢迎访问广州市轻工技师学院</span>
                <span><a>设为首页</a><a>加入收藏</a></span>
            </div>
            <div class="nav">
                <div>
                    <img src="../assets/LOGO1.png">
                    <a @click="handleNav(1)" :class="{navActive:navActive == 1}">
                        <img :src="navActive == 1?  require('../assets/images/an1.png'):require('../assets/images/n1.png')">新闻动态
                    </a>
                    <a @click="handleNav(2)" :class="{navActive:navActive == 2}">
                        <img :src="navActive == 2?  require('../assets/images/an2.png'):require('../assets/images/n2.png')">轻创竞技场
                    </a>
                    <a @click="handleNav(3)" :class="{navActive3:navActive == 3}">
                        <img :src="navActive == 3?  require('../assets/images/an3.png'):require('../assets/images/n3.png')">轻创沙龙
                    </a>
                    <a @click="handleNav(4)" :class="{navActive4:navActive == 4}">
                        <img :src="navActive == 4?  require('../assets/images/an4.png'):require('../assets/images/n4.png')">轻创工坊
                    </a>
                    <a @click="handleNav(5)" :class="{navActive5:navActive == 5}">
                        <img :src="navActive == 5?  require('../assets/images/an5.png'):require('../assets/images/n5.png')">轻创梦工厂
                    </a>
                    <a @click="handleNav(6)" :class="{navActive:navActive == 6}">
                        <img :src="navActive == 6?  require('../assets/images/an6.png'):require('../assets/images/n6.png')">轻创展板
                    </a>
                </div>
                <div>
                    <button @click="jump('/login')" v-if="$store.state.user.token == null">登录</button>
                    <el-select  @change="winOpen" v-model="value" placeholder="服务应用" style="width: 115px;margin-left: 2px;" v-if="$store.state.user.token != null && options.length > 0">
                        <el-option
                                v-for="item in options"
                                :key="item.webUrl"
                                :label="item.webName"
                                :value="item.webUrl">
                        </el-option>
                    </el-select>
<!--                    <button>注册</button>-->

                </div>
            </div>
            <div id="wrap">
                <div id="content">
                    <div class="photo"
                    >
                        <div :style="{width:width+'%',marginLeft:marginLeft+'%'}">
                            <div v-for="item in src" :style="{width:widths+'%'}">
                                <img src="../assets/images/bg1.png">
                                <img src="../assets/images/bg2.png" :class="{imgactive:isActive == 0}">
                                <p :class="{pactive:isActive == 0}">广州市轻工技师学院创业创新云平台</p>
                                <p :class="{pactive1:isActive == 0}">与课堂教学深度融合</p>
                                <p :class="{pactive2:isActive == 0}">促进跨专业工坊组建，跨学科项目推进</p>
                                <a :class="{aactive:isActive == 0}">立即体验</a>
                            </div>
                        </div>
                        <p>
                            <a
                                    class="bannernoactive"
                                    v-for="(item,index) in src"
                                    @click="change(index)"
                                    :class="{'banneractive':index === isActive}">
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="news_wrap">
                <div class="news">
                    <div class="listhead">
                        <div>
                            <img src="../assets/images/list1.png" class="listimg">
                            <a>新闻动态</a>
                            <span>NEWS</span>
                        </div>
                        <div class="more">
                            <a @click="jump('/list/1')">更多+</a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img :src=newsrc :class="{changeImg:changeImg == true}">
                        </div>
                        <div>
                            <a v-for="(item,index) in newsData" @click="changelist(index)" :class="{listactive:list == index}">{{item}}</a>
                        </div>
                        <div>
                            <div>
                                <a @click="changeNews(1)" :class="{newsactive:news == 1}">学校要闻</a>
                                <a @click="changeNews(2)" :class="{newsactive:news == 2}">通知公告</a>
                            </div>
                            <div v-if="news == 1">
                                <img src="../assets/images/news.png">
                                <span>{{yaowen[0]}}</span>
                                <p>{{yaowen[1]}}</p>
                            </div>
                            <div v-if="news == 1">
                                <p v-for="item in yaowen1"><span>{{item.time}}</span>{{item.data}}</p>
                            </div>
                            <div v-if="news == 2">
                                <img src="../assets/images/news.png">
                                <span>{{gonggao[0]}}</span>
                                <p>{{gonggao[1]}}</p>
                            </div>
                            <div v-if="news == 2">
                                <p v-for="item in gonggao1"><span>{{item.time}}</span>{{item.data}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="arena">
                <div class="news">
                    <div class="listhead">
                        <div>
                            <img src="../assets/images/list2.png" class="listimg">
                            <a>轻创竞技场</a>
                            <span>ARENA</span>
                        </div>
                        <div class="more">
                            <a @click="jump('/list/5')">更多+</a>
                        </div>
                    </div>
                    <div>
                        <div v-model="arenaData">
                            <a>双创信息</a>
                            <p>{{arenaData[isArenaImg3%3].title}} </p>
                            <p>{{arenaData[isArenaImg3%3].summary}}</p>
                        </div>
                        <div v-model="arenaImg">
                            <img :src="arenaImg[0]" @click="changeArenaImg(1)"
                                 :class="{img1:isArenaImg1%3 == 0,img2:isArenaImg1%3 == 1,img3:isArenaImg1%3 == 2}">
                            <img :src="arenaImg[1]" @click="changeArenaImg(2)"
                                 :class="{img1:isArenaImg2%3 == 0,img2:isArenaImg2%3 == 1,img3:isArenaImg2%3 == 2}">
                            <img :src="arenaImg[2]" @click="changeArenaImg(3)"
                                 :class="{img1:isArenaImg3%3 == 0,img2:isArenaImg3%3 == 1,img3:isArenaImg3%3 == 2}">
                        </div>
                    </div>
<!--                    <p style="display: flex;justify-content: center">-->
<!--                        <a-->
<!--                                class="bannernoactive"-->
<!--                                v-for="(item,index) in src"-->
<!--                                @click="change(index)"-->
<!--                                :class="{'banneractive':index === isActive}">-->
<!--                        </a>-->
<!--                    </p>-->
                </div>
            </div>
            <div class="salon">
                <div class="news">
                    <div class="listhead">
                        <div>
                            <img src="../assets/images/list3.png" class="listimg">
                            <a>轻创沙龙</a>
                            <span>SALON</span>
                        </div>
                        <div class="more">
                            <a>更多+</a>
                        </div>
                    </div>
                    <div>
                        <div v-for="item in salon">
                            <img :src="item.src">
                            <p>{{item.name}}</p>
                            <span>负责人：{{item.person}} </span>
                            <span>成员：{{item.count}}人</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="workshop">
                <div class="news">
                    <div class="listhead">
                        <div>
                            <img src="../assets/images/list4.png" class="listimg">
                            <a>轻创工坊</a>
                            <span>WORKSHOP</span>
                        </div>
                        <div class="more">
                            <a>更多+</a>
                        </div>
                    </div>
                    <div>
                        <div :style="{backgroundImage:'url('+workshop[0].src+')'}">
                            <p>{{workshop[0].name}}</p>
                        </div>
                        <div>
                            <a v-for="item in workshop1">
                                <img :src="item.src">
                                <div>
                                    <p>{{item.name}}</p>
                                    <span> 负责人：{{item.per}}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span>轻创导师</span>
                            <div></div>
                            <div>
                                <a @click="left3"> < </a>
                                <a @click="right3"> > </a>
                            </div>
                        </div>
                        <div>
                            <div :style="{width:width3+'%',marginLeft:marginLeft3+'%'}">
                                <a v-for="item in src3">
                                    <div>
                                        <p>{{item.title}} <span> {{item.subTitle}}</span></p>
                                        <span>{{item.summary}}</span>
                                    </div>
                                    <img :src="item.src">
                                </a>
                            </div>
                        </div>
                        <div>
                            <p style="display: flex;justify-content: center;padding-top: 15px">
                                <a
                                        class="bannernoactive"
                                        style="margin: 0 10px;"
                                        v-for="(item,index) in src33"
                                        @click="change3(index)"
                                        :class="{'banneractive':index === isActive3}">
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dreamwork">
                <div class="news">
                    <div class="listhead">
                        <div>
                            <img src="../assets/images/list3.png" class="listimg">
                            <a>轻创梦工厂</a>
                            <span>DREAMWORKS</span>
                        </div>
                        <div class="more">
                            <a @click="jump('/list/6')">MORE+</a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>轻创梦工厂简介<span></span></p>
                            <span>梦工厂动画公司 （DreamWorks Animation SKG, Inc.）是一个总部位于美国加利福尼亚州格伦代尔的动画工作室。公司于2004年由梦工厂工作室的动画部门分拆而成立，同年在纳斯达克上市。公司影片曾经由派拉蒙影业负责发行。2013年起，由20世纪福克斯发行。2018年起，由环球影业发行 [1]  。</span>
                        </div>
                        <div>
                            <img :src="src1[isActive1]">
                            <div>
                                <div>
                                    <div :style="{width:width1+'px',marginLeft:marginLeft1+'px'}">
                                        <div v-for="(item,index) in src1" @click="active(index)"><img :class="{imgactive1:isActive1 == index}" :src="item"></div>
                                    </div>
                                </div>
                                <a @click="left"> < </a>
                                <a @click="right"> > </a>
                            </div>
                        </div>
                    </div>
                    <div class="listhead" style="margin-top: 140px">
                        <div>
                            <img src="../assets/images/list6.png" class="listimg">
                            <a>轻创展板</a>
                            <span>EXHIBITION BOARD</span>
                        </div>
                        <div class="more">
                            <a @click="jump('/list/7')">更多+</a>
                        </div>
                    </div>
                    <div class="board">
                        <a @click="left2"> < </a>
                        <div class="photo" style="flex:1">
                            <div :style="{width:width2+'%',marginLeft:marginLeft2+'%'}">
                                <div v-for="(item,index) in src2" :style="{width:widths2+'%',backgroundImage:'url('+item+')'}">
                                    <p>{{msg[index]}}</p>
                                </div>
                            </div>
                            <p>
                                <a
                                        class="bannernoactive"
                                        v-for="(item,index) in src2"
                                        @click="change2(index)"
                                        :class="{'banneractive':index === isActive2}">
                                </a>
                            </p>
                        </div>
                        <a @click="right2"> > </a>
                    </div>
                    <div class="imglist">
                        <div :style="{marginLeft:left4+'px'}">
                            <div
                                    v-for="(item,index) in data3">
                                <img :src="item.src">
                                <p>0{{index+1}}<span>{{item.title}}</span></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="msg">
                    <p>相关链接：<span>学校官网    教务处    教育网    飞瑞敖</span></p>
                    <p>校本部（北校区）： <span>广州市白云区钟落潭镇竹料管理区东凤南路38号  </span></p>
                    <p>南校区： <span>广州市海珠区滨江中路272号</span></p>
                    <p>南校区： <span>广州市海珠区滨江中路272号</span></p>
                    <p>招生就业处电话： <span>020-32446313 020-32446366 020-32445316 </span></p>
                </div>
                <div class="line"></div>
                <div class="msg"><p><span>2006-2007 COPYRIGHT 广州市轻工高级技工学校网络中心，inc.All rights reserved 粤ICP备16041075号-1粤公网安备 44010502000860号</span></p></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                navActive:null,
                src:[''],
                isActive:null,
                newsData:[  ],
                newsrcs:[],
                newsrc:null,
                list:0,
                yaowen:[],
                yaowen1:[],
                gonggao:[],
                gonggao1:[],
                arenaData:[],
                arenaImg:[],
                isArenaImg1:0,
                isArenaImg2:1,
                isArenaImg3:2,
                src1:[],
                isActive1:0,
                src2:[],
                msg:[],
                isActive2:0,
                data3:[],
                salon:[],
                workshop:[],
                workshop1:[],
                isActive4:0,
                con:4,

                options: [],
                src3:[],
                isActive3:0,
                srcexe:[require('../assets/images/123.png'),require('../assets/images/bg2.png')],
                news:1,
                changeImg:false,
                arr:[{ }]
            }
        },
        mounted:function () {
            setTimeout(()=>{
                this.isActive = 0
            },1000);
            setInterval(()=>{
                this.isActive4 ++;
                this.con++;
                if(this.con > this.data3.length){
                    this.isActive4 = 0;
                    this.con = 4;
                }
            },5000);
            this.getData();
            this.getData1();
            this.getData2();
        },
        watch:{

        },
        computed:{
            left4:function(){
                return (this.data3.length-4) * 350 - this.isActive4*650
            },
            width:function () {
                return this.src.length*100
            },
            widths:function () {
                return 100/this.src.length
            },
            marginLeft:function () {
                return this.isActive*-100
            },
            width2:function () {
                return this.src2.length*100
            },
            widths2:function () {
                return 100/this.src2.length
            },
            marginLeft2:function () {
                return this.isActive2 * -100
            },
            width3:function () {
                return Math.ceil(this.src3.length/2)*100
            },
            marginLeft3:function () {
                return this.isActive3 * -100
            },
            src33:function(){
              return  Math.ceil(this.src3.length/2)
            },
            width1:function () {
                return 230*this.src1.length;
            },
            marginLeft1:function () {
                if(this.isActive1 == 0){
                    return 0
                }
                if(this.isActive1 % 4 == 0){
                    return -(this.isActive1/4)*930
                }else{
                    return -(Math.ceil(this.isActive1/4)-1)*930
                }
            },
        },
        methods:{
            // add(){
            //   this.isActive4 ++;
            //   this.con++;
            //   if(this.con > this.data3.length){
            //       this.isActive4 = 0;
            //       this.con = 4;
            //   }
            // },
            getData(){
                let id = null;
                if(this.$store.state.user.userId == null){
                    id = -1;
                }else{
                    id = this.$store.state.user.userId
                }
              this.axios({
                  url:'/portal/homepage',
                  method:'post',
                  baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                  // baseURL:'/api/schoolinfo',
                  data:{userId:id},
              }).then((res)=>{
                  //新闻动态
                  let data = res.data;
                  if(data.data.webUrlInfo){
                      this.options = data.data.webUrlInfo;
                      this.$store.commit('setList',data.data.webUrlInfo)
                  }
                  let arr1=[];
                  let arr2=[];
                  for(let item of data.data.allResult[0].contentPageInfo.result){
                      arr1.push(item.title);
                      arr2.push(item.thumbNail_image)
                  }
                  this.newsData = arr1;
                  this.newsrcs = arr2;
                  this.newsrc = this.newsrcs[0]
                  // this.newsrcs = arr2.map((val)=>{ return require(val)});
                  //学校要闻
                  let arr3=[];
                  let arr4=[];
                  for(let i = 0;i<2;i++){
                      arr3.push(data.data.allResult[1].contentPageInfo.result[i].title)
                  }
                  for(let i = 2;i<5;i++){
                      if(data.data.allResult[1].contentPageInfo.result[i]){
                          let obj={};
                          let time = new Date(data.data.allResult[1].contentPageInfo.result[i].create_time);
                          let month = time.getMonth()+1;
                          month =(month<10 ? "0"+month:month);
                          let day = time.getDay();
                          day =(day<10 ? "0"+day:day);
                          let mydate = month.toString()+'/'+day.toString();
                          obj.time = mydate;
                          obj.data = data.data.allResult[1].contentPageInfo.result[i].title;
                          arr4.push(obj)
                      }
                  }
                  this.yaowen = arr3;
                  this.yaowen1 = arr4;
                  //学校要闻
                  let arr5=[];
                  let arr6=[];
                  for(let i = 0;i<2;i++){
                      arr5.push(data.data.allResult[2].contentPageInfo.result[i].title)
                  }
                  for(let i = 2;i<5;i++){
                      if(data.data.allResult[2].contentPageInfo.result[i].title){
                          let obj={};
                          let time = new Date(data.data.allResult[2].contentPageInfo.result[i].create_time);
                          let month = time.getMonth()+1;
                          month =(month<10 ? "0"+month:month);
                          let day = time.getDay();
                          day =(day<10 ? "0"+day:day);
                          let mydate = month.toString()+'/'+day.toString();
                          obj.time = mydate;
                          obj.data = data.data.allResult[2].contentPageInfo.result[i].title;
                          arr6.push(obj)
                      }
                  }
                  this.gonggao = arr5;
                  this.gonggao1 = arr6;
                  //竞技场
                  let arr7=[];
                  let arr8=[];
                  for(let i = 0;i<3;i++){
                      let obj={};
                      obj.title = data.data.allResult[3].contentPageInfo.result[i].title;
                      obj.summary = data.data.allResult[3].contentPageInfo.result[i].summary;
                      arr7.push(obj);
                      arr8.push(data.data.allResult[3].contentPageInfo.result[i].thumbNail_image);
                  }
                  this.arenaData = arr7;
                  this.arenaImg = arr8;
                  //导师
                  let l=0;
                  if(data.data.allResult[4].contentPageInfo.result.length > 6){
                      l=7;
                  }else{
                      l=data.data.allResult[4].contentPageInfo.result.length;
                  }
                  for(let i = 0;i<l;i++){
                      if(data.data.allResult[4].contentPageInfo.result[i].title != undefined){
                          let obj={};
                          obj.title = data.data.allResult[4].contentPageInfo.result[i].title;
                          obj.summary = data.data.allResult[4].contentPageInfo.result[i].summary;
                          obj.subTitle = data.data.allResult[4].contentPageInfo.result[i].subTitle;
                          obj.src = data.data.allResult[4].contentPageInfo.result[i].thumbNail_image;
                          this.src3.push(obj)
                      }
                  }
                  //梦工厂
                  for(let i = 0;i<data.data.allResult[5].contentPageInfo.result.length;i++){
                      this.src1.push(data.data.allResult[5].contentPageInfo.result[i].thumbNail_image);
                  }
                  //活动信息
                  for(let i = 0;i<data.data.allResult[7].contentPageInfo.result.length;i++){
                      this.src2.push(data.data.allResult[7].contentPageInfo.result[i].thumbNail_image);
                      this.msg.push(data.data.allResult[7].contentPageInfo.result[i].title);
                  }
                  //获奖信息
                  let j=0;
                  if(data.data.allResult[6].contentPageInfo.result.length>8){
                      j=8;
                  }else{
                      j=data.data.allResult[6].contentPageInfo.result.length;
                  }
                  for(let i = 0;i<j;i++){
                      let obj={};
                      obj.src = data.data.allResult[6].contentPageInfo.result[i].thumbNail_image;
                      obj.title = data.data.allResult[6].contentPageInfo.result[i].title;
                      this.data3.push(obj);
                  }
              })
            },
            getData1(){
                this.axios({
                    url:'/portal/salon/list',
                    method:'post',
                    // baseURL:'/api/schoolinfo',
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    data:{userId:this.$store.state.user.userId},
                }).then((res)=>{
                    let data = res.data;
                    let l = 0;
                    if(data.data.salonList.length > 7){
                        l = 6;
                    }else{
                        l = data.data.salonList.length;
                    }
                    for(let i=0;i<l;i++){
                        let obj = {};
                        obj.src = data.data.salonList[i].salonImg;
                        obj.name = data.data.salonList[i].salonName;
                        obj.person = data.data.salonList[i].userChargeName;
                        obj.count = data.data.salonList[i].salonMemberCount;
                        this.salon.push(obj)
                    }
                })
            },
            getData2(){
                this.axios({
                    url:'/portal/team/list',
                    method:'post',
                    // baseURL:'/api/schoolinfo',
                    baseURL:'http://api.test.chuangfeigu.com/schoolinfo',
                    data:{userId:this.$store.state.user.userId},
                }).then((res)=>{
                    let data = res.data;
                    let l = 0;
                    if(data.data.teamList.length > 5){
                        l = 5;
                    }else{
                        l = data.data.teamList.length;
                    }
                    let obj1={};
                    obj1.src = data.data.teamList[0].imgAddress;
                    obj1.name = data.data.teamList[0].teamName;
                    obj1.per = data.data.teamList[0].chargeName;
                    this.workshop.push(obj1);
                    for(let i=1;i<l;i++){
                        let obj={};
                        obj.src = data.data.teamList[i].imgAddress;
                        obj.name = data.data.teamList[i].teamName;
                        obj.per = data.data.teamList[i].chargeName;
                        this.workshop1.push(obj);
                    }
                })
            },
            change(index){
                this.isActive = index
            },
            change2(index){
                this.isActive2 = index
            },
            change3(index){
                this.isActive3 = index
            },
            changeArenaImg(i){
                this.isArenaImg1 ++;
                this.isArenaImg2 ++;
                this.isArenaImg3 ++;
            },
            changeNews(i){
              this.news = i;
            },
            changelist(i){
                this.list = i;
                this.changeImg = true;
                setTimeout(()=>{
                    this.changeImg = false;
                    this.newsrc = this.newsrcs[i];
                },400)
            },
            handleNav(index){
                this.navActive = index
            },
            active(index){
                this.isActive1 = index;
            },
            left(){
                if(this.isActive1 == 0){

                }else{
                    this.isActive1 -- ;
                }
            },
            right(){
                if(this.isActive1 == this.src1.length-1){
                    // this.isActive1 = 0;
                }else{
                    this.isActive1 ++ ;
                }
            },
            jump(url){
                this.$router.push({path:url})
            },
            left2(){
                if(this.isActive2 == 0){

                }else{
                    this.isActive2 --;
                }
            },
            right2(){
                if(this.isActive2 == this.src2.length-1){

                }else{
                    this.isActive2 ++;
                }
            },
            left3(){
                if(this.isActive3 == 0){

                }else{
                    this.isActive3 --;
                }
            },
            right3(){
                if(this.isActive3 == Math .ceil(this.src3.length/2)-1){

                }else{
                    this.isActive3 ++;
                }
            },
            winOpen(val){
                window.open(val)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        .head{
            width: 100%;
            box-sizing: border-box;
            height:40px;
            background:rgba(56,65,90,1);
            padding: 0 20px;
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            color:rgba(255,255,255,1);
            a{
                margin: 0 5px;
                display: inline-block;
                color: white;
                &:first-child:after{
                    height: 100%;
                    width: 2px;
                    content: '';
                    margin-left: 10px;
                    border-right: 1px solid rgba(255,255,255,1);
                }
            }
        }
        .nav{
            width: 100%;
            height:100px;
            background:rgba(255,255,255,1);
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            >div{
                display: flex;
                align-items: center;
                img{
                    width:234px;
                    height: 108px;
                    margin-right: 5px;
                }
                .navActive{
                    background-color: #0082CA;
                    color:#FFFFFF!important;
                }
                .navActive3{
                    background-color: #19C0C2;
                    color:#FFFFFF!important;
                }
                .navActive4{
                    background-color: #11BA94;
                    color:#FFFFFF!important;
                }
                .navActive5{
                    background-color: #7B4AD6;
                    color:#FFFFFF!important;
                }
                a{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width:162px;
                    height:100%;
                    text-align: center;
                    line-height: 100px;
                    font-weight:bold;
                    color:rgba(27,27,27,1);
                    font-size: 20px;
                    img{
                        width: 22px;
                        height: 22px;
                        margin-right: 5px;
                    }
                }
                button{
                    width:54px;
                    height:30px;
                    border:1px solid rgba(50,170,252,1);
                    background-color: white;
                    display: block;
                    &:last-child{
                        margin-left: 7px;
                    }
                }
            }
        }
    }
    #wrap{
        width: 100%;
        box-sizing: border-box;
        >div{
            background:linear-gradient(56deg,rgba(85,149,255,1),rgba(106,110,253,1));
        }
    }
    .photo{
        overflow: hidden;
        width: 1300px;
        margin: 0 auto;
    }
    .photo>p{
        position: relative;
        color: black;
        bottom: 2.2rem;
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .photo>p>a{
        margin: 0 0.4rem;
    }
    .photo>div{
        /*width: 100%;*/
        height: 100%;
        position: relative;
        transition: margin-left 0s;
    }
    .photo>div>div{
        height: 100%;
        text-align: center;
        display: inline-block;
        height:600px;
        position: relative;
        text-align: left;
        img:first-child{
            position: absolute;
            left: -90px;
            top: 45px;
        }
        img:nth-child(2){
            position: absolute;
            right: 100px;
            top: 260px;
            transform: scale(0.33);
            transition: 0.4s all ease-in;
            opacity: 0;
        }
        p:nth-child(3){
            position: absolute;
            font-size:60px;
            font-weight:800;
            color:rgba(255,255,255,1);
            line-height:80px;
            left: 81px;
            top:100px;
            opacity: 0;
            width: 719px;
        }
        p:nth-child(4){
            position: absolute;
            font-size:24px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            left: 81px;
            top:300px;
            opacity: 0;
        }
        p:nth-child(5){
            position: absolute;
            font-size:24px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            left: 81px;
            top:345px;
            opacity: 0;
        }
        a{
            position: absolute;
            display: block;
            width:320px;
            height:72px;
            background:rgba(255,205,52,1);
            left: 81px;
            line-height: 72px;
            font-size:24px;
            color: white;
            text-align: center;
            top: 420px;
            opacity: 0;
        }
    }
    .bannernoactive{
        display: block;
        width:36px;
        height:12px;
        background:rgba(255,255,255,1);
        border-radius: 6px;
    }
    .banneractive{
        background-color: #ff7d00;
    }
    .imgactive{
        right: 54px!important;
        top: 130px!important;
        transform: scale(1)!important;
        opacity: 1!important;
    }
    .pactive{
        animation:pmove 0.5s linear 1;
        opacity: 1!important;
    }
    .pactive1{
        animation:pmove1 0.9s linear 1;
        opacity: 1!important;
    }
    .pactive2{
        animation:pmove1 1.2s ease-in 1;
        opacity: 1!important;
    }
    .aactive{
        animation:amove 1.6s ease-in 1;
        opacity: 1!important;
    }

    @keyframes pmove {
        0%{
            left: 0;
            opacity: 0.1;
            text-shadow: 20px 0px 0px #b8b8b8;
        }
        25%{
            left: 30px;
            opacity: 0.3;
            text-shadow: 50px 0px 0px #cacaca;
        }
        50%{
            left:250px;
            opacity: 0.2;
            text-shadow: 90px 0px 0px #cacaca;
        }
        75%{
            left: 570px;
            opacity: 0.1;
            text-shadow: 130px 0px 0px #cacaca;
        }
        100%{
            left: 81px;
            opacity: 1;
            text-shadow:none;
        }
    }
    @keyframes pmove1 {
        0%{
            left: 0;
            opacity: 0.0;
            text-shadow: 0px 0px 0px #b8b8b8;
        }
        40%{
            left:0;
            opacity: 0.1;
            text-shadow: 0px 0px 0px #cacaca;
        }
        58%{
            left: 30px;
            opacity: 0.3;
            text-shadow: 40px 0px 0px #cacaca;
        }
        70%{
            left:180px;
            opacity: 0.2;
            text-shadow: 80px 0px 0px #cacaca;
        }
        87%{
            left: 420px;
            opacity: 0.1;
            text-shadow: 120px 0px 0px #cacaca;
        }
        100%{
            left: 81px;
            opacity: 1;
            text-shadow:none;
        }
    }
    @keyframes pmove2 {
        0%{
            left: 0;
            opacity: 0.0;
            text-shadow: 0px 0px 0px #b8b8b8;
        }
        70%{
            left:0;
            opacity: 0;
            text-shadow: 0px 0px 0px #cacaca;
        }
        80%{
            left: 30px;
            opacity: 0.1;
            text-shadow: 40px 0px 0px #cacaca;
        }
        86%{
            left:180px;
            opacity: 0.2;
            text-shadow: 80px 0px 0px #cacaca;
        }
        98%{
            left: 350px;
            opacity: 0.1;
            text-shadow: 120px 0px 0px #cacaca;
        }
        100%{
            left: 81px;
            opacity: 1;
            text-shadow:none;
        }
    }
    @keyframes amove {
        0%{
            opacity: 0.0;
        }
        70%{
            opacity: 0;
        }
        80%{
            opacity: 0.1;
            top:500px;
        }
        100%{
            top:420px;
            opacity: 1;
        }
    }
    .listhead{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(241,241,241,1);
        align-items: center;
        >div:first-child{
            a{
                font-size:28px;
                font-family:SourceHanSerifCN-Bold;
                font-weight:bold;
                color:rgba(2,127,193,1);
                text-shadow:1px 1px 4px rgba(13,73,147,0.3);
                border-bottom: 1px solid #027FC1;
                margin-right: 8px;
                padding-bottom: 5px;
            }
            span{
                font-size:15px;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                font-style:italic;
                color:rgba(51,51,51,1);
            }
        }
        .more{
            font-size:16px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(2,127,193,1);
            display: flex;
            align-items: flex-end;
        }
    }
    .news_wrap{
        width: 100%;
        box-sizing: border-box;
        background-color: white;
        .news{
            width: 1300px;
            margin: 0 auto;
            padding: 50px 0;
            >div:nth-child(2){
                padding: 48px 0;
                display: flex;
                justify-content: center;
                >div:first-child{
                    width:476px;
                    height:325px;
                    /*background-size: 100% 100%;*/
                    /*transition: all  1s linear;*/
                    .changeImg{
                        animation: change 0.4s ease-out;
                    }
                    @keyframes change {
                        0%{
                            opacity: 1;
                        }
                        50%{
                            opacity: 0.5;
                        }
                        100%{
                            opacity: 0;
                        }
                    }
                    img{
                        width: 100%;
                        height: 100%;
                        transition: all 1s linear;
                    }
                }
                >div:nth-child(2){
                    width: 310px;
                    height: 325px;
                    background-color:#ECF6FF;
                    .listactive{
                        background-color: #0082CA;
                        color: #FFFFFF!important;
                        position: relative;
                        &:before{
                            position: absolute;
                            left: 5px;
                            top:40px;
                            content: '';
                            border-width: 0 6px 6px;
                            border-style: solid;
                            border-color: transparent transparent white;
                            transform: rotate(90deg);
                        }
                    }
                    >a{
                        width: 100%;
                        height: 81px;
                        display: flex;
                        align-items: center;
                        padding: 20px 25px;
                        box-sizing: border-box;
                        background-color: #ECF6FF;
                        font-size:16px;
                        font-family:PingFang-SC-Bold;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                        line-height:24px;
                    }
                }
                >div:last-child{
                    width: 394px;
                    height: 324px;
                    background-color: white;
                    box-shadow:0px 2px 2px 0px rgba(146,176,192,0.1);
                    >div:first-child{
                        display: flex;
                        .newsactive{
                            border-top: 2px solid #0082CA!important;
                            color: #0082ca !important;
                        }
                        a{
                            width: 50%;
                            padding: 20px 0;
                            text-align: center;
                            border-top: 2px solid #F1F7F9;
                            font-size: 20px;
                            color:rgba(51,51,51,1);
                            font-weight: bold;
                        }
                    }
                    >div:nth-child(2){
                        >img{
                            width:25px;
                            height:23px;
                            vertical-align: middle;
                            margin: 5px 5px 5px 10px;
                        }
                        >span{
                            font-size:20px;
                            font-weight:400;
                            color:rgba(183,15,11,1);
                            line-height:25px;
                        }
                        p{
                            color:rgba(51,51,51,1);
                            line-height:26px;
                            font-size: 14px;
                            padding: 0 5px 0 10px;
                        }
                    }
                    >div:last-child{
                        margin: 10px 15px 0px 15px;
                        padding: 0px 0 25px 0;
                        border-top: 1px dashed rgba(221,221,221,1);
                        >p{
                            margin: 25px 0;
                            font-size: 18px;
                            >span{
                                color:#90D1F5;
                                margin: 0 15px 0 8px;
                            }
                        }
                    }
                }
            }
        }
    }
    .listimg{
        width: 30px;
        height: 34px;
        margin-right: 9px;
        vertical-align: middle;
    }
    .arena{
        background-color: inherit!important;
        width: 100%;
        box-sizing: border-box;
        >.news{
            width: 1300px;
            margin: 0 auto;
            padding: 50px 0 50px 0;
            >div:nth-child(2){
            width: 1300px;
                height: 500px;
            box-sizing: border-box;
                display: flex;
                margin: 50px auto 120px auto;
                justify-content: center;
                >div:first-child{
                    width: 437px;
                    box-sizing: border-box;
                    a{
                        width:88px;
                        height:35px;
                        background:rgba(7,44,135,1);
                        display: block;
                        font-size:16px;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        line-height:35px;
                        text-align: center;
                    }
                    p:nth-child(2){
                        font-size:24px;
                        font-family:PingFang-SC-Bold;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                        line-height:32px;
                        margin: 15px 0;
                    }
                    p:last-child{
                        font-size:16px;
                        font-family:PingFang-SC-Regular;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        line-height:30px;
                    }
                }
                >div:nth-child(2){
                    width: 750px;
                    box-sizing: border-box;
                    position: relative;
                    padding: 0 20px;
                    .img1{
                        width:660px;
                        height:360px;
                        /*right: 0;*/
                        left:91px;
                        top:0px;
                        z-index: 200;
                    }
                    .img2{
                            width:500px;
                            height:300px;
                            left: 20px;
                            top: 200px;
                            z-index: 201;
                    }
                    .img3{
                        width:280px;
                        height:260px;
                        /*right: 110px;*/
                        left:360px;
                        top: 300px;
                        z-index: 202;
                    }
                    >img{
                        padding: 20px;
                        box-sizing: border-box;
                        box-shadow:0px 9px 8px 0px rgba(162,173,179,0.13);
                        position: absolute;
                        background-color: white;
                        transition: all 0.5s linear;
                        /*&:first-child{*/
                        /*    width:660px;*/
                        /*    height:360px;*/
                        /*    right: 0;*/
                        /*    z-index: 200;*/
                        /*}*/
                        /*&:nth-child(2){*/
                        /*    width:500px;*/
                        /*    height:300px;*/
                        /*    left: 20px;*/
                        /*    top: 200px;*/
                        /*    z-index: 201;*/
                        /*}*/
                        /*&:last-child{*/
                        /*    width:280px;*/
                        /*    height:260px;*/
                        /*    right: 110px;*/
                        /*    top: 300px;*/
                        /*    z-index: 202;*/
                        /*}*/
                    }
                }
            }
        }
    }
    .salon {
        background-color: white;
        width: 100%;
        box-sizing: border-box;
        padding: 40px 0 80px 0;
        > .news {
            width: 1300px;
            margin: 0 auto;
            >div:nth-child(2){
                width: 1300px;
                box-sizing: border-box;
                display: flex;
                margin: 0px auto;
                justify-content: center;
                padding-top: 40px;
                flex-wrap: wrap;
                >div{
                    width: 390px;
                    height: 390px;
                    border:1px solid rgba(241,241,241,1);
                    margin: 10px 5px ;
                    img{
                        width:390px;
                        height:300px;
                    }
                    p{
                        margin: 20px;
                        font-size:20px;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                    }
                    span{
                        margin-left: 20px;
                    }
                }
            }
        }
    }
    .workshop {
        background-color: inherit !important;
        width: 100%;
        box-sizing: border-box;
        padding: 66px 0;
        > .news {
            width: 1300px;
            margin: 0 auto;
            >div:nth-child(2){
                width: 1300px;
                box-sizing: border-box;
                display: flex;
                margin: 0px auto;
                justify-content: center;
                >div:first-child{
                    width:600px;
                    height:300px;
                    border-radius:6px;
                    /*background-image: url("../assets/images/123.png");*/
                    background-size: 100%;
                    margin-top: 30px;
                    p{
                        position: relative;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(241,241,241,1);
                        opacity:0.8;
                        border-radius:0px 0px 6px 6px;
                        height: 60px;
                        line-height: 60px;
                        text-indent: 30px;
                        top: 240px;
                    }
                }
                >div:nth-child(2){
                    width: 620px;
                    padding: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    a{
                        width:280px;
                        height:140px;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(241,241,241,1);
                        box-shadow:0px 3px 10px 0px rgba(96,122,252,0.1);
                        border-radius:6px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 10px;
                        img{
                            width: 60px;
                            height: 70px;
                            margin-right: 10px;
                        }
                        >div{
                            p{
                                color:rgba(51,51,51,1);
                                font-size: 20px;
                                width: 163px;
                                line-height: 26px;
                                height: 50px;
                            }
                            span{
                                display: inline-block;
                                color: #999999;
                                font-size: 16px;
                                margin-top: 14px;
                            }
                        }
                    }
                }
            }
            >div:nth-child(3){
                width: 1300px;
                margin:45px auto;
                >div:first-child{
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                    >span{
                        font-size:24px;
                        font-family:SourceHanSerifCN-Bold;
                        font-weight:bold;
                        color:rgba(2,127,193,1);
                        display: inline-block;
                        padding-left: 8px;
                        border-left: 4px solid rgba(22,161,234,1);
                    }
                    >div:nth-child(2){
                        flex: 1;
                        border-top: 1px solid #E7E7E7;
                        margin: 0 20px;
                    }
                    >div:last-child{
                        a{
                            width:36px;
                            height:36px;
                            background:rgba(0,0,0,1);
                            opacity:0.2;
                            display: inline-block;
                            text-align: center;
                            line-height: 36px;
                            color: white;
                            margin: 0 8px;
                            font-size: 21px;
                        }
                    }
                }
                >div:nth-child(2){
                    /*width: 100%;*/
                    overflow: hidden;
                    /*display: flex;*/
                    align-items: center;
                    margin: 25px 30px;
                    /*padding: 25px 30px;*/
                    padding-bottom: 5px;
                    >div{
                        display: flex;
                        /*justify-content: space-around;*/
                        transition: all 0.6s linear;
                        >a{
                            display: flex;
                            width:590px;
                            height:212px;
                            background:rgba(255,255,255,1);
                            box-shadow:2px 3px 0px 0px rgba(96,122,252,0.1);
                            padding: 32px;
                            justify-content: space-between;
                            box-sizing: border-box;
                            align-items: center;
                            /*transition: all 1s linear;*/
                            margin-right: 40px;
                            /*transform: translateX(100px);*/
                            >div{
                                width: 307px;
                                p{
                                    font-size:24px;
                                    font-family:MicrosoftYaHei;
                                    font-weight:400;
                                    color:rgba(0,0,0,1);
                                    line-height: 36px;
                                    >span{
                                        display: block;
                                        color:rgba(153,153,153,1);
                                        font-size: 18px;

                                    }
                                }
                                >span{
                                    display: inline-block;
                                    color:rgba(51,51,51,1);
                                    font-size: 16px;
                                    margin-top: 14px;
                                    line-height: 26px;
                                    height: 78px;
                                }
                            }
                            >img{
                                width:140px;
                                height:176px;
                            }
                        }
                    }
                }
            }
        }
    }
    .dreamwork {
        background-color: white;
        width: 100%;
        box-sizing: border-box;
        padding: 66px 0;
        > .news {
            width: 1300px;
            margin: 0 auto;
            >div:nth-child(2){
                display: flex;
                justify-content: space-between;
                >div:first-child{
                    box-sizing: border-box;
                    padding: 36px 10px;
                    width: 400px;
                    position: relative;
                    left: 25px;
                    top: 18px;
                    p{
                        font-size:30px;
                        font-family:MicrosoftYaHei-Bold;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                        display: flex;
                        align-items: center;
                        margin-top: 20px;
                        >span{
                            width: 156px;
                            height: 2px;
                            display: inline-block;
                            background-color: #03A5FA;
                            position: relative;
                            left: 132px;
                            z-index: 103;
                        }
                    }
                    >span{
                        font-size:16px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                        margin-top: 45px;
                        display: inline-block;
                        line-height: 30px;
                    }
                }
                >div:nth-child(2){
                    position: relative;
                    width: 912px;
                    height: 500px;
                    margin-top: 30px;
                    >img{
                        width: 810px;
                        height: 448px;
                        position: absolute;
                        right: 0;
                        z-index: 101;
                    }
                    >div{
                        width: 1050px;
                        z-index: 102;
                        position: relative;
                        /*display: flex;*/
                        top: 377px;
                        right: 138px;
                        >div{
                            width: 930px;
                            overflow: hidden;
                            height: 128px;
                            position: absolute;
                            >div{
                                display: flex;
                                box-shadow:0px 0px 18px 2px rgba(13,73,147,0.1);
                                border-radius:4px;
                                transition: 0.4s all linear;
                                >div{
                                    display: inline-block;
                                    width:230px;
                                    height:128px;
                                    padding: 10px;
                                    background-color: white;
                                    box-sizing: border-box;
                                    .imgactive1{
                                        border: 2px solid #027FC1;
                                        transform: scale(0.98);
                                    }
                                    >img{
                                        width:100%;
                                        height:100%;
                                        box-sizing: border-box;
                                    }
                                }
                            }
                        }
                        >a{
                            position: absolute;
                            padding: 1px 14px;
                            /*width:36px;*/
                            /*height:36px;*/
                            background:rgba(0,0,0,1);
                            opacity:0.2;
                            display: inline-block;
                            text-align: center;
                            line-height: 36px;
                            color: white;
                            margin:10px;
                            font-size: 18px;
                            vertical-align: bottom;
                            align-self: flex-end;
                            &:nth-child(2){
                                right: 50px;
                                top: 70px;
                            }
                            &:last-child{
                                right: -5px;
                                top: 70px;
                            }
                        }
                    }
                }
            }
        }
    }
    .board{
        width: 100%;
        box-sizing: border-box;
        padding: 45px 6px 0 6px;
        display: flex;
        align-items: center;
        position: relative;
        >a{
            width:80px;
            height:100px;
            background:rgba(0,0,0,1);
            opacity:0.3;
            display: inline-block;
            color: white;
            line-height: 100px;
            text-align: center;
            font-size: 50px;
            position: absolute;
            transform: translateY(-30%);
            z-index: 999;
            &:first-child{
                left: 15px;
            }
            &:last-child{
                right: 16px;
            }
        }
        .photo{
            margin: 0 10px;
            >div{
                transition: all 0.6s linear !important;
                >div{
                    background-image: url("../assets/images/123.png");
                    background-size: 100% 100%;
                    background-size: 100%;
                    height: 450px;
                    >p{
                        display: inline-block;
                        width: 100%;
                        height:136px;
                        background:rgba(0,0,0,0.4);
                        /*opacity:0.4;*/
                        font-size:30px;
                        font-family:PingFang-SC-Bold;
                        font-weight:bold;
                        color:rgba(255,255,255,1);
                        line-height:136px;
                        text-align: center;
                        position: relative;
                        top:300px;
                    }
                }
            }
        }
    }
    .imglist{
        width: 100%;
        /*padding: 0 110px;*/
        box-sizing: border-box;
        margin-top: 30px;
        display: flex;
        justify-content: space-around;
        overflow: hidden;
        transform: translateX(-7px);
        >div{
            display: flex;
            transition: 0.6s all linear;
            >div{
                position: relative;
                width: 325px;
                height: 240px;
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                background:rgba(255,255,255,1);
                box-shadow:0px 0px 18px 2px rgba(13,73,147,0.05);
                img{
                    width:275px;
                    height:175px;
                }
                p{
                    font-size:18px;
                    font-family:DIN-Medium;
                    font-weight:500;
                    color:rgba(3,165,250,1);
                    margin: 18px 0;
                    >span{
                        color:rgba(102,102,102,1);
                        margin-left: 20px;
                    }
                }
            }
        }
    }
    .footer {
        background-color: #203753;
        height:445px;
        width: 100%;
        box-sizing: border-box;
        padding-top: 65px;
        > .msg {
            width: 1300px;
            margin: 0 auto;
            >p{
                font-size:18px;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                color:rgba(255,255,255,1);
                line-height: 37px;
                >span{
                    color: rgba(232,232,232,0.7);
                    font-weight: 400;
                }
            }
        }
        .line{
            width: 100%;
            height: 1px;
            background-color: #f1f1f1;
            margin-top: 40px;
        }
    }
</style>