import {ajax} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
// let baseurl='/api/api';
const getPlanList=(params,success)=>{

  return ajax(baseurl+'//Home/GetPlanTopList',params,success);
}

export default {
  getPlanList:getPlanList,

}
