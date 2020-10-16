<template>
  <!-- 百思锐报告详情 -->
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
            测试时长：<span>{{ testresult.CepingTime }}</span>
          </td>
        </tr>
      </table>

      <h3>
        量表名称：<span>{{ testresult.DeviceName }}</span>
      </h3>
    </div>
    <div class="tlt">评估结果</div>
    <div class="info">
      <p class="pinggujieguo">
        {{ testresult.TestResult ? JSON.parse(testresult.TestResult)[0] : "" }}
      </p>
    </div>
    <div class="tlt">专注度参数</div>
    <table border="1" class="resultTable">
      <tr>
        <td>
          平均值：<span>{{ testresult.AttentionAvg }}</span>
        </td>
        <td>
          最大值：<span>{{ testresult.AttentionMax }}</span>
        </td>
        <td>
          最小值：<span>{{ testresult.AttentionMin }}</span>
        </td>
        <td>
          平方差：<span>{{ testresult.AttentionSD }}</span>
        </td>
        <td>
          标准差：<span>{{ testresult.AttentionCV }}</span>
        </td>
      </tr>
    </table>

    <div class="tlt">放松度参数</div>
    <table border="1" class="resultTable">
      <tr>
        <td>
          平均值：<span>{{ testresult.MeditationAvg }}</span>
        </td>
        <td>
          最大值：<span>{{ testresult.MeditationMax }}</span>
        </td>
        <td>
          最小值：<span>{{ testresult.MeditationMin }}</span>
        </td>
        <td>
          平方差：<span>{{ testresult.MeditationSD }}</span>
        </td>
        <td>
          标准差：<span>{{ testresult.MeditationCV }}</span>
        </td>
      </tr>
    </table>

    <div class="tlt">脑波曲线</div>
    <div id="fiveEcharts" :style="{ width: '100%', height: '400px' }"></div>
    <div class="tlt">因子得分图表</div>
    <div id="sixEcharts" :style="{ width: '100%', height: '400px' }"></div>
    <div class="tlt">各项说明</div>
    <div
      v-for="item in testresult.DimensionList
        ? JSON.parse(testresult.DimensionList)
        : []"
      :key="item.Name"
      class="gexiangshuoming"
    >
      <p>纬度名称：{{ item.Name }}</p>
      <p>得分等级：{{ item.score }} -- {{ item.grade }}</p>
      <p>结果分析：{{ item.result }}</p>
      <p>指导建议：{{ item.Suggestion }}</p>
    </div>
    <div class="exportBox">
      <el-button type="primary" @click="exportWord" class="exportBtn">
        导出
      </el-button>
    </div>
  </div>
  <!-- <div class="bigbox">
    <div class="report">
      <div class="img1"><img src="../../../static/img/scl90ck/1.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/2.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/3.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/4.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/5.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/6.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/7.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/8.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/9.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/10.png" /></div>
      <div class="img1"><img src="../../../static/img/scl90ck/11.png" /></div>
    </div>

    <div style="display: flex; justify-content: center; margin-top: 80px">
      <button
        type="button"
        style="background: #01c8e7"
        @click="ExportRow"
        class="layui-btn layui-btn-lg"
      >
        导出
      </button>
    </div>
  </div> -->
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
        BrokenLine1: [],
        BrokenLine2: [],
      },
    };
  },
  methods: {
    // 获取百思锐详情页面数据
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("id", this.testresult.ID);
      // 百思锐详情
      this.$ReportOptionAPI.GetBaisiruiReport(params, function (data) {
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
      let xData = (this.testresult.lstAtt
        ? JSON.parse(this.testresult.lstAtt)
        : []
      ).map((item, index) => index + 1);
      // 绘制图表
      myChart1.setOption({
        color: ["#3cc5a3", "#ffc000", "#5cdbf2"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["专注度", "放松度"],
        },
        title: {
          text: "脑波曲线",
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
            name: "专注度",
            type: "line",
            stack: "总量",
            data: this.testresult.lstAtt
              ? JSON.parse(this.testresult.lstAtt)
              : [],
          },
          {
            name: "放松度",
            type: "line",
            stack: "总量",
            data: this.testresult.lstMed
              ? JSON.parse(this.testresult.lstMed)
              : [],
          },
        ],
      });
      // 绘制图表
      const data2 = this.testresult.Factorscores
        ? JSON.parse(this.testresult.Factorscores)
        : [];
      myChart2.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: data2.map((item) => item.DimensionName),
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "分数",
            type: "bar",
            barWidth: "60%",
            data: data2.map((item) => item.Score),
          },
        ],
      });
    },
    //导出报告
    exportWord() {
      this.$PlanSchemeAPI.bsrReportResult(this.$route.query.ID);
    },
    // //导出报告
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
  computed: {},
};
</script>

<style scoped>
@import "../../../static/css/common.css";
.img1 {
  width: 100%;
}
.resultTable {
  margin: 20px auto;
  width: 90%;
}
.resultTable tr {
  height: 50px;
}
.resultTable tr td span {
  color: brown;
}
.info .pinggujieguo {
  text-indent: 2em;
  text-align: left;
  line-height: 28px;
  margin: 20px;
}
.gexiangshuoming {
  text-indent: 2em;
  text-align: left;
  line-height: 28px;
  margin: 20px;
}
.gexiangshuoming p:first-child {
  font-weight: bold;
  font-size: 16px;
}
</style>
