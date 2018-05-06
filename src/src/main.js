import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Main extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  render(){
    return(
      <div>
        <div className="">
          <div className="title">
            picOne
            <div className="intro">
              <span id="spin"></span>
            </div>
            <Link to="/login" style={{ textDecoration: 'none',color:'none' }}>
            <div className="already-user">already a user</div>
            </Link>
          </div>
          <div className="flex">
            <Link to="/signup" className="container2 bounce" style={{ textDecoration: 'none' }}>
              <div >
                  Sign Up
              </div>
          </Link>
          </div>
        </div>
        <div className="footer">
          <span>About</span>
          <span>Help and support</span>
          <span>Contact : test@tester.com</span>
        </div>
      </div>
    );
  }
}
export default Main;
