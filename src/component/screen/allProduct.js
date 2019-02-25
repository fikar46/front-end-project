import React,{Component} from 'react';
import { Card,
    CardImg, 
   CardText, 
   CardBody,
   CardTitle, 
   CardSubtitle, 
   Button, 
   ButtonDropdown, 
   DropdownToggle, 
   DropdownMenu, 
   DropdownItem } from 'reactstrap';
   import Axios from 'axios';
import queryString from 'query-string'
const rupiah = new Intl.NumberFormat("in-Rp",{
    style:"currency",
    currency:"IDR"
})
class Allproduct extends Component{
    state={
        product:[]
    }
    componentDidMount(){
            Axios.get("http://localhost:2000/product")
            .then((res)=>{
                this.setState({product:res.data})
            }).catch((err)=>{
                console.log(err)
            })
    }
    putData=()=>{
        var produk = this.state.product.map((item)=>{
            var {id,nama,harga,negara,gambar, id_negara}= item
            return(
<div className="col-md-4">
                    <a className="text-dark btn" href={`/product-detail?id=${id}&&negara=${id_negara}`}>
                    <Card>
                        <CardImg className="imagecard" top width="100%" src={gambar} alt="Card image cap"/>
                        <CardBody>
                            <p className="title">{nama}</p>
                            <CardSubtitle>{rupiah.format(harga)}</CardSubtitle>
                            <CardText>{negara}</CardText>
                        </CardBody>
                    </Card>
                    </a>
                </div>
            )
        })
        return produk
    }
    render(){
        return(
            <div className="container">
            <div className="row">
            {this.putData()}
            </div>
            
            </div>
        )
    }
}
export default Allproduct;