import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { validUser } from '../../action';
import { signUp } from '../../action/auth';
import { connect } from 'react-redux';
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  checkInput(evt) {
    var regex = /[^a-z]/gi;
    evt.target.value = evt.target.value.replace(regex, '');
    evt.target.value = evt.target.value.toLowerCase();
    this.props.validUser(evt.target.value);
  }
  onSubmitHandler(evt) {
    evt.preventDefault();
    this.props.signUp(
      this.refs.userID.value,
      this.refs.password.value,
      this.refs.email.value
    );
  }
  render() {
    if (this.props.ValidUser) {
      if (this.props.ValidUser.userID) {
        var err = true;
      }
    }
    return (
      <div>
        <form onSubmit={this.onSubmitHandler.bind(this)}>
          <div className="login-form">
            <div className="single-chat-list">
              <div className="input-text-container">
                <div className="text-box-header">UserId</div>
                <div
                  className={err ? 'text-input-box-danger' : 'text-input-box'}
                >
                  <div className="input-box">
                    <input
                      className="input"
                      type="text"
                      ref="userID"
                      onKeyUp={this.checkInput.bind(this)}
                      required
                      placeholder="should be unique eg: /rajkumar"
                    />
                  </div>
                  <div className="validation-loader">
                    <img
                      src={require('./loader.svg')}
                      className={
                        this.props.ValidUser === 'err'
                          ? 'spinner flex'
                          : 'spinner flex hide'
                      }
                      alt="l"
                      height=""
                      width=""
                    />
                  </div>
                </div>
                <div className="alert-text">
                  {err ? 'try another name' : ''}&nbsp;
                </div>
              </div>
              <div className="input-text-container">
                <div className="text-box-header">Password</div>
                <div className="text-input-box">
                  <div className="input-box">
                    <input
                      className="input"
                      ref="password"
                      pattern=".{6,10}"
                      title="6 to 10 characters"
                      type="password"
                      min="6"
                      required
                      placeholder="xxxxx"
                    />
                  </div>
                </div>
                <div className="alert-text">&nbsp;</div>
              </div>
              <div className="input-text-container">
                <div className="text-box-header">Email</div>
                <div
                  className={
                    this.props.SignUp
                      ? 'text-input-box-danger'
                      : 'text-input-box'
                  }
                >
                  <div className="input-box">
                    <input
                      className="input"
                      type="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      ref="email"
                      placeholder="abc@abc.com"
                      required
                    />
                  </div>
                </div>
                <div className="alert-text">
                  {this.props.SignUp ? this.props.SignUp : ''} &nbsp;
                </div>
              </div>
              <button type="submit" className="submit-button3">
                <div className="submit-button">create user</div>
              </button>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <div className="link">already a user</div>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ValidUser: state.ValidUser,
    SignUp: state.SignUp
  };
}
export default connect(mapStateToProps, { validUser, signUp })(SignUp);
