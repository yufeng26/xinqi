<template>
  <div>
    <!-- 内容主体区域 -->
    <div class="top">
      <h3 class="gropName">分组名称：{{ showGropName }}</h3>
      <button
        type="button"
        @click="goBank()"
        style="background: #006fe5; margin-left: 50%"
        class="layui-btn layui-btn-normal"
      >
        返回
      </button>
    </div>
    <div class="kong"></div>
    <div class="bigbox">
      <div class="consult">
        <!-- <div class="grouping" v-if="groupvisible">
          <h2 style="color: #0070e5">创建分组</h2>
          <input
            type="text"
            v-model="newgroupid"
            placeholder="请输入分组名称"
          />

          <button
            type="button"
            style="background: #006fe5; width: 40%"
            @click="addgrouphanlde"
            class="layui-btn layui-btn-normal"
          >
            确定
          </button>
          <button
            type="button"
            style="background: #006fe5; width: 40%"
            @click="groupvisible = false"
            class="layui-btn layui-btn-normal returnd"
          >
            返回
          </button>
        </div> -->
        <div class="move" v-show="movingvisible">
          <h2>移动至</h2>
          <div class="movercount">
            <img style="display: block" class="xia" src="/static/img/jt.png" />
            <img
              style="display: none"
              class="shang"
              src="/static/img/jtup.png"
            />
            全部分组
          </div>
          <SelectTree
            style="width: 94%; margin: 0 auto 20px; height: 305px"
            :props="props2"
            :options="optionData"
            :value="valueId2"
            :clearable="isClearable"
            :accordion="isAccordion"
            @getValue="getValue2($event)"
          />

          <button
            type="button"
            style="background: #258dff; margin-left: 30px; width: 40%"
            @click="movehandle"
            class="layui-btn layui-btn-normal ensure"
          >
            确定
          </button>
          <button
            type="button"
            style="background: #9571f9; width: 40%"
            @click="movingvisible = false"
            class="layui-btn layui-btn-normal reve"
          >
            返回
          </button>
        </div>
        <!-- <div style="display: flex; justify-content: flex-start">
          <button
            type="button"
            style="background: #006fe5"
            @click="groupvisible = true"
            class="layui-btn layui-btn-normal cjfz"
            v-if="menuModel.addfenzuUsable"
          >
            {{ menuModel.addfenzu }}
          </button>
          <button
            type="button"
            style="background: #ff433f"
            @click="handlePLDelete"
            class="layui-btn layui-btn-normal"
            v-if="menuModel.deleteUsable"
          >
            {{ menuModel.delete }}
          </button>
        </div> -->

        <div class="tab">
          <el-table ref="multipleTable" style="width: 100%" :data="userList">
            <el-table-column
              v-model="checkAll"
              type="selection"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            ></el-table-column>
            <el-table-column label="用户名">
              <template slot-scope="scope">
                <img v-if="scope.row.IsGroup" src="/static/img/zu.png" />
                {{ scope.row.RealName }}
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="CreateTime"
              :formatter="dateFormat"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  @click.native.prevent="editRow(scope.row, false)"
                  >查看</el-button
                >
                <el-button
                  @click.native.prevent="moveRow(scope.row)"
                  type="primary"
                  >移动</el-button
                >
                <el-button
                  type="warning"
                  @click.native.prevent="editRow(scope.row, true)"
                  >编辑</el-button
                >
                <el-button
                  @click.native.prevent="deleteRow(scope.row)"
                  type="danger"
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
          ></el-pagination>
        </div>
        <div id="test1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectTree from "../compeonts/treeSelect.vue";
export default {
  name: "group",
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      searchkey: "",
      groupid: "",
      newgroupid: "",
      userid: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
      totalRecords: 0,
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: "",
      valueId2: "", // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children"
        // disabled:true
      },
      props2: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children"
        // disabled:true
      },
      list: [],
      groupvisible: false,
      movingvisible: false,
      addgroupid: "",
      showGropName: "",
      AdminID: "",
      menuModel: {
        addfenzu: "",
        addfenzuUsable: false,
        delete: "",
        deleteUsable: false
      }
    };
  },
  components: { SelectTree },
  created() {},
  mounted() {
    this.AdminID = this.$store.state.userinfo.ID;
    this.addgroupid = this.$route.query.GroupID;
    this.showGropName = this.$route.query.GroupName;
    let that = this;
    let param = new URLSearchParams();
    param.append("adminID", this.AdminID);
    param.append("ViewPath", "/user");
    this.$SystemAPI.CheckAuthority(param, function(data) {
      if (data.Code == 1) {
        that.setmenuModel(data.Result);
      }
    });
    this.handleUserList();
    this.gettreeList();
  },
  methods: {
    // 返回上一页
    goBank() {
      this.$router.push("/user");
    },
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
        if (c.ID == 16) {
          that.menuModel.addfenzu = c.MenuName;
          that.menuModel.addfenzuUsable = c.Usable;
        } else if (c.ID == 22) {
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
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.handleUserList(); //点击第几页
    },
    handleUserList() {
      let v = this;
      let param = new URLSearchParams();
      // param.append("searchkey", this.searchkey);

      param.append("groupid", this.addgroupid);
      param.append("pageNum", this.currentPage);
      param.append("pageSize", this.pagesize);
      this.userList = this.$UserAPI.getUserPageList2(param, function(data) {
        if (data.Code == 1) {
          v.userList = data.Result.Data;
          v.totalRecords = data.Result.totalRecords;
        }
      });
    },
    moveRow(row) {
      this.movingvisible = true;
      this.userid = row.ID;
    },
    //获取值
    getValue(value) {
      this.valueId = value;
    },
    getValue2(value) {
      this.valueId2 = value;
    },
    //全选
    handleCheckAllChange() {
      this.$refs.multipleTable.toggleAllSelection();
      this.isIndeterminate = false;
    },
    //用户分组
    gettreeList() {
      let v = this;

      let param = new URLSearchParams();
      param.append("adminID", this.AdminID);
      this.$UserAPI.getUserGroupList(param, function(data) {
        if (data.Code == 1) {
          v.list = data.Result;
          v.list2 = data.Result2;
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
          this.$UserAPI.PlDeleteUser(params, function(data) {
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
          this.$UserAPI.DeleteUser(param, function(data) {
            if (data.Code == 1) {
              v.$message.success("删除成功!");
              v.handleUserList();
            }
          });
        })
        .catch(() => {});
    },
    //移动
    movehandle() {
      let v = this;
      let param = new URLSearchParams();
      param.append("UserID", this.userid);
      param.append("GroupID", this.valueId2);
      this.$UserAPI.MoveGroup(param, function(data) {
        if (data.Code == 1) {
          v.$message.success("移动成功!");
          v.movingvisible = false;
          v.handleUserList();
        }
      });
    },
    //添加分组
    addgrouphanlde() {
      let v = this;
      let param = new URLSearchParams();
      param.append("ug_GroupName", this.newgroupid);

      param.append("ug_ParentID", "0");
      this.$UserAPI.AddGroup(param, function(data) {
        if (data.Code == 1) {
          v.$message.success("创建成功!");
          v.groupvisible = false;
          v.handleUserList();
        }
      });
    },
    //编辑查看
    editRow(row, issave) {
      if (row.IsGroup) {
        this.$router.push({ name: "group", query: { GroupID: row.ID } });
      } else {
        this.$router.push({
          name: "edituser",
          query: { ID: row.ID, issave: issave }
        });
      }
    }
  },
  computed: {
    /* 转树形数据 */
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      let addItem = {
        id: "",
        name: "无分组",
        parentId: "0"
      };
      cloneData.unshift(addItem);
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

<style type="text/css">
.gropName {
  color: #006fe5;
  font-size: 18px;
}
.kong {
  width: 100%;
  height: 15px;
  background: #ebebeb;
}
.liand select {
  border: 1px solid #006fe5;
}

.selects {
  width: 60%;
}

.selects label {
  width: 5%;
}

.wrap {
  width: 100%;
}

.global_location {
  width: 100%;
}

.selects select {
  width: 18%;
}

.del {
  width: 20%;
  height: 230px;
  background: #ffffff;
  border-radius: 5px;
  position: fixed;
  top: 40%;
  left: 40%;
  box-shadow: 3px 3px 3px #cccccc;
  border: 1px solid #f2f2f2;
  display: none;
}

.del .deltit {
  height: 40px;
  font-size: 18px;
  color: #fff;
  background: #0070e5;
  text-align: center;
  line-height: 40px;
  margin-bottom: 34px;
}

.del p {
  width: 100%;
  padding-bottom: 15px;
  text-align: center;
}

.del .resume {
  display: flex;
  justify-content: space-around;
}

.del .resume button {
  width: 30%;
  font-size: 16px;
}

.deltwo {
  width: 20%;
  height: 230px;
  background: #ffffff;
  border-radius: 5px;
  position: fixed;
  top: 40%;
  left: 40%;
  box-shadow: 3px 3px 3px #cccccc;
  border: 1px solid #f2f2f2;
  display: none;
}

.deltwo .deltit {
  height: 40px;
  font-size: 18px;
  color: #fff;
  background: #0070e5;
  text-align: center;
  line-height: 40px;
  margin-bottom: 34px;
}

.deltwo p {
  width: 100%;
  padding-bottom: 15px;
  text-align: center;
}

.deltwo .resume {
  display: flex;
  justify-content: center;
  padding-top: 30px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
<style scoped>
@import "../../../static/css/user.css";
</style>
