/**
 * Created by Fairy on 2018/12/4.
 */
import ajax from './ajax';

// const prefix = 'http://localhost/4000';
const prefix = '';

//定义注册的请求
export const reqRegister = data => ajax(`${prefix}/register`, data, 'POST');
//定义登录的请求
export const reqLogin = data => ajax(`${prefix}/login`, data, 'POST');
//定义更新用户信息的请求
export const reqUpdata = data => ajax(`${prefix}/update`, data, 'POST');
//定义获取用户信息的请求
export const reqGetUsers = () => ajax(`${prefix}/user`);
//定义获取用户列表的请求
export const reqGetUserList = type => ajax(`${prefix}/userlist`, {type});
//定义获取用户消息列表的请求
export const reqGetChatList = () => ajax(`${prefix}/msglist`);