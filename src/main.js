import React,{Component} from 'react';
import LoginUser from './component/login';
class Main extends Component {
  render(){
    return(
      <div className="main">
        <LoginUser/>
      </div>
    );
  }
}
export default Main;
