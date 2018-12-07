import React,{Component} from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
class Laoban extends Component{
    static propTypes = {
      user:PropTypes.object.isRequired,
        userList:PropTypes.array.isRequired,
        getUserList:PropTypes.func.isRequired
    }
  componentDidMount () {
    //防止二次请求相同的数据
    if (!this.props.userList.length) {
      this.props.getUserList('dashen');
    }
  }
  goChat = id => {
    this.props.history.push(`/chat/${id}`)
  }


  render(){

    const userList = this.props.userList.filter(item => item.header)
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                  {
                    userList.map((item, index) => {
                        return (<div key={index}>
                            <Card onClick={this.goChat.bind(null, item._id)}>
                                <Card.Header
                                  thumb={require(`../../assets/images/avatars/头像${+item.header + 1}.png`)}
                                  extra={<span>{item.username}</span>}
                                />
                                <Card.Body>
                                    <div>职位：{item.post}</div>
                                    <div>描述：{item.info}</div>
                                </Card.Body>
                            </Card>
                            <WhiteSpace size="lg" />
                        </div>
                      )})
                  }
                </WingBlank>
            </div>
        )
    }
}
export default Laoban;