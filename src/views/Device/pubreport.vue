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

      <h3>
        量表名称：<span>{{ testresult.DeviceName }}</span>
      </h3>
    </div>
    <div class="tlt">呐喊图表</div>
    <div class="info">
      <div id="fiveEcharts" :style="{ width: '100%', height: '400px' }"></div>
      <div id="sixEcharts" :style="{ width: '100%', height: '400px' }"></div>
    </div>
    <div id="fiveEcharts" :style="{ width: '100%', height: '400px' }"></div>
    <div class="tlt">指导建议</div>
    <div class="info">
      <p class="tent">{{ testresult.Advice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "cepingreport",
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
        BrokenLine1: [],
        BrokenLine2: []
      }
    };
  },
  methods: {
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("Id", this.testresult.ID);
      this.$TestResultAPI.getReportResult(params, function(data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
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
      let xData1 = (this.testresult.BrokenLine1
        ? JSON.parse(this.testresult.BrokenLine1)
        : []
      ).map((item, index) => index + 1);
      console.log(this.testresult.BrokenLine2);
      let xData2 = (this.testresult.BrokenLine2
        ? JSON.parse(this.testresult.BrokenLine2)
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
          data: xData1
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
          data: xData2
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.testresult.BrokenLine2
              ? JSON.parse(this.testresult.BrokenLine2)
              : [],
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
  },
  computed: {}
};
</script>

<style scoped>
@import "../../../static/css/common.css";
.img1 {
  width: 100%;
}
</style>
