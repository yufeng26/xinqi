import { ajax } from "./ajax.js";
let baseurl = "http://yun.bnuxq.com:9613/api";
// let baseurl='/api/api';
// 新的获取列表数据接口地址（张强提供2020-10-10）
const getTrainList = (params, success) => {
  return ajax(baseurl + "/reportOption/GetTrainList", params, success);
};
// 新的训练管理查看接口地址（张强提供2020-10-10）
const getTrain = (params, success) => {
  return ajax(baseurl + "/reportOption/GetTrain", params, success);
};
// 删除训练管理的列表数据
// const delResult=(params,success)=>{
//   return ajax(baseurl+'/ReportOption/DelTestReport',params,success,'POST');
// }
const delResult = (params, success) => {
  return ajax(baseurl + "/ReportOption/DelTrain", params, success);
};
// 批量删除训练管理的列表数据
// const PLdelResult=(params,success)=>{
//   return ajax(baseurl+'/ReportOption/DelTestReport',params,success,'POST');
// }
const PLdelResult = (params, success) => {
  return ajax(baseurl + "/ReportOption/DelTrain", params, success);
};
const ReportResult = params => {
  return (location.href =
    baseurl + "/exportOption/jidanahanyongbao?id=" + params);
};
// 自信心单个导出
const ReportResultZxx = params => {
  return (location.href = baseurl + "/exportOption/exportzixinxi?id=" + params);
};
const PLReportResult = params => {
  return (location.href =
    baseurl + "/PlanManager/ReportWordBatch/" + encodeURIComponent(params));
};
// 训练管理单个导出xlReportResult
const xlReportResult = params => {
  return (location.href =
    baseurl + "/exportOption/exporttestTrainPlan?id=" + params);
};
// 百思锐单个导出bsrReportResult
const bsrReportResult = params => {
  return (location.href =
    baseurl + "/exportOption/exporttestBaisirui?id=" + params);
};
export default {
  getTrainList,
  getTrain,
  delResult,
  PLdelResult,
  ReportResult,
  PLReportResult,
  ReportResultZxx,
  xlReportResult,
  bsrReportResult
};
