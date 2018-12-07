/**
 * Created by Fairy on 2018/12/6.
 */
import {connect} from 'react-redux';

import Dashen from '../../components/dashen';
import {getUserList} from '../../redux/actions';


export default connect(
  state => ({userList:state.userList}),
  {getUserList}
)(Dashen)