/*
 对话聊天的路由组件
 */
import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import './index.less';

const Item = List.Item;

export default class Chat extends Component {
  static propTypes = {
    chatMessages:PropTypes.object.isRequired,
    sendMessage:PropTypes.func.isRequired,
  }

  state = {
    message:''
  }

  handleChange = val => {
    this.setState({
      message:val
    })
  }
  goBack = () => {
    this.props.history.goBack();
  }
  sendMessage =  () => {
    const {message} = this.state;
    const from = Cookies.get('userid');
    const to = this.props.match.params.id;
    //发送消息
    this.props.sendMessage({message, from, to})
    this.setState({
      message:''
    })
  }

  render() {
    const value = this.state.message;
    const {users, chatMsgs} = this.props.chatMessages;
    const from = Cookies.get('userid');
    const to = this.props.match.params.id;
    const others = users[to];
    if(!others) return null;
    const from_to = [from, to].sort().join('-');

    const curr = chatMsgs.filter(item => item.from_to === from_to);
    curr.sort(function (a, b) {
      return Date.parse(a.createTime) - Date.parse(b.createTime);
    })

    return (
      <div id='chat-page'>
        <NavBar className="absolute" icon={<Icon type="left" onClick={this.goBack}/>}>{others.username}</NavBar>
        <List>
          {
            curr.map((item, index) => {
              if(item.from === from){
                return (
                  <Item
                    key={index}
                    className='chat-me'
                    extra='我'
                  >
                    {item.message}
                  </Item>
                )
              }else{
                return(
                  <Item
                    key={index}
                    thumb={require(`../../assets/images/avatars/头像${+others.header + 1}.png`)}
                  >
                    {item.message}
                  </Item>
                )
              }
            })
          }
        </List>

        <div className="chat-footer">
          <div className='am-tab-bar'>
            <InputItem
              value={value}
              placeholder="请输入"
              onChange={this.handleChange}
              extra={
                <span onClick={this.sendMessage}>发送</span>
              }
            />
          </div>
        </div>
      </div>
    )
  }
}