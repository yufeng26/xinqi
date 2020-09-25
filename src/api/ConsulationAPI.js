import {ajax} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
// let baseurl='/api/api';
const getConsultationList=(params,success)=>{

  return ajax(baseurl+'//Home/GetConsultationTopList',params,success);
}
const getConsulationPageList=(params,success)=>{
  return ajax(baseurl+'/Consult/GetPlanPageList',params,success);
}
const delConsulation=(params,success)=>{
  return ajax(baseurl+'/Consult/DelConsultResult',params,success,'POST');
}
const PLdelConsulation=(params,success)=>{
  return ajax(baseurl+'/Consult/PLDelTestResult',params,success,'POST');
}
const getConsulterDuty=(params,success)=>{
  return ajax(baseurl+'//Consult/GetConsulter',params,success);
}
const AddConsulterList=(params,success)=>{
  return ajax(baseurl+'//Consult/AddConsulterList',params,success,'POST');
}

export default {
  getConsultationList:getConsultationList,
  getConsulationPageList:getConsulationPageList,
  delConsulation:delConsulation,
  PLdelConsulation:PLdelConsulation,
  getConsulterDuty:getConsulterDuty,
  AddConsulterList:AddConsulterList

}
