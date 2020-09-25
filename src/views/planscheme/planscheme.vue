<template>
  <div>
    <div class="top">
      <form class="layui-form" action="">
        <div class="layui-form-item">
          <label class="layui-form-label">真实姓名：</label>
          <div class="layui-input-block">
            <el-input placeholder="请输入姓名" v-model="searchkey"></el-input>
          </div>
        </div>
      </form>
      <div class="selects">
        <label>分组：</label>
        <div class="selecount">
          <SelectTree
            :props="props"
            :options="optionData"
            :value="valueId"
            :clearable="isClearable"
            :accordion="isAccordion"
            @getValue="getValue($event)"
          />
        </div>
      </div>
      <button
        type="button"
        style="background: #006fe5; margin-left: 50%"
        class="layui-btn layui-btn-normal"
      >
        开始检索
      </button>
    </div>
    <div class="bigbox">
      <div class="consult">
        <button
          type="button"
          style="background: #01c8e7"
          class="layui-btn layui-btn-normal"
          v-if="menuModel.exportUsable"
        >
          批量导出
        </button>
        <button
          type="button"
          style="background: #ff433f"
          class="layui-btn layui-btn-normal"
          v-if="menuModel.deleteUsable"
        >
          批量删除
        </button>
        <div class="tab">
          <el-table style="width: 100%" :data="userList">
            <el-table-column
              v-model="checkAll"
              type="selection"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
            </el-table-column>

            <el-table-column label="真实姓名" prop="UserName" width="200px">
            </el-table-column>
            <el-table-column label="训练进度" prop="progress" width="200px">
            </el-table-column>
            <el-table-column label="训练状态" prop="palanstate" width="200px">
            </el-table-column>
            <el-table-column label="创建时间" prop="CreateTime" width="200px">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  @click.native.prevent="editRow(scope.row)"
                  v-if="menuModel.lookUsable"
                  >{{ menuModel.look }}</el-button
                >

                <el-button type="warning" v-if="menuModel.exportUsable">{{
                  menuModel.export
                }}</el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.row)"
                  type="danger"
                  v-if="menuModel.deleteUsable"
                  >{{ menuModel.delete }}</el-button
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
    </div>
  </div>
</template>

<script>
import SelectTree from "../compeonts/treeSelect.vue";
export default {
  name: "planscheme",
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      searchkey: "",
      groupID: "",
      deviceid: "5abb6bdbba4a11e99a4f00cfe04d1a01",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
      totalRecords: 0,
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: "", // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children",
        // disabled:true
      },
      //用户组数组
      list: [],
      AdminID: "",
      menuModel: {
        look: "",
        lookUsable: false,
        export: "",
        exportUsable: false,
        delete: "",
        deleteUsable: false,
      },
    };
  },
  components: {
    SelectTree,
  },
  mounted() {
    this.AdminID = this.$store.state.userinfo.ID;
    this.viewPath = this.$route.path;
    let that = this;
    let param = new URLSearchParams();
    param.append("adminID", this.AdminID);
    param.append("ViewPath", this.viewPath);
    this.$SystemAPI.CheckAuthority(param, function (data) {
      if (data.Code == 1) {
        that.setmenuModel(data.Result);
      }
    });
    this.handleUserList();
    this.gettreeList();
    // let lilist=document.getElementsByClassName("layui-nav-item");
    // lilist[3].className='layui-nav-item'
    // lilist[6].className='layui-nav-item layui-this'
  },
  methods: {
    setmenuModel(item) {
      let that = this;
      item.forEach((c) => {
        if (c.ID == 29) {
          that.menuModel.look = c.MenuName;
          that.menuModel.lookUsable = c.Usable;
        } else if (c.ID == 30) {
          that.menuModel.export = c.MenuName;
          that.menuModel.exportUsable = c.Usable;
        } else if (c.ID == 31) {
          that.menuModel.delete = c.MenuName;
          that.menuModel.deleteUsable = c.Usable;
        }
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    //用户分组
    gettreeList() {
      let v = this;

      let param = new URLSearchParams();
      this.$UserAPI.getUserGroupList(param, function (data) {
        if (data.Code == 1) {
          v.list = data.Result;
        }
      });
    },
    getValue(value) {
      this.valueId = value;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.handleUserList(); //点击第几页
    },
    //全选
    handleCheckAllChange() {
      this.$refs.multipleTable.toggleAllSelection();
      this.isIndeterminate = false;
    },
    handleUserList() {
      let v = this;
      let param = new URLSearchParams();
      param.append("AdminID", this.AdminID);
      param.append("searchkey", this.searchkey);
      param.append("groupID", this.groupID);
      param.append("deviceID", this.deviceid);
      param.append("pageNum", this.currentPage);
      param.append("pageSize", this.pagesize);
      this.userList = this.$PlanSchemeAPI.getPlanSchemePageList(
        param,
        function (data) {
          if (data.Code == 1) {
            v.userList = data.Result.Data;
            v.totalRecords = data.Result.totalRecords;
          }
        }
      );
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
          this.$PlanSchemeAPI.PLdelResult(params, function (data) {
            if (data.Code == 1) {
              v.$message.success("删除成功!");
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
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

          this.$PlanSchemeAPI.delResult(param, function (data) {
            if (data.Code == 1) {
              v.$message.success("删除成功!");
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
    },
    editRow(row) {
      this.$router.push({ name: "planreport", query: { ID: row.ID } });
    },
  },
  computed: {
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          (child) => father.id == child.parentId
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    } /* 转树形数据 */,
  },
};
</script>

<style scoped>
@import "../../../static/css/evaluation.css";
/deep/ .tab {
  margin-left: 0.625rem;
}
</style>
