<template>
<div>
  <el-table :data="productlist" border style="width: 100%">
    <el-table-column prop="id" label="id"></el-table-column>
    <el-table-column prop="sell_price" label="销售价"></el-table-column>
    <el-table-column prop="market_price" label="市场价"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="stock_quantity" label="库存"></el-table-column>
    <el-table-column prop="goods_no" label="商品编号"></el-table-column>
    <el-table-column prop="add_time" label="添加时间"></el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="addproduct(scope.$index, scope.row)">添加</el-button>
        <el-button type="primary" size="small" @click="showproduct(scope.$index, scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="编辑产品信息" :visible="editstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
    <el-form ref="editsForm" :model="editsForm" label-width="80px">
      <el-form-item label="序号">
        <el-input  v-model="editsForm.id" max-length="10" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="市场价">
        <el-input v-model="editsForm.market_price"></el-input>
      </el-form-item>
      <el-form-item label="销售价">
        <el-input v-model="editsForm.sell_price"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="editsForm.title"></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="editsForm.stock_quantity"></el-input>
      </el-form-item>


      </el-form-item>
      <el-form-item label="商品编号">
        <el-input v-model="editsForm.goods_no"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="productEdit()">确定</el-button>
        <el-button @click="editstudentForm = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog title="新增产品信息" :visible="addstudentForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
    <el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">

      <el-form-item label="销售价" prop="name">
        <el-input v-model="addsForm.sell_price"></el-input>
      </el-form-item>
      <el-form-item label="市场价" prop="age">
        <el-input v-model="addsForm.market_price"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="sex">
        <el-input v-model="addsForm.title"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="major">
        <el-input v-model="addsForm.stock_quantity"></el-input>
      </el-form-item>
      <el-form-item label="商品编号" prop="depart">
        <el-input v-model="addsForm.goods_no"></el-input>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="productAdd()">确定</el-button>
        <el-button @click="addstudentForm = false;">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>


</div>

</template>



//编辑产品信息模态

<script>
    export default {
        name: "product",
      data(){
          return{
            productlist:[],
            selected:0,
            selectedlist:{},
            addstudentForm:false,
            editstudentForm:false,

            addsForm:{
              id:0,
              sell_price:0,
              market_price:0,
              stock_quantity:0,
              title:'',
              goods_no:0,
              add_time:''
            },

            editsForm:{
              id:0,
              sell_price:0,
              market_price:0,
              stock_quantity:0,
              title:'',
              goods_no:0,
              add_time:''
            }
          }

      },
      created(){
        this.getproduct();
      },
      methods:{

          getproduct(){
            let that=this;
            let param = new URLSearchParams()
            this.$ProductAPI.getProductPageList(param,function (data) {
              that.productlist=data;
            })
          },
addproduct(index,row){
            this.addstudentForm=true;

},
        productAdd(){
            let product=this.addsForm;
            let that=this;
            if (product.goods_no==0||product.title==''||product.market_price==0||product.sell_price==0||product.stock_quantity==0) {
              this.$message({
                message:'新增内容每一项都不为空!',
                type: 'success'
              });
            }else  {
              let param = new URLSearchParams();
              param.append('id',product.id);
              param.append('goods_no',product.goods_no);
              param.append('title',product.title);
              param.append('market_price',product.market_price);
              param.append('sell_price',product.sell_price);
              param.append('stock_quantity',product.stock_quantity)
              this.$ProductAPI.AddProduct(param,function (data) {
                if (data=='ok'){
                  that.$message({
                    message:'新增成功!',
                    type: 'success'
                  });
                  that.addstudentForm=false;
                  that.getproduct();
                } else {
                  that.$message.error('新增失败!'+data);
                }
              })
            }
        },
        showproduct(index,row){
this.editstudentForm=true;
this.editsForm=row;
        },
        productEdit(){},

        del(){},
        closeDialog(){
            this.editstudentForm=false;
            this.addstudentForm=false;
        }
      },

    }
</script>

<style scoped>

</style>
