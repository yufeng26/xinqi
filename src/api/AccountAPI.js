import {ajax,ajaxform} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api/';
// let baseurl='/api/api';

const login = (params,success) => {
  return ajax(baseurl+'//Account/AdminLogin',params,success,'POST');
}
const ResetPWD=(params,success)=>{
  return ajax(baseurl+'//Account/ResetPWD',params,success,'POST');
}

export default{
  login,
  ResetPWD

}

