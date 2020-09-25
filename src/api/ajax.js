import Axios from 'axios'
import qs from 'qs'

  //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
  let token=sessionStorage.getItem('accessToken');
  if (token){


    Axios.defaults.headers.common['Authorization'] = token;
  }



function ajax(url = '', data = {}, success, type = 'GET')
{


  let promise;
  if (type === "GET") {

    if (!!url) {


      // let header = new URLSearchParams()
      // header.append('Authorization', localStorage.getItem('accessToken'))
      promise = Axios.get(url + '?' + data.toString(), {
        params: null

      })


    }
  } else {
    // let header = new URLSearchParams()
    // header.append('Authorization', localStorage.getItem('accessToken'))

    promise = Axios.request({url:url,data:data, method:"POST"}
    )

  }
  promise.then(response => {

      return success(response.data)


  }).catch(err => {

      return success(err);

  })
}
function ajaxform(url = '', data = {}, success, type = 'POST')
{


  let promise;

    let header = new URLSearchParams()
    header.append('Authorization', localStorage.getItem('accessToken'))
  header.append('Content-Type','multipart/form-data')
    promise = Axios.request({url:url,data:data, method:"POST",headers:header}
    )


  promise.then(response => {

    return success(response.data)
  }).catch(err => {
    return success(err);
  })
}
function getRequest(apiPath, params, successCallback, errorCallback) {
  let url =  apiPath
  let req = Axios.get(url, {
    params: params,
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
  thenResponse(req, successCallback, errorCallback)
}
function postRequest(apiPath, params, successCallback, errorCallback) {
  let url = apiPath

  let req = Axios.post(url, qs.stringify(params),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  thenResponse(req, successCallback, errorCallback)
}
function thenResponse (axiosRequest, successCallback, errorCallback) {
  axiosRequest.then((res) => {
    if (res.status === 200) {
      res = res.data
      if (res.code === 0) {
        if (successCallback) successCallback(res)
      } else {
        if (errorCallback) errorCallback(res.code, res.msg)
      }
    }
  }).catch((error) => {
    if (errorCallback) errorCallback(-1, error.message)
  })
}
export  {
  ajax,
  getRequest,
  postRequest,
  ajaxform

}
