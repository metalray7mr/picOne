import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {validUser,makeRequest} from '../../action';

class Request extends Component{
  constructor(props){
    super(props);
    this.state={};
    this.props.validUser(this.props.match.params.id)
  }
  uuidv4(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      ((c ^(crypto.getRandomValues(new Uint8Array(1))[0] & 15)) >> c / 4).toString(16)
    )
   }
  onSubmitHandler(){
    if(this.refs.request.value){
      var file=document.getElementById('file');
      var image=(file.files[0]);
      this.props.makeRequest(this.props.match.params.id,`${this.uuidv4()}`,this.refs.request.value,image);
    }
  }
  render(){
    if(this.props.ValidUser==='SUCCESSFULL'){
            return(
              <div>
                  <Link to={`/${this.props.UserInfo.public.userID}`} style={{ textDecoration: 'none' }} ><i className="left"></i><p></p></Link>
                  <div className="flex">
                    <div className="user-name2">
                      <div className="text-form">
                         Thankyou your request Has been Sent
                      </div>
                    </div>
                  </div>
              </div>
            );
          }
    if(this.props.ValidUser){
            return(
              <div>
                <Link to={`/${this.props.UserInfo.public.userID}`} style={{ textDecoration: 'none' }} ><i className="left"></i><p></p></Link>
                <div className="flex">
                  <div className="profile2">
                    <img src={this.props.ValidUser.src} className="profile-box2" alt="profile"></img>
                  </div>
                  <div className="user-name2">/{this.props.ValidUser.userID}
                    <p className="user-discription">{this.props.ValidUser.discription}</p>
                    <div className="text-form2">
                      <div className="text-input-box">
                        <div className="input-box">
                        <input className="input2" type="text" ref="request"  placeholder="enter some text here" />
                        </div>
                        <div className="send-button" onClick={this.onSubmitHandler.bind(this)}>
                          <div className="flex"></div>
                        </div>
                        <div className="upload-btn-wrapper">
                          <button className="btn">Upload a file</button>
                          <input type="file" id="file" name="myfile" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        else
        if(this.props.ValidUser==null){
          return(
            <div>
              <Link to={`/${this.props.UserInfo.public.userID}`} style={{ textDecoration: 'none' }} ><i className="left"></i><p></p></Link>
              <div className="flex">
                <div className="user-name2">
                  <div className="text-form">
                    No user Exist With this ID
                  </div>
                </div>
              </div>
              </div>
          );
        }
      else{
        return(
          <div>
            <Link to={`/${this.props.UserInfo.public.userID}`} style={{ textDecoration: 'none' }} ><i className="left"></i><p></p></Link>
            <div className="flex">
              <div className="user-name2">
                <div className="text-form">
                  Loading
                </div>
              </div>
            </div>
          </div>
        );
      }
  }
}
function mapStateToProps(state) {
  return{
    ValidUser:state.ValidUser
  }
}
export default connect(mapStateToProps,{validUser,makeRequest})(Request);
