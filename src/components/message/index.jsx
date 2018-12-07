import React,{Component} from 'react';
import { List } from 'antd-mobile';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const Item = List.Item;
const Brief = Item.Brief;
class Message extends Component{
  static propTypes = {
    chatMessages:PropTypes.object.isRequired
  }

  goChat = id => {
    this.props.history.push(`/chat/${id}`)
  }


    render(){
      const userid = Cookies.get('userid');
      const {users,chatMsgs} = this.props.chatMessages;
      if(!chatMsgs){
        return null;
      }
      let user_id = {};
      chatMsgs.forEach(item => {
        const othersId = item.from === userid ? item.to : item.from;
        user_id[othersId] = users[othersId];
        user_id[othersId].id = othersId;
        const time = Date.parse(item.createTime);
        if(user_id[othersId].time){
          if(user_id[othersId].time < time){
            user_id[othersId].time = time;
            user_id[othersId].message = item.message;
          }
        }else{
          user_id[othersId].time = time;
          user_id[othersId].message = item.message;
        }
      })
      const arr = Object.values(user_id);

      return (
        <List>
          {
            arr.map((item, index) =>
              <Item
                key={index}
                arrow="horizontal"
                thumb={require(`../../assets/images/avatars/头像${item.header === 'undefined' ?  0 + 1: +item.header +1 }.png`)}
                multipleLine
                onClick={this.goChat.bind(null,item.id)}
              >
                {item.username}<Brief>{item.message}</Brief>
              </Item>)
          }
        </List>
        )
    }
}
export default Message;