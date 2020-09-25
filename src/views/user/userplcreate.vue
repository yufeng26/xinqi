<template>
    <div>
      <!-- 内容主体区域 -->
      <ul class="tittop">
        <li style="width: 100%;color: blue;">批量创建</li>
      </ul>
      <ul class="mycenters">
        <li style="display: block;">
          <p style="width: 90%;color: red;padding-left: 2%;">*为必填信息</p>
          <p>
            <label>*固定标识：</label>
            <el-input v-model="plcreateruser.Headstr"> </el-input>

            <span style="color:red;font-size: 16px;">四位字母，如：alph</span>
          </p>
          <p>
            <label>*用户数量：</label>

            <el-input v-model="plcreateruser.Count"></el-input>
          </p>
          <p>
            <label>*初始密码：</label>
           <el-input v-model="plcreateruser.Password"></el-input>
          </p>
          <p class="resume">
            <button type="button" @click="plcreateuser" class="layui-btn layui-btn-normal">确定</button>
            <button type="button" @click="$router.go(-1)" style="background: #9571f9;" class="layui-btn">返回</button>

          </p>

        </li>
      </ul>

    </div>
</template>

<script>
    export default {
        name: "userplcreate",
      data(){
          return {
            plcreateruser:{
              Headstr:"",
              Count:"",
              Password:"",
              Groupid:""
            }
          }
      },
      mounted(){
          this.plcreateruser.Groupid=this.$route.query.GroupID;
      },
      methods:{
      plcreateuser(){
        var v=this;
        if (!this.plcreateruser.Headstr){
          this.$message.warning('请填写固定标识!');
          return;
        }

        if (!this.plcreateruser.Count){
          this.$message.warning('请填写数量!');
          return;
        }
        if (!this.plcreateruser.Password) {
          this.$message.warning('请填写密码!');
          return;
        }



        let param = new URLSearchParams();
        param.append('Headstr',this.plcreateruser.Headstr)
        param.append('Count',this.plcreateruser.Count)
        param.append('Password',this.plcreateruser.Password)
        param.append('Groupid',this.plcreateruser.Groupid)


        this.$UserAPI.PLCreateUser(param,function(data){

          if (data.Code==1) {

            v.$set(v.user,'u_UserName','')
            v.$set(v.user,'u_Password','')
            v.$set(v.user,'u_RealName','')
            v.$set(v.user,'u_Sex','')

            v.$message.success('创建成功!');



          }else {
            v.$message.error('创建失败!'+data.Msg
            );
          }
        });
      }
      }
    }
</script>
<style>
  .mycenters li p{
    width: 45%;
    padding-left: 2%;
  }
  .mycenters li p input{
    width: 60%;
  }
  .mycenters li p a{
    color: #0070E5;
    border-bottom: 1px solid #0070E5;
  }
  .files{
    width:30%;
    border: 1px solid #0070E5;
    display: flex;
    height: 40px;
    position: relative;
  }
  .files span{
    display: inline-block;
  }
  .files span:nth-child(1){
    width: 65%;
    text-align: center;
    line-height: 40px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .files span:nth-child(2){
    text-align: center;
    width: 35%;
    background: #0070E5;
    line-height: 40px;
    color: #fff;
  }
  .files input{
    position: absolute;
    right: 0;
    width: 45%;
    height: 40px;
    opacity: 0;
    z-index: 666;
  }
  #deltwo{
    width:20%;
    height: 272px;
    background: #FFFFFF;
    border-radius: 5px;
    position: fixed;
    top:35%;
    left: 50%;
    box-shadow: 3px 3px 3px #CCCCCC;
    border: 1px solid #F2F2F2;
    display: none;
  }
  #deltwo .deltit{
    height: 40px;
    font-size: 18px;
    color: #fff;
    background: #0070e5;
    text-align: center;
    line-height: 40px;
    margin-bottom: 34px;
  }
  #deltwo p{
    width: 100%;
    padding-bottom: 15px;
    text-align: center;
  }
  #del{
    width:20%;
    background: #FFFFFF;
    border-radius: 5px;
    position: fixed;
    top:35%;
    left: 50%;
    box-shadow: 3px 3px 3px #CCCCCC;
    border: 1px solid #F2F2F2;
    display: none;
  }
  #del .deltit{
    height: 40px;
    font-size: 18px;
    color: #fff;
    background: #0070e5;
    text-align: center;
    line-height: 40px;
    margin-bottom: 34px;
  }
  #del p{
    width: 100%;
    margin: 15px 0;
    text-align: center;
    font-size: 18px;
    color: #555;
  }
  #del .resume{
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding-bottom:20px;
  }
  #del .resume button{
    width: 30%;
    font-size: 16px;
  }
</style>
<style scoped>
  @import "../../../static/css/pcenter.css";
  /deep/ .el-input__inner   {
    width: 75%;
    height: 56px;

  }
</style>
