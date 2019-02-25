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
import register from './component/screen/register';
import HomeUser from './component/screen/homeUser';
import Country from './component/screen/country';
import ProductDetail from './component/screen/productDetail';
import Cart from './component/screen/cart';
import Checkout from './component/screen/checkout';
import Payment from './component/screen/payment';
import Admin from './component/screen/admin';
import manageBrand from './component/screen/manageBrand';
import AdminManageImage from  './component/screen/manageImage'
import Order from './component/screen/order';
import Bukti from './component/screen/buktipembayaran';
import adminOrder from './component/screen/admin-order';
import History from './component/screen/history';
import Costumer from './component/screen/costumer';


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
            <Route exact path='/login' component={login}/>
            <Route exact path='/register' component={register}/>
            <Route exact path='/homes' component={HomeUser}/> 
            <Route path='/country' component={Country}/>
            <Route path='/product-detail' component={ProductDetail}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/payment' component={Payment}/>
            <Route path='/admin' component={Admin}/>
            <Route path='/manage-product' component={manageBrand}/>
            <Route path='/manage-image-product' component={AdminManageImage}/>
            <Route path='/order' component={Order}/>
            <Route path='/bukti-pembayaran' component={Bukti}/>
            <Route path='/order-admin' component={adminOrder}/>
            <Route path='/history' component={History}/>
            <Route path='/costumer' component={Costumer}/>
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
