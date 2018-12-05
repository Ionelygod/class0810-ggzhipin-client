import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Button,NavBar,InputItem, List, WingBlank, WhiteSpace, Radio } from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import Logo from '../logo/index';

const Item = List.Item;

class Register extends Component{
  static propTypes = {
    user : PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  }
    state = {
        laoban:true,
        username: '',
        password: '',
        rePassword : ''
    }

  handleChange = (type, value) => {
    this.setState ({
      [type]: value
    })
  }
  onRegister = async () => {
        const {laoban, username, password, rePassword} = this.state;
        await this.props.register({username,password, rePassword, type:laoban?'laoban':'dashen'});
  }
  goLogin = () => {
        this.props.history.replace('/login');
  }

    render(){
        const {laoban} = this.state;
        const {errMsg, rediectTo} = this.props.user;
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
                    <InputItem onChange={val => this.handleChange('rePassword',val)} type="password" >确认密码：</InputItem>
                    <WhiteSpace/>
                    <Item>
                        用户类型：&nbsp;&nbsp;&nbsp;
                        <Radio checked={!laoban} onChange={ (val) => this.handleChange('laoban',false)}>大神</Radio>&nbsp;&nbsp;&nbsp;
                        <Radio  checked={laoban} onChange={ (val) => this.handleChange('laoban',true)}>老板</Radio>
                    </Item>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.onRegister} >注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.goLogin}>已有账户</Button>
                </List>
                </WingBlank>
            </div>
        )
    }
}
export default Register;