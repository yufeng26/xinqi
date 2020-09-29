<template>
  <div class="layui-layout layui-layout-admin">
    <div class="layui-header">
      <div class="layui-logo">
        <img src="/static/img/logo.png" />
      </div>
      <!-- 头部区域（可配合layui已有的水平导航） -->
      <ul class="layui-nav layui-layout-left">
        <li class="layui-nav-item">
          <span class="line"></span>
          <h2>心企物联网云平台</h2>
        </li>
      </ul>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item">
          您好，{{ userinfo.a_RealName }}.欢迎使用心企物联网云平台！
        </li>
        <li class="layui-nav-item" @click="layout">【退出】</li>
      </ul>
    </div>

    <div class="layui-side layui-bg-black">
      <div class="layui-side-scroll">
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul
          ref="menu-list"
          class="layui-nav layui-nav-tree"
          lay-filter="test"
          lay-shrink="all"
        >
          <li class="layui-nav-item">
            <a @click="goto('/index')" class="menu" href="javascript:;">
              <img class="nosele" src="/static/img/首页默认.png" />
              <img class="select" src="/static/img/首页选中.png" />首页
            </a>
          </li>
          <li class="layui-nav-item" v-show="zhanghuguanli">
            <a class href="javascript:;">
              <img class="nosele" src="/static/img/账户管理默认.png" />
              <img class="select" src="/static/img/账户管理选中.png" />账户管理
            </a>
            <dl class="layui-nav-child">
              <dd v-show="guanliyuanguanli">
                <a @click="goto('/admin')" href="javascript:;">管理员管理</a>
              </dd>
              <dd v-show="yonghuxinxiguanli">
                <a @click="goto('/user')" href="javascript:;">用户信息管理</a>
              </dd>
            </dl>
          </li>

          <li class="layui-nav-item" v-show="tousheceshiguanli">
            <a @click="goto('/testresult')" href="javascript:;">
              <img class="nosele" src="/static/img/测评管理默认.png" />
              <img class="select" src="/static/img/测评管理选中.png" />测评管理
            </a>
          </li>
          <li class="layui-nav-item" v-show="xunlianguanli">
            <a @click="goto('/planscheme')" href="javascript:;">
              <img class="nosele" src="/static/img/训练管理默认.png" />
              <img class="select" src="/static/img/训练管理选中.png" />训练管理
            </a>
          </li>
          <li class="layui-nav-item" v-show="shebeiguanli">
            <a class href="javascript:;">
              <img class="nosele" src="/static/img/设备管理默认.png" />
              <img class="select" src="/static/img/设备管理选中.png" />设备管理
            </a>
            <dl class="layui-nav-child">
              <dd v-show="weijiganyu">
                <a @click="goto('/deviceceping')" href="javascript:;"
                  >测评软件</a
                >
              </dd>
              <dd v-show="shenxinfankui">
                <a @click="goto('/devicebaisirui')" href="javascript:;"
                  >百思锐</a
                >
              </dd>
              <dd v-show="tuantishenxinfankui">
                <a @click="goto('/devicejida')" href="javascript:;">击打</a>
              </dd>
              <dd v-show="nahan">
                <a @click="goto('/devicenahan')" href="javascript:;"
                  >呐喊(iii)</a
                >
              </dd>
              <dd v-show="yongbao">
                <a @click="goto('/deviceyongbao')" href="javascript:;"
                  >拥抱(iii)</a
                >
              </dd>
              <dd v-show="zixinxin">
                <a @click="goto('/devicezixinxin')" href="javascript:;"
                  >自信心</a
                >
              </dd>
            </dl>
          </li>

          <li class="layui-nav-item" v-show="zixunguanli">
            <a class href="javascript:;">
              <img class="nosele" src="/static/img/咨询管理默认.png" />
              <img class="select" src="/static/img/咨询管理选中.png" />咨询管理
            </a>
            <dl class="layui-nav-child">
              <dd v-show="zixunyuyue">
                <a @click="goto('/consult')" href="javascript:;">咨询预约</a>
              </dd>
              <dd v-show="zhiribiao">
                <a @click="goto('/duty')" href="javascript:;">值日表</a>
              </dd>
            </dl>
          </li>

          <li class="layui-nav-item" v-show="gerenzhongxin">
            <a @click="goto('/admincenter')" href="javascript:;">
              <img class="nosele" src="/static/img/个人中心默认.png" />
              <img class="select" src="/static/img/个人中心选中.png" />
              个人中心
            </a>
          </li>
          <!-- <li class="layui-nav-item layui-nav-itemed">
            <a class href="javascript:;">
              <img class="nosele" src="/static/img/系统设置默认.png" />
              <img class="select" src="/static/img/系统设置选中.png" />系统设置
            </a>
            <dl class="layui-nav-child">
              <dd>
                <a href="javascript:;" @click="goto('/backup')">数据备份</a>
              </dd>
              <dd>
                <a href="javascript:;" @click="goto('/extendfiled')">扩展字段</a>
              </dd>
            </dl>
          </li> -->
          <li class="layui-nav-item" v-show="xitongshezhi">
            <a class href="javascript:;">
              <img class="nosele" src="/static/img/系统设置默认.png" />
              <img class="select" src="/static/img/系统设置选中.png" />系统设置
            </a>
            <dl class="layui-nav-child">
              <dd v-show="shujubeifen">
                <a href="javascript:;" @click="goto('/backup')">数据备份</a>
              </dd>
              <dd v-show="kuozhanziduan">
                <a href="javascript:;" @click="goto('/extendfiled')"
                  >扩展字段</a
                >
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>

    <div class="layui-body">
      <!-- 内容主体区域 -->
      <router-view></router-view>
    </div>

    <!-- <div class="layui-footer">
      底部固定区域
    </div> -->
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      userinfo: {
        a_RealName: "",
      },
      adminID: "",
      viewPath: "",
      menus: [],
      systemSet: [],
      zhanghuguanli: true,
      guanliyuanguanli: false,
      yonghuxinxiguanli: false,
      tousheceshiguanli: false,
      xunlianguanli: false,
      shebeiguanli: true,
      weijiganyu: false,
      shenxinfankui: false,
      tuantishenxinfankui: false,
      nahan: false,
      yongbao: false,
      zixinxin: false,
      zixunguanli: true,
      zixunyuyue: false,
      zhiribiao: false,
      gerenzhongxin: true,
      xitongshezhi: true,
      shujubeifen: false,
      kuozhanziduan: false,
    };
  },
  created() {},
  mounted() {
    if (this.$route.path == "/") {
      this.$router.push({ path: "/index" });
      window.location.reload();
    }

    this.userinfo.a_RealName = this.$store.state.userinfo.a_RealName;
    this.adminID = this.$store.state.userinfo.ID;
    let that = this;
    let param = new URLSearchParams();
    param.append("adminID", this.adminID);
    param.append("ViewPath", "");
    this.$SystemAPI.CheckAuthority(param, function (data) {
      if (data.Code == 1) {
        that.menus = data.Result.filter((item) => item.Usable);
        const authorityArray = that.menus.map((item) => {
          return item.ID;
        });
        if (
          authorityArray.includes(9) ||
          authorityArray.includes(10) ||
          authorityArray.includes(11) ||
          authorityArray.includes(12) ||
          authorityArray.includes(13) ||
          authorityArray.includes(14) ||
          authorityArray.includes(15)
        ) {
          that.guanliyuanguanli = true;
        }
        if (
          authorityArray.includes(16) ||
          authorityArray.includes(17) ||
          authorityArray.includes(18) ||
          authorityArray.includes(19) ||
          authorityArray.includes(20) ||
          authorityArray.includes(21) ||
          authorityArray.includes(22)
        ) {
          that.yonghuxinxiguanli = true;
        }
        if (!that.guanliyuanguanli && !that.yonghuxinxiguanli) {
          that.zhanghuguanli = false;
        }
        if (
          authorityArray.includes(24) ||
          authorityArray.includes(25) ||
          authorityArray.includes(26)
        ) {
          that.tousheceshiguanli = true;
        }
        if (
          authorityArray.includes(29) ||
          authorityArray.includes(30) ||
          authorityArray.includes(31)
        ) {
          that.xunlianguanli = true;
        }
        if (
          authorityArray.includes(38) ||
          authorityArray.includes(39) ||
          authorityArray.includes(40)
        ) {
          that.weijiganyu = true;
        }
        if (
          authorityArray.includes(41) ||
          authorityArray.includes(42) ||
          authorityArray.includes(43)
        ) {
          that.shenxinfankui = true;
        }
        if (
          authorityArray.includes(44) ||
          authorityArray.includes(45) ||
          authorityArray.includes(46)
        ) {
          that.tuantishenxinfankui = true;
        }
        if (
          authorityArray.includes(47) ||
          authorityArray.includes(48) ||
          authorityArray.includes(49)
        ) {
          that.nahan = true;
        }
        if (
          authorityArray.includes(50) ||
          authorityArray.includes(51) ||
          authorityArray.includes(52)
        ) {
          that.yongbao = true;
        }
        if (
          authorityArray.includes(53) ||
          authorityArray.includes(54) ||
          authorityArray.includes(55)
        ) {
          that.zixinxin = true;
        }
        if (
          !that.weijiganyu &&
          !that.shenxinfankui &&
          !that.tuantishenxinfankui &&
          !that.nahan &&
          !that.yongbao &&
          !that.zixinxin
        ) {
          that.shebeiguanli = false;
        }
        if (authorityArray.includes(57)) {
          that.zixunyuyue = true;
        }
        if (authorityArray.includes(58)) {
          that.zhiribiao = true;
        }
        if (!that.zixunyuyue && !that.zhiribiao) {
          that.zixunguanli = false;
        }
        if (authorityArray.includes(60)) {
          that.shujubeifen = true;
        }
        if (authorityArray.includes(61)) {
          that.kuozhanziduan = true;
        }
        if (!that.shujubeifen && !that.kuozhanziduan) {
          that.xitongshezhi = false;
        }
      }
    });
  },
  activated() {
    this.userinfo.a_RealName = this.$store.state.userinfo.a_RealName;
    var swiper = new Swiper(".swiper-container", {
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
    });
  },
  methods: {
    goto(path) {
      this.$router.push({ path: path });
    },
    layout() {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("userInfo");
      localStorage.removeItem("name");
      localStorage.removeItem("pwd");
      localStorage.removeItem("IsCheck");
      this.$router.push("/login");
      this.$message.success("退出成功");
    },
  },
};
</script>

<style lang="less">
.layui-nav-item a {
  font-size: 17px;
}
</style>
