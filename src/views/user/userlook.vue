<template>
  <div>
    <!-- 内容主体区域 -->
    <ul class="tittop">
      <li style="width: 100%;color: blue;">创建用户</li>
    </ul>
    <ul class="mycenters" style="display: flex;">
      <li>
        <p style="width: 90%;color: red;padding-left: 2%;">*为必填信息</p>
        <p>
          <label>*用户名：</label>
          <label class="lab-right" style="width:200px">
            <el-input v-model="user.u_UserName"></el-input>
          </label>
        </p>
        <p>
          <label>*真实姓名：</label>
          <label class="lab-right" style="width:200px">
            <el-input v-model="user.u_RealName"></el-input>
          </label>
        </p>
        <p>
          <label>性 别：</label>
          <label class="lab-right" style="width:200px">
            <el-input v-model="user.u_Sex"></el-input>
          </label>
        </p>
        <p>
          <label>教育水平：</label>
          <label class="lab-right" style="width:200px">
            <el-select v-model="user.u_Education" style="width: 100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </label>
        </p>
        <p>
          <label>出生年月：</label>
          <label class="lab-right" style="width:200px">
            <el-date-picker
              v-model="user.u_Birth"
              type="date"
              @change="selectTime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
            ></el-date-picker>
          </label>
        </p>
        <p v-for="(filed,idx) in fieldList" :key="idx">
          <label>{{filed.e_FiledName}}：</label>
          <label class="lab-right" style="width:200px">
            <el-input v-model="filed.fieldValue"  v-if="filed.e_Types=='1'"></el-input>
            <el-select v-model="filed.fieldValue" v-if="filed.e_Types=='2'" style="width: 100%;">
              <el-option
                v-for="item in filed.e_OptionInfo"
                :key="item.index"
                :value="item.option"
                 :label="item.option"
              ></el-option>
            </el-select>
          </label>
        </p>
        <p class="resume" style="display:flex;justify-content: flex-start;"></p>
      </li>
    </ul>
    <div style="text-align: center;">
      <button
        type="button"
        v-show="btnvisible"
        @click.stop="adduserhandle"
        class="layui-btn layui-btn-normal"
      >确定</button>
      <button
        type="button"
        @click="$router.go(-1)"
        style="background: #9571f9;"
        class="layui-btn"
      >返回</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "userlook",
  data() {
    return {
      fieldList: [],
      extendList: [],
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
        u_Extend: "",
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      options: [
        {
          value: 0,
          label: "小学",
        },
        {
          value: 1,
          label: "中学",
        },
        {
          value: 2,
          label: "大学及以上",
        },
      ],
      btnvisible: false,
    };
  },
  methods: {
    //取值
    selectTime(val) {
      this.user.u_Birth = val;
    },
    getDetail() {
      let v = this;
      let x=this;
      let param = new URLSearchParams();
      param.append("UserID", this.user.ID);
      this.$UserAPI.GetUserDetail(param, function (data) {
        if (data.Code == 1) {
          v.user = data.Result;
        }
        let param = new URLSearchParams();
        v.$SystemAPI.getSystem(param, function (data) {
          if (data.Code == 1) {
            let extend = JSON.parse(x.user.u_Extend);
             if(extend==null)
            {
             extend=[]
            }
            data.Result.forEach((item) => {
               let fieldValue=""
              for (let i = 0; i < extend.length; i++) {
                if (extend[i].fieldID == item.ID) {
                   fieldValue=extend[i].fieldValue
                }
              }
              x.fieldList.push({
                   id: item.ID,
                   e_FiledName: item.e_FiledName,
                   e_Types: item.e_Types,
                   e_OptionInfo: JSON.parse(item.e_OptionInfo),
                   fieldValue:fieldValue
                 });
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
      if (!this.user.u_RealName) {
        this.$message.warning("请填写姓名!");
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
      let u_Extend=[];
      this.fieldList.forEach(item=>{
         u_Extend.push({
           fieldID:item.id,
           fieldValue:item.fieldValue
         })
      })
      let param = new URLSearchParams();
      param.append("u_UserName", this.user.u_UserName);
      param.append("ID", this.user.ID);
      param.append("u_RealName", this.user.u_RealName);
      param.append("u_Sex", this.user.u_Sex);
      param.append("u_Education", this.user.u_Education);
      param.append("u_Birth", this.user.u_Birth);
      param.append("u_Extend",JSON.stringify(u_Extend))
      this.$UserAPI.EditUser(param, function (data) {
        if (data.Code == 1) {
          v.$set(v.user, "u_UserName", "");

          v.$set(v.user, "u_RealName", "");
          v.$set(v.user, "u_Sex", "");
          v.$set(v.user, "u_Education", "");
          v.$set(v.user, "u_Birth", "");
          v.fieldList.forEach(item=>{
           item.fieldValue=""
          })
          v.$message.success("修改成功!");
        } else {
          v.$message.error("创建失败!" + data.Msg);
        }
      });
    },
  },
  mounted() {
    this.user.ID = this.$route.query.ID;
    this.btnvisible = this.$route.query.issave;
    this.getDetail();
  },
};
</script>

<style scoped>
@import "../../../static/css/pcenter.css";
/deep/ .el-input__inner,
.el-input {
  width: 100%;
  height: 56px;
}
.lab-right {
  width: 300px;
}
</style>
