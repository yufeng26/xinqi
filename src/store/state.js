export default {
userinfo:JSON.parse(sessionStorage.getItem('userinfo'))||{} ,

  accessToken:sessionStorage.getItem(('accessToken'))||''
}
