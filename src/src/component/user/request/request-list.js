import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestListItem from './request-list-item';

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mapList() {
    if (this.props.ReqList) {
      return this.props.ReqList.map(data => {
        return (
          <RequestListItem
            hide={this.props.hide}
            key={data.chatID}
            data={data}
          />
        );
      });
    } else if (this.props.ReqList === null) {
      return (
        <div className="flex">
          <br />NO request
        </div>
      );
    } else {
      return (
        <div className="flex">
          <br />Loading
        </div>
      );
    }
  }
  render() {
    if (this.props.visible) {
      return (
        <div>
          <div className="chat-list">{this.mapList()}</div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
function mapStateToProps(state) {
  return {
    ReqList: state.ReqList
  };
}
export default connect(mapStateToProps)(RequestList);
