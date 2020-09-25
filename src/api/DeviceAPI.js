import {ajax} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
// let baseurl='/api/api';
const getDeviceList=(params,success)=>{

  return ajax(baseurl+'//Home/GetDeviceTopList',params,success);
}

export default {
  getDeviceList:getDeviceList,

}
