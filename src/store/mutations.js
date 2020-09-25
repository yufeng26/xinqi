import { RECEIVE_USERINFO ,RECEIVE_Token} from './mutation-type.js';
export default {
  [RECEIVE_USERINFO](state,uinfo){

    state.userinfo=uinfo;

    sessionStorage.setItem('userinfo',JSON.stringify(uinfo))
  },

  [RECEIVE_Token](state,token){

    state.accessToken=token;
    sessionStorage.setItem('accessToken',token);
  }
}
