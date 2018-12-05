import React,{Component} from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';
class HeaderSeclect extends Component{
  static propTypes = {
    setHeader:PropTypes.func.isRequired
  }
  state = {
    Icon : null
  }

  setHeader = (el , index) => {
    this.setState({
      Icon : el.icon
    })
    this.props.setHeader(index);
  }

    render(){
    const header = this.state.Icon;
      const data = Array.from(new Array(20)).map((_val, i) => ({
        icon: require(`../../assets/images/头像${i + 1}.png`),
        text: `头像${i + 1}`,
      }));
        return (
            <div>
              <List renderHeader={() => {
                return <div>请选择头像 <img src={header} /></div>
              }}>
                <Grid data={data} columnNum={5} activeStyle={false} onClick={this.setHeader}  />
              </List>
            </div>
        )
    }
}
export default HeaderSeclect;