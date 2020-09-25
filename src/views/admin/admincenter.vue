<template>
  <div>
    <!-- 内容主体区域 -->
    <ul class="tittop">
      <li v-for="(item,index) in navlist" :class="changeRed==index?'blue':'white'"  @click="reds(index)">{{item.text}}</li>

    </ul>
    <ul  class="mycenters">
      <li v-if="changeRed==0" >
        <p>
          <label>*用户名：</label>
          <el-input v-model="admininfo.a_UserName"></el-input>
        </p>
        <p>
          <label>*真实姓名：</label>
          <el-input v-model="admininfo.a_RealName"></el-input>
        </p>
        <p>
          <label>性  别：</label>
          <el-input v-model="admininfo.a_Sex"></el-input>
        </p>
        <p style="display:flex;justify-content: flex-start;">
          <label>出生年月：</label>
          <el-date-picker

            style="height: 56px;width: 75%;margin-left:90px;"
            v-model="admininfo.a_Birthday"
            type="date"
            @change="selectTime"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
        </p>
        <p>
          <label>电  话：</label>
          <el-input v-model="admininfo.a_Telphone"></el-input>
        </p>
        <p>
          <label>邮  箱：</label>
          <el-input v-model="admininfo.a_Email"></el-input>
        </p>
        <p class="resume" style="display:flex;justify-content: flex-start;margin-left: 20px;">
          <label>个人简介：</label>
          <el-input v-model="admininfo.a_Produce" style="width: 75%;margin-left: 60px;" type="textarea" rows="4"  ></el-input>
        </p>
        <p class="resume" style="display:flex;justify-content: flex-start;">
          <button type="button" @click="addadminhandle()" class="layui-btn layui-btn-normal">确定</button>
          <button type="button" @click="router.go(-1)" style="background: #9571f9;" class="layui-btn">返回</button>
        </p>

      </li>
      <li v-if="changeRed==1" >
        <p>
          <label>*新密码：</label>
          <el-input type="password" v-model="admininfo.a_Password" ></el-input>
        </p>
        <p>
          <label>*确认密码：</label>
          <el-input type="password" v-model="admininfo.a_Password"></el-input>
        </p>
        <p class="resume" style="display:flex;justify-content: flex-start;">
          <button type="button" @click="admininfo()" class="layui-btn layui-btn-normal">确定</button>
          <button type="button" @click="router.go(-1)" style="background: #9571f9;" class="layui-btn">返回</button>
        </p>
      </li>
    </ul>
  </div>

</template>

<script>
    export default {
        name: "usercenter",
      data(){
          return {
            admininfo:{
              ID:this.$store.state.userinfo.ID,
              a_UserName:"",
              a_Password:"",
              a_RealName:"",
              a_Birthday:"",
              a_Sex:"",
              a_Telphone:"",
              a_Email:"",
              a_Produce:"",
              a_CreateTime:null,
              a_RoleID:"00df5597ba4e11e99a4f00cfe04d1a01"
            },
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() > Date.now() - 8.64e6
              }
            },

            navlist:[
              {text:"个人资料"},
              {text:"修改密码"}
            ],
            changeRed:0
          }
      },
      methods:{
        reds:function(index){

          this.changeRed = index;
        },
        selectTime(val){

          this.admininfo.a_Birthday=val;
        },
        //获取详情
        getAdminDetail()
        { let v =this;
          let param = new URLSearchParams();
          param.append('UserID', this.admininfo.ID);
          this.$AdminAPI.ShowAdmin(param,function(data){
            if (data.Code==1) {


              v.admininfo=data.Result;

            }
          })

        },
        //添加
        addadminhandle(){
          var v=this;
          if (!this.admininfo.a_UserName){
            this.$message.warning('请填写用户名!');
            return;
          }
          if (!this.$utils.checkUsername(this.admininfo.a_UserName)){
            this.$message.warning('用户名格式不正确!');
            return;
          }

          if (!this.admininfo.a_RealName) {
            this.$message.warning('请填写姓名!');
            return;
          }
          if (this.admininfo.a_Telphone){
            if (!this.$utils.telNomber(this.admininfo.a_Telphone)){
              this.$message.warning('手机号码格式不正确!');
              return;
            }
          }
          if (this.admininfo.a_Email){
            if (!this.$utils.Email(this.admininfo.a_Email)){
              this.$message.warning('邮箱格式不正确!');
              return;
            }
          }

          let param = new URLSearchParams();
          param.append('ID',this.admininfo.ID)
          param.append('a_UserName',this.admininfo.a_UserName)

          param.append('a_RealName',this.admininfo.a_RealName)
          param.append('a_Birthday',this.admininfo.a_Birthday)
          param.append('a_Sex',this.admininfo.a_Sex)
          param.append('a_Telphone',this.admininfo.a_Telphone)
          param.append('a_Email',this.admininfo.a_Email)
          param.append('a_Produce',this.admininfo.a_Produce)
          param.append('a_CreateTime',this.admininfo.a_CreateTime)
          param.append('a_RoleID',this.admininfo.a_RoleID)
          this.$AdminAPI.AddAdmin(param,function(data){

            if (data.Code==1) {


              v.$message.success('修改成功!');



            }else {
              v.$message.error('修改失败!'+data.Msg
              );
            }
          });



        },
        //修改
        uppass(){

        }
      },
      mounted(){

      }
    }
</script>

<style scoped>

  @import "../../../static/css/pcenter.css";
  /deep/ .el-input__inner,.el-input   {
    width: 75%;
    height: 56px;


  }
  .blue {
    background: #006fe5;
    color: #fff;
  }
  .white {
    background: #fff;
    color:#006fe5;
  }
</style>
