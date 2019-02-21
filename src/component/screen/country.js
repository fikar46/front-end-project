import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import Axios from 'axios';
import queryString from 'query-string'
class Country extends Component{
    state={
        dataProductCountry:[]
    }
    componentDidMount(){
        this.getCountryProduct()
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
                        <CardSubtitle>{negara}</CardSubtitle>
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
            <div className="container">
              <center><h1>country</h1></center>
                <div className="row">
                   {this.putDataProductCountry()}
                </div>
             </div>
        )
    }
}
export default Country