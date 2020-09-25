<template>
  <div class="bigbox" id="hh">
    <div class="report">
      <h3 style="color: #555;background: #fff;">基本信息</h3>
      <div class="tab" style="color: #555;background: #fff;">
        <table class="tabs">
          <tr>
            <td>
              用户名：
              <span>{{testresult.UserName}}</span>
            </td>
            <td>
              分组：
              <span>{{testresult.GroupName}}</span>
            </td>
            <td>
              真实姓名：
              <span>{{testresult.RealName}}</span>
            </td>
            <td>
              当前受教水平：
              <span>{{testresult.Education}}</span>
            </td>
          </tr>
          <tr>
            <td>
              性别：
              <span>{{testresult.Sex}}</span>
            </td>
            <td>
              出生年月：
              <span>{{testresult.Birthday}}</span>
            </td>
            <td>
              测试时间：
              <span>{{testresult.ReportTime}}</span>
            </td>
            <td>
              测试时长：
              <span>{{testresult.ReportHour}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="facility">
      <h3>评估结果</h3>
      <div class="tab" style="color: #555;background: #fff;">
        <table class="tabd">
          <tr v-for="(item,index) in testresult.disimions" :key="item.ID">
            <td v-if="index==0" rowspan="2">
              <span class="zftop">总分：</span>
              <span class="grade">
                <span>{{testresult.Score}}</span>
                <span>{{testresult.Grade}}</span>
              </span>
            </td>
            <td v-for="items in item" :key="items.ID">
              <span>{{items.dm_DimisionName}}</span>
              <p style="color: #666;">
                {{items.dm_Score}}分
                <span style="background: #666;">{{items.dm_Grade}}</span>
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="supervision" style="color: #555;background: #fff;">
      <h3>评估结果分析</h3>
      <div class="yyjl">
        <div class="zxmess">
          <h1>总分：{{testresult.Grade}}</h1>
          <p>{{testresult.Comment}}</p>
        </div>
      </div>
      <div class="yyjl">
        <div class="zxmess" v-for="items in testresult.disimionslist" :key="items.ID">
          <h1>{{items.dm_DimisionName}}：{{items.dm_Grade}}</h1>
          <p>{{items.dm_Analysis}}</p>
        </div>
      </div>
    </div>
    <div class="supervision" style="color: #555;background: #fff;">
      <h3>指导建议</h3>
      <div class="yyjl">
        <div class="zxmess" v-for="items in testresult.disimionslist" :key="items.ID">
          <h1>{{items.dm_DimisionName}}：</h1>
          <p>{{items.dm_Suggestion}}</p>
        </div>
      </div>
    </div>

    <div class="report">
      <h3>推荐训练方案</h3>
      <div class="tab" style="color: #555;background: #fff;">
        <table class="tabs training">
          <tr>
            <th>训练设备</th>
            <th>训练项目</th>
            <th>推荐训练量</th>
          </tr>
          <tr v-for="item in testresult.planschemelist" :key="item.ID">
            <td>{{item.ps_DeviceName}}</td>
            <td>{{item.ps_TopicName}}</td>
            <td>{{item.ps_SuggestTimes}}次</td>
          </tr>
        </table>
      </div>
    </div>
    <div style="display: flex;justify-content: center;margin-top: 80px;">
      <button
        type="button"
        style="background: #01c8e7;"
        class="layui-btn layui-btn-lg"
        @click="clickGeneratePicture"
      >导出</button>
    </div>
  </div>
</template>

<script>
import html2canvas from "../../../node_modules/html2canvas";
export default {
  name: "testreport",
  data() {
    return {
      testresult: {
        ID: "",
        UserName: "",
        GroupName: "",
        RealName: "",
        Education: "",
        Sex: "",
        Birthday: "",
        ReportTime: "",
        ReportHour: "",
        Score: "",
        Grade: "",
        disimionslist: [],
        disimions: [],
        Suggestion: "",
        planschemelist: "",
        Comment
      }
    };
  },
  methods: {
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("testResultID", this.testresult.ID);
      this.$TestResultAPI.getResultDetail(params, function(data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
          console.log(v.testresult);
        }
      });
    },
    // 生成图片
    clickGeneratePicture() {
      var scrollHeight = document.querySelector("#hh").scrollHeight - 100;
      html2canvas(document.querySelector("#hh"), { height: scrollHeight }).then(
        canvas => {
          // 转成图片，生成图片地址
          // this.imgUrl = canvas.toDataURL("image/png",0.5);
          this.imgUrl = canvas.toBlob(
            function(blob) {
              const eleLink = document.createElement("a");
              eleLink.download = "中学生投射测验团体报告.png";
              eleLink.style.display = "none";
              // 字符内容转变成blob地址
              eleLink.href = URL.createObjectURL(blob);
              // 触发点击
              document.body.appendChild(eleLink);
              eleLink.click();
              // 然后移除
              document.body.removeChild(eleLink);
            },"image/png",1);
        }
      );
    }
  },
  mounted() {
    this.testresult.ID = this.$route.query.ID;
    this.getdetail();
  },
  computed: {}
};
</script>

<style scoped>
@import "../../../static/css/appraisallook.css";
#hh {
  position: absolute;
}
</style>
