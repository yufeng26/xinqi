import {ajax} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
// let baseurl='/api/api';
const getPlanSchemePageList=(params,success)=>{
  return ajax(baseurl+'/PlanManager/GetPlanPageList',params,success);
}
const delResult=(params,success)=>{
  return ajax(baseurl+'/PlanManager/DelTestResult',params,success,'POST');
}
const PLdelResult=(params,success)=>{
  return ajax(baseurl+'/PlanManager/PLDelTestResult',params,success,'POST');
}
const ReportResult=(params)=>{
  return location.href=baseurl+'/PlanManager/ReportWord/'+params;
}
const PLReportResult=(params)=>{

  return location.href=baseurl+'/PlanManager/ReportWordBatch/'+encodeURIComponent(params);


}
export default{
  getPlanSchemePageList,
  delResult,
  PLdelResult,
  ReportResult,
  PLReportResult
}
