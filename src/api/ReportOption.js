import {ajax,ajaxform} from './ajax.js'
let baseurl='http://yun.bnuxq.com:9613/api';
//获取百思锐所有的报表
const GetBaisiruiList = (params,success) => {
    return ajax(baseurl+'//ReportOption/GetBaisiruiList',params,success);
  }
  //获取百思锐某个报表的详情信息
  const GetBaisiruiReport = (params,success) => {
    return ajax(baseurl+'//ReportOption/GetBaisiruiReport',params,success);
  }
//用于接收百思锐终端推送的报告
  const PushBaisiruiReport = (params,success) => {
    return ajax(baseurl+'//ReportOption/PushBaisiruiReport',params,success,'POST');
  
  }
  export default{
    GetBaisiruiList,
    GetBaisiruiReport,
    PushBaisiruiReport
  }