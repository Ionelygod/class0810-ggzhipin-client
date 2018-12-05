import React,{Component} from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import HeaderSeclect from '../header-seclect';

class DashenInfo extends Component{
  static propTypes = {
    user:PropTypes.object.isRequired,
    updata:PropTypes.func.isRequired
  }
    state = {
        header:'',
        info:'',
        post:'',
        type:'dashen'
    }
    setHeader =  header => {
        this.setState ({
            header
        })
    }
    handleChange = (type, val) => {
      this.setState ({
        [type]:val
      })
    }
  updataUser = () => {
    this.props.updata(this.state)
  }
    render(){
      const {errMsg,rediectTo} = this.props.user;
      if(rediectTo === '/dashen'){
        return <Redirect to={rediectTo}  />
      }
        return (
          <div>
            <NavBar>大神信息完善页面</NavBar>
            <HeaderSeclect setHeader={this.setHeader}/>
            <p className="err-msg">{errMsg}</p>
            <InputItem onChange={val => {this.handleChange('post',val)}}>求职岗位:</InputItem>
              <TextareaItem title="个人介绍:" rows={3} onChange={val => {this.handleChange('info',val)}} />
              <Button type="primary" onClick={this.updataUser}>保存</Button>
          </div>
        )
    }
}
export default DashenInfo;