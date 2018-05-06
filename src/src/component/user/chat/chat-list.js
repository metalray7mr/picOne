import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatListItem from './chat-list-item';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.ChatList);
    if (this.props.visible) {
      if (typeof this.props.ChatList[0] === 'undefined') {
        return <div className="flex" />;
      } else if (this.props.ChatList) {
        return (
          <div>
            <div className="chat-list">
              {this.props.list.map((data, i) => {
                return (
                  <ChatListItem hide={this.props.hide} key={i} chat={data} />
                );
              })}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="flex">
          <br />
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    ChatList: state.ChatList
  };
}
export default connect(mapStateToProps)(ChatList);
