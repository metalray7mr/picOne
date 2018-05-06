import React,{Component} from 'react';
import Modal from './modal';
import {Link} from 'react-router-dom';
import {signOut} from '../../action/auth';
import {userUpdate} from '../../action'
import {connect} from 'react-redux';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state={visible:false};
    this.remove=this.remove.bind(this);
  }
  componentWillMount(){
    this.props.userUpdate();
  }
    modal(){
      this.setState({visible:true})
    }
    remove(){
      if(this.state.visible)
      this.setState({visible:false})
    }
    logOutHander(){
      this.props.signOut(this.props.UserInfo.public.userID);
    }
  render(){
    return(
        <div>
            <div onClick={this.remove} style={{height:'100vh'}}>
              <Link to={`/${this.props.UserInfo.public.userID}`} style={{ textDecoration: 'none' }} ><i className="left"></i><p></p></Link>
            <div className="flex">
              <div className="header-user2" onClick={this.logOutHander.bind(this)}><Link to='/'>logout</Link></div>
              <div className="profile" onClick={this.modal.bind(this)}>
                <img src={this.props.UserInfo.public.src} alt="profile" className="profile-box2"></img>
              </div>
              <div className="user-name">/{this.props.UserInfo.public.userID}
                <p className="user-discription">{this.props.UserInfo.public.discription}</p>
                <div className="stats">
                  <div className="stats-sub">Chat <p>{(this.props.ChatList||0).length}</p></div>
                  <div className="stats-sub">Request <p>{Object.keys(this.props.UserInfo.req||0).length}</p></div>
                  <div className="stats-sub">Rejected <p>{Object.keys(this.props.UserInfo.rejected||0).length}</p></div>
                </div>
              </div>
            </div>
            </div>
          <Modal id="abc" visible={this.state.visible} image={this.props.UserInfo.public.src} invisible={this.remove} ref="myModal"/>
        </div>
    );
  }
}
function mapStateToProps(state){
  return{
    ChatList:state.ChatList
  }
}
export default connect(mapStateToProps,{signOut,userUpdate})(Profile);
