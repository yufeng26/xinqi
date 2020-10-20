<template>
  <div class="formPage">
    <!-- 内容主体区域 -->
    <div class="pageTille">
      批量导入
    </div>
    <div class="content">
      <ul class="noticeArr">
        <li>注意：</li>
        <li>1.导入信息时请仔细填写表格中的每一项，*为必填项。</li>
        <li>2.一次性导入的数量不宜过大，对于大数据建议批次导入。</li>
      </ul>
      <ul class="import">
        <li>导入步骤：</li>
        <li>1、点击<button @click="exportExcel()">这里</button>下载用户信息模板，在Excel表格中录入信息</li>
        <li>
          <span>2、选择导入的文件：</span>
           <span class="files">
								<span class="count">{{fileName}}</span>
								<span class="wj">选择文件</span>
								<input name="fileup" @change="update"  style="border:0;" type="file" />
							</span>
        </li>
        <li class="mtop15">
          <button type="button" @click="importuser" style="background: #00bcd4;" class="layui-btn layui-btn-normal channel">马上导入</button>
          <button type="button" @click="$router.go(-1)" style="background: #9571f9;" class="layui-btn">返回</button>
        </li>
      </ul>
    </div>
    <ul class="mycenters">
      <li style="display: block;">
        <p class="resume">
          <div id="deltwo">
            <div class="deltit">提示</div>
            <div style="display: flex;justify-content: center;align-items: center;">
              <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="circle" class="g-circles g-circles--v1">
                  <circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10"></circle>
                  <circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10"></circle>
                  <circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10"></circle>
                  <circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10"></circle>
                  <circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10"></circle>
                  <circle id="7" cx="60" cy="110" r="10"></circle>
                  <circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10"></circle>
                  <circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10"></circle>
                  <circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10"></circle>
                  <circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10"></circle>
                  <circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10"></circle>
                  <circle id="1" cx="60" cy="10" r="10"></circle>
                </g>

                <use xlink:href="#circle" class="use"/>
              </svg>
            </div>
        <p>导入进行中，请稍后......</p>
  </div>
  <div id="del">
    <div class="deltit">提示</div>
    <p>操作数量：<span style="color: ;">90个</span></p>
    <p>成功数量：<span style="color: ;">70个</span></p>
    <p>失败数量：<span style="color: ;">20个</span></p>
    <p class="resume">
      <button type="button" class="layui-btn layui-btn-normal sure">确认</button>
      <button type="button" style="background: #9571f9;" class="layui-btn back">返回</button>
    </p>
  </div>
  </p>
  </li>
  </ul>
  <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  :modal="false"
  custom-class="user_dialog"
  center>
  <p class="dialog_info">{{PLImportUserMsg}}，<span>点击<button @click="exportExcelError()">这里</button>下载错误信息</span></p>
</el-dialog>
  </div>

</template>

<script>
export default {
  name: "userimport",
  data() {
    return {
      fileName: "",
      groupid: "",
      fileurl: "",
      AdminID: "",
      a_Authorization: "",
      centerDialogVisible: false,
      PLImportUserMsg:"",
      importURL:"",
      tableData: [
        {
          ID: "",
          e_CreateTime: "",
          e_FiledName: "",
          e_OptionInfo: "",
          e_Types: "",
        },
      ],
      tb_header: [],
    };
  },
  mounted() {
    // this.groupid=this.$route.query.GroupID
    this.AdminID = this.$store.state.userinfo.ID;
    const a_Authorization = this.$store.state.userinfo.a_Authorization;
    if (a_Authorization == null) {
      //说明是一级管理员
      this.a_Authorization = this.AdminID;
    } else {
      //说明是一级以下的管理员
      this.a_Authorization = a_Authorization + "," + this.AdminID;
    }
    this.getSystem();
  },
  methods: {
    exportExcelError(){
      this.$SystemAPI.exportExcelError(this.importURL);
    },
    getSystem() {
      let that = this;
      let param = new URLSearchParams();
      this.$SystemAPI.getSystem(param, function (data) {
        if (data.Code == 1) {
          console.log(data);
          let datas = data.Result;
          if (datas.length > 0) {
            that.tb_header = datas;
          }
        }
      });
    },
    exportExcel() {
      let that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = [
          "*用户名",
          "*密码",
          "*真实姓名",
          "*性别",
          "*当前受教水平",
          "*出生年月",
        ];
        that.tb_header.forEach((item) => {
          tHeader.push(item.e_FiledName);
        });
        // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "ID",
          "e_CreateTime",
          "e_FiledName",
          "e_OptionInfo",
          "e_Types",
        ];
        // 上面的index、nickName、name是tableData里对象的属性
        const list = this.tableData; //把data里的tableData存到list
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "物联网云平台批量创建用户模板");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    update(e) {
      let v = this;
      let file = e.target.files[0];
      v.fileName = file.name;
      let param = new FormData(); //创建form对象
      param.append("file", file); //通过append向form对象添加数据

      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      }; //添加请求头
      this.$UserAPI.UploadFile(param, function (data) {
        if (data.Code == 1) {
          v.fileurl = data.Result;
        } else {
          v.$message.success("上传失败!" + data.Msg);
        }
      });
    },
    importuser() {
      let v = this;
      if (!this.fileurl) {
        this.$message.warning("请选择文件!");
        return;
      }
      let param = new URLSearchParams();
      param.append("Groupid", this.groupid);
      param.append("Headstr", this.fileurl);
      param.append("AdminID", this.AdminID);
      param.append("AuthorizationId", this.a_Authorization);
      this.$UserAPI.ImportCUser(param, function (data) {
        if (data.Code == 1) {
          // v.$set(v.groupid,'')
          // v.$set(v.fileurl,'')//暂时不知道这是什么业务逻辑
          // v.$message.success("导入成功!");
          v.centerDialogVisible = true;
          v.PLImportUserMsg = data.Msg;
          v.importURL = data.Result;
          // this.$router.push("/user");
        } else {
          v.$message.success("导入成功!");
          v.$router.push("/user");
          // v.$message.error("导入失败!" + data.Msg);
        }
      });
    },
  },
};
</script>
<style>
.mycenters li p {
  width: 45%;
  padding-left: 2%;
}
.mycenters li p input {
  width: 60%;
}
.mycenters li p a {
  color: #0070e5;
  border-bottom: 1px solid #0070e5;
}
.files {
  width: 30%;
  border: 1px solid #0070e5;
  display: flex;
  height: 40px;
  position: relative;
}
.files span {
  display: inline-block;
}
.files span:nth-child(1) {
  width: 65%;
  text-align: center;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.files span:nth-child(2) {
  text-align: center;
  width: 35%;
  background: #0070e5;
  line-height: 40px;
  color: #fff;
}
.files input {
  position: absolute;
  right: 0;
  width: 45%;
  height: 40px;
  opacity: 0;
  z-index: 666;
}
#deltwo {
  width: 20%;
  height: 272px;
  background: #ffffff;
  border-radius: 5px;
  position: fixed;
  top: 35%;
  left: 50%;
  box-shadow: 3px 3px 3px #cccccc;
  border: 1px solid #f2f2f2;
  display: none;
}
#deltwo .deltit {
  height: 40px;
  font-size: 18px;
  color: #fff;
  background: #0070e5;
  text-align: center;
  line-height: 40px;
  margin-bottom: 34px;
}
#deltwo p {
  width: 100%;
  padding-bottom: 15px;
  text-align: center;
}
#del {
  width: 20%;
  background: #ffffff;
  border-radius: 5px;
  position: fixed;
  top: 35%;
  left: 50%;
  box-shadow: 3px 3px 3px #cccccc;
  border: 1px solid #f2f2f2;
  display: none;
}
#del .deltit {
  height: 40px;
  font-size: 18px;
  color: #fff;
  background: #0070e5;
  text-align: center;
  line-height: 40px;
  margin-bottom: 34px;
}
#del p {
  width: 100%;
  margin: 15px 0;
  text-align: center;
  font-size: 18px;
  color: #555;
}
#del .resume {
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding-bottom: 20px;
}
#del .resume button {
  width: 30%;
  font-size: 16px;
}
</style>
<style scoped>
@import "../../../static/css/pcenter.css";
@import "../../../static/css/common.css";
.content .import {
  padding-left: 20px;
}
.content {
  background-color: #fff;
}
.content .noticeArr li,
.content .import li {
  line-height: 40px;
  font-size: 16px;
}
.content .import li:nth-child(2) button {
  border: none;
  background-color: #fff;
  text-decoration: underline;
  cursor: pointer;
  margin: 5px;
  color: blue;
}
.content .import li:nth-child(3) span {
  float: left;
}
.content .import li:nth-child(3) {
  overflow: hidden;
}
.content .import li:nth-child(4) {
  clear: both;
  margin-top: 30px;
}
.content .import li:nth-child(4) button {
  width: 100px;
}
.user_dialog .dialog_info {
  text-align: center;
  font-size: 16px;
}
</style>
