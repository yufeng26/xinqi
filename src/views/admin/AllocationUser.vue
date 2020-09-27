<template>
  <div>
    <!-- 内容主体区域 -->
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
        <label style="width: 25%;">分组：</label>
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
        <label style="width: 40%;">性别：</label>
        <el-select v-model="SexValue" placeholder="请选择">
          <el-option
            v-for="item in Sexoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="selects">
        <label style="width: 40%;">出生日期：</label>
        <el-date-picker
          v-model="riqi"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </div>
      <button
        type="button"
        @click="handleUserList"
        style="background:#006fe5 ;margin-left: 25%;margin-right:2%"
        class="layui-btn layui-btn-normal"
      >
        开始检索
      </button>
    </div>
    <div class="bigbox">
      <div class="consult">
        <div class="tab">
          <el-table
            ref="multipleTable"
            style="width: 100%;"
            :data="userList"
            @selection-change="selectionChange"
          >
            <!-- <el-table-column v-model="checkAll"  type="selection" :indeterminate="isIndeterminate" @select-all="handleCheckAllChange" >

          </el-table-column> -->
            <el-table-column v-model="checkAll" type="selection">
            </el-table-column>
            <el-table-column label="真实姓名">
              <template slot-scope="scope">
                <img v-if="scope.row.IsGroup" src="/static/img/zu.png" />{{
                  scope.row.RealName
                }}
              </template>
            </el-table-column>
            <el-table-column label="分组" prop="GroupName"> </el-table-column>
            <el-table-column label="性别" prop="Sex"> </el-table-column>
            <el-table-column label="出生年月" prop="Birthday">
            </el-table-column>
            <el-table-column label="教育水平" prop="Education">
            </el-table-column>
            <el-table-column label="创建时间" prop="CreateTime">
            </el-table-column>
          </el-table>
          <div>
            <div class="save">
              <el-button @click.native.prevent="Save()" type="success"
                >保存</el-button
              >
              &nbsp;&nbsp;&nbsp;
              <label>已选{{ checkUserCount }}人</label>
            </div>
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
        <div id="test1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectTree from "../compeonts/treeSelect.vue";
function formatTen(num) {
  return num > 9 ? num + "" : "0" + num;
}
function formatDate(date) {
  var date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    year +
    "-" +
    formatTen(month) +
    "-" +
    formatTen(day) +
    " " +
    formatTen(hour) +
    ":" +
    formatTen(minute) +
    ":" +
    formatTen(second)
  );
}
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
      movingvisible: false,
      AdminID: "",
      SaveData: [], //所有勾选的活着取消勾选的都在这里一起提交
      a_Authorization: "",
      feipeiID: "",
      checkUserCount: 0,
      Sexoptions: [{ value: "男", label: "男" }, { value: "女", label: "女" }],
      SexValue: "",
      riqi: ""
    };
  },
  components: { SelectTree },
  mounted() {
    this.AdminID = this.$store.state.userinfo.ID;
    this.handleUserList();
    this.gettreeList();
    this.feipeiID = this.$route.query.ID; //要分配给哪个管理员该权限
    this.a_Authorization = this.$route.query.a_Authorization;
  },
  methods: {
    Save() {
      debugger;
      const selections = this.$refs.multipleTable.store.states.selection;
      this.checkUserCount = selections.length;
      //开始保存用户
      let param = new URLSearchParams();
      let CheckUser = [];

      selections.forEach((c, index) => {
        // CheckUser[index]=c.ID
        CheckUser.push(c.ID);
      });
      let that = this;
      param.append("CheckUserID", CheckUser);
      param.append("adminID", this.feipeiID);
      this.$UserAPI.FenpeiUsers(param, function(data) {
        if (data.Code == 1) {
          if (data.Result) {
            that.$message.success("保存成功!");
            that.handleUserList();
          }
        }
      });
    },
    selectionChange(selection) {
      this.checkUserCount = selection.length;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.handleUserList(); //点击第几页
    },
    handleUserList() {
      console.log(this.SexValue);
      console.log(this.riqi);
      let startTime = "";
      let endTime = "";
      console.log(this.riqi);
      if (this.riqi != null && this.riqi !== undefined && this.riqi != "") {
        startTime = formatDate(this.riqi[0]);
        endTime = formatDate(this.riqi[1]);
      }
      let v = this;
      let param = new URLSearchParams();
      param.append("searchkey", this.searchkey);
      param.append("AdminID", this.AdminID);
      param.append("groupid", this.valueId);
      param.append("sex", this.SexValue);
      param.append("startTime", startTime);
      param.append("endTime", endTime);
      param.append("pageNum", this.currentPage);
      param.append("pageSize", this.pagesize);
      this.userList = this.$UserAPI.getUserPageListByZQ(param, function(data) {
        if (data.Code == 1) {
          v.userList = data.Result.Data;
          v.totalRecords = data.Result.totalRecords;
        }
        v.$nextTick(() => {
          if (v.userList != null) {
            for (let i = 0; i < v.userList.length; i++) {
              let Authori = v.userList[i].Authorization;
              if (Authori != null) {
                if (Authori.includes(v.feipeiID)) {
                  v.$refs.multipleTable.toggleRowSelection(v.userList[i]);
                }
              }
            }
          }
        });
      });
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
      this.$UserAPI.getUserGroupList(param, function(data) {
        if (data.Code == 1) {
          v.list = data.Result;
        }
      });
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
.save {
  position: absolute;
  margin-left: 30px;
}
</style>
<style scoped>
@import "../../../static/css/user.css";
</style>
