/**
 * Created by Fairy on 2018/12/6.
 */
import {connect} from 'react-redux';

import App from '../../components/app';
import {getUserInfo,getChatList} from '../../redux/actions';

export default connect(
  state => ({user:state.user}),
  {getUserInfo,getChatList}
)(App)