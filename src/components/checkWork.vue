<template>
  <div class="checkWork">
    <div class="title">
      <span @click="goback">布置作业</span>
      <span>>添加作业</span>
    </div>
    <div class="homework">
      <div class="testing_work">
        <div class="title">
          <span>第一期作业</span>
          <div class="amending">
            <span class="iconfont iconxiugai"></span>
            <span>修改</span>
          </div>
        </div>
        <div class="work_time clearfix">
          <div class="release_time fl">
            <span>发布时间：</span>
            <span>2019/06/19</span>
          </div>
          <div class="deadline fr">
            <span>作业提交截至时间：</span>
            <span>2019/06/23&nbsp;10&nbsp;:&nbsp;30</span>
          </div>
        </div>
        <div class="work_content">
          <span>
            令人深思的是，希腊哲学家之受迫害，往往发生在民主派执政期间，通过投票作出判决，且罪名一律是不敬神。哲人之为哲人在于他们对形而上学问题有独立的思考，而他们思考的结果却要让从不思考这类问题的民众来表决，其命运就可想而知了。民原则是少数服从多数，哲学家却总是少数，确切地说，总是天地间独此一人，所需要的恰恰是不服从多数也无需多数来服从他立思考的权利，这是一种超越于民主和专制之政治范畴的精神自由。对于哲学家来说，不存在最好的制度，只存在最好的机遇一种权力对他的哲学活动不加干预，至于这权力是王权还是民权好像并不重要。
            在古希腊，至少有两位执政者是很尊重哲学家的。一位是雅典民主制的缔造者伯里克利，据说他对阿那克萨戈拉怀有“不寻常敬和仰慕”，执弟子礼甚勤。另一位是威震欧亚的亚历山大大帝，他少年时师事亚里士多德，登基后仍尽力支持其学术研究，信表示：“我宁愿在优美的学问方面胜过他人，而不愿在权力统治方面胜过他人。”当然，事实是他在权力方面空前地胜过了他不过，他的确是一个爱智慧的君主。更为脍炙人口的是他在科林斯与第欧根尼邂逅的故事。当时第欧根尼正躺着晒太阳，大帝“联即亚历山大。”哲人答：“我是狗崽子第欧根尼。”问：“我能为你效什么劳?”答：“不要挡住我的太阳。”大帝当即叹道：“我不是亚历山大，我便愿意我是第欧根尼。”
          </span>
        </div>
        <div class="reference">
          <li>
            <div class="reference_data">
              <span>参考文件：第一期作业参考.PPT</span>
              <span class="download">下载</span>
            </div>
          </li>
        </div>
        <div class="line"></div>
        <div class="frame_info">
          <textarea name id></textarea>
        </div>
        <div class="job_info">
          <div class="job_submit">
            <span>提交作业：</span>
            <span class="file">附件上传</span>
            <input type="file" name title class="F_input">
          </div>
          <div class="adjunct_data">
            <li>
              <span class="iconfont iconweibiaoti-_huabanfuben"></span>
              <span>新概念英语1-1讲义.PPT</span>
              <span>删除</span>
            </li>
            <li>
              <span class="iconfont iconweibiaoti-_huabanfuben"></span>
              <span>新概念英语1-1讲义.PPT</span>
              <span>删除</span>
            </li>
            <li>
              <span class="iconfont iconweibiaoti-_huabanfuben"></span>
              <span>新概念英语1-1讲义.PPT</span>
              <span>删除</span>
            </li>
          </div>
          <div class="submitWork_btn">
            <span>提交作业</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      goback() {
        this.$router.push({
          name: "assignWork"
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .checkWork {
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
    // 查看作业
    .testing_work {
      background: #fff;
      .title {
        background: #fff;
        position: relative;
        text-align: center;
        padding: 18px 0;

        > span {
          &:nth-of-type(1) {
            font-size: 18px;
            color: #333;
            font-weight: bold;
          }
        }

        .amending {
          position: absolute;
          top: 16px;
          right: 12px;
          color: #2f9dea;
          cursor: pointer;

          .iconxiugai {
            font-size: 14px;
            color: #2f9dea;
            margin-right: 5px;
          }
        }
      }

      .work_time {
        padding: 9px 91px;
        background: #fbfbfb;

        .release_time {
          color: #b7b7b7;
        }

        .deadline {
          color: #333;
        }
      }

      .work_content {
        padding: 33px 90px;
        line-height: 28px;
        span {
          font-size: 16px;
          text-align: justify;
        }
      }

      .reference {
        margin: 0 90px;
        height: 71px;
        background: #f2faff;
        line-height: 71px;

        li {
          text-indent: 12px;

          .reference_data {
            display: inline-block;
          }

          .download {
            color: #2f9dea;
            padding-left: 10px;
            cursor: pointer;
          }
        }
      }

      .line {
        margin: 33px 0 31px;
        height: 1px;
        background: rgba(241, 241, 241, 1);
      }

      .frame_info {
        margin: 0 90px;
        height: 160px;
        border-radius: 3px;

        textarea {
          width: 100%;
          height: 100%;
        }
      }

      .job_info {
        padding-top: 38px;
        margin: 0 90px;
        padding-bottom: 38px;
        .job_submit {
          position: relative;
          margin-bottom: 20px;

          > span {
            &:nth-of-type(1) {
              position: absolute;
              top: 10px;
            }
          }

          .file {
            margin-left: 75px;
            position: relative;
            display: inline-block;
            border: 1px solid #f1f1f1;
            border-radius: 4px;
            width: 120px;
            height: 36px;
            overflow: hidden;
            text-decoration: none;
            line-height: 36px;
            cursor: pointer;
            text-align: center;
            color: #32abff;
          }
          input {
            cursor: pointer;
          }
          .F_input {
            position: absolute;
            left: 75px;
            top: 0;
            opacity: 0;
            width: 120px;
            height: 36px;
            cursor: pointer;
          }

          .file:hover {
            text-decoration: none;
          }
        }

        .adjunct_data {
          li {
            padding-bottom: 13px;

            span {
              color: #333;

              &:nth-of-type(2) {
                margin: 0 5px 0 4px;
              }

              &:nth-of-type(3) {
                color: #32abff;
                margin: 0 5px 0 0;
                cursor: pointer;
              }
            }
          }

          .iconweibiaoti-_huabanfuben {
            color: #ffcd2c;
          }
        }

        .submitWork_btn {
          margin-top: 35px;

          span {
            display: block;
            width: 98px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            color: #fff;
            background: #2f9dea;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
