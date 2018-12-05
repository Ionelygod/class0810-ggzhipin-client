import React,{Component} from 'react';
import { List ,Result,  WhiteSpace ,Button,  Modal} from 'antd-mobile';
import Cookies from 'js-cookie';
const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
class Personal extends Component{

  hanleLoginOut = () => {
    alert('退出登录', '确定退出???', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: () => {
        Cookies.remove('userid');
        //清除redux管理数据

        //跳转到登录页面
        this.props.history.replace('/login');
      } },
    ])

  }

    render(){
        return (
        <div>
            <Result
              img={<img src={require('../../assets/images/avatars/头像1.png')} alt="头像"/>}
              title="dashen001"
            />
            <WhiteSpace />
            <List renderHeader={() => '相关消息'}>

                <Item  multipleLine onClick={() => {}}>
                    <Brief>职位：xxx</Brief>
                    <Brief>简介：xxx</Brief>
                </Item>
            </List>
            <Button type="warning" onClick={this.hanleLoginOut}>退出登录</Button>
        </div>
        )
    }
}
export default Personal;