<template>
  <!-- 测试软件报告详情 -->
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
            分组：<span>{{ testresult.GroupName || "分组一" }}</span>
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
    <div class="tlt mtop15">测评结果</div>
    <div class="info">
      <table border="1" class="resultTable">
        <tr>
          <td>
            测试总分：<span>{{ testresult.Score }}</span>
          </td>
          <td>
            测试结果：<span>{{ testresult.ResultType }}</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="tlt mtop15">因子</div>
    <div id="fiveEcharts" :style="{ width: '100%', height: '400px' }"></div>
    <div class="tlt mtop15">测评结果分析</div>
    <div class="info">
      <div
        class="rulest"
        v-for="item in testresult.DimisionList"
        v-bind:key="item.Name"
      >
        <h4>
          维度名称：{{ item.Name }}；得分：{{ item.score }}；维度等级：{{
            item.grade
          }}
        </h4>
        <h4>维度结果分析：</h4>
        <p>{{ item.result }}</p>
        <h4 class="mtop10">维度指导意见：</h4>
        <p>{{ item.Suggestion }}</p>
      </div>
    </div>
    <div class="tlt">指导建议</div>
    <div class="info">
      <p class="tent">{{ testresult.Suggestion }}</p>
    </div>
    <div class="tlt">推荐训练方案</div>
    <div class="info">
      <table class="train" border="1">
        <thead>
          <tr>
            <td>训练设备</td>
            <td>训练项目</td>
            <td>推荐训练量</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in testresult.TrainPlanList" v-bind:key="item.ID">
            <td>{{ item.DeivceName }}</td>
            <td>{{ item.TitleName }}</td>
            <td>{{ item.Train }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="exportBox">
      <el-button type="primary" @click="exportWord" class="exportBtn">
        导出
      </el-button>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from "./radial-progress-bar.vue";
export default {
  name: "cepingreport",
  data() {
    return {
      DimisionList: [], // 维度参数
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
        BrokenLine1: [],
        BrokenLine2: [],
      },
    };
  },
  methods: {
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("id", this.testresult.ID);
      this.$TestResultAPI.getResultDetail(params, function (data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
          v.DimisionList = data.Result.DimisionList;
        }
      });
    },
    // 初始化图表
    initChart() {
      console.log(this.DimisionList);
      var dom = document.getElementById("fiveEcharts");
      var myChart = this.echarts.init(dom);
      // 此处数据为假数据，应该取接口返回数据，带接口OK了，在调试
      let chartData = this.DimisionList.map((a) => a.score);
      // 用数据函数循环x轴坐标
      let xData = this.DimisionList.map((item) => item.Name);
      // 绘制图表
      myChart.setOption({
        color: ["#3cc5a3", "#ffc000", "#5cdbf2"],
        title: {
          text: "因子得分",
          textStyle: {
            left: "center",
            fontSize: 14,
          },
          fontSize: 12,
          left: "center",
          top: 15,
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: "rgba(150,150,150,0.3)",
          },
        },
        grid: [{ bottom: 40 }, { top: 50 }, { left: 30 }, { right: 30 }],
        xAxis: {
          type: "category",
          data: xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: chartData,
            type: "bar",
          },
        ],
      });
    },
    // 等级
    getScoreColor(propertyStr, score) {
      let tempObj = {};
      if (propertyStr === "学习焦虑") {
        if (score >= 0 && score <= 4) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "学习焦虑较低",
          };
        } else if (score > 4 && score <= 8) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "学习焦虑中等",
          };
        } else if (score > 8 && score <= 16) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "学习焦虑较高",
          };
        }
      } else if (propertyStr === "躯体化" || propertyStr === "身体症状") {
        if (score >= 0 && score <= 4) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "较低",
          };
        } else if (score > 4 && score <= 8) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "中等",
          };
        } else if (score > 8 && score <= 16) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "偏多",
          };
        }
      } else if (propertyStr === "环境适应" || propertyStr === "环境适应性") {
        if (score >= 0 && score <= 31) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "适应性很差",
          };
        } else if (score > 31 && score <= 61) {
          tempObj = {
            bgcolor: this.colorArr[1],
            level: "适应性较差",
          };
        } else if (score > 61 && score <= 91) {
          tempObj = {
            bgcolor: this.colorArr[2],
            level: "适应性一般",
          };
        } else if (score > 91 && score <= 121) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "适应性较强",
          };
        } else if (score > 121 && score <= 151) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "适应性很强",
          };
        }
      } else if (propertyStr === "社交焦虑") {
        if (score >= 0 && score <= 4) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "社交焦虑较低",
          };
        } else if (score > 4 && score <= 8) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "社交焦虑中等",
          };
        } else if (score > 8 && score <= 11) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "社交焦虑较高",
          };
        }
      } else if (propertyStr === "抑郁") {
        if (score >= 20 && score <= 40) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "无抑郁症状",
          };
        } else if (score > 40 && score <= 48) {
          tempObj = {
            bgcolor: this.colorArr[2],
            level: "中度至重度抑郁",
          };
        } else if (score > 48 && score <= 56) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "轻微或轻度抑郁",
          };
        } else if (score > 56 && score <= 81) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "重度抑郁",
          };
        }
      } else if (propertyStr === "自卑感" || propertyStr === "自卑") {
        if (score >= 36 && score <= 73) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "自尊感过强",
          };
        } else if (score > 73 && score <= 109) {
          tempObj = {
            bgcolor: this.colorArr[1],
            level: "自尊感较强",
          };
        } else if (score > 109 && score <= 145) {
          tempObj = {
            bgcolor: this.colorArr[2],
            level: "自尊感一般",
          };
        } else if (score > 145 && score <= 181) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "自卑感较强",
          };
        } else if (score > 181 && score <= 253) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "自卑感过强",
          };
        }
      }
      return tempObj;
    },
    //导出报告
    exportWord() {
      this.$TestResultAPI.cpReportResult(this.$route.query.ID);
    },
  },
  created() {
    // 获取路由参数，回去详情数据
    this.testresult.ID = this.$route.query.ID;
    this.getdetail();
  },
  mounted() {
    this.initChart();
  },
  computed: {},
  watch: {
    DimisionList: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.initChart();
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
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
  width: 90%;
  text-align: left;
  margin: 0 auto;
}
.col-02 .el-row p:first-child {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 14px;
}
.col-02 .el-row p:last-child strong {
  font-size: 26px;
  color: #f44336;
}
.col-02 .el-row p:last-child span {
  background: #f44336;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
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
