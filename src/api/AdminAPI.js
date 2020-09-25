import {ajax} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
// let baseurl='/api/api';
//查询
const getAdminList=(params,success)=>{
  return ajax(baseurl+'/UserManager/GetAdminPageList',params,success);
}
//删除
const DeleteUser=(params,success)=>{
  return ajax(baseurl+'/UserManager/DeleteAdmin',params,success,'POST')
}
//添加
const AddAdmin=(params,success)=>{
  return ajax(baseurl+'/UserManager/EditAdmin',params,success,'POST')
}

const ShowAdmin=(params,success)=>{
  return ajax(baseurl+'/UserManager/GetAdminDetail',params,success)
}

export default{
  getAdminList,
  DeleteUser,
  AddAdmin,
  ShowAdmin
}
