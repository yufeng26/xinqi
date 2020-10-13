<template>
  <div class="formPage">
    <!-- 内容主体区域 -->
    <div class="pageTille">基本信息</div>
    <table class="baseTable" border="1">
      <tr>
        <td>用户名：<span>用户名</span></td>
        <td>分组：<span>分组</span></td>
        <td>真实姓名：<span>真实姓名</span></td>
      </tr>
      <tr>
        <td>当前受教水平：<span>当前受教水平</span></td>
        <td>性别：<span>性别</span></td>
        <td>出生年月：<span>出生年月</span></td>
      </tr>
    </table>
    <div class="pageTille">预约记录</div>
    <div class="inputBox yulueBox">
      <el-row class="mtop15">
        <el-row>
          <el-col :span="12">
            <label class="inputLabel">*预约咨询师：</label>
            <div class="inputData">
              <el-input
                v-model="admininfo.a_UserName"
                placeholder="请输入预约咨询师"
                :disabled="!btnvisible"
                btnvisible
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="inputLabel">*预约时间：</label>
            <div class="inputData">
              <el-input
                v-model="admininfo.a_RealName"
                placeholder="请输入预约时间"
                :disabled="!btnvisible"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="inputLabel">咨询室电话：</label>
            <div class="inputData">
              <el-input
                :disabled="!btnvisible"
                v-model="admininfo.a_Telphone"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="inputLabel">咨询室地点：</label>
            <div class="inputData">
              <el-input
                placeholder="请输入咨询室地点"
                :disabled="!btnvisible"
                v-model="admininfo.a_Produce"
                show-word-limit
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="inputLabel">咨询问题：</label>
            <div class="inputData">
              <el-input
                placeholder="请输入咨询问题内容"
                :disabled="!btnvisible"
                v-model="admininfo.a_Produce"
                show-word-limit
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="inputLabel">问题描述：</label>
            <div class="inputData">
              <el-input
                placeholder="请输入描述内容"
                :disabled="!btnvisible"
                v-model="admininfo.a_Produce"
                type="textarea"
                rows="4"
                maxlength="300"
                show-word-limit
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="mtop15">
        <div class="btnGroup">
          <el-button
            v-if="btnvisible"
            type="primary"
            @click="addadminhandle"
            class="InputBtn"
          >
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
  name: "adminlook",
  data() {
    return {
      fieldList: [],
      extendList: [],
      admininfo: {},
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      btnvisible: false,
    };
  },
  mounted() {
    this.admininfo.ID = this.$route.query.ID;
    this.btnvisible = this.$route.query.issave;
    this.getAdminDetail();
  },

  methods: {
    goback() {
      this.$router.go(-1);
    },
    //取值
    selectTime(val) {
      console.log(val);
      this.admininfo.a_Birthday = val;
    },
    getAdminDetail() {
      let v = this;
      let x = this;
      let param = new URLSearchParams();
      param.append("UserID", this.admininfo.ID);
      this.$AdminAPI.ShowAdmin(param, function (data) {
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
      // if(!this.admininfo.a_Sex)
      // {
      //    this.$message.warning('性别不能为空!');
      //    return;
      // }
      if (this.admininfo.a_Sex == null) {
        this.admininfo.a_Sex = "";
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
      // this.fieldList.forEach(item=>{
      //    u_Extend.push({
      //      fieldID:item.id,
      //      fieldValue:item.fieldValue
      //    })
      // })
      // this.admininfo.a_Extend=JSON.stringify(u_Extend)
      // console.log(this.admininfo)
      // let param = new URLSearchParams();
      // param.append('ID',this.admininfo.ID)
      // param.append('a_UserName',this.admininfo.a_UserName)

      // param.append('a_RealName',this.admininfo.a_RealName)
      // param.append('a_Birthday',this.admininfo.a_Birthday)
      // param.append('a_Sex',this.admininfo.a_Sex)
      // param.append('a_Telphone',this.admininfo.a_Telphone)
      // param.append('a_Email',this.admininfo.a_Email)
      // param.append('a_Produce',this.admininfo.a_Produce)
      // param.append('a_CreateTime',this.admininfo.a_CreateTime)
      // param.append('a_RoleID',this.admininfo.a_RoleID)
      this.$AdminAPI.AddAdmin(this.admininfo, function (data) {
        if (data.Code == 1) {
          v.$message.success("修改成功!");
          v.$router.go(-1);
        } else {
          v.$message.error("修改失败!" + data.Msg);
        }
      });
    },
  },
};
</script>

<style scoped>
@import "../../../static/css/pcenter.css";
@import "../../../static/css/common.css";
.baseTable {
  width: 95%;
  margin: 10px auto;
  height: 60px;
  border: 1px solid #ddd;
}
.baseTable tr {
  height: 48px;
}
.baseTable tr td {
  font-size: 14px;
  height: 32px;
}
.formPage .inputBox .inputLabel {
  width: 140px;
}
.yulueBox .el-col {
  margin: 10px 0px;
}
</style>
