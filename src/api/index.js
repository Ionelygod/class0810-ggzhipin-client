/**
 * Created by Fairy on 2018/12/4.
 */
import ajax from './ajax';

// const prefix = 'http://localhost/4000';
const prefix = '';

export const reqRegister = data => ajax(`${prefix}/register`, data, 'POST');
export const reqLogin = data => ajax(`${prefix}/login`, data, 'POST');