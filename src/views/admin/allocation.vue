<template>
  <!-- 内容主体区域 -->
  <div class="bigbox" style="padding:0 10px;">
    <div class="consult">
      <p
        style="background:#0070e5;text-align: center;color:#fff;width:100%;line-height: 60px; font-size: 26px;"
      >权限设置</p>
      <ul class="editduty">
        <li v-for="(yiji,index) of menus" :key="index">
          <P class="yiji">{{yiji.MenuName}}</P>
          <div v-for="erji in yiji.erji" :key="erji.ID">
            <p class="lined">
              <span></span>
              {{erji.MenuName}}
            </p>
            <div class="guard">
              <el-checkbox
                class="menu"
                v-model="sanji.Usable"
                v-for="sanji in erji.sanji"
                :key="sanji.ID"
              >{{sanji.MenuName}}</el-checkbox>
            </div>
          </div>
        </li>
        <!-- <li>
          <div>
            <P class="yiji">第三方胡椒粉</P>
            <p class="lined">
              <span></span>周二
            </p>
            <div class="guard">
              <el-checkbox>新建管理员</el-checkbox>
              <el-checkbox>查看管理员</el-checkbox>
              <el-checkbox>编辑管理员</el-checkbox>
              <el-checkbox>重置密码</el-checkbox>
              <el-checkbox>权限设置</el-checkbox>
              <el-checkbox>分配用户</el-checkbox>
              <el-checkbox>删除管理员</el-checkbox>
            </div>
        </div>-->
        <!-- <p class="lined">
            <span></span>周二
          </p>
          <div class="guard">
            <el-checkbox>新建管理员</el-checkbox>
            <el-checkbox>查看管理员</el-checkbox>
            <el-checkbox>编辑管理员</el-checkbox>
            <el-checkbox>重置密码</el-checkbox>
            <el-checkbox>权限设置</el-checkbox>
            <el-checkbox>分配用户</el-checkbox>
            <el-checkbox>删除管理员</el-checkbox>
        </div>-->
        <li class="zxaddress">
          <p class="resume">
            <button type="button" @click="SaveLimit" class="layui-btn layui-btn-normal">确认</button>
            <button
              type="button"
              @click="$router.go(-1)"
              style="background: #9571f9;"
              class="layui-btn"
            >返回</button>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "dutyedit",
  data() {
    return {
      menus: {},
      admindID: "",
      fenpeiID: "",
      viewPath: "",
      limitsId: "",
    };
  },
  methods: {
    getLimits() {
      let that = this;
      let param = new URLSearchParams();
      param.append("adminID", this.admindID);
      param.append("fenpeiID", this.fenpeiID);
      this.$SystemAPI.GetLimitsList(param, function (data) {
        if (data.Code == 1) {
          that.menus = data.Result;
        }
      });
    },
    SaveLimit() {
      this.limitsId = "";
      let that = this;
      this.menus.forEach((item) => {
        item.erji.forEach((c) => {
          c.sanji.forEach((x) => {
            if (x.Usable) {
              this.limitsId += x.ID + ",";
            }
          });
        });
      });
      let ids = this.limitsId.slice(0, this.limitsId.length - 1);
      let param = new URLSearchParams();
      console.log(ids);
      param.append("limitsId", ids);
      param.append("fenpeiId", this.fenpeiID);
      this.$SystemAPI.SaveLimit(param, function (data) {
        if (data.Code == 1) {
          that.$message.success("保存成功!");
        }
      });
    },
  },
  mounted() {
    this.admindID = this.$store.state.userinfo.ID;
    this.fenpeiID = this.$route.query.ID;
    this.viewPath = this.$route.path;
    this.getLimits();
    // this.getdutydetail();
  },
};
</script>

<style scoped>
@import "../../../static/css/duty.css";
@import "../../../static/css/editduty.css";
.guard {
  text-align: left;
}
.yiji {
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: #0070e5;
}
.lined {
  margin-top: 10px;
}
.guard {
  margin-top: -10px;
  display: block;
}
.menu {
  width: 80px;
}
</style>
