<template>
  <!-- 内容主体区域 -->
  <div class="bigbox" style="padding:0 10px;">
    <div class="report">
      <h3>数据库管理</h3>
      <p style="display:flex;justify-content: flex-start;">
        <button type="button" @click="recovery" style="background:#0070e5;margin: 20px 0;" class="layui-btn layui-btn-normal">备份</button>
        <span style="color: red;margin: 30px 0;">*特别提示：建议您定期备份数据库，一面重要的数据遗失！</span>
      </p>

      <div class="tab">
        <el-table style="width: 100%;"
                  :data="userList"
        >
          <el-table-column type="index" >
          </el-table-column>
          <el-table-column label="名称" prop="db_BakName" >
          </el-table-column>

          <el-table-column label="相关操作" >
            <template slot-scope="scope">
              <el-button @click.native.prevent="editRow(scope.row)" type="success" >恢复</el-button>

              <el-button @click.native.prevent="downloadRow(scope.row)" type="warning" >下载</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" >删除</el-button>
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
          :total="totalRecords">
        </el-pagination>
      </div>
      <div id="test1"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "backup",
      data(){
          return {
            currentPage:1, //初始页
            pagesize:10,    //    每页的数据
            userList: [],
            totalRecords:0
          }
      },
      methods:{
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(size) {
          this.pagesize = size;
          console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange(currentPage){
          this.currentPage = currentPage;
          this.handleUserList();  //点击第几页
        },
        handleUserList() {
          let v=this;
          let param = new URLSearchParams();
          param.append('pageNum', this.currentPage)
          param.append('pageSize',this.pagesize)
          this.userList=this.$BackupAPI.getBackupList(param,function(data){

            if (data.Code==1) {


              v.userList=data.Result.Data;
              v.totalRecords=data.Result.totalRecords;
            }
          });

        },
        //单个删除
        deleteRow(row){
          let v=this;this.$confirm('确认要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = new URLSearchParams();
            param.append('ID',row.ID)

            this.$BackupAPI.DeleteBackup(param,function (data) {


              if (data.Code == 1){
                v.$message.success('删除成功!');
                v.handleUserList();


              }

            })
          }).catch(() => {
          });

        },
        //恢复
        editRow(row){
          let v=this;
          let param = new URLSearchParams();
          param.append('db_BakName',row.db_DataUrl)
         this.$BackupAPI.RecoveryBackups(param,function (data) {
           if (data.Code == 1){
             v.$message.success('恢复成功!');
             v.handleUserList();


           }

         });


        },
        //下载
        downloadRow(row){
        this.$BackupAPI.DownloadBackups(row.db_DataUrl);




        },
        //备份
        recovery(){
          let v=this;
          let param = new URLSearchParams();
          this.$BackupAPI.GenerateBackups (param,function (data) {
            if (data.Code == 1){
              v.$message.success('备份成功!');
              v.handleUserList();


            }

          });
        }
      },mounted(){
        this.handleUserList();
      }
    }
</script>

<style scoped>
  @import "../../../static/css/backup.css";
</style>
