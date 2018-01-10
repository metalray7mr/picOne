import React,{Component} from 'react';
import {connect} from 'react-redux';
import {SignUp,Login} from '../action';
import './login.style.css';
import { bindActionCreators } from 'redux';

class LoginUser extends Component{
  constructor(props){
    super(props);
    this.state={place:'', check:true};
  }
  onSignUpHandler(evt){
    evt.preventDefault();
    if(this.refs.password1.value===this.refs.password2.value){
      this.props.SignUp(this.refs.email.value, this.refs.password1.value,this.refs.user.value);
    }
    else{
      this.setState({place:"Password are not matching"});
      this.refs.password1.value="";
      this.refs.password2.value="";
    }
  }
  chText()
  {
    var str=document.getElementById("aliasEntry");
    var regex=/[^a-z]/gi;
    str.value=str.value.replace(regex ,"");
   }
  onSignInhandler(evt){
    var keepLogedIn=false;
    evt.preventDefault();
    document.getElementById('load').classList.remove('hide');

    if(this.state.check)
      keepLogedIn=true;
     this.props.Login(this.refs.email1.value,this.refs.password.value,keepLogedIn);
  }
  render(){
    return(
      <div className='body'>
        <div className="login-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
          <div className="login-form">
            <form className="sign-in-htm" onSubmit={this.onSignInhandler.bind(this)}>
              <div className="group">
                <label htmlFor="user"  className="label">Email</label>
                <input id="user" type="email" ref="email1" className="input"  required/>
                  <label htmlFor="pass" className="label"></label>
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input id="pass" type="password" ref="password" className="input" data-type="password" required/>
              </div>
              <div className="group">
                <input id="check" type="checkbox" className="check" ref="check" defaultChecked onChange={()=>{this.setState({check:this.refs.check.checked})}}/>
                <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
              </div>
              <div className="group">
                <button type="submit" className="button"  >Sign In<img id="load" ref="svg" className={`loader ${this.props.user?'':'hide'}`} src={require('./puff.svg')} alt="o"></img></button>
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </form>
            <form className="sign-up-htm" onSubmit={this.onSignUpHandler.bind(this)}>
              <div className="group">
                <label htmlFor="user" className="label">Username  (should be unique)</label>
                <input  type="text" ref="user" className="input" maxLength="32"onKeyUp={this.chText} onKeyDown={this.chText} id="aliasEntry" autoFocus required placeholder="eg: app.com/SraynhuChotu" required />
                  <label htmlFor="pass" className="label"></label>
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input  type="password" ref="password1" className="input" data-type="password" required/>
                <label ref="alert" className="text-danger">{this.state.place}</label>
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Repeat Password</label>
                <input  type="password"  ref="password2" className="input" data-type="password" required/>
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Email Address</label>
                <input  type="eamil" ref="email" className="input" required />
              </div>
              <div className="group">
                <input type="submit" className="button" value="Sign Up" />
              </div>
              <div className="hr"></div>
              <div className="foot-lnk">
                <label htmlFor="tab-1" /><a>Already Member?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}


function mapDispatchToprops(dispatch) {
  return bindActionCreators({SignUp,Login,dispatch},dispatch);
}
function mapStateToProps(state) {
return {
  user: state.loginUser
}
}
export default connect(mapStateToProps,mapDispatchToprops)(LoginUser);
