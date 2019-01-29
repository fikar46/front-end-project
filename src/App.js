import React, { Component } from 'react';
import './support/css/bootstrap.css';
import './App.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from "universal-cookie";
import {keepLogin,cookieChecked} from './actions';
import {withRouter} from 'react-router-dom';
import Header from './component/fitur/navbar';
import Homepage from './component/screen/homepage';
import login from './component/screen/login';


const cookies = new Cookies();
class App extends Component {
  componentDidMount(){
    const cookienya = cookies.get("dataUser");
    if(cookienya !== undefined){
      this.props.keepLogin(cookienya);
    }else{
      this.props.cookieChecked()
    }
}
  render() {
    if(this.props.cookie){
      return (
        <div>  
            <Header/>
            <Route exact path='/' component={Homepage}/>
            <Route exact path='/masuk' component={login}/>

        </div>
      );
    }
    return(<div><center><h1>Loading...</h1></center></div>);
  }
}
const mapStateToProps =(state)=>{
  return {
      cookie: state.auth.cookie
  };
}
export default withRouter(connect(mapStateToProps, {keepLogin,cookieChecked})(App));
