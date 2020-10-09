<template>
  <div class="bigbox">
    <div class="report">
      <h3 style="color: #555; background: #fff">基本信息</h3>
      <div
        class="tab"
        style="color: rgb(85, 85, 85); background: rgb(255, 255, 255)"
      >
        <table class="tabs">
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
              当前受教水平：<span>{{ testresult.Education }}</span>
            </td>
          </tr>
          <tr>
            <td>
              性别：<span>{{ testresult.Sex }}</span>
            </td>
            <td>
              出生年月：<span>{{ testresult.Birthday }}</span>
            </td>
            <td>
              测试时间：<span>{{ testresult.ReportTime }}</span>
            </td>
            <td>
              测试时长：<span>{{ testresult.ReportHour }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="facility">
      <h3>评估结果</h3>
      <div
        class="tab"
        style="color: rgb(85, 85, 85); background: rgb(255, 255, 255)"
      >
        <table class="tabd">
          <img :src="testresult.ReportImg" />
        </table>
      </div>
    </div>
    <div class="supervision" style="color: #555; background: #fff">
      <h3>评估结果分析</h3>
      <div class="yyjl">
        <div class="zxmess">
          <h1>总分：{{ testresult.Result }}</h1>
          <p>{{ testresult.Suggestion }}</p>
        </div>
      </div>
      <div class="yyjl">
        <div
          class="zxmess"
          v-for="items in testresult.disimionslist"
          :key="items.ID"
        >
          <h1>{{ items.dm_DimisionName }}：{{ items.dm_Grade }}</h1>
          <p>{{ items.dm_Analysis }}</p>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: center; margin-top: 80px">
      <button
        type="button"
        @click="exportDevice(testresult.ID)"
        style="background: #01c8e7"
        class="layui-btn layui-btn-lg"
      >
        导出
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "planreport",
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
        Result: "",
        Comment,
        ReportImg: "",
      },
    };
  },
  methods: {
    getdetail() {
      let v = this;
      let params = new URLSearchParams();
      params.append("Id", this.testresult.ID);
      // 百思锐详情
      this.$ReportOptionAPI.GetBaisiruiReport(params, function (data) {
        if (data.Code == 1) {
          v.testresult = data.Result;
          v.testresult.planschemelist = combineYd(v.testresult.planschemelist);
          console.log(v.testresult.planschemelist);
        }
      });
    },
    combineYd(list) {
      var k = 0;
      let field = "yd";
      while (k < list.length) {
        list[k][field + "span"] = 1;
        list[k][field + "dis"] = false;
        for (var i = k + 1; i <= list.length - 1; i++) {
          if (list[k][field] == list[i][field] && list[k][field] != "") {
            list[k][field + "span"]++;
            list[k][field + "dis"] = false;
            list[i][field + "span"] = 1;
            list[i][field + "dis"] = true;
          } else {
            break;
          }
        }
        k = i;
      }
      return list;
    },
    //导出
    exportDevice(row) {
      console.log(row);
      this.$PlanSchemeAPI.ReportResult(row);
    },
  },
  mounted() {
    this.testresult.ID = this.$route.query.ID;
    this.getdetail();
  },
  computed: {},
};
</script>

<style scoped>
@import "../../../static/css/appraisallook.css";
</style>
