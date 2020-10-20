import { ajax, ajaxform } from "./ajax.js";
let baseurl = "http://yun.bnuxq.com:9613/api";
const addSystem = (params, success) => {
  return ajax(baseurl + "//SysTem/Add", params, success, "POST");
};
const getSystem = (params, success) => {
  return ajax(baseurl + "//SysTem/Get", params, success);
};

const deleteSystem = (params, success) => {
  return ajax(baseurl + "//SysTem/Delete", params, success, "POST");
};
const GetLimitsList = (params, success) => {
  return ajax(baseurl + "//SysTem/GetLimitsList", params, success);
};
const SaveLimit = (params, success) => {
  return ajax(baseurl + "//SysTem/SetLimits", params, success, "POST");
};
const CheckAuthority = (params, success) => {
  return ajax(baseurl + "//SysTem/CheckAuthority", params, success);
};
const exportExcelError = (params, success) => {
  return (location.href = baseurl + "//SysTem" + params);
};
export default {
  addSystem,
  getSystem,
  deleteSystem,
  GetLimitsList,
  SaveLimit,
  CheckAuthority,
  exportExcelError
};
