/**
 * Created by Fairy on 2018/12/6.
 */
import {connect} from 'react-redux';

import Chat from '../../components/chat';
import {sendMessage} from '../../redux/actions';


export default connect(
  state => ({chatMessages:state.chatMessages}),
  {sendMessage}
)(Chat)