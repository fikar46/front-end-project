import React,{Component} from 'react'
import Axios from 'axios';
import Cookies from "universal-cookie";
import {connect} from 'react-redux';


const cookies = new Cookies();
const rupiah = new Intl.NumberFormat("in-Rp",{
    style:"currency",
    currency:"IDR"
})
class Order extends Component{
    state={
        Order:[]
    }
    componentDidMount(){
        this.getDataOrder();
    }
    getDataOrder=()=>{
        Axios.post("http://localhost:2000/order",{
            username:cookies.get('dataUser')
        })
        .then((res)=>{
            this.setState({Order:res.data})
            console.log(this.state.Order)
        }).catch((err)=>{
            console.log(err)
        })
    }
   
    putDataOrder=()=>{
        var OrderData = this.state.Order.map((item)=>{
            var {id_produk,nama,harga,gambar,qty,status}= item
            return(
                    <tr>
                        <td>
                            <img src={gambar} height="100px" widht="100px" className="img-responsive"/>
                            
                        </td>
                        <td>{nama}</td>
                        <td>{rupiah.format(harga)}</td>
                        <td>{qty}</td>
                        <td>{rupiah.format(harga*qty)}</td>
                        <td>{status}</td>
                    </tr>
            )
        })
        return OrderData
    }
    putTotalPrice=()=>{
        var total =  this.state.Order.reduce((sum, item) => (
            sum += item.qty * item.harga
          ), 0)
        return rupiah.format(total)
    }
    render(){
        if(this.state.Order.length>0){
            return(
                <div className="container mt-5">
                    <h1 align="center" className="color-tittle">Your Order</h1>
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
                                Status
                                </th>
                            </tr>
                            
                            {this.putDataOrder()}
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
                </div>
                )
        }
        return(
            <div className="container">
            <h1 align="center">your Order is empty</h1>
            </div>
        )
    }
}
export default connect(null,{})(Order);