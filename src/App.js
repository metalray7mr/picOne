import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './src/component/home';
import Login from './src/component/login/signin';
import SignUp from './src/component/login/signup';
import Profile from './src/component/user/profile';
import Header from './src/component/user/header';
import Anonymous from './src/component/anonymous/anonymous';
import Main from './src/main';
import Request from  './src/component/user/req';
import {loginStatus} from './src/action/auth';
import {getChat} from './src/action';


class App extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  componentWillMount(){
    this.props.loginStatus();
    var user=JSON.parse(localStorage.getItem('user'));
    if(user)
    this.props.getChat();
  }
  render() {
    var user=JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' render={(props)=>user&&this.props.LoginStatus?(<Home UserInfo={user}  />):(<Main {...props} />)}/>
            <Route exact path='/login' render={(props)=>user&&this.props.LoginStatus?(<Redirect to='/'/>):(<Login  {...props}/>)}/>
            <Route exact path='/signup' render={(props)=>user&&this.props.LoginStatus?(<Redirect to='/'/>):(<SignUp {...props}/>)}/>
            <Route exact path={user?`/${user.public.userID}`:''} render={(props)=>user&&this.props.LoginStatus?(<Header UserInfo={user} {...props}/>):(<Anonymous {...props}/>)}/>
            <Route exact path={user?`/${user.public.userID}/profile`:'/:id/profile'} render={(props)=>this.props.LoginStatus&&user?(<Profile  UserInfo={user} {...props}/>):(<Anonymous {...props}/>)}/>
            <Route exact path='/:id' render={(props)=>user&&this.props.LoginStatus?(<Request UserInfo={user} {...props}/>):(<Anonymous {...props}/>)}/>
            <Route exact path='*' render={(props)=>user&&this.props.LoginStatus?(<Anonymous UserInfo={user} {...props}/>):(<Anonymous {...props}/>)}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return{
    LoginStatus:state.LoginStatus,
    UserInfo: state.UserInfo
  }
}
export default connect(mapStateToProps,{loginStatus,getChat})(App);
