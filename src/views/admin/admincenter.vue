<!-- 添加修改用户页面 -->
<template>
  <div class="formPage">
    <!-- 内容主体区域 -->
    <ul class="tittop">
      <li
        v-for="(item, index) in navlist"
        v-bind:key="index"
        :class="changeRed == index ? 'blue' : 'white'"
        @click="reds(index)"
      >
        {{ item.text }}
      </li>
    </ul>
    <div class="inputBox" v-if="changeRed == 0">
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">*用户名：</label>
          <div class="inputData">
            <el-input
              v-model="admininfo.a_UserName"
              placeholder="请输入用户名"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">*真实姓名：</label>
          <div class="inputData">
            <el-input
              v-model="admininfo.a_RealName"
              placeholder="请输入真实姓名"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">性 别：</label>
          <div class="inputData">
            <el-input v-model="admininfo.a_Sex"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">出生年月：</label>
          <div class="inputData">
            <el-date-picker
              v-model="admininfo.a_Birthday"
              type="date"
              @change="selectTime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              style="width:100%"
            >
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">电 话：</label>
          <div class="inputData">
            <el-input v-model="admininfo.a_Telphone"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">邮 箱：</label>
          <div class="inputData">
            <el-input v-model="admininfo.a_Email"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <el-col :span="16">
          <label class="inputLabel">个人简介：</label>
          <div class="inputData">
            <el-input
              placeholder="请输入内容"
              v-model="admininfo.a_Produce"
              type="textarea"
              rows="4"
              maxlength="300"
              show-word-limit
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <div class="btnGroup">
          <el-button type="primary" @click="addadminhandle()" class="InputBtn">
            确定
          </el-button>
          <el-button type="success" @click="router.go(-1)" class="InputBtn">
            返回
          </el-button>
        </div>
      </el-row>
    </div>
    <div class="inputBox" v-if="changeRed == 1">
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">*新密码：</label>
          <div class="inputData">
            <el-input type="password" v-model="admininfo.a_Password"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">*确认密码：</label>
          <div class="inputData">
            <el-input type="password" v-model="admininfo.a_Password"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <div class="btnGroup">
          <el-button type="primary" @click="admininfo()" class="InputBtn">
            确定
          </el-button>
          <el-button type="success" @click="router.go(-1)" class="InputBtn">
            返回
          </el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "usercenter",
  data() {
    return {
      admininfo: {
        ID: this.$store.state.userinfo.ID,
        a_UserName: "",
        a_Password: "",
        a_RealName: "",
        a_Birthday: "",
        a_Sex: "",
        a_Telphone: "",
        a_Email: "",
        a_Produce: "",
        a_CreateTime: null,
        a_RoleID: "00df5597ba4e11e99a4f00cfe04d1a01"
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      navlist: [{ text: "个人资料" }, { text: "修改密码" }],
      changeRed: 0
    };
  },
  methods: {
    reds: function(index) {
      this.changeRed = index;
    },
    selectTime(val) {
      this.admininfo.a_Birthday = val;
    },
    //获取详情
    getAdminDetail() {
      let v = this;
      let param = new URLSearchParams();
      param.append("UserID", this.admininfo.ID);
      this.$AdminAPI.ShowAdmin(param, function(data) {
        if (data.Code == 1) {
          v.admininfo = data.Result;
        }
      });
    },
    //添加
    addadminhandle() {
      var v = this;
      if (!this.admininfo.a_UserName) {
        this.$message.warning("请填写用户名!");
        return;
      }
      if (!this.$utils.checkUsername(this.admininfo.a_UserName)) {
        this.$message.warning("用户名格式不正确!");
        return;
      }

      if (!this.admininfo.a_RealName) {
        this.$message.warning("请填写姓名!");
        return;
      }
      if (this.admininfo.a_Telphone) {
        if (!this.$utils.telNomber(this.admininfo.a_Telphone)) {
          this.$message.warning("手机号码格式不正确!");
          return;
        }
      }
      if (this.admininfo.a_Email) {
        if (!this.$utils.Email(this.admininfo.a_Email)) {
          this.$message.warning("邮箱格式不正确!");
          return;
        }
      }

      let param = new URLSearchParams();
      param.append("ID", this.admininfo.ID);
      param.append("a_UserName", this.admininfo.a_UserName);

      param.append("a_RealName", this.admininfo.a_RealName);
      param.append("a_Birthday", this.admininfo.a_Birthday);
      param.append("a_Sex", this.admininfo.a_Sex);
      param.append("a_Telphone", this.admininfo.a_Telphone);
      param.append("a_Email", this.admininfo.a_Email);
      param.append("a_Produce", this.admininfo.a_Produce);
      param.append("a_CreateTime", this.admininfo.a_CreateTime);
      param.append("a_RoleID", this.admininfo.a_RoleID);
      this.$AdminAPI.AddAdmin(param, function(data) {
        if (data.Code == 1) {
          v.$message.success("修改成功!");
        } else {
          v.$message.error("修改失败!" + data.Msg);
        }
      });
    },
    //修改
    uppass() {}
  },
  mounted() {}
};
</script>
<style scoped>
@import "../../../static/css/pcenter.css";
@import "../../../static/css/common.css";
.formPage .tittop li {
  font-size: 20px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
}
.blue {
  background: #006fe5;
  color: #fff;
}
.white {
  background: #fff;
  color: #006fe5;
}
</style>
