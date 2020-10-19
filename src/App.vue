<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* 此处定义一些全局公用样式 */
.mtop10 {
  margin-top: 10px;
}
.mtop15 {
  margin-top: 15px;
}
.mtop20 {
  margin-top: 20px;
}
.mbottom10 {
  margin-bottom: 10px;
}
.mbottom15 {
  margin-bottom: 15px;
}
.mbottom20 {
  margin-bottom: 20px;
}
.password .el-dialog__header {
  background-color: #409eff;
}
.password .el-dialog__body p {
  text-align: center;
  font-weight: bold;
  text-align: 26px;
}
</style>
