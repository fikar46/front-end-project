import React,{Component} from 'react'
import Axios from 'axios';
import Cookies from "universal-cookie";
import {connect} from 'react-redux';


const cookies = new Cookies();
const rupiah = new Intl.NumberFormat("in-Rp",{
    style:"currency",
    currency:"IDR"
})
class AdminOrder extends Component{
    state={
        Order:[]
    }
    componentDidMount(){
        this.getDataOrder();
    }
    getDataOrder=()=>{
        Axios.get("http://localhost:2000/order-admin")
        .then((res)=>{
            this.setState({Order:res.data})
            console.log(this.state.Order)
        }).catch((err)=>{
            console.log(err)
        })
    }
   prosesOrder=(id)=>{
        Axios.post("http://localhost:2000/proses-order/"+id,{
            status:'done'
        })
        .then((res)=>{
            console.log(res)
            this.getDataOrder();
        }).catch((err)=>{
            console.log(err)
        })
   }
    putDataOrder=()=>{
        var OrderData = this.state.Order.map((item)=>{
            var {id_order,nama,harga,gambar,qty,status}= item
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
                        <td><button className="btn btn-seconadry" onClick={()=> this.prosesOrder(id_order)}>proses</button></td>
                    </tr>
            )
        })
        return OrderData
    }
   
    render(){
        if(this.state.Order.length>0){
            return(
                <div className="container mt-5">
                    <h1 align="center" className="color-tittle">User Order</h1>
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
                                <th></th>
                            </tr>
                            
                            {this.putDataOrder()}
                           
                    </table>
                    <a href="/admin" className="text-secondary"><i class='fas fa-angle-left' style={{fontSize:20}}></i>Kembali </a>
                </div>
                )
        }
        return(
            <div className="container">
            <h1>your Order is empty</h1>
            </div>
        )
    }
}
export default connect(null,{})(AdminOrder);