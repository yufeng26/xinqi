<template>
  <div class="bigbox">
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
      <!-- <a href="../../../static/img/scl90ck/1.png">导出</a> -->
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
        Comment,
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
    },
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
@import "../../../static/css/appraisallook.css";
.img1 {
  width: 100%;
}
</style>
