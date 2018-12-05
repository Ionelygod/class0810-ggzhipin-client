/**
 * Created by Fairy on 2018/12/3.
 */
/*
* 作用：包含多个用来创建action的action crearots
* 类别：
*   1，同步 action creator
*       返回值是对象
*   2，异步 action creator
*       返回值是函数 dispatch => {xxx}
* */
import {AUTH_SUCCESS, AUTH_ERROR} from './action-types';
import {reqRegister, reqLogin, reqUpdata} from '../api';
export const authSuccess = data => ({type:AUTH_SUCCESS, data});
export const authError = data => ({type:AUTH_ERROR, data});


export const register = ({username, password, rePassword, type}) =>{
//表单验证
  if(!username){
    return authError({errMsg:'请输入用户名'});
  }else if(!password){
    return authError({errMsg:'请输入密码'});
  }else if(rePassword !== password){
    return authError({errMsg:'两次密码不一致'});
  }

  return dispatch => {
    reqRegister({username, password, type})
      .then(({data}) => {
        if(data.code === 0){
          dispatch(authSuccess(data.data))
        }else{
          dispatch(authError({errMsg:data.msg}))
        }
      })
      .catch(err => {
        dispatch(authError({errMsg:'网络不稳定，请刷新重试'}))
      })
  }
}
export const login = ({username,password}) => {
  if(!username){
    return authError({errMsg:'用户名不存在或密码不正确'})
  }else if(!password){
    return authError({errMsg:'用户名不存在或密码不正确'})
  }
  return dispatch => {
    reqLogin({username, password})
      .then(({data}) => {
        if(data.code === 0){
          dispatch(authSuccess(data.data))
        }else{
          return dispatch(authError({errMsg:'用户名不存在或密码不正确'}))
        }
      })
      .catch(err => {
        dispatch(authError({errMsg:'网络错误，请刷新重试'}))
      })
  }
}
export const updata = ({header, post, company, salary, info,type}) => {
  if(!header){
    return authError({errMsg:'请选择头像'})
  }else if(!post){
    return authError({errMsg: type === 'laoban'? '请填写职位':'请填写求职岗位'})
  }else if(type === 'laoban' && !company){
    return authError({errMsg:'请填写公司'})
  }else if(type === 'laoban' && !salary){
    return authError({errMsg:'请填写职位薪资'})
  }else if(!info){
    return authError({errMsg: type === 'laoban'?'请填写职位要求':'请填写个人介绍'})
  }

  return dispatch => {
    reqUpdata({header, post, company, salary, info})
      .then(({data}) => {
        if(data.code === 0){
          dispatch(authSuccess(data.data))
        }else{
          dispatch(authError({errMsg:data.msg}))
        }
    })
      .catch(err => {
        dispatch(authError({errMsg:'网络错误，请刷新重试'}));
      })
  }

}
