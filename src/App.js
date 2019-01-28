import React, { Component } from 'react';
import Header from './component/header';
import './support/css/bootstrap.css';
import './App.css';
import {Route} from 'react-router-dom';
import Homepage from './component/homepage';
import {connect} from 'react-redux';
import Cookies from "universal-cookie";
import {keepLogin,cookieChecked} from './actions';
import {withRouter} from 'react-router-dom';
import Managemovies from './component/managemovies';
import ManageCategories from './component/managecategories';
import Manageconn from './component/manageconn';


const cookies = new Cookies();
class App extends Component {
  render() {
      return (
        <div>
          <Header/>
          
          <Route exact path='/' component={Homepage}/>
          <Route path='/managemovies' component={Managemovies}/>
          <Route path='/managecategories' component={ManageCategories}/>
          <Route path='/connectmovies' component={Manageconn}/>
       
          
        </div>
      );
    
  }
}
const mapStateToProps =(state)=>{
  return {
      cookie: state.auth.cookie
  };
}
export default withRouter(connect(mapStateToProps, {keepLogin,cookieChecked})(App));


//redux
//global state itu object berlaku global
//jalur kiri redux itu ==>

//MapStateToProps

//sebuah function yang terima 1 parameter yaitu global statenya, berfungsi untuk mengubah state tersebut menjadi props di component dimana dia ada

//kalo jalur kanan tahap tahapnya adalah dari component ke action creator ke reducer ke global state
//action creator adalah sebuah function yang  menerima sebuah parameter dari componnent(jumlah parameter bebas), berfungsi
//untuk membuat action dan mengirim action tersebut ke reducer
//action sebuah object javascript biasa, yang biasanya memiliki 2 property uaitu (type dan payload)
//type: isinya itu string (bertugas untuk memberi tahu reducer untuk open action tersebut untuk apa)
//payload: isinya adaah apapun yang mau dikirim untuk ubah global state

//reducer
//sebuah funtion yang menerima 2 parameter 
//parameter 1 adalaha property state terakhir
//parameter 2 adalah action dari action creator

// state={
//   username: username Reducer,
//   password: password Reducer,
//   pikachu: pikachu Reducer,
// }

// 1 property dari global state diisi oleh 1 reducer