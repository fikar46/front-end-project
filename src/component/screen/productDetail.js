import React,{Component} from 'react';
import Axios from 'axios';
import queryString from 'query-string'
import { Card,
    CardImg, 
   CardText, 
   CardBody,
   CardTitle, 
   CardSubtitle, 
   } from 'reactstrap';
import Cookies from "universal-cookie";
import {connect} from 'react-redux';
import {addToCart} from '../../actions';

const now = new Date();
const cookies = new Cookies();
const rupiah = new Intl.NumberFormat("in-Rp",{
    style:"currency",
    currency:"IDR"
})
class ProductDetail extends Component{
    state={
        product:[],
        dataProductCountry:[]
    }
    componentDidMount(){
        var params = queryString.parse(this.props.location.search)
        var id_product = params.id;
        var negara = params.negara;
        this.renderDetailProduct(id_product)
        this.getCountryProduct({negara,id_product});
        
    }
    renderDetailProduct=(id_product)=>{
        Axios.get("http://localhost:2000/product-detail/"+id_product)
        .then((res)=>{
            this.setState({product:res.data})
            console.log(this.state.product)
        }).catch((err)=>{
            console.log(err)
        })
    }
    addProductToCart=()=>{
        var params = queryString.parse(this.props.location.search)
        var id_product = params.id;
        var username = cookies.get('dataUser');
        var numberInput= this.refs.number.value;
        console.log(numberInput)
        this.props.addToCart({username, id_product,numberInput,now});
    }
    putProductDetail=()=>{
        var putProduct = this.state.product.map((item)=>{
            var {id,kategori,nama,harga,deskripsi,negara,gambar,gambar2,gambar3}= item;
            return(
                <div className="row mt-5">
                    <div className="col-md-8">
                            <div className="w-100 ">
                            <img src={gambar} className="w-100 h-auto img-responsive mt-5 shadow p-3 mb-5 bg-white rounded" height="500px" width="auto"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mt-5 h-100">
                        <form>
                            <h4 className="color-product title-product">{nama}</h4>
                            <p className="color-product caption-product">{deskripsi}</p>
                            <h4 className="color-product price-product">{rupiah.format(harga)}</h4>
                           
                            <p className="color-product">{negara}</p>
                            <div className="mb-3">
                            <input type="number" className="input-numberProduct" ref="number" defaultValue="1" min="1"/>
                            </div>
                            <input className="btn btn-addToCart" type="button" value="Add To Cart" onClick={this.addProductToCart}/>
                        </form>
                        </div>

                    </div>
                </div>
            )
        })
        return putProduct
    }
    getCountryProduct=({negara,id_product})=>{
        Axios.post("http://localhost:2000/suggestion-product/",{
            country:negara , product:id_product
        })
        .then((res)=>{
            this.setState({dataProductCountry:res.data})
            console.log(this.state.dataProductCountry)
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataProductCountry=()=>{
        var params = queryString.parse(this.props.location.search)
        var id_product = params.id;
        var FilterProduct = this.state.dataProductCountry.filter((item)=>{
            return item['id'] != id_product
        })
        console.log(this.state.dataProductCountry)
        console.log(FilterProduct)
        var Country = FilterProduct.map((item)=>{
            var {id,nama,harga,negara,gambar, id_negara}= item
            return (
                <div className="col-md-4">
                <a className="text-dark btn" href={`/product-detail?id=${id}&&negara=${id_negara}`}>
                <Card>
                    <CardImg top width="100%" src={gambar} alt="Card image cap"/>
                    <CardBody>
                        <CardTitle>{nama}</CardTitle>
                        <CardSubtitle>{rupiah.format(harga)}</CardSubtitle>
                        <CardText>{negara}</CardText>
                    </CardBody>
                </Card>
                </a>
            </div>
            )
        })
        return Country
    }
    render(){
        return(
            <div className="container">
               {this.putProductDetail()}
               <h1 className="text-secondary">Product Negara Terkait</h1>
               <div className="row">
                {this.putDataProductCountry()}
               </div>
            </div>
        )
    }
}
export default connect(null, {addToCart})(ProductDetail);