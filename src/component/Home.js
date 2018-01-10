import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {user,Post_Msg} from '../action';
class Home extends Component{
  constructor(props){
    super(props);
    this.state={};
    this.handleSend=this.handleSend.bind(this);
  }
  componentWillMount(){
    this.props.user(this.props.match.params.id);
  }
  handleSend(){
    var msg=this.refs.msg.value;
    var date=new Date();
    this.props.Post_Msg(this.props.match.params.id,msg,date);
  }
  onSubmitHandler(evt){
    evt.preventDefault();
     this.handleSend();
  }
  render(){
    if(!this.props.id){
      return(
        <div className="container">
          <div className="body">
            <div className="login-html flex">
              no user exist with this id
            </div>
          </div>
        </div>
      );
    }
    else
    if(this.props.id[0]){
      return(
        <div className="container">
          <div className="body">
            <div className="login-html text-center flex">
             loading
            </div>
          </div>
        </div>
      );
    }
     else
    if(this.props.status.msg){
      return(
        <div className="container">
          <div className="body">
            <div className="login-html">
          thank you {this.props.status.msg}
        </div>
        </div>
        </div>
      );
    }
    return(
    <div className="container">
      <div className="body">
          <div className="login-html">
          <h1 className="flex" >WELCOME</h1>
          <div className="flex">
          <img src={this.props.id.src} alt="Profile" height="70" width="70" />
          </div>
          <h3 className="text-center">{this.props.id.name}</h3>
          <form  onSubmit={this.onSubmitHandler.bind(this)}>
            <div className="flex">
              <input type="text" className="ip" ref="msg" maxLength="100" placeholder="enter message here" required/><br/>
            </div>
            <div className="flex">
              <button  className="btn" >Send</button>
            </div>
          </form>
          </div>
        </div>
      </div>

    );
  }
}
function mapStateToProps(state) {
  return({
    id:state.user,
    status:state.status
  })
}
export default connect(mapStateToProps,{user, Post_Msg})(Home);
