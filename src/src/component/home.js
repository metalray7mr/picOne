import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getChat,} from '../action';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  componentWillMount(){
    var user=JSON.parse(localStorage.getItem('user'));
    if(user)
    this.props.getChat();
  }
  render(){
    return(
      <div>
        <div className="flex">
          <div className="profile">
            <img src={this.props.UserInfo.public.src} alt="profile" className="profile-box2"></img>
          </div>
          <Link to={`/${this.props.UserInfo.public.userID}`} style={{ textDecoration: 'none' }}>
            <div className="container">
              Go Chat
            </div>
          </Link>
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
export default connect(null,{getChat})(Home);
