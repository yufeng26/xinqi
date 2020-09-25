import {ajax,postRequest,getRequest} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
// let baseurl='/api/api';

const getTestResultPageList=(params,success)=>{
  return ajax(baseurl+'/TestManager/GetTestResultPageList',params,success);
}
const getTopicList=(params,success)=>{
  return ajax(baseurl+'/TestManager/GetTopciByDeviceID',params,success);
}
const getResultDetail=(params,success)=>{
  return ajax(baseurl+'/TestManager/GetTestResult',params,success);
}
const delResult=(params,success)=>{
  return ajax(baseurl+'/TestManager/DelTestResult',params,success,'POST');
}
const PLdelResult=(params,success)=>{
  return ajax(baseurl+'/TestManager/PLDelTestResult',params,success,'POST');
}
const ReportResult=(params)=>{
  return location.href=baseurl+'/TestManager/ReportWord/'+params;
}
const PLReportResult=(params)=>{
  return location.href=baseurl+'/TestManager/ReportWordBatch/'+encodeURIComponent(params);

}
export default{
  getTestResultPageList,
  getTopicList,
  delResult,
  PLdelResult,
  getResultDetail,
  ReportResult,
  PLReportResult
}
