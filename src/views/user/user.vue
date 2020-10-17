<template>
  <!-- 用户管理列表 -->
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
        <el-col :offset="6" :span="3" class="textRight">
          <el-button type="primary" @click="handleUserList" class="secachBtn">
            开始检索
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="actionBox">
      <div class="grouping" v-if="groupvisible">
        <h2 style="color: #0070e5">创建分组</h2>
        <input type="text" v-model="newgroupid" placeholder="请输入分组名称" />

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
      </div>
      <div class="move" v-show="movingvisible">
        <h2>移动至</h2>
        <div class="movercount">
          <img style="display: block" class="xia" src="/static/img/jt.png" />
          <img style="display: none" class="shang" src="/static/img/jtup.png" />
          全部分组
        </div>
        <SelectTree
          style="width: calc(100% - 20px); margin-left: 10px; height: 305px"
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
      <div style="display: flex; justify-content: flex-start">
        <button
          type="button"
          style="background: #006fe5"
          @click="
            groupvisible = true;
            userGroupID = '';
          "
          class="layui-btn layui-btn-normal cjfz"
          v-if="menuModel.addfenzuUsable"
        >
          {{ menuModel.addfenzu }}
        </button>
        <button
          type="button"
          style="background: #20bb45"
          @click="$router.push({ name: 'adduser' })"
          class="layui-btn layui-btn-normal cjuser"
          v-if="menuModel.adduserUsable"
        >
          {{ menuModel.adduser }}
        </button>
        <button
          type="button"
          style="background: #01c8e7"
          @click="$router.push({ name: 'importuser' })"
          class="layui-btn layui-btn-normal pldr"
          v-if="menuModel.daoruUsable"
        >
          {{ menuModel.daoru }}
        </button>
        <button
          type="button"
          style="background: #006fe5"
          @click="moveArrs"
          class="layui-btn layui-btn-normal"
          v-if="menuModel.yidongUsable"
        >
          移动用户
        </button>
        <button
          type="button"
          style="background: #ff433f"
          @click="handlePLDelete"
          class="layui-btn layui-btn-normal"
          v-if="menuModel.deleteUsable"
        >
          批量删除
        </button>
      </div>
    </div>
    <div class="searchData">
      <el-table ref="multipleTable" style="width: 100%" :data="userList">
        <el-table-column
          v-model="checkAll"
          type="selection"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        ></el-table-column>
        <el-table-column label="名称" width="250">
          <template slot-scope="scope">
            <img v-if="scope.row.IsGroup" src="/static/img/zu.png" />
            {{ scope.row.RealName }}
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="CreateTime"
          :formatter="dateFormat"
          width="250"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click.native.prevent="editRow(scope.row, false)"
              v-if="menuModel.chakanUsable"
              >{{ menuModel.chakan }}</el-button
            >
            <el-button
              @click.native.prevent="moveRow(scope.row)"
              type="primary"
              size="mini"
              v-if="!scope.row.IsGroup && menuModel.yidongUsable"
              >{{ menuModel.yidong }}</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click.native.prevent="editRow(scope.row, true)"
              v-if="menuModel.updateUsable"
              >{{ menuModel.update }}</el-button
            >
            <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="danger"
              size="mini"
              v-if="menuModel.deleteUsable"
              >{{ menuModel.delete }}</el-button
            >
            <el-button
              @click.native.prevent="changePassword(scope.row)"
              type="danger"
              style="background-color: #f56cc0"
              size="mini"
              v-if="!scope.row.IsGroup"
              >重置密码</el-button
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
  </div>
</template>

<script>
import SelectTree from "../compeonts/treeSelect.vue";
export default {
  name: "user",
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

      AdminID: "",
      userGroupID: "",
      menus: [],
      menuModel: {
        addfenzu: "",
        addfenzuUsable: false,
        adduser: "",
        adduserUsable: false,
        daoru: "",
        daoruUsable: false,
        chakan: "",
        chakanUsable: false,
        update: "",
        updateUsable: false,
        yidong: "",
        yidongUsable: false,
        delete: "",
        deleteUsable: false
      }
    };
  },
  components: { SelectTree },
  created() {},
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
    this.handleUserList();
    this.gettreeList();
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
        if (c.ID == 16) {
          that.menuModel.addfenzu = c.MenuName;
          that.menuModel.addfenzuUsable = c.Usable;
        } else if (c.ID == 17) {
          that.menuModel.adduser = c.MenuName;
          that.menuModel.adduserUsable = c.Usable;
        } else if (c.ID == 18) {
          that.menuModel.daoru = c.MenuName;
          that.menuModel.daoruUsable = c.Usable;
        } else if (c.ID == 19) {
          that.menuModel.chakan = c.MenuName;
          that.menuModel.chakanUsable = c.Usable;
        } else if (c.ID == 20) {
          that.menuModel.update = c.MenuName;
          that.menuModel.updateUsable = c.Usable;
        } else if (c.ID == 21) {
          that.menuModel.yidong = c.MenuName;
          that.menuModel.yidongUsable = c.Usable;
        } else if (c.ID == 22) {
          that.menuModel.delete = c.MenuName;
          that.menuModel.deleteUsable = c.Usable;
        }
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
      this.handleUserList(); //点击每页几条
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.handleUserList(); //点击第几页
    },
    handleUserList() {
      let v = this;
      let param = new URLSearchParams();
      param.append("userName", this.searchkey);
      param.append("AdminID", this.AdminID);
      param.append("groupid", this.valueId);
      param.append("pageNum", this.currentPage);
      param.append("pageSize", this.pagesize);
      this.userList = this.$UserAPI.getUserPageList(param, function(data) {
        if (data.Code == 1) {
          v.userList = data.Result.Data;
          v.totalRecords = data.Result.totalRecords;
        }
      });
    },
    // 多人移动用户
    moveArrs() {
      var selectrows = this.$refs.multipleTable.selection;
      let isGroupArr = selectrows.filter(a => a.IsGroup);
      if (isGroupArr.length > 0) {
        this.$message({
          message: "不支持分组移出/移入分组！",
          type: "warning"
        });
      } else {
        let newarr = "";
        selectrows.forEach(function(value, index, array) {
          newarr += value.ID + ",";
        });
        if (newarr) {
          newarr = newarr.substring(0, newarr.lastIndexOf(","));
        }
        this.movingvisible = true;
        this.userid = newarr;
      }
    },
    // 表单移动用户
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
          if (row.IsGroup) {
            this.$UserAPI.PlDeleteUser(param, function(data) {
              if (data.Code == 1) {
                v.$message.success("删除成功!");
                v.handleUserList();
              }
            });
          } else {
            this.$UserAPI.DeleteUser(param, function(data) {
              if (data.Code == 1) {
                v.$message.success("删除成功!");
                v.handleUserList();
              }
            });
          }
        })
        .catch(() => {});
    },
    // 重置密码
    changePassword(row) {
      let v = this;
      let param = new URLSearchParams();
      param.append("id", row.ID);
      this.$UserAPI.resetPassword(param, function(data) {
        if (data.Code == 1) {
          v.$message.success("密码已重置为：111111");
          v.handleUserList();
        }
      });
    },
    //移动
    movehandle() {
      let v = this;
      let param = new URLSearchParams();
      param.append("UserID", this.userid);
      param.append("GroupID", this.valueId2);
      console.log(param.toString());
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
      param.append("ug_AdminID", this.AdminID);
      param.append("ug_ParentID", "0");
      param.append("ID", this.userGroupID);
      this.$UserAPI.AddGroup(param, function(data) {
        if (data.Code == 1) {
          v.$message.success(data.Msg);
          v.groupvisible = false;
          v.handleUserList();
        }
      });
    },
    //编辑查看
    editRow(row, issave) {
      if (row.IsGroup) {
        this.$router.push({
          name: "group",
          query: { GroupID: row.ID, GroupName: row.RealName }
        });
      } else {
        this.$router.push({
          name: "edituser",
          query: { ID: row.ID, issave: issave }
        });
      }
      this.groupvisible = true;
      this.newgroupid = row.RealName;
      this.userGroupID = row.ID;
    },
    editUserGroupRow(row, issave) {
      this.$router.push({ name: "group", query: { GroupID: row.ID } });
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
<style type="text/css">
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
</style>
<style scoped>
@import "../../../static/css/user.css";
@import "../../../static/css/common.css";
</style>
