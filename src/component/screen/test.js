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
class Country extends Component{
    state={
        dataProductCountry:[],
        dropdownOpen: false,
        dataCountry:[],
        kategori:""
    }
    componentDidMount(){
        this.getCountryProduct();
        this.getCountry();
        this.pushCategory();
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
    pushCategory=()=>{
        var params = queryString.parse(this.props.location.search)
        var category = params.id_category;
        console.log(category)
        if(category != undefined){
            this.setState({kategori:category})
        }
    }
    putDataProductCountry=()=>{
        if(this.state.kategori !== ""){
            var FilterCategory = this.state.dataProductCountry.filter((item)=>{
                return item["kategori"] == this.state.kategori
            })
            var Country = FilterCategory.map((item)=>{
                var {id,nama,harga,negara,gambar}= item
                return (
                    <div className="col-md-4">
                    <Card>
                        <CardImg top width="100%" src={gambar} alt="Card image cap"/>
                        <CardBody>
                            <CardTitle>{nama}</CardTitle>
                            <CardSubtitle>{harga}</CardSubtitle>
                            <CardSubtitle>{negara}</CardSubtitle>
                            <a href={`/country?id=${id}`}><Button>Button</Button></a>
                        </CardBody>
                    </Card>
                </div>
                )
            })
            return Country
        }else{
            var Country = this.state.dataProductCountry.map((item)=>{
                var {id,nama,harga,negara,gambar}= item
                return (
                    <div className="col-md-4">
                    <Card>
                        <CardImg top width="100%" src={gambar} alt="Card image cap"/>
                        <CardBody>
                            <CardTitle>{nama}</CardTitle>
                            <CardSubtitle>{harga}</CardSubtitle>
                            <CardSubtitle>{negara}</CardSubtitle>
                            <a href={`/country?id=${id}`}><Button>Button</Button></a>
                        </CardBody>
                    </Card>
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
    render(){
        return(
            <div className="container row">
              <div className="col-md-4">
                <h4 className="text-secondary" align="left">Filter</h4>
                <p className="text-secondary">Sort by:</p>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.putNameCountry()}
        </DropdownToggle>
        <DropdownMenu>
            {this.putDataCountry()}
        </DropdownMenu>
      </ButtonDropdown>
      <ul class="list-unstyled">
          <li>test</li>
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