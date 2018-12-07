import React,{Component} from 'react';
import { List ,Result,  WhiteSpace ,Button,  Modal} from 'antd-mobile';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const alert = Modal.alert;
const Item = List.Item;
const Brief = Item.Brief;
class Personal extends Component{
  static propTypes = {
    user:PropTypes.object.isRequired,
    resetUserInfo:PropTypes.func.isRequired,
    resetUserList:PropTypes.func.isRequired
  }

  hanleLoginOut = () => {
    alert('退出登录', '确定退出???', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: () => {
        Cookies.remove('userid');
        //清除redux管理数据
          this.props.resetUserInfo();
          this.props.resetUserList();
        //跳转到登录页面
        this.props.history.replace('/login');
      } },
    ])

  }

    render(){
        return (
        <div>
            <Result
              img={<img src={require(`../../assets/images/avatars/头像${+this.props.user.header + 1}.png`)} alt="头像"/>}
              title={this.props.user.username}
            />
            <WhiteSpace />
            <List renderHeader={() => '相关消息'}>

                <Item  multipleLine onClick={() => {}}>
                    <Brief>职位：{this.props.user.post}</Brief>
                    {this.props.user.company !== 'undefined'?<Brief>公司：{this.props.user.company}</Brief>:null}
                    {this.props.user.salary !== 'undefined'?<Brief>薪资：{this.props.user.salary}</Brief>:null}
                    <Brief>简介：{this.props.user.info}</Brief>
                </Item>
            </List>
            <Button type="warning" onClick={this.hanleLoginOut}>退出登录</Button>
        </div>
        )
    }
}
export default Personal;