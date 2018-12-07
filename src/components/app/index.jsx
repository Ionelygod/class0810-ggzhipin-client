import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import { NavBar ,Icon} from 'antd-mobile';
import PropTypes from 'prop-types';

import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Laoban from '../../containers/laoban';
import Personal from '../../containers/personal';
import Dashen from '../../containers/dashen';
import Message from '../../containers/message';
import Footer from '../footer';
import Chat from '../../containers/chat';

import './index.less';

class App extends Component{
  static propTypes = {
    user:PropTypes.object.isRequired,
    getUserInfo:PropTypes.func.isRequired,
    getChatList:PropTypes.func.isRequired
  }
  navList = [
    {path: '/laoban', title: '大神列表', icon: 'laoban', text: '大神'},
    {path: '/dashen', title: '老板列表', icon: 'dashen', text: '老板'},
    {path: '/message', title: '消息列表', icon: 'message', text: '消息'},
    {path: '/personal', title: '个人中心', icon: 'personal', text: '个人'},
  ]

  componentDidMount(){
    this.props.getChatList();
  }
    render(){
      /*
       1. 判断本地有没有cookie，如果没有，直接去登录页面
       2. 如果本地有cookie，redux中没有状态（用户之前登录过，刷新页面），必须将数据请求回来
       3. 如果本地有cookie，redux中有状态，直接显示
       */
      // 1. 判断本地有没有cookie，如果没有，直接去登录页面
        const userid = Cookies.get('userid');
        if(!userid){
            return <Redirect to='/login'/>
        }
      // 2. 如果本地有cookie，redux中没有状态（用户之前登录过，刷新页面），必须将数据请求回来
        if(!this.props.user._id){
          this.props.getUserInfo();

          return <Icon className="loading" size="lg" type="loading" />
        }

        //3. 如果本地有cookie，redux中有状态，直接显示
        const {pathname} = this.props.location;
        if(pathname === '/'){
          return <Redirect to={this.props.user.rediectTo}/>
        }



        const currNav = this.navList.find(item => item.path === pathname)
        return (
            <div>
                {currNav?<NavBar className="nav-bar">{currNav.title}</NavBar>:null}
                <div className="app-main">
                  <Route path="/laobaninfo" component={LaobanInfo} />
                  <Route path="/dasheninfo" component={DashenInfo} />
                  <Route path="/laoban" component={Laoban} />
                  <Route path="/dashen" component={Dashen} />
                  <Route path="/personal" component={Personal} />
                  <Route path="/message" component={Message} />
                  <Route path="/chat/:id" component={Chat} />
                </div>
                {currNav ? <Footer navList={this.navList} type={this.props.user.type} /> :null}
            </div>
        )
    }
}
export default App;