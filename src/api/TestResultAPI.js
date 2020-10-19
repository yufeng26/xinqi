import { ajax, postRequest, getRequest } from "./ajax.js";
let baseurl = "http://yun.bnuxq.com:9613/api";
// let baseurl='/api/api';
// 老接口测评列表
// const getTestResultPageList = (params, success) => {
//   return ajax(baseurl + "/TestManager/GetTestResultPageList", params, success);
// };
//击打、呐喊、拥抱、自信息列表信息
const getReportResultList = (params, success) => {
  return ajax(baseurl + "/ReportOption/GetReportResultList", params, success);
};
//击打、呐喊、拥抱、自信息详情信息
const getReportResult = (params, success) => {
  return ajax(baseurl + "/ReportOption/GetReportResult", params, success);
};
// 测评管理新接口
const getTestResultPageList = (params, success) => {
  return ajax(baseurl + "/reportOption/GetCepingList", params, success);
};
const getTopicList = (params, success) => {
  return ajax(baseurl + "/TestManager/GetTopciByDeviceID", params, success);
};
// 新增获取各种模块，搜索下拉列表名称
// rtype = 1.测评管理名称 2.测评软件名称 3.百思锐名称 4.呐喊宣泄主题 5.拥抱主题 6，自信心 7.击打
const getNameList = (params, success) => {
  return ajax(baseurl + "/ReportOption/GetConditionList", params, success);
};

// 老的获取测评报告详情接口
// const getResultDetail=(params,success)=>{
//   return ajax(baseurl+'/TestManager/GetTestResult',params,success);
// }
// 新的获取测评报告详情接口地址（张强提供2020-09-29）
const getResultDetail = (params, success) => {
  return ajax(baseurl + "/reportOption/GetTestReport", params, success);
};

const delResult = (params, success) => {
  return ajax(baseurl + "/ReportOption/DelTestReport", params, success);
};
const PLdelResult = (params, success) => {
  return ajax(baseurl + "/ReportOption/DelTestReport", params, success);
};
const ReportResult = params => {
  return (location.href = baseurl + "/TestManager/ReportWord/" + params);
};
// 测评软件单个导出
const cpReportResult = params => {
  return (location.href =
    baseurl + "/exportOption/exporttestReport?id=" + params);
};
const PLReportResult = params => {
  return (location.href =
    baseurl + "/TestManager/ReportWordBatch/" + encodeURIComponent(params));
};
// 测评管理单个导出ReportResultCpm
const ReportResultCpm = params => {
  return (location.href =
    baseurl + "/exportOption/exporttestMansger?id=" + params);
};
export default {
  getReportResultList,
  getReportResult,
  getTestResultPageList,
  getTopicList,
  delResult,
  PLdelResult,
  getResultDetail,
  ReportResult,
  PLReportResult,
  getNameList,
  cpReportResult,
  ReportResultCpm
};
