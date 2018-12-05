/**
 * Created by Fairy on 2018/12/3.
 */
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';  //(异步中间件)
import {composeWithDevTools} from 'redux-devtools-extension'  //redux调试工具
import reducers from './reducers';  //引入reducers函数

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));