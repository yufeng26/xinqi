import {ajax} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
// let baseurl='/api/api';

const getProductPageList=(params,success)=>{

  return ajax(baseurl+'//Product/GetProductList',params,success);
}
const AddProduct=(params,success)=>{
  return ajax(baseurl+'//Product/AddProduct',params,success,'POST');
}
const DelProduct=(params,success)=>{
  return ajax(baseurl+'//Product/DelProduct',params,success,'POST');
}
export default {
  getProductPageList:getProductPageList,
  AddProduct:AddProduct,
  DelProduct:DelProduct
}
