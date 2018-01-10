import React,{Component} from 'react';
import {SignOut,Get_Msg} from '../action';
import {connect} from 'react-redux';
class User extends Component{

componentDidMount(){
  var id=JSON.parse(localStorage.getItem('user'));
  if(id){
    this.props.Get_Msg(id.name);
  }
  }
  mapMsg(){
    if(this.props.msg){
      return(this.props.msg.map((data,i)=>{return(<li className="li" key={i}>{data.msg.message} at <p className="time">{data.time}</p></li>);}));

    }
    else{
      return(<div>Loading</div>);
    }
  }
  render(){

    return(
      <div className="container2">
        <div className="flex">
          <button className="btn" onClick={this.props.SignOut}>SignOut</button>
        </div>
            <ul className="ul">
            {this.mapMsg()}
            </ul>
    </div>
    );
  }
}
function mapStateToProps(state) {
  return{
    msg:state.msg
  }
}
export default connect(mapStateToProps,{SignOut,Get_Msg})(User);
