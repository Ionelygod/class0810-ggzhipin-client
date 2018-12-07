/**
 * Created by Fairy on 2018/12/3.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux/store';
import App from './containers/app';
import Login from './containers/login';
import Register from './containers/register';

import './assets/less/index.less';

import './test/socketio_test';

ReactDOM.render((
<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
</Provider>
),document.getElementById('app'));