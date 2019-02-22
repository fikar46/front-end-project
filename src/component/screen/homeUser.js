import React,{Component} from 'react';
import { Card, CardImg, CardText, CardTitle, CardImgOverlay  } from 'reactstrap';
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
                <div className="col-md-4 mb-4">
                <a  href={`/country?id=${id}`} className="text-dark btn">
                <Card >
                    <CardImg  top width="100%" src={image} alt="Card image cap"/>
                    <CardImgOverlay className="bg-gradient-secondary font-card ">
                        <CardTitle className="pr-5 bg-gradient-secondary display-4 text-white font-weight-bold">{nama}</CardTitle>
                    </CardImgOverlay>
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
              <center><h1>Country</h1></center>
                <div className="row">
                   {this.putDataCountry()}
                </div>
             </div>
        )
    }
}
export default HomeUser