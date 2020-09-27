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
          <li class="layui-nav-item">
            <a class href="javascript:;">
              <img class="nosele" src="/static/img/账户管理默认.png" />
              <img class="select" src="/static/img/账户管理选中.png" />账户管理
            </a>
            <dl class="layui-nav-child">
              <dd>
                <a @click="goto('/admin')" href="javascript:;">管理员管理</a>
              </dd>
              <dd>
                <a @click="goto('/user')" href="javascript:;">用户信息管理</a>
              </dd>
            </dl>
          </li>

          <li class="layui-nav-item">
            <a @click="goto('/testresult')" href="javascript:;">
              <img class="nosele" src="/static/img/测评管理默认.png" />
              <img
                class="select"
                src="/static/img/测评管理选中.png"
              />投射测验管理
            </a>
          </li>
          <li class="layui-nav-item">
            <a @click="goto('/planscheme')" href="javascript:;">
              <img class="nosele" src="/static/img/训练管理默认.png" />
              <img class="select" src="/static/img/训练管理选中.png" />训练管理
            </a>
          </li>
          <li class="layui-nav-item">
            <a class href="javascript:;">
              <img class="nosele" src="/static/img/设备管理默认.png" />
              <img class="select" src="/static/img/设备管理选中.png" />设备管理
            </a>
            <dl class="layui-nav-child">
              <dd>
                <a @click="goto('/deviceceping')" href="javascript:;"
                  >危机干预</a
                >
              </dd>
              <dd>
                <a @click="goto('/devicebaisirui')" href="javascript:;"
                  >身心反馈</a
                >
              </dd>
              <dd>
                <a @click="goto('/devicejida')" href="javascript:;"
                  >团体身心反馈</a
                >
              </dd>
              <dd>
                <a @click="goto('/devicenahan')" href="javascript:;"
                  >呐喊(iii)</a
                >
              </dd>
              <dd>
                <a @click="goto('/deviceyongbao')" href="javascript:;"
                  >拥抱(iii)</a
                >
              </dd>
              <dd>
                <a @click="goto('/devicezixinxin')" href="javascript:;"
                  >自信心</a
                >
              </dd>
            </dl>
          </li>
          <li class="layui-nav-item">
            <a class href="javascript:;">
              <img class="nosele" src="/static/img/咨询管理默认.png" />
              <img class="select" src="/static/img/咨询管理选中.png" />咨询管理
            </a>
            <dl class="layui-nav-child">
              <dd v-show="zixunyuyue">
                <a @click="goto('/consult')" href="javascript:;">咨询预约</a>
              </dd>
              <dd v-if="zhiribiao">
                <a @click="goto('/duty')" href="javascript:;">值日表</a>
              </dd>
              <dd>
                <a @click="goto('/admincenter')" href="javascript:;">
                  <img class="nosele" src="/static/img/个人中心默认.png" />
                  <img class="select" src="/static/img/个人中心选中.png" />
                  个人中心</a
                >
              </dd>
            </dl>
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
          <li class="layui-nav-item">
            <a class href="javascript:;" v-if="xitongshezhi">
              <img class="nosele" src="/static/img/系统设置默认.png" />
              <img class="select" src="/static/img/系统设置选中.png" />系统设置
            </a>
            <dl class="layui-nav-child">
              <dd v-if="shujubeifen">
                <a href="javascript:;" @click="goto('/backup')">数据备份</a>
              </dd>
              <dd v-if="kuozhanziduan">
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
import $ from "jquery";
export default {
  name: "home",
  data() {
    return {
      userinfo: {
        a_RealName: ""
      },
      adminID: "",
      viewPath: "",
      menus: [],
      systemSet: [],
      xitongshezhi: true,
      shujubeifen: false,
      kuozhanziduan: false,
      zixunyuyue: false,
      zhiribiao: false
    };
  },
  created() {},
  mounted() {
    const $menuList = $(this.$refs["menu-list"]);
    console.log(this.$route.path);
    if (this.$route.path === "/testresult") {
      this.pickTheMenu($menuList, 2, null);
    }
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
    this.$SystemAPI.CheckAuthority(param, function(data) {
      if (data.Code == 1) {
        that.menus = data.Result;
        that.menus.forEach(c => {
          if (c.ID == 57 && c.Usable) {
            that.zixunyuyue = true;
          }
          if (c.ID == 58 && c.Usable) {
            that.zhiribiao = true;
          }
          if (c.ID == 60 && c.Usable) {
            that.shujubeifen = true;
          }
          if (c.ID == 61 && c.Usable) {
            that.kuozhanziduan = true;
          }
        });
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
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
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
    pickTheMenu($menuList, par, son) {
      $menuList.find("li").each(function(i, obj) {
        $(obj).removeClass("layui-nav-itemed");
        $(obj)
          .find("dl dd")
          .each(function(k, inner) {
            $(inner).removeClass("layui-this");
          });
      });
      $menuList
        .find("li")
        .eq(par)
        .addClass("layui-nav-itemed");
      if (son === null) return;
      $menuList
        .find("li")
        .eq(par)
        .find("dl dd")
        .eq(son)
        .addClass("layui-this");
    }
  }
};
</script>

<style lang="less">
.layui-nav-item a {
  font-size: 17px;
}
</style>
