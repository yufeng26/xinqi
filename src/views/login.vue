<template>
  <div class="box">
    <div class="boxtop">
      <img src="../../static/img/心企物联网云平台.png" />
    </div>
    <div class="boxbottom">
      <div class="logins">
        <ul class="logincount">

          <li style="color: #007FE1;font-weight: 600;font-size: 24px;margin: 6% 0;">管理员登录</li>
          <li class="zh"><img src="../../static/img/账号.png" />账号<input v-model="loginmodel.UserName" type="text" name="" /></li>
          <li class="pwd"><img src="../../static/img/密码.png" />密码<input @keyup.enter.native.prevent="handlelogin()" v-model="loginmodel.Password" type="password" name="" /></li>
          <li><button class="btn" @click="handlelogin()" type="button">登录</button></li>
          <li class="logfooter">
            <p><input type="checkbox" v-model="loginmodel.IsCheck" name="" id="" value="" />自动登录</p>

          </li>

        </ul>
      </div>
    </div>
    <div class="boxfooter">
      北京心企领航科技有限公司领航所有
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return {
            loginmodel:{
              UserName:"",
              Password:"",
              IsCheck:false
            }
          }
      },
      created(){
        var vm = this;
        document.onkeydown = function(e) {
          var key = window.event.keyCode;
          if (key == 13) {
          vm.handlelogin();
          }
        }

      },
      mounted(){
        
        if(localStorage.getItem("IsCheck")==='true'){
            this.loginmodel.IsCheck=true;
            console.log(localStorage.getItem("name"));
            console.log(localStorage.getItem("pwd"));
            this.loginmodel.UserName=localStorage.getItem("name")
            this.loginmodel.Password=localStorage.getItem("pwd") 
            this.handlelogin();
        }
      },
      methods:{
      handlelogin(){
        if(this.loginmodel.UserName===""||this.loginmodel.Password===""){
            this.$message.error('用户名或者密码不能为空!')
            return false
        }
        let v=this;
        let param = new URLSearchParams()
        param.append('UserName',v.loginmodel.UserName)
        param.append('Password',v.loginmodel.Password)
        this.$AccountAPI.login(param,function(data){
        if (data.Code == 1){
          localStorage.setItem("name",v.loginmodel.UserName);
          localStorage.setItem("pwd",v.loginmodel.Password);
          localStorage.setItem("IsCheck",v.loginmodel.IsCheck);
          v.$message.success('登录成功!');
          v.$store.commit('RECEIVE_Token',data.Msg)
          v.$store.commit('RECEIVE_USERINFO',data.Result);
          v.$router.push({path:'/'});

        }
        else {
           v.$message.error('用户名或者密码错误!');
  }
      });
      }
      }
    }
</script>

<style scoped>
 @import "../../static/css/login.css";
</style>
