import React,{Component} from 'react';
import {TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import './index.less';

const Item = TabBar.Item;

class Footer extends Component{
  static propTypes = {
    navList:PropTypes.array.isRequired,
    type:PropTypes.string.isRequired
  }
  rederiectTo = path => {
    this.props.history.replace(path)
  }
    render(){
          const filter = this.props.type === 'laoban' ? '/dashen' : '/laoban';
          const currNavList = this.props.navList.filter(item => item.path === filter ? false: true)
        return (
             <TabBar className="footer-main" >
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
