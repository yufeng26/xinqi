
  <template>
  <div id="login">
    <div class="l-right">
      <div class="l-l">
        <!-- @tab-click="handleClick" -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户登录" name="first">
            <!-- el-form:自定义表单组件 -->
            <!-- :model="form" 表单对象，用于收集收据 -->
            <!-- label-width="80px"：label的宽度 -->
            <!-- el-form-item：表单项  -->
            <el-form
              @submit.native.prevent="login"
              ref="form"
              status-icon
              :rules="rules"
              :model="form"
              label-width="80px"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="form.username"
                  placeholder="请输入用户名"
                  prefix-icon="iconfont icon-yonghuming"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <!-- 将来我们给组件注册事件的时候，可以会注册不上 -->
                <!--@keyup.enter点击键盘的enter触发事件-->
                <!-- .native: 注册事件，给组件的根元素注册事件 -->

                <el-input
                  type="password"
                  v-model="form.password"
                  placeholder="请输入密码"
                  prefix-icon="iconfont icon-mima"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <!--使用@语法糖绑定事件-->
                <el-button native-type="submit" type="primary" @click="login"
                  >登录</el-button
                >
                <el-button @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "login",
  data() {
    return {
      activeName: "first",
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "請輸入用戶名", trigger: "change" },
          { min: 3, max: 6, message: "長度在3至6之間", trigger: "change" },
        ],
        password: [
          { required: true, message: "請輸入密碼", trigger: "change" },
          { min: 6, max: 12, message: "長度在6至12之間", trigger: "change" },
        ],
      },
    };
  },
  created() {},
  methods: {
    login() {
      let that = this;
      this.$refs.form.validate(async (validate) => {
        if (validate) {
          let param = new URLSearchParams();
          param.append("UserName", this.form.username);
          param.append("PassWord", this.form.password);
          this.$UserAPI.loginUser(param, function (data) {
            console.log(data);
            if (data.Code == 1) {
              that.$message({
                message: "登录成功!",
                type: "success",
              });
              console.log(data);
              // 跳转到首页
              that.$store.commit("RECEIVE_Token", data.Msg);

              that.$store.commit("RECEIVE_USERINFO", data.Result);
              if (that.$store.state.accessToken) {
                console.log(that.$store.state.accessToken);
                // 将登录名使用vuex传递到Home页面
                setTimeout(function () {
                  that.$router.push("home");
                }, 1000);
              }
            } else {
              that.$message({
                message: "用户名或者密码错误!",
                type: "error",
              });
            }
          });
        }
      });
    },
    reset() {
      this.$ref.form.resetFields();
    },
  },
};
</script>

<style scoped>
</style>
