/**
 * Created by Fairy on 2018/12/3.
 */

/*
 作用：根据之前的状态（previousState）和更新数据的行为（action）产生一个新的状态（newState）
 */

import {combineReducers} from 'redux';
import {AUTH_SUCCESS, AUTH_ERROR} from './action-types';
const initUserState = {
  username:'',
  _id:'',
  type:'',
  errMsg:'',
  rediectTo:''
};
function user(previousState = initUserState, action) {
  switch (action.type){
    case AUTH_SUCCESS:
      return {...action.data,rediectTo:getRediectPath(action.data.type, action.data.header)}
    case AUTH_ERROR:
      return {...initUserState, ...action.data}
    default:
      return previousState;
  }
}

// const initYyy = {};
// function yyy(previousState = initYyy, action) {
//   switch (action.type){
//     default:
//       return previousState;
//   }
// }
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
  user
})