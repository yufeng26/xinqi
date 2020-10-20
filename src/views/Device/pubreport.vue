<template>
  <!-- 击打报告详情 -->
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
            出生年月：<span>{{
              testresult.BirthDate
                ? /\d{4}-\d{1,2}-\d{1,2}/g.exec(testresult.BirthDate)[0]
                : ""
            }}</span>
          </td>
          <td>
            训练时间：<span
              >{{ dateFormat(testresult.testStartTime) }}--{{
                dateFormat(testresult.testEndtime)
              }}</span
            >
          </td>
          <td>
            训练时长：<span>{{
              reduceTime(testresult.testStartTime, testresult.testEndtime)
            }}</span>
          </td>
        </tr>
      </table>

      <h3 v-if="type !== 1 && type !== 2 && type !== 3 && type !== 4">
        量表名称：<span>{{ testresult.DeviceName }}</span>
      </h3>
    </div>
    <div class="tlt mtop15" v-if="type !== 2 && type !== 3 && type !== 4">
      {{ type !== 1 ? "测评结果" : "训练结果" }}
    </div>
    <div class="info" v-if="type !== 2 && type !== 3 && type !== 4">
      <table border="1" class="resultTable">
        <tr>
          <td>
            测试总分：<span>{{ testresult.Score }}</span>
          </td>
          <td>
            测试结果：<span>{{
              testresult.Result ? JSON.parse(testresult.Result)[0] : ""
            }}</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="tlt mtop15">{{ zhexiantuName }}</div>
    <div class="info">
      <div id="fiveEcharts" :style="{ width: '100%', height: '400px' }"></div>
    </div>
    <div class="tlt mtop15">脑电折线图</div>
    <div class="info">
      <div id="sixEcharts" :style="{ width: '100%', height: '400px' }"></div>
    </div>
    <div class="tlt">测试结果</div>
    <div class="ceshijieguo">
      <div>
        {{ testresult.Result ? JSON.parse(testresult.Result)[0] : "" }}
      </div>
    </div>
    <div class="tlt">指导建议</div>
    <div class="info">
      <ul class="tent">
        <li v-for="(item, index) in AdviceArr" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="exportBox">
      <el-button type="primary" @click="exportWord" class="exportBtn">
        导出
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "cepingreport",
  data() {
    return {
      AdviceArr: [],
      type: 1, //1表示击打，2表示呐喊、3：拥抱、4：自信心
      xData1: [],
      xData2: [],
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
        BrokenLine2: []
      }
    };
  },
  methods: {
    // 格式化时间
    dateFormat(cellValue) {
      if (cellValue == undefined) {
        return "";
      }
      return this.$moment(cellValue).format("YYYY-MM-DD  HH:mm:ss");
    },
    // 计算时间差分秒
    reduceTime(a, b) {
      let m1 = this.$moment(a);
      let m2 = this.$moment(b);
      return this.$moment(m2.diff(m1)).format("mm:ss");
    },
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("Id", this.testresult.ID);
      this.$TestResultAPI.getReportResult(params, function(data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
          v.type = data.Result.Reportype; //1表示击打，2表示呐喊、3：拥抱、4：自信心
          v.AdviceArr = JSON.parse(v.testresult.Advice);
          v.initChart();
        }
      });
    },
    // 初始化图表
    initChart() {
      var dom1 = document.getElementById("fiveEcharts");
      var dom2 = document.getElementById("sixEcharts");
      var myChart1 = this.echarts.init(dom1);
      var myChart2 = this.echarts.init(dom2);
      // 用数据函数循环x轴坐标
      this.xData1 = (this.testresult.BrokenLine1
        ? JSON.parse(this.testresult.BrokenLine1)
        : []
      ).map((item, index) => index + 1);

      this.xData2 = (this.testresult.BrokenLine2
        ? JSON.parse(JSON.parse(this.testresult.BrokenLine2).LstAtt)
        : []
      ).map((item, index) => index + 1);
      // 绘制图表
      myChart1.setOption({
        color: ["#3cc5a3", "#ffc000", "#5cdbf2"],
        title: {
          text: "图表1",
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
          data: this.xData1
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.testresult.BrokenLine1
              ? JSON.parse(this.testresult.BrokenLine1)
              : [],
            type: "line"
          }
        ]
      });
      // 绘制图表
      myChart2.setOption({
        color: ["#3cc5a3", "#ffc000", "#5cdbf2"],
        title: {
          text: "图表1",
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
          data: this.xData2
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.testresult.BrokenLine2
              ? JSON.parse(JSON.parse(this.testresult.BrokenLine2).LstAtt)
              : [],
            type: "line"
          },
          {
            data: this.testresult.BrokenLine2
              ? JSON.parse(JSON.parse(this.testresult.BrokenLine2).LstMed)
              : [],
            type: "line"
          }
        ]
      });
    },
    //导出报告
    exportWord() {
      if (this.testresult.Reportype === 4) {
        //自信心导出
        this.$PlanSchemeAPI.ReportResultZxx(this.$route.query.ID);
      } else {
        // 击打、呐喊、拥抱导出
        this.$PlanSchemeAPI.ReportResult(this.$route.query.ID);
      }
    }
    //导出报告
    // ExportRow() {
    //   // this.$TestResultAPI.ReportResult(this.testresult.ID);
    //   let url = "../../../static/img/scl90ck.rar";
    //   const elt = document.createElement("a");
    //   elt.setAttribute("href", url);
    //   elt.setAttribute("download", "scl-90查看图片.rar");
    //   elt.style.display = "none";
    //   document.body.appendChild(elt);
    //   elt.click();
    //   document.body.removeChild(elt);
    // },
  },
  mounted() {
    // 获取路由参数，回去详情数据
    this.testresult.ID = this.$route.query.ID;
    this.getdetail();
  },
  computed: {
    // 折线图名称
    zhexiantuName() {
      let res = "折线图";
      if (this.type === 1) {
        res = "击打折线图";
      } else if (this.type === 2) {
        res = "呐喊折线图";
      } else if (this.type === 3) {
        res = "拥抱折线图";
      } else if (this.type === 4) {
        res = "自信心折线图";
      }
      return res;
    }
  }
};
</script>

<style scoped>
@import "../../../static/css/common.css";
.img1 {
  width: 100%;
}
.info .tent li {
  margin-top: 10px;
  line-height: 26px;
}
.ceshijieguo {
  margin: 20px auto;
  text-align: left;
  font-size: 14px;
  text-indent: 2em;
}
.baseTable td {
  width: 25%;
}
</style>
