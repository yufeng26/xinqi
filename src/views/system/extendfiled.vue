<template>
  <div class="extendfiled">
    <div class="top">
      <div class="top-left">扩展字段管理</div>
      <div class="top-right" @click="addRow">添加+</div>
    </div>
    <div class="main">
      <div class="neirong" v-for="(filed, index) in filedsList" :key="index">
        <div class="main-left">
          <div class="row">
            <label class="row-cell1">字段名称:</label>
            <el-input
              class="row-cell2"
              v-model="filed.e_FiledName"
              placeholder="请输入内容"
              maxlength="15"
              show-word-limit
              :readonly="!filed.isSave"
            ></el-input>
            <el-input
              class="row-cell2"
              v-show="false"
              v-model="filed.id"
            ></el-input>
          </div>
          <div class="row">
            <label class="row-cell1">录入方式:</label>
            <div class="row-cell2">
              <el-radio
                v-model="filed.e_Types"
                label="1"
                :disabled="!filed.isSave"
                >输入</el-radio
              >
              <el-radio
                v-model="filed.e_Types"
                label="2"
                :disabled="!filed.isSave"
                >选择</el-radio
              >
            </div>
          </div>
          <div class="radivList" v-if="filed.e_Types == '2'">
            <div v-for="(options, indexs) in filed.e_OptionInfo" :key="indexs">
              <label class="row-cell1">选项{{ indexs + 1 }}:</label
              ><el-input
                class="row-cell2"
                v-model="options.option"
                placeholder
                maxlength="10"
                show-word-limit
                :readonly="!filed.isSave"
              ></el-input>
              <i
                @click="remove(filed, options, indexs)"
                style="margin-left: 5px; color:red"
                class="el-icon-remove-outline"
                v-if="filed.isSave"
              ></i>
            </div>
            <el-button
              class="btn"
              type="primary"
              size="small"
              @click="addInput(filed)"
              v-if="filed.isSave"
              >添加选项</el-button
            >
          </div>
          <el-button
            class="btn"
            type="primary"
            size="small"
            @click="Save(filed)"
            v-if="filed.isSave"
            >保存</el-button
          >
          <el-button
            class="btn"
            style="background: red"
            type="primary"
            size="small"
            @click="cancle(filed, index)"
            v-if="filed.isSave"
            >取消</el-button
          >
          <div class="main-right">
            <el-button
              class="xiugai"
              type="primary"
              size="small"
              @click="update(filed)"
              v-if="!filed.isSave"
              >修改</el-button
            >
            <el-button
              class="shanchu"
              type="info"
              size="small"
              @click="deleted(filed, index)"
              v-if="!filed.isSave"
              >删除</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "extendfiled",
  data() {
    return {
      filedsList: []
    };
  },
  created() {},
  mounted() {
    var v = this;
    let param = new URLSearchParams();
    this.$SystemAPI.getSystem(param, function(data) {
      if (data.Code == 1) {
        //  v.filedsList= data.Result
        data.Result.forEach(item => {
          v.filedsList.push({
            isSave: false,
            id: item.ID,
            e_FiledName: item.e_FiledName,
            e_Types: item.e_Types,
            e_OptionInfo: JSON.parse(item.e_OptionInfo)
          });
        });
      }
    });
  },
  methods: {
    addInput(filed) {
      let iscontinue = true;
      filed.e_OptionInfo.forEach(item => {
        if (item.option.replace(/^\s\s*/, "").replace(/\s\s*$/, "") === "") {
          iscontinue = false;
        }
      });
      if (!iscontinue) {
        this.$message.error("请填写选项内容!");
        return false;
      }
      var option = new Object();
      option.option = "";
      filed.e_OptionInfo.push(option);
    },
    addRow() {
      this.filedsList.push({
        isSave: true,
        id: "",
        e_FiledName: "",
        e_Types: "1",
        e_OptionInfo: []
      });
    },
    Save(filed) {
      var v = this;
      let optioninfo = [];
      if (filed.e_Types == "2") {
        optioninfo = JSON.stringify(filed.e_OptionInfo);
      }
      if (
        filed.e_FiledName.replace(/^\s\s*/, "").replace(/\s\s*$/, "") === ""
      ) {
        v.$message.error("字段名称不能为空!");
        return false;
      }
      let param = new URLSearchParams();
      param.append("id", filed.id);
      param.append("e_FiledName", filed.e_FiledName);
      param.append("e_Types", filed.e_Types);
      param.append("e_OptionInfo", optioninfo);
      this.$SystemAPI.addSystem(param, function(data) {
        if (data.Code == 1) {
          filed.id = data.Result.ID;
          filed.isSave = false;
          v.$message.success(data.Msg);
        } else {
          v.$message.error("发生了错误!");
        }
      });
    },
    update(filed) {
      filed.isSave = true;
      if (filed.e_Types == "1") {
        //解决输入方式为填写切换为选择时产生的异常
        filed.e_OptionInfo = [];
      }
    },
    remove(filed, option, index) {
      filed.e_OptionInfo.splice(index, 1);
    },
    cancle(filed, index) {
      filed.isSave = false;
      if (filed.id === "") {
        //说明时新添加的行
        this.filedsList.splice(index, 1);
      }
    },
    //删除
    deleted(item, index) {
      this.filedsList.splice(index, 1);
      if (item.id.replace(/^\s\s*/, "").replace(/\s\s*$/, "") === "") {
        return false;
      } else {
        var v = this;
        let optioninfo = [];
        if (item.e_Types == "2") {
          optioninfo = JSON.stringify(item.e_OptionInfo);
        }
        let param = new URLSearchParams();
        param.append("id", item.id);
        this.$SystemAPI.deleteSystem(param, function(data) {
          if (data.Code == 1) {
            v.$message.success("删除成功!");
          } else {
            v.$message.error("删除失败!" + data.Msg);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.caozuo {
  /* height: 30px;
  position: relative;
  right: -40%; */
}
.hh {
  margin-top: 5px;
  border: rgb(0, 255, 42) solid 1px;
}
.neirong {
  height: 100%;
  width: 100%;
  /* position: relative; */
  /* border:red solid 1px; */
  /* overflow: auto; */
}
.row {
  margin-bottom: 10px;
}
.main-left {
  text-align: left;
  padding: 5px;
  position: relative;
  width: 80%;
  left: 0px;
  border: rgb(190, 179, 181) solid 1px;
  margin-top: 5px;
  border-radius: 5px;
}
.main-right {
  position: absolute;
  height: 40px;
  width: 25%;
  right: 0;
  top: 30%;
  text-align: left;
  transform: translate(0, 0%);
}
.main-right button {
  border-radius: 10px;
}
.extendfiled .top {
  position: relative;
  background-color: rgb(0, 119, 255);
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.extendfiled .top-left {
  position: absolute;
  left: 10px;
  color: #ffffff;
}
.extendfiled .top-right {
  cursor: pointer;
  position: absolute;
  right: 20px;
  color: bisque;
}
.row-cell1 {
  text-align: right;
  width: 70px;
  display: inline-block;
}
.row-cell2 {
  display: inline-block;
  width: 60%;
  margin-top: 5px;
}
.radivList {
  width: 100%;
  /* left: 20px; */
  text-align: left;
}
.main {
  padding: 10px;
}
.btn {
  margin-top: 5px;
  display: inline-block;
  margin-left: 0;
  height: 25px;
  width: 70px;
  text-align: center;
  line-height: 20px;
}
.main-right button {
  width: 80px;
  height: 30px;
  font-size: 18px;
  margin-right: 15px;
}
@import "../../../static/css/extend.css";
</style>
