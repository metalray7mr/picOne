import React, { Component } from 'react';
import { validUser } from '../../../action';
import { connect } from 'react-redux';

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    if (this.props.profile !== '') this.props.validUser(this.props.profile);
  }
  render() {
    if (this.props.profile === '') {
      return (
        <div className="flex">
          <div className="profile4-sub-info">unKnown</div>
        </div>
      );
    } else {
      if (this.props.ValidUser) {
        return (
          <div className="flex">
            <div className="profile3">
              <img
                src={this.props.ValidUser.src}
                alt="profile"
                className="profile-box3"
              />
              <div className="profile3-sub-info">/{this.props.profile}</div>
              <p className="last-seen">today</p>
            </div>
          </div>
        );
      } else {
        return <div />;
      }
    }
  }
}
function mapStateToProps(state) {
  return {
    ValidUser: state.ValidUser
  };
}
export default connect(mapStateToProps, { validUser })(Head);
