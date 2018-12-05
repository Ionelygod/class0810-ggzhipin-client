import React,{Component} from 'react';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
class Message extends Component{
    render(){
        return (
        <List>
            <Item
          arrow="horizontal"
          thumb={require('../../assets/images/avatars/头像1.png')}
          multipleLine
          onClick={() => {}}
        >
            看到消息请回复<Brief>dashen001</Brief>
            </Item>
        </List>

        )
    }
}
export default Message;