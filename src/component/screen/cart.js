import React,{Component} from 'react'
import Axios from 'axios';
import Cookies from "universal-cookie";
import {connect} from 'react-redux';
import {DeleteCart} from '../../actions';

const cookies = new Cookies();
const rupiah = new Intl.NumberFormat("in-Rp",{
    style:"currency",
    currency:"IDR"
})
class Cart extends Component{
    state={
        cart:[]
    }
    componentDidMount(){
        this.getDataCart();
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
    deleteCart=(id_produk)=>{
        console.log(id_produk)
        if(id_produk != undefined){
            var deleteProduct = window.confirm('are you sure?');
            if(deleteProduct){
                this.props.DeleteCart(id_produk)
                this.getDataCart();
            }   
        }
    }
    putDataCart=()=>{
        var cartData = this.state.cart.map((item)=>{
            var {id_produk,nama,harga,gambar,qty}= item
            return(
                    <tr>
                        <td>
                            <img src={gambar} height="100px" widht="100px" className="img-responsive"/>
                            
                        </td>
                        <td>{nama}</td>
                        <td>{rupiah.format(harga)}</td>
                        <td>{qty}</td>
                        <td>{rupiah.format(harga*qty)}</td>
                        <td><button className="btn" onClick={()=> this.deleteCart(id_produk)}>x</button></td>
                    </tr>
            )
        })
        return cartData
    }
    putTotalPrice=()=>{
        var total =  this.state.cart.reduce((sum, item) => (
            sum += item.qty * item.harga
          ), 0)
        return rupiah.format(total)
    }
    render(){
        if(this.state.cart.length>0){
            return(
                <div className="container mt-5">
                    <h1 align="center" className="color-tittle">Your Cart</h1>
                    <table className="space-table">
                            <tr >
                                <th>
                                Product
                                </th>
                                <th></th>
                                <th>
                                Price
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                Subtotal
                                </th>
                                <th>
                                
                                </th>
                            </tr>
                            
                            {this.putDataCart()}
                            {/* <tr>
                                <td className="noborder"></td>
                                <td className="noborder"></td>
                                <td className="noborder"></td>
                                
                                <td>Shipping fee</td>
                                <td ></td>
                                <td>-</td>
                            </tr> */}
                            <tr >
                                <td className="noborder"></td>
                                <td className="noborder"></td>
                                <td className="noborder"></td>
                                
                                <td>Total</td>
                                <td></td>
                                <td>{this.putTotalPrice()}</td>
                            </tr>
                    </table>
                    <a href="/" className="text-secondary"><i class='fas fa-angle-left' style={{fontSize:20}}></i>Kembali berbelanja</a>
                    <a href="/checkout">
                    <button  className="btn btn-secondary btn-checkout ">Checkout</button>
                    </a>
                </div>
                )
        }
        return(
            <div className="container">
            <h1 align="center">your cart is empty</h1>
            </div>
        )
    }
}
export default connect(null,{DeleteCart})(Cart);