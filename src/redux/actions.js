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
import io from 'socket.io-client'
import {AUTH_SUCCESS,
  AUTH_ERROR,
  UPDATE_USER_INFO,
  RESET_USER_INFO,
  UPDATE_USER_LIST,
  RESET_USER_LIST,
  GET_CHAT_MESSAGE,
  RESET_CHAT_MESSAGE,
  UPDATE_CHAT_MESSAGE
} from './action-types';
import {
  reqRegister,
  reqLogin,
  reqUpdata,
  reqGetUsers,
  reqGetUserList,
  reqGetChatList
} from '../api';
export const authSuccess = data => ({type:AUTH_SUCCESS, data});
export const authError = data => ({type:AUTH_ERROR, data});
export const updateUserInfo = data => ({type:UPDATE_USER_INFO,data})
export const resetUserInfo = data => ({type:RESET_USER_INFO,data})
export const updataUserList = data => ({type:UPDATE_USER_LIST,data})
export const resetUserList = () => ({type:RESET_USER_LIST})

export const getChatMessage = data => ({type:GET_CHAT_MESSAGE,data})
export const resetChatMessage = () => ({type:RESET_CHAT_MESSAGE})
export const updateChatMessage = data => ({type:UPDATE_CHAT_MESSAGE,data})



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
export const getUserInfo = () => {
   return  dispatch => {
    reqGetUsers()
      .then(({data}) => {
        if(data.code === 0){
          dispatch(updateUserInfo(data.data));
        }else{
          dispatch(resetUserInfo({errMsg:data.msg}))
        }
      })
      .catch(err => {
        dispatch(resetUserInfo({errMsg:'网络错误，请刷新重试~'}))
      })
  }
}
export const getUserList = type => {
  return dispatch => {
    reqGetUserList(type)
      .then(({data}) =>{
        if(data.code === 0){
          dispatch(updataUserList(data.data))
        }else{
          dispatch(resetUserList())
        }
      })
      .catch(err => {
        dispatch(resetUserList())
      })
  }
}
// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:5000')
// 绑定'receiveMessage'的监听, 来接收服务器发送的消息
// socket.on('receiveMsg', function (data) {
//   console.log('浏览器端接收到消息:', data)
// })
export const sendMessage = ({message,from, to}) => {
  return dispatch => {
    // 向服务器发送消息
    socket.emit('sendMsg', {message,from, to})
    console.log('浏览器端向服务器发送消息:', {message,from, to})
    if(!socket.isFirst){
      socket.isFirst = true;
      socket.on('receiveMsg', function (data) {
        console.log('浏览器端接收到消息:', data)
        dispatch(updateChatMessage(data));
      })
    }


  }
}

export const getChatList = () => {
  return dispatch => {
    reqGetChatList()
      .then(({data}) => {
        if(data.code === 0){
          dispatch(getChatMessage(data.data))
        }else{
          dispatch(resetChatMessage())
        }
      })
      .catch(err => {
        dispatch(resetChatMessage())
      })
  }
}