<template>
  <div class="formPage">
    <div class="pageTille">
      创建管理员
    </div>
    <div class="inputBox">
      <p class="notice">*为必填信息</p>
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
          <label class="inputLabel">*密码：</label>
          <div class="inputData">
            <el-input
              v-model="admininfo.a_Password"
              placeholder="请输入密码"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">*真实姓名：</label>
          <div class="inputData">
            <el-input
              v-model="admininfo.a_RealName"
              placeholder="请输入真实姓名"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">性 别：</label>
          <div class="inputData">
            <el-input v-model="admininfo.a_Sex"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
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
        <el-col :span="8">
          <label class="inputLabel">电 话：</label>
          <div class="inputData">
            <el-input v-model="admininfo.a_Telphone"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
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
          <el-button type="primary" @click="addadminhandle" class="InputBtn">
            确定
          </el-button>
          <el-button type="success" @click="goback" class="InputBtn">
            返回
          </el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "addadmin",
  data() {
    return {
      fieldList: [],
      extendList: [],
      admininfo: {
        ID: "",
        a_UserName: "",
        a_Password: "",
        a_RealName: "",
        a_Birthday: "",
        a_Sex: "",
        a_Telphone: "",
        a_Email: "",
        a_Produce: "",
        a_CreateTime: null,
        a_RoleID: "", //此处的角色id是当前登录用户的下一级的角色，但是目前还没有根数据库进行关联，这里要注意
        a_AdminID: "",
        a_Authorization: "",
        a_Extend: ""
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      }
    };
  },
  mounted() {
    this.admininfo.a_RoleID = parseInt(this.$store.state.userinfo.a_RoleID) + 1;
    this.admininfo.a_AdminID = this.$store.state.userinfo.ID;
    if (this.$store.state.userinfo.a_Authorization === null) {
      this.admininfo.a_Authorization = this.$store.state.userinfo.ID;
    } else {
      this.admininfo.a_Authorization =
        this.$store.state.userinfo.a_Authorization +
        "," +
        this.$store.state.userinfo.ID;
    }
    //   let v=this
    // let param = new URLSearchParams();
    // this.$SystemAPI.getSystem(param, function (data) {
    //   if (data.Code == 1) {
    //     data.Result.forEach((item) => {
    //        let fieldValue=""
    //       v.fieldList.push({
    //            id: item.ID,
    //            e_FiledName: item.e_FiledName,
    //            e_Types: item.e_Types,
    //            e_OptionInfo: JSON.parse(item.e_OptionInfo),
    //            fieldValue:fieldValue
    //          });
    //     });
    //   }
    // });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    //取值
    selectTime(val) {
      this.admininfo.a_Birthday = val;
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
      if (!this.admininfo.a_Password) {
        this.$message.warning("请填写密码!");
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
      //  let u_Extend=[];
      //   this.fieldList.forEach(item=>{
      //      u_Extend.push({
      //        fieldID:item.id,
      //        fieldValue:item.fieldValue
      //      })
      //   })
      // this.admininfo.a_Extend=JSON.stringify(u_Extend)
      let param = new URLSearchParams();
      param.append("ID", this.admininfo.ID);
      param.append("a_UserName", this.admininfo.a_UserName);
      param.append("a_Password", this.admininfo.a_Password);
      param.append("a_RealName", this.admininfo.a_RealName);
      param.append("a_Birthday", this.admininfo.a_Birthday);
      param.append("a_Sex", this.admininfo.a_Sex);
      param.append("a_Telphone", this.admininfo.a_Telphone);
      param.append("a_Email", this.admininfo.a_Email);
      param.append("a_Produce", this.admininfo.a_Produce);
      param.append("a_CreateTime", this.admininfo.a_CreateTime);
      param.append("a_RoleID", this.admininfo.a_RoleID);
      param.append("a_AdminID", this.admininfo.a_AdminID);
      param.append("a_Authorization", this.admininfo.a_Authorization);
      // param.append('a_Extend',this.admininfo.a_Extend)
      this.$AdminAPI.AddAdmin(param, function(data) {
        if (data.Code == 1) {
          v.$set(v.admininfo, "ID", "");
          v.$set(v.admininfo, "a_UserName", "");
          v.$set(v.admininfo, "a_Password", "");
          v.$set(v.admininfo, "a_RealName", "");
          v.$set(v.admininfo, "a_Birthday", "");
          v.$set(v.admininfo, "a_Sex", "");
          v.$set(v.admininfo, "a_Telphone", "");
          v.$set(v.admininfo, "a_Email", "");
          v.$set(v.admininfo, "a_Produce", "");
          v.$set(v.admininfo, "a_RoleID", "");
          // v.fieldList.forEach(item=>{
          //   item.fieldValue=""
          // })
          v.$message.success("添加成功!");
        } else {
          v.$message.error("添加失败!" + data.Msg);
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../../../static/css/pcenter.css";
@import "../../../static/css/common.css";
</style>
