<template>
  <div class="formPage">
    <!-- 内容主体区域 -->
    <div class="pageTille">管理员信息</div>
    <div class="inputBox">
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">用户名：</label>
          <div class="inputData">
            <el-input
              v-model="admininfo.a_UserName"
              placeholder="请输入5到20位字母、数字、下划线"
              :disabled="!btnvisible"
              btnvisible
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">真实姓名：</label>
          <div class="inputData">
            <el-input
              v-model="admininfo.a_RealName"
              placeholder="请输入真实姓名"
              :disabled="!btnvisible"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">性 别：</label>
          <div class="inputData">
            <!-- <el-input v-model="admininfo.a_Sex"></el-input> -->
            <el-select
              :disabled="!btnvisible"
              v-model="admininfo.a_Sex"
              :style="{
                width: '100%',
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
        <el-col :span="8">
          <label class="inputLabel">出生年月：</label>
          <div class="inputData">
            <el-date-picker
              v-model="admininfo.a_Birthday"
              :disabled="!btnvisible"
              type="date"
              @change="selectTime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              style="width: 100%"
            >
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <el-col :span="8">
          <label class="inputLabel">电 话：</label>
          <div class="inputData">
            <el-input
              :disabled="!btnvisible"
              v-model="admininfo.a_Telphone"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <label class="inputLabel">邮 箱：</label>
          <div class="inputData">
            <el-input
              :disabled="!btnvisible"
              v-model="admininfo.a_Email"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="mtop15">
        <el-col :span="16">
          <label class="inputLabel">个人简介：</label>
          <div class="inputData">
            <el-input
              placeholder="请输入内容"
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
      optionsSex: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
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
        a_RoleID: "",
        a_Extend: "",
      },
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
        // let param = new URLSearchParams();
        // v.$SystemAPI.getSystem(param, function (data) {
        //   if (data.Code == 1) {
        //     let extend = JSON.parse(x.admininfo.a_Extend);
        //     if(extend==null)
        //     {
        //      extend=[]
        //     }
        //     data.Result.forEach((item) => {
        //        let fieldValue=""
        //       for (let i = 0; i < extend.length; i++) {
        //         if (extend[i].fieldID == item.ID) {
        //            fieldValue=extend[i].fieldValue
        //         }
        //       }
        //       x.fieldList.push({
        //            id: item.ID,
        //            e_FiledName: item.e_FiledName,
        //            e_Types: item.e_Types,
        //            e_OptionInfo: JSON.parse(item.e_OptionInfo),
        //            fieldValue:fieldValue
        //          });
        //     });
        //   }
        // });
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
</style>
