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
class Country extends Component{
    state={
        dataProductCountry:[],
        dropdownOpen: false,
        dataCountry:[],
        kategori:"",
        listCategory:[]
    }
    componentDidMount(){
        this.getCountryProduct();
        this.getCountry();
        this.setKategori();
        this.getDataCategory();
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    getCountryProduct=()=>{
        var params = queryString.parse(this.props.location.search)
        var country = params.id;
        Axios.get("http://localhost:2000/country/"+country)
        .then((res)=>{
            this.setState({dataProductCountry:res.data})
            console.log(this.state.dataCountry)
        }).catch((err)=>{
            console.log(err)
        })
    }
    setKategori=()=>{
        var params = queryString.parse(this.props.location.search)
        var category = params.id_category;
        console.log(category)
        if(category !== undefined){
            this.setState({kategori:category});
        }
    }
    putDataProductCountry=()=>{
        if(this.state.kategori !== ""){
            var FilterCategory = this.state.dataProductCountry.filter((item)=>{
                return item["kategori"] == this.state.kategori
            })
            var Country = FilterCategory.map((item)=>{
                var {id,nama,harga,negara,gambar, id_negara}= item
                return (
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
            return Country
        }else{
            var Country = this.state.dataProductCountry.map((item)=>{
                var {id,nama,harga,negara,gambar, id_negara}= item
                return (
                    <div className="col-md-4">
                    <a className="text-dark btn" href={`/product-detail?id=${id}&&negara=${id_negara}`}>
                    <Card>
                        <CardImg top width="100%" src={gambar} alt="Card image cap"/>
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
            return Country
        }
        
    }
    getCountry=()=>{
        Axios.get("http://localhost:2000/country")
        .then((res)=>{
            this.setState({dataCountry:res.data})
            console.log(this.state.dataCountry)
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataCountry=()=>{
        var params = queryString.parse(this.props.location.search)
        var country = params.id;
        var FilterCountry = this.state.dataCountry.filter((item)=>{
            return item["id"] != country
        })
        var putdata = FilterCountry.map((item)=>{
            var {id,nama} = item
            return(<a href={`/country?id=${id}`}><DropdownItem>{nama}</DropdownItem></a>)
        })
        return putdata
    }
    putNameCountry=()=>{
        var params = queryString.parse(this.props.location.search)
        var country = params.id;
        var FilterCountry = this.state.dataCountry.filter((item)=>{
            return item["id"] == country
        })
        var putdata = FilterCountry.map((item)=>{
            var {nama} = item
            return nama
        })
        return putdata
    }
    getDataCategory=()=>{
        Axios.get("http://localhost:2000/category")
        .then((res)=>{
            this.setState({listCategory:res.data})
            console.log(this.state.listCategory)
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataCategory=()=>{
        var params = queryString.parse(this.props.location.search)
        var country = params.id;
        var category = this.state.listCategory.map((item)=>{
            return(<li><a className="text-secondary" href={`/country?id=${country}&&id_category=${item.id}`}>{item.nama_kategori}</a></li>)
        })
        return category
    }
    render(){
        var params = queryString.parse(this.props.location.search)
        var country = params.id;
        return(
            <div className="container row">
              <div className="col-md-4">
                <h4 className="text-secondary mt-3" align="left">Filter</h4>
                <p className="text-secondary bold">Sort by:</p>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.putNameCountry()}
        </DropdownToggle>
        <DropdownMenu>
            {this.putDataCountry()}
        </DropdownMenu>
      </ButtonDropdown>
      <ul class="list-unstyled">
            <li className="text-secondary">Kategori: </li>
            <li><a className="text-secondary" href={`/country?id=${country}`}>All</a></li>
            {this.putDataCategory()}
      </ul>
              </div>
              <div className="col-md-8">
                    <h1  className="text-secondary" align="center">{this.putNameCountry()}</h1>
                    <div className="row">
                        {this.putDataProductCountry()}
                    </div>
                </div>
             </div>
        )
    }
}
export default Country