/**
 * Created by Fairy on 2018/12/4.
 */
import {connect} from 'react-redux';
import Message from '../../components/message';
import {} from '../../redux/actions';

export default connect(
  state => ({chatMessages:state.chatMessages}),
  {}
)(Message)