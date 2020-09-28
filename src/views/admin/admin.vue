<template>
  <!-- 内容主体区域 -->
  <div class="searchPage">
    <div class="searchBox" v-if="menuModel.addUsable">
      <el-row class="adminTlt">
        <el-button type="primary" @click="gotoadd" class="secachBtn">
          添加管理员
        </el-button>
      </el-row>
    </div>
    <div class="searchData mtop10">
      <el-table style="width: 100%;" :data="userList">
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column
          label="真实姓名"
          prop="a_RealName"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="a_CreateTime"
          :formatter="dateFormat"
          width="300"
          align="center"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editRow(scope.row, false)"
              type="success"
              size="mini"
              v-if="menuModel.lookUsable"
              >{{ menuModel.look }}</el-button
            >

            <el-button
              @click.native.prevent="editRow(scope.row, true)"
              type="warning"
              size="mini"
              v-if="menuModel.updateUsable"
              >{{ menuModel.update }}</el-button
            >
            <el-button
              @click.native.prevent="ResetPwd(scope.row, true)"
              type="primary"
              size="mini"
              v-if="menuModel.resetUsable"
              >{{ menuModel.reset }}</el-button
            >
            <el-button
              @click.native.prevent="fenpeiquanxian(scope.row, true)"
              type="warning"
              size="mini"
              v-if="menuModel.quanxianUsable"
              >{{ menuModel.quanxian }}</el-button
            >
            <el-button
              @click.native.prevent="Allocation(scope.row)"
              type="success"
              size="mini"
              v-if="menuModel.fenpeiUsable"
              >{{ menuModel.fenpei }}</el-button
            >
            <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="danger"
              size="mini"
              v-if="menuModel.deleteUsable"
              >{{ menuModel.delete }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="padding-bottom: 15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRecords"
      ></el-pagination>
    </div>
    <div id="test1"></div>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
      totalRecords: 0,
      AdminID: "",
      a_Authorization: "",
      menus: [],
      menuModel: {
        add: "",
        addUsable: false,
        look: "",
        lookUsable: false,
        update: "",
        updateUsable: false,
        reset: "",
        resetUsable: false,
        quanxian: "",
        quanxianUsable: false,
        fenpei: "",
        fenpeiUsable: false,
        delete: "",
        deleteUsable: false
      }
    };
  },
  created() {},
  mounted() {
    this.AdminID = this.$store.state.userinfo.ID;
    this.a_Authorization = this.$store.state.userinfo.a_Authorization;
    this.viewPath = this.$route.path;
    let that = this;
    let param = new URLSearchParams();
    param.append("adminID", this.AdminID);
    param.append("ViewPath", this.viewPath);
    this.$SystemAPI.CheckAuthority(param, function(data) {
      if (data.Code == 1) {
        that.setmenuModel(data.Result);
      }
    });
    this.handleUserList();
  },
  methods: {
    // 格式化时间
    dateFormat(row, column, cellValue, index) {
      if (cellValue == undefined) {
        return "";
      }
      return this.$moment(cellValue).format("YYYY-MM-DD  HH:mm:ss");
    },
    setmenuModel(item) {
      let that = this;
      item.forEach(c => {
        if (c.ID == 9) {
          that.menuModel.add = c.MenuName;
          that.menuModel.addUsable = c.Usable;
        } else if (c.ID == 10) {
          that.menuModel.look = c.MenuName;
          that.menuModel.lookUsable = c.Usable;
        } else if (c.ID == 11) {
          that.menuModel.update = c.MenuName;
          that.menuModel.updateUsable = c.Usable;
        } else if (c.ID == 12) {
          that.menuModel.reset = c.MenuName;
          that.menuModel.resetUsable = c.Usable;
        } else if (c.ID == 13) {
          that.menuModel.quanxian = c.MenuName;
          that.menuModel.quanxianUsable = c.Usable;
        } else if (c.ID == 14) {
          that.menuModel.fenpei = c.MenuName;
          that.menuModel.fenpeiUsable = c.Usable;
        } else if (c.ID == 15) {
          that.menuModel.delete = c.MenuName;
          that.menuModel.deleteUsable = c.Usable;
        }
      });
    },
    gotoadd() {
      this.$router.push({ path: "/addadmin" });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.handleUserList(); //点击第几页
    },
    handleUserList() {
      let v = this;
      let param = new URLSearchParams();
      param.append("pageNum", this.currentPage);
      param.append("pageSize", this.pagesize);
      param.append("AdminID", this.AdminID);
      this.userList = this.$AdminAPI.getAdminList(param, function(data) {
        if (data.Code == 1) {
          v.userList = data.Result.Data;
          v.totalRecords = data.Result.totalRecords;
        }
      });
    },
    //单个删除
    deleteRow(row) {
      let v = this;
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = new URLSearchParams();
          param.append("ID", row.ID);

          this.$AdminAPI.DeleteUser(param, function(data) {
            if (data.Code == 1) {
              v.$message.success("删除成功!");
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
    },
    //单个编辑查看
    editRow(row, issave) {
      this.$router.push({
        name: "editadmin",
        query: { ID: row.ID, issave: issave }
      });
    },
    //重置密码
    ResetPwd(row) {
      let v = this;
      this.$confirm("确认要重置密码吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = new URLSearchParams();
          param.append("ID", row.ID);

          this.$AccountAPI.ResetPWD(param, function(data) {
            if (data.Code == 1) {
              v.$message.success(data.Msg);
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
    },
    //分配用户
    Allocation(row) {
      debugger;
      //先跳转到用户列表 然后进行分配
      this.$router.push({
        name: "AllocationUser",
        query: { ID: row.ID, a_Authorization: row.a_Authorization }
      });
    },
    fenpeiquanxian(row) {
      this.$router.push({
        name: "allocation",
        query: { ID: row.ID, a_Authorization: row.a_Authorization }
      });
    }
  }
};
</script>

<style scoped>
@import "../../../static/css/admin.css";
@import "../../../static/css/common.css";
.cell {
  text-align: center;
}
</style>
