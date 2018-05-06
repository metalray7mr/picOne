import React,{Component} from 'react';
import {connect} from 'react-redux';
import {putMessage} from '../../../action';
import ChatSingleItem from './chat-single-item';
import Head from './head';
class ChatSingle extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  componentDidMount(){

  }
  putMessage(){
      if(this.refs.text.value){
      this.props.putMessage(this.refs.text.value,this.props.id,this.props.Owner);
      this.refs.text.value='';
      var element = document.getElementsByClassName("single-chat-list");
      element.scrollTop = element.scrollHeight;
    }
  }
  render(){
    if(this.props.visible){
      if(this.props.ChatSingle){
                return(
                  <div>
                    <i onClick={this.props.hide} className="left"></i>
                    <Head profile={this.props.Owner[1]}/>
                    <div className="single-chat-list2">
                      {this.props.ChatSingle.map((data,i)=>{return(<ChatSingleItem key={i} owner={this.props.Owner[0]} data={data}/>)})}
                    </div>
                    <div className="footer-input">
                      <div className="text-input-box">
                        <div className="input-box">
                        <input className="input" type="text" ref='text' name=""  placeholder="enter some text here" />
                        </div>
                        <div className="send-button" onClick={this.putMessage.bind(this)}>
                          <div className="flex"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
          }
          else{
            return(<div className="flex"><br/>Loading</div>);
          }
        }
        else{
          return(<div></div>);
        }
  }
}
function mapStateToProps(state) {
  return{
    ChatSingle:state.ChatSingle,
    Owner:state.Owner
  }
}
export default connect(mapStateToProps,{putMessage})(ChatSingle);
