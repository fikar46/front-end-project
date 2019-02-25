import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Redirect}from 'react-router-dom';
class AdminManageImage extends Component{
    state= {
        listProduk: [],
        selectedEdit:0
    };
    componentDidMount(){
        this.getProdukList();
    
    }
    getProdukList=()=>{
        axios.get('http://localhost:2000/get-produk-image')
        .then((data)=> {
            console.log(data.data)
            this.setState({listProduk:data.data, selectedEdit:0})
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    onBtnEditClick=(id)=>{
        var gambar1 = this.refs.image1Edit.value;
        var gambar2 = this.refs.image2Edit.value;
        var gambar3 = this.refs.image3Edit.value;
        axios.post("http://localhost:2000/edit-product-image/"+id,{
           gambar1,gambar2,gambar3
        }).then((res)=>{
            console.log(res)
            this.getProdukList()
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    renderListProduk = ()=>{
        var listJSXProduk = this.state.listProduk.map((item)=>{
            if(item.id !== this.state.selectedEdit){
                return(
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td><img src={item.gambar1} alt='img' className='image-admin'/> </td>
                        <td><img src={item.gambar2} alt='img' className='image-admin'/> </td>
                        <td><img src={item.gambar3} alt='img' className='image-admin'/> </td>
                        <td><input onClick={()=> this.setState({selectedEdit: item.id})} type="button" value="Edit" className="btn btn-primary"/></td>
                        
                        
                    </tr>
                    )
            }
            return(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td><input type="text" defaultValue={item.gambar1} ref="image1Edit"/></td>
                    <td><input type="text" defaultValue={item.gambar2} ref="image2Edit"/></td>
                    <td><input type="text" defaultValue={item.gambar3} ref="image3Edit"/></td>
                    <td><input onClick={()=> this.onBtnEditClick(item.id)} type="button" value="Submit" className="btn btn-primary"/></td>
                    <td><input onClick={()=> this.setState({selectedEdit:0})} type="button" value="Cancel" className="btn btn-danger"/></td>
                    
                </tr>
                )
            
        })
        return listJSXProduk
    }
    render(){
        
        return(
            <div className="container-fluid"> 
                <h1>Menu Produk</h1>
                <table className="tableadmin">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama produk</th>
                            <th>gambar1</th>
                            <th>gambar2</th>
                            <th>gambar3</th>
                            <th>Edit</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderListProduk()} 
                    </tbody>
                    
                </table>
                <a href="/manage-product"><button className="btn btn-secondary mt-5 mb-5">kembali</button></a>
            </div>
        );
        
    
    }
}
const mapStateToProps = (state) => {
    return{
      username:state.auth.username
    }
  }
export default  connect(mapStateToProps, null)(AdminManageImage);