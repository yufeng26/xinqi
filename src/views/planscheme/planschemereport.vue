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
                  ? JSON.parse(scope.row.TrainResult)[0].traintime
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
      completedSteps: 78,
      totalSteps: 100,
      tableData: [
        {
          TitleName: "工作学习压力",
          DeivceName: "智能呐喊宣泄系统",
          Train: 8,
          Trained: 2,
          result: "这次宣泄不是很成功，加油！",
          traintime: "2019/07/19 10:40"
        }
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
        planschemelist: ""
      }
    };
  },
  methods: {
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("id", this.testresult.ID);
      this.$PlanSchemeAPI.getTrain(params, function(data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
          v.tableData = data.Result.TrainPlanList;
          console.log(v.testresult);
        }
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
  },
  computed: {},
  components: {
    RadialProgressBar
  }
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
