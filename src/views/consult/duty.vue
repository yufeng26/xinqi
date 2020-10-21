<template>
  <!-- 内容主体区域 -->
  <div class="bigbox">
    <div class="consult">
      <h3 class="createadm" @click="$router.push('/dutyedit')">编辑值班表</h3>
      <p
        v-if="data.uc_IsDuty == 0"
        style="
          background: #0070e5;
          text-align: center;
          color: #fff;
          width: 100%;
          line-height: 60px;
          font-size: 26px;
        "
      >
        值班表
      </p>
      <div class="tab">
        <table class="layui-table duty" lay-skin="line">
          <colgroup>
            <col width="150" />
            <col width="200" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>上午</th>
              <th>下午</th>
              <th>晚上</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>星期一</td>
              <td v-if="data.duty1am.IsDuty == 0">
                <span>{{ data.duty1am.time }}</span
                ><span>{{ data.duty1am.count }}人</span
                ><span v-if="data.duty1am.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty1pm.IsDuty == 0">
                <span>{{ data.duty1pm.time }}</span
                ><span>{{ data.duty1pm.count }}人</span
                ><span v-if="data.duty1pm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty1wm.IsDuty == 0">
                <span>{{ data.duty1wm.time }}</span
                ><span>{{ data.duty1wm.count }}人</span
                ><span v-if="data.duty1wm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
            </tr>
            <tr>
              <td>星期二</td>
              <td v-if="data.duty2am.IsDuty == 0">
                <span>{{ data.duty2am.time }}</span
                ><span>{{ data.duty2am.count }}人</span
                ><span v-if="data.duty2am.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty2pm.IsDuty == 0">
                <span>{{ data.duty2pm.time }}</span
                ><span>{{ data.duty2pm.count }}人</span
                ><span v-if="data.duty2pm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty2wm.IsDuty == 0">
                <span>{{ data.duty2wm.time }}</span
                ><span>{{ data.duty2wm.count }}人</span
                ><span v-if="data.duty2wm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
            </tr>
            <tr>
              <td>星期三</td>
              <td v-if="data.duty3am.IsDuty == 0">
                <span>{{ data.duty3am.time }}</span
                ><span>{{ data.duty3am.count }}人</span
                ><span v-if="data.duty3am.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty3pm.IsDuty == 0">
                <span>{{ data.duty3pm.time }}</span
                ><span>{{ data.duty3pm.count }}人</span
                ><span v-if="data.duty3pm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty3wm.IsDuty == 0">
                <span>{{ data.duty3wm.time }}</span
                ><span>{{ data.duty3wm.count }}人</span
                ><span v-if="data.duty3wm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
            </tr>
            <tr>
              <td>星期四</td>
              <td v-if="data.duty4am.IsDuty == 0">
                <span>{{ data.duty4am.time }}</span
                ><span>{{ data.duty4am.count }}人</span
                ><span v-if="data.duty4am.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty4pm.IsDuty == 0">
                <span>{{ data.duty4pm.time }}</span
                ><span>{{ data.duty4pm.count }}人</span
                ><span v-if="data.duty4pm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty4wm.IsDuty == 0">
                <span>{{ data.duty4wm.time }}</span
                ><span>{{ data.duty4wm.count }}人</span
                ><span v-if="data.duty4wm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
            </tr>
            <tr>
              <td>星期五</td>
              <td v-if="data.duty5am.IsDuty == 0">
                <span>{{ data.duty5am.time }}</span
                ><span>{{ data.duty5am.count }}人</span
                ><span v-if="data.duty5am.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty5pm.IsDuty == 0">
                <span>{{ data.duty5pm.time }}</span
                ><span>{{ data.duty5pm.count }}人</span
                ><span v-if="data.duty5pm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty5wm.IsDuty == 0">
                <span>{{ data.duty5wm.time }}</span
                ><span>{{ data.duty5wm.count }}人</span
                ><span v-if="data.duty5wm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
            </tr>
            <tr>
              <td>星期六</td>
              <td v-if="data.duty6am.IsDuty == 0">
                <span>{{ data.duty6am.time }}</span
                ><span>{{ data.duty6am.count }}人</span
                ><span v-if="data.duty6am.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty6pm.IsDuty == 0">
                <span>{{ data.duty6pm.time }}</span
                ><span>{{ data.duty6pm.count }}人</span
                ><span v-if="data.duty6pm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty6wm.IsDuty == 0">
                <span>{{ data.duty6wm.time }}</span
                ><span>{{ data.duty6wm.count }}人</span
                ><span v-if="data.duty6wm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
            </tr>
            <tr>
              <td>星期日</td>
              <td v-if="data.duty7am.IsDuty == 0">
                <span>{{ data.duty7am.time }}</span
                ><span>{{ data.duty7am.count }}人</span
                ><span v-if="data.duty7am.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty7pm.IsDuty == 0">
                <span>{{ data.duty7pm.time }}</span
                ><span>{{ data.duty7pm.count }}人</span
                ><span v-if="data.duty7pm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
              <td v-if="data.duty7wm.IsDuty == 0">
                <span>{{ data.duty7wm.time }}</span
                ><span>{{ data.duty7wm.count }}人</span
                ><span v-if="data.duty7wm.state == 1" class="reds">约满</span>
                <span v-else class="greens">有空</span>
              </td>
              <td v-else class="fzb">非值班时间</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="data.uc_IsDuty == 0" class="zrmess">
        <span>咨询事电话： {{ data.uc_TelPhone }}</span
        ><span>地址：{{ data.uc_Address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "duty",
  data() {
    return {
      data: {
        uc_TelPhone: "",
        uc_Address: "",
        uc_DutyDates: "",
        uc_IsDuty: 0,
        duty1am: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty1pm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty1wm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty2am: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },

        duty2pm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty2wm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty3am: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty3pm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty3wm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },

        duty4am: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty4pm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty4wm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty5am: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty5pm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty5wm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty6am: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty6pm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty6wm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty7am: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty7pm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
        duty7wm: {
          weekName: "",
          IsDuty: 1,
          count: 0,
          state: 0,
          time: "",
        },
      },
      AdminID: "",
    };
  },
  methods: {
    handleGetConsulterDuty() {
      let v = this;
      let param = new URLSearchParams();

      param.append("AdminID", this.AdminID);

      this.userList = this.$ConsulationAPI.getConsulterDuty(param, function (
        data
      ) {
        if (data.Code == 1) {
          v.data = data.Result;
          console.log(v.data);
        }
      });
    },
  },
  mounted() {
    this.AdminID = this.$store.state.userinfo.ID;
    this.handleGetConsulterDuty();
  },
};
</script>

<style scoped>
@import "../../../static/css/duty.css";
.createadm {
  cursor: pointer;
}
</style>
