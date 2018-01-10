import React, { Component } from 'react';
import Main from './main';
import Home from './component/Home';
import {Status} from './action';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import User from './component/user';
import Room from './component/room';
import ChatRoom from './component/room/index';
class App extends Component {
componentWillMount(){
   this.props.Status();
 }
  render(){
    return(
      <div>
      <Router>
        <Switch>
          <Route exact path="/" render={()=>(
              this.props.loginStatus?(<User/>):(<Main />)
            )}/>
          <Route exact  path="/room" render={(props)=>
                  (<Room {...props} />)
                }/>
              <Route exact path="/room/:no" render={(props)=>
                  (<ChatRoom {...props} />)
                }/>
              <Route exact path="/:id" render={(props)=>
              (<Home {...props} />)
            }/>

        </Switch>
      </Router>
      </div>
    );
  }
}
function mapStateToProps(state) {
   return {
   loginStatus:state.loginStatus};
}
export default connect(mapStateToProps,{Status})(App);
