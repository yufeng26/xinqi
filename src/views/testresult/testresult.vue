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
      <el-row class="mtop15"> </el-row>
    </div>
    <div class="actionBox">
      <!-- <el-button type="primary" @click="tuantibaogao" class="secachBtn">
        团体报告
      </el-button> -->
      <el-button
        style="background: #01c8e7;"
        type="primary"
        v-if="menuModel.exportUsable"
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
      <el-table ref="multipleTable" style="width: 100%" :data="userList">
        <el-table-column
          v-model="checkAll"
          type="selection"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
        </el-table-column>
        <el-table-column label="中学生投射测验" prop="TopicName">
        </el-table-column>
        <el-table-column label="真实姓名" prop="UserName"> </el-table-column>
        <el-table-column label="总分" prop="Score"> </el-table-column>
        <el-table-column
          label="创建时间"
          :formatter="dateFormat"
          prop="CreateTime"
        >
        </el-table-column>
        <el-table-column label="操作" width="350px">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editRow(scope.row)"
              type="success"
              size="mini"
              v-if="menuModel.lookUsable"
              >{{ menuModel.look }}
            </el-button>

            <el-button
              type="warning"
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
    <!-- <div class="top">
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
      <div class="selects">
        <label style="width: 24%">项目名称：</label>
        <div class="selecount">
          <el-select :clearable="true" v-model="topicID" placeholder="请选择">
            <el-option
              v-for="item in topic"
              :key="item.ID"
              :label="item.tp_TopicName"
              :value="item.ID"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="top top_bottom">
      <div class="selects">
        <label style="width: 14%">专业</label>
        <div class="selecount">
          <el-select :clearable="true" v-model="zhuanyeId" placeholder="请选择">
            <el-option
              v-for="item in zhuanye"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="selects">
        <label style="width: 14%">性别</label>
        <div class="selecount">
          <el-select :clearable="true" v-model="xingbieID" placeholder="请选择">
            <el-option
              v-for="item in xingbie"
              :key="item.ID"
              :label="item.Name"
              :value="item.ID"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="selects">
        <label style="width: 20%">出生年月</label>
        <div class="selecount">
          <el-date-picker
            unlink-panels
            style="width: 120%"
            v-model="datelist"
            @input="dateChange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="截止日期"
          >
            clearable
          </el-date-picker>
        </div>
      </div>
      <button
        type="button"
        @click="handleUserList"
        style="background: #006fe5; margin-left: 10%"
        class="layui-btn layui-btn-normal"
      >
        开始检索
      </button>
    </div> -->
    <!-- <div class="bigbox">
      <div class="consult">
        <button type="button" style="background:#01c8e7 ;" @click="tuantibaogao" class="layui-btn layui-btn-normal">团体报告</button>
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
          @click="handlePLDelete"
          style="background: #ff433f"
          class="layui-btn layui-btn-normal"
          v-if="menuModel.deleteUsable"
        >
          批量删除
        </button>
        
      </div>
    </div> -->
  </div>
</template>

<script>
import SelectTree from "../compeonts/treeSelect.vue";
import "../../../static/css/pcenter.css";
export default {
  name: "testresult",
  data() {
    return {
      Birthday: "",
      checkAll: false,
      isIndeterminate: false,
      searchkey: "",
      groupid: "",
      topicID: "",
      datelist: [],
      deviceid: "11654bb8ffae11e9ab9b00cfe04d1a01",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [], // 表格数据
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
      //用户组数组
      list: [],
      //量表数组
      topic: [],
      AdminID: "",
      zhuanyeId: "",
      zhuanye: [
        { ID: 1, Name: "应用心理学" },
        { ID: 2, Name: "运动训练" },
        { ID: 3, Name: "运动康复" },
        { ID: 4, Name: "汉语言文学" },
        { ID: 5, Name: "新闻学体育新闻" }
      ],
      xingbieID: "",
      xingbie: [{ ID: 1, Name: "男" }, { ID: 0, Name: "女" }],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
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
    this.gettreeList();
    this.handleUserList();
    this.getTopicList();
    let lilist = document.getElementsByClassName("layui-nav-item");
    lilist[3].className = "layui-nav-item";
    lilist[5].className = "layui-nav-item layui-this";
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
        if (c.ID == 24) {
          that.menuModel.look = c.MenuName;
          that.menuModel.lookUsable = c.Usable;
        } else if (c.ID == 25) {
          that.menuModel.export = c.MenuName;
          that.menuModel.exportUsable = c.Usable;
        } else if (c.ID == 26) {
          that.menuModel.delete = c.MenuName;
          that.menuModel.deleteUsable = c.Usable;
        }
      });
    },
    //取值
    selectTime(val) {
      this.Birthday = val;
    },
    dateChange(e) {
      this.$nextTick(() => {
        this.datelist = [];
        if (e) {
          this.datelist.push(e[0]);
          this.datelist.push(e[1]);
        }
      });
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
    //全选
    handleCheckAllChange() {
      this.$refs.multipleTable.toggleAllSelection();
      this.isIndeterminate = false;
    },
    // 获取表格数据
    handleUserList() {
      let v = this;
      let param = new URLSearchParams();
      let startDate = this.$moment(this.datelist[0]).format("YYYY-MM-DD") || "";
      let endDate = this.$moment(this.datelist[1]).format("YYYY-MM-DD") || "";
      param.append("userName", this.searchkey);
      param.append("groupId", this.valueId);
      param.append("titleName", this.topicID);
      param.append("pageIndex", this.currentPage);
      param.append("pageSize", this.pagesize);
      this.userList = this.$TestResultAPI.getTestResultPageList(param, function(
        data
      ) {
        if (data.Code == 1) {
          v.userList = data.Result.Data;
          v.totalRecords = data.Result.totalRecords;
        }
      });
    },
    //获取主题下拉框
    getTopicList() {
      let v = this;
      let param = new URLSearchParams();
      param.append("deviceID", this.deviceid);
      this.$TestResultAPI.getTopicList(param, function(data) {
        if (data.Code == 1) {
          v.topic = data.Result;
        }
      });
    },

    getValue(value) {
      this.valueId = value;
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
      this.$router.push({ name: "testreport", query: { ID: row.ID } });
    },
    //团体报告
    tuantibaogao() {
      this.$router.push({ name: "testttreport" });
    }
  },
  computed: {
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    } /* 转树形数据 */
  }
};
</script>

<style scoped>
@import "../../../static/css/appraisal.css";
@import "../../../static/css/common.css";
/* /deep/ .tab {
  margin-left: 0.625rem;
} */
</style>
