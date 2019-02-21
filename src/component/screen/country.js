import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import Axios from 'axios';
import queryString from 'query-string'
class Country extends Component{
    state={
        dataProductCountry:[],
        dropdownOpen: false,
        dataCountry:[]
    }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    
    componentDidMount(){
        this.getCountryProduct();
        this.getCountry();
        this.toggle = this.toggle.bind(this);
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
    getCountry=()=>{
        Axios.get("http://localhost:2000/country")
        .then((res)=>{
            this.setState({dataCountry:res.data})
            console.log(this.state.dataCountry)
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataDropdownCountry=()=>{
        var params = queryString.parse(this.props.location.search)
        var country = params.id;
        var filterCountry = this.state.dataCountry.filter((item)=>{
            return item["id"] != country
        })
        var country = filterCountry.map((item)=>{
            var {id,nama} = item
            return(
                <a href={`/country?id=${id}`}><DropdownItem>{nama}</DropdownItem></a>
            )
        })
        return country
    }
    getNameCountry=()=>{
        var params = queryString.parse(this.props.location.search)
        var country = params.id;
        var filterCountry = this.state.dataCountry.filter((item)=>{
            return item["id"] == country
        })
        var country = filterCountry.map((item)=>{
            var {nama} = item
            return nama
        })
        return country
    }
    putDataProductCountry=()=>{
        var Country = this.state.dataProductCountry.map((item)=>{
            var {id,nama,harga,negara,gambar}= item
            return (
                <div className="col-md-4">
                <Card>
                    <CardImg top width="100%" src={gambar} alt="Card image cap"/>
                    <CardBody>
                        <CardTitle>{nama}</CardTitle>
                        <CardSubtitle>{harga}</CardSubtitle>
                        <CardText>{negara}</CardText>
                        <a href={`/country?id=${id}`}><Button>Button</Button></a>
                    </CardBody>
                </Card>
            </div>
            )
        })
        return Country
    }
    render(){
        return(
            <div className="container row">
              <div className="col-md-4">
              <h4 align="left">filter</h4>
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                {this.getNameCountry()}
                </DropdownToggle>
                <DropdownMenu>
                    {this.putDataDropdownCountry()}
                </DropdownMenu>
            </ButtonDropdown>
              </div>
             <div className="col-md-8">
             <h1 align="center">{this.getNameCountry()}</h1>
                <div className="row">
                   {this.putDataProductCountry()}
                </div>
             </div>
             </div>
        )
    }
}
export default Country