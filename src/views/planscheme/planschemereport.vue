<template>
  <!-- 软件测试报告详情 -->
  <div class="detailPage">
    <div class="tlt">{{ testresult.ReportName || "" }}</div>
    <div class="info">
      <h2>基本信息</h2>
      <table class="baseTable" border="1">
        <tr>
          <td>
            用户名：<span>{{ testresult.UserName || "" }}</span>
          </td>
          <td>
            分组：<span>{{ testresult.GroupName || "" }}</span>
          </td>
          <td>
            真实姓名：<span>{{ testresult.RealName || "" }}</span>
          </td>
          <td>
            当前受教水平：<span>{{ testresult.EducationTitle || "" }}</span>
          </td>
        </tr>
        <tr>
          <td>
            性别：<span>{{ testresult.Sex || "" }}</span>
          </td>
          <td>
            出生年月：<span>{{ testresult.BirthDate || "" }}</span>
          </td>
          <td>
            测试时间：<span>{{ testresult.CreateTime || "" }}</span>
          </td>
          <td>
            测试时长：<span>{{ testresult.ReportHour || "" }}</span>
          </td>
        </tr>
      </table>

      <h3>
        量表名称：<span>{{ testresult.DeviceName }}</span>
      </h3>
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
            startColor="#f44336"
            stopColor="#f44336"
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
                      ).bgcolor,
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
                      ).bgcolor,
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
    <div class="info_progress">
      <el-row>
        <el-col :span="2">
          <strong>训练进度:</strong>
        </el-col>
        <el-col :span="16">
          <el-progress :percentage="50" color="#ed4c45"></el-progress>
        </el-col>
        <el-col :span="2">
          <strong>（已完成）</strong>
        </el-col>
      </el-row>
    </div>
    <div class="info_table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#ccc', color: '#333' }"
      >
        <el-table-column align="center" prop="TitleName" label="训练项目">
        </el-table-column>
        <el-table-column align="center" prop="DeivceName" label="训练设备">
        </el-table-column>
        <el-table-column align="center" prop="Train" label="推荐训练量">
        </el-table-column>
        <el-table-column align="center" prop="Trained" label="已训练">
        </el-table-column>
        <el-table-column align="center" label="训练效果">
          <template slot-scope="scope">
            <!-- {{ JSON.parse(scope.row.TrainResult)?.[0]?.result ?? "" }} -->
            {{
              scope.row.TrainResult
                ? JSON.parse(scope.row.TrainResult)[0]
                  ? JSON.parse(scope.row.TrainResult)[0].result
                  : ""
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="训练时间">
          <template slot-scope="scope">
            {{
              scope.row.TrainResult
                ? JSON.parse(scope.row.TrainResult)[0]
                  ? JSON.parse(scope.row.TrainResult)[0].trainTime
                  : ""
                : ""
            }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from "./radial-progress-bar.vue";
export default {
  name: "nahanreport",
  data() {
    return {
      completedSteps: 0,
      totalSteps: 200,
      zongfen_name: "总分",
      zongfen_grade: "",
      dimisionList: [],
      colorArr: ["#ED4C45", "#ED49E7", "#D4BF00", "#0070E5", "#3CC24C"],
      tableData: [
        {
          TitleName: "工作学习压力",
          DeivceName: "智能呐喊宣泄系统",
          Train: 8,
          Trained: 2,
          result: "这次宣泄不是很成功，加油！",
          traintime: "2019/07/19 10:40",
        },
      ],
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
      },
    };
  },
  methods: {
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("id", this.testresult.ID);
      this.$PlanSchemeAPI.getTrain(params, function (data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
          v.tableData = data.Result.TrainPlanList;
          v.dimisionList = data.Result.DimisionList;
          if (data.Result.DimisionList.length > 0) {
            v.completedSteps = data.Result.DimisionList[0].score;
            v.zongfen_grade = data.Result.DimisionList[0].grade;
            v.zongfen_name = data.Result.DimisionList[0].Name;
          }
        }
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
            level: "自卑感国强",
          };
        }
      }
      return tempObj;
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
    },
  },
  mounted() {
    // 获取路由参数，回去详情数据
    this.testresult.ID = this.$route.query.ID;
    this.getdetail();
  },
  computed: {},
  components: {
    RadialProgressBar,
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
  padding: 0px 10px;
  height: 24px;
  line-height: 24px;
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
