/**
 * Created by Fairy on 2018/12/3.
 */

/*
 作用：根据之前的状态（previousState）和更新数据的行为（action）产生一个新的状态（newState）
 */

import {combineReducers} from 'redux';
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
const initUserState = {
  username:'',
  _id:'',
  type:'',
  errMsg:'',
  rediectTo:'',
  header:'',
  post:'',
  company:'',
  salary:'',
  info:''
};
function user(previousState = initUserState, action) {
  switch (action.type){
    case AUTH_SUCCESS:
      return {...action.data,rediectTo:getRediectPath(action.data.type, action.data.header)}
    case AUTH_ERROR:
      return {...initUserState, ...action.data}
    case UPDATE_USER_INFO:
      return {...action.data,rediectTo:getRediectPath(action.data.type, action.data.header)}
    case RESET_USER_INFO:
      return {...initUserState, ...action.data}
    default:
      return previousState;
  }
}

const initUserList = [];
function userList(previousState = initUserList, action) {
  switch (action.type){
    case UPDATE_USER_LIST:
      return action.data;
    case RESET_USER_LIST:
      return [];
    default:
      return previousState;
  }
}
const initChatMessagesState = {
  users:{},
  chatMsg:[]
}
function chatMessages(previousState = initChatMessagesState, action) {
  switch (action.type){
    case GET_CHAT_MESSAGE:
      return action.data;
    case RESET_CHAT_MESSAGE:
      return initChatMessagesState;
    case UPDATE_CHAT_MESSAGE:
      return {
        users: previousState.users,
        chatMsgs: [...previousState.chatMsgs, action.data]
      };
    default :
        return previousState;
  }
}

function getRediectPath(type, header){
  let path = '';
  if(type === 'laoban'){
    path = '/laoban';
  }else{
    path = '/dashen';
  }
  if(!header){
    path += 'info';
  }
  return path;
}

export default combineReducers({
  user,
  userList,
  chatMessages
})