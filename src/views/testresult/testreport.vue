<template>
  <!-- 测试管理报告详情 -->
  <div class="detailPage">
    <div class="tlt">{{ testresult.ReportName }}</div>
    <div class="info">
      <h2>基本信息</h2>
      <table class="baseTable" border="1">
        <tr>
          <td>
            用户名：<span>{{ testresult.UserName }}</span>
          </td>
          <td>
            分组：<span>{{ testresult.GroupName }}</span>
          </td>
          <td>
            真实姓名：<span>{{ testresult.RealName }}</span>
          </td>
          <td>
            当前受教水平：<span>{{ testresult.EducationTitle }}</span>
          </td>
        </tr>
        <tr>
          <td>
            性别：<span>{{ testresult.Sex }}</span>
          </td>
          <td>
            出生年月：<span>{{ testresult.BirthDate }}</span>
          </td>
          <td>
            测试时间：<span>{{ testresult.CreateTime }}</span>
          </td>
          <td>
            测试时长：<span>{{ testresult.TestTime }}</span>
          </td>
        </tr>
      </table>

      <!-- <h3>
        量表名称：<span>{{ testresult.DeviceName }}</span>
      </h3> -->
    </div>
    <div class="tlt">评估结果</div>
    <div class="info">
      <el-row>
        <el-col :span="6" class="col-01">
          <span>总分</span>
          <radial-progress-bar
            :diameter="200"
            :completed-steps="completedSteps"
            :total-steps="totalSteps"
            startColor="#f44336"
            stopColor="#f44336"
            innerStrokeColor="#ececec"
          >
            <p>{{ completedSteps }}</p>
            <p>心理状态不佳</p>
          </radial-progress-bar>
        </el-col>
        <el-col :span="6" class="col-02">
          <el-row>
            <p>学习焦虑</p>
            <p><strong>12分</strong><span>严重</span></p>
          </el-row>
          <el-row>
            <p>社交焦虑</p>
            <p><strong>12分</strong><span>中重</span></p>
          </el-row>
        </el-col>
        <el-col :span="6" class="col-02">
          <el-row>
            <p>躯体化</p>
            <p><strong>12分</strong><span>重度</span></p>
          </el-row>
          <el-row>
            <p>抑郁</p>
            <p><strong>12分</strong><span>轻度</span></p>
          </el-row>
        </el-col>
        <el-col :span="6" class="col-02">
          <el-row>
            <p>环境适应</p>
            <p><strong>12分</strong><span>正常</span></p>
          </el-row>
          <el-row>
            <p>自卑感</p>
            <p><strong>12分</strong><span>中重</span></p>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div id="fiveEcharts" :style="{ width: '100%', height: '400px' }"></div>
    <div class="tlt">评估结果分析</div>
    <div class="info">
      <div
        class="rulest"
        v-for="item in testresult.DimisionList"
        v-bind:key="item.Name"
      >
        <h4>{{ item.Name }}:{{ item.result }}</h4>
        <p>{{ item.Suggestion }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from "./radial-progress-bar.vue";
export default {
  name: "testttreport",
  data() {
    return {
      completedSteps: 78,
      totalSteps: 100,
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
        Score: "", // 总分
        Grade: "",
        disimionslist: [],
        disimions: [],
        Suggestion: "",
        planschemelist: "",
        BrokenLine1: [],
        BrokenLine2: [],
        DimisionList: [] // 测评结果维度
      }
    };
  },
  methods: {
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("id", this.testresult.ID);
      this.$TestResultAPI.getResultDetail(params, function(data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
          // console.log(v.testresult);
        }
      });
    },
    // 初始化图表
    initChart() {
      var dom = document.getElementById("fiveEcharts");
      var myChart = this.echarts.init(dom);
      // 此处数据为假数据，应该取接口返回数据，带接口OK了，在调试
      let chartData = [
        20313,
        19813,
        22188,
        19063,
        19938,
        19938,
        18500,
        18000,
        22188,
        19688,
        20625,
        19438,
        18813,
        19188,
        19000,
        19938,
        19188,
        19438,
        22000,
        33813,
        39063,
        32625,
        26000,
        24063,
        24438,
        27000,
        28250,
        24688,
        27125,
        26563,
        25313,
        25000,
        26500,
        26375,
        25063,
        24438,
        24000,
        24938,
        24063,
        25938,
        24813,
        22688,
        21938,
        22438,
        20563,
        22000,
        19500,
        19750,
        19750,
        23813,
        24000,
        23250,
        24063,
        24438,
        24688,
        23938,
        24063,
        24688,
        23438,
        25813,
        25875,
        25938,
        24688,
        24500,
        25688,
        22750,
        26188,
        25938,
        25313,
        24063,
        25438,
        24500,
        24563,
        26313,
        17875,
        19875,
        20813,
        20750,
        18313,
        18563,
        18688,
        19313,
        18688,
        18063,
        19063,
        19750,
        19813,
        19813,
        20563,
        20563,
        21063,
        19938,
        20000,
        17500,
        19438,
        18188
      ];
      // 用数据函数循环x轴坐标
      let xData = chartData.map((item, index) => index + 1);
      // console.log(xData);
      // 绘制图表
      myChart.setOption({
        color: ["#3cc5a3", "#ffc000", "#5cdbf2"],
        title: {
          text: "测试数据",
          textStyle: {
            left: "center",
            fontSize: 14
          },
          fontSize: 12,
          left: "center",
          top: 15
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: "rgba(150,150,150,0.3)"
          }
        },
        grid: [{ bottom: 40 }, { top: 50 }, { left: 30 }, { right: 30 }],
        xAxis: {
          type: "category",
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: chartData,
            type: "line"
          }
        ]
      });
    },
    //导出报告
    ExportRow() {
      // this.$TestResultAPI.ReportResult(this.testresult.ID);
      let url = "../../../static/img/scl90ck.rar";
      const elt = document.createElement("a");
      elt.setAttribute("href", url);
      elt.setAttribute("download", "scl-90查看图片.rar");
      elt.style.display = "none";
      document.body.appendChild(elt);
      elt.click();
      document.body.removeChild(elt);
    }
  },
  mounted() {
    // 获取路由参数，回去详情数据
    this.testresult.ID = this.$route.query.ID;
    this.getdetail();
    this.initChart();
  },
  computed: {},
  components: {
    RadialProgressBar
  }
};
</script>

<style>
@import "../../../static/css/common.css";
.img1 {
  width: 100%;
}
.col-01 {
  position: relative;
  height: 260px;
  border-right: 2px solid #dfdfdf;
  border-bottom: 2px solid #dfdfdf;
}
.col-01 span {
  position: absolute;
  left: 20px;
  top: 20px;
}
.radial-progress-container {
  margin: 30px auto;
}
.radial-progress-inner p {
  color: #f44336;
}
.radial-progress-inner p:first-child {
  font-size: 52px;
  font-weight: bold;
}
.radial-progress-inner p:last-child {
  font-size: 16px;
}
.col-02 .el-row {
  padding: 16px 20px;
  box-sizing: border-box;
  height: 130px;
  border-right: 2px solid #dfdfdf;
  border-bottom: 2px solid #dfdfdf;
}
.col-02 .el-row p {
  width: 70%;
  text-align: left;
  margin: 0 auto;
}
.col-02 .el-row p:first-child {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 14px;
}
.col-02 .el-row p:last-child strong {
  font-size: 26px;
  color: #f44336;
}
.col-02 .el-row p:last-child span {
  background: #f44336;
  display: inline-block;
  width: 40px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-left: 30px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #fff;
}
.info_progress {
  margin: 20px auto;
}
.info_progress strong {
  font-size: 20px;
}
.info_progress .el-progress--line {
  margin-top: 8px;
}
</style>
