import React,{Component} from 'react';
import Axios from 'axios';
import queryString from 'query-string'


class ProductDetail extends Component{
    state={
        product:[]
    }
    componentDidMount(){
        var params = queryString.parse(this.props.location.search)
        var id_product = params.id;
        this.renderDetailProduct(id_product)
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
    putProductDetail=()=>{
        var putProduct = this.state.product.map((item)=>{
            var {id,kategori,nama,harga,deskripsi,negara,gambar,gambar2,gambar3}= item;
            return(
                <div className="row">
                    <div className="col-md-8">
                            <div className="product-detail">
                            <img src={gambar} className="img-responsive" height="500px" width="auto"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="border mt-5 h-100">
                            <h4>{nama}</h4>
                            <h4>Rp {harga}</h4>
                            <p>{deskripsi}</p>
                            <p>Asal Negara: {negara}</p>
                            <button className="btn btn btn-primary" type="button">Add to cart</button>
                        </div>

                    </div>
                </div>
            )
        })
        return putProduct
    }
    render(){
        return(
            <div className="container">
               {this.putProductDetail()}
            </div>
        )
    }
}
export default ProductDetail