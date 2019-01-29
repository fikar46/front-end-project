import React, {Component} from 'react';
import { Button, Form, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {onUserLogin} from '../../actions';
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Login extends Component{

    componentWillReceiveProps(newProps){
        if(newProps.username!==""){
            cookies.set('dataUser',newProps.username,{path: '/'})
        }
      }
    onBtnLoginClick= ()=>{
        var username= this.refs.username.refs.tbusername.value;
        var password= this.refs.password.refs.tbpassword.value;
        this.props.onUserLogin({username, password});
    }
    renderError=()=>{
      if(this.props.loading == false){
        if(this.props.error.length>0){
          return <p className="alert alert-danger">{this.props.error}</p>
      }
      }
        
    }
    renderButton=()=>{
        if(this.props.loading){
            return <h3>Loading...</h3>
        }
        return <Button  onClick={this.onBtnLoginClick} type="submit" class="form-submit" >Log in</Button>

    }
    
    render(){
        if(this.props.username===''){
        return(
            <div className="main">
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                
                </div>
                    <div className="col-md-6">
                    <h2 className="form-title">Sign in</h2>
                            <Form  className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="your_name"></label>
                                <Input type="text" ref='username' innerRef='tbusername' placeholder='username' className="form-control" id="usr"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="your_pass"></label>
                                <Input type="password" ref='password' innerRef='tbpassword' placeholder='your password' className="form-control" id="pwd"/>
                            </div>
                            <div className="form-group">
                                <Input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label htmlFor="remember-me" className="label-agree-term"><span><span /></span>Remember me</label>
                            </div>
                            <div className="form-group form-button">
                                    {this.renderError()}
                                
                            </div>
                            </Form>
                            {this.renderButton()}
                    </div>
                </div>
            </div>               
              </div>
        )
    }
    return <Redirect to="/homes"/>
  }
}
const mapStateToProps =(state)=>{
    return {
        username: state.auth.username,
        error: state.auth.error,
        loading: state.auth.loading
    
    };
}
export default connect(mapStateToProps,{onUserLogin})(Login);