import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChatSingle, owner } from '../../../action';
import timeSpent from './timeSpent';

class ChatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = this.id.bind(this);
  }
  id() {
    this.props.getChatSingle(this.props.chat.chatID);
    this.props.owner(this.props.chat.owner.me);
    this.props.hide(this.props.chat.chatID);
  }
  render() {
    if (this.props.chat) {
      var user = JSON.parse(localStorage.getItem('user'));
      var userID = user.public.userID;
      var identity;
      if (
        this.props.chat.owner.me === userID &&
        this.props.chat.owner.you === false
      ) {
        identity = 'unKnown';
      } else {
        identity = this.props.chat.owner.me;
      }
      return (
        <div>
          <div className="chat-list-item">
            <div className="chat-content" onClick={this.id}>
              <div className="chat-content-name">{identity}</div>
              <div className="text">{this.props.chat.discription}</div>
            </div>
            <div className="timestamp">
              {timeSpent(this.props.chat.timeStamp)}
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
function mapStateToProps(state) {
  return {
    ChatListItem: state.ChatListItem
  };
}
export default connect(mapStateToProps, { getChatSingle, owner })(ChatListItem);
