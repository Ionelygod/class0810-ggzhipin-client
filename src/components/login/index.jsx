import React,{Component} from 'react';
import {Button,NavBar,InputItem, List, WingBlank, WhiteSpace } from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../logo';
class Login extends Component{
  static propTypes = {
    user : PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }
  state = {
    username: '',
    password: '',
    errMsg:''
  }

  handleChange = (type, value) => {
    this.setState ({
      [type]: value
    })
  }
  Register = () => {
      const {username, password} = this.state;
      this.props.login({username, password})

  }
  goRegister = () => {
      this.props.history.replace('/register')
  }

    render(){
      const {errMsg,rediectTo} = this.props.user;
      if(rediectTo){
        return <Redirect to={rediectTo} />
      }
        return (
          <div>
              <NavBar >硅谷直聘</NavBar>
              <Logo />
              <p className="err-msg">{errMsg}</p>
              <WingBlank>
                  <List>
                      <InputItem onChange={val => this.handleChange('username', val)}>用户名:</InputItem>
                      <WhiteSpace/>
                      <InputItem onChange={val => this.handleChange('password',val)} type="password" >密&nbsp;&nbsp;&nbsp;码：</InputItem>
                      <WhiteSpace/>
                      <Button type="primary" onClick={this.Register} >登录</Button>
                      <WhiteSpace/>
                      <Button onClick={this.goRegister}>还没有账户</Button>
                  </List>
              </WingBlank>
          </div>
        )
    }
}
export default Login;