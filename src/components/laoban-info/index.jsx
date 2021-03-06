import React,{Component} from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import HeaderSeclect from '../header-seclect';

class LaobanInfo extends Component{
  static propTypes = {
    user:PropTypes.object.isRequired,
    updata:PropTypes.func.isRequired
  }
    state = {
        header:'',
        info:'',
        post:'',
        salary:'',
        company:'',
        type:'laoban'
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
      if(rediectTo === '/laoban'){
        return <Redirect to={rediectTo}  />
      }
        return (
          <div>
            <NavBar>老板信息完善页面</NavBar>
            <HeaderSeclect setHeader={this.setHeader}/>
            <p className="err-msg">{errMsg}</p>
            <InputItem onChange={val => {this.handleChange('post',val)}}>招聘职位:</InputItem>
            <InputItem onChange={val => {this.handleChange('company',val)}}>公司名称:</InputItem>
            <InputItem onChange={val => {this.handleChange('salary',val)}}>职位薪资:</InputItem>
              <TextareaItem title="职位要求:" rows={3} onChange={val => {this.handleChange('info',val)}} />
              <Button type="primary" onClick={this.updataUser}>保存</Button>
          </div>
        )
    }
}
export default LaobanInfo;