import React,{Component} from 'react';
import {TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import './index.less';

const Item = TabBar.Item;

class Footer extends Component{
  static propTypes = {
    navList:PropTypes.array.isRequired
  }
  rederiectTo = path => {
    this.props.history.replace(path)
  }
    render(){
          const type = 'laoban';
          const filter = type === 'laoban' ? '/dashen' : '/laoban';
          const currNavList = this.props.navList.filter(item => item.path === filter ? false: true)
        return (
             <TabBar>
               {
                 currNavList.map((item, index) => <Item
                   title={item.text}  key={index} icon={<img className="footer-img" src={require(`./images/${item.icon}.png`)} alt={item.text}/>}
                   onPress={this.rederiectTo.bind(null,item.path)}
                   selected={this.props.location.pathname === item.path}
                   selectedIcon = {<img className="footer-img" src={require(`./images/${item.icon}-selected.png`)} alt={item.text}/>}
                 />)
               }
             </TabBar>
        )
    }
}
export default withRouter(Footer);
