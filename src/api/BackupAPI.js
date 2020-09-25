import {ajax} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
// let baseurl='/api/api';
//查询
const getBackupList=(params,success)=>{
  return ajax(baseurl+'/UserManager/GetDatabakPageList',params,success);
}
//删除
const DeleteBackup=(params,success)=>{
  return ajax(baseurl+'/UserManager/DeleteDatabak',params,success,'POST')
}
//恢复备份
const RecoveryBackups=(params,success)=>{
  return ajax(baseurl+'/UserManager/RecoveryBackups',params,success,'POST')
}
//生成备份
const GenerateBackups=(params,success)=>{
  return ajax(baseurl+'/UserManager/GenerateBackups',params,success,'POST')
}
//下载备份
const DownloadBackups=(params)=>{
  return location.href=baseurl.substring(0,baseurl.lastIndexOf('/')+1)+params;
}

export default{
  getBackupList,
  DeleteBackup,
  RecoveryBackups,
  GenerateBackups,
  DownloadBackups
}
