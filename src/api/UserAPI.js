import { ajax, ajaxform } from "./ajax.js";
let baseurl = "http://yun.bnuxq.com:9613/api";
// let baseurl='/api/api';

const getUserInfo = (params, success) => {
  return ajax(baseurl + "//User/GetUserInfo", params, success);
};
const loginUser = (params, success) => {
  return ajax(baseurl + "/User/LoginUserInfo", params, success, "POST");
};

const getUserPageListByZQ = (params, success) => {
  return ajax(baseurl + "/UserManager/GetUserPageListByZQ", params, success);
};
const getUserPageList = (params, success) => {
  return ajax(baseurl + "/UserManager/GetUserPageList", params, success);
};
const getUserPageList2 = (params, success) => {
  return ajax(baseurl + "/UserManager/GetUserPageList2", params, success);
};
const getUserGroupList = (params, success) => {
  return ajax(baseurl + "/UserManager/GetUserGroupSelectList", params, success);
};

const DeleteUser = (params, success) => {
  return ajax(baseurl + "/UserManager/DeleteUser", params, success, "POST");
};
const MoveGroup = (params, success) => {
  return ajax(
    baseurl + "/UserManager/GetEditUserGroup",
    params,
    success,
    "POST"
  );
};
const AddGroup = (params, success) => {
  return ajax(
    baseurl + "/UserManager/CreateUserGroup",
    params,
    success,
    "POST"
  );
};
// 校验用户名去重
const deUser = (params, success) => {
  return ajax(baseurl + "/UserManager/ExistsUser", params, success);
};
// 重置用户密码
const resetPassword = (params, success) => {
  return ajax(baseurl + "/usermanager/ResetPWD", params, success, "POST");
};
const AddUser = (params, success) => {
  return ajax(baseurl + "/UserManager/CreateUser", params, success, "POST");
};
const EditUser = (params, success) => {
  return ajax(baseurl + "/UserManager/EditUser", params, success, "POST");
};
const PLCreateUser = (params, success) => {
  return ajax(baseurl + "/UserManager/PLCreateUser", params, success, "POST");
};
const UploadFile = (params, success) => {
  return ajaxform(baseurl + "/UserManager/SaveFile", params, success, "POST");
};
const ImportCUser = (params, success) => {
  return ajax(baseurl + "/UserManager/PLImportUser", params, success, "POST");
};
const GetUserDetail = (params, success) => {
  return ajax(baseurl + "/UserManager/GetUserDetail", params, success);
};
const PlDeleteUser = (params, success) => {
  return ajax(baseurl + "/UserManager/PLDeleteUser", params, success, "POST");
};
const FenpeiUsers = (params, success) => {
  return ajax(baseurl + "/UserManager/FenpeiUsers", params, success, "POST");
};

const addSystem = (params, success) => {
  return ajax(baseurl + "//system/add", params, success, "POST");
};
export default {
  getUserInfo,
  loginUser,
  getUserPageList,
  getUserPageListByZQ,
  getUserPageList2,
  getUserGroupList,
  DeleteUser,
  PlDeleteUser,
  MoveGroup,
  AddGroup,
  AddUser,
  EditUser,
  GetUserDetail,
  PLCreateUser,
  ImportCUser,
  UploadFile,
  FenpeiUsers,
  addSystem,
  deUser,
  resetPassword
};
