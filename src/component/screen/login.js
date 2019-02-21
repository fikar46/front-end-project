import React, {Component} from 'react';
<<<<<<< HEAD
import '../../support/css/signin.css'
=======
>>>>>>> 5bab4105e4339f65873030869ae36a1b36a9cdfb
import { Button, Form, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {onUserLogin} from '../../actions';
import Cookies from "universal-cookie";
<<<<<<< HEAD
const cookies = new Cookies();
class Login extends Component{
    componentWillReceiveProps(newProps){
        console.log(newProps.username)
        if(newProps.username!==""){
            cookies.set('dataUser',newProps.username,{path: '/'})
            cookies.set('idUser',newProps.id,{path: '/'})
=======

const cookies = new Cookies();
class Login extends Component{

    componentWillReceiveProps(newProps){
        if(newProps.username!==""){
            cookies.set('dataUser',newProps.username,{path: '/'})
>>>>>>> 5bab4105e4339f65873030869ae36a1b36a9cdfb
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
<<<<<<< HEAD
            <div className="signin">
            <div className="container">
                <div className="row justify-content-md-center">
                <div className="col-md-12">
                        <Form  className="form-signin text-center" id="login-form">
                        {/* <img className="mb-4" src="/docs/4.2/assets/brand/bootstrap-solid.svg" alt width={72} height={72} /> */}
                        <h1 className="h3 mb-3 font-weight-normal">Warehousenesia.id</h1>
                        <h2 className="h3 mb-3 font-weight-normal">Silahkan masuk</h2>
                        <label htmlFor="inputUsername" className="label-signin">Username:</label>
                        <Input type="text" ref='username' innerRef='tbusername' placeholder='username' className="form-control" id="usr"/>
                        <label htmlFor="inputPassword" className="label-signin">Password:</label>
                        <Input type="password" ref='password' innerRef='tbpassword' placeholder='your password' className="form-control" id="pwd"/>
                        <div className="checkbox mb-3">
                        <label>
                        <Input type="checkbox" name="remember-me" id="remember-me" className="agree-term" /> Remember me
                        </label>
                        </div>
                        {this.renderError()}
                        {this.renderButton()}
                        {/* <p className="mt-5 mb-3 text-muted">© 2018-2019</p> */}
                        </Form>
                </div>
                    
=======
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
>>>>>>> 5bab4105e4339f65873030869ae36a1b36a9cdfb
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
<<<<<<< HEAD
        id:state.auth.id,
=======
>>>>>>> 5bab4105e4339f65873030869ae36a1b36a9cdfb
        error: state.auth.error,
        loading: state.auth.loading
    
    };
}
export default connect(mapStateToProps,{onUserLogin})(Login);