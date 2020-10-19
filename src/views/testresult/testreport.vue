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
            分组：<span>{{ testresult.GroupName || "" }}</span>
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
            测试时间：<span
              >{{ dateFormat(testresult.testEndtime) }}--{{
                dateFormat(testresult.testStartTime)
              }}
            </span>
          </td>
          <td>
            测试时长：<span>{{ dateFormat(testresult.TestTime) }}</span>
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
          <span>{{ zongfen_name }}</span>
          <radial-progress-bar
            :diameter="200"
            :completed-steps="completedSteps"
            :total-steps="totalSteps"
            :startColor="radialProgressbarColor"
            :stopColor="radialProgressbarColor"
            innerStrokeColor="#ececec"
          >
            <p>{{ completedSteps }}</p>
            <p>{{ zongfen_grade }}</p>
          </radial-progress-bar>
        </el-col>
        <div v-if="dimisionList.length === 7">
          <div v-for="n in 6" :key="n">
            <el-col v-if="n % 2 !== 0" :span="6" class="col-02">
              <el-row>
                <p>{{ dimisionList[n].Name }}</p>
                <p>
                  <strong>{{ dimisionList[n].score }}分</strong
                  ><span
                    :style="{
                      background: getScoreColor(
                        dimisionList[n].Name,
                        dimisionList[n].score
                      ).bgcolor
                    }"
                    >{{
                      getScoreColor(dimisionList[n].Name, dimisionList[n].score)
                        .level
                    }}</span
                  >
                </p>
              </el-row>
              <el-row>
                <p>{{ dimisionList[n + 1].Name }}</p>
                <p>
                  <strong>{{ dimisionList[n + 1].score }}分</strong
                  ><span
                    :style="{
                      background: getScoreColor(
                        dimisionList[n + 1].Name,
                        dimisionList[n + 1].score
                      ).bgcolor
                    }"
                    >{{
                      getScoreColor(
                        dimisionList[n + 1].Name,
                        dimisionList[n + 1].score
                      ).level
                    }}</span
                  >
                </p>
              </el-row>
            </el-col>
          </div>
        </div>
      </el-row>
    </div>
    <!-- <div id="fiveEcharts" :style="{ width: '100%', height: '400px' }"></div> -->
    <div class="tlt">评估结果分析</div>
    <div class="info">
      <div
        class="rulest"
        v-for="item in testresult.DimisionList"
        v-bind:key="item.Name"
      >
        <h4>{{ item.Name }}</h4>
        <p class="blue">{{ item.result }}</p>
      </div>
    </div>
    <div class="tlt">指导建议</div>
    <div class="info">
      <div
        class="rulest"
        v-for="item in testresult.DimisionList"
        v-bind:key="item.Name"
      >
        <h4>{{ item.Name }}</h4>
        <p>{{ item.Suggestion }}</p>
      </div>
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
  name: "testttreport",
  data() {
    return {
      radialProgressbarColor: "#ED4C45",
      completedSteps: 0,
      totalSteps: 100,
      zongfen_name: "总分",
      zongfen_grade: "",
      dimisionList: [],
      colorArr: ["#ED4C45", "#ED49E7", "#D4BF00", "#0070E5", "#3CC24C"],
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
        BrokenLine2: []
      }
    };
  },
  methods: {
    // 详情格式化时间
    dateFormat(cellValue) {
      if (cellValue == undefined || cellValue == null) {
        return "";
      }
      return this.$moment(cellValue).format("YYYY-MM-DD  HH:mm:ss");
    },
    getColorAll() {},
    // 获取页面信息
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("id", this.testresult.ID);
      this.$TestResultAPI.getResultDetail(params, function(data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
          v.tableData = data.Result.TrainPlanList;
          v.dimisionList = data.Result.DimisionList;
          v.process = data.Result.Process * 100;
          if (data.Result.DimisionList.length > 0) {
            v.completedSteps = Number(
              data.Result.DimisionList[0].score
            ).toFixed(2);
            v.zongfen_grade = data.Result.DimisionList[0].grade;
            v.zongfen_name = data.Result.DimisionList[0].Name;

            if (
              data.Result.DimisionList[0].score >= 0 &&
              data.Result.DimisionList[0].score < 38.89
            ) {
              v.radialProgressbarColor = this.colorArr[4];
            } else if (
              data.Result.DimisionList[0].score >= 38.89 &&
              data.Result.DimisionList[0].score < 59.03
            ) {
              v.radialProgressbarColor = this.colorArr[3];
            } else if (data.Result.DimisionList[0].score >= 59.03) {
              v.radialProgressbarColor = this.colorArr[0];
            }
          }
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
    // 等级
    getScoreColor(propertyStr, score) {
      let tempObj = {};
      if (propertyStr === "学习焦虑") {
        if (score >= 0 && score <= 4) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "学习焦虑较低"
          };
        } else if (score > 4 && score <= 8) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "学习焦虑中等"
          };
        } else if (score > 8 && score <= 16) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "学习焦虑较高"
          };
        }
      } else if (propertyStr === "躯体化" || propertyStr === "身体症状") {
        if (score >= 0 && score <= 4) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "较低"
          };
        } else if (score > 4 && score <= 8) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "中等"
          };
        } else if (score > 8 && score <= 16) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "偏多"
          };
        }
      } else if (propertyStr === "环境适应" || propertyStr === "环境适应性") {
        if (score >= 0 && score <= 31) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "适应性很差"
          };
        } else if (score > 31 && score <= 61) {
          tempObj = {
            bgcolor: this.colorArr[1],
            level: "适应性较差"
          };
        } else if (score > 61 && score <= 91) {
          tempObj = {
            bgcolor: this.colorArr[2],
            level: "适应性一般"
          };
        } else if (score > 91 && score <= 121) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "适应性较强"
          };
        } else if (score > 121 && score <= 151) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "适应性很强"
          };
        }
      } else if (propertyStr === "社交焦虑") {
        if (score >= 0 && score <= 4) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "社交焦虑较低"
          };
        } else if (score > 4 && score <= 8) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "社交焦虑中等"
          };
        } else if (score > 8 && score <= 11) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "社交焦虑较高"
          };
        }
      } else if (propertyStr === "抑郁") {
        if (score >= 20 && score <= 40) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "无抑郁症状"
          };
        } else if (score > 40 && score <= 48) {
          tempObj = {
            bgcolor: this.colorArr[2],
            level: "中度至重度抑郁"
          };
        } else if (score > 48 && score <= 56) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "轻微或轻度抑郁"
          };
        } else if (score > 56 && score <= 81) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "重度抑郁"
          };
        }
      } else if (propertyStr === "自卑感" || propertyStr === "自卑") {
        if (score >= 36 && score <= 73) {
          tempObj = {
            bgcolor: this.colorArr[0],
            level: "自尊感过强"
          };
        } else if (score > 73 && score <= 109) {
          tempObj = {
            bgcolor: this.colorArr[1],
            level: "自尊感较强"
          };
        } else if (score > 109 && score <= 145) {
          tempObj = {
            bgcolor: this.colorArr[2],
            level: "自尊感一般"
          };
        } else if (score > 145 && score <= 181) {
          tempObj = {
            bgcolor: this.colorArr[3],
            level: "自卑感较强"
          };
        } else if (score > 181 && score <= 253) {
          tempObj = {
            bgcolor: this.colorArr[4],
            level: "自卑感过强"
          };
        }
      }
      return tempObj;
    },
    //导出报告
    exportWord() {
      let exportId = this.$route.query.ID;
      alert("导出id=" + exportId);
      // let url = "../../../static/img/scl90ck.rar";
      // const elt = document.createElement("a");
      // elt.setAttribute("href", url);
      // elt.setAttribute("download", "scl-90查看图片.rar");
      // elt.style.display = "none";
      // document.body.appendChild(elt);
      // elt.click();
      // document.body.removeChild(elt);
    }
  },
  mounted() {
    // 获取路由参数，回去详情数据
    this.testresult.ID = this.$route.query.ID;
    this.getdetail();
    // this.initChart();
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
