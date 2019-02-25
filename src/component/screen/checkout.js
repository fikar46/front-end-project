import React,{Component} from 'react';
import Axios from 'axios';
import Cookies from "universal-cookie";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {addToAddress, addToOrder, deleteCartFromCheckout} from '../../actions'
const cookies = new Cookies();
const rupiah = new Intl.NumberFormat("in-Rp",{
    style:"currency",
    currency:"IDR"
})
class Checkout extends Component{
    state={
        cart:[],
        alamat:[]
    }
    componentDidMount(){
        this.getDataCart();
        this.getDataAlamat()
    }
    getDataAlamat=()=>{
        Axios.post("http://localhost:2000/alamat",{
            username:cookies.get('dataUser')
        })
        .then((res)=>{
            this.setState({alamat:res.data})
            console.log(this.state.alamat)
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataAlamat=()=>{
      var alamat = this.state.alamat.map((item)=>{
        var {firstName, lastName, address,address2,kota,profinsi,kodepos}= item
        return(
          <div className="col-md-8 order-md-1">
          <h3>Alamat:</h3>
          <p>{firstName} {lastName}</p>
          <p>{address}</p>
          <small>or address 2</small>
          <p>{address2}</p>
          <p>{kota} {profinsi} {kodepos}</p>
          </div>
        )
      })
      return alamat
    }
    getDataCart=()=>{
        Axios.post("http://localhost:2000/cart",{
            username:cookies.get('dataUser')
        })
        .then((res)=>{
            this.setState({cart:res.data})
            console.log(this.state.cart)
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataCart=()=>{
        var cartData = this.state.cart.map((item)=>{
            var {id_produk,nama,harga,gambar,qty}= item
            return(
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{nama}</h6>
                  <small className="text-muted">quantity: {qty}</small>
                </div>
                <span className="text-muted">{rupiah.format(harga*qty)}</span>
              </li>
            )
        })
        return cartData
    }
    onButtonCheckout=()=>{
        var username = cookies.get('dataUser')
        if(this.state.alamat.length==0){
        var firstName= this.refs.first_name.value;
        var lastName = this.refs.last_name.value;
        var address = this.refs.alamat1.value;
        var address2 = this.refs.alamat2.value;
        var kota = this.refs.kota.value;
        var profinsi = this.refs.profinsi.value;
        var kodepos = this.refs.kodepos.value;
        }
        this.props.addToAddress({
            username,firstName,lastName,address,address2, kota,profinsi,kodepos
        })
        this.state.cart.forEach((item)=>{
            console.log(item.nama)
            var {id_produk,qty} = item
            this.props.addToOrder({
                username, id_produk, qty, date: new Date()
            })
            
        })
        this.props.deleteCartFromCheckout(username)
        this.getDataCart();
    }
    putform=()=>{
      return(<div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName">First name</label>
            <input type="text" ref="first_name" className="form-control" id="firstName" placeholder="Nama depan" required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input type="text" ref="last_name" className="form-control" id="lastName" placeholder="Nama belakang" required />                      
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input type="text" ref="alamat1" className="form-control" id="address" placeholder="Nama jalan atau blok" required />
          
        </div>
        <div className="mb-3">
          <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
          <input type="text" ref="alamat2" className="form-control" id="address2" placeholder="Apartment or suite" />
        </div>
        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="country">Kota / Kecamatan</label>
            <input type="text" ref="kota" className="form-control" id="kota" placeholder="Nama Kota" required />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="state">Provinsi</label>
            <input type="text" ref="profinsi" className="form-control" id="profinsi" placeholder="Nama Profinsi" required />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="zip">Kode Pos</label>
            <input type="text" className="form-control" ref="kodepos" id="zip" placeholder="Kode pos" required />
            <div className="invalid-feedback">
              Zip code required.
            </div>
          </div>
        </div>
      </div>)
    }
    adressUser=()=>{
      if(this.state.alamat.length>0){
        return this.putDataAlamat()
      }
      return this.putform
    }
    putTotalPrice=()=>{
      var total =  this.state.cart.reduce((sum, item) => (
          sum += item.qty * item.harga
        ), 0)
      return rupiah.format(total)
  }
    render(){
        return(
          <div className="container">
          <div className="py-5 text-center">
            <h2>Checkout form</h2>
          </div>
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
               
              </h4>
              <ul className="list-group mb-3">
                {this.putDataCart()}
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">-$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total</span>
                  <strong>{this.putTotalPrice()}</strong>
                </li>
              </ul>
              <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code" />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-secondary">Redeem</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" noValidate>
                {this.adressUser()}
                <hr className="mb-4" />
                <a href={`/payment?total=${this.putTotalPrice()}`}>
                <button onClick={this.onButtonCheckout} className="btn btn-primary btn-lg btn-block" type="button">Continue to checkout</button>
                </a>
              </form>
            </div>
          </div>
          <footer className="my-5 pt-5 text-muted text-center text-small">
          </footer>
        </div>
      )
    }
}
export default connect(null, {addToAddress,addToOrder,deleteCartFromCheckout})(Checkout)