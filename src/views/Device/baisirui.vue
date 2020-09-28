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
        <el-col :span="6">
          <label class="searchLabel">分组：</label>
          <div class="searchData">
            <SelectTree
              class="searchSelect"
              :props="props"
              :options="optionData"
              :value="valueId"
              :clearable="isClearable"
              :accordion="isAccordion"
              @getValue="getValue($event)"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <label class="searchLabel">项目名称：</label>
          <div class="searchData">
            <el-select :clearable="true" v-model="topicID" placeholder="请选择">
              <el-option
                v-for="item in topic"
                :key="item.ID"
                :label="item.tp_TopicName"
                :value="item.ID"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3" class="textRight">
          <el-button type="primary" @click="handleUserList" class="secachBtn">
            开始检索
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="actionBox">
      <!-- <el-button type="primary" @click="tuantibaogao" class="secachBtn">
        团体报告
      </el-button> -->
      <el-button
        style="background: #01c8e7;"
        type="primary"
        v-if="menuModel.exportUsable"
        @click="handerPLExport"
        class="secachBtn"
      >
        批量导出
      </el-button>
      <el-button
        type="danger"
        v-if="menuModel.deleteUsable"
        @click="handlePLDelete"
        class="secachBtn"
      >
        批量删除
      </el-button>
    </div>
    <div class="searchData">
      <el-table
        style="width: 100%;"
        :data="userList"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-model="checkAll"
          type="selection"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
        </el-table-column>
        <el-table-column label="项目名称" prop="GameName" width="200px">
        </el-table-column>
        <el-table-column label="真实姓名" prop="UserName" width="200px">
        </el-table-column>
        <el-table-column label="训练结果" prop="Result" width="200px">
        </el-table-column>
        <el-table-column
          label="创建时间"
          :formatter="dateFormat"
          prop="CreateTime"
          width="200px"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editRow(scope.row)"
              type="success"
              size="mini"
              v-if="menuModel.lookUsable"
              >{{ menuModel.look }}</el-button
            >
            <el-button
              @click.native.prevent="exportDevice(scope.row)"
              type="primary"
              size="mini"
              v-if="menuModel.exportUsable"
              >{{ menuModel.export }}</el-button
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
import SelectTree from "../compeonts/treeSelect.vue";
export default {
  name: "ceping",
  data() {
    return {
      dialogVisible: false,
      checkAll: false,
      isIndeterminate: false,
      multipleSelection: [],
      searchkey: "",
      clearable: { type: Boolean, default: true },
      topicID: "",
      deviceID: "68df5efeba4a11e99a4f00cfe04d1a01",
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
        children: "children"
        // disabled:true
      },
      // 选项列表（必选）
      list: [],
      topic: [],
      AdminID: "",
      menuModel: {
        look: "",
        lookUsable: false,
        export: "",
        exportUsable: false,
        delete: "",
        deleteUsable: false
      }
    };
  },
  components: {
    SelectTree
  },
  mounted() {
    var ddd = [
      { Name: "维度名称1", Score: 12.5, Analysis: "结果分析", Proposal: "建议" }
    ];
    let d = JSON.stringify(ddd);
    // debugger
    this.AdminID = this.$store.state.userinfo.ID;
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
    this.gettreeList();
    this.getTopicList();
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
        if (c.ID == 41) {
          that.menuModel.look = c.MenuName;
          that.menuModel.lookUsable = c.Usable;
        } else if (c.ID == 42) {
          that.menuModel.export = c.MenuName;
          that.menuModel.exportUsable = c.Usable;
        } else if (c.ID == 43) {
          that.menuModel.delete = c.MenuName;
          that.menuModel.deleteUsable = c.Usable;
        }
      });
    },
    //单选
    handleSelectionChange(val) {
      let vlength = val.length;

      this.multipleSelection = val;

      this.checkAll = vlength === this.userList.length;
      this.isIndeterminate = vlength > 0 && vlength < this.userList.length;
    },
    //全选
    handleCheckAllChange() {
      this.$refs.multipleTable.toggleAllSelection();
      this.isIndeterminate = false;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.handleUserList();
    },
    //表格分页参数
    handleUserList() {
      let v = this;
      let param = new URLSearchParams();
      param.append("searchkey", this.searchkey);
      param.append("groupID", this.valueId);
      param.append("TopicID", this.topicID);
      param.append("pageSize", this.pagesize);
      param.append("pageIndex", this.currentPage);
      //从新传参，这种传参，封装的方法不支持，后续需要优化-2020-09-28
      // let param = {
      //   searchkey: this.searchkey,
      //   groupId: this.valueId,
      //   gameId: this.topicID,
      //   pageInde: this.pagesize,
      //   pageSize: this.currentPage
      // };
      this.userList = this.$ReportOptionAPI.GetBaisiruiList(param, function(
        data
      ) {
        if (data.Code == 1) {
          v.userList = data.Result.Data;
          v.totalRecords = data.Result.totalRecords;
        }
      });
    },
    // 取值
    getValue(value) {
      this.valueId = value;
    },
    //批量删除
    handlePLDelete() {
      var selectrows = this.$refs.multipleTable.selection;
      let v = this;
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let newarr = "";
          selectrows.forEach(function(value, index, array) {
            newarr += value.ID + ",";
          });
          if (newarr) {
            newarr = newarr.substring(0, newarr.lastIndexOf(","));
          }
          var params = new URLSearchParams();
          params.append("ID", newarr);
          this.$TestResultAPI.PLdelResult(params, function(data) {
            if (data.Code == 1) {
              v.$message.success("删除成功!");
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
    },
    //用户分组
    gettreeList() {
      let v = this;

      let param = new URLSearchParams();
      this.$UserAPI.getUserGroupList(param, function(data) {
        if (data.Code == 1) {
          v.list = data.Result;
        }
      });
    },
    //获取主题下拉框
    getTopicList() {
      let v = this;
      let param = new URLSearchParams();
      param.append("deviceID", this.deviceID);
      this.$TestResultAPI.getTopicList(param, function(data) {
        if (data.Code == 1) {
          v.topic = data.Result;
        }
      });
    },
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

          this.$TestResultAPI.delResult(param, function(data) {
            if (data.Code == 1) {
              v.$message.success("删除成功!");
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
    },
    //查看
    editRow(row) {
      this.$router.push({ name: "xunlianreport", query: { ID: row.ID } });
    },
    //导出
    exportDevice(row) {
      this.$PlanSchemeAPI.ReportResult(row.ID);
    },
    //批量导出
    handerPLExport() {
      let v = this;
      var selectrows = this.$refs.multipleTable.selection;
      let newarr = "";
      selectrows.forEach(function(value, index, array) {
        newarr += value.ID + ",";
      });
      if (newarr) {
        newarr = newarr.substring(0, newarr.lastIndexOf(","));
      }
      if (!newarr) {
        v.$message.warning("请选择要导出的报告!");
        return;
      }

      this.$TestResultAPI.PLReportResult(newarr);
    }
  },
  computed: {
    /* 转树形数据 */
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    }
  }
};
</script>

<style scoped>
@import "../../../static/css/evaluation.css";
@import "../../../static/css/common.css";
</style>
