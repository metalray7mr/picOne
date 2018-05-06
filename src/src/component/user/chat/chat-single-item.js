import React, { Component } from 'react';
import timeSpent from './timeSpent';

class ChatSingleItem extends Component {
  render() {
    return (
      <div>
        <div className="single-chat-content">
          <div
            className={
              this.props.data.sender === this.props.owner
                ? 'single-chat-content-you'
                : 'single-chat-content-other'
            }
          >
            <div className="single-chat-text-other">
              {this.props.data.message}
            </div>
          </div>
          <div className="timestamp">
            {timeSpent(this.props.data.timeStamp)}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatSingleItem;
//
// <div className="single-chat-content">
//   <div className="single-chat-content-you">
//     <div className="single-chat-text-other">Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sit amet, consectetur adipisicing elit, sed </div>
//   </div>
//   <div className="timestamp">2:30</div>
// </div>
