<template>
  <div class="searchPage">
    <div class="searchBox">
      <el-row class="mtop15">
        <el-col :span="6">
          <label class="searchLabel">真实姓名：</label>
          <div class="searchData">
            <el-input
              class="searchInput"
              placeholder="请输入姓名"
              v-model="searchkey"
            ></el-input>
          </div>
        </el-col>
        <el-col :offset="12" :span="3" class="textRight">
          <el-button type="primary" @click="handleUserList" class="secachBtn">
            开始检索
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="actionBox">
      <el-button type="danger" @click="handlePLDelete" class="secachBtn">
        批量删除
      </el-button>
    </div>
    <div class="searchData">
      <el-table ref="multipleTable" style="width: 100%" :data="userList">
        <el-table-column
          v-model="checkAll"
          type="selection"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
        </el-table-column>

        <el-table-column label="真实姓名" prop="UserName"> </el-table-column>
        <el-table-column label="咨询状态" prop="IsConfirm"> </el-table-column>
        <el-table-column label="创建时间" prop="CreateTime"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click.native.prevent="lookRow(scope.row)"
              >查看</el-button
            >

            <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="danger"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRecords"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "consult",
  data() {
    return {
      searchkey: "",
      checkAll: false,
      isIndeterminate: false,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
      totalRecords: 0,
      AdminID: "",
    };
  },
  methods: {
    // 格式化时间
    dateFormat(row, column, cellValue, index) {
      if (cellValue == undefined) {
        return "";
      }
      return this.$moment(cellValue).format("YYYY-MM-DD  HH:mm:ss");
    },
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
      param.append("searchkey", this.searchkey);
      param.append("AdminID", this.AdminID);

      param.append("pageNum", this.currentPage);
      param.append("pageSize", this.pagesize);
      this.userList = this.$ConsulationAPI.getConsulationPageList(
        param,
        function (data) {
          if (data.Code == 1) {
            v.userList = data.Result.Data;
            v.totalRecords = data.Result.totalRecords;
          }
        }
      );
    },
    //全选
    handleCheckAllChange() {
      this.$refs.multipleTable.toggleAllSelection();
      this.isIndeterminate = false;
    },
    //批量删除
    handlePLDelete() {
      var selectrows = this.$refs.multipleTable.selection;
      let v = this;
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let newarr = "";
          selectrows.forEach(function (value, index, array) {
            newarr += value.ID + ",";
          });
          if (newarr) {
            newarr = newarr.substring(0, newarr.lastIndexOf(","));
          }
          var params = new URLSearchParams();
          params.append("ID", newarr);
          this.$ConsulationAPI.PLdelConsulation(params, function (data) {
            if (data.Code == 1) {
              v.$message.success("删除成功!");
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
    },
    // 查看
    lookRow(row) {
      console.log(row);
    },
    //单个删除
    deleteRow(row) {
      let v = this;
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let param = new URLSearchParams();
          param.append("ID", row.ID);

          this.$ConsulationAPI.delConsulation(param, function (data) {
            if (data.Code == 1) {
              v.$message.success("删除成功!");
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.AdminID = this.$store.state.userinfo.ID;
    this.handleUserList();
    let lilist = document.getElementsByClassName("layui-nav-item");
    lilist[3].className = "layui-nav-item";
    let childNodes = lilist[8];
    childNodes.className = "layui-nav-item layui-nav-itemed";
    let dl = childNodes.childNodes[2];
    dl.children[0].className = "layui-this";
  },
};
</script>

<style scoped>
@import "../../../static/css/consult.css";
@import "../../../static/css/common.css";
</style>
