<template>
  <div class="content">
    <div class="bigPic" v-if="isShowbox" @click="boxPartShow()">
      <img src="../../assets/image/bg.png" alt="" />
    </div>
    <div class="bigbox" v-else>
      <el-row :gutter="15">
        <el-col :span="12" style="padding-left: 0px; padding-right: 0px">
          <div class="report">
            <h3>自诊报告</h3>
            <div class="tab">
              <table class="layui-table" lay-skin="line">
                <colgroup>
                  <col width="150" />
                  <col width="200" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th class="left">真实姓名</th>
                    <th>总分</th>
                    <th>修改时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in ReportList" :key="index">
                    <td class="left">{{ item.UserName }}</td>
                    <td>{{ item.Score }}分</td>
                    <td>{{ dateFormat(item.CreateTime) }}</td>
                  </tr>
                </tbody>
              </table>
              <a
                href="javascript:void(0)"
                @click="goto('/testresult')"
                class="more"
                >查看更多</a
              >
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-right: 0px">
          <div class="supervision">
            <h3>训练监督</h3>
            <div class="tab">
              <table class="layui-table" lay-skin="line">
                <colgroup>
                  <col width="150" />
                  <col width="200" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th class="left">真实姓名</th>
                    <th>训练项目</th>
                    <th>训练进度</th>
                    <th>修改时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in PlanList" :key="index">
                    <td class="left">{{ item.UserName }}</td>
                    <td>{{ item.TopicName }}</td>
                    <td>{{ item.progress }}</td>
                    <td>{{ dateFormat(item.CreateTime) }}</td>
                  </tr>
                </tbody>
              </table>
              <a
                href="javascript:void(0)"
                @click="goto('/planscheme')"
                class="more"
                >查看更多</a
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="12" style="padding-left: 0px; padding-right: 0px">
          <div class="facility">
            <h3>互联设备</h3>
            <div class="tab">
              <!--<div class="swiper-container">-->
              <!--<div class="swiper-wrapper">-->
              <!--<div v-for="item in DeviceList" :key="item.ID" class="swiper-slide"><img :src="item.DeviceImg" /><p>{{item.DeviceName}}</p></div>-->

              <!--</div>-->
              <!--&lt;!&ndash; Add Pagination &ndash;&gt;-->
              <!--<div class="swiper-pagination"></div>-->
              <!--&lt;!&ndash; Add Arrows &ndash;&gt;-->
              <!--<div class="swiper-button-next"></div>-->
              <!--<div class="swiper-button-prev"></div>-->
              <!--</div>-->

              <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for="items in DeviceList" :key="items.ID">
                  <a @click="goto(items.DeviceUrl)" href="javascript:void(0)"
                    ><img :src="items.DeviceImg" alt=""
                  /></a>
                  <p>{{ items.DeviceName }}</p></swiper-slide
                >

                <!-- Optional controls -->
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="padding-right: 0px">
          <div class="consult">
            <h3>预约咨询</h3>
            <div class="tab">
              <table class="layui-table" lay-skin="line">
                <colgroup>
                  <col width="150" />
                  <col width="200" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th class="left">真实姓名</th>
                    <th>预约咨询师</th>
                    <th>修改时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in ConsultationLsit" :key="index">
                    <td class="left">{{ item.UserName }}</td>
                    <td>{{ item.Consulater }}</td>
                    <td>{{ dateFormat(item.CreateTime) }}</td>
                  </tr>
                </tbody>
              </table>
              <a
                href="javascript:void(0)"
                @click="goto('/consult')"
                class="more"
                >查看更多</a
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isShowbox: true,
      ReportList: [],
      PlanList: [],
      DeviceList: [],
      ConsultationLsit: [],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 40,
        slidesPerGroup: 4,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  mounted() {
    if (localStorage.getItem("isShowbox") === "false") {
      this.isShowbox = false;
    }
    this.getReportList();

    this.getPlanList();
    this.getDeviceList();
    this.getConsulationList();
  },
  watch: {},
  methods: {
    boxPartShow() {
      this.isShowbox = false;
      localStorage.setItem("isShowbox", "false");
    },
    dateFormat(cellValue) {
      if (cellValue == undefined) {
        return "";
      }
      return this.$moment(cellValue).format("YYYY-MM-DD  HH:mm:ss");
    },
    goto(path) {
      this.$router.push({ path: path });
    },
    renderswiper() {
      let swiper = new Swiper(".swiper-container", {
        slidesPerView: 4,
        spaceBetween: 40,
        slidesPerGroup: 4,
        loop: true,
        grabCursor: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
    getReportList() {
      let v = this;
      let userInfo = sessionStorage.getItem("userinfo");
      let userInfo2 = JSON.stringify(userInfo);
      let userInfo3 = JSON.parse(userInfo);
      let param = new URLSearchParams(`adminId=${userInfo3.ID}`);
      this.$ReportAPI.getReportList(param, function (data) {
        if (data.Code == 1) {
          v.ReportList = data.Result;
        }
      });
    },
    getPlanList() {
      let v = this;
      let userInfo = sessionStorage.getItem("userinfo");
      let userInfo2 = JSON.stringify(userInfo);
      let userInfo3 = JSON.parse(userInfo);
      let param = new URLSearchParams(`adminId=${userInfo3.ID}`);
      this.$PlanAPI.getPlanList(param, function (data) {
        if (data.Code == 1) {
          v.PlanList = data.Result;
        }
      });
    },
    getDeviceList() {
      let v = this;
      let param = new URLSearchParams();
      this.$DeviceAPI.getDeviceList(param, function (data) {
        if (data.Code == 1) {
          v.DeviceList = data.Result;
        }
      });
    },
    getConsulationList() {
      let v = this;
      let userInfo = sessionStorage.getItem("userinfo");
      let userInfo2 = JSON.stringify(userInfo);
      let userInfo3 = JSON.parse(userInfo);
      let param = new URLSearchParams(`adminId=${userInfo3.ID}`);
      this.$ConsulationAPI.getConsultationList(param, function (data) {
        if (data.Code == 1) {
          v.ConsultationLsit = data.Result;
        }
      });
    },
  },
};
</script>

<style>
.layui-body {
  height: calc(100vh - 70px);
}
.content {
  background: #ebebeb;
  height: 100%;
}
.content .bigPic {
  height: 100%;
}
.bigPic img {
  width: 100%;
  height: 100%;
}
.content .bigbox .layui-table {
  box-sizing: border-box;
  border-collapse: collapse;
  border: none;
}
.content .pl5 {
  background-color: #ffffff;
}
h3 {
  text-align: left;
}
</style>
