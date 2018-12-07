/**
 * Created by Fairy on 2018/12/6.
 */
import {connect} from 'react-redux';

import Laoban from '../../components/laoban';
import {getUserList} from '../../redux/actions';


export default connect(
  state => ({userList:state.userList,user:state.user}),
  {getUserList}
)(Laoban)