import React,{Component} from 'react';
import {connect} from 'react-redux';
import {updateProfile} from '../../action';

class Modal extends Component{
	upload(e){
	    var output = document.getElementById('output');
      output.src = window.URL.createObjectURL(e.target.files[0]);
	}
	uuidv4(){
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    ((c ^(crypto.getRandomValues(new Uint8Array(1))[0] & 15)) >> c / 4).toString(16)
  )
 }
	onSubmitHandler(evt){
		evt.preventDefault();
		var file=document.getElementById('file');
    var discription=document.getElementById('discription').value;
    var image=(file.files[0]);
		this.props.updateProfile(image,discription,this.uuidv4());
		this.props.invisible();
	}
  render(){
		if(this.props.visible){
			return(
					<form onSubmit={this.onSubmitHandler.bind(this)}>
		        <div className="modal-form">
								<div className="profile5">
					        <img src={this.props.image} id="output" alt="profile" className="profile-box2"></img>
					      </div>
								<div className="text-input-box2">
			            <div className="input-box">
			            <input className="input" type="text" required id="discription" placeholder="tell others somthing about yourself" />
			            </div>
			          </div>
								<div className="modal-upload-btn-wrapper">
									<div className="upload-btn-wrapper">
										<button className="btn">Upload a file</button>
										<input type="file" name="myfile" id="file" onChange={this.upload.bind(this)}/>
									</div>
								</div>
								<button type="submit" className="submit-button3">
									<div className="submit-button2">
										update
									</div>
								</button>
		        </div>
					</form>
	    );
		}
		else
		return(<div></div>);
  }
}
export default connect(null,{updateProfile})(Modal);
