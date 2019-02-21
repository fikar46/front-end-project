import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import Axios from 'axios';
class HomeUser extends Component{
    state={
        dataCountry:[]
    }
    componentDidMount(){
        this.getCountry()
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
        var Country = this.state.dataCountry.map((item)=>{
            var {id,nama,image}= item
            return (
                <div className="col-md-4">
                <Card>
                    <CardImg top width="100%" src={image} alt="Card image cap"/>
                    <CardBody>
                        <CardTitle>{nama}</CardTitle>
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
              <center><h1>Country</h1></center>
                <div className="row">
                   {this.putDataCountry()}
                </div>
             </div>
        )
    }
}
export default HomeUser