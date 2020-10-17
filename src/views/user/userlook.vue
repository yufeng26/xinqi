<template>
  <!-- 内容主体区域 -->
  <div class="formPage">
    <div class="pageTille">用户信息</div>
    <div class="inputBox">
      <p class="notice">*为必填信息</p>
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">用户名：</label>
          <div class="inputData">
            <el-input
              @input="userChange"
              :disabled="!btnvisible"
              v-model="user.u_UserName"
              placeholder="请输入5到20位字母、数字、下划线"
            ></el-input>
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <label class="inputLabel">密码：</label>
          <div class="inputData">
            <el-input
              disabled
              v-model="user.u_Password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </div>
        </el-col> -->
      </el-row>
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">真实姓名：</label>
          <div class="inputData">
            <el-input
              :disabled="!btnvisible"
              v-model="user.u_RealName"
              placeholder="请输入真实姓名"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">性 别：</label>
          <div class="inputData">
            <!-- <el-input v-model="user.u_Sex"></el-input> -->
            <el-select
              :disabled="!btnvisible"
              v-model="user.u_Sex"
              :style="{
                width: '100%'
              }"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsSex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">教育水平：</label>
          <div class="inputData">
            <el-select
              :disabled="!btnvisible"
              style="width: 100%"
              v-model="user.u_Education"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">出生年月：</label>
          <div class="inputData">
            <el-date-picker
              :disabled="!btnvisible"
              style="width: 100%"
              v-model="user.u_Birth"
              type="date"
              @change="selectTime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15" v-if="fieldList.length > 0">
        <el-col :span="8" v-for="item in fieldList" v-bind:key="item.id">
          <label class="inputLabel">{{ item.e_FiledName }}：</label>
          <div class="inputData">
            <el-input
              :disabled="!btnvisible"
              v-model="item.fieldValue"
              v-if="item.e_Types == '1'"
              placeholder="请输入信息"
            ></el-input>
            <el-select
              :disabled="!btnvisible"
              v-model="item.fieldValue"
              v-if="item.e_Types == '2'"
            >
              <el-option
                v-for="a in item.e_OptionInfo"
                :key="a.index"
                :value="a.option"
                :label="a.option"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <div class="btnGroup">
          <el-button
            type="primary"
            v-show="btnvisible"
            @click.stop="adduserhandle"
            class="InputBtn"
          >
            确定
          </el-button>
          <el-button type="success" @click="$router.go(-1)" class="InputBtn">
            返回
          </el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "userlook",
  data() {
    return {
      fieldList: [], // 拓展字段
      extendList: [],
      optionsSex: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      user: {
        ID: "",
        u_RealName: "",
        u_Sex: "",
        u_Birth: "",
        u_Education: "",
        u_GroupID: "",
        u_openid: "",
        u_UserName: "",
        u_Password: "",
        u_CreateTime: "",

        u_BloodType: "",
        u_Height: 0,
        u_Weight: 0,
        u_Email: "",
        u_Extend: ""
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      options: [
        {
          value: 0,
          label: "小学"
        },
        {
          value: 1,
          label: "中学"
        },
        {
          value: 2,
          label: "大学及以上"
        }
      ],
      btnvisible: false
    };
  },
  methods: {
    // 用户修改
    userChange: _.throttle(function(e) {
      console.log("e", e);
      let param = new URLSearchParams();
      let v = this;
      param.append("userName", e);
      this.$UserAPI.deUser(param, function(data) {
        if (data.Code !== 1) {
          v.$message.warning("用户名已存在!");
        }
      });
    }, 3000),
    //取值
    selectTime(val) {
      this.user.u_Birth = val;
    },
    getDetail() {
      let v = this;
      let x = this;
      let param = new URLSearchParams();
      param.append("UserID", this.user.ID);
      this.$UserAPI.GetUserDetail(param, function(data) {
        if (data.Code == 1) {
          v.user = data.Result;
        }
        let param = new URLSearchParams();
        v.$SystemAPI.getSystem(param, function(data) {
          if (data.Code == 1) {
            let extend = JSON.parse(x.user.u_Extend);
            if (extend == null) {
              extend = [];
            }
            data.Result.forEach(item => {
              let fieldValue = "";
              for (let i = 0; i < extend.length; i++) {
                if (extend[i].fieldID == item.ID) {
                  fieldValue = extend[i].fieldValue;
                }
              }
              x.fieldList.push({
                id: item.ID,
                e_FiledName: item.e_FiledName,
                e_Types: item.e_Types,
                e_OptionInfo: JSON.parse(item.e_OptionInfo),
                fieldValue: fieldValue
              });
              console.log(x.fieldList);
            });
          }
        });
      });
    },
    //添加
    adduserhandle() {
      var v = this;
      if (!this.user.u_UserName) {
        this.$message.warning("请填写用户名!");
        return;
      }
      if (!this.$utils.checkUsername(this.user.u_UserName)) {
        this.$message.warning("用户名格式不正确!");
        return;
      }
      if (!this.user.u_Password) {
        this.$message.warning("请填写密码!");
        return;
      }
      // if (!this.$utils.checkPassword(this.user.u_Password)) {
      //   this.$message.warning("密码格式不正确!");
      //   return;
      // }
      if (!this.user.u_RealName) {
        this.$message.warning("请填写真实姓名!");
        return;
      }
      if (!this.user.u_Sex) {
        this.$message.warning("请填写性别!");
        return;
      }
      if (this.user.u_Sex.length > 1) {
        this.$message.warning("性别格式不正确!");
        return;
      }

      if (this.user.u_Education < 0) {
        this.$message.warning("请选择受教育水平!");
        return;
      }
      if (!this.user.u_Birth) {
        this.$message.warning("请选择出生年月!");
        return;
      }
      let u_Extend = [];
      this.fieldList.forEach(item => {
        u_Extend.push({
          fieldID: item.id,
          fieldValue: item.fieldValue
        });
      });
      let param = new URLSearchParams();
      param.append("u_UserName", this.user.u_UserName);
      param.append("ID", this.user.ID);
      param.append("u_RealName", this.user.u_RealName);
      param.append("u_Sex", this.user.u_Sex);
      param.append("u_Education", this.user.u_Education);
      param.append("u_Birth", this.user.u_Birth);
      param.append("u_Extend", JSON.stringify(u_Extend));
      this.$UserAPI.EditUser(param, function(data) {
        if (data.Code == 1) {
          v.$set(v.user, "u_UserName", "");
          v.$set(v.user, "u_RealName", "");
          v.$set(v.user, "u_Sex", "");
          v.$set(v.user, "u_Education", "");
          v.$set(v.user, "u_Birth", "");
          v.fieldList.forEach(item => {
            item.fieldValue = "";
          });
          v.$message.success("修改成功!");
          v.$router.go(-1);
        } else {
          v.$message.error("修改失败!" + data.Msg);
        }
      });
    }
  },
  mounted() {
    this.user.ID = this.$route.query.ID;
    this.btnvisible = this.$route.query.issave;
    this.getDetail();
  }
};
</script>

<style scoped>
@import "../../../static/css/pcenter.css";
@import "../../../static/css/common.css";
</style>
