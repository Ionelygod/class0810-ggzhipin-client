import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import { NavBar } from 'antd-mobile';

import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Laoban from '../laoban';
import Dashen from '../dashen';
import Personal from '../personal';
import Message from '../message';
import Footer from '../footer';

class App extends Component{
  navList = [
    {path: '/laoban', title: '大神列表', icon: 'laoban', text: '大神'},
    {path: '/dashen', title: '老板列表', icon: 'dashen', text: '老板'},
    {path: '/message', title: '消息列表', icon: 'message', text: '消息'},
    {path: '/personal', title: '个人中心', icon: 'personal', text: '个人'},
  ]
    render(){
        const userid = Cookies.get('userid');
        if(!userid){
            return <Redirect to='/login'/>
        }
        const {pathname} = this.props.location;
        const currNav = this.navList.find(item => item.path === pathname)
        return (
            <div>
                {currNav?<NavBar>{currNav.title}</NavBar>:null}
                <Route path="/laobaninfo" component={LaobanInfo} />
                <Route path="/dasheninfo" component={DashenInfo} />
                <Route path="/laoban" component={Laoban} />
                <Route path="/dashen" component={Dashen} />
                <Route path="/personal" component={Personal} />
                <Route path="/message" component={Message} />
                {currNav ? <Footer navList={this.navList} /> :null}
            </div>
        )
    }
}
export default App;