import React, { Component } from 'react';
import ChatList from './chat/chat-list';
import RequestList from './request/request-list';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRequest } from '../../action';

class ProfileHome extends Component {
  constructor(props) {
    super(props);
    this.state = { chat: true, req: false };
    this.chatVisible = this.chatVisible.bind(this);
    this.reqVisible = this.reqVisible.bind(this);
  }
  componentWillMount() {
    //this.props.getChat();
    this.props.getRequest();
  }
  chatVisible() {
    this.setState({ chat: true, req: false });
  }
  reqVisible() {
    this.setState({ chat: false, req: true });
  }

  render() {
    if (this.props.visible) {
      return (
        <div>
          <div className="header">
            <Link to={`/${this.props.UserInfo.public.userID}/profile`}>
              <div className="header-user">
                /{this.props.UserInfo.public.userID}
              </div>
            </Link>
            <div className="header-list">
              <div className="button" onClick={this.chatVisible}>
                Chat
              </div>
              <div className="button" onClick={this.reqVisible}>
                Req
              </div>
            </div>
            <RequestList hide={this.props.hide} visible={this.state.req} />
            <ChatList
              hide={this.props.hide}
              list={this.props.ChatList}
              visible={this.state.chat}
            />
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
    ChatList: state.ChatList
  };
}
export default connect(mapStateToProps, { getRequest })(ProfileHome);
