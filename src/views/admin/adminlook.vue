<template>
  <div>
    <!-- 内容主体区域 -->
    <ul class="tittop">
    <li style="width: 100%;color:blue;">个人资料</li>
    </ul>
    <ul class="mycenters"  style="display: flex;">
      <li>
        <p style="width: 90%;color: red;padding-left: 2%;">*为必填信息</p>
        <p>
          <label>*用户名：</label>
          <label class="lab-right" style="width:200px">
          <el-input v-model="admininfo.a_UserName"></el-input>
          </label>
        </p>
        <p>
          <label>*真实姓名：</label>
           <label class="lab-right" style="width:200px">
          <el-input v-model="admininfo.a_RealName"></el-input>
           </label>
        </p>
        <p>
          <label>性 别：</label>
            <label class="lab-right" style="width:200px">
          <el-input v-model="admininfo.a_Sex"></el-input>
            </label>
        </p>
        <p>
          <label>出生年月：</label>
            <label class="lab-right" style="width:200px">
          <el-date-picker
            v-model="admininfo.a_Birthday"
            type="date"
            @change="selectTime"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
            </el-date-picker>
            </label>
        </p>
        <p>
          <label>电 话：</label>
           <label class="lab-right" style="width:200px">
          <el-input v-model="admininfo.a_Telphone"></el-input>
           </label>
        </p>
        <p>
          <label>邮 箱：</label>
           <label class="lab-right" style="width:200px">
          <el-input v-model="admininfo.a_Email"></el-input>
           </label>
        </p>
        
          <!-- <p v-for="(filed,idx) in fieldList" :key="idx">
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
        </p> -->
        
        <p>
           <label>个人简介：</label>
           <label class="lab-right" style="width:200px">
          <el-input
            v-model="admininfo.a_Produce"
            type="textarea"
            rows="4"
          ></el-input>
           </label>
        </p>
         <p class="resume" style="display:flex;justify-content: flex-start;"></p>
      </li>
    </ul>
    <div style="text-align: center;">
             <button
            @click="addadminhandle"
            v-if="btnvisible"
            type="button"
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
  name: "adminlook",
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
    //取值
    selectTime(val) {
      console.log(val);
      this.admininfo.a_Birthday = val;
    },
    getAdminDetail() {
      let v = this;
      let x=this;
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
/deep/ .el-input__inner,
.el-input {
  width: 100%;
  height: 56px;
}
.lab-right {
  width: 300px;
}
</style>
