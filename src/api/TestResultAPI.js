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
const PLReportResult = params => {
  return (location.href =
    baseurl + "/TestManager/ReportWordBatch/" + encodeURIComponent(params));
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
};
