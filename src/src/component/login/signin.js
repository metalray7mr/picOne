import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../action/auth';

class Login extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  onSubmitHandler(evt){
    evt.preventDefault();
    this.props.login(this.refs.email.value,this.refs.password.value,this.props.history);
  }
  render(){
    return(
      <div>
        <div className="login-form">
          <form onSubmit={this.onSubmitHandler.bind(this)}>
            <div className="single-chat-list">
            <div className="input-text-container">
              <div className="text-box-header">Email</div>
              <div className={this.props.LogIn?"text-input-box-danger":"text-input-box"}>
                <div className="input-box">
                <input className="input" type="text" ref="email"  placeholder="enter your email" required/>
                </div>
              </div>
             <div className="alert-text">{this.props.LogIn?'somthing is not valid':''}&nbsp;</div>
            </div>
            <div className="input-text-container">
              <div className="text-box-header">Password</div>
              <div className={this.props.LogIn?"text-input-box-danger":"text-input-box"}>
                <div className="input-box">
                <input className="input" type="password" ref="password"  placeholder="xxxxx" required/>
                </div>
              </div>
             <div className="alert-text">&nbsp;</div>
            </div>
            <button type="submit" className="submit-button3">
              <div className="submit-button">
                Sign In
              </div>
            </button>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
            <div className="link">create a user</div>
            </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return{
    LoginStatus:state.LoginStatus,
    LogIn:state.LogIn
  }
}
export default connect(mapStateToProps,{login})(Login);
