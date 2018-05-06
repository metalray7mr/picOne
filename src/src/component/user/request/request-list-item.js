import React, { Component } from 'react';
import { connect } from 'react-redux';
import { acceptRequest, rejectRequest } from '../../../action';
import timeSpent from '../chat/timeSpent';

class RequestListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  acceptRequestHandler() {
    this.props.acceptRequest(this.props.data, this.props.hide);
  }
  rejectRequestHandler() {
    this.props.rejectRequest(this.props.data);
  }
  render() {
    return (
      <div>
        <div className="chat-list-item">
          <div className="chat-content-main">
            <div
              className="chat-content"
              onClick={this.acceptRequestHandler.bind(this)}
            >
              <div className="chat-content-name" />
              <div className="text">{this.props.data.message}</div>
            </div>
            <div className="accept-button">
              <img
                className="svg"
                src={require('../dislike.svg')}
                onClick={this.rejectRequestHandler.bind(this)}
                alt="d"
              />
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
export default connect(null, { acceptRequest, rejectRequest })(RequestListItem);
