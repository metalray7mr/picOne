import React,{Component} from 'react';
import {connect} from 'react-redux';
import ProfileHome from './profile-home';
import ChatSingle from './chat/chat-single';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={profile:true,chat:false,chatID:''};
    this.chatVisible=this.chatVisible.bind(this);
    this.profileVisible=this.profileVisible.bind(this);
  }
  chatVisible(id){
    this.setState({profile:false,chat:true,chatID:id});
  }
  profileVisible(){
    this.setState({profile:true,chat:false});
  }

  render(){
    return(
      <div>
        <ProfileHome UserInfo={this.props.UserInfo} hide={this.chatVisible} visible={this.state.profile}/>
        <ChatSingle hide={this.profileVisible} id={this.state.chatID} visible={this.state.chat}/>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    ChatList:state.ChatList
  }
}
export default connect(mapStateToProps)(Header);
