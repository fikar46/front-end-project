import React,{Component} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import Axios from 'axios';

class Costumer extends Component{
    state={
        user:[]
    }
    componentDidMount(){
        this.getDataUser()
    }
    getDataUser=()=>{
        Axios.get('http://localhost:2000/user')
        .then((res)=>{
            this.setState({user:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    putDataUser=()=>{
        var user = this.state.user.map((item)=>{
            return(
        <ListGroupItem>{item.username}</ListGroupItem>
            )
        })
        return user
    }
    render(){
        return(
            <div className="container mt-5">
            <h1 align="center">Data user</h1>
            <ListGroup>
                {this.putDataUser()}
            </ListGroup>
            </div>
        )
    }
}
export default Costumer