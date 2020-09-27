import { ajax } from "./ajax.js";
let baseurl = "http://yun.bnuxq.com:9613/api";
// let baseurl='/api/api';
const getReportList = (params, success) => {
  return ajax(baseurl + "/Home/GetTestTopList", params, success);
};

export default {
  getReportList: getReportList
};
